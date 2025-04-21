"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import {
  useGetSystemStatus,
  useIsSafeApp,
  usePauseSystem,
} from "@/app-hooks/useSystem";
import { ResumeSystemButton } from "./ResumeSystemButton";
import { SetupPasswordButton } from "./SetupPasswordButton";
import { ChangePasswordButton } from "./ChangePasswordButton";

export function ControlPanel() {
  const { data: systemStatus } = useGetSystemStatus();
  const { data: isSafeApp } = useIsSafeApp();

  const pauseSystem = usePauseSystem();

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-6 p-4">
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
        </div>
      </CardBody>
    </Card>
  );
}
