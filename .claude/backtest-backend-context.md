# Backtest Backend Context

## Overview

The backtest module provides strategy optimization via GraphQL API with two search strategies:
- **Grid Search**: Exhaustive parameter combinations
- **Optuna**: Bayesian optimization with configurable trials

---

## GraphQL Types

### BacktestTask
```graphql
type BacktestTask {
  id: ID!
  name: String!
  symbol: String!                    # e.g., "BTCUSDT"

  # Date range
  startDate: Date!
  endDate: Date!
  interval: String!                  # "1m", "5m", "1h", etc.

  # Optimization config
  optimizationParams: JSON!          # Strategy config with param ranges
  searchStrategy: String!            # "grid" | "optuna"
  optimizationMetric: String         # Target metric (optuna only)
  trials: Int                        # Number of trials (optuna only)
  direction: String!                 # "maximize" | "minimize"

  # Progress
  status: BacktestTaskStatus!        # AWAIT, PROCESSING, DONE, FAILED, CANCELLED
  totalConfigs: Int!
  processedConfigs: Int!
  currentConfig: String

  # Optuna results
  bestParams: JSON                   # Best params found (optuna only)
  optunaStudyPath: String            # Path to Optuna SQLite DB
  optimizerPid: Int                  # Running process PID

  # Timestamps
  createdAt: Date!
  startedAt: Date
  completedAt: Date
  errorMessage: String
}

enum BacktestTaskStatus {
  AWAIT
  PROCESSING
  DONE
  FAILED
  CANCELLED
}
```

### BacktestResult
```graphql
type BacktestResult {
  id: ID!
  taskId: ID!
  configId: String!
  runDate: String!                   # YYYY-MM-DD

  # Strategy used
  strategyConfig: JSON!

  # Performance metrics
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

  # File location
  resultFolder: String!
  createdAt: Date!
}
```

### OptunaDashboardStatus
```graphql
type OptunaDashboardStatus {
  running: Boolean!
  taskId: ID                         # Currently viewing task
  url: String                        # Dashboard URL (e.g., http://localhost:8080)
}
```

### BacktestComponents (for building strategy configs)
```graphql
type BacktestComponents {
  signals: [ComponentInfo!]!
  filters: [ComponentInfo!]!
  risk: [ComponentInfo!]!
  exits: [ComponentInfo!]!
}

type ComponentInfo {
  name: String!
  description: String!
  params: [ParamInfo!]!
}

type ParamInfo {
  name: String!
  type: String!                      # "number", "boolean", "string"
  required: Boolean!
  default: String
  description: String
  min: Float
  max: Float
}
```

---

## GraphQL Queries

```graphql
# Get available components for strategy building
backtestComponents: BacktestComponents!

# Task queries
backtestTask(id: ID!): BacktestTask
backtestTasks(
  status: BacktestTaskStatus
  symbol: String
  limit: Int = 50
  offset: Int = 0
): [BacktestTask!]!
backtestTaskStats: TaskStats!        # { await, processing, done, failed }

# Result queries
backtestResults(
  taskId: ID!
  sortBy: String = "totalPnlUsdt"
  sortOrder: String = "desc"
  limit: Int = 100
  offset: Int = 0
): [BacktestResult!]!

topBacktestResults(
  taskId: ID!
  metric: String = "totalPnlUsdt"
  limit: Int = 10
): [BacktestResult!]!

# File navigation
backtestResultDates(taskId: ID!): [String!]!
backtestResultFolders(taskId: ID!, date: String!): [ResultFolder!]!
backtestResultFile(
  taskId: ID!
  date: String!
  configId: String!
  fileName: String!
): ResultFile!

# Optuna dashboard
optunaDashboardStatus: OptunaDashboardStatus!
optunaStudyDates(taskId: ID!): [String!]!
```

---

## GraphQL Mutations

```graphql
# Task management
createBacktestTask(input: CreateBacktestTaskInput!): BacktestTask!
cancelBacktestTask(taskId: ID!): BacktestTask!
deleteBacktestTask(taskId: ID!): Boolean!
retryBacktestTask(taskId: ID!): BacktestTask!

# Result management
deleteBacktestResult(resultId: ID!): Boolean!

# Optuna dashboard
startOptunaDashboard(
  taskId: ID!
  date: String!
  port: Int = 8080
): OptunaDashboardStatus!
stopOptunaDashboard: Boolean!
```

---

## GraphQL Subscriptions

```graphql
# Real-time task progress updates
backtestTaskUpdated: BacktestTask!

# New result created
backtestResultCreated: BacktestResult!
```

---

## CreateBacktestTaskInput

```graphql
input CreateBacktestTaskInput {
  name: String!
  symbol: String!
  startDate: Date!
  endDate: Date!
  interval: String = "1m"

  # Strategy config with parameter ranges
  optimizationParams: JSON!

  # Optuna-specific (optional)
  searchStrategy: String = "grid"    # "grid" | "optuna"
  optimizationMetric: String         # Required if optuna
  trials: Int                        # Required if optuna
  direction: String = "maximize"     # "maximize" | "minimize"
}
```

### optimizationParams Structure

