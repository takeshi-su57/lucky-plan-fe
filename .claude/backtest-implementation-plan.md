# Backtest Feature - Implementation Plan

## Overview

Build a new `/backtest` page titled "Backtest for Composable Strategy" that allows users to create optimization tasks, monitor progress, and analyze results with charts and detailed data views.

---

## 1. File Structure

```
app/
├── backtest/
│   ├── page.tsx                    # Main backtest page
│   └── layout.tsx                  # Optional layout wrapper
│
├── _components/
│   └── BacktestWidgets/
│       ├── index.ts                # Barrel export
│       │
│       │── Task List View
│       ├── BacktestTaskList.tsx    # List all tasks with filters
│       ├── BacktestTaskRow.tsx     # Individual task row with status/progress
│       ├── BacktestTaskStatusBadge.tsx  # Color-coded status badge
│       │
│       │── Task Detail / Results View
│       ├── BacktestTaskDetail.tsx  # Task detail with results grid
│       ├── BacktestTaskProgress.tsx # Progress bar + stats
│       ├── BacktestResultCard.tsx  # Result card with chart hero
│       ├── BacktestResultGrid.tsx  # Grid of result cards
│       │
│       │── Result Detail Modal
│       ├── BacktestResultDetailModal.tsx  # Full result details
│       ├── BacktestConfigView.tsx  # JSON tree view for config
│       ├── BacktestTradeTable.tsx  # CSV table with virtual scroll
│       ├── BacktestSummaryView.tsx # Trade summary display
│       ├── BacktestChartView.tsx   # PnL chart image view
│       │
│       │── Create Task Drawer
│       ├── CreateBacktestTaskDrawer.tsx  # Main drawer container
│       ├── ComponentSelector.tsx   # Signal/Filter/Risk/Exit selector
│       ├── ParamRangeInput.tsx     # Input for param arrays [10, 20, 30]
│       ├── DateRangePicker.tsx     # Start/End date selection
│       └── ConfigPreview.tsx       # Total configs calculation preview
│
├── _hooks/
│   └── useBacktest.tsx             # All backtest GraphQL operations
│
graphql/
├── schema.gql                      # Add backtest types (update)
```

---

## 2. GraphQL Schema Updates

Add to `schema.graphql`:

