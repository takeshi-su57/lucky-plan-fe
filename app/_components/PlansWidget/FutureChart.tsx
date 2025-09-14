"use client";

import { Address } from "viem";
import { useState } from "react";
import { Switch } from "@nextui-org/react";

import { HistoriesWidget } from "../LeaderboardWidgets/HistoriesWidget/HistoriesWidget";

import { PersonalTradeHistory } from "@/types/index";

export type FutureChartProps = {
  address: string;
  leaderHistories: PersonalTradeHistory[];
  hideTags?: boolean;
};

export function FutureChart({
  address,
  leaderHistories,
  hideTags = false,
}: FutureChartProps) {
  const [showAllActivity, setShowAllActivity] = useState(false);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
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
        histories={leaderHistories}
        hideTags={hideTags}
        mode={
          showAllActivity ? "show_all_activity" : "show_only_valid_activity"
        }
      />
    </div>
  );
}
