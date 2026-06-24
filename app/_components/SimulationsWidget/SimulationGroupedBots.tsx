"use client";

import { memo } from "react";
import { Chip, Spinner } from "@heroui/react";
import { Address } from "viem";

import { useGetPerpTradePositions } from "@/app/_hooks/useHistory";
import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { Platform, SimulationBotDetails } from "@/graphql/gql/graphql";
import { PerpEventLogPnlChart } from "../LeaderboardWidgets/PerpEventLogPnlChart/PerpEventLogPnlChart";
import { SimulationBotModaledItem } from "./SimulationBotModaledItem";
import dayjs from "dayjs";

export type SimulationGroupedBotsProps = {
  cursor: Date;
  simulationBots: SimulationBotDetails[];
  leaderAddress: string;
  platform: Platform;
};

export const SimulationGroupedBots = memo(function SimulationGroupedBots({
  cursor,
  simulationBots,
  leaderAddress,
  platform,
}: SimulationGroupedBotsProps) {
  const { data, loading } = useGetPerpTradePositions(
    leaderAddress,
    platform,
    50,
    null,
    null,
    cursor,
  );

  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-neutral-700 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <AddressWidget
            address={leaderAddress as Address}
            className="text-sm"
          />

          <span className="text-xs text-neutral-500">Leader on {platform}</span>
          <Chip size="sm" variant="flat">
            {simulationBots.length} bots
          </Chip>
        </div>
      </div>

      {loading ? (
        <div className="flex w-full items-center justify-center py-12">
          <Spinner color="warning" size="lg" />
        </div>
      ) : (
        <PerpEventLogPnlChart
          address={leaderAddress as Address}
          platform={platform}
          positionsWithSummary={data || undefined}
          mode="lightweight"
          className="mb-0"
          startedAt={null}
          stoppedAt={null}
          endedAt={dayjs(cursor).subtract(1, "day").toDate()}
        />
      )}

      <div className="flex min-w-0 flex-col gap-4">
        <section className="border-default-200 bg-content1 flex min-w-0 flex-col gap-2 rounded-lg border p-3">
          <div className="flex flex-col gap-2">
            {simulationBots.map((bot) => (
              <SimulationBotModaledItem key={bot.id} simulationBot={bot} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
});
