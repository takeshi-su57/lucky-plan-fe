# Frontend Specification: Validation Pipeline Feature

This document provides detailed frontend implementation specifications for the 6-Layer Validation Pipeline feature.

---

## Table of Contents

1. [Feature Overview](#1-feature-overview)
2. [User Flow Diagram](#2-user-flow-diagram)
3. [Pages & Routes](#3-pages--routes)
4. [Component Specifications](#4-component-specifications)
5. [GraphQL API Reference](#5-graphql-api-reference)
6. [TypeScript Interfaces](#6-typescript-interfaces)
7. [State Management](#7-state-management)
8. [Real-time Updates](#8-real-time-updates)
9. [Frontend Task Checklist](#9-frontend-task-checklist)

---

## 1. Feature Overview

### What is the Validation Pipeline?

A multi-layer filtering system that validates backtest strategies through 6 stages:

```
┌─────────────────────────────────────────────────────────────────┐
│  Layer 1: Threshold Filter                                       │
│  ─────────────────────────────────────────────────────────────  │
│  Filters strategies based on min/max metric rules                │
│  Example: Sharpe > 1.0, Drawdown < 20%, WinRate > 40%           │
│  Status: PENDING → PASSED_THRESHOLD / FAILED_THRESHOLD           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer 2: Pareto Selection                                       │
│  ─────────────────────────────────────────────────────────────  │
│  Multi-objective optimization: find non-dominated solutions      │
│  Metrics: sharpeRatio, totalPnlPercent, maxDrawdownPercent       │
│  Status: PASSED_THRESHOLD → PARETO_OPTIMAL / PARETO_DOMINATED    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer 3: Walk-Forward Analysis (WFA)                            │
│  ─────────────────────────────────────────────────────────────  │
│  Splits data into train/test windows to check consistency        │
│  Config: 70% train / 30% test, 3 windows, 60% min consistency   │
│  Status: PARETO_OPTIMAL → WFA_PASSED / WFA_FAILED               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer 4: User Selection (MANUAL)                                │
│  ─────────────────────────────────────────────────────────────  │
│  User reviews WFA results and selects candidates to proceed      │
│  UI: Checkbox selection with notes                               │
│  Status: WFA_PASSED → USER_SELECTED / USER_REJECTED             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer 5: Robustness Testing                                     │
│  ─────────────────────────────────────────────────────────────  │
│  Tests strategy with different start dates (entry point test)    │
│  Config: 10 steps, 70% min stability score                       │
│  Status: USER_SELECTED → ROBUSTNESS_PASSED / ROBUSTNESS_FAILED  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer 6: Final Approval (MANUAL)                                │
│  ─────────────────────────────────────────────────────────────  │
│  User reviews robustness results and gives final approval        │
│  UI: Final selection with notes                                  │
│  Status: ROBUSTNESS_PASSED → FINAL_APPROVED / FINAL_REJECTED    │
└─────────────────────────────────────────────────────────────────┘
```

### Pipeline Status Flow

```
CREATED → LAYER_1_RUNNING → LAYER_1_DONE
                               ↓
        LAYER_2_RUNNING → LAYER_2_DONE
                               ↓
        LAYER_3_RUNNING → LAYER_3_DONE
                               ↓
              AWAITING_USER_SELECTION  ← [USER ACTION: Select candidates]
                               ↓
        LAYER_5_RUNNING → LAYER_5_DONE
                               ↓
              AWAITING_FINAL_APPROVAL  ← [USER ACTION: Final approval]
                               ↓
                          COMPLETED

        (Any stage can → FAILED or CANCELLED)
```

---

## 2. User Flow Diagram

```
┌────────────────────────────────────────────────────────────────────┐
│                     TEMPLATE SEARCH (Existing)                      │
│  User completes a template search with optimization results         │
└────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ "Create Validation Pipeline" button
                                  ▼
┌────────────────────────────────────────────────────────────────────┐
│                   CREATE PIPELINE MODAL                             │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ Pipeline Name: [________________]                              │ │
│  │                                                                │ │
│  │ ─── Layer 1: Threshold Config ───                             │ │
│  │ Min Sharpe Ratio:    [1.0  ]  Max Drawdown %: [20   ]        │ │
│  │ Min Win Rate:        [0.4  ]  Min Total Trades: [50  ]       │ │
│  │ Min PnL %:           [10   ]  Min Profit Factor: [1.5 ]      │ │
│  │                                                                │ │
│  │ ─── Layer 2: Pareto Metrics ───                               │ │
│  │ ☑ Sharpe Ratio  ☑ Total PnL %  ☑ Max Drawdown %              │ │
│  │                                                                │ │
│  │ ─── Layer 3: Walk-Forward Config ───                          │ │
│  │ Train Ratio: [0.7 ]  Windows: [3 ]  Min Consistency: [0.6 ]  │ │
│  │                                                                │ │
│  │ ─── Layer 5: Robustness Config ───                            │ │
│  │ Test Steps: [10  ]  Min Stability Score: [0.7 ]              │ │
│  │                                                                │ │
│  │                    [Cancel]  [Create & Start]                 │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ Pipeline created, auto-starts
                                  ▼
┌────────────────────────────────────────────────────────────────────┐
│                   PIPELINE DETAIL PAGE                              │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ Pipeline: Q1 2024 Validation                    [Cancel] btn  │ │
│  │ Status: LAYER_1_RUNNING                                       │ │
│  │                                                                │ │
│  │ ┌─ Progress Tracker ────────────────────────────────────────┐ │ │
│  │ │ ● Layer 1   ○ Layer 2   ○ Layer 3   ○ User   ○ L5   ○ Fin │ │ │
│  │ │   Running     Pending     Pending    Select   Rob   App   │ │ │
│  │ └───────────────────────────────────────────────────────────┘ │ │
│  │                                                                │ │
│  │ ┌─ Stats ───────────────────────────────────────────────────┐ │ │
│  │ │ Total: 1,234  │ Threshold: 456  │ Pareto: 45  │ WFA: 23  │ │ │
│  │ │               │ Selected: -     │ Robust: -   │ Final: - │ │ │
│  │ └───────────────────────────────────────────────────────────┘ │ │
│  │                                                                │ │
│  │ [Candidates Tab]  [WFA Results Tab]  [Robustness Tab]        │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ Layers 1-3 complete automatically
                                  ▼
┌────────────────────────────────────────────────────────────────────┐
│               AWAITING USER SELECTION (Layer 4)                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ Status: AWAITING_USER_SELECTION                               │ │
│  │                                                                │ │
│  │ Select candidates to proceed to robustness testing:           │ │
│  │                                                                │ │
│  │ ┌─ WFA Passed Candidates (23) ──────────────────────────────┐ │ │
│  │ │ ☑ │ Config ID │ Sharpe │ PnL %  │ DD %  │ WFA Score │     │ │ │
│  │ │───│───────────│────────│────────│───────│───────────│     │ │ │
│  │ │ ☑ │ abc-123   │ 2.34   │ 45.6%  │ 12.3% │ 0.85      │ [👁]│ │ │
│  │ │ ☑ │ def-456   │ 2.12   │ 38.2%  │ 14.1% │ 0.78      │ [👁]│ │ │
│  │ │ ☐ │ ghi-789   │ 1.89   │ 32.1%  │ 15.8% │ 0.72      │ [👁]│ │ │
│  │ │ ...                                                        │ │ │
│  │ └────────────────────────────────────────────────────────────┘ │ │
│  │                                                                │ │
│  │ Notes: [_________________________________________________]    │ │
│  │                                                                │ │
│  │                              [Submit Selection (5 selected)]  │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ Layer 5 runs automatically
                                  ▼
┌────────────────────────────────────────────────────────────────────┐
│               AWAITING FINAL APPROVAL (Layer 6)                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ Status: AWAITING_FINAL_APPROVAL                               │ │
│  │                                                                │ │
│  │ Review robustness results and approve final strategies:       │ │
│  │                                                                │ │
│  │ ┌─ Robustness Passed Candidates (3) ────────────────────────┐ │ │
│  │ │ ☑ │ Config ID │ Sharpe │ Stability │ Robustness Chart     │ │ │
│  │ │───│───────────│────────│───────────│──────────────────────│ │ │
│  │ │ ☑ │ abc-123   │ 2.34   │ 0.92      │ [📊 Sparkline]       │ │ │
│  │ │ ☐ │ def-456   │ 2.12   │ 0.71      │ [📊 Sparkline]       │ │ │
│  │ │ ...                                                        │ │ │
│  │ └────────────────────────────────────────────────────────────┘ │ │
│  │                                                                │ │
│  │ Notes: [_________________________________________________]    │ │
│  │                                                                │ │
│  │                              [Approve & Complete (2 selected)]│ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────┐
│                        PIPELINE COMPLETED                           │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ Status: COMPLETED ✓                                           │ │
│  │                                                                │ │
│  │ Final Approved Strategies: 2                                  │ │
│  │                                                                │ │
│  │ ┌─ Approved Strategies ─────────────────────────────────────┐ │ │
│  │ │ abc-123: Sharpe 2.34, PnL 45.6%, DD 12.3%                 │ │ │
│  │ │          [View Config] [Export] [Deploy to Live]          │ │ │
│  │ │                                                            │ │ │
│  │ │ xyz-999: Sharpe 1.98, PnL 38.2%, DD 11.1%                 │ │ │
│  │ │          [View Config] [Export] [Deploy to Live]          │ │ │
│  │ └────────────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

---

## 3. Pages & Routes

### New Routes to Add

| Route                                               | Page             | Description                         |
| --------------------------------------------------- | ---------------- | ----------------------------------- |
| `/validation-pipelines`                             | Pipeline List    | List all pipelines with stats       |
| `/validation-pipelines/:id`                         | Pipeline Detail  | View pipeline progress & candidates |
| `/validation-pipelines/:id/candidates/:candidateId` | Candidate Detail | View detailed candidate analysis    |

### Integration Points (Existing Pages)

| Page                   | Integration                                                 |
| ---------------------- | ----------------------------------------------------------- |
| Template Search Detail | Add "Create Validation Pipeline" button when status is DONE |
| Template Search List   | Add column showing validation pipeline status if exists     |

---

## 4. Component Specifications

### 4.1 Pipeline List Page

**File:** `pages/validation-pipelines/index.tsx`

```tsx
// Features:
// - Table with pagination
// - Filter by status
// - Sort by created date
// - Quick actions (view, cancel, delete)
// - Stats summary at top

interface PipelineListPageProps {}

// Columns:
// | Name | Template | Status | Progress | Candidates | Created | Actions |
```

**Required Components:**

- `PipelineStatusBadge` - Color-coded status indicator
- `PipelineProgressBar` - Visual progress through layers
- `PipelineStatsCard` - Summary statistics

### 4.2 Pipeline Detail Page

**File:** `pages/validation-pipelines/[id]/index.tsx`

```tsx
// Features:
// - Header with name, status, actions
// - Progress tracker (visual layer progress)
// - Stats grid
// - Tabbed content:
//   - Candidates tab (filterable by status)
//   - WFA Results tab (when available)
//   - Robustness Results tab (when available)
//   - Configuration tab
// - Action buttons based on status:
//   - AWAITING_USER_SELECTION: "Submit Selection" button
//   - AWAITING_FINAL_APPROVAL: "Submit Approval" button
```

### 4.3 Layer Progress Tracker Component

**File:** `components/validation/LayerProgressTracker.tsx`

```tsx
interface LayerProgressTrackerProps {
  status: ValidationPipelineStatus;
  stats: {
    totalCandidates: number;
    passedThreshold: number;
    paretoOptimal: number;
    passedWfa: number;
    userSelected: number;
    passedRobustness: number;
    finalApproved: number;
  };
}

// Visual representation:
// [●]─────[●]─────[●]─────[○]─────[○]─────[○]
//  L1      L2      L3      L4      L5      L6
// 1234    456      45      --      --      --
//
// Legend:
// ● = Completed (green)
// ◐ = In Progress (blue, animated)
// ○ = Pending (gray)
// ✕ = Failed (red)
// ⏸ = Awaiting User (yellow)
```

### 4.4 Candidate Selection Component

**File:** `components/validation/CandidateSelectionTable.tsx`

```tsx
interface CandidateSelectionTableProps {
  candidates: ValidationCandidateWithResult[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  mode: "user_selection" | "final_approval";
}

// Features:
// - Checkbox column for selection
// - Sortable columns
// - Expandable rows for detail view
// - Metric highlighting (good/bad indicators)
// - WFA/Robustness score visualization
// - View detail button
```

### 4.5 Create Pipeline Modal

**File:** `components/validation/CreatePipelineModal.tsx`

```tsx
interface CreatePipelineModalProps {
  templateSearchId: string;
  templateSearchName: string;
  isOpen: boolean;
  onClose: () => void;
  onCreated: (pipeline: ValidationPipeline) => void;
}

// Form sections:
// 1. Basic Info (name)
// 2. Threshold Config (Layer 1)
// 3. Pareto Metrics (Layer 2)
// 4. WFA Config (Layer 3)
// 5. Robustness Config (Layer 5)
//
// Default values should be pre-filled
// Advanced options collapsible
```

### 4.6 WFA Results Visualization

**File:** `components/validation/WFAResultsChart.tsx`

```tsx
interface WFAResultsChartProps {
  results: WalkForwardResult[];
  metric: "sharpeRatio" | "totalPnlPercent" | "consistency";
}

// Visualization:
// - Bar chart showing train vs test performance per window
// - Line showing consistency across windows
// - Color coding: green if test >= threshold of train
```

### 4.7 Robustness Results Visualization

**File:** `components/validation/RobustnessChart.tsx`

```tsx
interface RobustnessChartProps {
  tests: RobustnessTest[];
  minScore: number;
}

// Visualization:
// - Line chart showing metric across different start dates
// - Confidence band / standard deviation
// - Horizontal line showing threshold
// - Pass/fail indicator
```

### 4.8 Candidate Detail Modal/Page

**File:** `components/validation/CandidateDetailView.tsx`

```tsx
interface CandidateDetailViewProps {
  candidate: ValidationCandidateWithDetails;
}

// Sections:
// 1. Summary metrics from backtest result
// 2. Threshold results (which passed/failed)
// 3. Pareto analysis (rank, dominated by)
// 4. WFA results with charts
// 5. Robustness results with charts
// 6. Strategy config viewer
```

---

## 5. GraphQL API Reference

### 5.1 Queries

```graphql
# List pipelines
query GetValidationPipelines($filter: ValidationPipelineFilterInput) {
  validationPipelines(filter: $filter) {
    id
    name
    status
    templateSearchId
    totalCandidates
    passedThreshold
    paretoOptimal
    passedWfa
    userSelected
    passedRobustness
    finalApproved
    createdAt
    startedAt
    completedAt
    errorMessage
  }
}

# Get single pipeline
query GetValidationPipeline($id: ID!) {
  validationPipeline(id: $id) {
    id
    name
    status
    templateSearchId
    thresholdConfig
    paretoMetrics
    wfaTrainRatio
    wfaWindows
    wfaMinConsistency
    robustnessSteps
    robustnessMinScore
    totalCandidates
    passedThreshold
    paretoOptimal
    passedWfa
    userSelected
    passedRobustness
    finalApproved
    createdAt
    startedAt
    completedAt
    errorMessage
  }
}

# Get pipeline with candidates
query GetValidationPipelineWithCandidates($id: ID!) {
  validationPipelineWithCandidates(id: $id) {
    id
    name
    status
    # ... all pipeline fields ...
    candidates {
      id
      configId
      status
      thresholdPassed
      thresholdDetails
      paretoRank
      dominatedBy
      wfaConsistency
      wfaPassed
      userSelectedAt
      userNotes
      robustnessScore
      robustnessPassed
      finalApprovedAt
      finalNotes
      createdAt
      updatedAt
    }
  }
}

# Get candidates by status (with result data)
query GetCandidatesByStatus($filter: ValidationCandidateFilterInput!) {
  validationCandidatesByStatus(filter: $filter) {
    id
    configId
    status
    thresholdPassed
    thresholdDetails
    paretoRank
    wfaConsistency
    wfaPassed
    robustnessScore
    robustnessPassed
    result {
      id
      configId
      totalTrades
      winRate
      totalPnlUsdt
      totalPnlPercent
      maxDrawdownPercent
      sharpeRatio
      profitFactor
      strategyConfig
    }
  }
}

# Get candidate with full details (WFA + Robustness results)
query GetValidationCandidate($id: ID!) {
  validationCandidate(id: $id) {
    id
    configId
    status
    # ... all candidate fields ...
    result {
      id
      # ... all result fields ...
    }
    walkForwardResults {
      id
      windowIndex
      status
      trainStart
      trainEnd
      trainMetrics
      testStart
      testEnd
      testMetrics
      consistency
      degradation
      errorMessage
    }
    robustnessTests {
      id
      stepIndex
      status
      startDate
      endDate
      metrics
      sharpeRatio
      totalPnl
      maxDrawdown
      errorMessage
    }
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
```

### 5.2 Mutations

```graphql
# Create pipeline
mutation CreateValidationPipeline($input: CreateValidationPipelineInput!) {
  createValidationPipeline(input: $input) {
    id
    name
    status
    totalCandidates
  }
}

# Start pipeline (if not auto-started)
mutation StartValidationPipeline($id: ID!) {
  startValidationPipeline(id: $id) {
    id
    status
  }
}

# Submit user selection (Layer 4)
mutation SubmitUserSelection($pipelineId: ID!, $input: UserSelectionInput!) {
  submitUserSelection(pipelineId: $pipelineId, input: $input) {
    id
    status
    userSelected
  }
}

# Submit final approval (Layer 6)
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

### 5.3 Subscriptions

```graphql
# Pipeline status updates
subscription OnValidationPipelineUpdated {
  validationPipelineUpdated {
    id
    status
    passedThreshold
    paretoOptimal
    passedWfa
    userSelected
    passedRobustness
    finalApproved
    errorMessage
  }
}

# Candidate status updates
subscription OnValidationCandidateUpdated {
  validationCandidateUpdated {
    id
    pipelineId
    status
    thresholdPassed
    paretoRank
    wfaConsistency
    wfaPassed
    robustnessScore
    robustnessPassed
  }
}
```

---

## 6. TypeScript Interfaces

```typescript
// ============================================
// ENUMS
// ============================================

enum ValidationPipelineStatus {
  CREATED = "CREATED",
  LAYER_1_RUNNING = "LAYER_1_RUNNING",
  LAYER_1_DONE = "LAYER_1_DONE",
  LAYER_2_RUNNING = "LAYER_2_RUNNING",
  LAYER_2_DONE = "LAYER_2_DONE",
  LAYER_3_RUNNING = "LAYER_3_RUNNING",
  LAYER_3_DONE = "LAYER_3_DONE",
  AWAITING_USER_SELECTION = "AWAITING_USER_SELECTION",
  LAYER_5_RUNNING = "LAYER_5_RUNNING",
  LAYER_5_DONE = "LAYER_5_DONE",
  AWAITING_FINAL_APPROVAL = "AWAITING_FINAL_APPROVAL",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

enum ValidationCandidateStatus {
  PENDING = "PENDING",
  PASSED_THRESHOLD = "PASSED_THRESHOLD",
  FAILED_THRESHOLD = "FAILED_THRESHOLD",
  PARETO_OPTIMAL = "PARETO_OPTIMAL",
  PARETO_DOMINATED = "PARETO_DOMINATED",
  WFA_PENDING = "WFA_PENDING",
  WFA_PASSED = "WFA_PASSED",
  WFA_FAILED = "WFA_FAILED",
  USER_SELECTED = "USER_SELECTED",
  USER_REJECTED = "USER_REJECTED",
  ROBUSTNESS_PENDING = "ROBUSTNESS_PENDING",
  ROBUSTNESS_PASSED = "ROBUSTNESS_PASSED",
  ROBUSTNESS_FAILED = "ROBUSTNESS_FAILED",
  FINAL_APPROVED = "FINAL_APPROVED",
  FINAL_REJECTED = "FINAL_REJECTED",
}

enum WalkForwardStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  FAILED = "FAILED",
}

enum RobustnessTestStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  FAILED = "FAILED",
}

// ============================================
// TYPES
// ============================================

interface ThresholdConfig {
  minSharpeRatio?: number;
  maxSharpeRatio?: number;
  minWinRate?: number;
  minProfitFactor?: number;
  maxDrawdownPercent?: number;
  minTotalTrades?: number;
  minTotalPnlPercent?: number;
}

interface ThresholdDetail {
  value: number;
  threshold: number;
  passed: boolean;
}

interface ThresholdDetails {
  sharpeRatio?: ThresholdDetail;
  winRate?: ThresholdDetail;
  profitFactor?: ThresholdDetail;
  maxDrawdownPercent?: ThresholdDetail;
  totalTrades?: ThresholdDetail;
  totalPnlPercent?: ThresholdDetail;
}

interface ValidationPipeline {
  id: string;
  name: string;
  templateSearchId: string;
  status: ValidationPipelineStatus;
  thresholdConfig: ThresholdConfig;
  paretoMetrics: string[];
  wfaTrainRatio: number;
  wfaWindows: number;
  wfaMinConsistency: number;
  robustnessSteps: number;
  robustnessMinScore: number;
  // Stats
  totalCandidates: number;
  passedThreshold: number;
  paretoOptimal: number;
  passedWfa: number;
  userSelected: number;
  passedRobustness: number;
  finalApproved: number;
  // Timestamps
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  errorMessage?: string;
}

interface ValidationCandidate {
  id: string;
  pipelineId: string;
  resultId: string;
  configId: string;
  status: ValidationCandidateStatus;
  // Layer 1
  thresholdPassed?: boolean;
  thresholdDetails?: ThresholdDetails;
  // Layer 2
  paretoRank?: number;
  dominatedBy?: string[];
  // Layer 3
  wfaConsistency?: number;
  wfaPassed?: boolean;
  // Layer 4
  userSelectedAt?: Date;
  userNotes?: string;
  // Layer 5
  robustnessScore?: number;
  robustnessPassed?: boolean;
  // Layer 6
  finalApprovedAt?: Date;
  finalNotes?: string;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

interface ValidationCandidateWithResult extends ValidationCandidate {
  result: BacktestResult;
}

interface ValidationCandidateWithDetails extends ValidationCandidateWithResult {
  walkForwardResults: WalkForwardResult[];
  robustnessTests: RobustnessTest[];
}

interface WalkForwardResult {
  id: string;
  candidateId: string;
  windowIndex: number;
  status: WalkForwardStatus;
  trainStart: Date;
  trainEnd: Date;
  trainMetrics?: Record<string, number>;
  testStart: Date;
  testEnd: Date;
  testMetrics?: Record<string, number>;
  consistency?: number;
  degradation?: number;
  errorMessage?: string;
  createdAt: Date;
}

interface RobustnessTest {
  id: string;
  candidateId: string;
  stepIndex: number;
  status: RobustnessTestStatus;
  startDate: Date;
  endDate: Date;
  metrics?: Record<string, number>;
  sharpeRatio?: number;
  totalPnl?: number;
  maxDrawdown?: number;
  errorMessage?: string;
  createdAt: Date;
}

// ============================================
// INPUT TYPES
// ============================================

interface CreateValidationPipelineInput {
  name: string;
  templateSearchId: string;
  thresholdConfig: ThresholdConfig;
  paretoMetrics?: string[];
  wfaTrainRatio?: number;
  wfaWindows?: number;
  wfaMinConsistency?: number;
  robustnessSteps?: number;
  robustnessMinScore?: number;
}

interface UserSelectionInput {
  selectedCandidateIds: string[];
  rejectedCandidateIds?: string[];
  notes?: string;
}

interface FinalApprovalInput {
  approvedCandidateIds: string[];
  notes?: string;
}

interface ValidationPipelineFilterInput {
  status?: ValidationPipelineStatus;
  templateSearchId?: string;
  limit?: number;
  offset?: number;
}

interface ValidationCandidateFilterInput {
  pipelineId: string;
  status?: ValidationCandidateStatus;
  limit?: number;
  offset?: number;
}

interface ValidationPipelineStats {
  created: number;
  running: number;
  awaitingUser: number;
  completed: number;
  failed: number;
  cancelled: number;
}
```

---

## 7. State Management

### Recommended State Structure

```typescript
// Using Zustand or similar
interface ValidationStore {
  // Pipeline list
  pipelines: ValidationPipeline[];
  pipelinesLoading: boolean;
  pipelinesError: string | null;

  // Current pipeline
  currentPipeline: ValidationPipeline | null;
  currentPipelineLoading: boolean;

  // Candidates
  candidates: ValidationCandidateWithResult[];
  candidatesLoading: boolean;
  selectedCandidateIds: string[];

  // Actions
  fetchPipelines: (filter?: ValidationPipelineFilterInput) => Promise<void>;
  fetchPipeline: (id: string) => Promise<void>;
  fetchCandidates: (
    pipelineId: string,
    status?: ValidationCandidateStatus,
  ) => Promise<void>;
  setSelectedCandidates: (ids: string[]) => void;
  toggleCandidateSelection: (id: string) => void;
  selectAllCandidates: () => void;
  clearSelection: () => void;

  // Mutations
  createPipeline: (
    input: CreateValidationPipelineInput,
  ) => Promise<ValidationPipeline>;
  submitUserSelection: (
    pipelineId: string,
    input: UserSelectionInput,
  ) => Promise<void>;
  submitFinalApproval: (
    pipelineId: string,
    input: FinalApprovalInput,
  ) => Promise<void>;
  cancelPipeline: (id: string) => Promise<void>;
  deletePipeline: (id: string) => Promise<void>;

  // Real-time updates
  handlePipelineUpdate: (pipeline: Partial<ValidationPipeline>) => void;
  handleCandidateUpdate: (candidate: Partial<ValidationCandidate>) => void;
}
```

---

## 8. Real-time Updates

### Subscription Setup

```typescript
// hooks/useValidationSubscriptions.ts

export function useValidationPipelineSubscription(
  pipelineId: string,
  onUpdate: (pipeline: ValidationPipeline) => void,
) {
  const { data } = useSubscription(VALIDATION_PIPELINE_UPDATED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const updated = subscriptionData.data?.validationPipelineUpdated;
      if (updated && updated.id === pipelineId) {
        onUpdate(updated);
      }
    },
  });
}

export function useValidationCandidateSubscription(
  pipelineId: string,
  onUpdate: (candidate: ValidationCandidate) => void,
) {
  const { data } = useSubscription(VALIDATION_CANDIDATE_UPDATED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const updated = subscriptionData.data?.validationCandidateUpdated;
      if (updated && updated.pipelineId === pipelineId) {
        onUpdate(updated);
      }
    },
  });
}
```

### UI Update Strategy

```typescript
// When pipeline status changes:
// 1. Update stats display
// 2. Update progress tracker
// 3. Show toast notification
// 4. If status changed to AWAITING_*, show action prompt

// When candidate status changes:
// 1. Update candidate in list
// 2. Update pipeline stats
// 3. Animate status badge change
```

---

## 9. Frontend Task Checklist

### Phase 1: Foundation (Must Have)

- [ ] **Task F1.1:** Create TypeScript interfaces for all validation types
- [ ] **Task F1.2:** Create GraphQL query/mutation/subscription hooks
- [ ] **Task F1.3:** Create `ValidationPipelineStatus` badge component
- [ ] **Task F1.4:** Create `ValidationCandidateStatus` badge component
- [ ] **Task F1.5:** Create `LayerProgressTracker` component

### Phase 2: Pipeline List Page

- [ ] **Task F2.1:** Create `/validation-pipelines` route
- [ ] **Task F2.2:** Create pipeline list table with columns
- [ ] **Task F2.3:** Add status filter dropdown
- [ ] **Task F2.4:** Add pipeline stats summary cards
- [ ] **Task F2.5:** Add delete confirmation modal
- [ ] **Task F2.6:** Add cancel confirmation modal

### Phase 3: Create Pipeline Flow

- [ ] **Task F3.1:** Create `CreatePipelineModal` component
- [ ] **Task F3.2:** Add threshold config form section
- [ ] **Task F3.3:** Add Pareto metrics selection
- [ ] **Task F3.4:** Add WFA config section (collapsible)
- [ ] **Task F3.5:** Add robustness config section (collapsible)
- [ ] **Task F3.6:** Add form validation
- [ ] **Task F3.7:** Integrate into Template Search detail page

### Phase 4: Pipeline Detail Page

- [ ] **Task F4.1:** Create `/validation-pipelines/:id` route
- [ ] **Task F4.2:** Create pipeline header with status and actions
- [ ] **Task F4.3:** Implement `LayerProgressTracker` integration
- [ ] **Task F4.4:** Create stats grid component
- [ ] **Task F4.5:** Create tabbed content (Candidates, WFA, Robustness, Config)
- [ ] **Task F4.6:** Implement real-time subscription updates

### Phase 5: Candidates Tab

- [ ] **Task F5.1:** Create `CandidateSelectionTable` component
- [ ] **Task F5.2:** Add candidate status filter
- [ ] **Task F5.3:** Add sortable columns
- [ ] **Task F5.4:** Add row expansion for quick detail view
- [ ] **Task F5.5:** Add bulk selection (select all)
- [ ] **Task F5.6:** Add metric color coding (good/warning/bad)

### Phase 6: User Selection (Layer 4)

- [ ] **Task F6.1:** Create selection UI when status is `AWAITING_USER_SELECTION`
- [ ] **Task F6.2:** Filter to show only WFA_PASSED candidates
- [ ] **Task F6.3:** Add notes input field
- [ ] **Task F6.4:** Add selection count display
- [ ] **Task F6.5:** Create submit confirmation modal
- [ ] **Task F6.6:** Handle `submitUserSelection` mutation

### Phase 7: Final Approval (Layer 6)

- [ ] **Task F7.1:** Create approval UI when status is `AWAITING_FINAL_APPROVAL`
- [ ] **Task F7.2:** Filter to show only ROBUSTNESS_PASSED candidates
- [ ] **Task F7.3:** Add robustness visualization inline
- [ ] **Task F7.4:** Add notes input field
- [ ] **Task F7.5:** Create submit confirmation modal
- [ ] **Task F7.6:** Handle `submitFinalApproval` mutation

### Phase 8: Candidate Detail View

- [ ] **Task F8.1:** Create candidate detail modal/page
- [ ] **Task F8.2:** Display backtest result metrics
- [ ] **Task F8.3:** Display threshold check results
- [ ] **Task F8.4:** Display Pareto analysis info
- [ ] **Task F8.5:** Create WFA results chart
- [ ] **Task F8.6:** Create robustness results chart
- [ ] **Task F8.7:** Add strategy config viewer

### Phase 9: Visualizations

- [ ] **Task F9.1:** Create `WFAResultsChart` component (train vs test bars)
- [ ] **Task F9.2:** Create `RobustnessChart` component (line chart with band)
- [ ] **Task F9.3:** Create sparkline components for inline display
- [ ] **Task F9.4:** Add chart tooltips with detailed info

### Phase 10: Integration & Polish

- [ ] **Task F10.1:** Add "Create Validation" button to Template Search detail
- [ ] **Task F10.2:** Add validation pipeline indicator to Template Search list
- [ ] **Task F10.3:** Add toast notifications for status changes
- [ ] **Task F10.4:** Add loading states for all async operations
- [ ] **Task F10.5:** Add error handling and display
- [ ] **Task F10.6:** Add empty states for no data scenarios
- [ ] **Task F10.7:** Mobile responsiveness

### Phase 11: Completed Pipeline Features

- [ ] **Task F11.1:** Display final approved strategies prominently
- [ ] **Task F11.2:** Add "View Config" action for approved strategies
- [ ] **Task F11.3:** Add "Export" action for approved strategies
- [ ] **Task F11.4:** (Future) Add "Deploy to Live" action

---

## Summary

This specification covers the complete frontend implementation for the Validation Pipeline feature. The implementation can be broken down into 11 phases with specific tasks for each.

**Recommended Implementation Order:**

1. Phase 1 (Foundation) - Required for everything else
2. Phase 2 (List Page) - Basic navigation
3. Phase 4 (Detail Page) - Core viewing functionality
4. Phase 5 (Candidates Tab) - Essential for understanding pipeline
5. Phase 3 (Create Flow) - Enable creating new pipelines
6. Phase 6 (User Selection) - First user action point
7. Phase 7 (Final Approval) - Second user action point
8. Phase 8-9 (Details & Visualizations) - Enhanced understanding
9. Phase 10-11 (Polish) - Final touches

**Estimated Effort:** 40-60 hours depending on existing component library and familiarity with the codebase.
