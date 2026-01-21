"use client";

import { useState } from "react";
import { Button, Input, Select, SelectItem, Chip } from "@heroui/react";
import { FiPlus } from "react-icons/fi";

import { NumericInput } from "@/components/inputs/NumericInput";

// ============================================
// Shared Types
// ============================================

export type ParamValues = Record<string, (number | string | boolean)[]>;

export type RangeValue = { min: number; max: number };
export type ArrayValue = (number | string | boolean)[];
export type OptunaParamValue =
  | { mode: "range"; value: RangeValue }
  | { mode: "array"; value: ArrayValue }
  | number; // for fixed values (backward compat)
export type OptunaParamValues = Record<string, OptunaParamValue>;

export type ComponentConfig = {
  type: string;
  params: ParamValues;
};

export type OptunaComponentConfig = {
  type: string;
  params: OptunaParamValues;
};

export type GridOptimizationParams = {
  name?: string;
  signal: ComponentConfig;
  filters: ComponentConfig[];
  risk: ComponentConfig;
  exits: ComponentConfig[];
  settings?: {
    capitalBase?: number[];
  };
};

export type OptunaOptimizationParams = {
  name?: string;
  signal: OptunaComponentConfig;
  filters: OptunaComponentConfig[];
  risk: OptunaComponentConfig;
  exits: OptunaComponentConfig[];
  settings?: {
    capitalBase: number;
  };
};

// FactorJSON format for backend - infers mode from structure
export type FactorJSONParamValue =
  | { min: number; max: number }  // range mode
  | (number | string | boolean)[];  // array mode

export type FactorJSONParams = Record<string, FactorJSONParamValue>;

export type FactorJSONComponentConfig = {
  type: string;
  params: FactorJSONParams;
};

export type FactorJSONOptimizationParams = {
  name?: string;
  signal: FactorJSONComponentConfig;
  filters: FactorJSONComponentConfig[];
  risk: FactorJSONComponentConfig;
  exits: FactorJSONComponentConfig[];
  settings?: {
    capitalBase: number;
  };
};

// Convert internal OptunaParamValues to FactorJSON format
export function convertToFactorJSON(params: OptunaParamValues): FactorJSONParams {
  const result: FactorJSONParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "number") {
      // Legacy fixed value - convert to single-element array
      result[key] = [value];
    } else if (value.mode === "range") {
      result[key] = { min: value.value.min, max: value.value.max };
    } else {
      result[key] = value.value;
    }
  }
  return result;
}

// Convert OptunaComponentConfig to FactorJSON format
export function convertComponentToFactorJSON(config: OptunaComponentConfig): FactorJSONComponentConfig {
  return {
    type: config.type,
    params: convertToFactorJSON(config.params),
  };
}

// Convert full OptunaOptimizationParams to FactorJSON format
export function convertOptimizationParamsToFactorJSON(
  params: OptunaOptimizationParams
): FactorJSONOptimizationParams {
  return {
    name: params.name,
    signal: convertComponentToFactorJSON(params.signal),
    filters: params.filters.map(convertComponentToFactorJSON),
    risk: convertComponentToFactorJSON(params.risk),
    exits: params.exits.map(convertComponentToFactorJSON),
    settings: params.settings,
  };
}

export type Interval = {
  value: number;
  unit: "s" | "m";
};

export type BacktestComponent = {
  name: string;
  description?: string | null;
  params: Array<{
    name: string;
    type: string;
    required: boolean;
    default?: string | null;
    description?: string | null;
    min?: number | null;
    max?: number | null;
  }>;
};

