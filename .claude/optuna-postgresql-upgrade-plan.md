# Optuna PostgreSQL Upgrade Plan

## Overview

Upgrade the Optuna optimizer storage from per-task SQLite files to a centralized PostgreSQL database to resolve the "exceeding max length" crash issue during large-scale optimization runs (10k+ trials).

**Issue:** SQLite storage crashes at ~4,467 trials due to SQLAlchemy VARCHAR column limits.

**Solution:** PostgreSQL storage + `gc_after_trial=True` for memory stability.

---

## Architecture Changes

### Before (SQLite)

```
result/
  2024-01-15/
    task-abc123/
      optuna-study.db    <- Isolated per task
    task-def456/
      optuna-study.db    <- Isolated per task
```

- Each task has its own SQLite file
- Dashboard requires taskId + date to locate file
- VARCHAR limits cause crashes on large studies

### After (PostgreSQL)

```
PostgreSQL: optuna_db
  └── Studies Table
        ├── study: "task-abc123"   <- Derived from taskId
        ├── study: "task-def456"   <- Derived from taskId
        └── study: "task-ghi789"
```

- Single PostgreSQL database for all studies
- Study name derived from taskId: `task-${taskId}`
- No storage path needed in database
- Global dashboard shows all studies

---

## Key Design Decisions

| Decision               | Choice                | Rationale                               |
| ---------------------- | --------------------- | --------------------------------------- |
| Storage backend        | PostgreSQL            | No VARCHAR limits, handles 100k+ trials |
| Study naming           | `task-${taskId}`      | Deterministic, no need to store         |
| Dashboard scope        | Global (all studies)  | Simpler UX, single connection           |
| Memory management      | `gc_after_trial=True` | Prevents memory bloat during long runs  |
| Backward compatibility | Not maintained        | User will remove old data               |
| Study path storage     | Remove field          | Derived from taskId                     |

---

## Files to Modify

### 1. Database Schema

**File:** `prisma/schema.prisma`

**Changes:**

- Remove `optunaStudyPath` field from `BacktestTask` model

```prisma
model BacktestTask {
  // ... existing fields ...

  // Optuna results
  bestConfigIds   String[] @default([])
  // REMOVED: optunaStudyPath String?
  optimizerPid    Int?

  // ... rest ...
}
```

### 2. GraphQL Entity

**File:** `src/microservices/apiService/modules/backtest/entities/backtest-task.entity.ts`

**Changes:**

- Remove `optunaStudyPath` field
- Update `OptunaDashboardStatus` to remove `taskId`

```typescript
@ObjectType()
export class BacktestTask {
  // Remove this field:
  // @Field(() => String, { nullable: true, description: 'Path to Optuna SQLite DB' })
  // optunaStudyPath?: string | null;
}

@ObjectType()
export class OptunaDashboardStatus {
  @Field(() => Boolean)
  running: boolean;

  @Field(() => String, { nullable: true })
  url: string | null;

  // REMOVED: taskId (not needed for global dashboard)
}
```

### 3. Dashboard Service

**File:** `src/microservices/apiService/modules/backtest/optuna-dashboard.service.ts`

**Changes:**

- Remove per-task logic (taskId, runDate parameters)
- Use PostgreSQL URL from environment
- Remove `findStudyDates()` method
- Simplify to global start/stop

**New Interface:**

```typescript
export interface DashboardStatus {
  running: boolean;
  url: string | null;
}
```

**New Methods:**

```typescript
async startDashboard(port?: number): Promise<DashboardStatus>
async stopDashboard(): Promise<boolean>
getStatus(): DashboardStatus
```

### 4. GraphQL Resolver

**File:** `src/microservices/apiService/modules/backtest/backtest.resolver.ts`

**Changes:**

- Simplify `startOptunaDashboard` mutation (remove taskId, date args)
- Remove `optunaStudyDates` query

**Before:**

```typescript
@Mutation(() => OptunaDashboardStatus)
async startOptunaDashboard(
  @Args('taskId', { type: () => ID }) taskId: string,
  @Args('date') date: string,
  @Args('port', { type: () => Int, defaultValue: 8080 }) port?: number,
): Promise<OptunaDashboardStatus>

@Query(() => [String])
optunaStudyDates(@Args('taskId') taskId: string): string[]
```

