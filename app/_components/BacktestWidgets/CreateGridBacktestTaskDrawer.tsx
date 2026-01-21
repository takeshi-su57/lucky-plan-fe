"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Divider,
} from "@heroui/react";
import { FiX, FiAlertTriangle } from "react-icons/fi";

import { RightDrawer } from "@/components/modals/RightDrawer";
import {
  useBacktestComponents,
  useCreateBacktestTask,
} from "@/app-hooks/useBacktest";
import {
  type ParamValues,
  type ComponentConfig,
  type Interval,
  type GridOptimizationParams,
  type BacktestComponent,
  initializeGridComponent,
  ParamInputs,
  ArrayInput,
  IntervalInput,
} from "./BacktestFormComponents";

export type CreateGridBacktestTaskDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
};

export function CreateGridBacktestTaskDrawer({
  isOpen,
  onClose,
  onOpenChange,
}: CreateGridBacktestTaskDrawerProps) {
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

  // Component selections
  const [signalType, setSignalType] = useState<string>("");
  const [signalParams, setSignalParams] = useState<ParamValues>({});
  const [filters, setFilters] = useState<ComponentConfig[]>([]);
  const [riskType, setRiskType] = useState<string>("");
  const [riskParams, setRiskParams] = useState<ParamValues>({});
  const [exits, setExits] = useState<ComponentConfig[]>([]);
  const [capitalBase, setCapitalBase] = useState<number[]>([10000]);

  // Get component definitions
  const signalComponents = (components?.signals ?? []) as BacktestComponent[];
  const filterComponents = (components?.filters ?? []) as BacktestComponent[];
  const riskComponents = (components?.risk ?? []) as BacktestComponent[];
  const exitComponents = (components?.exits ?? []) as BacktestComponent[];

  // Calculate total configurations
  const configsPerSymbol = useMemo(() => {
    let total = 1;

    Object.values(signalParams).forEach((arr) => {
      if (arr.length > 0) total *= arr.length;
    });

    filters.forEach((filter) => {
      Object.values(filter.params).forEach((arr) => {
        if (arr.length > 0) total *= arr.length;
      });
    });

    Object.values(riskParams).forEach((arr) => {
      if (arr.length > 0) total *= arr.length;
    });

    exits.forEach((exit) => {
      Object.values(exit.params).forEach((arr) => {
        if (arr.length > 0) total *= arr.length;
      });
    });

    if (capitalBase.length > 0) total *= capitalBase.length;

    return total;
  }, [signalParams, filters, riskParams, exits, capitalBase]);

  const totalTasks = symbols.length * intervals.length;
  const totalConfigs = configsPerSymbol * Math.max(1, totalTasks);
  const isLargeOptimization = totalConfigs > 500;

  // Form validation
  const isValid =
    name.trim() !== "" &&
    symbols.length > 0 &&
    intervals.length > 0 &&
    startDate !== "" &&
    endDate !== "" &&
    signalType !== "" &&
    riskType !== "";

  const handleSubmit = async () => {
    if (!isValid || createLoading) return;

    const optimizationParams: GridOptimizationParams = {
      signal: { type: signalType, params: signalParams },
      filters: filters,
      risk: { type: riskType, params: riskParams },
      exits: exits,
      settings: { capitalBase },
    };

    const tasks: Promise<unknown>[] = [];
    for (const symbol of symbols) {
      for (const interval of intervals) {
        const intervalStr = `${interval.value}${interval.unit}`;
        tasks.push(
          createTask({
            variables: {
              input: {
                name: `${name.trim()} - ${symbol} - ${intervalStr}`,
                symbol: symbol.toUpperCase(),
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                interval: intervalStr,
                optimizationParams: JSON.stringify(optimizationParams),
                searchStrategy: "grid",
              },
            },
          }),
        );
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
    setSignalType("");
    setSignalParams({});
    setFilters([]);
    setRiskType("");
    setRiskParams({});
    setExits([]);
    setCapitalBase([10000]);
  };

  const handleSignalTypeChange = (type: string) => {
    setSignalType(type);
    setSignalParams(initializeGridComponent(type, signalComponents));
  };

  const handleRiskTypeChange = (type: string) => {
    setRiskType(type);
    setRiskParams(initializeGridComponent(type, riskComponents));
  };

  const addFilter = (type: string) => {
    const params = initializeGridComponent(type, filterComponents);
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
    const params = initializeGridComponent(type, exitComponents);
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
        <div>
          <h1 className="text-xl font-bold text-white">Create Grid Search Task</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Exhaustive search of all parameter combinations
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
                  component={signalComponents.find((c) => c.name === signalType)}
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
                    component={filterComponents.find((c) => c.name === filter.type)}
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
                    Configurations per Task:
                  </span>
                  <span className="text-lg font-bold text-white">
                    {configsPerSymbol.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">
                    Total Configurations:
                  </span>
                  <span className="text-lg font-bold text-white">
                    {totalConfigs.toLocaleString()}
                  </span>
                </div>
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
                {totalTasks > 1 ? `Create ${totalTasks} Tasks` : "Create Task"}
              </Button>
            </div>
          </>
        )}
      </div>
    </RightDrawer>
  );
}
