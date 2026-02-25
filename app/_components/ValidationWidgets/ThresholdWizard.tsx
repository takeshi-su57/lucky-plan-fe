"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Chip,
} from "@heroui/react";
import { FiFilter, FiTrash2, FiEye, FiPlus, FiCheck } from "react-icons/fi";
import {
  useApplyThresholdStep,
  usePreviewThresholdStep,
  useRemoveThresholdStep,
  useCompleteThresholdStep,
  useThresholdSteps,
} from "@/app-hooks/useValidationPipeline";

export type ThresholdWizardProps = {
  pipelineId: string;
  onComplete: () => void;
};

const metricOptions = [
  { key: "sharpeRatio", label: "Sharpe Ratio" },
  { key: "winRate", label: "Win Rate" },
  { key: "profitFactor", label: "Profit Factor" },
  { key: "maxDrawdownPercent", label: "Max Drawdown %" },
  { key: "totalTrades", label: "Total Trades" },
  { key: "totalPnlPercent", label: "Total PnL %" },
];

const operatorOptions = [
  { key: "gte", label: ">=" },
  { key: "lte", label: "<=" },
];

export function ThresholdWizard({
  pipelineId,
  onComplete,
}: ThresholdWizardProps) {
  const [metricName, setMetricName] = useState("");
  const [operator, setOperator] = useState("gte");
  const [value, setValue] = useState("");

  const { steps, loading: stepsLoading, refetch: refetchSteps } = useThresholdSteps(pipelineId);
  const { applyThreshold, loading: applying } = useApplyThresholdStep();
  const { previewThreshold, preview, loading: previewing } = usePreviewThresholdStep();
  const { removeThreshold, loading: removing } = useRemoveThresholdStep();
  const { completeThreshold, loading: completing } = useCompleteThresholdStep();

  const handlePreview = async () => {
    if (!metricName || !value) return;
    await previewThreshold({
      variables: {
        input: {
          pipelineId,
          metricName,
          operator,
          value: parseFloat(value),
        },
      },
    });
  };

  const handleApply = async () => {
    if (!metricName || !value) return;
    await applyThreshold({
      variables: {
        input: {
          pipelineId,
          metricName,
          operator,
          value: parseFloat(value),
        },
      },
    });
    await refetchSteps();
    setMetricName("");
    setValue("");
  };

  const handleRemove = async (stepId: string) => {
    await removeThreshold({
      variables: { pipelineId, stepId },
    });
    await refetchSteps();
  };

  const handleComplete = async () => {
    await completeThreshold({
      variables: { pipelineId },
    });
    onComplete();
  };

  const getMetricLabel = (key: string) =>
    metricOptions.find((m) => m.key === key)?.label ?? key;

  return (
    <Card className="border-primary-500/30 border-2">
      <CardHeader className="flex flex-col items-start gap-2 border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2">
          <FiFilter className="text-primary-400 h-5 w-5" />
          <h3 className="text-primary-300 text-lg font-semibold">
            Step 2: Threshold Filtering
          </h3>
        </div>
        <p className="text-sm text-neutral-400">
          Apply threshold filters one metric at a time. Preview before applying
          to see how many candidates will be eliminated.
        </p>
      </CardHeader>

      <CardBody className="flex flex-col gap-4 py-4">
        {/* Add new filter */}
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
          <div className="mb-3 text-sm font-medium text-neutral-300">
            Add Filter
          </div>
          <div className="flex items-end gap-3">
            <Select
              label="Metric"
              size="sm"
              variant="bordered"
              selectedKeys={metricName ? [metricName] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setMetricName(selected || "");
              }}
              className="w-48"
            >
              {metricOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>

            <Select
              label="Operator"
              size="sm"
              variant="bordered"
              selectedKeys={[operator]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setOperator(selected || "gte");
              }}
              className="w-24"
            >
              {operatorOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>

            <Input
              label="Value"
              type="number"
              size="sm"
              variant="bordered"
              value={value}
              onValueChange={setValue}
              className="w-32"
            />

            <Button
              size="sm"
              variant="flat"
              startContent={<FiEye className="h-4 w-4" />}
              onPress={handlePreview}
              isLoading={previewing}
              isDisabled={!metricName || !value}
            >
              Preview
            </Button>

            <Button
              size="sm"
              color="primary"
              startContent={<FiPlus className="h-4 w-4" />}
              onPress={handleApply}
              isLoading={applying}
              isDisabled={!metricName || !value}
            >
              Apply
            </Button>
          </div>

          {/* Preview result */}
          {preview && (
            <div className="mt-3 flex items-center gap-4 text-sm">
              <span className="text-neutral-400">
                Current: <span className="text-white">{preview.currentCount}</span>
              </span>
              <span className="text-neutral-400">
                Surviving: <span className="text-success-400">{preview.survivingCount}</span>
              </span>
              <span className="text-neutral-400">
                Eliminated: <span className="text-danger-400">{preview.eliminatedCount}</span>
              </span>
            </div>
          )}
        </div>

        {/* Applied filters */}
        {stepsLoading ? (
          <div className="flex items-center justify-center py-4">
            <Spinner size="sm" />
          </div>
        ) : steps.length > 0 ? (
          <div>
            <div className="mb-2 text-sm font-medium text-neutral-300">
              Applied Filters ({steps.length})
            </div>
            <Table
              aria-label="Applied threshold filters"
              classNames={{
                wrapper: "bg-neutral-900/50 border border-neutral-800",
                th: "bg-neutral-800/50 text-neutral-300",
                td: "py-2",
              }}
            >
              <TableHeader>
                <TableColumn>#</TableColumn>
                <TableColumn>METRIC</TableColumn>
                <TableColumn>CONDITION</TableColumn>
                <TableColumn>BEFORE</TableColumn>
                <TableColumn>AFTER</TableColumn>
                <TableColumn width={60}>REMOVE</TableColumn>
              </TableHeader>
              <TableBody>
                {steps.map((step) => (
                  <TableRow key={step.id}>
                    <TableCell>
                      <Chip size="sm" variant="flat">
                        {step.stepOrder}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-white">
                        {getMetricLabel(step.metricName)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm text-neutral-300">
                        {step.operator === "gte" ? ">=" : "<="} {step.value}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-neutral-300">
                        {step.candidatesBefore}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-success-400">
                        {step.candidatesAfter}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => handleRemove(step.id)}
                        isLoading={removing}
                      >
                        <FiTrash2 className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="py-4 text-center text-sm text-neutral-500">
            No filters applied yet. Add filters above or skip this step.
          </div>
        )}
      </CardBody>

      <CardFooter className="border-t border-neutral-800 pt-4">
        <Button
          color="primary"
          startContent={<FiCheck className="h-4 w-4" />}
          onPress={handleComplete}
          isLoading={completing}
        >
          Complete Threshold Step
        </Button>
      </CardFooter>
    </Card>
  );
}
