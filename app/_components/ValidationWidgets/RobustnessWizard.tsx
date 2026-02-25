"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Slider,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { FiShield, FiPlay, FiCheck } from "react-icons/fi";
import {
  useConfigureRobustness,
  useRunRobustnessStep,
  useCompleteRobustness,
} from "@/app-hooks/useValidationPipeline";
import { ValidationPipeline } from "@/graphql/gql/graphql";

export type RobustnessWizardProps = {
  pipelineId: string;
  pipeline: ValidationPipeline;
  onComplete: () => void;
};

function formatNumber(
  value: number | null | undefined,
  decimals: number = 2,
): string {
  if (value === null || value === undefined) return "-";
  return value.toFixed(decimals);
}

function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return "-";
  return `${value.toFixed(1)}%`;
}

export function RobustnessWizard({
  pipelineId,
  pipeline,
  onComplete,
}: RobustnessWizardProps) {
  const [steps, setSteps] = useState(10);
  const [minScore, setMinScore] = useState(0.7);

  const robustnessConfig = pipeline.robustnessConfig as {
    steps: number;
    minScore: number;
  } | null;

  const isConfigured = robustnessConfig !== null;
  const completedSteps = pipeline.robustnessCompletedSteps ?? 0;
  const totalSteps = robustnessConfig?.steps ?? 0;

  const { configureRobustness, loading: configuring } =
    useConfigureRobustness();
  const { runStep, stepResults, loading: running } = useRunRobustnessStep();
  const { completeRobustness, loading: completing } = useCompleteRobustness();

  const handleConfigure = async () => {
    await configureRobustness({
      variables: {
        input: {
          pipelineId,
          steps,
          minScore,
        },
      },
    });
  };

  const handleRunStep = async (stepIndex: number) => {
    await runStep({
      variables: {
        input: {
          pipelineId,
          stepIndex,
        },
      },
    });
  };

  const handleComplete = async () => {
    await completeRobustness({
      variables: { pipelineId },
    });
    onComplete();
  };

  return (
    <Card className="border-primary-500/30 border-2">
      <CardHeader className="flex flex-col items-start gap-2 border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2">
          <FiShield className="text-primary-400 h-5 w-5" />
          <h3 className="text-primary-300 text-lg font-semibold">
            Step 6: Entry Point Robustness
          </h3>
        </div>
        <p className="text-sm text-neutral-400">
          Test strategy robustness across different entry points. Configure
          parameters, then run each step one by one.
        </p>
      </CardHeader>

      <CardBody className="flex flex-col gap-4 py-4">
        {!isConfigured ? (
          /* Configuration form */
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
            <div className="mb-3 text-sm font-medium text-neutral-300">
              Robustness Configuration
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Test Steps"
                type="number"
                min={2}
                max={50}
                value={steps.toString()}
                onValueChange={(v) => setSteps(parseInt(v) || 10)}
                variant="bordered"
                size="sm"
                className="max-w-xs"
              />
              <div>
                <span className="mb-2 block text-sm text-neutral-400">
                  Min Stability Score: {(minScore * 100).toFixed(0)}%
                </span>
                <Slider
                  step={0.05}
                  minValue={0.3}
                  maxValue={0.95}
                  value={minScore}
                  onChange={(v) => setMinScore(v as number)}
                  className="max-w-md"
                />
              </div>
              <Button
                color="primary"
                size="sm"
                onPress={handleConfigure}
                isLoading={configuring}
                className="self-start"
              >
                Configure Robustness
              </Button>
            </div>
          </div>
        ) : (
          /* Step runner */
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-neutral-400">
                  Steps: <span className="text-white">{robustnessConfig.steps}</span>
                </span>
                <span className="text-neutral-400">
                  Min Score: <span className="text-white">{(robustnessConfig.minScore * 100).toFixed(0)}%</span>
                </span>
                <span className="text-neutral-400">
                  Progress:{" "}
                  <span className="text-primary-400">
                    {completedSteps}/{totalSteps}
                  </span>
                </span>
              </div>
            </div>

            {/* Step buttons */}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: totalSteps }, (_, i) => {
                const isDone = i < completedSteps;
                const isNext = i === completedSteps;

                return (
                  <Button
                    key={i}
                    size="sm"
                    color={isDone ? "success" : isNext ? "primary" : "default"}
                    variant={isDone ? "flat" : "solid"}
                    startContent={
                      isDone ? (
                        <FiCheck className="h-3 w-3" />
                      ) : isNext ? (
                        <FiPlay className="h-3 w-3" />
                      ) : undefined
                    }
                    onPress={() => handleRunStep(i)}
                    isLoading={running && isNext}
                    isDisabled={!isNext && !isDone}
                  >
                    Step {i + 1}
                  </Button>
                );
              })}
            </div>

            {/* Latest step results */}
            {stepResults && stepResults.length > 0 && (
              <div>
                <div className="mb-2 text-sm font-medium text-neutral-300">
                  Latest Step Results
                </div>
                <Table
                  aria-label="Robustness step results"
                  classNames={{
                    wrapper: "bg-neutral-900/50 border border-neutral-800",
                    th: "bg-neutral-800/50 text-neutral-300",
                    td: "py-2",
                  }}
                >
                  <TableHeader>
                    <TableColumn>CANDIDATE</TableColumn>
                    <TableColumn>SHARPE</TableColumn>
                    <TableColumn>PNL %</TableColumn>
                    <TableColumn>DD %</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {stepResults.map((result) => (
                      <TableRow key={result.candidateId}>
                        <TableCell>
                          <span className="font-mono text-sm text-white">
                            {result.configId.slice(0, 12)}...
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono text-sm text-neutral-300">
                            {formatNumber(result.sharpeRatio)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-mono text-sm ${
                              (result.totalPnl ?? 0) >= 0
                                ? "text-success-400"
                                : "text-danger-400"
                            }`}
                          >
                            {formatPercent(result.totalPnl)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-danger-400 font-mono text-sm">
                            {formatPercent(result.maxDrawdown)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="sm"
                            variant="flat"
                            color={
                              result.status === "DONE" ? "success" : "danger"
                            }
                          >
                            {result.status}
                          </Chip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
      </CardBody>

      {isConfigured && (
        <CardFooter className="border-t border-neutral-800 pt-4">
          <Button
            color="primary"
            startContent={<FiCheck className="h-4 w-4" />}
            onPress={handleComplete}
            isLoading={completing}
            isDisabled={completedSteps < totalSteps}
          >
            Complete Robustness ({completedSteps}/{totalSteps} steps)
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
