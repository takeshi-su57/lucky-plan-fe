"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Chip,
  Divider,
} from "@heroui/react";
import { FiPlus, FiX, FiAlertTriangle } from "react-icons/fi";

import { RightDrawer } from "@/components/modals/RightDrawer";
import { NumericInput } from "@/components/inputs/NumericInput";
import {
  useBacktestComponents,
  useCreateBacktestTask,
} from "@/app-hooks/useBacktest";

export type CreateBacktestTaskDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
};

type ParamValues = Record<string, (number | string | boolean)[]>;

type ComponentConfig = {
  type: string;
  params: ParamValues;
};

type OptimizationParams = {
  signal: ComponentConfig;
  filters: ComponentConfig[];
  risk: ComponentConfig;
  exits: ComponentConfig[];
  settings?: {
    capitalBase?: number[];
  };
};

const INTERVALS = ["1m", "5m", "15m", "30m", "1h", "4h", "1d"];

export function CreateBacktestTaskDrawer({
  isOpen,
  onClose,
  onOpenChange,
}: CreateBacktestTaskDrawerProps) {
  const { components, loading: componentsLoading } = useBacktestComponents();
  const { createTask, loading: createLoading } = useCreateBacktestTask();

  // Form state
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [interval, setInterval] = useState("1m");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Component selections
  const [signalType, setSignalType] = useState<string>("");
  const [signalParams, setSignalParams] = useState<ParamValues>({});

  const [filters, setFilters] = useState<ComponentConfig[]>([]);

  const [riskType, setRiskType] = useState<string>("");
  const [riskParams, setRiskParams] = useState<ParamValues>({});

  const [exits, setExits] = useState<ComponentConfig[]>([]);

  const [capitalBase, setCapitalBase] = useState<number[]>([10000]);

  // Get component definitions
  const signalComponents = components?.signals ?? [];
  const filterComponents = components?.filters ?? [];
  const riskComponents = components?.risk ?? [];
  const exitComponents = components?.exits ?? [];

  // Initialize defaults when component loads
  const initializeComponent = useCallback(
    (type: string, componentList: typeof signalComponents) => {
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
    },
    [],
  );

  // Calculate total configurations
  const totalConfigs = useMemo(() => {
    let total = 1;

    // Signal params
    Object.values(signalParams).forEach((arr) => {
      if (arr.length > 0) total *= arr.length;
    });

    // Filter params
    filters.forEach((filter) => {
      Object.values(filter.params).forEach((arr) => {
        if (arr.length > 0) total *= arr.length;
      });
    });

    // Risk params
    Object.values(riskParams).forEach((arr) => {
      if (arr.length > 0) total *= arr.length;
    });

    // Exit params
    exits.forEach((exit) => {
      Object.values(exit.params).forEach((arr) => {
        if (arr.length > 0) total *= arr.length;
      });
    });

    // Capital base
    if (capitalBase.length > 0) total *= capitalBase.length;

    return total;
  }, [signalParams, filters, riskParams, exits, capitalBase]);

  const isLargeOptimization = totalConfigs > 500;

  // Form validation
  const isValid =
    name.trim() !== "" &&
    symbol.trim() !== "" &&
    startDate !== "" &&
    endDate !== "" &&
    signalType !== "" &&
    riskType !== "";

  const handleSubmit = async () => {
    if (!isValid || createLoading) return;

    const optimizationParams: OptimizationParams = {
      signal: { type: signalType, params: signalParams },
      filters: filters,
      risk: { type: riskType, params: riskParams },
      exits: exits,
      settings: { capitalBase },
    };

    await createTask({
      variables: {
        input: {
          name: name.trim(),
          symbol: symbol.trim().toUpperCase(),
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          interval,
          optimizationParams: JSON.stringify(optimizationParams),
        },
      },
    });

    // Reset form
    setName("");
    setSymbol("");
    setSignalType("");
    setSignalParams({});
    setFilters([]);
    setRiskType("");
    setRiskParams({});
    setExits([]);
    setCapitalBase([10000]);

    onClose();
  };

  const handleSignalTypeChange = (type: string) => {
    setSignalType(type);
    setSignalParams(initializeComponent(type, signalComponents));
  };

  const handleRiskTypeChange = (type: string) => {
    setRiskType(type);
    setRiskParams(initializeComponent(type, riskComponents));
  };

  const addFilter = (type: string) => {
    const params = initializeComponent(type, filterComponents);
    setFilters([...filters, { type, params }]);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const updateFilterParams = (index: number, params: ParamValues) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], params };
    setFilters(newFilters);
  };

  const addExit = (type: string) => {
    const params = initializeComponent(type, exitComponents);
    setExits([...exits, { type, params }]);
  };

  const removeExit = (index: number) => {
    setExits(exits.filter((_, i) => i !== index));
  };

  const updateExitParams = (index: number, params: ParamValues) => {
    const newExits = [...exits];
    newExits[index] = { ...newExits[index], params };
    setExits(newExits);
  };

  return (
    <RightDrawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ base: "max-w-[600px]" }}
    >
      <div className="flex h-full flex-col gap-6 overflow-auto">
        <h1 className="text-xl font-bold text-white">Create Backtest Task</h1>

        {componentsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner color="white" size="lg" />
          </div>
        ) : (
          <>
            {/* Basic Info */}
            <div className="flex flex-col gap-4">
              <Input
                label="Task Name"
                placeholder="e.g., EMA Optimization - BTC"
                value={name}
                onValueChange={setName}
                variant="bordered"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Symbol"
                  placeholder="e.g., BTCUSDT"
                  value={symbol}
                  onValueChange={setSymbol}
                  variant="bordered"
                />

                <Select
                  label="Interval"
                  selectedKeys={[interval]}
                  onSelectionChange={(keys) =>
                    setInterval(Array.from(keys)[0] as string)
                  }
                  variant="bordered"
                >
                  {INTERVALS.map((i) => (
                    <SelectItem key={i}>{i}</SelectItem>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  label="Start Date"
                  value={startDate}
                  onValueChange={setStartDate}
                  variant="bordered"
                />
                <Input
                  type="date"
                  label="End Date"
                  value={endDate}
                  onValueChange={setEndDate}
                  variant="bordered"
                />
              </div>
            </div>

            <Divider />

            {/* Signal Section */}
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-neutral-300">Signal</h2>
              <Select
                label="Signal Type"
                selectedKeys={signalType ? [signalType] : []}
                onSelectionChange={(keys) =>
                  handleSignalTypeChange(Array.from(keys)[0] as string)
                }
                variant="bordered"
              >
                {signalComponents.map((c) => (
                  <SelectItem key={c.name} textValue={c.name}>
                    <div className="flex flex-col">
                      <span>{c.name}</span>
                      {c.description && (
                        <span className="text-xs text-neutral-400">
                          {c.description}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </Select>

              {signalType && (
                <ParamInputs
                  component={signalComponents.find(
                    (c) => c.name === signalType,
                  )}
                  params={signalParams}
                  onChange={setSignalParams}
                />
              )}
            </div>

            <Divider />

            {/* Filters Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-neutral-300">
                  Filters (Optional)
                </h2>
                <Select
                  placeholder="Add filter"
                  size="sm"
                  className="w-40"
                  variant="bordered"
                  selectedKeys={[]}
                  onSelectionChange={(keys) => {
                    const type = Array.from(keys)[0] as string;
                    if (type) addFilter(type);
                  }}
                >
                  {filterComponents.map((c) => (
                    <SelectItem key={c.name}>{c.name}</SelectItem>
                  ))}
                </Select>
              </div>

              {filters.map((filter, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-neutral-800 p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">
                      {filter.type}
                    </span>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="danger"
                      onPress={() => removeFilter(index)}
                    >
                      <FiX className="h-3 w-3" />
                    </Button>
                  </div>
                  <ParamInputs
                    component={filterComponents.find(
                      (c) => c.name === filter.type,
                    )}
                    params={filter.params}
                    onChange={(params) => updateFilterParams(index, params)}
                  />
                </div>
              ))}
            </div>

            <Divider />

            {/* Risk Section */}
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-neutral-300">
                Position Sizing
              </h2>
              <Select
                label="Risk Type"
                selectedKeys={riskType ? [riskType] : []}
                onSelectionChange={(keys) =>
                  handleRiskTypeChange(Array.from(keys)[0] as string)
                }
                variant="bordered"
              >
                {riskComponents.map((c) => (
                  <SelectItem key={c.name} textValue={c.name}>
                    <div className="flex flex-col">
                      <span>{c.name}</span>
                      {c.description && (
                        <span className="text-xs text-neutral-400">
                          {c.description}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </Select>

              {riskType && (
                <ParamInputs
                  component={riskComponents.find((c) => c.name === riskType)}
                  params={riskParams}
                  onChange={setRiskParams}
                />
              )}
            </div>

            <Divider />

            {/* Exits Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-neutral-300">
                  Exits
                </h2>
                <Select
                  placeholder="Add exit"
                  size="sm"
                  className="w-40"
                  variant="bordered"
                  selectedKeys={[]}
                  onSelectionChange={(keys) => {
                    const type = Array.from(keys)[0] as string;
                    if (type) addExit(type);
                  }}
                >
                  {exitComponents.map((c) => (
                    <SelectItem key={c.name}>{c.name}</SelectItem>
                  ))}
                </Select>
              </div>

              {exits.map((exit, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-neutral-800 p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">
                      {exit.type}
                    </span>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="danger"
                      onPress={() => removeExit(index)}
                    >
                      <FiX className="h-3 w-3" />
                    </Button>
                  </div>
                  <ParamInputs
                    component={exitComponents.find((c) => c.name === exit.type)}
                    params={exit.params}
                    onChange={(params) => updateExitParams(index, params)}
                  />
                </div>
              ))}
            </div>

            <Divider />

            {/* Settings */}
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-neutral-300">
                Settings
              </h2>
              <ArrayInput
                label="Capital Base (USDT)"
                values={capitalBase}
                onChange={(values) => setCapitalBase(values as number[])}
                type="number"
              />
            </div>

            {/* Total Configs Preview */}
            <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">
                  Total Configurations:
                </span>
                <span className="text-lg font-bold text-white">
                  {totalConfigs.toLocaleString()}
                </span>
              </div>
              {isLargeOptimization && (
                <div className="text-warning-400 mt-2 flex items-center gap-2">
                  <FiAlertTriangle className="h-4 w-4" />
                  <span className="text-xs">
                    Large optimization space. This may take a while to complete.
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                isLoading={createLoading}
                isDisabled={!isValid}
                onPress={handleSubmit}
              >
                Create Task
              </Button>
            </div>
          </>
        )}
      </div>
    </RightDrawer>
  );
}

// Helper component for rendering parameter inputs
type ParamInputsProps = {
  component?: {
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
  params: ParamValues;
  onChange: (params: ParamValues) => void;
};

function ParamInputs({ component, params, onChange }: ParamInputsProps) {
  if (!component) return null;

  return (
    <div className="flex flex-col gap-3">
      {component.params.map((param) => (
        <ArrayInput
          key={param.name}
          label={param.name}
          description={param.description}
          values={(params[param.name] ?? []) as (number | string)[]}
          onChange={(values) => onChange({ ...params, [param.name]: values })}
          type={param.type === "number" ? "number" : "string"}
          required={param.required}
        />
      ))}
    </div>
  );
}

// Helper component for array inputs
type ArrayInputProps = {
  label: string;
  description?: string | null;
  values: (number | string)[];
  onChange: (values: (number | string)[]) => void;
  type: "number" | "string";
  min?: number;
  max?: number;
  required?: boolean;
};

function ArrayInput({
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
          ) : (
            <Input
              size="sm"
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={handleKeyDown}
              className="w-24"
            />
          )}
          <Button isIconOnly size="sm" variant="flat" onPress={handleAdd}>
            <FiPlus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
