"use client";

import { useState } from "react";
import { Button, useDisclosure } from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useUpdateSl } from "@/app/_hooks/useFollower";

import { NumericInput } from "@/components/inputs/NumericInput";

export type SlUpdateButtonProps = {
  address: string;
  contractId: number;
  index: number;
};

export function SlUpdateButton({
  address,
  contractId,
  index,
}: SlUpdateButtonProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const { updateSl, loading } = useUpdateSl();

  const [slPrice, setSlPrice] = useState("0");

  const handleUpdate = () => {
    if (slPrice.trim() === "") {
      return;
    }

    updateSl({
      variables: {
        input: {
          address,
          contractId,
          index,
          newSl: slPrice,
        },
      },
      onCompleted: () => {
        setSlPrice("0");
        onClose();
      },
    });
  };

  const isDisabledUpdate = slPrice.trim() === "";

  return (
    <>
      <Button color="default" size="sm" onClick={onOpen} isLoading={loading}>
        Update SL
      </Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Update SL
          </h1>

          <div className="flex flex-row items-center gap-4">
            <NumericInput
              amount={slPrice}
              onChange={setSlPrice}
              label="SL Price (BigInt)"
            />

            <Button
              onClick={handleUpdate}
              isDisabled={isDisabledUpdate}
              isLoading={loading}
              className="w-[180px]"
            >
              Update SL
            </Button>
          </div>
        </div>
      </StandardModal>
    </>
  );
}
