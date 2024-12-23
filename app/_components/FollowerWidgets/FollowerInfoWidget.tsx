import { Address } from "viem";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { useGetAvailableFollowers } from "@/app/_hooks/useFollower";

import { Chip } from "@nextui-org/react";

export type FollowerInfoWidgetProps = {
  follower: {
    address: string;
    accountIndex: number;
    publicKey: string;
    ethBalance: number;
    usdcBalance: number;
    contractId: number;
  };
};

export function FollowerInfoWidget({ follower }: FollowerInfoWidgetProps) {
  const availableFollowers = useGetAvailableFollowers();

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

        {availableFollowers
          .map((item) => item.address)
          .includes(follower.address) ? (
          <Chip color="primary">Available</Chip>
        ) : null}
      </div>
    </div>
  );
}
