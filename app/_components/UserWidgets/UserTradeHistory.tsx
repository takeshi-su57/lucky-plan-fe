"use client";

import { Address } from "viem";
import { useGetAllTradeHistory } from "@/app/_hooks/useHistory";

import { HistoriesWidget } from "../LeaderboardWidgets/HistoriesWidget";

export type UserTradeHistoryProps = {
  address: Address;
  contractId: string;
};

export function UserTradeHistory({
  address,
  contractId,
}: UserTradeHistoryProps) {
  const allHistories = useGetAllTradeHistory(address, contractId);

  return (
    <HistoriesWidget
      address={address}
      contractId={+contractId}
      histories={allHistories}
      hideTags={false}
    />
  );
}
