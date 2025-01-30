"use client";

import { Address } from "viem";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { useGetAvailableFollowers } from "@/app/_hooks/useFollower";

import { Chip, Skeleton } from "@nextui-org/react";
import { PnlSnapshotKind } from "@/graphql/gql/graphql";
import { useGetPnlSnapshotsByAddress } from "@/app/_hooks/useHistory";

export type FollowerInfoWidgetProps = {
  follower: {
    address: string;
    accountIndex: number;
    publicKey: string;
    ethBalance: number;
    usdcBalance: number;
    contractId: number;
  };
  kind: PnlSnapshotKind;
};

export function FollowerInfoWidget({
  follower,
  kind,
}: FollowerInfoWidgetProps) {
  const availableFollowers = useGetAvailableFollowers();
  const { pnlSnapshots, loading } = useGetPnlSnapshotsByAddress(
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

  const accUSDPnl =
    pnlSnapshots.find((item) => item.kind === kind)?.accUSDPnl || 0;

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

        {loading ? (
          <Skeleton className="rounded-lg">
            <div className="h-8 w-[80px] rounded-full bg-default-300" />
          </Skeleton>
        ) : (
          <Chip color={accUSDPnl >= 0 ? "warning" : "danger"}>
            {accUSDPnl} USDC
          </Chip>
        )}

        {availableFollowers
          .map((item) => item.address)
          .includes(follower.address) ? (
          <Chip>Available</Chip>
        ) : null}
      </div>
    </div>
  );
}
