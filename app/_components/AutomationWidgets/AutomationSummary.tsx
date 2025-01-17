"use client";

import { Badge, Chip, Divider } from "@nextui-org/react";
import { Address } from "viem";
import dayjs from "dayjs";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { BotDetails, BotStatus, TaskStatus } from "@/graphql/gql/graphql";
import { useGetTasksByStatus } from "@/app/_hooks/useTask";

const colorsByBotsStatus: Record<BotStatus, "default" | "success" | "danger"> =
  {
    [BotStatus.Created]: "default",
    [BotStatus.Live]: "success",
    [BotStatus.Stop]: "danger",
    [BotStatus.Dead]: "default",
  };

export type AutomationSummaryProps = {
  bot: BotDetails;
};

export function AutomationSummary({ bot }: AutomationSummaryProps) {
  const { satistic: createdStatistic } = useGetTasksByStatus(
    TaskStatus.Created,
  );
  const { satistic: awaitedStatistic } = useGetTasksByStatus(TaskStatus.Await);
  const { satistic: initiatedStatistic } = useGetTasksByStatus(
    TaskStatus.Initiated,
  );
  const { satistic: failedStatistic } = useGetTasksByStatus(TaskStatus.Failed);

  const { leaderContract, followerContract, strategy } = bot;

  const createdCount = createdStatistic[bot.id]
    ? Object.values(createdStatistic[bot.id]).reduce(
        (acc, item) => acc + item,
        0,
      )
    : 0;

  const awaitedCount = awaitedStatistic[bot.id]
    ? Object.values(awaitedStatistic[bot.id]).reduce(
        (acc, item) => acc + item,
        0,
      )
    : 0;

  const initiatedCount = initiatedStatistic[bot.id]
    ? Object.values(initiatedStatistic[bot.id]).reduce(
        (acc, item) => acc + item,
        0,
      )
    : 0;

  const failedCount = failedStatistic[bot.id]
    ? Object.values(failedStatistic[bot.id]).reduce(
        (acc, item) => acc + item,
        0,
      )
    : 0;

  return (
    <div className="flex items-center justify-between gap-6 text-neutral-400">
      <div className="flex items-center gap-6">
        <Chip>{bot.id}</Chip>

        <div className="flex flex-col">
          <div className="flex h-5 flex-row items-center gap-3">
            <span className="text-xs">{`Chain:${leaderContract.chainId}`}</span>
            <Divider orientation="vertical" />
            <AddressWidget
              address={leaderContract.address as Address}
              className="text-xs"
            />
          </div>
          <div className="flex h-5 flex-row items-center gap-3">
            <span className="text-xs">
              {`Chain:${followerContract.chainId}`}
            </span>
            <Divider orientation="vertical" />
            <AddressWidget
              address={followerContract.address as Address}
              className="text-xs"
            />
          </div>
        </div>

        <div className="flex flex-col font-mono">
          <span className="text-xs">
            {`${strategy.strategyKey}(${strategy.id}, ${strategy.ratio}%)`}
          </span>
          <span className="text-xs">
            Collateral:
            {`(${Number(strategy.minCollateral)} ~ ${Number(strategy.maxCollateral)}) USDC`}
          </span>
        </div>

        <div className="flex flex-col font-mono">
          <span className="text-xs">
            Leverage:
            {`(${strategy.minLeverage / 1000} ~ ${strategy.maxLeverage / 1000}) x`}
          </span>
          <span className="text-xs">
            Capacity:
            {`(${Number(strategy.maxCapacity)} ~ ${Number(strategy.minCapacity)}) USDC`}
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

      <Chip color={colorsByBotsStatus[bot.status]}>{bot.status}</Chip>
    </div>
  );
}
