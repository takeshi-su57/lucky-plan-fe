"use client";

import { useState } from "react";
import { Button, Card, CardBody, Chip, Spinner } from "@heroui/react";

import {
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

export function SimulationEvaluatorWorkersPanel() {
  const { data, loading } = useSimulationEvaluatorWorkers();
  const { data: taskData } = useSimulationEvaluatorWorkerTasks();
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  const workers = data?.simulationEvaluatorWorkers ?? [];
  const tasks = taskData?.simulationEvaluatorWorkerTasks ?? [];
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

  if (loading && !data) return <Spinner />;

  return (
    <Card>
      <CardBody className="gap-5 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h6 className="text-lg font-semibold">
              Simulation evaluator workers
            </h6>
            <p className="text-default-500 text-sm">
              Monitor the evaluator fleet and open a worker for diagnostics or
              controls.
            </p>
          </div>
          <Chip size="sm" variant="flat">
            {workers.length} enrolled
          </Chip>
        </div>

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
                    const workerTasks = tasks.filter(
                      (task) =>
                        task.targetWorkerId === worker.id ||
                        task.workerId === worker.id,
                    );
                    const activeTasks = workerTasks.filter(
                      (task) => task.status === "Claimed",
                    ).length;
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
                          <span className="font-medium">
                            {workerTasks.length} tasks
                          </span>
                          <span className="text-default-400 px-1.5">·</span>
                          <span
                            className={
                              activeTasks
                                ? "text-primary font-medium"
                                : "text-default-500"
                            }
                          >
                            {activeTasks} active
                          </span>
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
