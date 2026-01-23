# Backend Upgrade Context for Frontend

This document summarizes all backend API changes that require frontend updates.

---

## 1. Strategy Configuration Changes

### 1.1 Platform Component (NEW - Required)

The `platform` field is now **required** in strategy configurations.

```typescript
// For single strategy execution
interface StrategyConfig {
  // ... existing fields
  platform: ComponentConfig; // REQUIRED (was optional)
  settings: {
    initialCapital: number; // REQUIRED - single value
  };
}

// For optimization (grid search / optuna)
interface OptimizationParams {
  // ... existing fields
  platform: OptimizationComponentConfig; // REQUIRED
  settings: {
    initialCapital: number[]; // REQUIRED - array for testing multiple values
  };
}
```

**Key Difference:**

- `StrategyConfig.settings.initialCapital` = `number` (single value)
- `OptimizationParams.settings.initialCapital` = `number[]` (array for grid/optuna search)

**Available Platforms:**

| Type      | Description                                    | Params                                                                            |
| --------- | ---------------------------------------------- | --------------------------------------------------------------------------------- |
| `simple`  | No fees, no spread, 100% liquidation threshold | None                                                                              |
| `general` | Realistic simulation with configurable costs   | `openingFeePercent`, `closingFeePercent`, `spreadPercent`, `liquidationThreshold` |

**General Platform Params:**

```json
{
  "platform": {
    "type": "general",
    "params": {
      "openingFeePercent": 0.05, // 0.05% of notional value
      "closingFeePercent": 0.05, // 0.05% of notional value
      "spreadPercent": 0.01, // 0.01% spread
      "liquidationThreshold": 90 // Liquidate at 90% margin loss
    }
  }
}
```

**Simple Platform (for pure strategy testing):**

```json
{
  "platform": {
    "type": "simple",
    "params": {}
  }
}
```

### 1.2 Settings - Initial Capital (Required)

```json
{
  "settings": {
    "initialCapital": 10000 // REQUIRED - Starting capital in USDT
  }
}
```

---

## 2. Position Sizers (Risk Component)

### 2.1 Removed

- `atrBased` - **REMOVED** (replaced by volatility-based sizers)

### 2.2 Available Position Sizers

| Type                        | Description                                                    |
| --------------------------- | -------------------------------------------------------------- |
| `fixed`                     | Fixed margin in USDT                                           |
| `percentageBased`           | Percentage of available capital as margin                      |
| `volatilityLeverageFixed`   | Fixed margin, volatility-adjusted leverage                     |
| `volatilityLeveragePercent` | Percentage margin, volatility-adjusted leverage                |
| `volatilityMarginFixed`     | Volatility-adjusted margin, fixed leverage                     |
| `volatilityMarginPercent`   | Percentage-based margin adjusted by volatility, fixed leverage |

### 2.3 Position Sizer Parameters

#### `fixed`

```json
{
  "type": "fixed",
  "params": {
    "positionSizeUsdt": 1000, // Fixed margin in USDT
    "leverage": 10, // Leverage multiplier (default: 1)
    "timeframe": 1, // For API consistency
    "useCurrentCandle": false // For API consistency
  }
}
```

#### `percentageBased`

```json
{
  "type": "percentageBased",
  "params": {
    "marginPercent": 10, // 10% of available capital
    "maxMargin": 5000, // Max margin cap in USDT
    "leverage": 5 // Leverage multiplier (default: 1)
  }
}
```

#### `volatilityLeverageFixed` (NEW)

Fixed margin with volatility-adjusted leverage. High volatility = lower leverage.

```json
{
  "type": "volatilityLeverageFixed",
  "params": {
    "fixedMargin": 1000, // Fixed margin in USDT
    "baseLeverage": 10, // Base leverage when volatility = baseline
    "minLeverage": 3, // Min leverage (high volatility)
    "maxLeverage": 20, // Max leverage (low volatility)
    "atrPeriod": 14, // ATR calculation period
    "atrSmaPeriod": 50, // SMA period for ATR baseline
    "timeframe": 60, // Timeframe in minutes
    "useCurrentCandle": false
  }
}
```

