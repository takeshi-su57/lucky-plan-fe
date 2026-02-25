"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Checkbox,
  CheckboxGroup,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Chip,
} from "@heroui/react";
import { FiTarget, FiTrash2, FiEye, FiPlus, FiCheck } from "react-icons/fi";
import {
  usePreviewParetoStep,
  useApplyParetoStep,
  useRemoveParetoStep,
  useCompleteParetoStep,
  useParetoSteps,
} from "@/app-hooks/useValidationPipeline";

export type ParetoConfigPanelProps = {
  pipelineId: string;
  onComplete: () => void;
};

const availableMetrics = [
  { key: "sharpeRatio", label: "Sharpe Ratio" },
  { key: "totalPnlPercent", label: "Total PnL %" },
  { key: "maxDrawdownPercent", label: "Max Drawdown %" },
  { key: "winRate", label: "Win Rate" },
  { key: "profitFactor", label: "Profit Factor" },
];

export function ParetoConfigPanel({
  pipelineId,
  onComplete,
}: ParetoConfigPanelProps) {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "sharpeRatio",
    "totalPnlPercent",
  ]);

  const { steps, loading: stepsLoading, refetch: refetchSteps } = useParetoSteps(pipelineId);
  const { previewPareto, preview, loading: previewing } = usePreviewParetoStep();
  const { applyPareto, loading: applying } = useApplyParetoStep();
  const { removePareto, loading: removing } = useRemoveParetoStep();
  const { completePareto, loading: completing } = useCompleteParetoStep();

  const handlePreview = async () => {
    if (selectedMetrics.length < 2) return;
    await previewPareto({
      variables: {
        input: {
          pipelineId,
          metrics: selectedMetrics,
        },
      },
    });
  };

  const handleApply = async () => {
    if (selectedMetrics.length < 2) return;
    await applyPareto({
      variables: {
        input: {
          pipelineId,
          metrics: selectedMetrics,
        },
      },
    });
    await refetchSteps();
  };

  const handleRemove = async (stepId: string) => {
    await removePareto({
      variables: { pipelineId, stepId },
    });
    await refetchSteps();
  };

  const handleComplete = async () => {
    await completePareto({
      variables: { pipelineId },
    });
    onComplete();
  };

  const getMetricLabel = (key: string) =>
    availableMetrics.find((m) => m.key === key)?.label ?? key;

  return (
    <Card className="border-secondary-500/30 border-2">
      <CardHeader className="flex flex-col items-start gap-2 border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2">
          <FiTarget className="text-secondary-400 h-5 w-5" />
          <h3 className="text-secondary-300 text-lg font-semibold">
            Step 3: Pareto Selection
          </h3>
        </div>
        <p className="text-sm text-neutral-400">
          Apply Pareto optimization runs with different objective sets. Each run
          independently finds Pareto-optimal candidates. Only candidates optimal
          in ALL runs will advance.
        </p>
      </CardHeader>

      <CardBody className="flex flex-col gap-4 py-4">
        {/* Add new Pareto run */}
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
          <div className="mb-3 text-sm font-medium text-neutral-300">
            Add Pareto Run
          </div>

          <CheckboxGroup
            label="Optimization Metrics (select 2+)"
            value={selectedMetrics}
            onValueChange={setSelectedMetrics}
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

          {selectedMetrics.length < 2 && (
            <p className="mt-2 text-xs text-danger-400">
              Select at least 2 metrics for Pareto optimization.
            </p>
          )}

          <div className="mt-3 flex items-center gap-3">
            <Button
              size="sm"
              variant="flat"
              startContent={<FiEye className="h-4 w-4" />}
              onPress={handlePreview}
              isLoading={previewing}
              isDisabled={selectedMetrics.length < 2}
            >
              Preview
            </Button>

            <Button
              size="sm"
              color="secondary"
              startContent={<FiPlus className="h-4 w-4" />}
              onPress={handleApply}
              isLoading={applying}
              isDisabled={selectedMetrics.length < 2}
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
                Optimal: <span className="text-success-400">{preview.optimalCount}</span>
              </span>
              <span className="text-neutral-400">
                Dominated: <span className="text-danger-400">{preview.dominatedCount}</span>
              </span>
            </div>
          )}
        </div>

        {/* Applied Pareto runs */}
        {stepsLoading ? (
          <div className="flex items-center justify-center py-4">
            <Spinner size="sm" />
          </div>
        ) : steps.length > 0 ? (
          <div>
            <div className="mb-2 text-sm font-medium text-neutral-300">
              Applied Pareto Runs ({steps.length})
            </div>
            <Table
              aria-label="Applied Pareto runs"
              classNames={{
                wrapper: "bg-neutral-900/50 border border-neutral-800",
                th: "bg-neutral-800/50 text-neutral-300",
                td: "py-2",
              }}
            >
              <TableHeader>
                <TableColumn>#</TableColumn>
                <TableColumn>METRICS</TableColumn>
                <TableColumn>BEFORE</TableColumn>
                <TableColumn>OPTIMAL</TableColumn>
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
                      <div className="flex flex-wrap gap-1">
                        {step.metrics.map((m) => (
                          <Chip
                            key={m}
                            size="sm"
                            variant="flat"
                            color="secondary"
                          >
                            {getMetricLabel(m)}
                          </Chip>
                        ))}
                      </div>
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
            No Pareto runs applied yet. Add runs above to find optimal
            candidates.
          </div>
        )}
      </CardBody>

      <CardFooter className="border-t border-neutral-800 pt-4">
        <Button
          color="secondary"
          startContent={<FiCheck className="h-4 w-4" />}
          onPress={handleComplete}
          isLoading={completing}
          isDisabled={steps.length === 0}
        >
          Complete Pareto Step
        </Button>
      </CardFooter>
    </Card>
  );
}