**For Grid Search** (arrays of values):
```json
{
  "name": "EMA Crossover Strategy",
  "signal": {
    "type": "emaCrossover",
    "params": {
      "fastPeriod": [10, 12, 14],
      "slowPeriod": [21, 26, 30]
    }
  },
  "filters": [
    {
      "type": "rsiExtreme",
      "params": {
        "period": [14],
        "overbought": [70],
        "oversold": [30]
      }
    }
  ],
  "risk": {
    "type": "fixedSize",
    "params": {
      "sizePercent": [10]
    }
  },
  "exits": [
    {
      "type": "stopLoss",
      "params": {
        "percent": [2, 3]
      }
    },
    {
      "type": "takeProfit",
      "params": {
        "percent": [4, 6]
      }
    }
  ],
  "settings": {
    "capitalBase": 10000
  }
}
```

**For Optuna** (min/max ranges):
```json
{
  "name": "EMA Crossover Strategy",
  "signal": {
    "type": "emaCrossover",
    "params": {
      "fastPeriod": { "min": 5, "max": 20 },
      "slowPeriod": { "min": 20, "max": 50 }
    }
  },
  "filters": [
    {
      "type": "rsiExtreme",
      "params": {
        "period": { "min": 10, "max": 20 },
        "overbought": 70,
        "oversold": 30
      }
    }
  ],
  "risk": {
    "type": "fixedSize",
    "params": {
      "sizePercent": 10
    }
  },
  "exits": [
    {
      "type": "stopLoss",
      "params": {
        "percent": { "min": 1, "max": 5 }
      }
    },
    {
      "type": "takeProfit",
      "params": {
        "percent": { "min": 2, "max": 10 }
      }
    }
  ],
  "settings": {
    "capitalBase": 10000
  }
}
```

---

## Available Optimization Metrics

**Single Metrics:**
- `sharpeRatio` - Risk-adjusted return
- `totalPnlPercent` - Total return percentage
- `winRate` - Win rate percentage
- `profitFactor` - Gross profit / Gross loss
- `maxDrawdownPercent` - Maximum drawdown (use with minimize)

**Composite Metrics:**
- `calmar` - Return / Max drawdown
- `risk_adjusted` - PnL / (1 + drawdown)
- `sortino_like` - Sharpe * (1 - drawdown/100)
- `balanced` - Sharpe * winRate * (1 - drawdown/100)
- `conservative` - Heavy drawdown penalty
- `aggressive` - Maximize returns with winRate weighting
- `profit_factor_weighted` - profitFactor * winRate

---

## Available Components

### Signals
- `emaCrossover` - EMA crossover
- `smaCrossover` - SMA crossover
- `macdCrossover` - MACD crossover
- `rsiReversal` - RSI reversal
- `bollingerBounce` - Bollinger band bounce
- `donchianBreakout` - Donchian channel breakout

### Filters
- `rsiExtreme` - RSI overbought/oversold
- `bollingerVolatility` - Bollinger band width
- `stochastic` - Stochastic oscillator
- `adxTrend` - ADX trend strength
- `htfEmaBias` - Higher timeframe EMA bias
- `emaSlope` - EMA slope direction
- `emaStack` - Multiple EMA alignment
- `maPosition` - Price vs MA position

### Risk (Position Sizing)
- `fixedSize` - Fixed percentage of capital
- `atrBased` - ATR-based position sizing

### Exits
- `stopLoss` - Fixed stop loss
- `trailingStop` - Trailing stop
- `takeProfit` - Fixed take profit
- `timeBased` - Time-based exit

---

## Task Lifecycle

```
1. AWAIT      - Task created, waiting in queue
2. PROCESSING - Task running (grid search or optuna)
3. DONE       - Completed successfully
4. FAILED     - Error occurred
5. CANCELLED  - User cancelled
```

### Progress Tracking
- `totalConfigs` - Total configurations to test
- `processedConfigs` - Completed so far
- Progress = processedConfigs / totalConfigs

---

## Optuna Dashboard

Start dashboard to visualize optimization:
```graphql
mutation {
  startOptunaDashboard(taskId: "...", date: "2024-01-15", port: 8080) {
    running
    url
  }
}
```

Check available study dates:
```graphql
query {
  optunaStudyDates(taskId: "...")
}
# Returns: ["2024-01-15", "2024-01-14", ...]
```

Stop dashboard:
```graphql
mutation {
  stopOptunaDashboard
}
```

---

## Result Files

Each result config generates:
```
result/{runDate}/{taskId}/{configId}/
├── summary.json       # Key metrics
├── config.json        # Strategy config used
├── trades.json.gz     # All trades
└── equity-curve.json.gz
```

Access via:
```graphql
query {
  backtestResultFile(
    taskId: "..."
    date: "2024-01-15"
    configId: "abc-123"
    fileName: "summary.json"
  ) {
    name
    content  # JSON string
  }
}
```

---

## Authentication

All backtest operations require:
- JWT token in Authorization header
- User role: `Trader` or higher

---

## WebSocket Subscriptions

Connect to GraphQL WebSocket endpoint for real-time updates:
- Task progress changes
- New results as they complete

Example subscription:
```graphql
subscription {
  backtestTaskUpdated {
    id
    status
    processedConfigs
    totalConfigs
    errorMessage
    bestParams
  }
}
```
