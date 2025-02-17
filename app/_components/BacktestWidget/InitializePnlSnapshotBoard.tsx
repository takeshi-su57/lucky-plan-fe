"use client";

import dayjs from "dayjs";
import { useBuildPnlSnapshots } from "@/app-hooks/useHistory";
import { Button, Progress } from "@nextui-org/react";

export type InitializePnlSnapshotBoardProps = {
  endDate: Date;
  loading: boolean;
};

export function InitializePnlSnapshotBoard({
  endDate,
  loading,
}: InitializePnlSnapshotBoardProps) {
  const { buildPnlSnapshots, loading: buildPnlSnapshotsLoading } =
    useBuildPnlSnapshots();

  const handleBuildPnlSnapshots = () => {
    buildPnlSnapshots({
      variables: { dateStr: dayjs(endDate).format("YYYY-MM-DD") },
    });
  };

  return (
    <div className="m-8 flex h-[150px] w-[300px] flex-col items-center justify-center gap-2 rounded-xl border border-neutral-400/40 p-4">
      {buildPnlSnapshotsLoading ? (
        <span className="text-base">Building PNL snapshots...</span>
      ) : (
        <Button
          onClick={handleBuildPnlSnapshots}
          isLoading={buildPnlSnapshotsLoading}
          color="primary"
          isDisabled={buildPnlSnapshotsLoading}
        >
          Build
        </Button>
      )}

      {loading ? (
        <span className="text-xs">Loading...</span>
      ) : (
        <span className="text-xs">
          {buildPnlSnapshotsLoading
            ? "Average time: 5mins"
            : "Not ready PNL snapshots for Leaderboard"}
        </span>
      )}

      {loading || buildPnlSnapshotsLoading ? (
        <Progress
          aria-label="Building PNL snapshots"
          isIndeterminate
          className="w-[200px]"
          size="sm"
        />
      ) : null}
    </div>
  );
}