```graphql
# Enums
enum BacktestTaskStatus {
  AWAIT
  PROCESSING
  DONE
  FAILED
  CANCELLED
}

# Types
type BacktestTask {
  id: ID!
  name: String!
  symbol: String!
  status: BacktestTaskStatus!
  progress: Float!
  totalConfigs: Int!
  processedConfigs: Int!
  currentConfig: String
  startDate: Date!
  endDate: Date!
  interval: String!
  optimizationParams: String!  # JSON string
  createdAt: Date!
  startedAt: Date
  completedAt: Date
  errorMessage: String
}

type BacktestResult {
  id: ID!
  taskId: ID!
  configId: String!
  runDate: String!
  strategyConfig: String!  # JSON string
  totalTrades: Int!
  winningTrades: Int!
  losingTrades: Int!
  winRate: Float!
  totalPnlUsdt: Float!
  totalPnlPercent: Float!
  maxDrawdownUsdt: Float!
  maxDrawdownPercent: Float!
  sharpeRatio: Float
  profitFactor: Float
  resultFolder: String!
  createdAt: Date!
}

type BacktestResultFile {
  name: String!
  content: String!
  contentType: String!
  size: Int!
}

type BacktestResultFolder {
  taskId: ID!
  date: String!
  configId: String!
  files: [String!]!
}

type BacktestTaskStats {
  await: Int!
  processing: Int!
  done: Int!
  failed: Int!
}

type BacktestComponentParam {
  name: String!
  type: String!
  required: Boolean!
  default: String
  description: String
  min: Float
  max: Float
}

type BacktestComponent {
  name: String!
  description: String!
  params: [BacktestComponentParam!]!
}

type BacktestComponents {
  signals: [BacktestComponent!]!
  filters: [BacktestComponent!]!
  risk: [BacktestComponent!]!
  exits: [BacktestComponent!]!
}

# Input Types
input CreateBacktestTaskInput {
  name: String!
  symbol: String!
  startDate: Date!
  endDate: Date!
  interval: String
  optimizationParams: String!  # JSON string
}

# Queries
extend type Query {
  backtestComponents: BacktestComponents!
  backtestTask(id: ID!): BacktestTask
  backtestTasks(
    status: BacktestTaskStatus
    symbol: String
    limit: Int
    offset: Int
  ): [BacktestTask!]!
  backtestTaskStats: BacktestTaskStats!
  backtestResults(
    taskId: ID!
    sortBy: String
    sortOrder: String
    limit: Int
    offset: Int
  ): [BacktestResult!]!
  backtestResultDates(taskId: ID!): [String!]!
  backtestResultFolders(taskId: ID!, date: String!): [BacktestResultFolder!]!
  backtestResultFile(
    taskId: ID!
    date: String!
    configId: String!
    fileName: String!
  ): BacktestResultFile!
}

# Mutations
extend type Mutation {
  createBacktestTask(input: CreateBacktestTaskInput!): BacktestTask!
  cancelBacktestTask(taskId: ID!): BacktestTask!
  deleteBacktestTask(taskId: ID!): Boolean!
  retryBacktestTask(taskId: ID!): BacktestTask!
}

# Subscriptions
extend type Subscription {
  backtestTaskUpdated(taskId: ID!): BacktestTask!
  backtestResultCreated(taskId: ID!): BacktestResult!
}
```

---

## 3. Component Specifications

### 3.1 Main Page (`app/backtest/page.tsx`)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Backtest for Composable Strategy              [+ Add Task]      │
│ Create and manage backtest optimization tasks                   │
├─────────────────────────────────────────────────────────────────┤
│ [All Tasks] [Results]                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  (Content based on selected tab)                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**State:**
- `selectedTab`: "tasks" | "results"
- `selectedTaskId`: string | null
- `isCreateDrawerOpen`: boolean

**Behavior:**
- "Results" tab disabled until a task is selected
- Clicking a task switches to Results tab
- Add Task button opens CreateBacktestTaskDrawer

---

### 3.2 BacktestTaskList

**Purpose:** Display all backtest tasks with filtering and status

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Filter: [All ▼] [Symbol ▼]                    Stats: 5 Done     │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ EMA Optimization - BTC                    [PROCESSING]      │ │
│ │ BTCUSDT | 54/486 configs | ████████░░░░ 11%                │ │
│ │ Created: 2024-01-15 10:30                                   │ │
│ │                                    [View] [Cancel] [Delete] │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ RSI Strategy Test                              [DONE]       │ │
│ │ ETHUSDT | 120/120 configs | ████████████ 100%              │ │
│ │ Completed: 2024-01-14 15:45                                 │ │
│ │                                    [View] [Retry] [Delete]  │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface BacktestTaskListProps {
  onSelectTask: (taskId: string) => void;
}
```

**Features:**
- Filter by status (All, Await, Processing, Done, Failed)
- Filter by symbol
- Task stats summary
- Real-time progress updates via subscription
- Actions: View, Cancel (if processing), Retry (if failed), Delete

---

### 3.3 BacktestTaskDetail

**Purpose:** Show task info and results grid

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ [← Back] EMA Optimization - BTC                                 │
├─────────────────────────────────────────────────────────────────┤
│ Progress: ████████████████████ 100%  (486/486 configs)          │
│ Symbol: BTCUSDT | Duration: 2023-01-01 to 2024-01-01            │
│ Status: DONE | Completed: 2024-01-15 12:30                      │
├─────────────────────────────────────────────────────────────────┤
│ Sort by: [Total PnL ▼]  [Descending ▼]                          │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐              │
│ │ [Chart.png]  │ │ [Chart.png]  │ │ [Chart.png]  │              │
│ │              │ │              │ │              │              │
│ │ Config #1    │ │ Config #2    │ │ Config #3    │              │
│ │ PnL: +$2,450 │ │ PnL: +$1,890 │ │ PnL: +$1,650 │              │
│ │ WR: 58%      │ │ WR: 62%      │ │ WR: 55%      │              │
│ │ Sharpe: 1.45 │ │ Sharpe: 1.32 │ │ Sharpe: 1.28 │              │
│ └──────────────┘ └──────────────┘ └──────────────┘              │
│                                                                 │
│ [Load More]                                                     │
└─────────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface BacktestTaskDetailProps {
  taskId: string;
  onBack: () => void;
}
```

