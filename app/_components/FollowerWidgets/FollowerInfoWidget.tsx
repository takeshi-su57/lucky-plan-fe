"use client";

import { Address } from "viem";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import {
  useGetAvailableFollowers,
  useGetTradedOrders,
  useGetPendingOrders,
} from "@/app/_hooks/useFollower";

import { Chip, Skeleton } from "@nextui-org/react";

export type FollowerInfoWidgetProps = {
  follower: {
    address: string;
    accountIndex: number;
    publicKey: string;
    ethBalance: number;
    usdcBalance: number;
    contractId: number;
    accUSDPnl: number;
  };
};

export function FollowerInfoWidget({ follower }: FollowerInfoWidgetProps) {
  const availableFollowers = useGetAvailableFollowers([]);
  const { pendingOrders, loading: pendingOrdersLoading } = useGetPendingOrders(
    follower.address,
    follower.contractId,
  );
  const { trades, loading: tradedOrdersLoading } = useGetTradedOrders(
    follower.address,
    follower.contractId,
  );

  const items = [
    {
      id: "eth",
      label: "ETH",
      value: (Number(follower.ethBalance) / 1e18).toFixed(9) || "",
    },
    {
      id: "usdc",
      label: "USDC",
      value: Number(follower.usdcBalance) / 1e6,
    },
  ];

  const tradesCount = trades.length || 0;
  const pendingOrdersCount = pendingOrders.length || 0;

  return (
    <div className="flex flex-1 items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Chip>{follower.accountIndex}</Chip>
        <AddressWidget address={follower.address as Address} />

        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <span className="text-sm text-neutral-100">{item.value}</span>
            <span className="text-xs text-neutral-400">{item.label}</span>
          </div>
        ))}

        {follower.accUSDPnl !== 0 ? (
          <Chip color={follower.accUSDPnl > 0 ? "warning" : "danger"}>
            {follower.accUSDPnl} USDC
          </Chip>
        ) : null}

        {tradedOrdersLoading ? (
          <Skeleton className="rounded-lg">
            <div className="h-8 w-[80px] rounded-full bg-default-300" />
          </Skeleton>
        ) : tradesCount !== 0 ? (
          <Chip color="success">{tradesCount} Trades</Chip>
        ) : null}

        {pendingOrdersLoading ? (
          <Skeleton className="rounded-lg">
            <div className="h-8 w-[80px] rounded-full bg-default-300" />
          </Skeleton>
        ) : pendingOrdersCount !== 0 ? (
          <Chip color="secondary">{pendingOrdersCount} Pendings</Chip>
        ) : null}

        {availableFollowers
          .map((item) => item.address)
          .includes(follower.address) ? (
          <Chip>Available</Chip>
        ) : null}
      </div>
    </div>
  );
}
