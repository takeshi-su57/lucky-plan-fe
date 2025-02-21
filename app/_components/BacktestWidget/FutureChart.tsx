"use client";

import { Address } from "viem";
import { useState } from "react";
import { Switch } from "@nextui-org/react";

import { HistoriesWidget } from "../LeaderboardWidgets/HistoriesWidget";

import { PersonalTradeHistory } from "@/types/index";

export type FutureChartProps = {
  startDate: Date;
  endDate: Date;
  leaderContractId: number;
  followerContractId: number;
  address: string;
  leaderHistories: PersonalTradeHistory[];
  followerHistories: PersonalTradeHistory[];
};

export function FutureChart({
  startDate,
  endDate,
  leaderContractId,
  followerContractId,
  address,
  leaderHistories,
  followerHistories,
}: FutureChartProps) {
  const [isLeaderChart, setIsLeaderChart] = useState(true);
  const [isAllTime, setIsAllTime] = useState(false);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <Switch
          isSelected={isLeaderChart}
          onValueChange={setIsLeaderChart}
          size="sm"
        >
          {isLeaderChart ? "Leader Chart" : "Follower Chart"}
        </Switch>

        <Switch isSelected={isAllTime} onValueChange={setIsAllTime} size="sm">
          {isAllTime ? "All Time" : "Past Week"}
        </Switch>
      </div>

      <HistoriesWidget
        address={address as Address}
        histories={isLeaderChart ? leaderHistories : followerHistories}
        contractId={isLeaderChart ? leaderContractId : followerContractId}
        hideTags={true}
        range={{
          to: endDate,
          from: isAllTime ? undefined : startDate,
        }}
      />
    </div>
  );
}
