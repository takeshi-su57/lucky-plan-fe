# Implementation Plan: 6-Layer Validation Pipeline

## Overview

Complete Stage 1 of LuckyPlan by adding a validation pipeline that filters and validates backtest results through multiple layers:

```
BacktestResult (from TemplateSearch)
        │
        ▼
┌───────────────────────────────────┐
│ Layer 1: Threshold Filter         │  ← Min/max rules on metrics
└───────────────┬───────────────────┘
                ▼
┌───────────────────────────────────┐
│ Layer 2: Pareto Selection         │  ← Multi-objective non-dominated sorting
└───────────────┬───────────────────┘
                ▼
┌───────────────────────────────────┐
│ Layer 3: Walk-Forward Validation  │  ← Train/test window analysis
└───────────────┬───────────────────┘
                ▼
┌───────────────────────────────────┐
│ Layer 4: User Selection           │  ← Human picks top candidates
└───────────────┬───────────────────┘
                ▼
┌───────────────────────────────────┐
│ Layer 5: Entry Point Robustness   │  ← Sliding startDate analysis
└───────────────┬───────────────────┘
                ▼
┌───────────────────────────────────┐
│ Layer 6: Final Approval           │  ← User confirms final strategies
└───────────────────────────────────┘
```

---

## Phase 1: Database Schema

### File: `prisma/schema.prisma`

**Add enums:**

```prisma
enum ValidationPipelineStatus {
  CREATED
  LAYER_1_RUNNING
  LAYER_1_DONE
  LAYER_2_RUNNING
  LAYER_2_DONE
  LAYER_3_RUNNING
  LAYER_3_DONE
  AWAITING_USER_SELECTION
  LAYER_5_RUNNING
  LAYER_5_DONE
  AWAITING_FINAL_APPROVAL
  COMPLETED
  FAILED
  CANCELLED
}

enum ValidationCandidateStatus {
  PENDING
  PASSED_THRESHOLD
  FAILED_THRESHOLD
  PARETO_OPTIMAL
  PARETO_DOMINATED
  WFA_PENDING
  WFA_PASSED
  WFA_FAILED
  USER_SELECTED
  USER_REJECTED
  ROBUSTNESS_PENDING
  ROBUSTNESS_PASSED
  ROBUSTNESS_FAILED
  FINAL_APPROVED
  FINAL_REJECTED
}

enum WalkForwardStatus {
  PENDING
  PROCESSING
  DONE
  FAILED
}

enum RobustnessTestStatus {
  PENDING
  PROCESSING
  DONE
  FAILED
}
```

**Add ValidationPipeline model:**

```prisma
model ValidationPipeline {
  id                 String                   @id @default(uuid())
  name               String
  templateSearchId   String
  templateSearch     TemplateSearch           @relation(fields: [templateSearchId], references: [id])
  status             ValidationPipelineStatus @default(CREATED)

  // Layer 1: Threshold config
  thresholdConfig    Json                     // { minSharpe: 1.0, maxDrawdown: 20, minWinRate: 0.4, ... }

  // Layer 2: Pareto config
  paretoMetrics      String[]                 // ["sharpeRatio", "totalPnlPercent", "maxDrawdownPercent"]

  // Layer 3: WFA config
  wfaTrainRatio      Float                    @default(0.7)   // 70% train, 30% test
  wfaWindows         Int                      @default(3)     // Number of walk-forward windows
  wfaMinConsistency  Float                    @default(0.6)   // Min consistency score to pass

  // Layer 5: Robustness config
  robustnessSteps    Int                      @default(10)    // Number of startDate iterations
  robustnessMinScore Float                    @default(0.7)   // Min stability score to pass

  // Stats
  totalCandidates    Int                      @default(0)
  passedThreshold    Int                      @default(0)
  paretoOptimal      Int                      @default(0)
  passedWfa          Int                      @default(0)
  userSelected       Int                      @default(0)
  passedRobustness   Int                      @default(0)
  finalApproved      Int                      @default(0)

  // Timestamps
  createdAt          DateTime                 @default(now())
  startedAt          DateTime?
  completedAt        DateTime?
  errorMessage       String?

  candidates         ValidationCandidate[]

  @@index([status])
  @@index([templateSearchId])
}
```

**Add ValidationCandidate model:**

