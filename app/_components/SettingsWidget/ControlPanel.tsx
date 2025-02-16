"use client";

import { Button } from "@nextui-org/react";
import {
  useBuildPnlSnapshots,
  usePauseSystem,
  useResumeSystem,
} from "@/app-hooks/useSystem";

export function ControlPanel() {
  const pauseSystem = usePauseSystem();
  const resumeSystem = useResumeSystem();
  const { buildPnlSnapshots, loading: buildPnlSnapshotsLoading } =
    useBuildPnlSnapshots();

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
        <Button
          onClick={() =>
            buildPnlSnapshots({ variables: { endDate: new Date() } })
          }
          isLoading={buildPnlSnapshotsLoading}
          isDisabled={buildPnlSnapshotsLoading}
          color="primary"
        >
          Build PNL Snapshot
        </Button>
      </div>
    </div>
  );
}
