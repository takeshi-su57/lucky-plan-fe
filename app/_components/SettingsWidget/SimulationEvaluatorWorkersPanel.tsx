"use client";

import { useState } from "react";
import { Button, Card, CardBody, Chip, Spinner } from "@heroui/react";

import {
  useSimulationEvaluatorPipeline,
  useSimulationEvaluatorWorkers,
} from "@/app/_hooks/useSimulationEvaluatorWorkers";
import { RightDrawer } from "@/components/modals/RightDrawer";
import { WorkerDetails } from "./WorkerDetails";
import { WorkerRuntimeStatusIndicator } from "./WorkerRuntimeStatusIndicator";

const age = (value?: string | null) => {
  if (!value) return "Never";
  const date = new Date(/^\d+$/.test(value) ? Number(value) : value);
  const seconds = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return date.toLocaleDateString();
};

const statusColor = (status: string) =>
  status === "Approved"
    ? "success"
    : status === "Rejected"
      ? "danger"
      : "warning";

export function SimulationEvaluatorWorkersPanel() {
  const { data, loading } = useSimulationEvaluatorWorkers();
  const { data: pipelineData } = useSimulationEvaluatorPipeline();
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  const workers = data?.simulationEvaluatorWorkers ?? [];
  const pipeline = pipelineData?.simulationEvaluatorPipeline;
  const approvedWorkers = workers.filter(
    (worker) => worker.authorizationStatus === "Approved",
  ).length;
  const pendingWorkers = workers.filter(
    (worker) => worker.authorizationStatus === "Pending",
  ).length;
  const offlineWorkers = workers.filter(
    (worker) => worker.runtimeStatus === "Offline",
  ).length;
  const activeCapacity = workers.reduce(
    (total, worker) => total + worker.activeCapacity,
    0,
  );
  const desiredCapacity = workers.reduce(
    (total, worker) => total + worker.desiredCapacity,
    0,
  );
  const capacityUtilization = desiredCapacity
    ? Math.round((activeCapacity / desiredCapacity) * 100)
    : 0;
  const evaluationWaiting = pipeline
    ? pipeline.queuedEvaluationTasks + pipeline.readyEvaluationTasks
    : 0;
  const finalizerBacklog = pipeline
    ? pipeline.awaitingFinalizationPlans + pipeline.finalizingPlans
    : 0;
  const evaluatorHealthy =
    pipeline !== undefined &&
    evaluationWaiting >= pipeline.queueLowWatermark &&
    evaluationWaiting <= pipeline.queueHighWatermark;
  const materializerSaturated = Boolean(pipeline?.backpressureActive);
  const hasFailedPlans = Boolean(pipeline?.failedExecutionPlans);
  const hasEventWait = Boolean(pipeline?.awaitingEventLogPlans);
  const finalizerReady = pipeline?.readyToFinalizeSimulations ?? 0;
  const activeFinalizations = pipeline?.finalizingSimulations ?? 0;
  const sourceDerivedWaiting = pipeline?.sourceDerivedWaitingToMaterialize ?? 0;
  const sourceDerivedReady = pipeline?.sourceDerivedReadyToRecalculate ?? 0;
  const sourceDerivedActive = pipeline?.sourceDerivedRecalculating ?? 0;
  const sourceDerivedFailed = pipeline?.sourceDerivedFailed ?? 0;
  const constraint = hasFailedPlans
    ? {
        title: "Recovery required",
        detail: `${pipeline?.failedExecutionPlans ?? 0} execution plans failed and need recovery before their simulations can finish.`,
        tone: "danger" as const,
      }
    : materializerSaturated
      ? {
          title: "Materializer backlog is applying backpressure",
          detail: `${finalizerBacklog} plans are waiting for or using materializer capacity. New evaluator work is being held back.`,
          tone: "danger" as const,
        }
      : finalizerReady > 0 && activeFinalizations === 0
        ? {
            title: "Finalizer-ready simulations are waiting",
            detail: `${finalizerReady} fully materialized simulations can be finalized on the next cron claim.`,
            tone: "warning" as const,
          }
        : hasEventWait
          ? {
              title: "Future-event data is the largest waiting state",
              detail: `${pipeline?.awaitingEventLogPlans ?? 0} plans are waiting for position-close data. This is external waiting, not materializer saturation.`,
              tone: "warning" as const,
            }
          : {
              title: "Simulation workflow is progressing",
              detail: "No failed plans, downstream backpressure, or event-data wait is currently reported.",
              tone: "success" as const,
            };

  if (loading && !data) return <Spinner />;

  return (
    <Card>
      <CardBody className="gap-5 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h6 className="text-lg font-semibold">
              Simulation workflow
            </h6>
            <p className="text-default-500 text-sm">
              Follow each cron-owned layer to see the current queue and the real blocker.
            </p>
          </div>
          <Chip size="sm" variant="flat">
            {workers.length} evaluator workers
          </Chip>
        </div>

        <div
          className={`rounded-xl border px-4 py-3 ${
            constraint.tone === "danger"
              ? "border-danger-200 bg-danger-50"
              : constraint.tone === "warning"
                ? "border-warning-200 bg-warning-50"
                : "border-success-200 bg-success-50"
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold">Current constraint: {constraint.title}</p>
              <p className="text-default-600 mt-1 text-sm">{constraint.detail}</p>
            </div>
            <Chip color={constraint.tone} size="sm" variant="flat">
              {constraint.tone === "success" ? "No active blocker" : "Needs attention"}
            </Chip>
          </div>
        </div>

        <section>
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="font-semibold">Cron workflow</h2>
              <p className="text-default-500 text-sm">
                Queue units stay explicit: evaluator tasks, materializer plans, then finalizer simulations.
              </p>
            </div>
            <Chip size="sm" variant="flat">Each cron is scheduled every 5 seconds</Chip>
          </div>
          <div className="grid gap-3 xl:grid-cols-3">
            <WorkflowLane
              number="1"
              title="Evaluator"
              cron="registerLeaderEvaluationTasks"
              tone="primary"
              status={evaluatorHealthy ? "Healthy" : "Needs refill"}
              statusTone={evaluatorHealthy ? "success" : "warning"}
              metrics={[
                { label: "Reservoir", value: evaluationWaiting, unit: "tasks" },
                { label: "Claimed", value: `${pipeline?.claimedEvaluationTasks ?? 0} / ${pipeline?.workerClaimLimit ?? 0}`, unit: "tasks" },
              ]}
              capacity={{
                label: "Evaluator queue capacity",
                current: evaluationWaiting,
                maximum: pipeline?.queueHighWatermark ?? 0,
                target: pipeline?.queueLowWatermark ?? 0,
                unit: "tasks",
              }}
              detail={pipeline ? `Reservoir target ${pipeline.queueLowWatermark}–${pipeline.queueHighWatermark} tasks · ${pipeline.queuedEvaluationTasks} queued, ${pipeline.readyEvaluationTasks} ready` : "Loading evaluator queue"}
            />
            <WorkflowLane
              number="2"
              title="Materializer"
              cron="handleResolvedEvaluationTasks"
              tone="warning"
              status={materializerSaturated ? "Backpressure active" : "Healthy"}
              statusTone={materializerSaturated ? "danger" : "success"}
              metrics={[
                { label: "Waiting", value: pipeline?.awaitingFinalizationPlans ?? 0, unit: "plans" },
                { label: "Active", value: `${pipeline?.finalizingPlans ?? 0} / ${pipeline?.finalizerConcurrency ?? 0}`, unit: "plans" },
              ]}
              capacity={{
                label: "Materializer queue capacity",
                current: finalizerBacklog,
                maximum: pipeline?.maxAwaitingFinalizationPlans ?? 0,
                unit: "plans",
              }}
              detail="Completed evaluator results are materialized into plans and bots."
            />
            <WorkflowLane
              number="3"
              title="Finalizer"
              cron="finalizeMaterializedSimulations"
              tone="secondary"
              status={hasEventWait ? "Waiting on event data" : "Ready"}
              statusTone={hasEventWait ? "warning" : "success"}
              metrics={[
                { label: "Ready", value: finalizerReady, unit: "simulations" },
                { label: "Active", value: activeFinalizations, unit: "simulations" },
              ]}
              capacity={{
                label: "Finalizer concurrency",
                current: activeFinalizations,
                maximum: pipeline?.finalizerConcurrency ?? 0,
                unit: "simulations",
              }}
              detail={`${pipeline?.awaitingEventLogPlans ?? 0} plans are awaiting event data; they are not finalizer-ready queue depth.`}
            />
          </div>
        </section>

        <section className="border-primary-200 bg-primary-50/40 rounded-xl border p-4">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="font-semibold">Source-derived fast lane</h2>
              <p className="text-default-500 text-sm">
                Reuses completed Layer 1 snapshots; only Layer 2 variants and Layer 3 follower calculations run.
              </p>
            </div>
            <Chip color={sourceDerivedFailed ? "danger" : "primary"} size="sm" variant="flat">
              {sourceDerivedWaiting + sourceDerivedReady + sourceDerivedActive} active or waiting
            </Chip>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <FleetMetric label="Waiting for Layer 2" value={sourceDerivedWaiting} />
            <FleetMetric label="Ready for Layer 3" value={sourceDerivedReady} />
            <FleetMetric label="Recalculating" value={sourceDerivedActive} tone={sourceDerivedActive ? "warning" : undefined} />
            <FleetMetric label="Failed" value={sourceDerivedFailed} tone={sourceDerivedFailed ? "danger" : undefined} />
          </div>
        </section>

        <Card className="border-default-200 border shadow-none">
          <CardBody className="gap-3 p-4">
            <div>
              <h2 className="font-semibold">Workflow diagnostics</h2>
              <p className="text-default-500 text-sm">The exact state that can slow or stop each layer.</p>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[720px] divide-default-100 divide-y text-sm">
                <DiagnosticRow state="Evaluator reservoir" count={`${evaluationWaiting} tasks`} meaning="Work available for evaluator workers" action={pipeline ? `Keep between ${pipeline.queueLowWatermark} and ${pipeline.queueHighWatermark} tasks` : "Loading target"} tone={evaluatorHealthy ? "success" : "warning"} />
                <DiagnosticRow state="Materializer backlog" count={`${finalizerBacklog} plans`} meaning="Completed evaluations awaiting or using materializer capacity" action={materializerSaturated ? "Increase capacity or wait for backlog to drain" : "No action needed"} tone={materializerSaturated ? "danger" : "success"} />
                <DiagnosticRow state="Future-event wait" count={`${pipeline?.awaitingEventLogPlans ?? 0} plans`} meaning="Waiting for position-close data before finalization" action={hasEventWait ? "Monitor event ingestion; this does not consume materializer capacity" : "No event-data wait"} tone={hasEventWait ? "warning" : "success"} />
                <DiagnosticRow state="Failed execution plans" count={`${pipeline?.failedExecutionPlans ?? 0} plans`} meaning="Plans requiring recovery" action={hasFailedPlans ? "Inspect failures and retry or recover" : "No recovery required"} tone={hasFailedPlans ? "danger" : "success"} />
              </div>
            </div>
          </CardBody>
        </Card>

        {workers.length === 0 ? (
          <div className="border-default-300 text-default-500 rounded-xl border border-dashed px-5 py-10 text-center">
            No worker enrollment requests yet.
          </div>
        ) : (
          <>
            <div className="border-default-200 divide-default-200 grid overflow-hidden rounded-xl border sm:grid-cols-5 sm:divide-x">
              <FleetMetric label="Workers" value={workers.length} />
              <FleetMetric label="Approved" value={approvedWorkers} />
              <FleetMetric
                label="Pending review"
                value={pendingWorkers}
                tone={pendingWorkers ? "warning" : undefined}
              />
              <FleetMetric
                label="Offline"
                value={offlineWorkers}
                tone={offlineWorkers ? "danger" : undefined}
              />
              <div className="px-4 py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-default-500 text-xs">Fleet capacity</p>
                  <p className="text-sm font-semibold">
                    {capacityUtilization}%
                  </p>
                </div>
                <div className="bg-default-200 mt-2 h-1.5 overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${Math.min(100, capacityUtilization)}%` }}
                  />
                </div>
                <p className="text-default-500 mt-1 text-xs">
                  {activeCapacity} / {desiredCapacity} slots
                </p>
              </div>
            </div>

            <div className="border-default-200 overflow-x-auto rounded-xl border">
              <div className="min-w-[840px]">
                <div className="border-default-100 text-default-400 grid grid-cols-[minmax(260px,1.3fr)_minmax(190px,.8fr)_minmax(190px,.8fr)_auto] items-center gap-6 border-b px-5 py-3 text-xs font-medium tracking-wide uppercase">
                  <span>Worker</span>
                  <span>Capacity</span>
                  <span>Activity</span>
                  <span className="text-right"> </span>
                </div>
                <div className="divide-default-100 divide-y">
                  {workers.map((worker) => {
                    const claimedEvaluations = worker.claimedEvaluationTasks;
                    const runningEvaluations = Math.min(
                      claimedEvaluations,
                      worker.lastDiagnostic?.runningTaskCount ??
                        worker.activeCapacity,
                    );
                    const bufferedEvaluations = Math.max(
                      0,
                      claimedEvaluations - runningEvaluations,
                    );
                    const failedCaches = worker.platformCaches.filter(
                      (cache) => cache.status === "Failed",
                    ).length;
                    const workerCapacity = worker.desiredCapacity
                      ? Math.min(
                          100,
                          Math.round(
                            (worker.activeCapacity / worker.desiredCapacity) *
                              100,
                          ),
                        )
                      : 0;

                    return (
                      <div
                        key={worker.id}
                        className="hover:bg-default-50 grid grid-cols-[minmax(260px,1.3fr)_minmax(190px,.8fr)_minmax(190px,.8fr)_auto] items-center gap-6 px-5 py-4 transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <WorkerRuntimeStatusIndicator
                              runtimeStatus={worker.runtimeStatus}
                            />
                            <p className="truncate font-semibold">
                              {worker.displayName}
                            </p>
                            <Chip
                              size="sm"
                              color={statusColor(worker.authorizationStatus)}
                              variant="flat"
                            >
                              {worker.authorizationStatus}
                            </Chip>
                          </div>
                          <div className="text-default-500 mt-1 flex items-center gap-2 text-xs">
                            <span
                              className="truncate font-mono"
                              title={worker.id}
                            >
                              {worker.id}
                            </span>
                            <span>·</span>
                            <span>{worker.runtimeStatus}</span>
                            <span>·</span>
                            <span>{worker.version || "version unavailable"}</span>
                            <span>·</span>
                            <span>{age(worker.lastHeartbeatAt)}</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-sm font-medium">
                              {worker.activeCapacity} / {worker.desiredCapacity}
                            </span>
                            <span className="text-default-500 text-xs">
                              slots
                            </span>
                          </div>
                          <div className="bg-default-200 mt-2 h-1.5 overflow-hidden rounded-full">
                            <div
                              className="bg-primary h-full rounded-full"
                              style={{ width: `${workerCapacity}%` }}
                            />
                          </div>
                        </div>

                        <div className="text-sm">
                          <span className="text-primary font-medium">
                            {runningEvaluations} running
                          </span>
                          <span className="text-default-400 px-1.5">·</span>
                          <span className="font-medium">
                            {claimedEvaluations} / {worker.evaluationClaimLimit}{" "}
                            claimed
                          </span>
                          {bufferedEvaluations > 0 && (
                            <>
                              <span className="text-default-400 px-1.5">·</span>
                              <span className="text-warning font-medium">
                                {bufferedEvaluations} prefetched
                              </span>
                            </>
                          )}
                          {failedCaches > 0 && (
                            <>
                              <span className="text-default-400 px-1.5">·</span>
                              <span className="text-danger font-medium">
                                {failedCaches} failed
                              </span>
                            </>
                          )}
                        </div>

                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          onPress={() => setSelectedWorkerId(worker.id)}
                        >
                          Open details
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        <RightDrawer
          isOpen={selectedWorkerId !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedWorkerId(null);
          }}
          classNames={{ base: "max-w-[min(94vw,1280px)]" }}
        >
          {selectedWorkerId && (
            <WorkerDetails workerId={selectedWorkerId} embedded />
          )}
        </RightDrawer>
      </CardBody>
    </Card>
  );
}

function WorkflowLane({
  number,
  title,
  cron,
  tone,
  status,
  statusTone,
  metrics,
  capacity,
  detail,
}: {
  number: string;
  title: string;
  cron: string;
  tone: "primary" | "secondary" | "warning";
  status: string;
  statusTone: "success" | "warning" | "danger";
  metrics: Array<{ label: string; value: string | number; unit: string }>;
  capacity: {
    label: string;
    current: number;
    maximum: number;
    target?: number;
    unit: string;
  };
  detail: string;
}) {
  const laneToneClass = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    warning: "bg-warning text-warning-foreground",
  }[tone];
  return (
    <Card className="border-default-200 border shadow-none">
      <CardBody className="gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className={`${laneToneClass} flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold`}>
              {number}
            </span>
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-default-500 font-mono text-xs">{cron}</p>
            </div>
          </div>
          <Chip color={statusTone} size="sm" variant="flat">{status}</Chip>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-default-50 rounded-lg p-3">
              <p className="text-default-500 text-xs">{metric.label}</p>
              <p className="mt-1 text-xl font-semibold">{metric.value}</p>
              <p className="text-default-500 text-xs">{metric.unit}</p>
            </div>
          ))}
        </div>
        <CapacityGauge {...capacity} tone={tone} />
        <p className="text-default-500 border-default-100 border-t pt-3 text-xs">
          {detail}
        </p>
      </CardBody>
    </Card>
  );
}