```prisma
model ValidationCandidate {
  id               String                    @id @default(uuid())
  pipelineId       String
  pipeline         ValidationPipeline        @relation(fields: [pipelineId], references: [id], onDelete: Cascade)
  resultId         String
  result           BacktestResult            @relation(fields: [resultId], references: [id])
  configId         String                    // Reference to original config
  status           ValidationCandidateStatus @default(PENDING)

  // Layer 1 results
  thresholdPassed  Boolean?
  thresholdDetails Json?                     // { sharpeRatio: { value: 1.5, passed: true }, ... }

  // Layer 2 results
  paretoRank       Int?                      // 0 = Pareto front, 1+ = dominated
  dominatedBy      String[]                  // IDs of candidates that dominate this one

  // Layer 3 results (aggregated from WalkForwardResult)
  wfaConsistency   Float?                    // Overall consistency score 0-1
  wfaPassed        Boolean?

  // Layer 4 results
  userSelectedAt   DateTime?
  userNotes        String?

  // Layer 5 results (aggregated from RobustnessTest)
  robustnessScore  Float?                    // Overall stability score 0-1
  robustnessPassed Boolean?

  // Layer 6 results
  finalApprovedAt  DateTime?
  finalNotes       String?

  createdAt        DateTime                  @default(now())
  updatedAt        DateTime                  @updatedAt

  walkForwardResults WalkForwardResult[]
  robustnessTests    RobustnessTest[]

  @@index([pipelineId, status])
  @@index([resultId])
  @@unique([pipelineId, resultId])
}
```

**Add WalkForwardResult model:**

```prisma
model WalkForwardResult {
  id             String            @id @default(uuid())
  candidateId    String
  candidate      ValidationCandidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  windowIndex    Int               // 0, 1, 2, ...
  status         WalkForwardStatus @default(PENDING)

  // Train period
  trainStart     DateTime
  trainEnd       DateTime
  trainMetrics   Json?             // Metrics from training period

  // Test period
  testStart      DateTime
  testEnd        DateTime
  testMetrics    Json?             // Metrics from test period

  // Comparison
  consistency    Float?            // How well test matches train (0-1)
  degradation    Float?            // Performance drop from train to test

  errorMessage   String?
  createdAt      DateTime          @default(now())

  @@index([candidateId])
  @@unique([candidateId, windowIndex])
}
```

**Add RobustnessTest model:**

```prisma
model RobustnessTest {
  id             String              @id @default(uuid())
  candidateId    String
  candidate      ValidationCandidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  stepIndex      Int                 // 0, 1, 2, ... (startDate iteration)
  status         RobustnessTestStatus @default(PENDING)

  // Sliding window
  startDate      DateTime            // Shifted startDate
  endDate        DateTime            // Fixed endDate

  // Results
  metrics        Json?               // Backtest metrics for this window
  sharpeRatio    Float?
  totalPnl       Float?
  maxDrawdown    Float?

  errorMessage   String?
  createdAt      DateTime            @default(now())

  @@index([candidateId])
  @@unique([candidateId, stepIndex])
}
```

**Update TemplateSearch (add relation):**

```prisma
// Add to TemplateSearch model:
validationPipelines ValidationPipeline[]
```

**Update BacktestResult (add relation):**

```prisma
// Add to BacktestResult model:
validationCandidates ValidationCandidate[]
```

---

## Phase 2: Entity Definitions

### File: `src/.../backtest/entities/validation-pipeline.entity.ts`

```typescript
@ObjectType()
export class ValidationPipeline {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID)
  templateSearchId: string;

  @Field(() => ValidationPipelineStatusEnum)
  status: ValidationPipelineStatus;

  @Field(() => GraphQLJSON)
  thresholdConfig: object;

  @Field(() => [String])
  paretoMetrics: string[];

  @Field(() => Float)
  wfaTrainRatio: number;

  @Field(() => Int)
  wfaWindows: number;

  @Field(() => Float)
  wfaMinConsistency: number;

  @Field(() => Int)
  robustnessSteps: number;

  @Field(() => Float)
  robustnessMinScore: number;

  // Stats fields
  @Field(() => Int)
  totalCandidates: number;

  @Field(() => Int)
  passedThreshold: number;

  // ... other stat fields

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  startedAt?: Date;

  @Field({ nullable: true })
  completedAt?: Date;

  @Field({ nullable: true })
  errorMessage?: string;
}

@ObjectType()
export class ValidationPipelineWithCandidates extends ValidationPipeline {
  @Field(() => [ValidationCandidate])
  candidates: ValidationCandidate[];
}
```

