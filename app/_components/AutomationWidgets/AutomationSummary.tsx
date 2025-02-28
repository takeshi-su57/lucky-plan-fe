"use client";

import { Badge, Chip, Divider } from "@nextui-org/react";
import { Address } from "viem";
import dayjs from "dayjs";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import {
  BotForwardDetails,
  BotStatus,
  TaskStatus,
} from "@/graphql/gql/graphql";
import { useGetAlertTasks } from "@/app/_hooks/useTask";
import { LabeledChip } from "@/components/chips/LabeledChip";

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

  return (
    <div className="flex items-center justify-between gap-6 text-neutral-400">
      <div className="flex items-center gap-6">
        <Chip>{bot.id}</Chip>

        <div className="flex flex-col">
          <div className="flex h-5 flex-row items-center gap-3">
            <span className="text-xs">{`Chain:${leaderContract.chainId}`}</span>
            <Divider orientation="vertical" />
            <AddressWidget
              address={leaderAddress as Address}
              className="text-xs"
            />
          </div>
          <div className="flex h-5 flex-row items-center gap-3">
            <span className="text-xs">
              {`Chain:${followerContract.chainId}`}
            </span>
            <Divider orientation="vertical" />
            <AddressWidget
              address={followerAddress as Address}
              className="text-xs"
            />
          </div>
        </div>

        <div className="flex flex-col font-mono">
          <span className="text-xs">
            Collateral:
            {`(${Number(strategy.minCollateral)} ~ ${Number(strategy.maxCollateral)}) USDC`}
          </span>
          <span className="text-xs">
            Leverage:
            {`(${strategy.minLeverage / 1000} ~ ${strategy.maxLeverage / 1000}) x`}
          </span>
        </div>

        <div className="flex flex-col font-mono">
          <span className="text-xs">
            Started At:
            {bot.startedAt
              ? dayjs(new Date(bot.startedAt)).format("YYYY/MM/DD hh:mm:ss")
              : "Not yet"}
          </span>
          <span className="text-xs">
            Ended At:
            {bot.endedAt
              ? dayjs(new Date(bot.endedAt)).format("YYYY/MM/DD hh:mm:ss")
              : "Not yet"}
          </span>
        </div>

        <div className="flex flex-row items-center gap-3 font-mono">
          <LabeledChip value={bot.missions.length} unit="Missions" />

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
