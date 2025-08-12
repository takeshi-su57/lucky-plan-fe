"use client";

import { TaskForwardDetails } from "@/graphql/gql/graphql";

import { useGetTradeCollaterals } from "@/app-hooks/useContract";
import { convertTradeActionToHistory } from "@/utils/convertTradeActionToHistory";

import { PairChip } from "../LeaderboardWidgets/PairChip";
import { twMerge } from "tailwind-merge";

export type MissionHeaderProps = {
  task: TaskForwardDetails;
  contractId: number;
};

export function MissionHeader({ task, contractId }: MissionHeaderProps) {
  const collaterals = useGetTradeCollaterals(contractId);

  const history = convertTradeActionToHistory(
    contractId,
    task.action,
    collaterals,
  );

  if (!history) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <PairChip contractId={contractId} pairIndex={history.pairIndex} />

      <span
        className={twMerge(
          "text-lg",
          history.long ? "text-green-700" : "text-red-700",
        )}
      >
        {history.long ? "Long" : "Short"}
      </span>
    </div>
  );
}
