"use client";

import { useMemo, useState } from "react";
import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import {
  useCleanDB,
  useGetMicroserviceStatus,
  useGetSystemStatus,
  useIsSafeApp,
  useKillSubService,
  usePauseSystem,
  useStartSubService,
  useSimulationEvaluatorWorkerActions,
  useSimulationEvaluatorWorkers,
} from "@/app-hooks/useSystem";
import { useUserJWT } from "@/app-hooks/useUserJWT";
import { UserPermission } from "@/graphql/gql/graphql";

import { ResumeSystemButton } from "./ResumeSystemButton";
import { SetupPasswordButton } from "./SetupPasswordButton";
import { ChangePasswordButton } from "./ChangePasswordButton";
import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import { MaxMissionPanel } from "./MaxMisssionPanel";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import { PrebuildWorkerCacheModal } from "./PrebuildWorkerCacheModal";

const columns: TableColumnProps[] = [
  {
    id: "service",
    component: "Service",
  },
  {
    id: "pids",
    component: "Pids",
  },
  {
    id: "action",
    component: "",
  },
];

export function ControlPanel() {
  const { data: systemStatus } = useGetSystemStatus();
  const { data: isSafeApp } = useIsSafeApp();
  const microserviceStatus = useGetMicroserviceStatus();
  const { userJwtQuery } = useUserJWT();
  const isAdmin = userJwtQuery?.data?.permission === UserPermission.Admin;
  const { workers, refetch: refetchWorkers } =
    useSimulationEvaluatorWorkers(isAdmin);

  const pauseSystem = usePauseSystem();
  const { killSubService, loading: killSubServiceLoading } =
    useKillSubService();
  const { startSubService, loading: startSubServiceLoading } =
    useStartSubService();
  const { cleanDB, loading: cleanDBLoading } = useCleanDB();
  const {
    approve,
    reject,
    remove,
    loading: workerActionLoading,
  } = useSimulationEvaluatorWorkerActions();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [prebuildWorker, setPrebuildWorker] = useState<{
    id: string;
    displayName: string;
  } | null>(null);

  const workerRows = useMemo(
    () =>
      workers.map((worker) => ({
        id: worker.id,
        data: {
          service: {
            component: <div className="max-w-64 break-all">{worker.id}</div>,
          },
          pids: {
            component: `${worker.authorizationStatus} / ${worker.runtimeStatus}`,
          },
          action: {
            component: (
              <div className="flex flex-wrap items-center gap-2">
                {worker.authorizationStatus === "Pending" ? (
                  <>
                    <Button
                      size="sm"
                      color="primary"
                      isLoading={workerActionLoading}
                      onPress={async () => {
                        await approve({ variables: { workerId: worker.id } });
                        refetchWorkers();
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      isLoading={workerActionLoading}
                      onPress={async () => {
                        await reject({ variables: { workerId: worker.id } });
                        refetchWorkers();
                      }}
                    >
                      Reject
                    </Button>
                  </>
                ) : null}
                {worker.authorizationStatus === "Approved" ? (
                  <Button
                    size="sm"
                    variant="flat"
                    isLoading={workerActionLoading}
                    onPress={() => {
                      setPrebuildWorker({
                        id: worker.id,
                        displayName: worker.id,
                      });
                      onOpen();
                    }}
                  >
                    Prebuild cache
                  </Button>
                ) : null}
                {worker.authorizationStatus === "Rejected" ? (
                  <ButtonWithConfirm
                    size="sm"
                    color="danger"
                    variant="flat"
                    isLoading={workerActionLoading}
                    onPress={async () => {
                      await remove({ variables: { workerId: worker.id } });
                      refetchWorkers();
                    }}
                  >
                    Remove
                  </ButtonWithConfirm>
                ) : null}
                <span className="text-default-500 text-xs">
                  {worker.prebuildProgress ? `${worker.prebuildProgress.message}: ${Number(worker.prebuildProgress.records).toLocaleString()} logs (${(Number(worker.prebuildProgress.bytes) / 1024 / 1024).toFixed(1)} MB)` : worker.platformCaches
                    .map((cache) => `${cache.platform}: ${cache.status}`)
                    .join(" · ") || "No platform cache"}
                </span>
              </div>
            ),
          },
        },
      })),
    [
      workers,
      approve,
      reject,
      remove,
      refetchWorkers,
      workerActionLoading,
      onOpen,
    ],
  );

  const rows = useMemo(() => {
    if (!microserviceStatus) {
      return [];
    }
    return microserviceStatus.map((service) => ({
      id: `${service.service}`,
      className: "group",
      data: {
        service: {
          component: service.service,
        },
        pids: {
          component: service.pids.join(", "),
        },
        action: {
          component: (
            <div className="flex items-center gap-4">
              <Button
                color="primary"
                variant="flat"
                size="sm"
                isLoading={startSubServiceLoading}
                onPress={() => {
                  startSubService({ variables: { service: service.service } });
                }}
              >
                Start
              </Button>
              <Button
                color="danger"
                variant="flat"
                size="sm"
                isLoading={killSubServiceLoading}
                onPress={() => {
                  killSubService({ variables: { service: service.service } });
                }}
              >
                Kill
              </Button>
            </div>
          ),
        },
      },
    }));
  }, [
    microserviceStatus,
    startSubServiceLoading,
    killSubServiceLoading,
    startSubService,
    killSubService,
  ]);

  return (
    <>
      <Card>
        <CardBody>
          <div className="flex flex-col gap-6 p-4">
            {isAdmin ? (
              <>
                {isSafeApp?.isSafeApp ? (
                  <p className="text-green-400">
                    Your app is protected by strong password
                  </p>
                ) : (
                  <p className="text-red-400">
                    We highly recommend to protect your app with strong password
                  </p>
                )}

                <div className="flex flex-row items-center gap-4">
                  {isSafeApp?.isSafeApp ? (
                    <ChangePasswordButton />
                  ) : (
                    <SetupPasswordButton />
                  )}

                  {systemStatus?.systemStatus === true ? (
                    <ResumeSystemButton />
                  ) : (
                    <Button onPress={() => pauseSystem()} color="danger">
                      Pause System
                    </Button>
                  )}

                  <Button
                    onPress={() => cleanDB()}
                    color="warning"
                    isLoading={cleanDBLoading}
                  >
                    Clean DB
                  </Button>
                </div>
              </>
            ) : null}

            <MaxMissionPanel />
          </div>
        </CardBody>
      </Card>

      {isAdmin ? (
        <Card>
          <CardBody>
            <div className="flex flex-col gap-6 p-4">
              <h6 className="text-lg">Microservice Control</h6>
              <DataTable
                columns={columns}
                rows={rows}
                classNames={{
                  tr: "font-mono cursor-pointer",
                  td: "py-3 ",
                  th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
                }}
              />
            </div>
          </CardBody>
        </Card>
      ) : null}

      {isAdmin ? (
        <Card>
          <CardBody>
            <div className="flex flex-col gap-6 p-4">
              <h6 className="text-lg">Simulation Evaluator Workers</h6>
              <DataTable
                columns={columns}
                rows={workerRows}
                classNames={{
                  tr: "font-mono",
                  td: "py-3",
                  th: "text-sm leading-tight tracking-widest font-normal uppercase",
                }}
              />
            </div>
          </CardBody>
        </Card>
      ) : null}

      {prebuildWorker ? (
        <PrebuildWorkerCacheModal
          worker={prebuildWorker}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      ) : null}
    </>
  );
}
