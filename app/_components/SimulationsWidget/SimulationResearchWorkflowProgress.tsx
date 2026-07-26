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
  const sharedMilestone =
    Math.abs(evaluatorPercent - materializerPercent) <= 1;
  const milestonePercent = Math.max(evaluatorPercent, materializerPercent);
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
      dotClass: "bg-primary",
    },
    {
      label: "Materializer",
      value: materializedPlans,
      percent: materializerPercent,
      color: "warning" as const,
      dotClass: "bg-warning",
    },
    {
      label: "Finalizer",
      value: finalizedPlans,
      percent: finalizerPercent,
      color: "secondary" as const,
      dotClass: "bg-secondary",
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
      <div
        className={
          compact
            ? ""
            : "border-default-100 bg-content2/40 relative rounded-xl border px-4 pb-4 pt-14"
        }
      >
        {!compact && (
          <div className="absolute left-4 top-4">
            <div className="text-secondary flex items-baseline gap-2 text-sm font-semibold">
              <span>Finalized</span>
              <span className="text-foreground tabular-nums">
                {finalizedPlans.toLocaleString()} / {totalPlans.toLocaleString()}
              </span>
            </div>
          </div>
        )}
        {!compact && (
          <div
            className="absolute top-3 z-10"
            style={{
              left: `${milestonePercent}%`,
              transform:
                milestonePercent > 72 ? "translateX(-100%)" : "translateX(0)",
            }}
          >
            <div className="border-default-200 bg-content1 rounded-lg border px-3 py-2 text-right shadow-sm">
              <p className="text-default-700 text-xs font-semibold">
                {sharedMilestone ? "Evaluator + Materializer" : "Pipeline milestones"}
              </p>
              <p className="mt-0.5 text-sm font-semibold tabular-nums">
                {sharedMilestone
                  ? `${evaluatedPlans.toLocaleString()} / ${totalPlans.toLocaleString()} · ${evaluatorPercent}%`
                  : `E ${evaluatorPercent}% · M ${materializerPercent}%`}
              </p>
            </div>
          </div>
        )}
        <div
          className="bg-default-200 relative h-4 rounded-full"
          role="progressbar"
          aria-label={`${finalizedPlans} of ${totalPlans} plans finalized; ${materializedPlans} materialized; ${evaluatedPlans} evaluated`}
          aria-valuemin={0}
          aria-valuemax={totalPlans}
          aria-valuenow={finalizedPlans}
        >
          <div
            className="bg-secondary absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${finalizerPercent}%` }}
          />
          {sharedMilestone ? (
            <div
              aria-label={`Evaluator and materializer milestone at ${evaluatorPercent}%`}
              className="absolute top-0 z-10 flex h-full -translate-x-1/2 gap-px"
              style={{ left: `${milestonePercent}%` }}
            >
              <span className="bg-primary h-full w-1 rounded-l-full" />
              <span className="bg-warning h-full w-1 rounded-r-full" />
            </div>
          ) : (
            <>
              <span
                aria-label={`Evaluator milestone at ${evaluatorPercent}%`}
                className="bg-primary absolute top-0 z-10 h-full w-1 -translate-x-1/2 rounded-full"
                style={{ left: `${evaluatorPercent}%` }}
              />
              <span
                aria-label={`Materializer milestone at ${materializerPercent}%`}
                className="bg-warning absolute top-0 z-10 h-full w-1 -translate-x-1/2 rounded-full"
                style={{ left: `${materializerPercent}%` }}
              />
            </>
          )}
        </div>

        <div className={`mt-3 grid gap-x-4 gap-y-2 ${compact ? "sm:grid-cols-3" : "md:grid-cols-3"}`}>
          {stages.map((stage) => (
            <div key={stage.label} className="flex items-center justify-between gap-2 text-xs">
              <span className="text-default-500 flex items-center gap-1.5 font-medium uppercase">
                <span className={`h-2 w-2 rounded-full ${stage.dotClass}`} />
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
