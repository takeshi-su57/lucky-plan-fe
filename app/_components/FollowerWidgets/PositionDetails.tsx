"use client";

import { Button } from "@nextui-org/react";
import { JSONTree } from "react-json-tree";

import { useCloseTradeMarket } from "@/app-hooks/useFollower";

export type PositionDetailsProps = {
  address: string;
  index: number;
  contractId: number;
  params: string;
};

export function PositionDetails({
  address,
  index,
  contractId,
  params,
}: PositionDetailsProps) {
  const { closeTradeMarket, loading } = useCloseTradeMarket();

  const trade = JSON.parse(params);

  const handleClosePosition = () => {
    if (trade.pairIndex === undefined) {
      return;
    }

    const pairIndex = +trade.pairIndex;

    if (Number.isNaN(pairIndex)) {
      return;
    }

    closeTradeMarket({
      variables: {
        input: {
          address,
          contractId,
          pairIndex,
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
          isDisabled={loading}
          isLoading={loading}
        >
          Close Position
        </Button>
      </div>

      <JSONTree data={trade} />
    </div>
  );
}
