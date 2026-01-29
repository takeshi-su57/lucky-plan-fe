"use client";

import { useState, useEffect, useMemo } from "react";
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
import { FiInfo, FiPlus } from "react-icons/fi";

import { RightDrawer } from "@/components/modals/RightDrawer";
import { useStrategyTemplates, useStrategyTemplate } from "@/app-hooks/useStrategyTemplate";
import { useCreateTemplateSearch } from "@/app-hooks/useTemplateSearch";
import {
  type Interval,
  OPTIMIZATION_METRICS,
  ArrayInput,
  IntervalInput,
} from "@/app-components/BacktestWidgets/BacktestFormComponents";
import { TemplateCategoryChip } from "./TemplateCategoryChip";

export type CreateTemplateSearchDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  preselectedTemplateId?: string | null;
};

type MetricCombination = {
  id: string;
  metrics: string[];
};

export function CreateTemplateSearchDrawer({
  isOpen,
  onClose,
  onOpenChange,
  preselectedTemplateId,
}: CreateTemplateSearchDrawerProps) {
  const { templates, loading: templatesLoading } = useStrategyTemplates({
    isActive: true,
    limit: 100,
  });
  const { createSearch, loading: createLoading } = useCreateTemplateSearch();

  // Form state
  const [name, setName] = useState("");
  const [templateId, setTemplateId] = useState<string>("");
  const [symbols, setSymbols] = useState<string[]>([]);
  const [intervals, setIntervals] = useState<Interval[]>([
    { value: 1, unit: "m" },
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchStrategy, setSearchStrategy] = useState<"optuna" | "grid">("optuna");
  const [trials, setTrials] = useState(100);

  // Metric combinations for multi-objective optimization
  const [metricCombinations, setMetricCombinations] = useState<MetricCombination[]>([
    { id: crypto.randomUUID(), metrics: ["sharpeRatio"] },
  ]);
  const [currentMetricSelection, setCurrentMetricSelection] = useState<string[]>([]);

  // Get selected template details
  const { template: selectedTemplate } = useStrategyTemplate(templateId || null);

  // Set preselected template when drawer opens
  useEffect(() => {
    if (preselectedTemplateId && isOpen) {
      setTemplateId(preselectedTemplateId);
    }
  }, [preselectedTemplateId, isOpen]);

  // Calculate total tasks
  const totalTasks = symbols.length * intervals.length * metricCombinations.length;

  // Form validation
  const isValid =
    name.trim() !== "" &&
    templateId !== "" &&
    symbols.length > 0 &&
    intervals.length > 0 &&
    startDate !== "" &&
    endDate !== "" &&
    metricCombinations.length > 0 &&
    metricCombinations.every((c) => c.metrics.length > 0) &&
    (searchStrategy === "grid" || trials > 0);

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
    ],
    [],
  );

  const handleSubmit = async () => {
    if (!isValid || createLoading) return;

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
            createSearch({
              variables: {
                input: {
                  name: `${name.trim()} - ${symbol} - ${intervalStr} - ${metricsLabel}`,
                  templateId,
                  symbol: symbol.toUpperCase(),
                  startDate: new Date(startDate),
                  endDate: new Date(endDate),
                  interval: intervalStr,
                  searchStrategy,
                  optimizationMetrics: combination.metrics,
                  trials: searchStrategy === "optuna" ? trials : undefined,
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
    setTemplateId(preselectedTemplateId ?? "");
    setSymbols([]);
    setIntervals([{ value: 1, unit: "m" }]);
    setStartDate("");
    setEndDate("");
    setSearchStrategy("optuna");
    setTrials(100);
    setMetricCombinations([
      { id: crypto.randomUUID(), metrics: ["sharpeRatio"] },
    ]);
    setCurrentMetricSelection([]);
  };

  return (
    <RightDrawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ base: "max-w-[600px]" }}
    >
      <div className="flex h-full flex-col gap-6 overflow-auto">
        <div>
          <h1 className="text-xl font-bold text-white">Create Template Search</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Run a backtest search using a predefined strategy template
          </p>
        </div>

        {templatesLoading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner color="white" size="lg" />
          </div>
        ) : (
          <>
            {/* Template Selection */}
            <div className="flex flex-col gap-4">
              <Select
                label="Strategy Template"
                selectedKeys={templateId ? [templateId] : []}
                onSelectionChange={(keys) =>
                  setTemplateId(Array.from(keys)[0] as string)
                }
                variant="bordered"
                isRequired
              >
                {templates.map((t) => (
                  <SelectItem key={t.id} textValue={t.name}>
                    <div className="flex items-center justify-between gap-2">
                      <span>{t.name}</span>
                      <TemplateCategoryChip category={t.category} size="sm" />
                    </div>
                  </SelectItem>
                ))}
              </Select>

              {selectedTemplate && (
                <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {selectedTemplate.name}
                    </span>
                    <TemplateCategoryChip category={selectedTemplate.category} />
                  </div>
                  {selectedTemplate.description && (
                    <p className="mt-1 text-xs text-neutral-400">
                      {selectedTemplate.description}
                    </p>
                  )}
                </div>
              )}
            </div>

            <Divider />

            {/* Basic Info */}
            <div className="flex flex-col gap-4">
              <Input
                label="Search Name"
                placeholder="e.g., BTC EMA Optimization"
                value={name}
                onValueChange={setName}
                variant="bordered"
                isRequired
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
                  isRequired
                />
                <Input
                  type="date"
                  label="End Date"
                  value={endDate}
                  onValueChange={setEndDate}
                  variant="bordered"
                  isRequired
                />
              </div>
            </div>

            <Divider />

            {/* Search Strategy */}
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-neutral-300">
                Search Strategy
              </h2>

              <Select
                label="Strategy"
                selectedKeys={[searchStrategy]}
                onSelectionChange={(keys) =>
                  setSearchStrategy(Array.from(keys)[0] as "optuna" | "grid")
                }
                variant="bordered"
              >
                <SelectItem key="optuna" textValue="Optuna (Smart)">
                  <div className="flex flex-col">
                    <span>Optuna (Smart)</span>
                    <span className="text-xs text-neutral-400">
                      Bayesian optimization with configurable trials
                    </span>
                  </div>
                </SelectItem>
                <SelectItem key="grid" textValue="Grid Search">
                  <div className="flex flex-col">
                    <span>Grid Search</span>
                    <span className="text-xs text-neutral-400">
                      Exhaustive search of all parameter combinations
                    </span>
                  </div>
                </SelectItem>
              </Select>

              {searchStrategy === "optuna" && (
                <Input
                  type="number"
                  label="Number of Trials (per task)"
                  value={trials.toString()}
                  onValueChange={(v) => setTrials(parseInt(v) || 100)}
                  variant="bordered"
                  min={10}
                  max={10000}
                />
              )}
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
                    combination creates a separate task.
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
              </div>
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
                {searchStrategy === "optuna" && (
                  <>
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
                        {(trials * Math.max(1, totalTasks)).toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
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
                {totalTasks > 1
                  ? `Create ${totalTasks} Searches`
                  : "Create Search"}
              </Button>
            </div>
          </>
        )}
      </div>
    </RightDrawer>
  );
}
