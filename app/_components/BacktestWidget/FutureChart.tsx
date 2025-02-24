"use client";

import { Address } from "viem";
import { useState } from "react";
import { Switch } from "@nextui-org/react";

import { HistoriesWidget } from "../LeaderboardWidgets/HistoriesWidget";

import { PersonalTradeHistory } from "@/types/index";
import dayjs from "dayjs";

export type FutureChartProps = {
  startDate: Date;
  endDate: Date;
  leaderContractId: number;
  followerContractId: number;
  address: string;
  leaderHistories: PersonalTradeHistory[];
  followerHistories: PersonalTradeHistory[];
  hideTags?: boolean;
};

export function FutureChart({
  startDate,
  endDate,
  leaderContractId,
  followerContractId,
  address,
  leaderHistories,
  followerHistories,
  hideTags = false,
}: FutureChartProps) {
  const [isLeaderChart, setIsLeaderChart] = useState(true);
  const [isPastWeek, setIsPastWeek] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);

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

        <Switch isSelected={isPastWeek} onValueChange={setIsPastWeek} size="sm">
          {isPastWeek ? "Past Week" : "All Time"}
        </Switch>

        <Switch
          isSelected={showAllActivity}
          onValueChange={setShowAllActivity}
          size="sm"
        >
          {showAllActivity ? "Show All Activities" : "Show Valid Activities"}
        </Switch>
      </div>

      <HistoriesWidget
        address={address as Address}
        histories={isLeaderChart ? leaderHistories : followerHistories}
        contractId={isLeaderChart ? leaderContractId : followerContractId}
        hideTags={hideTags}
        range={{
          to: endDate,
          from: isPastWeek
            ? dayjs(endDate).subtract(7, "day").toDate()
            : startDate,
        }}
        mode={
          showAllActivity ? "show_all_activity" : "show_only_valid_activity"
        }
      />
    </div>
  );
}