**Features:**
- Real-time progress updates
- Sortable results (by PnL, Win Rate, Sharpe, Profit Factor, Drawdown)
- Pagination with "Load More"
- Click card to open detail modal

---

### 3.4 BacktestResultCard

**Purpose:** Display single result as a card with chart hero

**Layout:**
```
┌─────────────────────────────────┐
│  ┌─────────────────────────┐    │
│  │                         │    │
│  │    [pnl-chart.png]      │    │  ← Hero section (chart image)
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
│  Config #abc123                 │
│  ─────────────────────────────  │
│  Total PnL      +$2,450.50     │
│  Win Rate       58.5%          │
│  Trades         156            │
│  Sharpe Ratio   1.45           │
│  Profit Factor  1.85           │
│  Max Drawdown   -4.2%          │
│                                 │
│  EMA(20/50) + ATR Risk(2%)     │  ← Strategy summary
└─────────────────────────────────┘
```

**Props:**
```typescript
interface BacktestResultCardProps {
  result: BacktestResult;
  taskId: string;
  onSelect: (result: BacktestResult) => void;
}
```

**Features:**
- Lazy load chart image
- Click to open detail modal
- Color-coded PnL (green positive, red negative)

---

### 3.5 BacktestResultDetailModal

**Purpose:** Full result details with tabs for different views

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Result Detail - Config #abc123                            [X]   │
├─────────────────────────────────────────────────────────────────┤
│ [Chart] [Trade Details] [Summary] [Config]                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  (Tab content)                                                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ [Download All] [Download CSV] [Download Config]                 │
└─────────────────────────────────────────────────────────────────┘
```

**Tabs:**
1. **Chart** - Full size pnl-chart.png with zoom
2. **Trade Details** - Virtual scrolling table from trade-details.csv
3. **Summary** - Key-value pairs from trade-summary.csv
4. **Config** - JSON tree view from config.json

**Props:**
```typescript
interface BacktestResultDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: BacktestResult;
  taskId: string;
}
```

---

### 3.6 BacktestTradeTable

**Purpose:** Display trade-details.csv with virtual scrolling

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Trade # │ Side │ Entry Time │ Entry Price │ Exit Price │ PnL   │
├─────────────────────────────────────────────────────────────────┤
│ 1       │ LONG │ 2023-01-15 │ $20,500     │ $21,000    │ +$24  │
│ 2       │ SHORT│ 2023-01-16 │ $21,200     │ $20,800    │ +$19  │
│ 3       │ LONG │ 2023-01-17 │ $20,900     │ $20,500    │ -$19  │
│ ...     │      │            │             │            │       │
│ (Virtual scrolling for large datasets)                          │
└─────────────────────────────────────────────────────────────────┘
```

**Features:**
- React Virtuoso for large datasets (1000+ trades)
- Sortable columns
- Color-coded PnL
- Export/Download button

---

### 3.7 BacktestConfigView

**Purpose:** Display config.json as JSON tree

**Implementation:**
- Use `react-json-view-lite` (already in project)
- Expand all nodes by default
- Styled to match existing ActionView component