// Available optimization metrics for Optuna
export const OPTIMIZATION_METRICS = [
  { key: "sharpeRatio", label: "Sharpe Ratio", description: "Risk-adjusted return" },
  { key: "totalPnlPercent", label: "Total PnL %", description: "Total return percentage" },
  { key: "winRate", label: "Win Rate", description: "Win rate percentage" },
  { key: "profitFactor", label: "Profit Factor", description: "Gross profit / Gross loss" },
  { key: "maxDrawdownPercent", label: "Max Drawdown %", description: "Maximum drawdown (use with minimize)" },
  { key: "calmar", label: "Calmar Ratio", description: "Return / Max drawdown" },
  { key: "risk_adjusted", label: "Risk Adjusted", description: "PnL / (1 + drawdown)" },
  { key: "sortino_like", label: "Sortino-like", description: "Sharpe * (1 - drawdown/100)" },
  { key: "balanced", label: "Balanced", description: "Sharpe * winRate * (1 - drawdown/100)" },
  { key: "conservative", label: "Conservative", description: "Heavy drawdown penalty" },
  { key: "aggressive", label: "Aggressive", description: "Maximize returns with winRate weighting" },
  { key: "profit_factor_weighted", label: "Profit Factor Weighted", description: "profitFactor * winRate" },
];

// ============================================
// Helper Functions
// ============================================

export function initializeGridComponent(
  type: string,
  componentList: BacktestComponent[],
): ParamValues {
  const component = componentList.find((c) => c.name === type);
  if (!component) return {};

  const params: ParamValues = {};
  for (const param of component.params) {
    if (param.default) {
      try {
        const defaultValue = JSON.parse(param.default);
        params[param.name] = Array.isArray(defaultValue)
          ? defaultValue
          : [defaultValue];
      } catch {
        params[param.name] = [param.default];
      }
    } else {
      params[param.name] = [];
    }
  }
  return params;
}

export function initializeOptunaComponent(
  type: string,
  componentList: BacktestComponent[],
): OptunaParamValues {
  const component = componentList.find((c) => c.name === type);
  if (!component) return {};

  const params: OptunaParamValues = {};
  for (const param of component.params) {
    if (param.type === "number" && param.min !== null && param.max !== null) {
      // Default to range mode for numbers with defined min/max
      params[param.name] = { mode: "range", value: { min: param.min!, max: param.max! } };
    } else if (param.default) {
      try {
        const defaultValue = JSON.parse(param.default);
        if (typeof defaultValue === "number") {
          params[param.name] = { mode: "array", value: [defaultValue] };
        } else if (Array.isArray(defaultValue)) {
          params[param.name] = { mode: "array", value: defaultValue };
        } else {
          params[param.name] = { mode: "array", value: [defaultValue] };
        }
      } catch {
        params[param.name] = { mode: "array", value: [param.default] };
      }
    } else {
      params[param.name] = { mode: "array", value: [] };
    }
  }
  return params;
}

// ============================================
// ParamInputs Component (Grid mode - arrays)
// ============================================

type ParamInputsProps = {
  component?: BacktestComponent;
  params: ParamValues;
  onChange: (params: ParamValues) => void;
};

export function ParamInputs({ component, params, onChange }: ParamInputsProps) {
  if (!component) return null;

  const getParamType = (
    paramType: string,
  ): "number" | "string" | "boolean" => {
    if (paramType === "number") return "number";
    if (paramType === "boolean") return "boolean";
    return "string";
  };

  return (
    <div className="flex flex-col gap-3">
      {component.params.map((param) => (
        <ArrayInput
          key={param.name}
          label={param.name}
          description={param.description}
          values={(params[param.name] ?? []) as (number | string | boolean)[]}
          onChange={(values) => onChange({ ...params, [param.name]: values })}
          type={getParamType(param.type)}
          required={param.required}
        />
      ))}
    </div>
  );
}

// ============================================
// OptunaParamInputs Component (Optuna mode - ranges)
// ============================================

type OptunaParamInputsProps = {
  component?: BacktestComponent;
  params: OptunaParamValues;
  onChange: (params: OptunaParamValues) => void;
};

