"use client";

import { Badge, Chip, Divider } from "@nextui-org/react";
import { Address } from "viem";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import {
  BotForwardDetails,
  BotStatus,
  TaskStatus,
} from "@/graphql/gql/graphql";
import { useGetAlertTasks } from "@/app/_hooks/useTask";
import { LabeledChip } from "@/components/chips/LabeledChip";

import { ContractPnl } from "../MissionWidgets/ContractPnl";

const colorsByBotsStatus: Record<BotStatus, "default" | "success" | "danger"> =
  {
    [BotStatus.Created]: "default",
    [BotStatus.Live]: "success",
    [BotStatus.Stop]: "danger",
    [BotStatus.Dead]: "default",
  };

export type AutomationSummaryProps = {
  bot: BotForwardDetails;
};

export function AutomationSummary({ bot }: AutomationSummaryProps) {
  const alertTasks = useGetAlertTasks();

  const {
    leaderContract,
    followerContract,
    // strategy,
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
    (mission) => mission.achievePosition,
  );

  return (
    <div className="flex items-center justify-between gap-6 text-neutral-400">
      <div className="flex items-center gap-6">
        <Chip>{bot.id}</Chip>

        <div className="flex h-10 items-center gap-4">
          <div className="flex w-[140px] flex-col items-center">
            <AddressWidget
              address={leaderAddress as Address}
              className="text-sm"
            />

            <span className="text-xs text-neutral-400/60">
              {`Leader on ${leaderContract.chainId} Chain`}
            </span>
          </div>

          <Divider orientation="vertical" />

          <div className="flex w-[150px] flex-col items-center">
            <AddressWidget
              address={followerAddress as Address}
              className="text-sm"
            />

            <span className="text-xs text-neutral-400/60">
              {`Follower on ${followerContract.chainId} Chain`}
            </span>
          </div>
        </div>

        {/* <div className="flex flex-col font-mono">
          <span className="text-xs">
            Collateral:
            {`(${Number(strategy.minCollateral)} ~ ${Number(strategy.maxCollateral)}) USDC`}
          </span>
          <span className="text-xs">
            Leverage:
            {`(${strategy.minLeverage / 1000} ~ ${strategy.maxLeverage / 1000}) x`}
          </span>
        </div> */}

        <div className="flex flex-row items-center gap-3 font-mono">
          <ContractPnl
            label="Leader"
            contractId={bot.leaderContractId}
            finished={false}
            actions={validBotMisions.map((mission) =>
              mission.tasks.map((task) => task.action),
            )}
          />

          <ContractPnl
            label="Follower"
            contractId={bot.followerContractId}
            finished={false}
            actions={validBotMisions.map((mission) =>
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

          {bot.missions.length > 0 && (
            <LabeledChip value={bot.missions.length} unit="Missions" />
          )}

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
