# Frontend Migration Guide: Optuna PostgreSQL Upgrade + Validation Pipeline

This document provides all the context needed to update the frontend according to the backend changes.

---

## Summary of Changes

Two main changes were made:

1. **Optuna Dashboard Simplification** - Changed from per-task SQLite to global PostgreSQL
2. **Validation Pipeline Feature** - New multi-layer validation system (separate feature, may not need immediate frontend work)

---

## Part 1: Optuna Dashboard Changes (Breaking Changes)

### 1.1 Removed Fields

#### `BacktestTask` Type

```diff
type BacktestTask {
  # ... other fields remain unchanged ...

- """Path to Optuna SQLite DB"""
- optunaStudyPath: String
}
```

**Frontend Action:** Remove any references to `optunaStudyPath` field in:

- GraphQL queries fetching `BacktestTask`
- TypeScript interfaces/types
- UI components displaying this field

#### `OptunaDashboardStatus` Type

```diff
type OptunaDashboardStatus {
  running: Boolean!
- taskId: ID
  url: String
}
```

**Frontend Action:** Remove any references to `taskId` field in:

- GraphQL fragments for `OptunaDashboardStatus`
- TypeScript interfaces
- UI components that displayed which task the dashboard was showing

---

### 1.2 Removed Queries

```diff
- """Get available study dates for a task (dates with optuna-study.db)"""
- optunaStudyDates(taskId: ID!): [String!]!
```

**Frontend Action:**

- Remove the `optunaStudyDates` query
- Remove any date picker/selector that was used to choose which study date to view
- Remove the UI flow that required selecting a task then selecting a date

---

### 1.3 Changed Mutations

#### `startOptunaDashboard` Mutation

**Before:**

```graphql
mutation StartOptunaDashboard($taskId: ID!, $date: String!, $port: Int) {
  startOptunaDashboard(taskId: $taskId, date: $date, port: $port) {
    running
    taskId
    url
  }
}
```

**After:**

```graphql
mutation StartOptunaDashboard($port: Int) {
  startOptunaDashboard(port: $port) {
    running
    url
  }
}
```

**Frontend Action:**

- Update the mutation to remove `taskId` and `date` arguments
- Update the response type to remove `taskId`
- Update the UI button/action to just start/stop the dashboard globally
- The dashboard URL will show ALL studies - user selects study from dashboard UI dropdown

---

### 1.4 Updated GraphQL Code Examples

#### Query: Get Dashboard Status

```graphql
query GetOptunaDashboardStatus {
  optunaDashboardStatus {
    running
    url
  }
}
```

#### Mutation: Start Dashboard

```graphql
mutation StartOptunaDashboard($port: Int = 8080) {
  startOptunaDashboard(port: $port) {
    running
    url
  }
}
```

#### Mutation: Stop Dashboard

```graphql
mutation StopOptunaDashboard {
  stopOptunaDashboard
}
```

---

### 1.5 TypeScript Interface Updates

**Before:**

```typescript
interface BacktestTask {
  id: string;
  name: string;
  // ... other fields ...
  optunaStudyPath?: string | null;
  optimizerPid?: number | null;
  bestConfigIds: string[];
}

interface OptunaDashboardStatus {
  running: boolean;
  taskId: string | null;
  url: string | null;
}
```

**After:**

```typescript
interface BacktestTask {
  id: string;
  name: string;
  // ... other fields ...
  // REMOVED: optunaStudyPath
  optimizerPid?: number | null;
  bestConfigIds: string[];
}

interface OptunaDashboardStatus {
  running: boolean;
  // REMOVED: taskId
  url: string | null;
}
```

---

### 1.6 UI/UX Changes Required

#### Old Flow (Remove):

```
1. User navigates to BacktestTask details
2. User clicks "View Optuna Dashboard"
3. Modal opens asking to select a study date
4. User selects date from dropdown (populated by optunaStudyDates query)
5. Dashboard starts for that specific task/date
6. Dashboard shows only that specific study
```

#### New Flow (Implement):

```
1. User clicks "Optuna Dashboard" button (can be anywhere, global action)
2. Dashboard starts with PostgreSQL connection
3. Opens dashboard URL in new tab or iframe
4. Dashboard UI shows dropdown with ALL studies (task-{uuid} names)
5. User selects which study to view from dashboard's own UI
```

