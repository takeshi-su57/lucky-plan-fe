"use client";

import { useMemo } from "react";
import { Badge, Chip } from "@nextui-org/react";
import dayjs from "dayjs";
import {
  MissionStatus,
  MissionForwardDetails,
  TaskStatus,
} from "@/graphql/gql/graphql";

import { useGetAlertTasks } from "@/app-hooks/useTask";
import {
  useGetAllTradePairs,
  useGetTradeCollaterals,
} from "@/app-hooks/useContract";

import { convertTradeActionToHistory } from "@/utils/convertTradeActionToHistory";
import { LabeledChip } from "@/components/chips/LabeledChip";
import { getPriceStr } from "@/utils/price";

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

  const leaderCollaterals = useGetTradeCollaterals(leaderContractId);
  const leaderPairs = useGetAllTradePairs(leaderContractId);

  const followerCollaterals = useGetTradeCollaterals(followerContractId);
  const followerPairs = useGetAllTradePairs(followerContractId);

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

  const leaderPnl = useMemo(() => {
    if (leaderCollaterals.length === 0 || leaderPairs.length === 0) {
      return 0;
    }

    return mission.tasks.reduce((acc, task) => {
      const history = convertTradeActionToHistory(
        task.action,
        leaderCollaterals,
        leaderPairs,
      );

      return acc + (history?.pnl || 0) * (history?.collateralPriceUsd || 0);
    }, 0);
  }, [mission.tasks, leaderCollaterals, leaderPairs]);

  const followerPnl = useMemo(() => {
    if (followerCollaterals.length === 0 || followerPairs.length === 0) {
      return 0;
    }

    return mission.tasks.reduce((acc, task) => {
      if (task.followerActions.length === 0) {
        return acc;
      }

      const followerAction =
        task.followerActions[task.followerActions.length - 1];

      if (!followerAction) {
        return acc;
      }

      const history = convertTradeActionToHistory(
        followerAction.action,
        followerCollaterals,
        followerPairs,
      );

      return acc + (history?.pnl || 0) * (history?.collateralPriceUsd || 0);
    }, 0);
  }, [followerCollaterals, followerPairs, mission]);

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

        {leaderPnl !== 0 && (
          <LabeledChip
            label="Leader PnL"
            value={getPriceStr(leaderPnl)}
            unit="$"
            isPrefix={true}
            color={leaderPnl > 0 ? "warning" : "danger"}
          />
        )}

        {followerPnl !== 0 && (
          <LabeledChip
            label="Follower PnL"
            value={getPriceStr(followerPnl)}
            unit="$"
            isPrefix={true}
            color={followerPnl > 0 ? "warning" : "danger"}
          />
        )}

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
