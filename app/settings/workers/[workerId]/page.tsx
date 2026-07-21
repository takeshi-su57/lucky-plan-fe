"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Progress,
  Spinner,
  Tab,
  Tabs,
  useDisclosure,
} from "@heroui/react";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import {
  useCancelUnassignedSimulationEvaluatorWorkerTask,
  useApproveSimulationEvaluatorWorker,
  usePauseSimulationEvaluatorWorker,
  useRejectSimulationEvaluatorWorker,
  useRemoveRejectedSimulationEvaluatorWorker,
  useRemoveOfflineSimulationEvaluatorWorker,
  useRemoveSimulationEvaluatorWorkerCache,
  useResumeSimulationEvaluatorWorker,
  useRetrySimulationEvaluatorWorkerCache,
  useSetSimulationEvaluatorWorkerCapacity,
  useSimulationEvaluatorWorkerTaskConnection,
  useSimulationEvaluatorWorkerTasks,
  useSimulationEvaluatorWorkers,
} from "@/app/_hooks/useSimulationEvaluatorWorkers";
import { PrebuildWorkerCacheModal } from "@/app/_components/SettingsWidget/PrebuildWorkerCacheModal";
import { SetWorkerCapacityModal } from "@/app/_components/SettingsWidget/SetWorkerCapacityModal";

const stamp = (value?: string | null) =>
  value
    ? new Date(/^\d+$/.test(value) ? Number(value) : value).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";
const age = (value?: string | null) =>
  value
    ? new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        Math.round((new Date(value).getTime() - Date.now()) / 60000),
        "minute",
      )
    : "Never";
const duration = (startedAt?: string | null, endedAt?: string | null) => {
  if (!startedAt || !endedAt) return null;
  const milliseconds =
    new Date(endedAt).getTime() - new Date(startedAt).getTime();
  if (!Number.isFinite(milliseconds) || milliseconds < 0) return null;
  if (milliseconds < 60_000)
    return `${Math.max(1, Math.round(milliseconds / 1000))}s`;
  if (milliseconds < 3_600_000)
    return `${Math.floor(milliseconds / 60_000)}m ${Math.round((milliseconds % 60_000) / 1000)}s`;
  return `${Math.floor(milliseconds / 3_600_000)}h ${Math.floor((milliseconds % 3_600_000) / 60_000)}m`;
};
const color = (value: string) =>
  value === "Completed" || value === "Ready"
    ? "success"
    : value === "Failed"
      ? "danger"
      : value === "Claimed" || value === "Building"
        ? "primary"
        : value === "Queued"
          ? "warning"
          : "default";

type EvaluationTiming = {
  totalMs?: number;
  setupMs?: number;
  cacheReadMs?: number;
  recentFilterMs?: number;
  historyConversionMs?: number;
  positionBuildMs?: number;
  scoringMs?: number;
  candidates?: number;
  acceptedCandidates?: number;
  eventLogRecords?: number;
};

const parseTiming = (value?: string | null): EvaluationTiming | null => {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as EvaluationTiming;
    return typeof parsed.totalMs === "number" ? parsed : null;
  } catch {
    return null;
  }
};

