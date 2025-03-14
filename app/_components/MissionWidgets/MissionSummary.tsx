"use client";

import { Badge, Chip } from "@nextui-org/react";
import dayjs from "dayjs";
import {
  MissionStatus,
  MissionForwardDetails,
  TaskStatus,
} from "@/graphql/gql/graphql";

import { useGetAlertTasks } from "@/app-hooks/useTask";

import { ContractPnl } from "./ContractPnl";

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
  leaderContractId: number;
  followerContractId: number;
};

export function MissionSummary({
  mission,
  leaderContractId,
  followerContractId,
}: MissionSummaryProps) {
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

        <ContractPnl
          label="Leader"
          contractId={leaderContractId}
          finished={false}
          actions={[mission.tasks.map((task) => task.action)]}
        />

        <ContractPnl
          label="Follower"
          contractId={followerContractId}
          finished={false}
          actions={[
            mission.tasks
              .map((task) => {
                if (task.followerActions.length === 0) {
                  return null;
                }

                const followerAction =
                  task.followerActions[task.followerActions.length - 1];

                if (!followerAction) {
                  return null;
                }

                return followerAction.action;
              })
              .filter((action) => action !== null),
          ]}
        />

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
