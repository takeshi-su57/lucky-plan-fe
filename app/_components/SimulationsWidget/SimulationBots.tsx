"use client";

import { useMemo, useState } from "react";

import { PaginatedViews } from "@/components/views/PaginatedViews";
import { SimulationGroupedBots } from "./SimulationGroupedBots";
import { Platform, SimulationBotDetails } from "@/graphql/gql/graphql";

const PAGE_SIZE = 10;

export type SimulationBotsProps = {
  cursor: Date;
  simulationBots: SimulationBotDetails[];
};

export function SimulationBots({
  cursor,
  simulationBots,
}: SimulationBotsProps) {
  const [page, setPage] = useState(1);

  const { items, totalPages } = useMemo(() => {
    const groupMap = new Map<
      string,
      {
        leaderAddress: string;
        platform: Platform;
        simulatoinBots: SimulationBotDetails[];
      }
    >();

    for (const simulationBot of simulationBots) {
      const key = `${simulationBot.leaderAddress.toLowerCase()}${simulationBot.leaderContract.platform}`;
      const existing = groupMap.get(key);

      if (existing) {
        existing.simulatoinBots.push(simulationBot);
      } else {
        groupMap.set(key, {
          leaderAddress: simulationBot.leaderAddress,
          platform: simulationBot.leaderContract.platform,
          simulatoinBots: [simulationBot],
        });
      }
    }

    const sortedGroups = Array.from(groupMap.values());

    const totalGroups = sortedGroups.length;
    const totalPages = Math.ceil(totalGroups / PAGE_SIZE);
    const startIndex = (page - 1) * PAGE_SIZE;
    const items = sortedGroups.slice(startIndex, startIndex + PAGE_SIZE);

    return {
      items,
      totalPages,
    };
  }, [page, simulationBots]);

  return (
    <PaginatedViews
      currentPage={page}
      totalPages={totalPages}
      onChangePage={setPage}
      loading={false}
    >
      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <SimulationGroupedBots
            key={`${item.leaderAddress}-${item.platform}`}
            cursor={cursor}
            simulationBots={item.simulatoinBots}
            leaderAddress={item.leaderAddress}
            platform={item.platform}
          />
        ))}
      </div>
    </PaginatedViews>
  );
}
