"use client";

import { useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useUpdateLeverage } from "@/app/_hooks/useFollower";

import { NumericInput } from "@/components/inputs/NumericInput";

export type UpdateLeverageButtonProps = {
  address: string;
  contractId: number;
  index: number;
};

export function UpdateLeverageButton({
  address,
  contractId,
  index,
}: UpdateLeverageButtonProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const { updateLeverage, loading } = useUpdateLeverage();

  const [newLeverage, setNewLeverage] = useState("0");

  const handleUpdate = () => {
    if (newLeverage.trim() === "") {
      return;
    }

    updateLeverage({
      variables: {
        input: {
          address,
          contractId,
          index,
          newLeverage: Number(newLeverage) * 1000,
        },
      },
      onCompleted: () => {
        setNewLeverage("0");
        onClose();
      },
    });
  };

  const isDisabledUpdate = newLeverage.trim() === "";

  return (
    <>
      <Button color="secondary" size="sm" onClick={onOpen} isLoading={loading}>
        Update Leverage
      </Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Update Leverage
          </h1>

          <NumericInput
            amount={newLeverage}
            onChange={setNewLeverage}
            label="New Leverage"
          />

          <Button
            onClick={handleUpdate}
            isDisabled={isDisabledUpdate}
            isLoading={loading}
            className="w-[180px]"
          >
            Update Leverage
          </Button>
        </div>
      </StandardModal>
    </>
  );
}
