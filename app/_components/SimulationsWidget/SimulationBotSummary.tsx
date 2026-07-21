"use client";

import { memo, useMemo } from "react";
import { Chip } from "@heroui/react";
import dayjs from "dayjs";

import { SimulationBotDetails } from "@/graphql/gql/graphql";
import { LabeledChip } from "@/components/chips/LabeledChip";
import { getPriceStr } from "@/utils/price";

export type SimulationBotSummaryProps = {
  simulationBot: SimulationBotDetails;
};

export const SimulationBotSummary = memo(function SimulationBotSummary({
  simulationBot,
}: SimulationBotSummaryProps) {
  const followerPnl = useMemo(
    () =>
      simulationBot.positions
        .map((position) => position.followerPnl)
        .reduce((acc, item) => acc + item, 0),
    [simulationBot],
  );

  const botStatus = simulationBot.stoppedAt ? "Stop" : "Live";
  const cacheState = simulationBot.cacheState;
  const cacheLabel = cacheState
    ? cacheState.rebuilding
      ? "Rebuilding"
      : cacheState.rebuildRequested
        ? "Queued"
        : cacheState.completed
          ? "Ready"
          : "Pending"
    : "Untracked";
  const cacheColor = cacheState?.lastError
    ? "danger"
    : cacheState?.rebuilding
      ? "warning"
      : cacheState?.completed
        ? "success"
        : "default";

  return (
    <div className="flex min-w-0 items-center justify-between gap-4 text-neutral-400">
      <div className="flex min-w-0 items-center gap-4">
        <Chip size="sm" variant="flat">
          {simulationBot.id}
        </Chip>

        <div className="flex min-w-0 flex-col">
          <span className="truncate">
            Start At {dayjs(simulationBot.startedAt).format("YYYY-MM-DD")}
          </span>
          {simulationBot.stoppedAt && (
            <span className="truncate">
              Stopped At {dayjs(simulationBot.stoppedAt).format("YYYY-MM-DD")}
            </span>
          )}
        </div>

        <div className="grid min-w-0 grid-cols-[minmax(160px,1fr)_minmax(180px,1fr)_120px] items-center gap-4 font-mono text-xs">
          <div className="flex min-w-0 flex-col">
            <span className="truncate">
              Base ratio {simulationBot.baseRatio}x
            </span>
            <span className="truncate">
              Score {simulationBot.score.toFixed(2)}
            </span>
            <span className="truncate">
              L2 collateral {getPriceStr(simulationBot.minCollateral)}-
              {getPriceStr(simulationBot.maxCollateral)}
            </span>
            <span className="truncate">
              L2 size {getPriceStr(simulationBot.minSize)}-
              {getPriceStr(simulationBot.maxSize)}
            </span>
            <span className="truncate">
              L2 leverage {simulationBot.minLeverage}x-
              {simulationBot.maxLeverage}x
            </span>
            <span className="truncate">Direction {simulationBot.mode}</span>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2 font-mono">
          <div className="flex min-w-0 items-center gap-1">
            <LabeledChip
              size="sm"
              variant="flat"
              color={cacheColor}
              value={cacheLabel}
              unit="Cache"
            />
            {simulationBot.totalPositions > 0 ? (
              <LabeledChip
                size="sm"
                variant="flat"
                color="secondary"
                value={simulationBot.totalPositions}
                unit="Total Positions"
              />
            ) : null}
            {simulationBot.openedPositions > 0 ? (
              <LabeledChip
                size="sm"
                variant="flat"
                color="success"
                value={simulationBot.openedPositions}
                unit="Opened Positions"
              />
            ) : null}

            {simulationBot.totalPnl !== 0 ? (
              <LabeledChip
                size="sm"
                variant="flat"
                color="success"
                value={getPriceStr(simulationBot.totalPnl)}
                unit="Leader PnL"
              />
            ) : null}

            {followerPnl !== 0 ? (
              <LabeledChip
                size="sm"
                variant="flat"
                color="success"
                value={getPriceStr(followerPnl)}
                unit="Follower PnL"
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {cacheState?.lastFetchedAt ? (
          <Chip size="sm" variant="flat">
            {dayjs(cacheState.lastFetchedAt).format("MMM D, HH:mm")}
          </Chip>
        ) : null}
        <Chip size="sm" color={botStatus === "Live" ? "success" : "danger"}>
          {botStatus}
        </Chip>
      </div>
    </div>
  );
});
