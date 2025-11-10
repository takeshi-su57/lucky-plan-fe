"use client";

import { useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useUpdateTp } from "@/app/_hooks/useFollower";

import { NumericInput } from "@/components/inputs/NumericInput";

export type TpUpdateButtonProps = {
  address: string;
  contractId: number;
  index: number;
};

export function TpUpdateButton({
  address,
  contractId,
  index,
}: TpUpdateButtonProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const { updateTp, loading } = useUpdateTp();

  const [tpPrice, setTpPrice] = useState("0");

  const handleUpdate = () => {
    if (tpPrice.trim() === "") {
      return;
    }

    updateTp({
      variables: {
        input: {
          address,
          contractId,
          index,
          newTp: tpPrice,
        },
      },
      onCompleted: () => {
        setTpPrice("0");
        onClose();
      },
    });
  };

  const isDisabledUpdate = tpPrice.trim() === "";

  return (
    <>
      <Button color="default" size="sm" onClick={onOpen} isLoading={loading}>
        Update TP
      </Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Update TP
          </h1>

          <div className="flex flex-row items-center gap-4">
            <NumericInput
              amount={tpPrice}
              onChange={setTpPrice}
              label="TP Price (BigInt)"
            />

            <Button
              onClick={handleUpdate}
              isDisabled={isDisabledUpdate}
              isLoading={loading}
              className="w-[180px]"
            >
              Update TP
            </Button>
          </div>
        </div>
      </StandardModal>
    </>
  );
}
