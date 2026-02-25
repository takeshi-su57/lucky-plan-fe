"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Divider,
  Textarea,
} from "@heroui/react";
import { FiX } from "react-icons/fi";

import { RightDrawer } from "@/components/modals/RightDrawer";
import { StrategyCategory } from "@/graphql/gql/graphql";
import {
  useBacktestComponents,
} from "@/app-hooks/useBacktest";
import { useCreateStrategyTemplate } from "@/app-hooks/useStrategyTemplate";
import {
  type OptunaParamValues,
  type OptunaComponentConfig,
  type BacktestComponent,
  initializeOptunaComponent,
  convertOptimizationParamsToFactorJSON,
  OptunaParamInputs,
  ArrayInput,
} from "@/app-components/BacktestWidgets/BacktestFormComponents";

const categoryOptions = [
  { key: StrategyCategory.TrendFollowing, label: "Trend Following" },
  { key: StrategyCategory.MeanReversion, label: "Mean Reversion" },
  { key: StrategyCategory.Momentum, label: "Momentum" },
  { key: StrategyCategory.Breakout, label: "Breakout" },
  { key: StrategyCategory.Scalping, label: "Scalping" },
  { key: StrategyCategory.Swing, label: "Swing" },
  { key: StrategyCategory.Volatility, label: "Volatility" },
  { key: StrategyCategory.Custom, label: "Custom" },
];

export type CreateTemplateDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
};

export function CreateTemplateDrawer({
  isOpen,
  onClose,
  onOpenChange,
}: CreateTemplateDrawerProps) {
  const { components, loading: componentsLoading } = useBacktestComponents();
  const { createTemplate, loading: createLoading } = useCreateStrategyTemplate();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<StrategyCategory>(StrategyCategory.Custom);

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
  const platformComponents = (components?.platforms ?? []) as BacktestComponent[];

  // Form validation
  const isValid =
    name.trim() !== "" &&
    signalType !== "" &&
    riskType !== "" &&
    platformType !== "";

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
    const factoryConfig = convertOptimizationParamsToFactorJSON(internalParams);

    await createTemplate({
      variables: {
        input: {
          name: name.trim(),
          description: description.trim() || null,
          category,
          factoryConfig: JSON.stringify(factoryConfig),
        },
      },
    });

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory(StrategyCategory.Custom);
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
          <h1 className="text-xl font-bold text-white">Create Strategy Template</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Define a reusable strategy configuration for template-based searches
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
                label="Template Name"
                placeholder="e.g., EMA Crossover Strategy"
                value={name}
                onValueChange={setName}
                variant="bordered"
                isRequired
              />

              <Textarea
                label="Description"
                placeholder="Optional description of the strategy..."
                value={description}
                onValueChange={setDescription}
                variant="bordered"
                minRows={2}
              />

              <Select
                label="Category"
                selectedKeys={[category]}
                onSelectionChange={(keys) =>
                  setCategory(Array.from(keys)[0] as StrategyCategory)
                }
                variant="bordered"
              >
                {categoryOptions.map((option) => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
              </Select>
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
                isRequired
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
                isRequired
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
                isRequired
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
                Create Template
              </Button>
            </div>
          </>
        )}
      </div>
    </RightDrawer>
  );
}