---

### 3.8 CreateBacktestTaskDrawer

**Purpose:** Create new backtest optimization task

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Create Backtest Task                                      [X]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Task Name: [________________________]                           │
│ Symbol:    [BTCUSDT ▼]                                         │
│ Interval:  [1m ▼]                                              │
│ Date Range: [2023-01-01] to [2024-01-01]                       │
│                                                                 │
│ ─────────── Signal ───────────                                 │
│ Type: [EMA Crossover ▼]                                        │
│ ┌─────────────────────────────────────────┐                    │
│ │ Fast Period: [10, 20, 30    ] + Add     │                    │
│ │ Slow Period: [50, 100, 200  ] + Add     │                    │
│ └─────────────────────────────────────────┘                    │
│                                                                 │
│ ─────────── Filters ───────────                                │
│ [+ Add Filter]                                                 │
│ ┌─────────────────────────────────────────┐                    │
│ │ [ADX Trend ▼]                    [Remove]│                   │
│ │ Period: [14        ]                     │                   │
│ │ Threshold: [20, 25, 30] + Add           │                   │
│ └─────────────────────────────────────────┘                    │
│                                                                 │
│ ─────────── Risk ───────────                                   │
│ Type: [ATR Based ▼]                                            │
│ ┌─────────────────────────────────────────┐                    │
│ │ Risk Percent: [1, 2] + Add              │                    │
│ │ Stop Multiplier: [2, 2.5, 3] + Add      │                    │
│ └─────────────────────────────────────────┘                    │
│                                                                 │
│ ─────────── Exits ───────────                                  │
│ [+ Add Exit]                                                   │
│ ┌─────────────────────────────────────────┐                    │
│ │ [Trailing Stop ▼]                [Remove]│                   │
│ │ ATR Multiplier: [1.5, 2, 2.5] + Add     │                   │
│ └─────────────────────────────────────────┘                    │
│                                                                 │
│ ─────────── Settings ───────────                               │
│ Capital Base: [10000, 20000] + Add                             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ Total Configurations: 486                                       │
│ ⚠️ Large optimization space. This may take a while.             │
├─────────────────────────────────────────────────────────────────┤
│                                      [Cancel] [Create Task]     │
└─────────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface CreateBacktestTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
}
```

**Features:**
- Fetch available components from `backtestComponents` query
- Dynamic form based on component params
- Array input for parameter ranges
- Real-time total configs calculation
- Warning for large config counts (>500)
- Validation before submit

---

### 3.9 ParamRangeInput

**Purpose:** Input for entering array of values for optimization

**Layout:**
```
┌─────────────────────────────────────────────┐
│ Fast Period                                 │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌───────────┐      │
│ │ 10  │ │ 20  │ │ 30  │ │ Add value │      │
│ │  ✕  │ │  ✕  │ │  ✕  │ └───────────┘      │
│ └─────┘ └─────┘ └─────┘                     │
│ Min: 5 | Max: 100                           │
└─────────────────────────────────────────────┘
```

**Props:**
```typescript
interface ParamRangeInputProps {
  label: string;
  values: (number | string | boolean)[];
  onChange: (values: (number | string | boolean)[]) => void;
  type: "number" | "boolean" | "string";
  min?: number;
  max?: number;
  required?: boolean;
  description?: string;
}
```

---

## 4. Hook Specification (`useBacktest.tsx`)

```typescript
// Queries
export function useBacktestComponents();
export function useBacktestTask(taskId: string);
export function useBacktestTasks(filters: { status?: string; symbol?: string });
export function useBacktestTaskStats();
export function useBacktestResults(taskId: string, sortBy?: string, sortOrder?: string);
export function useBacktestResultFile(taskId: string, date: string, configId: string, fileName: string);

// Mutations
export function useCreateBacktestTask();
export function useCancelBacktestTask();
export function useDeleteBacktestTask();
export function useRetryBacktestTask();

