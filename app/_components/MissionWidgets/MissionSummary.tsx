"use client";

import { Badge, Chip } from "@nextui-org/react";
import dayjs from "dayjs";

import {
  MissionStatus,
  MissionForwardDetails,
  TaskStatus,
} from "@/graphql/gql/graphql";
import { useGetAlertTasks } from "@/app/_hooks/useTask";

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

export type MissionSummaryProps = {
  mission: MissionForwardDetails;
};

export function MissionSummary({ mission }: MissionSummaryProps) {
  const alertTasks = useGetAlertTasks();

  const missionTasks = alertTasks.filter(
    (task) => task.missionId === mission.id,
  );

  const createdCount = missionTasks.filter(
    (task) => task.status === TaskStatus.Created,
  ).length;

  const awaitedCount = missionTasks.filter(
    (task) => task.status === TaskStatus.Await,
  ).length;

  const initiatedCount = missionTasks.filter(
    (task) => task.status === TaskStatus.Initiated,
  ).length;

  const failedCount = missionTasks.filter(
    (task) => task.status === TaskStatus.Failed,
  ).length;

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

        <div className="flex flex-row items-center gap-3 font-mono">
          {createdCount > 0 ? (
            <Badge color="secondary" content={createdCount}>
              <Chip color="secondary">Created</Chip>
            </Badge>
          ) : null}

          {awaitedCount > 0 ? (
            <Badge color="warning" content={awaitedCount}>
              <Chip color="warning">Await</Chip>
            </Badge>
          ) : null}

          {initiatedCount > 0 ? (
            <Badge color="success" content={initiatedCount}>
              <Chip color="success">Initiated</Chip>
            </Badge>
          ) : null}

          {failedCount > 0 ? (
            <Badge color="danger" content={failedCount}>
              <Chip color="danger">Failed</Chip>
            </Badge>
          ) : null}
        </div>
      </div>

      <Chip color={colorsByMissionStatus[mission.status]}>
        {mission.status}
      </Chip>
    </div>
  );
}
