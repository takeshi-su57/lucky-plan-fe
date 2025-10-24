"use client";

import { useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useDecreasePositionSize } from "@/app/_hooks/useFollower";

import { NumericInput } from "@/components/inputs/NumericInput";

export type DecreasePositionButtonProps = {
  address: string;
  contractId: number;
  index: number;
  pairIndex: number;
};

export function DecreasePositionButton({
  address,
  contractId,
  index,
  pairIndex,
}: DecreasePositionButtonProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const { decreasePositionSize, loading } = useDecreasePositionSize();

  const [leverageDelta, setLeverageDelta] = useState("0");
  const [collateralDelta, setCollateralDelta] = useState("0");

  const handleUpdate = () => {
    decreasePositionSize({
      variables: {
        input: {
          address,
          contractId,
          index,
          pairIndex,
          leverageDelta: Number(leverageDelta) * 1000,
          collateralDelta: Math.floor(Number(collateralDelta) * 1e6).toString(),
        },
      },
      onCompleted: () => {
        setLeverageDelta("0");
        setCollateralDelta("0");
        onClose();
      },
    });
  };

  const isDisabledUpdate =
    leverageDelta.trim() === "" || collateralDelta.trim() === "";

  return (
    <>
      <Button color="secondary" size="sm" onClick={onOpen} isLoading={loading}>
        Decrease Position
      </Button>

      <StandardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Decrease Position
          </h1>

          <div className="flex flex-col gap-4">
            <NumericInput
              amount={leverageDelta}
              onChange={setLeverageDelta}
              label="Leverage Delta"
            />

            <NumericInput
              amount={collateralDelta}
              onChange={setCollateralDelta}
              label="Collateral Delta"
            />

            <Button
              onClick={handleUpdate}
              isDisabled={isDisabledUpdate}
              isLoading={loading}
              className="w-[180px]"
            >
              Decrease Position
            </Button>
          </div>
        </div>
      </StandardModal>
    </>
  );
}