#### Suggested UI Components:

**Simple Global Dashboard Button:**

```tsx
const OptunaDashboardButton = () => {
  const [status, setStatus] = useState<OptunaDashboardStatus | null>(null);

  const { data } = useQuery(GET_DASHBOARD_STATUS);
  const [startDashboard] = useMutation(START_DASHBOARD);
  const [stopDashboard] = useMutation(STOP_DASHBOARD);

  const handleToggle = async () => {
    if (status?.running) {
      await stopDashboard();
    } else {
      const result = await startDashboard({ variables: { port: 8080 } });
      // Optionally open in new tab
      if (result.data?.startOptunaDashboard?.url) {
        window.open(result.data.startOptunaDashboard.url, "_blank");
      }
    }
  };

  return (
    <Button onClick={handleToggle}>
      {status?.running ? "Stop Dashboard" : "Start Dashboard"}
    </Button>
  );
};
```

---

## Part 2: Validation Pipeline (New Feature)

This is a new feature for multi-layer strategy validation. It may not need immediate frontend implementation but here are the GraphQL APIs available.

### 2.1 New Types

```graphql
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

type ValidationPipeline {
  id: ID!
  name: String!
  templateSearchId: ID!
  status: ValidationPipelineStatus!
  thresholdConfig: JSON!
  paretoMetrics: [String!]!
  wfaTrainRatio: Float!
  wfaWindows: Int!
  wfaMinConsistency: Float!
  robustnessSteps: Int!
  robustnessMinScore: Float!
  # Stats
  totalCandidates: Int!
  passedThreshold: Int!
  paretoOptimal: Int!
  passedWfa: Int!
  userSelected: Int!
  passedRobustness: Int!
  finalApproved: Int!
  # Timestamps
  createdAt: Date!
  startedAt: Date
  completedAt: Date
  errorMessage: String
}

type ValidationCandidate {
  id: ID!
  pipelineId: ID!
  resultId: ID!
  configId: String!
  status: ValidationCandidateStatus!
  # Layer results
  thresholdPassed: Boolean
  thresholdDetails: JSON
  paretoRank: Int
  dominatedBy: [String!]
  wfaConsistency: Float
  wfaPassed: Boolean
  userSelectedAt: Date
  userNotes: String
  robustnessScore: Float
  robustnessPassed: Boolean
  finalApprovedAt: Date
  finalNotes: String
}
```

### 2.2 New Queries

```graphql
# Get single pipeline
query GetValidationPipeline($id: ID!) {
  validationPipeline(id: $id) {
    id
    name
    status
    totalCandidates
    passedThreshold
    paretoOptimal
    passedWfa
    userSelected
    passedRobustness
    finalApproved
  }
}

# Get pipeline with all candidates
query GetValidationPipelineWithCandidates($id: ID!) {
  validationPipelineWithCandidates(id: $id) {
    id
    name
    status
    candidates {
      id
      configId
      status
      thresholdPassed
      paretoRank
      wfaPassed
      robustnessPassed
    }
  }
}

# List pipelines
query ListValidationPipelines($filter: ValidationPipelineFilterInput) {
  validationPipelines(filter: $filter) {
    id
    name
    status
    totalCandidates
    finalApproved
  }
}

# Get pipeline stats
query GetValidationPipelineStats {
  validationPipelineStats {
    created
    running
    awaitingUser
    completed
    failed
    cancelled
  }
}

# Get candidates by status
query GetCandidatesByStatus($filter: ValidationCandidateFilterInput!) {
  validationCandidatesByStatus(filter: $filter) {
    id
    configId
    status
    result {
      id
      totalPnlPercent
      sharpeRatio
      maxDrawdownPercent
    }
  }
}
```

### 2.3 New Mutations