#### `volatilityLeveragePercent` (NEW)

Percentage margin with volatility-adjusted leverage.

```json
{
  "type": "volatilityLeveragePercent",
  "params": {
    "marginPercent": 10, // % of available capital
    "maxMargin": 5000, // Max margin cap in USDT
    "baseLeverage": 10, // Base leverage when volatility = baseline
    "minLeverage": 3, // Min leverage (high volatility)
    "maxLeverage": 20, // Max leverage (low volatility)
    "atrPeriod": 14, // ATR calculation period
    "atrSmaPeriod": 50, // SMA period for ATR baseline
    "timeframe": 60, // Timeframe in minutes
    "useCurrentCandle": false
  }
}
```

#### `volatilityMarginFixed` (NEW)

Fixed base margin adjusted by volatility with fixed leverage.

```json
{
  "type": "volatilityMarginFixed",
  "params": {
    "baseMargin": 1000, // Base margin in USDT
    "minMargin": 200, // Min margin (high volatility)
    "maxMargin": 3000, // Max margin (low volatility)
    "leverage": 10, // Fixed leverage
    "atrPeriod": 14, // ATR calculation period
    "atrSmaPeriod": 50, // SMA period for ATR baseline
    "timeframe": 60, // Timeframe in minutes
    "useCurrentCandle": false
  }
}
```

#### `volatilityMarginPercent` (NEW)

Percentage base margin adjusted by volatility with fixed leverage.

```json
{
  "type": "volatilityMarginPercent",
  "params": {
    "baseMarginPercent": 10, // Base % of available capital
    "minMargin": 200, // Min margin in USDT (high volatility)
    "maxMargin": 5000, // Max margin in USDT (low volatility)
    "leverage": 10, // Fixed leverage
    "atrPeriod": 14, // ATR calculation period
    "atrSmaPeriod": 50, // SMA period for ATR baseline
    "timeframe": 60, // Timeframe in minutes
    "useCurrentCandle": false
  }
}
```

---

## 3. Trade Data Changes

### 3.1 Trade Interface

The `Trade` object now includes additional fields for leverage and fees:

```typescript
interface Trade {
  entryTime: number;
  entryPrice: number;
  exitTime: number;
  exitPrice: number;
  side: "LONG" | "SHORT";
  positionSize: number; // Notional value (margin * leverage)
  margin: number; // NEW - Collateral in USDT
  leverage: number; // NEW - Leverage multiplier
  openingFee: number; // NEW - Fee paid to open
  closingFee: number; // NEW - Fee paid to close
  grossPnl: number; // NEW - PnL before fees
  pnl: number; // Net PnL after fees
  pnlPercent: number; // PnL as % of margin
  cumulativePnl: number; // Running total PnL
  liquidated: boolean; // NEW - Was position liquidated
}
```

---

## 4. Optimization Params Changes

### 4.1 OptimizationParams Interface

For backtest optimization tasks:

```typescript
interface OptimizationParams {
  signal: OptimizationComponentConfig;
  filters?: OptimizationComponentConfig[];
  risk: OptimizationComponentConfig;
  exits: OptimizationComponentConfig[];
  platform: OptimizationComponentConfig; // NEW - Required
  settings: {
    initialCapital: number[]; // Array for testing multiple values
  };
}
```

### 4.2 Example Optimization Config

```json
{
  "signal": {
    "type": "emaCrossover",
    "params": {
      "fastPeriod": [10, 20, 30],
      "slowPeriod": [50, 100, 200],
      "timeframe": [60],
      "useCurrentCandle": [false]
    }
  },
  "risk": {
    "type": "fixed",
    "params": {
      "positionSizeUsdt": [1000, 2000],
      "leverage": [5, 10],
      "timeframe": [1],
      "useCurrentCandle": [false]
    }
  },
  "exits": [
    {
      "type": "stopLoss",
      "params": {
        "percent": [2, 3, 5]
      }
    }
  ],
  "platform": {
    "type": "general",
    "params": {
      "openingFeePercent": [0.05],
      "closingFeePercent": [0.05],
      "spreadPercent": [0.01],
      "liquidationThreshold": [90]
    }
  },
  "settings": {
    "initialCapital": [10000, 50000]
  }
}
```

