"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxGroup,
  Slider,
} from "@heroui/react";
import { FiPlay, FiLayers } from "react-icons/fi";
import {
  useCreateValidationPipeline,
  useStartValidationPipeline,
  ValidationPipelineInfoFragment,
} from "@/app-hooks/useValidationPipeline";
import { getFragmentData } from "@/graphql/gql/fragment-masking";

export type CreatePipelineModalProps = {
  isOpen: boolean;
  onClose: () => void;
  templateSearchId: string;
  templateSearchName?: string;
};

const availableMetrics = [
  { key: "sharpeRatio", label: "Sharpe Ratio" },
  { key: "totalPnlPercent", label: "Total PnL %" },
  { key: "maxDrawdownPercent", label: "Max Drawdown %" },
  { key: "winRate", label: "Win Rate" },
  { key: "profitFactor", label: "Profit Factor" },
];

export function CreatePipelineModal({
  isOpen,
  onClose,
  templateSearchId,
  templateSearchName,
}: CreatePipelineModalProps) {
  const router = useRouter();

  // Form state
  const [name, setName] = useState(
    templateSearchName ? `Validation - ${templateSearchName}` : "",
  );

  // Threshold config
  const [minSharpeRatio, setMinSharpeRatio] = useState<number | undefined>(0.5);
  const [maxSharpeRatio, setMaxSharpeRatio] = useState<number | undefined>(
    undefined,
  );
  const [minWinRate, setMinWinRate] = useState<number | undefined>(40);
  const [minProfitFactor, setMinProfitFactor] = useState<number | undefined>(
    1.0,
  );
  const [maxDrawdownPercent, setMaxDrawdownPercent] = useState<
    number | undefined
  >(30);
  const [minTotalTrades, setMinTotalTrades] = useState<number | undefined>(10);
  const [minTotalPnlPercent, setMinTotalPnlPercent] = useState<
    number | undefined
  >(0);

  // Pareto config
  const [paretoMetrics, setParetoMetrics] = useState<string[]>([
    "sharpeRatio",
    "totalPnlPercent",
    "maxDrawdownPercent",
  ]);

  // WFA config
  const [wfaTrainRatio, setWfaTrainRatio] = useState(0.7);
  const [wfaWindows, setWfaWindows] = useState(3);
  const [wfaMinConsistency, setWfaMinConsistency] = useState(0.6);

  // Robustness config
  const [robustnessSteps, setRobustnessSteps] = useState(10);
  const [robustnessMinScore, setRobustnessMinScore] = useState(0.7);

  // Auto-start
  const [autoStart, setAutoStart] = useState(true);

  // Mutations
  const { createPipeline, loading: creating } = useCreateValidationPipeline();
  const { startPipeline, loading: starting } = useStartValidationPipeline();

  const handleCreate = async () => {
    const result = await createPipeline({
      variables: {
        input: {
          name,
          templateSearchId,
          thresholdConfig: {
            minSharpeRatio: minSharpeRatio ?? null,
            maxSharpeRatio: maxSharpeRatio ?? null,
            minWinRate: minWinRate ?? null,
            minProfitFactor: minProfitFactor ?? null,
            maxDrawdownPercent: maxDrawdownPercent ?? null,
            minTotalTrades: minTotalTrades ?? null,
            minTotalPnlPercent: minTotalPnlPercent ?? null,
          },
          paretoMetrics,
          wfaTrainRatio,
          wfaWindows,
          wfaMinConsistency,
          robustnessSteps,
          robustnessMinScore,
        },
      },
    });

    if (result.data?.createValidationPipeline) {
      const pipeline = getFragmentData(
        ValidationPipelineInfoFragment,
        result.data.createValidationPipeline,
      );

      if (autoStart) {
        await startPipeline({ variables: { id: pipeline.id } });
      }

      onClose();
      router.push(`/validation-pipelines/${pipeline.id}`);
    }
  };

  const isLoading = creating || starting;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <FiLayers className="h-5 w-5" />
          Create Validation Pipeline
        </ModalHeader>

        <ModalBody className="flex flex-col gap-4">
          {/* Basic Info */}
          <Input
            label="Pipeline Name"
            placeholder="Enter pipeline name"
            value={name}
            onValueChange={setName}
            variant="bordered"
            isRequired
          />

          <Accordion
            variant="bordered"
            selectionMode="multiple"
            defaultExpandedKeys={["threshold"]}
          >
            {/* Layer 1: Threshold Config */}
            <AccordionItem
              key="threshold"
              aria-label="Threshold Filters"
              title={
                <span className="text-sm font-medium">
                  Layer 1: Threshold Filters
                </span>
              }
              subtitle="Filter candidates by performance metrics"
            >
              <div className="grid grid-cols-2 gap-4 pb-4">
                <Input
                  label="Min Sharpe Ratio"
                  type="number"
                  step="0.1"
                  value={minSharpeRatio?.toString() ?? ""}
                  onValueChange={(v) =>
                    setMinSharpeRatio(v ? parseFloat(v) : undefined)
                  }
                  variant="bordered"
                  size="sm"
                />
                <Input
                  label="Max Sharpe Ratio"
                  type="number"
                  step="0.1"
                  placeholder="No limit"
                  value={maxSharpeRatio?.toString() ?? ""}
                  onValueChange={(v) =>
                    setMaxSharpeRatio(v ? parseFloat(v) : undefined)
                  }
                  variant="bordered"
                  size="sm"
                />
                <Input
                  label="Min Win Rate (%)"
                  type="number"
                  step="1"
                  value={minWinRate?.toString() ?? ""}
                  onValueChange={(v) =>
                    setMinWinRate(v ? parseFloat(v) : undefined)
                  }
                  variant="bordered"
                  size="sm"
                />
                <Input
                  label="Min Profit Factor"
                  type="number"
                  step="0.1"
                  value={minProfitFactor?.toString() ?? ""}
                  onValueChange={(v) =>
                    setMinProfitFactor(v ? parseFloat(v) : undefined)
                  }
                  variant="bordered"
                  size="sm"
                />
                <Input
                  label="Max Drawdown (%)"
                  type="number"
                  step="1"
                  value={maxDrawdownPercent?.toString() ?? ""}
                  onValueChange={(v) =>
                    setMaxDrawdownPercent(v ? parseFloat(v) : undefined)
                  }
                  variant="bordered"
                  size="sm"
                />
                <Input
                  label="Min Total Trades"
                  type="number"
                  step="1"
                  value={minTotalTrades?.toString() ?? ""}
                  onValueChange={(v) =>
                    setMinTotalTrades(v ? parseInt(v) : undefined)
                  }
                  variant="bordered"
                  size="sm"
                />
                <Input
                  label="Min PnL (%)"
                  type="number"
                  step="1"
                  value={minTotalPnlPercent?.toString() ?? ""}
                  onValueChange={(v) =>
                    setMinTotalPnlPercent(v ? parseFloat(v) : undefined)
                  }
                  variant="bordered"
                  size="sm"
                  className="col-span-2"
                />
              </div>
            </AccordionItem>

            {/* Layer 2: Pareto Config */}
            <AccordionItem
              key="pareto"
              aria-label="Pareto Optimization"
              title={
                <span className="text-sm font-medium">
                  Layer 2: Pareto Optimization
                </span>
              }
              subtitle="Select metrics for multi-objective optimization"
            >
              <div className="pb-4">
                <CheckboxGroup
                  label="Optimization Metrics (select 2-3)"
                  value={paretoMetrics}
                  onValueChange={setParetoMetrics}
                  orientation="horizontal"
                  classNames={{
                    wrapper: "gap-4",
                  }}
                >
                  {availableMetrics.map((metric) => (
                    <Checkbox key={metric.key} value={metric.key}>
                      {metric.label}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
            </AccordionItem>

            {/* Layer 3: WFA Config */}
            <AccordionItem
              key="wfa"
              aria-label="Walk-Forward Analysis"
              title={
                <span className="text-sm font-medium">
                  Layer 3: Walk-Forward Analysis
                </span>
              }
              subtitle="Configure out-of-sample validation"
            >
              <div className="flex flex-col gap-4 pb-4">
                <div>
                  <span className="mb-2 block text-sm text-neutral-400">
                    Train Ratio: {(wfaTrainRatio * 100).toFixed(0)}%
                  </span>
                  <Slider
                    step={0.05}
                    minValue={0.5}
                    maxValue={0.9}
                    value={wfaTrainRatio}
                    onChange={(v) => setWfaTrainRatio(v as number)}
                    className="max-w-md"
                  />
                </div>
                <Input
                  label="Number of Windows"
                  type="number"
                  min={2}
                  max={10}
                  value={wfaWindows.toString()}
                  onValueChange={(v) => setWfaWindows(parseInt(v) || 3)}
                  variant="bordered"
                  size="sm"
                  className="max-w-xs"
                />
                <div>
                  <span className="mb-2 block text-sm text-neutral-400">
                    Min Consistency: {(wfaMinConsistency * 100).toFixed(0)}%
                  </span>
                  <Slider
                    step={0.05}
                    minValue={0.3}
                    maxValue={0.9}
                    value={wfaMinConsistency}
                    onChange={(v) => setWfaMinConsistency(v as number)}
                    className="max-w-md"
                  />
                </div>
              </div>
            </AccordionItem>

            {/* Layer 5: Robustness Config */}
            <AccordionItem
              key="robustness"
              aria-label="Robustness Testing"
              title={
                <span className="text-sm font-medium">
                  Layer 5: Robustness Testing
                </span>
              }
              subtitle="Configure stability testing across different start dates"
            >
              <div className="flex flex-col gap-4 pb-4">
                <Input
                  label="Test Steps"
                  type="number"
                  min={5}
                  max={20}
                  value={robustnessSteps.toString()}
                  onValueChange={(v) => setRobustnessSteps(parseInt(v) || 10)}
                  variant="bordered"
                  size="sm"
                  className="max-w-xs"
                />
                <div>
                  <span className="mb-2 block text-sm text-neutral-400">
                    Min Stability Score: {(robustnessMinScore * 100).toFixed(0)}
                    %
                  </span>
                  <Slider
                    step={0.05}
                    minValue={0.5}
                    maxValue={0.95}
                    value={robustnessMinScore}
                    onChange={(v) => setRobustnessMinScore(v as number)}
                    className="max-w-md"
                  />
                </div>
              </div>
            </AccordionItem>
          </Accordion>

          {/* Auto-start */}
          <Checkbox isSelected={autoStart} onValueChange={setAutoStart}>
            Start pipeline immediately after creation
          </Checkbox>
        </ModalBody>

        <ModalFooter>
          <Button variant="flat" onPress={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button
            color="primary"
            startContent={
              autoStart ? <FiPlay className="h-4 w-4" /> : undefined
            }
            onPress={handleCreate}
            isLoading={isLoading}
            isDisabled={!name || paretoMetrics.length < 2}
          >
            {autoStart ? "Create & Start" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
