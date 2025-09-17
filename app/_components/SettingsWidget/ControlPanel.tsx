"use client";

import { useMemo } from "react";
import { Button, Card, CardBody, Switch } from "@nextui-org/react";
import {
  useGetMicroserviceStatus,
  useIsBotHookRunning,
  useGetSystemStatus,
  useIsSafeApp,
  useKillSubService,
  usePauseSystem,
  useStartSubService,
} from "@/app-hooks/useSystem";
import { useAppSettings } from "@/app-hooks/useAppSettings";
import { useUserJWT } from "@/app-hooks/useUserJWT";
import { UserPermission } from "@/graphql/gql/graphql";

import { ResumeSystemButton } from "./ResumeSystemButton";
import { SetupPasswordButton } from "./SetupPasswordButton";
import { ChangePasswordButton } from "./ChangePasswordButton";
import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import { twMerge } from "tailwind-merge";

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
  const { data: isBotHookRunning } = useIsBotHookRunning();
  const microserviceStatus = useGetMicroserviceStatus();

  const { appSettings, changeAppSettings } = useAppSettings();
  const { userJwtQuery } = useUserJWT();

  const pauseSystem = usePauseSystem();
  const { killSubService, loading: killSubServiceLoading } =
    useKillSubService();
  const { startSubService, loading: startSubServiceLoading } =
    useStartSubService();

  const handleToggleDevMode = (isSelected: boolean) => {
    changeAppSettings.mutate({ isDevMode: isSelected });
  };

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
                onClick={() => {
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
                onClick={() => {
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
            {userJwtQuery?.data?.permission === UserPermission.Admin ? (
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
                    <Button onClick={() => pauseSystem()} color="danger">
                      Pause System
                    </Button>
                  )}
                </div>
              </>
            ) : null}

            <Switch
              checked={appSettings.isDevMode}
              onValueChange={handleToggleDevMode}
            >
              Toggle Dev Mode
            </Switch>

            <div className="flex items-center gap-4">
              <span className="text-sm">Bot Hook Status: </span>
              <div className="relative flex items-center justify-center">
                <div
                  className={twMerge(
                    "z-10 h-2 w-2 rounded-full bg-red-500",
                    isBotHookRunning?.isBotHookRunning === true
                      ? "bg-red-500"
                      : "bg-green-400",
                  )}
                />
                <div
                  className={twMerge(
                    "absolute h-2 w-2 animate-ping rounded-full bg-red-500",
                    isBotHookRunning?.isBotHookRunning === true
                      ? "bg-red-500"
                      : "bg-green-400",
                  )}
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {userJwtQuery?.data?.permission === UserPermission.Admin ? (
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