### File: `src/.../backtest/entities/validation-candidate.entity.ts`

```typescript
@ObjectType()
export class ValidationCandidate {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  pipelineId: string;

  @Field(() => ID)
  resultId: string;

  @Field()
  configId: string;

  @Field(() => ValidationCandidateStatusEnum)
  status: ValidationCandidateStatus;

  @Field({ nullable: true })
  thresholdPassed?: boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  thresholdDetails?: object;

  @Field(() => Int, { nullable: true })
  paretoRank?: number;

  @Field(() => [String], { nullable: true })
  dominatedBy?: string[];

  @Field(() => Float, { nullable: true })
  wfaConsistency?: number;

  @Field({ nullable: true })
  wfaPassed?: boolean;

  @Field({ nullable: true })
  userSelectedAt?: Date;

  @Field({ nullable: true })
  userNotes?: string;

  @Field(() => Float, { nullable: true })
  robustnessScore?: number;

  @Field({ nullable: true })
  robustnessPassed?: boolean;

  @Field({ nullable: true })
  finalApprovedAt?: Date;

  @Field({ nullable: true })
  finalNotes?: string;
}

@ObjectType()
export class ValidationCandidateWithResult extends ValidationCandidate {
  @Field(() => BacktestResult)
  result: BacktestResult;
}

@ObjectType()
export class ValidationCandidateWithDetails extends ValidationCandidateWithResult {
  @Field(() => [WalkForwardResult])
  walkForwardResults: WalkForwardResult[];

  @Field(() => [RobustnessTest])
  robustnessTests: RobustnessTest[];
}
```

### File: `src/.../backtest/entities/walk-forward-result.entity.ts`

```typescript
@ObjectType()
export class WalkForwardResult {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  candidateId: string;

  @Field(() => Int)
  windowIndex: number;

  @Field(() => WalkForwardStatusEnum)
  status: WalkForwardStatus;

  @Field()
  trainStart: Date;

  @Field()
  trainEnd: Date;

  @Field(() => GraphQLJSON, { nullable: true })
  trainMetrics?: object;

  @Field()
  testStart: Date;

  @Field()
  testEnd: Date;

  @Field(() => GraphQLJSON, { nullable: true })
  testMetrics?: object;

  @Field(() => Float, { nullable: true })
  consistency?: number;

  @Field(() => Float, { nullable: true })
  degradation?: number;
}
```

### File: `src/.../backtest/entities/robustness-test.entity.ts`

```typescript
@ObjectType()
export class RobustnessTest {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  candidateId: string;

  @Field(() => Int)
  stepIndex: number;

  @Field(() => RobustnessTestStatusEnum)
  status: RobustnessTestStatus;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => GraphQLJSON, { nullable: true })
  metrics?: object;

  @Field(() => Float, { nullable: true })
  sharpeRatio?: number;

  @Field(() => Float, { nullable: true })
  totalPnl?: number;

  @Field(() => Float, { nullable: true })
  maxDrawdown?: number;
}
```

---

## Phase 3: DTO/Input Definitions

### File: `src/.../backtest/dto/validation-pipeline.input.ts`

