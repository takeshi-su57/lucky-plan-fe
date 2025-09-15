"use client";

import { useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { LeaderParams } from "@/types";
import { SelectLeadersFromLeaderboard } from "./SelectLeadersFromLeaderboard";
import { SelectLeadersByManual } from "./SelectLeadersByManual";

type Tab = "leaderboard" | "manual";

export type SelectLeadersProps = {
  leaders: LeaderParams[];
  onChangeLeaders: (leaders: LeaderParams[]) => void;
  endDate: Date;
  hideTags: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
};

export function SelectLeaders({
  leaders,
  onChangeLeaders,
  endDate,
  hideTags,
  onNextStep,
  onPrevStep,
}: SelectLeadersProps) {
  const [tab, setTab] = useState<Tab>("leaderboard");

  return (
    <div className="flex flex-col gap-2">
      <Tabs
        selectedKey={tab}
        onSelectionChange={(value) => value && setTab(value as Tab)}
      >
        <Tab key="leaderboard" title="Leaderboard" />
        <Tab key="manual" title="Manual" />
      </Tabs>

      {tab === "leaderboard" && (
        <SelectLeadersFromLeaderboard
          leaders={leaders}
          onChangeLeaders={onChangeLeaders}
          endDate={endDate}
          hideTags={hideTags}
          onNextStep={onNextStep}
          onPrevStep={onPrevStep}
        />
      )}

      {tab === "manual" && (
        <SelectLeadersByManual
          leaders={leaders}
          onChangeLeaders={onChangeLeaders}
          onNextStep={onNextStep}
          onPrevStep={onPrevStep}
        />
      )}
    </div>
  );
}
