"use client";

import { Chip } from "@nextui-org/react";
import dayjs from "dayjs";

import { MissionStatus, Mission } from "@/graphql/gql/graphql";

const colorsByMissionStatus: Record<
  MissionStatus,
  "default" | "primary" | "secondary" | "success" | "warning" | "danger"
> = {
  [MissionStatus.Created]: "danger",
  [MissionStatus.Opening]: "warning",
  [MissionStatus.Opened]: "secondary",
  [MissionStatus.Closing]: "warning",
  [MissionStatus.Closed]: "default",
};

export type MissionSummaryProps = {
  mission: Mission;
};

export function MissionSummary({ mission }: MissionSummaryProps) {
  return (
    <div className="flex w-full items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <Chip>Mission {mission.id}</Chip>

        <span className="text-xs text-neutral-600">
          {mission.targetPositionId}
        </span>

        <span className="text-xs text-neutral-600">
          {mission.achievePositionId || ""}
        </span>

        <span className="text-xs text-neutral-600">
          {dayjs(new Date(mission.createdAt)).format("YYYY/MM/DD hh:mm:ss")}
        </span>
      </div>

      <Chip color={colorsByMissionStatus[mission.status]}>
        {mission.status}
      </Chip>
    </div>
  );
}
