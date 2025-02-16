"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import {
  useGetSystemStatus,
  usePauseSystem,
  useResumeSystem,
} from "@/app-hooks/useSystem";

export function ControlPanel() {
  const { data } = useGetSystemStatus();

  const pauseSystem = usePauseSystem();
  const resumeSystem = useResumeSystem();

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-6 p-4">
          <div className="flex flex-row items-center gap-4">
            {data?.systemStatus === true ? (
              <Button onClick={() => resumeSystem()} color="danger">
                Resume System
              </Button>
            ) : (
              <Button onClick={() => pauseSystem()} color="warning">
                Pause System
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
