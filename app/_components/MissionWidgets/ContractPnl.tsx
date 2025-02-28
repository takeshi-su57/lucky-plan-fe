"use client";

import { useMemo } from "react";

import { useGetAllTradePairs } from "@/app-hooks/useContract";
import { useGetTradeCollaterals } from "@/app-hooks/useContract";

import { convertTradeActionToHistory } from "@/utils/convertTradeActionToHistory";
import { getPriceStr } from "@/utils/price";

import { LabeledChip } from "@/components/chips/LabeledChip";
import { Action } from "@/graphql/gql/graphql";

export type ContractPnlProps = {
  label: string;
  contractId: number;
  actions: Action[];
  showZero?: boolean;
};

export function ContractPnl({
  label,
  contractId,
  actions,
  showZero,
}: ContractPnlProps) {
  const collaterals = useGetTradeCollaterals(contractId);
  const pairs = useGetAllTradePairs(contractId);

  const pnl = useMemo(() => {
    if (collaterals.length === 0 || pairs.length === 0) {
      return 0;
    }

    return actions.reduce((acc, action) => {
      const history = convertTradeActionToHistory(action, collaterals, pairs);

      return acc + (history?.pnl || 0) * (history?.collateralPriceUsd || 0);
    }, 0);
  }, [actions, collaterals, pairs]);

  if (actions.length === 0) {
    return (
      <LabeledChip label={label} value="No Actions" unit="$" isPrefix={true} />
    );
  }

  return (
    (showZero || pnl !== 0) && (
      <LabeledChip
        label={label}
        value={getPriceStr(pnl)}
        unit="$"
        isPrefix={true}
        color={pnl > 0 ? "warning" : "danger"}
      />
    )
  );
}