```typescript
@InputType()
export class ThresholdConfigInput {
  @Field(() => Float, { nullable: true })
  minSharpeRatio?: number;

  @Field(() => Float, { nullable: true })
  maxSharpeRatio?: number;

  @Field(() => Float, { nullable: true })
  minWinRate?: number;

  @Field(() => Float, { nullable: true })
  minProfitFactor?: number;

  @Field(() => Float, { nullable: true })
  maxDrawdownPercent?: number;

  @Field(() => Int, { nullable: true })
  minTotalTrades?: number;

  @Field(() => Float, { nullable: true })
  minTotalPnlPercent?: number;
}

@InputType()
export class CreateValidationPipelineInput {
  @Field()
  name: string;

  @Field(() => ID)
  templateSearchId: string;

  @Field(() => ThresholdConfigInput)
  thresholdConfig: ThresholdConfigInput;

  @Field(() => [String], {
    defaultValue: ["sharpeRatio", "totalPnlPercent", "maxDrawdownPercent"],
  })
  paretoMetrics: string[];

  @Field(() => Float, { defaultValue: 0.7 })
  wfaTrainRatio: number;

  @Field(() => Int, { defaultValue: 3 })
  wfaWindows: number;

  @Field(() => Float, { defaultValue: 0.6 })
  wfaMinConsistency: number;

  @Field(() => Int, { defaultValue: 10 })
  robustnessSteps: number;

  @Field(() => Float, { defaultValue: 0.7 })
  robustnessMinScore: number;
}

@InputType()
export class UserSelectionInput {
  @Field(() => [ID])
  selectedCandidateIds: string[];

  @Field({ nullable: true })
  notes?: string;
}

@InputType()
export class FinalApprovalInput {
  @Field(() => [ID])
  approvedCandidateIds: string[];

  @Field({ nullable: true })
  notes?: string;
}
```

---

## Phase 4: Service Layer

### File: `src/.../backtest/validation-pipeline.service.ts`

| Method                          | Description                                   |
| ------------------------------- | --------------------------------------------- |
| `createPipeline(input)`         | Create pipeline, import results as candidates |
| `getPipeline(id)`               | Get by ID                                     |
| `getPipelineWithCandidates(id)` | Include candidates                            |
| `getPipelines(filter)`          | List with filters                             |
| `startPipeline(id)`             | Trigger Layer 1 processing                    |
| `updatePipelineStats(id)`       | Recalculate stats from candidates             |
| `cancelPipeline(id)`            | Cancel and stop processing                    |
| `deletePipeline(id)`            | Delete pipeline and all related records       |

**Key logic in `createPipeline`:**

1. Fetch TemplateSearch and its task
2. Verify task status is DONE
3. Create ValidationPipeline record
4. Query all BacktestResults for the task
5. Create ValidationCandidate for each result

### File: `src/.../backtest/threshold-filter.service.ts`

| Method                                 | Description                      |
| -------------------------------------- | -------------------------------- |
| `runThresholdFilter(pipelineId)`       | Process all PENDING candidates   |
| `evaluateCandidate(candidate, config)` | Check metrics against thresholds |

**Threshold evaluation logic:**

```typescript
evaluateCandidate(candidate, config) {
  const metrics = candidate.result.metrics;
  const details = {};
  let allPassed = true;

  if (config.minSharpeRatio != null) {
    const passed = metrics.sharpeRatio >= config.minSharpeRatio;
    details.sharpeRatio = { value: metrics.sharpeRatio, threshold: config.minSharpeRatio, passed };
    allPassed = allPassed && passed;
  }
  // ... similar for other metrics

  return { passed: allPassed, details };
}
```

### File: `src/.../backtest/pareto-selection.service.ts`

| Method                                    | Description                         |
| ----------------------------------------- | ----------------------------------- |
| `runParetoSelection(pipelineId)`          | Process PASSED_THRESHOLD candidates |
| `computeParetoFront(candidates, metrics)` | Non-dominated sorting algorithm     |
| `dominates(a, b, metrics)`                | Check if A dominates B              |

**Pareto sorting algorithm:**

```typescript
computeParetoFront(candidates, metrics) {
  // For each candidate, check if dominated by any other
  for (const a of candidates) {
    a.paretoRank = 0;
    a.dominatedBy = [];

    for (const b of candidates) {
      if (a.id === b.id) continue;
      if (this.dominates(b, a, metrics)) {
        a.dominatedBy.push(b.id);
        a.paretoRank = Math.max(a.paretoRank, 1);
      }
    }
  }

  return candidates;
}

dominates(a, b, metrics) {
  // A dominates B if A is >= B in all metrics and > B in at least one
  // Note: maxDrawdown is inverted (lower is better)
  let betterInOne = false;
  for (const metric of metrics) {
    const aVal = this.getMetricValue(a, metric);
    const bVal = this.getMetricValue(b, metric);
    const isMaximize = metric !== 'maxDrawdownPercent';

    if (isMaximize) {
      if (aVal < bVal) return false;
      if (aVal > bVal) betterInOne = true;
    } else {
      if (aVal > bVal) return false;
      if (aVal < bVal) betterInOne = true;
    }
  }
  return betterInOne;
}
```