function CapacityGauge({
  label,
  current,
  maximum,
  target,
  unit,
  tone,
}: {
  label: string;
  current: number;
  maximum: number;
  target?: number;
  unit: string;
  tone: "primary" | "secondary" | "warning";
}) {
  const safeMaximum = Math.max(maximum, 0);
  const percent = safeMaximum ? Math.min(100, (current / safeMaximum) * 100) : 0;
  const targetPercent =
    safeMaximum && target ? Math.min(100, (target / safeMaximum) * 100) : null;
  const fillClass = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    warning: "bg-warning",
  }[tone];

  return (
    <div className="border-default-100 bg-default-50 rounded-lg border p-3">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-default-500 text-xs">{label}</p>
        <p className="text-sm font-semibold tabular-nums">
          {current} <span className="text-default-500 font-normal">/ {safeMaximum} {unit}</span>
        </p>
      </div>
      <div className="bg-default-200 relative mt-2 h-2 overflow-visible rounded-full">
        <div
          className={`${fillClass} h-full rounded-full transition-[width] duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        />
        {targetPercent !== null && (
          <span
            aria-label={`Target refill threshold: ${target} ${unit}`}
            className="bg-default-700 absolute -top-1 h-4 w-px"
            style={{ left: `${targetPercent}%` }}
          />
        )}
      </div>
      <p className="text-default-500 mt-2 text-xs">
        {target ? `Refill threshold ${target} ${unit} · ` : ""}
        {percent.toFixed(0)}% filled
      </p>
    </div>
  );
}

function DiagnosticRow({
  state,
  count,
  meaning,
  action,
  tone,
}: {
  state: string;
  count: string;
  meaning: string;
  action: string;
  tone: "success" | "warning" | "danger";
}) {
  const dot =
    tone === "danger"
      ? "bg-danger"
      : tone === "warning"
        ? "bg-warning"
        : "bg-success";
  return (
    <div className="grid grid-cols-[minmax(170px,.9fr)_minmax(110px,.55fr)_minmax(220px,1.3fr)_minmax(250px,1.4fr)] gap-4 px-1 py-3">
      <div className="flex items-center gap-2 font-medium">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        {state}
      </div>
      <span className="font-semibold">{count}</span>
      <span className="text-default-500">{meaning}</span>
      <span className="text-default-500">{action}</span>
    </div>
  );
}

function FleetMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "warning" | "danger";
}) {
  return (
    <div className="px-4 py-3">
      <p className="text-default-500 text-xs">{label}</p>
      <p
        className={`mt-1 text-sm font-semibold ${
          tone === "warning"
            ? "text-warning"
            : tone === "danger"
              ? "text-danger"
              : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
