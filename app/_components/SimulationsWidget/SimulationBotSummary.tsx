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
        .map((position) =>
          position.histories.map((history) => history.follower.usdPnl),
        )
        .flat()
        .reduce((acc, item) => acc + item, 0),
    [simulationBot],
  );

  const botStatus = simulationBot.stoppedAt ? "Stop" : "Live";

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
            <span className="truncate">Ratio {simulationBot.ratio}x</span>
            <span className="truncate">Direction {simulationBot.mode}</span>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2 font-mono">
          <div className="flex min-w-0 items-center gap-1">
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

      <Chip size="sm" color={botStatus === "Live" ? "success" : "danger"}>
        {botStatus}
      </Chip>
    </div>
  );
});