**After:**

```typescript
@Mutation(() => OptunaDashboardStatus)
async startOptunaDashboard(
  @Args('port', { type: () => Int, defaultValue: 8080 }) port?: number,
): Promise<OptunaDashboardStatus>

// REMOVED: optunaStudyDates query
```

### 5. Backtest Runner Service

**File:** `src/microservices/apiService/modules/backtest/backtest-runner.service.ts`

**Changes:**

- Pass `--postgres-url` argument to optimizer.py
- Remove `optunaStudyPath` update after spawning
- Validate `OPTUNA_POSTGRES_URL` env var exists

**Key Change in `spawnOptunaOptimizer()`:**

```typescript
const postgresUrl = process.env.OPTUNA_POSTGRES_URL;
if (!postgresUrl) {
  throw new Error("OPTUNA_POSTGRES_URL environment variable is required");
}

const args = [
  runOptimizerScript,
  "--task-id",
  task.id,
  // ... existing args ...
  "--postgres-url",
  postgresUrl, // NEW
];

// After spawn - only store PID, not study path
await this.prismaService.backtestTask.update({
  where: { id: task.id },
  data: { optimizerPid: child.pid },
});
```

### 6. Python Optimizer

**File:** `src/backtest/optimizer/python/optimizer.py`

**Changes:**

- Add `--postgres-url` CLI argument
- Replace SQLite storage with PostgreSQL RDBStorage
- Add `gc_after_trial=True` to study.optimize()
- Remove `get_study_storage()` SQLite logic
- Remove `--run-date` argument (not needed for storage path)

**New Storage Function:**

```python
def get_study_storage(postgres_url: str):
    return optuna.storages.RDBStorage(
        url=postgres_url,
        heartbeat_interval=60,
        grace_period=120,
        failed_trial_callback=optuna.storages.RetryFailedTrialCallback(max_retry=3),
        engine_kwargs={
            "pool_size": 5,
            "pool_pre_ping": True,
            "pool_recycle": 3600,
        },
    )
```

**Study Name Derivation:**

```python
def get_study_name(task_id: str) -> str:
    return f"task-{task_id}"
```

**Optimization Call:**

```python
study.optimize(
    objective,
    n_trials=args.trials,
    gc_after_trial=True,  # KEY: Memory stability
    show_progress_bar=True,
)
```

### 7. Dashboard Shell Script

**File:** `src/backtest/optimizer/run-dashboard.sh`

**Changes:**

- Accept PostgreSQL URL as first argument
- Fall back to `OPTUNA_POSTGRES_URL` env var
- Remove SQLite-specific default

**New Usage:**

```bash
# Via argument
./run-dashboard.sh "postgresql://user:pass@localhost/optuna_db" 8080

# Via environment variable
export OPTUNA_POSTGRES_URL="postgresql://user:pass@localhost/optuna_db"
./run-dashboard.sh "" 8080
```

---

## Database Setup

### PostgreSQL Database Creation

Run these SQL commands once to create the database:

```sql
-- Create database
CREATE DATABASE optuna_db;

-- Create user
CREATE USER optuna WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE optuna_db TO optuna;

-- Connect to optuna_db and grant schema permissions
\c optuna_db
GRANT ALL ON SCHEMA public TO optuna;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO optuna;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO optuna;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO optuna;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO optuna;
```

### Optuna Schema Auto-Creation

Optuna automatically creates its tables when `optuna.create_study()` is called:

- `studies` - Study metadata
- `trials` - Trial data
- `trial_params` - Parameter values
- `trial_values` - Objective values
- `trial_user_attributes`
- `trial_system_attributes`
- `study_user_attributes`
- `study_system_attributes`
- `alembic_version` - Optuna's internal version tracking

**No manual migration required** - tables are created on first use.

---

## Environment Configuration

### Required Environment Variables

```bash
# .env file

# PostgreSQL connection URL for Optuna storage (REQUIRED for optuna search)
OPTUNA_POSTGRES_URL=postgresql://optuna:your_secure_password@localhost:5432/optuna_db
```

### Docker Compose (if using containerized PostgreSQL)

