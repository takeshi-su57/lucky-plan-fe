"use client";

import { useMemo } from "react";
import { Button, Card, CardBody } from "@heroui/react";
import {
  useCleanDB,
  useGetMicroserviceStatus,
  useGetSystemStatus,
  useIsSafeApp,
  useKillSubService,
  usePauseSystem,
  useStartSubService,
} from "@/app-hooks/useSystem";
import { useUserJWT } from "@/app-hooks/useUserJWT";
import { UserPermission } from "@/graphql/gql/graphql";

import { ResumeSystemButton } from "./ResumeSystemButton";
import { SetupPasswordButton } from "./SetupPasswordButton";
import { ChangePasswordButton } from "./ChangePasswordButton";
import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import { MaxMissionPanel } from "./MaxMisssionPanel";

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

  const pauseSystem = usePauseSystem();
  const { killSubService, loading: killSubServiceLoading } =
    useKillSubService();
  const { startSubService, loading: startSubServiceLoading } =
    useStartSubService();
  const { cleanDB, loading: cleanDBLoading } = useCleanDB();
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
    </>
  );
}
