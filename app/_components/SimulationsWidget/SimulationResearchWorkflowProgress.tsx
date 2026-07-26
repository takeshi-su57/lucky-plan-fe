"use client";

import { Chip } from "@heroui/react";

import { SimulationStatus } from "@/graphql/gql/graphql";
import { SimulationProgressBar } from "./SimulationProgressBar";

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
      <div className={compact ? "space-y-2" : "grid gap-3 md:grid-cols-3"}>
        {stages.map((stage) => (
          <div
            key={stage.label}
            className={
              compact
                ? "grid grid-cols-[92px_1fr_auto] items-center gap-3"
                : "border-default-100 bg-content2/40 rounded-lg border p-3"
            }
          >
            <div className={compact ? "" : "mb-3 flex items-baseline justify-between gap-2"}>
              <p className="text-default-600 text-xs font-semibold uppercase">
                {stage.label}
              </p>
              {!compact && <p className="text-sm font-semibold">{stage.percent}%</p>}
            </div>
            <SimulationProgressBar
              value={stage.percent}
              color={stage.color}
              ariaLabel={`${stage.label} progress for research ${researchId}`}
              status={status}
            />
            {compact ? (
              <span className="text-default-500 text-xs">{stage.percent}%</span>
            ) : (
              <p className="text-default-500 mt-2 text-xs">{stage.detail}</p>
            )}
          </div>
        ))}
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
