# Template-Based Search Architecture - Frontend Integration Guide

## Overview

This document describes the backend architecture for template-based backtesting search and provides guidance for frontend integration.

### Core Concept

```
┌─────────────────────┐
│  StrategyTemplate   │  ← Reusable strategy configuration
├─────────────────────┤
│ id, name, category  │
│ factoryConfig (Json)│
│ isActive            │
└─────────┬───────────┘
          │ 1:N (one template can have many searches)
          ▼
┌─────────────────────┐
│  TemplateSearch     │  ← Single symbol search instance
├─────────────────────┤
│ id, name, templateId│
│ symbol, dates       │
│ status              │
└─────────┬───────────┘
          │ 1:1 (one search creates one task)
          ▼
┌─────────────────────┐
│   BacktestTask      │  ← Existing task (runs optimization)
├─────────────────────┤
│ + templateSearchId  │
│ + templateId        │
└─────────────────────┘
```

**Key Design Decisions:**

- Each `TemplateSearch` runs on a **single symbol**
- Each `TemplateSearch` creates exactly **one BacktestTask** (1:1 relationship)
- To test multiple symbols, create multiple `TemplateSearch` records
- Templates are reusable configurations without default symbols

---

## GraphQL Schema

### Enums

```graphql
enum StrategyCategory {
  TREND_FOLLOWING
  MEAN_REVERSION
  BREAKOUT
  MOMENTUM
  VOLATILITY
  SCALPING
  SWING
  CUSTOM
}

enum TemplateSearchStatus {
  AWAIT # Waiting to be processed
  PROCESSING # Task is running
  DONE # Completed successfully
  FAILED # Task failed
  CANCELLED # Cancelled by user
}
```

### Types

```graphql
type StrategyTemplate {
  id: ID!
  name: String!
  description: String
  category: StrategyCategory!
  factoryConfig: JSON! # OptimizationParams structure
  isActive: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type StrategyTemplateWithStats {
  # ... all StrategyTemplate fields
  totalSearches: Int! # Count of searches using this template
  totalTasks: Int! # Count of tasks using this template
}

type TemplateSearch {
  id: ID!
  name: String!
  templateId: ID!
  symbol: String! # Single symbol (e.g., "BTCUSDT")
  startDate: DateTime!
  endDate: DateTime!
  interval: String! # Default: "1m"
  searchStrategy: String! # Default: "optuna"
  status: TemplateSearchStatus!
  createdAt: DateTime!
  startedAt: DateTime
  completedAt: DateTime
  errorMessage: String
}

type TemplateSearchWithTemplate {
  # ... all TemplateSearch fields
  template: StrategyTemplate!
}

type TemplateSearchWithTask {
  # ... all TemplateSearch fields
  template: StrategyTemplate!
  task: BacktestTask # The associated task (nullable until created)
}

type TemplateSearchStats {
  await: Int!
  processing: Int!
  done: Int!
  failed: Int!
  cancelled: Int!
}
```

### Input Types

```graphql
input CreateStrategyTemplateInput {
  name: String!
  description: String
  category: StrategyCategory!
  factoryConfig: JSON! # Same structure as OptimizationParams
}

input UpdateStrategyTemplateInput {
  id: ID!
  name: String
  description: String
  category: StrategyCategory
  factoryConfig: JSON
  isActive: Boolean
}

input CreateTemplateSearchInput {
  name: String!
  templateId: ID!
  symbol: String! # Required - single symbol
  startDate: DateTime!
  endDate: DateTime!
  interval: String # Default: "1m"
  optimizationMetrics: [String!] # Default: ["sharpeRatio"]
  trials: Int # Default: 100
  searchStrategy: String # "grid" | "optuna", Default: "optuna"
}

input TemplateSearchFilterInput {
  templateId: ID
  status: TemplateSearchStatus
  limit: Int # Default: 20
  offset: Int # Default: 0
}
```

---

## Queries

### Strategy Templates

```graphql
# Get single template
query GetTemplate($id: ID!) {
  strategyTemplate(id: $id) {
    id
    name
    description
    category
    factoryConfig
    isActive
    createdAt
    updatedAt
  }
}

# Get template by name
query GetTemplateByName($name: String!) {
  strategyTemplateByName(name: $name) {
    id
    name
    category
    factoryConfig
  }
}

# List templates with filtering
query ListTemplates(
  $category: StrategyCategory
  $isActive: Boolean
  $limit: Int
  $offset: Int
) {
  strategyTemplates(
    category: $category
    isActive: $isActive
    limit: $limit
    offset: $offset
  ) {
    id
    name
    description
    category
    isActive
    createdAt
  }
}

# Get template with usage stats
query GetTemplateWithStats($id: ID!) {
  strategyTemplateWithStats(id: $id) {
    id
    name
    category
    totalSearches
    totalTasks
  }
}
```

### Template Searches