### File: `src/.../backtest/walk-forward.service.ts`

| Method                                            | Description                            |
| ------------------------------------------------- | -------------------------------------- |
| `runWalkForward(pipelineId)`                      | Process PARETO_OPTIMAL candidates      |
| `createWfaWindows(candidate, config)`             | Generate train/test window records     |
| `processWfaWindow(wfaResult)`                     | Run backtest on train and test periods |
| `calculateConsistency(trainMetrics, testMetrics)` | Compute consistency score              |
| `aggregateWfaResults(candidateId)`                | Calculate overall WFA pass/fail        |

**Walk-forward window generation:**

```typescript
createWfaWindows(candidate, config) {
  const { startDate, endDate } = candidate.result.task;
  const totalDays = daysBetween(startDate, endDate);
  const windowSize = totalDays / config.wfaWindows;
  const trainDays = windowSize * config.wfaTrainRatio;
  const testDays = windowSize * (1 - config.wfaTrainRatio);

  const windows = [];
  for (let i = 0; i < config.wfaWindows; i++) {
    const windowStart = addDays(startDate, i * windowSize);
    windows.push({
      windowIndex: i,
      trainStart: windowStart,
      trainEnd: addDays(windowStart, trainDays),
      testStart: addDays(windowStart, trainDays),
      testEnd: addDays(windowStart, windowSize),
    });
  }
  return windows;
}
```

### File: `src/.../backtest/robustness-test.service.ts`

| Method                                     | Description                            |
| ------------------------------------------ | -------------------------------------- |
| `runRobustnessTests(pipelineId)`           | Process USER_SELECTED candidates       |
| `createRobustnessSteps(candidate, config)` | Generate sliding startDate records     |
| `processRobustnessStep(robustnessTest)`    | Run backtest with shifted start        |
| `calculateStabilityScore(tests)`           | Compute overall robustness score       |
| `aggregateRobustnessResults(candidateId)`  | Calculate overall robustness pass/fail |

**Robustness step generation (Entry Point Robustness Test):**

```typescript
createRobustnessSteps(candidate, config) {
  const { startDate, endDate } = candidate.result.task;
  const totalDays = daysBetween(startDate, endDate);
  const stepSize = totalDays / config.robustnessSteps;

  const steps = [];
  for (let i = 0; i < config.robustnessSteps; i++) {
    steps.push({
      stepIndex: i,
      startDate: addDays(startDate, i * stepSize),
      endDate: endDate,  // Fixed endDate
    });
  }
  return steps;
}
```

**Stability score calculation:**

```typescript
calculateStabilityScore(tests) {
  const sharpeValues = tests.map(t => t.sharpeRatio).filter(v => v != null);
  const pnlValues = tests.map(t => t.totalPnl).filter(v => v != null);

  // Calculate coefficient of variation (lower = more stable)
  const sharpeCV = coefficientOfVariation(sharpeValues);
  const pnlCV = coefficientOfVariation(pnlValues);

  // Count positive results
  const positiveRatio = sharpeValues.filter(v => v > 0).length / sharpeValues.length;

  // Stability score: combination of low CV and high positive ratio
  const stabilityScore = (1 - Math.min(sharpeCV, 1)) * 0.4
                       + (1 - Math.min(pnlCV, 1)) * 0.3
                       + positiveRatio * 0.3;

  return stabilityScore;
}
```

---

## Phase 5: Runner Service

### File: `src/.../backtest/validation-runner.service.ts`

