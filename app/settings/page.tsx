"use client";

import { Button } from "@nextui-org/react";
import {
  useInitalizePnlSnapshot,
  usePauseSystem,
  useResumeSystem,
} from "@/app-hooks/useSystem";

export default function Page() {
  const pauseSystem = usePauseSystem();
  const resumeSystem = useResumeSystem();
  const initalizePnlSnapshot = useInitalizePnlSnapshot();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Button onClick={() => pauseSystem()} color="warning">
          Pause System
        </Button>
        <Button onClick={() => resumeSystem()} color="danger">
          Resume System
        </Button>
      </div>
      <div className="flex flex-row gap-4">
        <Button onClick={() => initalizePnlSnapshot()} color="primary">
          Initialize PNL Snapshot
        </Button>
      </div>
    </div>
  );
}
