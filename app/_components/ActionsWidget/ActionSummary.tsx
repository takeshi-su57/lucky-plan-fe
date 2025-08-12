"use client";

import { Chip } from "@nextui-org/react";

import { Action } from "@/graphql/gql/graphql";
import { useGetTradeCollaterals } from "@/app-hooks/useContract";
import { convertTradeActionToHistory } from "@/utils/convertTradeActionToHistory";
import { getPriceStr } from "@/utils/price";

export type ActionSummaryProps = {
  action: Action;
  contractId: number;
};

export function ActionSummary({ action, contractId }: ActionSummaryProps) {
  const collaterals = useGetTradeCollaterals(contractId);

  const history = convertTradeActionToHistory(contractId, action, collaterals);

  return (
    <div className="flex items-center gap-6">
      <Chip>{action.id}</Chip>
      <span className="text-sm text-neutral-400">{action.name}</span>
      {history ? (
        <>
          |
          <span className="text-sm text-neutral-400">
            Executed at ${getPriceStr(history.price)}
          </span>
          |
          <span className="text-sm text-neutral-400">
            {getPriceStr(history.size * history.collateralPriceUsd)} USDC
          </span>
          -
          <span className="text-sm text-neutral-400">{history.leverage} x</span>
        </>
      ) : null}
    </div>
  );
}
