"use client";

import { useEffect, useState } from "react";
import { Button, Card, CardBody, Input, Slider, Spinner } from "@heroui/react";

import {
  useRestoreSimulationWorkflowDefaults,
  useSimulationWorkflowConfig,
  useUpdateSimulationWorkflowConfig,
} from "@/app/_hooks/useSimulationEvaluatorWorkers";

const sliderFields = [
  ["maxSimulationsPerResearch", "Max simulations per research", 1, 100, 1],
  ["maxOutstandingDynamicPlans", "Max outstanding dynamic plans", 1, 500, 1],
  ["finalizerBatchSize", "Finalizer batch size", 1, 100, 1],
  ["finalizerConcurrency", "Active finalizers", 1, 100, 1],
  ["maxAwaitingFinalizationPlans", "Max awaiting finalization", 1, 500, 1],
  ["leaderScoringWindowDays", "Leader scoring lookback (days)", 1, 365, 1],
  ["candidateRecentActivityDays", "Recent activity window (days)", 1, 180, 1],
] as const;

const numberFields = [
  ["finalizerLeaseMs", "Finalizer lease (ms)"],
  ["finalizerRetryDelayMs", "Future-event retry delay (ms)"],
  ["evaluatorTaskLeaseMs", "Evaluator task lease (ms)"],
  ["queuedTaskBatchSize", "Queued task batch size"],
  ["readyTaskScanLimit", "Ready task scan limit"],
  ["eventLogAddressBatchSize", "Event-log address batch"],
  ["eventLogRecordBatchSize", "Event-log record page"],
  ["prebuildChunkSourceRecordLimit", "Prebuild source-record chunk"],
  ["botTraderMinAvgDurationMs", "Minimum bot duration (ms)"],
] as const;

const fields = [...sliderFields, ...numberFields] as const;

export function SimulationWorkflowCommandCenter() {
  const { data, loading } = useSimulationWorkflowConfig();
  const [update, { loading: saving }] = useUpdateSimulationWorkflowConfig();
  const [restore, { loading: restoring }] =
    useRestoreSimulationWorkflowDefaults();
  const [values, setValues] = useState<Record<string, string>>({});
  const config = data?.simulationWorkflowConfig;

  useEffect(() => {
    if (!config) return;
    setValues(
      Object.fromEntries(fields.map(([key]) => [key, String(config[key])])),
    );
  }, [config]);

  if (loading && !config) return <Spinner />;

  return (
    <Card>
      <CardBody className="gap-5 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h6 className="text-lg font-semibold">
              Simulation workflow command center
            </h6>
            <p className="text-default-500 text-sm">
              Runtime limits are stored as one metadata override. Changes apply
              to new scheduler and evaluator work.
            </p>
          </div>
          <Button
            color="danger"
            variant="flat"
            isLoading={restoring}
            onPress={async () => {
              await restore();
            }}
          >
            Restore defaults
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {sliderFields.map(([key, label, minValue, maxValue, step]) => (
            <div key={key} className="flex items-end gap-3">
              <Slider
                className="flex-1"
                label={label}
                minValue={minValue}
                maxValue={maxValue}
                step={step}
                value={Number(values[key] ?? minValue)}
                onChange={(value) =>
                  setValues((current) => ({ ...current, [key]: String(value) }))
                }
              />
              <Input
                className="w-24 shrink-0"
                aria-label={`${label} exact value`}
                type="number"
                value={values[key] ?? ""}
                onValueChange={(value) =>
                  setValues((current) => ({ ...current, [key]: value }))
                }
              />
            </div>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {numberFields.map(([key, label]) => (
            <Input
              key={key}
              label={label}
              type="number"
              value={values[key] ?? ""}
              onValueChange={(value) =>
                setValues((current) => ({ ...current, [key]: value }))
              }
            />
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            color="primary"
            isLoading={saving}
            onPress={async () => {
              await update({
                variables: {
                  input: Object.fromEntries(
                    fields.map(([key]) => [key, Number(values[key])]),
                  ),
                },
              });
            }}
          >
            Save workflow configuration
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
