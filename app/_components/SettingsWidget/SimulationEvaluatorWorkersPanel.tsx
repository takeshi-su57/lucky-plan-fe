"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Progress,
  Spinner,
  useDisclosure,
} from "@heroui/react";

import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import {
  useApproveSimulationEvaluatorWorker,
  useRejectSimulationEvaluatorWorker,
  useRemoveRejectedSimulationEvaluatorWorker,
  usePauseSimulationEvaluatorWorker,
  useResumeSimulationEvaluatorWorker,
  useSetSimulationEvaluatorWorkerCapacity,
  useSimulationEvaluatorWorkers,
} from "@/app/_hooks/useSimulationEvaluatorWorkers";

import { PrebuildWorkerCacheModal } from "./PrebuildWorkerCacheModal";
import { SetWorkerCapacityModal } from "./SetWorkerCapacityModal";

const authorizationColor = (status: string) =>
  status === "Approved"
    ? "success"
    : status === "Rejected"
      ? "danger"
      : "warning";

const runtimeColor = (status: string) =>
  status === "Free"
    ? "success"
    : status === "Busy" || status === "Prebuilding"
      ? "primary"
      : "default";

const formatDate = (value?: string | null) => {
  if (!value) return "Never";
  const date = /^\d+$/.test(value) ? new Date(Number(value)) : new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  const seconds = Math.max(
    0,
    Math.round((Date.now() - date.getTime()) / 1_000),
  );
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3_600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86_400) return `${Math.floor(seconds / 3_600)}h ago`;
  return date.toLocaleDateString();
};

const formatBytes = (value: string) => {
  const bytes = Number(value);
  if (!Number.isFinite(bytes)) return value;
  if (bytes < 1_024) return `${bytes} B`;
  if (bytes < 1_048_576) return `${(bytes / 1_024).toFixed(1)} KB`;
  return `${(bytes / 1_048_576).toFixed(1)} MB`;
};

const formatCount = (value: string) => {
  const count = Number(value);
  return Number.isFinite(count) ? count.toLocaleString() : value;
};

