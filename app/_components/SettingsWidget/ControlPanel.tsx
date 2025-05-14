"use client";

import { Button, Card, CardBody, Switch } from "@nextui-org/react";
import {
  useGetSystemStatus,
  useIsSafeApp,
  usePauseSystem,
  // useUpgradeSystem,
} from "@/app-hooks/useSystem";
import { ResumeSystemButton } from "./ResumeSystemButton";
import { SetupPasswordButton } from "./SetupPasswordButton";
import { ChangePasswordButton } from "./ChangePasswordButton";
import { useAppSettings } from "@/app-hooks/useAppSettings";
import { useUserJWT } from "@/app-hooks/useUserJWT";
import { UserPermission } from "@/graphql/gql/graphql";

export function ControlPanel() {
  const { data: systemStatus } = useGetSystemStatus();
  const { data: isSafeApp } = useIsSafeApp();

  const { appSettings, changeAppSettings } = useAppSettings();
  const { userJwtQuery } = useUserJWT();

  const pauseSystem = usePauseSystem();
  // const { upgradeSystem, loading: upgradeSystemLoading } = useUpgradeSystem();

  const handleToggleDevMode = (isSelected: boolean) => {
    changeAppSettings.mutate({ isDevMode: isSelected });
  };

  return (
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

          {/* <Button
            onClick={() => upgradeSystem()}
            className="w-[300px]"
            color="secondary"
            isDisabled={upgradeSystemLoading}
            isLoading={upgradeSystemLoading}
          >
            Upgrade System
          </Button> */}

          <Switch
            checked={appSettings.isDevMode}
            onValueChange={handleToggleDevMode}
          >
            Toggle Dev Mode
          </Switch>
        </div>
      </CardBody>
    </Card>
  );
}