```graphql
# Get single search
query GetSearch($id: ID!) {
  templateSearch(id: $id) {
    id
    name
    symbol
    status
    startDate
    endDate
    createdAt
    completedAt
    errorMessage
  }
}

# Get search with task details
query GetSearchWithTask($id: ID!) {
  templateSearchWithTask(id: $id) {
    id
    name
    symbol
    status
    template {
      id
      name
      category
    }
    task {
      id
      status
      processedConfigs
      totalConfigs
      bestConfigIds
    }
  }
}

# List searches with filtering
query ListSearches($filter: TemplateSearchFilterInput) {
  templateSearches(filter: $filter) {
    id
    name
    symbol
    status
    createdAt
    template {
      id
      name
      category
    }
  }
}

# Get search statistics
query GetSearchStats {
  templateSearchStats {
    await
    processing
    done
    failed
    cancelled
  }
}

# Get task for a search
query GetTaskBySearch($searchId: ID!) {
  taskByTemplateSearch(searchId: $searchId) {
    id
    status
    processedConfigs
    totalConfigs
    errorMessage
  }
}

# Get all tasks for a template
query GetTasksByTemplate($templateId: ID!) {
  tasksByTemplate(templateId: $templateId) {
    id
    symbol
    status
    createdAt
    completedAt
  }
}
```

---

## Mutations

### Strategy Templates

```graphql
# Create template
mutation CreateTemplate($input: CreateStrategyTemplateInput!) {
  createStrategyTemplate(input: $input) {
    id
    name
    category
  }
}

# Update template
mutation UpdateTemplate($input: UpdateStrategyTemplateInput!) {
  updateStrategyTemplate(input: $input) {
    id
    name
    isActive
  }
}

# Delete template
mutation DeleteTemplate($id: ID!) {
  deleteStrategyTemplate(id: $id)
}
```

### Template Searches

```graphql
# Create search (spawns BacktestTask automatically)
mutation CreateSearch($input: CreateTemplateSearchInput!) {
  createTemplateSearch(input: $input) {
    id
    name
    symbol
    status
    template {
      id
      name
    }
  }
}

# Cancel search and its task
mutation CancelSearch($id: ID!) {
  cancelTemplateSearch(id: $id) {
    id
    status
    completedAt
  }
}

# Delete search and its task
mutation DeleteSearch($id: ID!) {
  deleteTemplateSearch(id: $id)
}
```

---

## Subscriptions

```graphql
# Subscribe to search status updates
subscription OnSearchUpdated {
  templateSearchUpdated {
    id
    status
    completedAt
    errorMessage
  }
}
```

---

## Frontend Architecture Recommendations

### 1. State Management

```typescript
// Recommended store structure (Zustand/Redux)
interface TemplateSearchState {
  // Templates
  templates: StrategyTemplate[];
  selectedTemplate: StrategyTemplate | null;

  // Searches
  searches: TemplateSearchWithTemplate[];
  activeSearch: TemplateSearchWithTask | null;
  searchStats: TemplateSearchStats;

  // Filters
  filters: {
    templateId?: string;
    status?: TemplateSearchStatus;
    category?: StrategyCategory;
  };

  // UI State
  isLoading: boolean;
  error: string | null;
}
```

### 2. Component Structure

```
src/
├── features/
│   └── backtest/
│       ├── templates/
│       │   ├── TemplateList.tsx        # List all templates
│       │   ├── TemplateCard.tsx        # Single template display
│       │   ├── TemplateForm.tsx        # Create/Edit template
│       │   └── TemplateSelector.tsx    # Dropdown for selecting template
│       │
│       ├── searches/
│       │   ├── SearchList.tsx          # List searches with filters
│       │   ├── SearchCard.tsx          # Single search with status
│       │   ├── SearchForm.tsx          # Create new search
│       │   ├── SearchDetail.tsx        # Full search details + task
│       │   └── SearchProgress.tsx      # Real-time progress display
│       │
│       └── shared/
│           ├── StatusBadge.tsx         # Status indicator
│           ├── CategoryBadge.tsx       # Category indicator
│           └── FactoryConfigEditor.tsx # JSON editor for config
│
├── hooks/
│   ├── useTemplates.ts                 # Template CRUD operations
│   ├── useSearches.ts                  # Search CRUD operations
│   └── useSearchSubscription.ts        # Real-time updates
│
└── graphql/
    ├── templates.graphql               # Template queries/mutations
    └── searches.graphql                # Search queries/mutations
```

### 3. Key Workflows

#### A. Create Template Flow

```
1. User fills TemplateForm (name, category, factoryConfig)
2. Call createStrategyTemplate mutation
3. On success, navigate to template list or detail
```

#### B. Create Search Flow (Main Use Case)

```
1. User selects template from TemplateSelector
2. User enters: name, symbol, date range, trials
3. Call createTemplateSearch mutation
4. System automatically creates BacktestTask
5. Subscribe to templateSearchUpdated for real-time status
6. Display progress via SearchProgress component
```

