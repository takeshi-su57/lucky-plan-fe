import { Address } from "viem";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { FollowerDetailInfoFragment } from "@/graphql/gql/graphql";
import {
  useGetAvailableFollowers,
  useWithdrawAll,
} from "@/app/_hooks/useFollower";
import { useCallback } from "react";
import { Button, Chip, useDisclosure } from "@nextui-org/react";
import { ShowPrivateKeyModal } from "./ShowPrivateKeyModal";

export type FollowerInfoWidgetProps = {
  follower: FollowerDetailInfoFragment;
};

export function FollowerInfoWidget({ follower }: FollowerInfoWidgetProps) {
  const withdrawAll = useWithdrawAll();
  const availableFollowers = useGetAvailableFollowers();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const handleWithdrawAll = useCallback(() => {
    withdrawAll({
      variables: {
        input: {
          address: follower.address,
          contractId: +follower.contractId,
        },
      },
    });
  }, [follower.address, follower.contractId, withdrawAll]);

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

      <div className="flex items-center gap-2">
        <Button onClick={onOpen}>Get Key</Button>

        <Button onClick={handleWithdrawAll}>Withdraw All</Button>
      </div>

      <ShowPrivateKeyModal
        address={follower.address as Address}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
