"use client";

import { useState } from "react";
import { Button, Card, CardBody, Chip, Progress, Spinner } from "@heroui/react";

import {
  useSimulationEvaluatorPipeline,
  useSimulationEvaluatorWorkerTasks,
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

const taskColor = (status: string) =>
  status === "Completed"
    ? "success"
    : status === "Failed"
      ? "danger"
      : status === "Claimed"
        ? "primary"
        : status === "Ready" || status === "Queued"
          ? "warning"
          : "default";

const taskStages = ["Queued", "Ready", "Claimed", "Completed", "Failed"];

export function SimulationEvaluatorWorkersPanel() {
  const { data, loading } = useSimulationEvaluatorWorkers();
  const { data: taskData } = useSimulationEvaluatorWorkerTasks();
  const { data: pipelineData } = useSimulationEvaluatorPipeline();
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  const workers = data?.simulationEvaluatorWorkers ?? [];
  const tasks = taskData?.simulationEvaluatorWorkerTasks ?? [];
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
  const taskCounts = Object.fromEntries(
    taskStages.map((status) => [
      status,
      tasks.filter((task) => task.status === status).length,
    ]),
  ) as Record<string, number>;
  const waitingTasks = (taskCounts.Queued ?? 0) + (taskCounts.Ready ?? 0);
  const evaluationWaiting = pipeline
    ? pipeline.queuedEvaluationTasks + pipeline.readyEvaluationTasks
    : waitingTasks;
  const finalizerBacklog = pipeline
    ? pipeline.awaitingFinalizationPlans +
      pipeline.finalizingPlans +
      pipeline.awaitingEventLogPlans
    : 0;
  const queueFillPercent = pipeline?.queueHighWatermark
    ? Math.min(100, (evaluationWaiting / pipeline.queueHighWatermark) * 100)
    : 0;
  const finalizerBacklogPercent = pipeline?.maxAwaitingFinalizationPlans
    ? Math.min(
        100,
        (finalizerBacklog / pipeline.maxAwaitingFinalizationPlans) * 100,
      )
    : 0;
  const outstandingPercent = pipeline?.maxOutstandingDynamicPlans
    ? Math.min(
        100,
        (pipeline.outstandingExecutionPlans /
          pipeline.maxOutstandingDynamicPlans) *
          100,
      )
    : 0;

  if (loading && !data) return <Spinner />;

  return (
    <Card>
      <CardBody className="gap-5 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h6 className="text-lg font-semibold">
              Evaluator fleet & dispatch queue
            </h6>
            <p className="text-default-500 text-sm">
              A live view of queued work, worker capacity, and task assignment.
            </p>
          </div>
          <Chip size="sm" variant="flat">
            {workers.length} enrolled
          </Chip>
        </div>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <QueueMetric
            label="Evaluation reservoir"
            value={evaluationWaiting}
            hint={
              pipeline
                ? `Target ${pipeline.queueLowWatermark}–${pipeline.queueHighWatermark}`
                : "Loading exact pipeline totals"
            }
            tone={
              !pipeline
                ? undefined
                : evaluationWaiting < pipeline.queueLowWatermark
                  ? "warning"
                  : "success"
            }
          />
          <QueueMetric
            label="Claimed evaluations"
            value={pipeline?.claimedEvaluationTasks ?? taskCounts.Claimed ?? 0}
            hint={
              pipeline
                ? `${pipeline.workerClaimLimit} fleet claim limit`
                : "Active worker leases"
            }
            tone="primary"
          />
          <QueueMetric
            label="Awaiting finalization"
            value={pipeline?.awaitingFinalizationPlans ?? 0}
            hint="Evaluations completed"
            tone={pipeline?.awaitingFinalizationPlans ? "warning" : undefined}
          />
          <QueueMetric
            label="Active finalizers"
            value={pipeline?.finalizingPlans ?? 0}
            hint={
              pipeline
                ? `${pipeline.finalizerConcurrency} concurrency limit`
                : "Loading finalizer state"
            }
            tone="primary"
          />
          <QueueMetric
            label="Awaiting future events"
            value={pipeline?.awaitingEventLogPlans ?? 0}
            hint="Waiting for position closes"
            tone={pipeline?.awaitingEventLogPlans ? "warning" : "success"}
          />
          <QueueMetric
            label="Failed plans"
            value={pipeline?.failedExecutionPlans ?? 0}
            hint="Execution plans requiring recovery"
            tone={pipeline?.failedExecutionPlans ? "danger" : "success"}
          />
        </section>

        <Card className="border-default-200 border shadow-none">
          <CardBody className="gap-4 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-semibold">Pipeline pressure</h2>
                <p className="text-default-500 text-sm">
                  Exact global counts for evaluation, finalization, and
                  future-event processing.
                </p>
              </div>
              <Chip
                size="sm"
                color={
                  !pipeline
                    ? "default"
                    : pipeline.backpressureActive
                      ? "danger"
                      : "success"
                }
                variant="flat"
              >
                {!pipeline
                  ? "Loading pipeline state"
                  : pipeline.backpressureActive
                    ? "Downstream backpressure active"
                    : "Pipeline accepting work"}
              </Chip>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              <PressureBar
                label="Evaluation reservoir"
                value={evaluationWaiting}
                maximum={pipeline?.queueHighWatermark ?? 0}
                percent={queueFillPercent}
                detail={
                  pipeline
                    ? `${pipeline.queuedEvaluationTasks} queued · ${pipeline.readyEvaluationTasks} ready · low watermark ${pipeline.queueLowWatermark}`
                    : "Loading"
                }
                tone={
                  pipeline && evaluationWaiting < pipeline.queueLowWatermark
                    ? "warning"
                    : "primary"
                }
              />
              <PressureBar
                label="Finalizer backlog"
                value={finalizerBacklog}
                maximum={pipeline?.maxAwaitingFinalizationPlans ?? 0}
                percent={finalizerBacklogPercent}
                detail={
                  pipeline
                    ? `${pipeline.awaitingFinalizationPlans} ready · ${pipeline.finalizingPlans} active · ${pipeline.awaitingEventLogPlans} awaiting events`
                    : "Loading"
                }
                tone={pipeline?.backpressureActive ? "danger" : "warning"}
              />
              <PressureBar
                label="Outstanding plan safety limit"
                value={pipeline?.outstandingExecutionPlans ?? 0}
                maximum={pipeline?.maxOutstandingDynamicPlans ?? 0}
                percent={outstandingPercent}
                detail="Pending, dispatched, awaiting events, and finalizing"
                tone={outstandingPercent >= 90 ? "danger" : "primary"}
              />
            </div>
          </CardBody>
        </Card>

        <Card className="border-default-200 border shadow-none">
          <CardBody className="gap-4 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-semibold">Task flow</h2>
                <p className="text-default-500 text-sm">
                  Recent history only: the most recent {tasks.length} tasks of
                  every evaluator kind. A task moves from queued to ready when
                  dispatch can route it, then is claimed on a worker poll.
                </p>
              </div>
              <Chip size="sm" color="default" variant="flat">
                Recent task window
              </Chip>
            </div>
            <div className="grid gap-2 sm:grid-cols-5">
              {taskStages.map((status) => {
                const count = taskCounts[status] ?? 0;
                const percentage = tasks.length
                  ? Math.round((count / tasks.length) * 100)
                  : 0;
                return (
                  <div
                    key={status}
                    className="border-default-200 rounded-lg border p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Chip size="sm" color={taskColor(status)} variant="flat">
                        {status}
                      </Chip>
                      <span className="text-lg font-semibold">{count}</span>
                    </div>
                    <Progress
                      aria-label={`${status} tasks`}
                      className="mt-3"
                      color={taskColor(status)}
                      size="sm"
                      value={percentage}
                    />
                    <p className="text-default-500 mt-2 text-xs">
                      {percentage}% of recent work
                    </p>
                  </div>
                );
              })}
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

function QueueMetric({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: number;
  hint: string;
  tone?: "primary" | "success" | "warning" | "danger";
}) {
  const textColor =
    tone === "danger"
      ? "text-danger"
      : tone === "warning"
        ? "text-warning"
        : tone === "success"
          ? "text-success"
          : tone === "primary"
            ? "text-primary"
            : "";
  return (
    <Card className="border-default-200 border shadow-none">
      <CardBody className="gap-1 p-4">
        <p className="text-default-500 text-xs">{label}</p>
        <p className={`text-2xl font-semibold ${textColor}`}>{value}</p>
        <p className="text-default-500 text-xs">{hint}</p>
      </CardBody>
    </Card>
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

function PressureBar({
  label,
  value,
  maximum,
  percent,
  detail,
  tone,
}: {
  label: string;
  value: number;
  maximum: number;
  percent: number;
  detail: string;
  tone: "primary" | "warning" | "danger";
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-default-500 text-xs">{label}</p>
        <p className="text-sm font-semibold">
          {value} / {maximum}
        </p>
      </div>
      <Progress
        aria-label={label}
        className="mt-2"
        color={tone}
        size="sm"
        value={percent}
      />
      <p className="text-default-500 mt-2 text-xs">{detail}</p>
    </div>
  );
}
