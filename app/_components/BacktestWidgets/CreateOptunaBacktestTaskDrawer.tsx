"use client";

import { useState, useMemo } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Divider,
  Chip,
  Checkbox,
  CheckboxGroup,
} from "@heroui/react";
import { FiX, FiInfo, FiPlus } from "react-icons/fi";

import { RightDrawer } from "@/components/modals/RightDrawer";
import {
  useBacktestComponents,
  useCreateBacktestTask,
} from "@/app-hooks/useBacktest";
import {
  type OptunaParamValues,
  type OptunaComponentConfig,
  type Interval,
  type BacktestComponent,
  OPTIMIZATION_METRICS,
  initializeOptunaComponent,
  convertOptimizationParamsToFactorJSON,
  OptunaParamInputs,
  ArrayInput,
  IntervalInput,
} from "./BacktestFormComponents";

export type CreateOptunaBacktestTaskDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
};

type MetricCombination = {
  id: string;
  metrics: string[];
};

export function CreateOptunaBacktestTaskDrawer({
  isOpen,
  onClose,
  onOpenChange,
}: CreateOptunaBacktestTaskDrawerProps) {
  const { components, loading: componentsLoading } = useBacktestComponents();
  const { createTask, loading: createLoading } = useCreateBacktestTask();

  // Form state
  const [name, setName] = useState("");
  const [symbols, setSymbols] = useState<string[]>([]);
  const [intervals, setIntervals] = useState<Interval[]>([
    { value: 1, unit: "m" },
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Metric combinations for multi-objective optimization
  const [metricCombinations, setMetricCombinations] = useState<
    MetricCombination[]
  >([{ id: crypto.randomUUID(), metrics: ["sharpeRatio"] }]);
  const [currentMetricSelection, setCurrentMetricSelection] = useState<
    string[]
  >([]);

  const [trials, setTrials] = useState(100);

  // Component selections (with ranges)
  const [signalType, setSignalType] = useState<string>("");
  const [signalParams, setSignalParams] = useState<OptunaParamValues>({});
  const [filters, setFilters] = useState<OptunaComponentConfig[]>([]);
  const [riskType, setRiskType] = useState<string>("");
  const [riskParams, setRiskParams] = useState<OptunaParamValues>({});
  const [exits, setExits] = useState<OptunaComponentConfig[]>([]);
  const [platformType, setPlatformType] = useState<string>("");
  const [platformParams, setPlatformParams] = useState<OptunaParamValues>({});
  const [initialCapital, setInitialCapital] = useState<number[]>([10000]);

  // Get component definitions
  const signalComponents = (components?.signals ?? []) as BacktestComponent[];
  const filterComponents = (components?.filters ?? []) as BacktestComponent[];
  const riskComponents = (components?.risk ?? []) as BacktestComponent[];
  const exitComponents = (components?.exits ?? []) as BacktestComponent[];
  const platformComponents = (components?.platforms ??
    []) as BacktestComponent[];

  const totalTasks =
    symbols.length * intervals.length * metricCombinations.length;
  const totalTrials = trials * Math.max(1, totalTasks);

  // Form validation
  const isValid =
    name.trim() !== "" &&
    symbols.length > 0 &&
    intervals.length > 0 &&
    startDate !== "" &&
    endDate !== "" &&
    signalType !== "" &&
    riskType !== "" &&
    platformType !== "" &&
    metricCombinations.length > 0 &&
    metricCombinations.every((c) => c.metrics.length > 0) &&
    trials > 0;

  const addMetricCombination = () => {
    if (currentMetricSelection.length === 0) return;
    setMetricCombinations([
      ...metricCombinations,
      { id: crypto.randomUUID(), metrics: [...currentMetricSelection] },
    ]);
    setCurrentMetricSelection([]);
  };

  const removeMetricCombination = (id: string) => {
    if (metricCombinations.length <= 1) return;
    setMetricCombinations(metricCombinations.filter((c) => c.id !== id));
  };

  const getMetricLabel = (key: string) => {
    return OPTIMIZATION_METRICS.find((m) => m.key === key)?.label ?? key;
  };

  const formatCombinationLabel = (metrics: string[]) => {
    if (metrics.length === 1) {
      return getMetricLabel(metrics[0]);
    }
    return metrics.map(getMetricLabel).join(" + ");
  };

  // Quick add presets
  const presetCombinations = useMemo(
    () => [
      { label: "Sharpe + PnL", metrics: ["sharpeRatio", "totalPnlUsdt"] },
      { label: "Sharpe + Win Rate", metrics: ["sharpeRatio", "winRate"] },
      {
        label: "PnL + Low Drawdown",
        metrics: ["totalPnlUsdt", "maxDrawdownPercent"],
      },
      {
        label: "All Key Metrics",
        metrics: [
          "sharpeRatio",
          "totalPnlUsdt",
          "winRate",
          "maxDrawdownPercent",
        ],
      },
    ],
    [],
  );

  const handleSubmit = async () => {
    if (!isValid || createLoading) return;

    // Build platform config using OptunaComponentConfig structure
    const platform: OptunaComponentConfig = {
      type: platformType,
      params: platformParams,
    };

    // Build internal params structure
    const internalParams = {
      signal: { type: signalType, params: signalParams },
      filters: filters,
      risk: { type: riskType, params: riskParams },
      exits: exits,
      platform,
      settings: { initialCapital },
    };

    // Convert to FactorJSON format for backend
    const optimizationParams =
      convertOptimizationParamsToFactorJSON(internalParams);

    const tasks: Promise<unknown>[] = [];
    for (const symbol of symbols) {
      for (const interval of intervals) {
        for (const combination of metricCombinations) {
          const intervalStr = `${interval.value}${interval.unit}`;
          const metricsLabel =
            combination.metrics.length > 2
              ? `${combination.metrics.length} metrics`
              : formatCombinationLabel(combination.metrics);
          tasks.push(
            createTask({
              variables: {
                input: {
                  name: `${name.trim()} - ${symbol} - ${intervalStr} - ${metricsLabel}`,
                  symbol: symbol.toUpperCase(),
                  startDate: new Date(startDate),
                  endDate: new Date(endDate),
                  interval: intervalStr,
                  optimizationParams: JSON.stringify(optimizationParams),
                  searchStrategy: "optuna",
                  optimizationMetrics: combination.metrics,
                  trials,
                },
              },
            }),
          );
        }
      }
    }
    await Promise.all(tasks);

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName("");
    setSymbols([]);
    setIntervals([{ value: 1, unit: "m" }]);
    setMetricCombinations([
      { id: crypto.randomUUID(), metrics: ["sharpeRatio"] },
    ]);
    setCurrentMetricSelection([]);
    setTrials(100);
    setSignalType("");
    setSignalParams({});
    setFilters([]);
    setRiskType("");
    setRiskParams({});
    setExits([]);
    setPlatformType("");
    setPlatformParams({});
    setInitialCapital([10000]);
  };

  const handleSignalTypeChange = (type: string) => {
    setSignalType(type);
    setSignalParams(initializeOptunaComponent(type, signalComponents));
  };

  const handleRiskTypeChange = (type: string) => {
    setRiskType(type);
    setRiskParams(initializeOptunaComponent(type, riskComponents));
  };

  const handlePlatformTypeChange = (type: string) => {
    setPlatformType(type);
    setPlatformParams(initializeOptunaComponent(type, platformComponents));
  };

  const addFilter = (type: string) => {
    const params = initializeOptunaComponent(type, filterComponents);
    setFilters([...filters, { type, params }]);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const updateFilterParams = (index: number, params: OptunaParamValues) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], params };
    setFilters(newFilters);
  };

  const addExit = (type: string) => {
    const params = initializeOptunaComponent(type, exitComponents);
    setExits([...exits, { type, params }]);
  };

  const removeExit = (index: number) => {
    setExits(exits.filter((_, i) => i !== index));
  };

  const updateExitParams = (index: number, params: OptunaParamValues) => {
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
        <div>
          <h1 className="text-xl font-bold text-white">Create Optuna Task</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Multi-objective Bayesian optimization with configurable trials
          </p>
        </div>

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
                <ArrayInput
                  label="Symbols"
                  description="e.g., BTCUSDT, ETHUSDT"
                  values={symbols}
                  onChange={(values) => setSymbols(values as string[])}
                  type="string"
                />

                <IntervalInput
                  label="Intervals"
                  intervals={intervals}
                  onChange={setIntervals}
                />
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

            {/* Multi-Objective Optimization Settings */}
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-neutral-300">
                Optimization Metrics
              </h2>

              <div className="border-secondary-800 flex flex-col gap-4 rounded-lg border p-4">
                <div className="text-secondary-400 flex items-start gap-2 text-sm">
                  <FiInfo className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Select metrics for multi-objective optimization. Each
                    combination creates a separate task that finds
                    Pareto-optimal configurations.
                  </span>
                </div>

                {/* Current Combinations */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium text-neutral-400">
                    Metric Combinations ({metricCombinations.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {metricCombinations.map((combination) => (
                      <Chip
                        key={combination.id}
                        variant="flat"
                        color="secondary"
                        onClose={
                          metricCombinations.length > 1
                            ? () => removeMetricCombination(combination.id)
                            : undefined
                        }
                      >
                        {formatCombinationLabel(combination.metrics)}
                      </Chip>
                    ))}
                  </div>
                </div>

                {/* Add New Combination */}
                <div className="flex flex-col gap-3 rounded-lg bg-neutral-800/50 p-3">
                  <span className="text-xs font-medium text-neutral-400">
                    Add Metric Combination
                  </span>

                  <CheckboxGroup
                    value={currentMetricSelection}
                    onValueChange={setCurrentMetricSelection}
                    orientation="horizontal"
                    classNames={{ wrapper: "gap-3" }}
                  >
                    {OPTIMIZATION_METRICS.map((metric) => (
                      <Checkbox key={metric.key} value={metric.key} size="sm">
                        <span className="text-sm">{metric.label}</span>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      color="secondary"
                      variant="flat"
                      startContent={<FiPlus className="h-3 w-3" />}
                      isDisabled={currentMetricSelection.length === 0}
                      onPress={addMetricCombination}
                    >
                      Add Combination
                    </Button>

                    {currentMetricSelection.length > 0 && (
                      <span className="text-xs text-neutral-400">
                        {currentMetricSelection.length === 1
                          ? "Single objective"
                          : `${currentMetricSelection.length}-objective optimization`}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium text-neutral-400">
                    Quick Add Presets
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {presetCombinations.map((preset) => (
                      <Button
                        key={preset.label}
                        size="sm"
                        variant="flat"
                        onPress={() =>
                          setMetricCombinations([
                            ...metricCombinations,
                            {
                              id: crypto.randomUUID(),
                              metrics: preset.metrics,
                            },
                          ])
                        }
                      >
                        + {preset.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Trials */}
                <Input
                  type="number"
                  label="Number of Trials (per task)"
                  value={trials.toString()}
                  onValueChange={(v) => setTrials(parseInt(v) || 100)}
                  variant="bordered"
                  min={10}
                  max={10000}
                />
              </div>
            </div>

            <Divider />

            {/* Platform Section */}
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-neutral-300">
                Platform
              </h2>
              <Select
                label="Platform Type"
                selectedKeys={platformType ? [platformType] : []}
                onSelectionChange={(keys) =>
                  handlePlatformTypeChange(Array.from(keys)[0] as string)
                }
                variant="bordered"
              >
                {platformComponents.map((c) => (
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

              {platformType && (
                <OptunaParamInputs
                  component={platformComponents.find(
                    (c) => c.name === platformType,
                  )}
                  params={platformParams}
                  onChange={setPlatformParams}
                />
              )}
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
                <OptunaParamInputs
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
                  <OptunaParamInputs
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
                <OptunaParamInputs
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
                  <OptunaParamInputs
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
                label="Initial Capital (USDT)"
                description="Starting capital values for backtesting"
                values={initialCapital}
                onChange={(values) => setInitialCapital(values as number[])}
                type="number"
                min={100}
              />
            </div>

            {/* Total Preview */}
            <div className="border-secondary-800 rounded-lg border p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">
                    Tasks to Create:
                  </span>
                  <span className="text-lg font-bold text-white">
                    {totalTasks.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">
                    Trials per Task:
                  </span>
                  <span className="text-lg font-bold text-white">
                    {trials.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">
                    Total Trials:
                  </span>
                  <span className="text-lg font-bold text-white">
                    {totalTrials.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-sm text-neutral-400">
                    Metric Combinations ({metricCombinations.length}):
                  </span>
                  <div className="flex max-w-[300px] flex-wrap justify-end gap-1">
                    {metricCombinations.slice(0, 3).map((c) => (
                      <Chip
                        key={c.id}
                        size="sm"
                        variant="flat"
                        color="secondary"
                      >
                        {formatCombinationLabel(c.metrics)}
                      </Chip>
                    ))}
                    {metricCombinations.length > 3 && (
                      <Chip size="sm" variant="flat">
                        +{metricCombinations.length - 3} more
                      </Chip>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="secondary"
                isLoading={createLoading}
                isDisabled={!isValid}
                onPress={handleSubmit}
              >
                {totalTasks > 1 ? `Create ${totalTasks} Tasks` : "Create Task"}
              </Button>
            </div>
          </>
        )}
      </div>
    </RightDrawer>
  );
}