```typescript
@Injectable()
export class ValidationRunnerService implements OnModuleInit {
  private isProcessing = false;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly thresholdService: ThresholdFilterService,
    private readonly paretoService: ParetoSelectionService,
    private readonly wfaService: WalkForwardService,
    private readonly robustnessService: RobustnessTestService,
    private readonly pipelineService: ValidationPipelineService,
    private readonly logger: LogsService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async processQueue(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      await this.processNextPipeline();
    } finally {
      this.isProcessing = false;
    }
  }

  private async processNextPipeline(): Promise<void> {
    // Find pipeline that needs processing
    const pipeline = await this.prismaService.validationPipeline.findFirst({
      where: {
        status: {
          in: [
            "CREATED",
            "LAYER_1_DONE",
            "LAYER_2_DONE",
            "LAYER_3_DONE",
            "LAYER_5_DONE",
          ],
        },
      },
      orderBy: { createdAt: "asc" },
    });

    if (!pipeline) return;

    switch (pipeline.status) {
      case "CREATED":
        await this.runLayer1(pipeline.id);
        break;
      case "LAYER_1_DONE":
        await this.runLayer2(pipeline.id);
        break;
      case "LAYER_2_DONE":
        await this.runLayer3(pipeline.id);
        break;
      // LAYER_3_DONE -> AWAITING_USER_SELECTION (manual)
      // After user selection:
      case "LAYER_5_RUNNING":
        // Process individual WFA/robustness tests
        break;
    }
  }

  private async runLayer1(pipelineId: string): Promise<void> {
    await this.pipelineService.updateStatus(pipelineId, "LAYER_1_RUNNING");
    await this.thresholdService.runThresholdFilter(pipelineId);
    await this.pipelineService.updateStats(pipelineId);
    await this.pipelineService.updateStatus(pipelineId, "LAYER_1_DONE");
  }

  private async runLayer2(pipelineId: string): Promise<void> {
    await this.pipelineService.updateStatus(pipelineId, "LAYER_2_RUNNING");
    await this.paretoService.runParetoSelection(pipelineId);
    await this.pipelineService.updateStats(pipelineId);
    await this.pipelineService.updateStatus(pipelineId, "LAYER_2_DONE");
  }

  private async runLayer3(pipelineId: string): Promise<void> {
    await this.pipelineService.updateStatus(pipelineId, "LAYER_3_RUNNING");
    await this.wfaService.runWalkForward(pipelineId);
    // WFA runs async, status updated when all windows complete
  }
}
```

---

## Phase 6: Resolver Layer

### File: `src/.../backtest/validation-pipeline.resolver.ts`

**Queries:**

- `validationPipeline(id)` → ValidationPipeline
- `validationPipelineWithCandidates(id)` → ValidationPipelineWithCandidates
- `validationPipelines(filter?)` → [ValidationPipeline]
- `validationCandidate(id)` → ValidationCandidateWithDetails
- `validationCandidatesByStatus(pipelineId, status)` → [ValidationCandidateWithResult]

**Mutations:**

- `createValidationPipeline(input)` → ValidationPipeline
- `startValidationPipeline(id)` → ValidationPipeline
- `submitUserSelection(pipelineId, input)` → ValidationPipeline
- `submitFinalApproval(pipelineId, input)` → ValidationPipeline
- `cancelValidationPipeline(id)` → ValidationPipeline
- `deleteValidationPipeline(id)` → Boolean

**Subscriptions:**

- `validationPipelineUpdated` → ValidationPipeline
- `validationCandidateUpdated` → ValidationCandidate

---

## Phase 7: Module & Constants Updates

### File: `src/.../backtest/backtest.module.ts`

Add to providers/exports:

- `ValidationPipelineService`
- `ThresholdFilterService`
- `ParetoSelectionService`
- `WalkForwardService`
- `RobustnessTestService`
- `ValidationRunnerService`
- `ValidationPipelineResolver`

### File: `src/utils/constants.ts`

```typescript
export const SUBSCRIPTION_TOKEN = {
  // ... existing
  validationPipelineUpdated: "validationPipelineUpdated",
  validationCandidateUpdated: "validationCandidateUpdated",
};

export const PATTERNS = {
  // ... existing
  Validation: {
    PipelineCreated: "VALIDATION_PIPELINE_CREATED",
    PipelineUpdated: "VALIDATION_PIPELINE_UPDATED",
    CandidateUpdated: "VALIDATION_CANDIDATE_UPDATED",
  },
};
```

---

## Status Flow Diagram

```
CREATED
    │ (auto start or manual trigger)
    ▼
LAYER_1_RUNNING ─────────────────┐
    │                            │
    ▼                            │ (on error)
LAYER_1_DONE                     │
    │                            ▼
    ▼                          FAILED
LAYER_2_RUNNING
    │
    ▼
LAYER_2_DONE
    │
    ▼
LAYER_3_RUNNING (WFA runs async)
    │
    ▼
LAYER_3_DONE
    │
    ▼
AWAITING_USER_SELECTION ◄──── User reviews WFA results
    │
    │ submitUserSelection()
    ▼
LAYER_5_RUNNING (Robustness runs async)
    │
    ▼
LAYER_5_DONE
    │
    ▼
AWAITING_FINAL_APPROVAL ◄──── User reviews robustness results
    │
    │ submitFinalApproval()
    ▼
COMPLETED
```

