"use client";

import { Chip } from "@nextui-org/react";

import { MissionStatus, Mission } from "@/graphql/gql/graphql";

const colorsByMissionStatus: Record<
  MissionStatus,
  "default" | "primary" | "secondary" | "success" | "warning" | "danger"
> = {
  [MissionStatus.Created]: "danger",
  [MissionStatus.Opening]: "warning",
  [MissionStatus.Opened]: "primary",
  [MissionStatus.Closing]: "warning",
  [MissionStatus.Closed]: "default",
  [MissionStatus.Ignored]: "secondary",
};

export type PositionSummaryProps = {
  index: number;
  mission: Mission | null;
};

export function PositionSummary({ index, mission }: PositionSummaryProps) {
  return (
    <div className="flex w-full items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <Chip>Trade {index}</Chip>
        {mission ? <Chip color="primary">System</Chip> : null}
      </div>

      {mission ? (
        <Chip color={colorsByMissionStatus[mission.status]}>
          {mission.status}
        </Chip>
      ) : null}
    </div>
  );
}