export function OptunaParamInputs({ component, params, onChange }: OptunaParamInputsProps) {
  if (!component) return null;

  const getParamMode = (value: OptunaParamValue): "range" | "array" => {
    if (typeof value === "number") return "array"; // legacy fixed value
    return value.mode;
  };

  const getRangeValue = (value: OptunaParamValue): RangeValue => {
    if (typeof value === "number") return { min: value, max: value };
    if (value.mode === "range") return value.value;
    return { min: 0, max: 0 };
  };

  const getArrayValue = (value: OptunaParamValue): ArrayValue => {
    if (typeof value === "number") return [value];
    if (value.mode === "array") return value.value;
    return [];
  };

  const getParamType = (paramType: string): "number" | "string" | "boolean" => {
    if (paramType === "number") return "number";
    if (paramType === "boolean") return "boolean";
    return "string";
  };

  const toggleMode = (paramName: string, currentValue: OptunaParamValue, param: BacktestComponent["params"][0]) => {
    const currentMode = getParamMode(currentValue);
    if (currentMode === "range") {
      // Switch to array mode
      const rangeVal = getRangeValue(currentValue);
      onChange({ ...params, [paramName]: { mode: "array", value: [rangeVal.min] } });
    } else {
      // Switch to range mode
      const arrayVal = getArrayValue(currentValue);
      const firstNum = arrayVal.find((v) => typeof v === "number") as number | undefined;
      const min = param.min ?? firstNum ?? 0;
      const max = param.max ?? firstNum ?? 0;
      onChange({ ...params, [paramName]: { mode: "range", value: { min, max } } });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {component.params.map((param) => {
        const value = params[param.name] ?? { mode: "array", value: [] };
        const mode = getParamMode(value);

        return (
          <div key={param.name} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">{param.name}</span>
                {param.type === "number" && param.min !== null && param.max !== null && (
                  <span className="text-xs text-neutral-500">
                    (Range: {param.min} - {param.max})
                  </span>
                )}
              </div>
              {param.type === "number" && (
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={mode === "range" ? "solid" : "flat"}
                    color={mode === "range" ? "secondary" : "default"}
                    className="h-6 min-w-0 px-2 text-xs"
                    onPress={() => toggleMode(param.name, value, param)}
                  >
                    Range
                  </Button>
                  <Button
                    size="sm"
                    variant={mode === "array" ? "solid" : "flat"}
                    color={mode === "array" ? "secondary" : "default"}
                    className="h-6 min-w-0 px-2 text-xs"
                    onPress={() => toggleMode(param.name, value, param)}
                  >
                    Values
                  </Button>
                </div>
              )}
            </div>
            {param.description && (
              <span className="text-xs text-neutral-500">{param.description}</span>
            )}

            {mode === "range" && param.type === "number" ? (
              <div className="flex items-center gap-2">
                <Input
                  size="sm"
                  type="number"
                  label="Min"
                  value={getRangeValue(value).min.toString()}
                  onValueChange={(v) => {
                    const numVal = parseFloat(v);
                    if (!isNaN(numVal)) {
                      const rangeVal = getRangeValue(value);
                      onChange({ ...params, [param.name]: { mode: "range", value: { min: numVal, max: rangeVal.max } } });
                    }
                  }}
                  className="w-24"

                  
                  variant="bordered"
                />
                <span className="text-neutral-500">to</span>
                <Input
                  size="sm"
                  type="number"
                  label="Max"
                  value={getRangeValue(value).max.toString()}
                  onValueChange={(v) => {
                    const numVal = parseFloat(v);
                    if (!isNaN(numVal)) {
                      const rangeVal = getRangeValue(value);
                      onChange({ ...params, [param.name]: { mode: "range", value: { min: rangeVal.min, max: numVal } } });
                    }
                  }}
                  className="w-24"
                  variant="bordered"
                />
              </div>
            ) : (
              <ArrayInput
                label=""
                values={getArrayValue(value)}
                onChange={(newValues) => {
                  onChange({ ...params, [param.name]: { mode: "array", value: newValues } });
                }}
                type={getParamType(param.type)}
                min={param.min ?? undefined}
                max={param.max ?? undefined}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================
// ArrayInput Component
// ============================================

type ArrayInputProps = {
  label: string;
  description?: string | null;
  values: (number | string | boolean)[];
  onChange: (values: (number | string | boolean)[]) => void;
  type: "number" | "string" | "boolean";
  min?: number;
  max?: number;
  required?: boolean;
};

export function ArrayInput({
  label,
  description,
  values,
  onChange,
  type,
  min,
  max,
}: ArrayInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() === "") return;

    let newValue: number | string;
    if (type === "number") {
      newValue = parseFloat(inputValue);
      if (isNaN(newValue)) return;
      if (min !== undefined && newValue < min) return;
      if (max !== undefined && newValue > max) return;
    } else {
      newValue = inputValue.trim();
    }

    if (!values.includes(newValue)) {
      onChange([...values, newValue]);
    }
    setInputValue("");
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleAddBoolean = (boolValue: boolean) => {
    if (!values.includes(boolValue)) {
      onChange([...values, boolValue]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xs text-neutral-400">{label}</span>
        {min !== undefined && max !== undefined && (
          <span className="text-xs text-neutral-500">
            (Min: {min}, Max: {max})
          </span>
        )}
      </div>
      {description && (
        <span className="text-xs text-neutral-500">{description}</span>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {values.map((value, index) => (
          <Chip
            key={index}
            onClose={() => handleRemove(index)}
            variant="flat"
            size="sm"
          >
            {String(value)}
          </Chip>
        ))}
        <div className="flex items-center gap-1">
          {type === "number" ? (
            <NumericInput
              amount={inputValue}
              onChange={setInputValue}
              classNames={{
                base: "w-24",
                input: "text-sm",
              }}
            />
          ) : type === "boolean" ? (
            <>
              <Button
                size="sm"
                variant="flat"
                color={values.includes(true) ? "default" : "primary"}
                isDisabled={values.includes(true)}
                onPress={() => handleAddBoolean(true)}
              >
                true
              </Button>
              <Button
                size="sm"
                variant="flat"
                color={values.includes(false) ? "default" : "primary"}
                isDisabled={values.includes(false)}
                onPress={() => handleAddBoolean(false)}
              >
                false
              </Button>
            </>
          ) : (
            <Input
              size="sm"
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={handleKeyDown}
              className="w-24"
            />
          )}
          {type !== "boolean" && (
            <Button isIconOnly size="sm" variant="flat" onPress={handleAdd}>
              <FiPlus className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// IntervalInput Component
// ============================================

type IntervalInputProps = {
  label: string;
  intervals: Interval[];
  onChange: (intervals: Interval[]) => void;
};

const UNIT_OPTIONS = [
  { value: "s", label: "Second" },
  { value: "m", label: "Minute" },
] as const;

export function IntervalInput({ label, intervals, onChange }: IntervalInputProps) {
  const [inputValue, setInputValue] = useState("1");
  const [unit, setUnit] = useState<"s" | "m">("m");

  const handleAdd = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) return;

    const newInterval: Interval = { value, unit };
    const isDuplicate = intervals.some(
      (i) => i.value === newInterval.value && i.unit === newInterval.unit,
    );

    if (!isDuplicate) {
      onChange([...intervals, newInterval]);
    }
    setInputValue("1");
  };

  const handleRemove = (index: number) => {
    onChange(intervals.filter((_, i) => i !== index));
  };

  const formatInterval = (interval: Interval) => {
    const unitLabel = interval.unit === "s" ? "s" : "m";
    return `${interval.value}${unitLabel}`;
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-neutral-400">{label}</span>
      <div className="flex flex-wrap items-center gap-2">
        {intervals.map((interval, index) => (
          <Chip
            key={index}
            onClose={() => handleRemove(index)}
            variant="flat"
            size="sm"
          >
            {formatInterval(interval)}
          </Chip>
        ))}
        <div className="flex items-center gap-1">
          <NumericInput
            amount={inputValue}
            onChange={setInputValue}
            classNames={{
              base: "w-20",
              input: "text-sm",
            }}
          />
          <Select
            size="sm"
            className="w-24"
            variant="bordered"
            selectedKeys={[unit]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as "s" | "m";
              if (selected) setUnit(selected);
            }}
          >
            {UNIT_OPTIONS.map((option) => (
              <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
          </Select>
          <Button isIconOnly size="sm" variant="flat" onPress={handleAdd}>
            <FiPlus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