---

## 5. Frontend Form Updates Required

### 5.1 Strategy Builder Form

1. **Add Platform Section (Required)**
   - Dropdown to select platform type: `simple` or `general`
   - If `general` selected, show params form:
     - `openingFeePercent` (0-1%, default: 0.05)
     - `closingFeePercent` (0-1%, default: 0.05)
     - `spreadPercent` (0-1%, default: 0.01)
     - `liquidationThreshold` (50-100, default: 90)

2. **Add Settings Section**
   - `initialCapital` (required, number input, min: 100)

3. **Update Risk/Position Sizer Section**
   - Remove `atrBased` option
   - Add 4 new volatility-based sizers with their respective params
   - Update param forms for each sizer type

### 5.2 Trade Results Display

Update trade list/table to show new fields:

- Margin (USDT)
- Leverage (x)
- Opening Fee (USDT)
- Closing Fee (USDT)
- Gross PnL (USDT)
- Liquidated (boolean indicator)

### 5.3 Optimization Form

1. Add platform configuration to optimization params
2. Make `initialCapital` array input for testing multiple values

---

## 6. Example Complete Strategy Config

```json
{
  "symbol": "BTCUSDT",
  "name": "BTC Trend Following",
  "description": "EMA crossover with volatility-adjusted sizing",
  "signal": {
    "type": "emaCrossover",
    "params": {
      "fastPeriod": 9,
      "slowPeriod": 21,
      "timeframe": 60,
      "useCurrentCandle": false
    }
  },
  "filters": [
    {
      "type": "adxTrend",
      "params": {
        "period": 14,
        "threshold": 25,
        "timeframe": 60,
        "useCurrentCandle": false,
        "inverse": false
      }
    }
  ],
  "risk": {
    "type": "volatilityLeverageFixed",
    "params": {
      "fixedMargin": 1000,
      "baseLeverage": 10,
      "minLeverage": 3,
      "maxLeverage": 20,
      "atrPeriod": 14,
      "atrSmaPeriod": 50,
      "timeframe": 60,
      "useCurrentCandle": false
    }
  },
  "exits": [
    {
      "type": "stopLoss",
      "params": {
        "percent": 3,
        "timeframe": 1,
        "useCurrentCandle": false
      }
    },
    {
      "type": "trailingStop",
      "params": {
        "activationPercent": 2,
        "trailPercent": 1,
        "timeframe": 1,
        "useCurrentCandle": false
      }
    }
  ],
  "platform": {
    "type": "general",
    "params": {
      "openingFeePercent": 0.05,
      "closingFeePercent": 0.05,
      "spreadPercent": 0.01,
      "liquidationThreshold": 90
    }
  },
  "settings": {
    "initialCapital": 10000
  }
}
```

---

## 7. Migration Notes

### Breaking Changes

1. **`platform` is now required** - All existing configs without platform will fail validation
2. **`settings.initialCapital` is required** - Must specify starting capital
3. **`atrBased` sizer removed** - Replace with one of the new volatility-based sizers

### Suggested Migration

For existing configs without platform/initialCapital:

```json
{
  "platform": {
    "type": "simple",
    "params": {}
  },
  "settings": {
    "initialCapital": 10000
  }
}
```

For existing configs using `atrBased` sizer, migrate to `volatilityLeverageFixed`:

```json
// OLD (removed)
{
  "type": "atrBased",
  "params": { ... }
}

// NEW
{
  "type": "volatilityLeverageFixed",
  "params": {
    "fixedMargin": 1000,
    "baseLeverage": 10,
    "minLeverage": 3,
    "maxLeverage": 20,
    "atrPeriod": 14,
    "atrSmaPeriod": 50,
    "timeframe": 60,
    "useCurrentCandle": false
  }
}
```