// Subscriptions
export function useSubscribeBacktestTask(taskId: string);
export function useSubscribeBacktestResults(taskId: string);
```

---

## 5. Sidebar Update

Add to `links` array in `Sidebar.tsx`:

```typescript
{
  id: "backtest",
  label: "Backtest",
  title: "",
  limited: UserPermission.Trader,
  showDivider: true,
},
```

**Position:** After "Signals", before "Expert"

---

## 6. Implementation Order

### Phase 1: Foundation (Priority: High)
1. Update `schema.graphql` with backtest types
2. Run `npm run generate` for GraphQL codegen
3. Create `useBacktest.tsx` hook with all operations
4. Create basic page route `/backtest/page.tsx`
5. Add sidebar navigation entry

### Phase 2: Task List (Priority: High)
6. `BacktestTaskStatusBadge.tsx`
7. `BacktestTaskRow.tsx`
8. `BacktestTaskList.tsx`

### Phase 3: Results View (Priority: High)
9. `BacktestResultCard.tsx`
10. `BacktestResultGrid.tsx`
11. `BacktestTaskProgress.tsx`
12. `BacktestTaskDetail.tsx`

### Phase 4: Result Detail Modal (Priority: Medium)
13. `BacktestChartView.tsx`
14. `BacktestConfigView.tsx`
15. `BacktestSummaryView.tsx`
16. `BacktestTradeTable.tsx` (with virtual scrolling)
17. `BacktestResultDetailModal.tsx`

### Phase 5: Create Task Form (Priority: Medium)
18. `ParamRangeInput.tsx`
19. `ComponentSelector.tsx`
20. `DateRangePicker.tsx` (or use existing)
21. `ConfigPreview.tsx`
22. `CreateBacktestTaskDrawer.tsx`

### Phase 6: Polish (Priority: Low)
23. Real-time subscriptions integration
24. Download functionality
25. Error handling & loading states
26. Performance optimization

---

## 7. Key Technical Decisions

### 7.1 Virtual Scrolling
- Use `react-virtuoso` (already installed) for trade details table
- Threshold: Enable for datasets > 100 rows

### 7.2 Image Loading
- Lazy load chart images in result cards
- Use base64 content from GraphQL for display
- Cache images in Apollo cache

### 7.3 CSV Parsing
- Parse CSV content client-side
- Use simple string split (no library needed for simple CSV)
- Or use `papaparse` if complex CSV handling needed

### 7.4 State Management
- Use Apollo Client cache for backtest data
- Local component state for UI state (selected tab, modals)
- Subscriptions for real-time updates

### 7.5 Form State
- Use React state for form fields
- Calculate total configs on every param change
- Validate before submission

---

## 8. Error Handling

### Task Creation Errors
- Invalid date range
- Missing required fields
- Backend validation errors

### Result Loading Errors
- Task not found
- Network errors
- File not found

### Display
- Toast notifications for mutations
- Inline error messages for forms
- Empty states for no data

---

## 9. Performance Considerations

1. **Pagination**: Load 20 results at a time
2. **Lazy Loading**: Load chart images only when visible
3. **Subscription Cleanup**: Unsubscribe when leaving page
4. **Memoization**: Memoize expensive calculations (total configs)
5. **Debouncing**: Debounce search/filter inputs

---

## 10. Testing Checklist

- [ ] Create task with various param combinations
- [ ] Task list filtering works correctly
- [ ] Progress updates in real-time
- [ ] Results sort correctly by all metrics
- [ ] Result detail modal shows all tabs
- [ ] Trade table handles 1000+ rows smoothly
- [ ] Download buttons work for all file types
- [ ] Cancel/Retry/Delete actions work
- [ ] Error states display correctly
- [ ] Empty states display correctly
- [ ] Mobile responsiveness (if required)

---

*Implementation Plan Created: January 5, 2026*
