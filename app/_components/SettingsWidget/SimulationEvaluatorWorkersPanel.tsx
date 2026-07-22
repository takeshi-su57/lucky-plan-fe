"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Spinner,
  useDisclosure,
} from "@heroui/react";

import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import {
  useApproveSimulationEvaluatorWorker,
  usePauseSimulationEvaluatorWorker,
  useRejectSimulationEvaluatorWorker,
  useRemoveRejectedSimulationEvaluatorWorker,
  useRemoveOfflineSimulationEvaluatorWorker,
  useResumeSimulationEvaluatorWorker,
  useSetSimulationEvaluatorWorkerCapacity,
  useSimulationEvaluatorWorkerTasks,
  useSimulationEvaluatorWorkers,
} from "@/app/_hooks/useSimulationEvaluatorWorkers";
import { PrebuildWorkerCacheModal } from "./PrebuildWorkerCacheModal";
import { SetWorkerCapacityModal } from "./SetWorkerCapacityModal";
import { RightDrawer } from "@/components/modals/RightDrawer";
import { WorkerDetails } from "./WorkerDetails";

const age = (value?: string | null) => {
  if (!value) return "Never";
  const date = new Date(/^\d+$/.test(value) ? Number(value) : value);
  const seconds = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return date.toLocaleDateString();
};

export function SimulationEvaluatorWorkersPanel() {
  const { data, loading } = useSimulationEvaluatorWorkers();
  const { data: taskData } = useSimulationEvaluatorWorkerTasks();
  const [approve, { loading: approving }] =
    useApproveSimulationEvaluatorWorker();
  const [reject, { loading: rejecting }] = useRejectSimulationEvaluatorWorker();
  const [remove, { loading: removing }] =
    useRemoveRejectedSimulationEvaluatorWorker();
  const [removeOffline, { loading: removingOffline }] =
    useRemoveOfflineSimulationEvaluatorWorker();
  const [pause, { loading: pausing }] = usePauseSimulationEvaluatorWorker();
  const [resume, { loading: resuming }] = useResumeSimulationEvaluatorWorker();
  const [setCapacity, { loading: settingCapacity }] =
    useSetSimulationEvaluatorWorkerCapacity();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const capacity = useDisclosure();
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
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);
  const workers = data?.simulationEvaluatorWorkers ?? [];
  const tasks = taskData?.simulationEvaluatorWorkerTasks ?? [];

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
              Availability and the minimum operational signals. Open a worker
              for its full audit trail.
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
          <div className="space-y-3">
            {workers.map((worker) => {
              const workerTasks = tasks.filter(
                (task) =>
                  task.targetWorkerId === worker.id ||
                  task.workerId === worker.id,
              );
              const active = workerTasks.filter(
                (task) => task.status === "Claimed",
              ).length;
              const failedCaches = worker.platformCaches.filter(
                (cache) => cache.status === "Failed",
              ).length;
              const isWorking =
                worker.runtimeStatus === "Busy" ||
                worker.runtimeStatus === "Prebuilding";
              return (
                <Card
                  key={worker.id}
                  shadow="sm"
                  className="border-default-200 hover:border-primary-300 border transition-colors"
                >
                  <CardBody className="gap-4 p-5 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                    <div className="flex min-w-0 items-start justify-between gap-3 lg:contents">
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
                      <div className="flex shrink-0 flex-col items-end gap-1 lg:col-start-2 lg:row-start-1">
                        <Chip
                          size="sm"
                          color={
                            worker.authorizationStatus === "Approved"
                              ? "success"
                              : worker.authorizationStatus === "Rejected"
                                ? "danger"
                                : "warning"
                          }
                        >
                          {worker.authorizationStatus}
                        </Chip>
                        <Chip size="sm" variant="flat">
                          {worker.runtimeStatus}
                        </Chip>
                      </div>
                    </div>
                    <div className="bg-default-50 grid grid-cols-2 gap-2 rounded-lg p-3 text-sm lg:col-start-1 lg:row-start-2">
                      <div>
                        <p className="text-default-500 text-xs">
                          Last heartbeat
                        </p>
                        <p className="font-medium">
                          {age(worker.lastHeartbeatAt)}
                        </p>
                      </div>
                      <div>
                        <p className="text-default-500 text-xs">Capacity</p>
                        <p className="font-medium">
                          {worker.activeCapacity} / {worker.desiredCapacity}{" "}
                          slots
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm lg:col-start-1 lg:row-start-3">
                      <div className="bg-default-50 rounded-lg p-2">
                        <p className="font-semibold">{workerTasks.length}</p>
                        <p className="text-default-500 text-xs">tasks</p>
                      </div>
                      <div className="bg-default-50 rounded-lg p-2">
                        <p className="font-semibold">{active}</p>
                        <p className="text-default-500 text-xs">active</p>
                      </div>
                      <div className="bg-default-50 rounded-lg p-2">
                        <p
                          className={
                            failedCaches
                              ? "text-danger font-semibold"
                              : "font-semibold"
                          }
                        >
                          {failedCaches}
                        </p>
                        <p className="text-default-500 text-xs">
                          cache failures
                        </p>
                      </div>
                    </div>
                    <div className="border-default-200 flex flex-wrap gap-2 border-t pt-4 lg:col-start-2 lg:row-span-3 lg:row-start-2 lg:w-40 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5">
                      <Button
                        onPress={() => setSelectedWorkerId(worker.id)}
                        size="sm"
                        color="primary"
                        className="w-full"
                      >
                        Details
                      </Button>
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
                            Prebuild
                          </Button>
                          <Button
                            size="sm"
                            variant="flat"
                            isLoading={
                              worker.desiredState === "Running"
                                ? pausing
                                : resuming
                            }
                            onPress={() =>
                              worker.desiredState === "Running"
                                ? pause({ variables: { workerId: worker.id } })
                                : resume({ variables: { workerId: worker.id } })
                            }
                          >
                            {worker.desiredState === "Running"
                              ? "Pause"
                              : "Resume"}
                          </Button>
                          <Button
                            size="sm"
                            variant="flat"
                            isLoading={settingCapacity}
                            onPress={() => {
                              setCapacityWorker(worker);
                              capacity.onOpen();
                            }}
                          >
                            Capacity
                          </Button>
                        </>
                      )}
                      {worker.authorizationStatus === "Rejected" && (
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
                      {worker.runtimeStatus === "Offline" && (
                        <ButtonWithConfirm
                          size="sm"
                          color="danger"
                          variant="flat"
                          isLoading={removingOffline}
                          onPress={() =>
                            removeOffline({
                              variables: { workerId: worker.id },
                            })
                          }
                        >
                          Delete worker
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
            isOpen={capacity.isOpen}
            isLoading={settingCapacity}
            onOpenChange={capacity.onOpenChange}
            onSubmit={(value) =>
              setCapacity({
                variables: { workerId: capacityWorker.id, capacity: value },
              })
            }
          />
        )}
        <RightDrawer
          isOpen={selectedWorkerId !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedWorkerId(null);
          }}
          classNames={{ base: "max-w-[min(92vw,1120px)]" }}
        >
          {selectedWorkerId && (
            <WorkerDetails workerId={selectedWorkerId} embedded />
          )}
        </RightDrawer>
      </CardBody>
    </Card>
  );
}