#### C. Batch Search (Multiple Symbols)

```typescript
// To test same template on multiple symbols:
const symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT"];

for (const symbol of symbols) {
  await createTemplateSearch({
    name: `Q1 Test - ${symbol}`,
    templateId: selectedTemplate.id,
    symbol,
    startDate,
    endDate,
    trials: 100,
  });
}
```

### 4. Real-time Updates

```typescript
// useSearchSubscription.ts
import { useSubscription } from "@apollo/client";

export function useSearchSubscription(
  onUpdate: (search: TemplateSearch) => void,
) {
  useSubscription(TEMPLATE_SEARCH_UPDATED, {
    onData: ({ data }) => {
      if (data?.data?.templateSearchUpdated) {
        onUpdate(data.data.templateSearchUpdated);
      }
    },
  });
}

// Usage in component
useSearchSubscription((updatedSearch) => {
  // Update local state
  setSearches((prev) =>
    prev.map((s) =>
      s.id === updatedSearch.id ? { ...s, ...updatedSearch } : s,
    ),
  );

  // Show notification on completion
  if (updatedSearch.status === "DONE") {
    toast.success(`Search "${updatedSearch.name}" completed!`);
  } else if (updatedSearch.status === "FAILED") {
    toast.error(`Search failed: ${updatedSearch.errorMessage}`);
  }
});
```

### 5. Progress Tracking

Since each search has exactly one task, progress is straightforward:

```typescript
// SearchProgress.tsx
function SearchProgress({ search }: { search: TemplateSearchWithTask }) {
  const task = search.task;

  if (!task) return <Spinner />;

  const progress = task.totalConfigs > 0
    ? (task.processedConfigs / task.totalConfigs) * 100
    : 0;

  return (
    <div>
      <StatusBadge status={search.status} />
      {search.status === 'PROCESSING' && (
        <ProgressBar value={progress} />
      )}
      <span>{task.processedConfigs} / {task.totalConfigs} trials</span>
    </div>
  );
}
```

---

## Factory Config Structure

The `factoryConfig` in StrategyTemplate follows the `OptimizationParams` structure:

```typescript
interface OptimizationParams {
  signal: OptimizationComponentConfig;
  risk: OptimizationComponentConfig;
  exits: OptimizationComponentConfig;
  platform: OptimizationComponentConfig;
  settings: {
    initialCapital: number | { min: number; max: number };
    leverage?: number | { min: number; max: number };
  };
}

interface OptimizationComponentConfig {
  type: string;
  params: Record<string, number | number[] | { min: number; max: number }>;
}
```

Example:

```json
{
  "signal": {
    "type": "emaCrossover",
    "params": {
      "fastPeriod": { "min": 5, "max": 20 },
      "slowPeriod": { "min": 20, "max": 100 }
    }
  },
  "risk": {
    "type": "fixedRisk",
    "params": {
      "riskPercent": { "min": 0.5, "max": 2.0 }
    }
  },
  "exits": {
    "type": "atrTrailing",
    "params": {
      "atrPeriod": 14,
      "atrMultiplier": { "min": 1.5, "max": 3.0 }
    }
  },
  "platform": {
    "type": "binanceSpot",
    "params": {}
  },
  "settings": {
    "initialCapital": 10000,
    "leverage": 1
  }
}
```

---

## Status Flow

```
TemplateSearch Status:
  AWAIT → PROCESSING → DONE
                    ↘ FAILED
                    ↘ CANCELLED

BacktestTask Status (mirrored):
  AWAIT → PROCESSING → DONE
                    ↘ FAILED
                    ↘ CANCELLED
```

When BacktestTask status changes, TemplateSearch status updates automatically via the `onTaskCompleted` hook in the backend.

---

## Example: Complete Search Creation

```typescript
// 1. Select or create template
const template = await client.query({
  query: GET_TEMPLATE,
  variables: { id: templateId },
});

// 2. Create search for a symbol
const { data } = await client.mutate({
  mutation: CREATE_TEMPLATE_SEARCH,
  variables: {
    input: {
      name: "BTC Q1 2024 Test",
      templateId: template.id,
      symbol: "BTCUSDT",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      interval: "1m",
      trials: 100,
      searchStrategy: "optuna",
      optimizationMetrics: ["sharpeRatio", "totalPnlPercent"],
    },
  },
});

// 3. Search is created with status AWAIT
// 4. Backend cron picks up the task and starts processing
// 5. Subscribe to updates
client
  .subscribe({
    query: TEMPLATE_SEARCH_UPDATED,
  })
  .subscribe({
    next: ({ data }) => {
      console.log("Search updated:", data.templateSearchUpdated);
    },
  });

// 6. When DONE, fetch results
const results = await client.query({
  query: BACKTEST_RESULTS,
  variables: {
    taskId: data.createTemplateSearch.task?.id,
    sortBy: "sharpeRatio",
    limit: 10,
  },
});
```