---

## File Summary

| Action     | File                                                       |
| ---------- | ---------------------------------------------------------- |
| **MODIFY** | `prisma/schema.prisma`                                     |
| **CREATE** | `src/.../backtest/entities/validation-pipeline.entity.ts`  |
| **CREATE** | `src/.../backtest/entities/validation-candidate.entity.ts` |
| **CREATE** | `src/.../backtest/entities/walk-forward-result.entity.ts`  |
| **CREATE** | `src/.../backtest/entities/robustness-test.entity.ts`      |
| **MODIFY** | `src/.../backtest/entities/index.ts`                       |
| **CREATE** | `src/.../backtest/dto/validation-pipeline.input.ts`        |
| **MODIFY** | `src/.../backtest/dto/index.ts`                            |
| **CREATE** | `src/.../backtest/validation-pipeline.service.ts`          |
| **CREATE** | `src/.../backtest/threshold-filter.service.ts`             |
| **CREATE** | `src/.../backtest/pareto-selection.service.ts`             |
| **CREATE** | `src/.../backtest/walk-forward.service.ts`                 |
| **CREATE** | `src/.../backtest/robustness-test.service.ts`              |
| **CREATE** | `src/.../backtest/validation-runner.service.ts`            |
| **CREATE** | `src/.../backtest/validation-pipeline.resolver.ts`         |
| **MODIFY** | `src/.../backtest/backtest.module.ts`                      |
| **MODIFY** | `src/utils/constants.ts`                                   |

---

## Migration Strategy

1. **Run migration:** `npx prisma migrate dev --name add_validation_pipeline`
2. **Backwards compatible:** New tables, no changes to existing data
3. **No data transformation needed**

---

## Verification Plan

### 1. Database Migration

```bash
npx prisma migrate dev --name add_validation_pipeline
npx prisma generate
```

### 2. Build Check

```bash
npm run build
```

### 3. Functional Tests

**Create pipeline from completed TemplateSearch:**

```graphql
mutation {
  createValidationPipeline(
    input: {
      name: "Q1 Validation"
      templateSearchId: "<search-id>"
      thresholdConfig: {
        minSharpeRatio: 1.0
        maxDrawdownPercent: 20
        minWinRate: 0.4
        minTotalTrades: 50
      }
      paretoMetrics: ["sharpeRatio", "totalPnlPercent", "maxDrawdownPercent"]
    }
  ) {
    id
    status
    totalCandidates
  }
}
```

**Start pipeline (triggers Layer 1-3 automatically):**

```graphql
mutation {
  startValidationPipeline(id: "<pipeline-id>") {
    id
    status
    passedThreshold
    paretoOptimal
    passedWfa
  }
}
```

**Check candidates after Layer 3:**

```graphql
query {
  validationCandidatesByStatus(
    pipelineId: "<pipeline-id>"
    status: WFA_PASSED
  ) {
    id
    result {
      sharpeRatio
      totalPnlPercent
    }
    wfaConsistency
    paretoRank
  }
}
```

**Submit user selection (Layer 4):**

```graphql
mutation {
  submitUserSelection(
    pipelineId: "<pipeline-id>"
    input: {
      selectedCandidateIds: ["<candidate-1>", "<candidate-2>"]
      notes: "Selected top 2 performers"
    }
  ) {
    id
    status
    userSelected
  }
}
```

**Submit final approval (Layer 6):**

```graphql
mutation {
  submitFinalApproval(
    pipelineId: "<pipeline-id>"
    input: {
      approvedCandidateIds: ["<candidate-1>"]
      notes: "Approved for live trading"
    }
  ) {
    id
    status
    finalApproved
  }
}
```

### 4. End-to-End Flow

1. Complete a TemplateSearch (existing flow)
2. Create ValidationPipeline from the search
3. Start pipeline → watch Layer 1-3 process
4. Review WFA results, submit user selection
5. Wait for Layer 5 (robustness) to complete
6. Review robustness results, submit final approval
7. Verify pipeline status is COMPLETED
