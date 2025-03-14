"use client";

import { Address } from "viem";
import { useGetAllTradeHistory } from "@/app/_hooks/useHistory";

import { HistoriesWidget } from "../LeaderboardWidgets/HistoriesWidget/HistoriesWidget";

export type WalletAccountTradeHistoryProps = {
  address: Address;
  contractId: string;
  mode: "show_all_activity" | "show_only_valid_activity";
};

export function WalletAccountTradeHistory({
  address,
  contractId,
  mode,
}: WalletAccountTradeHistoryProps) {
  const allHistories = useGetAllTradeHistory(address, contractId);

  return (
    <HistoriesWidget
      address={address}
      contractId={+contractId}
      histories={allHistories}
      hideTags={false}
      mode={mode}
    />
  );
}