export function SimulationEvaluatorWorkersPanel() {
  const { data, loading } = useSimulationEvaluatorWorkers();
  const [approve, { loading: approving }] =
    useApproveSimulationEvaluatorWorker();
  const [reject, { loading: rejecting }] = useRejectSimulationEvaluatorWorker();
  const [remove, { loading: removing }] =
    useRemoveRejectedSimulationEvaluatorWorker();
  const [pause, { loading: pausing }] = usePauseSimulationEvaluatorWorker();
  const [resume, { loading: resuming }] = useResumeSimulationEvaluatorWorker();
  const [setCapacity, { loading: settingCapacity }] =
    useSetSimulationEvaluatorWorkerCapacity();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isCapacityOpen,
    onOpen: onCapacityOpen,
    onOpenChange: onCapacityOpenChange,
  } = useDisclosure();
  const [prebuildWorker, setPrebuildWorker] = useState<{
    id: string;
    displayName: string;
  } | null>(null);
  const [capacityWorker, setCapacityWorker] = useState<{
    id: string;
    displayName: string;
    activeCapacity: number;
    desiredCapacity: number;
  } | null>(null);
  const workers = data?.simulationEvaluatorWorkers || [];
  const onlineWorkers = workers.filter(
    (worker) => worker.runtimeStatus !== "Offline",
  ).length;
  const workingWorkers = workers.filter(
    (worker) =>
      worker.runtimeStatus === "Busy" || worker.runtimeStatus === "Prebuilding",
  ).length;

  if (loading && !data) return <Spinner />;

  return (
    <Card>
      <CardBody className="gap-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h6 className="text-lg font-semibold">
              Simulation evaluator workers
            </h6>
            <p className="text-default-500 text-sm">
              Worker availability, current execution, cache coverage, and
              enrollment controls.
            </p>
          </div>
          <div className="flex gap-2">
            <Chip size="sm" variant="flat" color="success">
              {onlineWorkers} online
            </Chip>
            <Chip size="sm" variant="flat" color="primary">
              {workingWorkers} working
            </Chip>
          </div>
        </div>

        {workers.length === 0 ? (
          <div className="border-default-300 text-default-500 rounded-xl border border-dashed px-5 py-10 text-center">
            No worker enrollment requests yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            {workers.map((worker) => {
              const isWorking =
                worker.runtimeStatus === "Busy" ||
                worker.runtimeStatus === "Prebuilding";

              return (
                <Card
                  key={worker.id}
                  shadow="sm"
                  className="border-default-200 border"
                >
                  <CardBody className="gap-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${worker.runtimeStatus === "Offline" ? "bg-default-300" : "bg-success"}`}
                          />
                          <h3 className="truncate font-semibold">
                            {worker.displayName}
                          </h3>
                        </div>
                        <p
                          className="text-default-500 mt-1 truncate font-mono text-xs"
                          title={worker.id}
                        >
                          {worker.id}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <Chip
                          size="sm"
                          color={authorizationColor(worker.authorizationStatus)}
                        >
                          {worker.authorizationStatus}
                        </Chip>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={runtimeColor(worker.runtimeStatus)}
                        >
                          {worker.runtimeStatus}
                        </Chip>
                        <Chip size="sm" variant="flat">
                          {worker.activeCapacity} / {worker.desiredCapacity}{" "}
                          slots
                        </Chip>
                      </div>
                    </div>

                    <div className="bg-default-50 grid grid-cols-2 gap-2 rounded-lg p-3 text-sm">
                      <div>
                        <p className="text-default-500 text-xs">
                          Last heartbeat
                        </p>
                        <p className="font-medium">
                          {formatDate(worker.lastHeartbeatAt)}
                        </p>
                      </div>
                      <div>
                        <p className="text-default-500 text-xs">Last task</p>
                        <p className="font-medium">
                          {formatDate(worker.lastTaskAt)}
                        </p>
                      </div>
                    </div>

                    {worker.prebuildProgress && (
                      <div className="border-primary-200 bg-primary-50/50 rounded-lg border p-3">
                        <div className="flex items-start justify-between gap-3 text-sm">
                          <div className="min-w-0">
                            <p className="font-medium">Prebuilding cache</p>
                            <p className="text-default-600 truncate">
                              {worker.prebuildProgress.message}
                            </p>
                          </div>
                          <span className="text-primary shrink-0 text-lg font-semibold">
                            {worker.prebuildProgress.percent.toFixed(1)}%
                          </span>
                        </div>
                        <Progress
                          aria-label="Prebuild progress"
                          value={worker.prebuildProgress.percent}
                          size="sm"
                          className="mt-3"
                        />
                        <div className="text-default-500 mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs">
                          <span>
                            {formatCount(worker.prebuildProgress.records)} /{" "}
                            {formatCount(worker.prebuildProgress.totalRecords)}{" "}
                            event logs
                          </span>
                          <span>
                            {formatBytes(worker.prebuildProgress.bytes)}{" "}
                            downloaded
                          </span>
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="text-default-500 mb-2 text-xs font-medium tracking-wide uppercase">
                        Platform caches
                      </p>
                      {worker.platformCaches.length ? (
                        <div className="flex flex-wrap gap-2">
                          {worker.platformCaches.map((cache) => (
                            <div
                              key={`${cache.platform}-${cache.coveredStartAt}-${cache.coveredEndAt}-${cache.status}`}
                              className="border-default-200 rounded-lg border px-2.5 py-2 text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {cache.platform}
                                </span>
                                <Chip
                                  size="sm"
                                  variant="flat"
                                  color={
                                    cache.status === "Ready"
                                      ? "success"
                                      : cache.status === "Failed"
                                        ? "danger"
                                        : "default"
                                  }
                                >
                                  {cache.status}
                                </Chip>
                              </div>
                              {cache.coveredStartAt && cache.coveredEndAt && (
                                <p className="text-default-500 mt-1">
                                  {formatDate(cache.coveredStartAt)} –{" "}
                                  {formatDate(cache.coveredEndAt)}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-default-500 text-sm">
                          No cache coverage reported.
                        </p>
                      )}
                    </div>

                    {worker.lastError && (
                      <div className="border-danger-200 bg-danger-50 text-danger-700 rounded-lg border p-3 text-sm">
                        <p className="font-medium">Last worker message</p>
                        <p className="mt-1 wrap-break-word">
                          {worker.lastError}
                        </p>
                      </div>
                    )}

                    <div className="border-default-200 flex flex-wrap gap-2 border-t pt-4">
                      {worker.authorizationStatus === "Pending" && (
                        <>
                          <Button
                            size="sm"
                            color="success"
                            isLoading={approving}
                            onPress={() =>
                              approve({ variables: { workerId: worker.id } })
                            }
                          >
                            Approve
                          </Button>
                          <ButtonWithConfirm
                            size="sm"
                            color="danger"
                            isLoading={rejecting}
                            onPress={() =>
                              reject({ variables: { workerId: worker.id } })
                            }
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
                            isDisabled={isWorking}
                            onPress={() => {
                              setPrebuildWorker(worker);
                              onOpen();
                            }}
                          >
                            Prebuild cache
                          </Button>
                          {worker.desiredState === "Running" ? (
                            <Button
                              size="sm"
                              variant="flat"
                              isLoading={pausing}
                              onPress={() =>
                                pause({ variables: { workerId: worker.id } })
                              }
                            >
                              Pause after tasks
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="flat"
                              color="success"
                              isLoading={resuming}
                              onPress={() =>
                                resume({ variables: { workerId: worker.id } })
                              }
                            >
                              Resume
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="flat"
                            isLoading={settingCapacity}
                            onPress={() => {
                              setCapacityWorker(worker);
                              onCapacityOpen();
                            }}
                          >
                            Set capacity
                          </Button>
                        </>
                      )}
                      {!isWorking && (
                        <ButtonWithConfirm
                          size="sm"
                          color="danger"
                          variant="flat"
                          isLoading={removing}
                          onPress={() =>
                            remove({ variables: { workerId: worker.id } })
                          }
                        >
                          Remove
                        </ButtonWithConfirm>
                      )}
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}

        {prebuildWorker && (
          <PrebuildWorkerCacheModal
            worker={prebuildWorker}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        )}
        {capacityWorker && (
          <SetWorkerCapacityModal
            worker={capacityWorker}
            isOpen={isCapacityOpen}
            isLoading={settingCapacity}
            onOpenChange={onCapacityOpenChange}
            onSubmit={(capacity) =>
              setCapacity({
                variables: { workerId: capacityWorker.id, capacity },
              })
            }
          />
        )}
      </CardBody>
    </Card>
  );
}
