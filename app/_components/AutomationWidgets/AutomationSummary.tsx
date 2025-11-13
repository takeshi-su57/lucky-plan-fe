"use client";

import {
  Badge,
  Button,
  Chip,
  Divider,
  DropdownMenu,
  DropdownTrigger,
  Dropdown,
  DropdownItem,
} from "@nextui-org/react";
import { Address } from "viem";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import {
  BotForwardDetails,
  BotStatus,
  MissionStatus,
  Platform,
  TaskStatus,
} from "@/graphql/gql/graphql";
import { useGetAlertTasks } from "@/app/_hooks/useTask";
import { LabeledChip } from "@/components/chips/LabeledChip";

import { ContractPnl } from "../MissionWidgets/ContractPnl";
import { getAdditionalParams } from "./EditAutomationModal";
import { getPairKey } from "../LeaderboardWidgets/PerpEventLogPnlChart/PerpEventLogPnlChart";

const colorsByBotsStatus: Record<BotStatus, "default" | "success" | "danger"> =
  {
    [BotStatus.Created]: "default",
    [BotStatus.Live]: "success",
    [BotStatus.Stop]: "danger",
    [BotStatus.Dead]: "default",
  };

export type AutomationSummaryProps = {
  bot: BotForwardDetails;
  simple?: boolean;
};

export function AutomationSummary({ bot, simple }: AutomationSummaryProps) {
  const alertTasks = useGetAlertTasks();

  const {
    leaderContract,
    followerContract,
    strategy,
    leaderAddress,
    followerAddress,
  } = bot;

  const botTasks = alertTasks.filter((task) => task.mission.botId === bot.id);

  const createdCount = botTasks.filter(
    (task) => task.status === TaskStatus.Created,
  ).length;

  const awaitedCount = botTasks.filter(
    (task) => task.status === TaskStatus.Await,
  ).length;

  const initiatedCount = botTasks.filter(
    (task) => task.status === TaskStatus.Initiated,
  ).length;

  const failedCount = botTasks.filter(
    (task) => task.status === TaskStatus.Failed,
  ).length;

  const validBotMisions = bot.missions.filter(
    (mission) => mission.achievePositionKey,
  );

  const createdMissions = bot.missions.filter(
    (mission) => mission.status === MissionStatus.Created,
  );

  const openedMissions = bot.missions.filter(
    (mission) => mission.status === MissionStatus.Opened,
  );

  const closedMissions = bot.missions.filter(
    (mission) =>
      mission.status === MissionStatus.Closed ||
      mission.status === MissionStatus.Ignored,
  );

  const additionalParams = getAdditionalParams(strategy.params);

  return (
    <div className="flex items-center justify-between gap-6 text-neutral-400">
      <div className="flex items-center gap-6">
        <Chip>{bot.id}</Chip>

        {!simple ? (
          <div className="flex h-10 items-center gap-4">
            <div className="flex w-[140px] flex-col items-center">
              <AddressWidget
                address={leaderAddress as Address}
                className="text-sm"
              />

              <span className="text-xs text-neutral-400/60">
                {`Leader on ${leaderContract.chainId} Chain ${leaderContract.platform}`}
              </span>
            </div>

            <Divider orientation="vertical" />

            <div className="flex w-[150px] flex-col items-center">
              <AddressWidget
                address={followerAddress as Address}
                className="text-sm"
              />

              <span className="text-xs text-neutral-400/60">
                {`Follower on ${followerContract.chainId} Chain ${followerContract.platform}`}
              </span>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col font-mono">
          <span className="text-xs">
            Max Collateral:
            {`${Number(strategy.maxCollateral)} USDC * ${strategy.maxLeverage / 1000}x`}
          </span>
          <span className="text-xs">
            Ratio:
            {`${strategy.ratio} x`}
          </span>
        </div>

        <div className="flex flex-col font-mono">
          <span className="text-xs">
            Tp:
            {`${Number(additionalParams.tpPercentage)} %`}
          </span>
          <span className="text-xs">
            Sl:
            {`${Number(additionalParams.slPercentage)} %`}
          </span>
          <span className="text-xs">
            Max Open Missions:
            {`${Number(additionalParams.maxOpenMissions) || 0}`}
          </span>
        </div>

        {additionalParams.selectedPairs.length > 0 ? (
          <Dropdown>
            <DropdownTrigger>
              <Button
                color="default"
                variant="bordered"
                className="mb-2 shrink-0"
              >
                Show Allowed Pairs
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              classNames={{ list: "max-h-[250px] overflow-y-auto" }}
            >
              {additionalParams.selectedPairs.map((pair) => (
                <DropdownItem key={getPairKey(pair.pair, pair.isLong)}>
                  {pair.pair} - {pair.isLong ? "Long" : "Short"}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        ) : null}

        {bot.status === BotStatus.Dead ? (
          <div className="flex flex-col font-mono">
            {bot.startedAt ? (
              <span className="text-xs">
                Started:
                {`${new Date(bot.startedAt).toLocaleString()}`}
              </span>
            ) : (
              <span className="text-xs">
                <span className="text-neutral-400">Not Started</span>
              </span>
            )}

            {bot.endedAt ? (
              <span className="text-xs">
                Ended:
                {`${new Date(bot.endedAt).toLocaleString()}`}
              </span>
            ) : (
              <span className="text-xs">
                <span className="text-neutral-400">Not Ended</span>
              </span>
            )}
          </div>
        ) : null}

        <div className="flex flex-row items-center gap-3 font-mono">
          {bot.leaderContract.platform === Platform.Gns ? (
            <ContractPnl
              label="Leader"
              contractId={bot.leaderContractId}
              finished={false}
              finishedMissionActions={validBotMisions
                .filter((mission) => mission.status === MissionStatus.Closed)
                .map((mission) => mission.tasks.map((task) => task.action))}
              openedMissionActions={validBotMisions
                .filter(
                  (mission) =>
                    mission.status !== MissionStatus.Closed &&
                    mission.status !== MissionStatus.Ignored,
                )
                .map((mission) => mission.tasks.map((task) => task.action))}
            />
          ) : null}

          <ContractPnl
            label="Follower"
            contractId={bot.followerContractId}
            finished={false}
            finishedMissionActions={validBotMisions
              .filter((mission) => mission.status === MissionStatus.Closed)
              .map((mission) =>
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
              )}
            openedMissionActions={validBotMisions
              .filter(
                (mission) =>
                  mission.status !== MissionStatus.Closed &&
                  mission.status !== MissionStatus.Ignored,
              )
              .map((mission) =>
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
              )}
          />

          <div className="flex flex-col gap-1">
            {createdMissions.length > 0 && (
              <LabeledChip
                value={createdMissions.length}
                unit="Created Missions"
              />
            )}
            {openedMissions.length > 0 && (
              <LabeledChip
                value={openedMissions.length}
                unit="Opened Missions"
              />
            )}
            {closedMissions.length > 0 && (
              <LabeledChip
                value={closedMissions.length}
                unit="Closed Missions"
              />
            )}
          </div>

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

      <div className="flex flex-row items-center gap-3">
        <Chip color={colorsByBotsStatus[bot.status]}>{bot.status}</Chip>
      </div>
    </div>
  );
}
