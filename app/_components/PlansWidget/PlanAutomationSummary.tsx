"use client";

import { memo, useMemo } from "react";
import { Badge, Chip } from "@heroui/react";

import {
  BotForwardDetails,
  BotStatus,
  MissionStatus,
  TaskStatus,
} from "@/graphql/gql/graphql";
import { useGetAlertTasks } from "@/app/_hooks/useTask";
import { LabeledChip } from "@/components/chips/LabeledChip";
import { getPriceStr } from "@/utils/price";

const colorsByBotsStatus: Record<BotStatus, "default" | "success" | "danger"> =
  {
    [BotStatus.Created]: "default",
    [BotStatus.Live]: "success",
    [BotStatus.Stop]: "danger",
    [BotStatus.Dead]: "default",
  };

export type PlanAutomationSummaryProps = {
  bot: BotForwardDetails;
};

export const PlanAutomationSummary = memo(function PlanAutomationSummary({
  bot,
}: PlanAutomationSummaryProps) {
  const alertTasks = useGetAlertTasks();
  const strategy = bot.strategy;

  const {
    activeMissionCount,
    createdMissionsCount,
    openingMissionsCount,
    openedMissionsCount,
    closingMissionsCount,
    closedMissionsCount,
    ignoredMissionsCount,
  } = useMemo(() => {
    const createdMissions = bot.missions.filter(
      (mission) => mission.status === MissionStatus.Created,
    );
    const openingMissions = bot.missions.filter(
      (mission) => mission.status === MissionStatus.Opening,
    );
    const openedMissions = bot.missions.filter(
      (mission) => mission.status === MissionStatus.Opened,
    );
    const closingMissions = bot.missions.filter(
      (mission) => mission.status === MissionStatus.Closing,
    );
    const closedMissions = bot.missions.filter(
      (mission) => mission.status === MissionStatus.Closed,
    );
    const ignoredMissions = bot.missions.filter(
      (mission) => mission.status === MissionStatus.Ignored,
    );

    return {
      activeMissionCount:
        createdMissions.length +
        openingMissions.length +
        openedMissions.length +
        closingMissions.length,
      createdMissionsCount: createdMissions.length,
      openingMissionsCount: openingMissions.length,
      openedMissionsCount: openedMissions.length,
      closingMissionsCount: closingMissions.length,
      closedMissionsCount: closedMissions.length,
      ignoredMissionsCount: ignoredMissions.length,
    };
  }, [bot.missions]);

  const { createdCount, awaitedCount, initiatedCount, failedCount } =
    useMemo(() => {
      const botTasks = alertTasks.filter(
        (task) => task.mission.botId === bot.id,
      );

      return {
        createdCount: botTasks.filter(
          (task) => task.status === TaskStatus.Created,
        ).length,
        awaitedCount: botTasks.filter(
          (task) => task.status === TaskStatus.Await,
        ).length,
        initiatedCount: botTasks.filter(
          (task) => task.status === TaskStatus.Initiated,
        ).length,
        failedCount: botTasks.filter(
          (task) => task.status === TaskStatus.Failed,
        ).length,
      };
    }, [alertTasks, bot.id]);

  return (
    <div className="flex min-w-0 items-center justify-between gap-4 text-neutral-400">
      <div className="flex min-w-0 items-center gap-4">
        <Chip size="sm" variant="flat">
          {bot.id}
        </Chip>

        <div className="grid min-w-0 grid-cols-[minmax(160px,1fr)_minmax(180px,1fr)_120px] items-center gap-4 font-mono text-xs">
          <div className="flex min-w-0 flex-col">
            <span className="truncate">
              Collateral ${getPriceStr(strategy.minCollateral, 0)}-
              {getPriceStr(strategy.maxCollateral, 0)}
            </span>
            <span className="truncate">
              Leverage {strategy.minLeverage / 1000}-
              {strategy.maxLeverage / 1000}x
            </span>
          </div>

          <div className="flex min-w-0 flex-col">
            <span className="truncate">Ratio {strategy.ratio}x</span>
            <span className="truncate">
              TP {Number(strategy.tpPercentage)}% / SL{" "}
              {Number(strategy.slPercentage)}%
            </span>
          </div>

          <div className="flex min-w-0 flex-col">
            <span className="truncate">
              Max Missions {Number(strategy.maxOpenMissions) || 0}
            </span>
            <span className="truncate">Active {activeMissionCount}</span>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2 font-mono">
          <div className="flex min-w-0 items-center gap-1">
            {createdMissionsCount > 0 ? (
              <LabeledChip
                size="sm"
                variant="flat"
                color="secondary"
                value={createdMissionsCount}
                unit="Created Missions"
              />
            ) : null}
            {openingMissionsCount > 0 ? (
              <LabeledChip
                size="sm"
                variant="flat"
                color="warning"
                value={openingMissionsCount}
                unit="Opening Missions"
              />
            ) : null}
            {openedMissionsCount > 0 ? (
              <LabeledChip
                size="sm"
                variant="flat"
                color="success"
                value={openedMissionsCount}
                unit="Opened Missions"
              />
            ) : null}
            {closingMissionsCount > 0 ? (
              <LabeledChip
                size="sm"
                variant="flat"
                color="warning"
                value={closingMissionsCount}
                unit="Closing Missions"
              />
            ) : null}
            {closedMissionsCount > 0 ? (
              <LabeledChip
                size="sm"
                variant="flat"
                value={closedMissionsCount}
                unit="Closed Missions"
              />
            ) : null}
            {ignoredMissionsCount > 0 ? (
              <LabeledChip
                size="sm"
                variant="flat"
                value={ignoredMissionsCount}
                unit="Ignored Missions"
              />
            ) : null}
          </div>

          <div className="flex min-w-0 items-center gap-2">
            {createdCount > 0 ? (
              <Badge color="secondary" content={createdCount}>
                <Chip size="sm" color="secondary">
                  Created Tasks
                </Chip>
              </Badge>
            ) : null}

            {awaitedCount > 0 ? (
              <Badge color="warning" content={awaitedCount}>
                <Chip size="sm" color="warning">
                  Await Tasks
                </Chip>
              </Badge>
            ) : null}

            {initiatedCount > 0 ? (
              <Badge color="success" content={initiatedCount}>
                <Chip size="sm" color="success">
                  Initiated Tasks
                </Chip>
              </Badge>
            ) : null}

            {failedCount > 0 ? (
              <Badge color="danger" content={failedCount}>
                <Chip size="sm" color="danger">
                  Failed Tasks
                </Chip>
              </Badge>
            ) : null}
          </div>
        </div>
      </div>

      <Chip size="sm" color={colorsByBotsStatus[bot.status]}>
        {bot.status}
      </Chip>
    </div>
  );
});
