"use client";

import { Chip } from "@heroui/react";

import { SimulationStatus } from "@/graphql/gql/graphql";

type ResearchWorkflowProgress = {
  totalPlans: number;
  evaluatedPlans: number;
  materializedPlans: number;
  awaitingEventPlans: number;
  finalizedPlans: number;
  status: SimulationStatus;
};

type Props = ResearchWorkflowProgress & {
  researchId: number;
  compact?: boolean;
};

const percent = (completed: number, total: number) =>
  total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

export function SimulationResearchWorkflowProgress({
  researchId,
  totalPlans,
  evaluatedPlans,
  materializedPlans,
  awaitingEventPlans,
  finalizedPlans,
  status,
  compact = false,
}: Props) {
  const evaluatorPercent = percent(evaluatedPlans, totalPlans);
  const materializerPercent = percent(materializedPlans, totalPlans);
  const finalizerPercent = percent(finalizedPlans, totalPlans);
  const materializerBacklog = Math.max(0, evaluatedPlans - materializedPlans);
  const phase =
    status === SimulationStatus.Completed
      ? "Completed"
      : awaitingEventPlans > 0
        ? "Waiting for future events"
        : materializerBacklog > 0
          ? "Materializing plans and bots"
          : evaluatedPlans < totalPlans
            ? "Evaluating leaders"
            : "Ready to finalize";

  const stages = [
    {
      label: "Evaluator",
      value: evaluatedPlans,
      percent: evaluatorPercent,
      color: "primary" as const,
      detail: `${evaluatedPlans} / ${totalPlans} plans evaluated`,
    },
    {
      label: "Materializer",
      value: materializedPlans,
      percent: materializerPercent,
      color: "warning" as const,
      detail: `${materializedPlans} / ${totalPlans} plans materialized`,
    },
    {
      label: "Finalizer",
      value: finalizedPlans,
      percent: finalizerPercent,
      color: "secondary" as const,
      detail: `${finalizedPlans} / ${totalPlans} plans finalized`,
    },
  ];

  return (
    <section aria-label={`Simulation research ${researchId} workflow progress`}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold">Workflow progress</p>
        <Chip
          size="sm"
          color={awaitingEventPlans > 0 ? "warning" : "default"}
          variant="flat"
        >
          {phase}
        </Chip>
      </div>
      <div className={compact ? "" : "border-default-100 bg-content2/40 rounded-lg border p-3"}>
        <div
          className="bg-default-200 relative h-4 overflow-hidden rounded-full"
          role="progressbar"
          aria-label={`${finalizedPlans} of ${totalPlans} plans finalized; ${materializedPlans} materialized; ${evaluatedPlans} evaluated`}
          aria-valuemin={0}
          aria-valuemax={totalPlans}
          aria-valuenow={finalizedPlans}
        >
          <div
            className="bg-primary/75 absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${evaluatorPercent}%` }}
          />
          <div
            className="bg-warning absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${materializerPercent}%` }}
          />
          <div
            className="bg-secondary absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${finalizerPercent}%` }}
          />
        </div>

        <div className={`mt-3 grid gap-x-4 gap-y-2 ${compact ? "sm:grid-cols-3" : "md:grid-cols-3"}`}>
          {stages.map((stage) => (
            <div key={stage.label} className="flex items-center justify-between gap-2 text-xs">
              <span className="text-default-500 flex items-center gap-1.5 font-medium uppercase">
                <span
                  className={`h-2 w-2 rounded-full ${
                    stage.color === "primary"
                      ? "bg-primary"
                      : stage.color === "warning"
                        ? "bg-warning"
                        : "bg-secondary"
                  }`}
                />
                {stage.label}
              </span>
              <span className="font-semibold tabular-nums">
                {stage.value.toLocaleString()} / {totalPlans.toLocaleString()} <span className="text-default-500 font-normal">({stage.percent}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      {!compact && (
        <p className="text-default-500 mt-3 text-xs">
          {awaitingEventPlans > 0
            ? `${awaitingEventPlans} materialized plans are waiting for future event data.`
            : materializerBacklog > 0
              ? `${materializerBacklog} evaluated plans are waiting to be materialized.`
              : "Finalizer progress is the terminal completion measure."}
        </p>
      )}
    </section>
  );
}