```graphql
# Create pipeline from completed template search
mutation CreateValidationPipeline($input: CreateValidationPipelineInput!) {
  createValidationPipeline(input: $input) {
    id
    name
    status
  }
}

# Start pipeline (runs Layer 1-3 automatically)
mutation StartValidationPipeline($id: ID!) {
  startValidationPipeline(id: $id) {
    id
    status
  }
}

# User selection (Layer 4) - select candidates to proceed to robustness testing
mutation SubmitUserSelection($pipelineId: ID!, $input: UserSelectionInput!) {
  submitUserSelection(pipelineId: $pipelineId, input: $input) {
    id
    status
    userSelected
  }
}

# Final approval (Layer 6) - approve final candidates
mutation SubmitFinalApproval($pipelineId: ID!, $input: FinalApprovalInput!) {
  submitFinalApproval(pipelineId: $pipelineId, input: $input) {
    id
    status
    finalApproved
  }
}

# Cancel pipeline
mutation CancelValidationPipeline($id: ID!) {
  cancelValidationPipeline(id: $id) {
    id
    status
  }
}

# Delete pipeline
mutation DeleteValidationPipeline($id: ID!) {
  deleteValidationPipeline(id: $id)
}
```

### 2.4 New Subscriptions

```graphql
subscription OnValidationPipelineUpdated {
  validationPipelineUpdated {
    id
    status
    passedThreshold
    paretoOptimal
    passedWfa
  }
}

subscription OnValidationCandidateUpdated {
  validationCandidateUpdated {
    id
    status
    pipelineId
  }
}
```

### 2.5 Input Types

```graphql
input CreateValidationPipelineInput {
  name: String!
  templateSearchId: ID!
  thresholdConfig: ThresholdConfigInput!
  paretoMetrics: [String!] = [
    "sharpeRatio"
    "totalPnlPercent"
    "maxDrawdownPercent"
  ]
  wfaTrainRatio: Float = 0.7
  wfaWindows: Int = 3
  wfaMinConsistency: Float = 0.6
  robustnessSteps: Int = 10
  robustnessMinScore: Float = 0.7
}

input ThresholdConfigInput {
  minSharpeRatio: Float
  maxSharpeRatio: Float
  minTotalPnlPercent: Float
  maxDrawdownPercent: Float
  minProfitFactor: Float
  minWinRate: Float
  minTotalTrades: Int
}

input UserSelectionInput {
  selectedCandidateIds: [ID!]!
  rejectedCandidateIds: [ID!]
  notes: String
}

input FinalApprovalInput {
  approvedCandidateIds: [ID!]!
  notes: String
}

input ValidationPipelineFilterInput {
  status: ValidationPipelineStatus
  templateSearchId: ID
  limit: Int = 20
  offset: Int = 0
}

input ValidationCandidateFilterInput {
  pipelineId: ID!
  status: ValidationCandidateStatus
  limit: Int = 50
  offset: Int = 0
}
```

---

## Part 3: Migration Checklist

### Immediate (Breaking Changes)

- [ ] Remove `optunaStudyPath` from BacktestTask queries/types
- [ ] Remove `taskId` from OptunaDashboardStatus queries/types
- [ ] Remove `optunaStudyDates` query usage
- [ ] Update `startOptunaDashboard` mutation (remove taskId, date args)
- [ ] Update dashboard UI to be global start/stop
- [ ] Test dashboard functionality

### Optional (New Features)

- [ ] Add ValidationPipeline list page
- [ ] Add ValidationPipeline detail page
- [ ] Add candidate selection UI for Layer 4
- [ ] Add final approval UI for Layer 6
- [ ] Add real-time updates via subscriptions

---

## Part 4: Environment Setup

The backend now requires a PostgreSQL database for Optuna storage:

```bash
# Required environment variable
OPTUNA_POSTGRES_URL=postgresql://optuna:password@localhost:5432/optuna_db
```

The frontend doesn't need to know about this directly, but if there's no PostgreSQL configured, the `startOptunaDashboard` mutation will throw an error:

```
Error: OPTUNA_POSTGRES_URL environment variable is not set. PostgreSQL is required for Optuna storage.
```

---

## Part 5: Study Naming Convention

All Optuna studies are now named using the pattern:

```
task-{backtestTaskId}
```

Example: `task-a1b2c3d4-e5f6-7890-abcd-ef1234567890`

When users open the Optuna dashboard, they will see a dropdown with all study names. The frontend could optionally display a mapping of task names to study names to help users identify which study to select.

Optional enhancement:

```tsx
// Display task name → study name mapping
const TaskStudyMapping = ({ tasks }) => (
  <Table>
    <thead>
      <tr>
        <th>Task Name</th>
        <th>Study Name (for Dashboard)</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map((task) => (
        <tr key={task.id}>
          <td>{task.name}</td>
          <td>
            <code>task-{task.id}</code>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);
```