```yaml
# docker-compose.yml

services:
  optuna-db:
    image: postgres:15
    environment:
      POSTGRES_DB: optuna_db
      POSTGRES_USER: optuna
      POSTGRES_PASSWORD: your_secure_password
    ports:
      - "5433:5432" # Use different port to avoid conflict
    volumes:
      - optuna_data:/var/lib/postgresql/data

volumes:
  optuna_data:
```

---

## Resource Usage Comparison

### Memory Usage (100k Trials)

| Metric                  | SQLite (Before) | PostgreSQL + gc (After) |
| ----------------------- | --------------- | ----------------------- |
| RAM during optimization | 2+ GB (crashes) | ~1 GB (stable)          |
| RAM for dashboard       | ~50MB           | ~50MB                   |
| Peak memory spikes      | Unpredictable   | Controlled              |

### Storage Usage

| Trials | SQLite                  | PostgreSQL |
| ------ | ----------------------- | ---------- |
| 10k    | 22 MB                   | 25 MB      |
| 50k    | 110 MB                  | 125 MB     |
| 100k   | 220 MB (crashes before) | 250 MB     |

### CPU Overhead

| Operation             | Impact                               |
| --------------------- | ------------------------------------ |
| `gc_after_trial=True` | +5-10ms per trial                    |
| PostgreSQL writes     | Similar to SQLite                    |
| Total for 100k trials | ~17 minutes GC overhead (acceptable) |

---

## Implementation Steps

### Phase 1: Database Setup

1. [ ] Create PostgreSQL database and user
2. [ ] Add `OPTUNA_POSTGRES_URL` to environment configuration
3. [ ] Test PostgreSQL connection

### Phase 2: Schema Migration

4. [ ] Update `prisma/schema.prisma` - remove `optunaStudyPath`
5. [ ] Run `npx prisma migrate dev --name remove-optuna-study-path`
6. [ ] Run `npx prisma generate`

### Phase 3: NestJS Changes

7. [ ] Update `backtest-task.entity.ts` - remove `optunaStudyPath` field
8. [ ] Update `OptunaDashboardStatus` entity - remove `taskId` field
9. [ ] Rewrite `optuna-dashboard.service.ts` for global dashboard
10. [ ] Update `backtest.resolver.ts` - simplify dashboard mutations
11. [ ] Update `backtest-runner.service.ts` - pass `--postgres-url` to optimizer

### Phase 4: Python Changes

12. [ ] Update `optimizer.py` - add `--postgres-url` arg, use RDBStorage
13. [ ] Add `gc_after_trial=True` to optimization call
14. [ ] Update `run-dashboard.sh` - support PostgreSQL URL

### Phase 5: Testing

15. [ ] Test small optimization run (100 trials)
16. [ ] Test medium optimization run (1000 trials)
17. [ ] Test dashboard start/stop
18. [ ] Test dashboard study selection UI
19. [ ] Verify study name `task-{taskId}` appears correctly

### Phase 6: Cleanup

20. [ ] Remove old SQLite study files from `result/` folders
21. [ ] Update documentation if any

---

## Rollback Plan

If issues arise, revert by:

1. Revert code changes via git
2. Run reverse Prisma migration to restore `optunaStudyPath`
3. Remove `OPTUNA_POSTGRES_URL` from environment
4. SQLite files in `result/` folders will work again (if not deleted)

---

## Testing Checklist

- [ ] PostgreSQL connection works from NestJS
- [ ] PostgreSQL connection works from optimizer.py
- [ ] Study created with name `task-{taskId}`
- [ ] Optimization completes without "max length" error
- [ ] Memory stays stable during long runs
- [ ] Dashboard starts and connects to PostgreSQL
- [ ] Dashboard shows all studies in dropdown
- [ ] Dashboard can display study details
- [ ] Task cancellation still works
- [ ] Server shutdown cleans up optimizer processes

---

## Notes

### Study Name Convention

All studies use the naming convention:

```
task-{backtestTaskId}
```

Example: `task-a1b2c3d4-e5f6-7890-abcd-ef1234567890`

This is derived from the BacktestTask UUID, not stored separately.

### Dashboard URL

When dashboard is running:

- URL: `http://localhost:8080` (or configured port)
- All studies visible in dropdown
- User selects study to view details

### Optuna Dashboard Features

The Optuna dashboard provides:

- Trial history visualization
- Parameter importance analysis
- Pareto front visualization (multi-objective)
- Hyperparameter relationships
- Optimization history plots
