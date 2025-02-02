"use client";

import { Button } from "@nextui-org/react";
import { JSONTree } from "react-json-tree";

import { useCancelOrderAfterTimeout } from "@/app-hooks/useFollower";

export type PendingOrderDetailsProps = {
  address: string;
  contractId: number;
  params: string;
};

export function PendingOrderDetails({
  address,
  contractId,
  params,
}: PendingOrderDetailsProps) {
  const cancelOrderAfterTimeout = useCancelOrderAfterTimeout();

  const args = JSON.parse(params);

  const handleClosePosition = () => {
    if (args.index === undefined) {
      return;
    }

    const index = +args.index;

    if (Number.isNaN(index)) {
      return;
    }

    cancelOrderAfterTimeout({
      variables: {
        input: {
          address,
          contractId,
          index,
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 border-t border-t-neutral-400/20 py-6">
      <div className="flex flex-row items-center gap-4">
        <Button
          onClick={handleClosePosition}
          color="danger"
          className="w-fit"
          size="sm"
        >
          Close Position
        </Button>
      </div>

      <JSONTree data={args} />
    </div>
  );
}