export default function WorkerDetailsPage() {
  const { workerId: rawId } = useParams<{ workerId: string }>();
  const workerId = decodeURIComponent(rawId);
  const [section, setSection] = useState("live");
  const prebuildModal = useDisclosure();
  const capacityModal = useDisclosure();
  const { data, loading } = useSimulationEvaluatorWorkers();
  const legacy = useSimulationEvaluatorWorkerTasks(workerId);
  const live = useSimulationEvaluatorWorkerTaskConnection(workerId, false);
  const archive = useSimulationEvaluatorWorkerTaskConnection(workerId, true);
  const legacyTasks = legacy.data?.simulationEvaluatorWorkerTasks ?? [];
  const legacyLive = legacyTasks.filter((task) =>
    ["Queued", "Ready", "Claimed"].includes(task.status),
  );
  const legacyArchive = legacyTasks.filter(
    (task) => !["Queued", "Ready", "Claimed"].includes(task.status),
  );
  const liveTasks = live.tasks.length ? live.tasks : legacyLive;
  const archiveTasks = archive.tasks.length ? archive.tasks : legacyArchive;
  const activeFeed =
    section === "live"
      ? {
          ...live,
          tasks: liveTasks,
          loading: live.loading && !legacyLive.length,
        }
      : {
          ...archive,
          tasks: archiveTasks,
          loading: archive.loading && !legacyArchive.length,
        };
  const [retryCache, { loading: retrying }] =
    useRetrySimulationEvaluatorWorkerCache();
  const [removeCache, { loading: removing }] =
    useRemoveSimulationEvaluatorWorkerCache();
  const [cancel, { loading: cancelling }] =
    useCancelUnassignedSimulationEvaluatorWorkerTask();
  const [approve, { loading: approving }] =
    useApproveSimulationEvaluatorWorker();
  const [reject, { loading: rejecting }] = useRejectSimulationEvaluatorWorker();
  const [removeWorker, { loading: removingWorker }] =
    useRemoveRejectedSimulationEvaluatorWorker();
  const [removeOfflineWorker, { loading: removingOfflineWorker }] =
    useRemoveOfflineSimulationEvaluatorWorker();
  const [pause, { loading: pausing }] = usePauseSimulationEvaluatorWorker();
  const [resume, { loading: resuming }] = useResumeSimulationEvaluatorWorker();
  const [setCapacity, { loading: settingCapacity }] =
    useSetSimulationEvaluatorWorkerCapacity();
  const worker = data?.simulationEvaluatorWorkers.find(
    (item) => item.id === workerId,
  );
  if (loading && !data)
    return (
      <div className="p-6">
        <Spinner />
      </div>
    );
  if (!worker)
    return (
      <main className="mx-auto max-w-6xl p-6">
        <Button as={Link} href="/settings" variant="light">
          Back to workers
        </Button>
        <p className="text-default-500 mt-5">This worker no longer exists.</p>
      </main>
    );

  return (
    <main className="mx-auto w-full max-w-6xl space-y-5 px-4 py-6 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Button
            as={Link}
            href="/settings"
            size="sm"
            variant="light"
            className="-ml-2"
          >
            Back to workers
          </Button>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${worker.runtimeStatus === "Offline" ? "bg-default-300" : "bg-success"}`}
            />
            <h1 className="text-2xl font-semibold tracking-tight">
              {worker.displayName}
            </h1>
          </div>
          <p className="text-default-500 mt-1 font-mono text-xs">{worker.id}</p>
        </div>
        <div className="flex gap-2">
          <Chip
            color={
              worker.authorizationStatus === "Approved" ? "success" : "warning"
            }
            variant="flat"
          >
            {worker.authorizationStatus}
          </Chip>
          <Chip variant="flat">{worker.runtimeStatus}</Chip>
        </div>
      </header>
      <Card>
        <CardBody className="flex flex-row flex-wrap items-center gap-2 py-3">
          <p className="mr-2 text-sm font-medium">Worker controls</p>
          {worker.authorizationStatus === "Pending" && (
            <>
              <Button
                size="sm"
                color="success"
                isLoading={approving}
                onPress={() => approve({ variables: { workerId } })}
              >
                Approve
              </Button>
              <ButtonWithConfirm
                size="sm"
                color="danger"
                variant="flat"
                isLoading={rejecting}
                onPress={() => reject({ variables: { workerId } })}
              >
                Reject
              </ButtonWithConfirm>
            </>
          )}
          {worker.authorizationStatus === "Approved" && (
            <>
              <Button
                size="sm"
                color="primary"
                isDisabled={
                  worker.runtimeStatus === "Busy" ||
                  worker.runtimeStatus === "Prebuilding"
                }
                onPress={prebuildModal.onOpen}
              >
                Prebuild cache
              </Button>
              <Button
                size="sm"
                variant="flat"
                isLoading={
                  worker.desiredState === "Running" ? pausing : resuming
                }
                onPress={() =>
                  worker.desiredState === "Running"
                    ? pause({ variables: { workerId } })
                    : resume({ variables: { workerId } })
                }
              >
                {worker.desiredState === "Running"
                  ? "Pause after tasks"
                  : "Resume"}
              </Button>
              <Button
                size="sm"
                variant="flat"
                isLoading={settingCapacity}
                onPress={capacityModal.onOpen}
              >
                Set capacity
              </Button>
            </>
          )}
          {worker.authorizationStatus === "Rejected" && (
            <ButtonWithConfirm
              size="sm"
              color="danger"
              variant="flat"
              isLoading={removingWorker}
              onPress={() => removeWorker({ variables: { workerId } })}
            >
              Remove worker
            </ButtonWithConfirm>
          )}
          {worker.runtimeStatus === "Offline" && (
            <ButtonWithConfirm
              size="sm"
              color="danger"
              variant="flat"
              isLoading={removingOfflineWorker}
              onPress={() => removeOfflineWorker({ variables: { workerId } })}
            >
              Delete worker and history
            </ButtonWithConfirm>
          )}
        </CardBody>
      </Card>
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric
          label="Capacity"
          value={`${worker.activeCapacity} / ${worker.desiredCapacity}`}
          hint="worker slots"
        />
        <Metric
          label="Heartbeat"
          value={age(worker.lastHeartbeatAt)}
          hint={stamp(worker.lastHeartbeatAt)}
        />
        <Metric
          label="Live queue"
          value={String(liveTasks.length)}
          hint="queued, ready, or claimed"
        />
        <Metric
          label="Archive"
          value={String(archiveTasks.length)}
          hint="completed, failed, cancelled"
        />
      </section>
      {worker.prebuildProgress && (
        <Card className="border-primary-200 bg-primary-50/40 border">
          <CardBody className="gap-2 py-4">
            <div className="flex justify-between gap-4">
              <div>
                <p className="font-medium">Cache prebuild in progress</p>
                <p className="text-default-500 text-sm">
                  {worker.prebuildProgress.message}
                </p>
              </div>
              <span className="text-primary font-semibold">
                {worker.prebuildProgress.percent.toFixed(1)}%
              </span>
            </div>
            <Progress
              value={worker.prebuildProgress.percent}
              aria-label="Prebuild progress"
              size="sm"
            />
          </CardBody>
        </Card>
      )}
      <Card>
        <CardBody className="gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Cache coverage</h2>
              <p className="text-default-500 text-sm">
                Current platform ranges and recovery actions.
              </p>
            </div>
            <Chip size="sm" variant="flat">
              {worker.platformCaches.length}
            </Chip>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {worker.platformCaches.map((cache) => (
              <div
                key={cache.id}
                className="border-default-200 rounded-lg border p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">
                      {cache.platform}
                    </span>
                    <Chip size="sm" color={color(cache.status)} variant="flat">
                      {cache.status === "Queued"
                        ? "Awaiting worker"
                        : cache.status}
                    </Chip>
                  </div>
                  <div className="flex gap-1">
                    {cache.status === "Failed" && (
                      <ButtonWithConfirm
                        size="sm"
                        color="warning"
                        variant="flat"
                        isLoading={retrying}
                        onPress={() =>
                          retryCache({ variables: { cacheId: cache.id } })
                        }
                      >
                        Retry
                      </ButtonWithConfirm>
                    )}
                    {cache.status !== "Building" &&
                      cache.status !== "Queued" && (
                        <ButtonWithConfirm
                          size="sm"
                          color="danger"
                          variant="light"
                          isLoading={removing}
                          onPress={() =>
                            removeCache({ variables: { cacheId: cache.id } })
                          }
                        >
                          Remove
                        </ButtonWithConfirm>
                      )}
                  </div>
                </div>
                <p className="text-default-500 mt-2 text-xs">
                  {stamp(cache.coveredStartAt)} — {stamp(cache.coveredEndAt)}
                </p>
                {cache.lastError && (
                  <p className="text-danger mt-2 line-clamp-2 text-xs">
                    {cache.lastError}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="gap-4 p-0">
          <div className="flex flex-wrap items-end justify-between gap-3 px-5 pt-5">
            <div>
              <h2 className="font-semibold">Tasks, dispatch & sync</h2>
              <p className="text-default-500 mt-1 text-sm">
                A live operational queue separated from completed history.
              </p>
            </div>
            <Tabs
              selectedKey={section}
              onSelectionChange={(key) => setSection(String(key))}
              variant="underlined"
              color="primary"
            >
              <Tab
                key="live"
                title={
                  <span>
                    Live{" "}
                    <span className="text-default-400 ml-1">
                      {liveTasks.length}
                    </span>
                  </span>
                }
              />
              <Tab
                key="archive"
                title={
                  <span>
                    Archive{" "}
                    <span className="text-default-400 ml-1">
                      {archiveTasks.length}
                    </span>
                  </span>
                }
              />
            </Tabs>
          </div>
          <div className="border-default-200 border-t">
            <TaskFeed
              tasks={activeFeed.tasks}
              loading={activeFeed.loading}
              hasMore={activeFeed.hasMore}
              onEndReached={activeFeed.loadMore}
              cancelling={cancelling}
              onCancel={(taskId) => cancel({ variables: { taskId } })}
            />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-semibold">Activity & worker diagnostics</h2>
              <p className="text-default-500 text-sm">
                Latest signed snapshot reported by the worker heartbeat.
              </p>
            </div>
            <Chip size="sm" variant="flat">
              {worker.lastDiagnosticAt
                ? `updated ${age(worker.lastDiagnosticAt)}`
                : "awaiting report"}
            </Chip>
          </div>
          {worker.lastDiagnostic ? (
            <>
              <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
                <Metric
                  label="Process"
                  value={`PID ${worker.lastDiagnostic.pid}`}
                  hint={`${worker.lastDiagnostic.uptimeSeconds}s uptime`}
                />
                <Metric
                  label="Child pool"
                  value={`${worker.lastDiagnostic.childCount} / ${worker.lastDiagnostic.childCapacity}`}
                  hint={`${worker.lastDiagnostic.idleChildCount} idle`}
                />
                <Metric
                  label="Running"
                  value={String(worker.lastDiagnostic.runningTaskCount)}
                  hint="active worker tasks"
                />
                <Metric
                  label="Last poll"
                  value={
                    worker.lastDiagnostic.lastPollAt
                      ? age(worker.lastDiagnostic.lastPollAt)
                      : "Never"
                  }
                  hint={worker.lastDiagnostic.lastPollError || "No poll error"}
                />
              </div>
              {worker.lastDiagnostic.recentLogs.length > 0 && (
                <div className="border-default-200 max-h-64 overflow-auto rounded-lg border">
                  <div className="divide-default-100 divide-y">
                    {worker.lastDiagnostic.recentLogs
                      .slice()
                      .reverse()
                      .map((log, index) => (
                        <div
                          key={`${log.at}-${index}`}
                          className="grid gap-1 px-3 py-2 text-xs sm:grid-cols-[10rem_4rem_minmax(0,1fr)]"
                        >
                          <span className="text-default-400">
                            {stamp(log.at)}
                          </span>
                          <span
                            className={
                              log.level === "error"
                                ? "text-danger"
                                : "text-default-500"
                            }
                          >
                            {log.level}
                          </span>
                          <span className="wrap-break-word">{log.message}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-default-500 bg-default-50 rounded-lg p-4 text-sm">
              No diagnostic snapshot has arrived yet. The worker reports one on
              its next heartbeat after the updated worker package is running.
            </p>
          )}
        </CardBody>
      </Card>
      <PrebuildWorkerCacheModal
        worker={worker}
        isOpen={prebuildModal.isOpen}
        onOpenChange={prebuildModal.onOpenChange}
      />
      <SetWorkerCapacityModal
        worker={worker}
        isOpen={capacityModal.isOpen}
        isLoading={settingCapacity}
        onOpenChange={capacityModal.onOpenChange}
        onSubmit={(capacity) =>
          setCapacity({ variables: { workerId, capacity } })
        }
      />
    </main>
  );
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card shadow="sm">
      <CardBody className="p-4">
        <p className="text-default-500 text-xs">{label}</p>
        <p className="mt-1 font-semibold">{value}</p>
        <p className="text-default-400 mt-1 truncate text-xs" title={hint}>
          {hint}
        </p>
      </CardBody>
    </Card>
  );
}

function TaskFeed({
  tasks,
  loading,
  hasMore,
  onEndReached,
  cancelling,
  onCancel,
}: {
  tasks: any[];
  loading: boolean;
  hasMore: boolean;
  onEndReached: () => Promise<void>;
  cancelling: boolean;
  onCancel: (id: string) => void;
}) {
  if (loading && !tasks.length)
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner size="sm" />
      </div>
    );
  if (!tasks.length)
    return (
      <div className="text-default-500 px-5 py-12 text-center text-sm">
        No tasks in this view.
      </div>
    );
  return (
    <Virtuoso
      style={{ height: 620 }}
      data={tasks}
      endReached={() => (hasMore && !loading ? onEndReached() : undefined)}
      itemContent={(_, task) => (
        <TaskRow task={task} cancelling={cancelling} onCancel={onCancel} />
      )}
      components={{
        Footer: () => (
          <div className="text-default-400 flex justify-center p-4 text-sm">
            {loading ? (
              <Spinner size="sm" />
            ) : hasMore ? (
              "Scroll for more"
            ) : (
              "End of history"
            )}
          </div>
        ),
      }}
    />
  );
}

function TaskRow({
  task,
  cancelling,
  onCancel,
}: {
  task: any;
  cancelling: boolean;
  onCancel: (id: string) => void;
}) {
  const timing = parseTiming(task.timingJson);
  return (
    <div className="border-default-100 grid gap-3 border-b px-5 py-4 md:grid-cols-[minmax(0,1.2fr)_minmax(180px,.8fr)_auto]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">
            {task.kind.replace(/([A-Z])/g, " $1").trim()}
          </span>
          <Chip size="sm" color={color(task.status)} variant="flat">
            {task.status}
          </Chip>
        </div>
        <p className="text-default-400 mt-1 truncate font-mono text-xs">
          {task.id}
        </p>
        <p className="text-default-500 mt-1 text-xs">
          Created {stamp(task.createdAt)} · Range {stamp(task.rangeStartedAt)} —{" "}
          {stamp(task.rangeEndedAt)}
        </p>
        {task.claimedAt && (
          <p className="text-default-500 mt-1 text-xs">
            {task.completedAt
              ? `Completed ${stamp(task.completedAt)}${duration(task.claimedAt, task.completedAt) ? ` · Took ${duration(task.claimedAt, task.completedAt)}` : ""}`
              : `Started ${stamp(task.claimedAt)}`}
          </p>
        )}
        {timing && (
          <div className="bg-default-50 mt-3 rounded-lg p-2 text-xs">
            <div className="flex flex-wrap justify-between gap-x-3 gap-y-1">
              <span className="font-medium">
                Evaluation timing · {timing.totalMs}ms
              </span>
              <span className="text-default-500">
                {timing.acceptedCandidates ?? 0} accepted /{" "}
                {timing.candidates ?? 0} candidates
              </span>
            </div>
            <div className="text-default-500 mt-2 grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3">
              <span>Cache reads: {timing.cacheReadMs ?? 0}ms</span>
              <span>History: {timing.historyConversionMs ?? 0}ms</span>
              <span>Positions: {timing.positionBuildMs ?? 0}ms</span>
              <span>Scoring: {timing.scoringMs ?? 0}ms</span>
              <span>Filtering: {timing.recentFilterMs ?? 0}ms</span>
              <span>
                {(timing.eventLogRecords ?? 0).toLocaleString()} cached logs
              </span>
            </div>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium">{task.syncStatus}</p>
        <p className="text-default-500 mt-1 text-xs">
          {task.workerId
            ? "Dispatched to this worker"
            : "Waiting for this worker to poll"}
        </p>
        {task.status === "Claimed" && (
          <>
            <Progress
              className="mt-2"
              size="sm"
              value={task.progressPercent}
              aria-label="Task progress"
            />
            <p className="text-default-500 mt-1 text-xs">
              {task.progressPercent.toFixed(0)}% ·{" "}
              {task.progressMessage || "Processing"}
            </p>
            {Number(task.progressTotalRecords) > 0 && (
              <p className="text-default-400 mt-1 text-xs">
                {Number(task.progressRecords).toLocaleString()} /{" "}
                {Number(task.progressTotalRecords).toLocaleString()}{" "}
                {task.kind === "EvaluateLeaders"
                  ? "leaders evaluated"
                  : "records processed"}
              </p>
            )}
          </>
        )}
      </div>
      <div className="min-w-0 text-right">
        {task.lastError && (
          <p className="text-danger max-w-xs text-left text-xs">
            {task.lastError}
          </p>
        )}
        {task.canCancel && (
          <ButtonWithConfirm
            size="sm"
            className="mt-2"
            color="danger"
            variant="light"
            isLoading={cancelling}
            onPress={() => onCancel(task.id)}
          >
            Remove
          </ButtonWithConfirm>
        )}
      </div>
    </div>
  );
}
