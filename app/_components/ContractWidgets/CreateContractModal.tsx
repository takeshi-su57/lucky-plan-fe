"use client";

import { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { isAddress } from "viem";

import { StandardModal } from "@/components/tables/modals/StandardModal";
import { NumericInput } from "@/components/inputs/NumericInput";

import { useCreateContract } from "@/app-hooks/useContract";

export type CreateContractModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (value: boolean) => void;
};

export function CreateContractModal({
  isOpen,
  onClose,
  onOpenChange,
}: CreateContractModalProps) {
  const createContract = useCreateContract();

  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState("421614");
  const [description, setDescription] = useState("");

  const isDisabled =
    !isAddress(address) || Number.isNaN(+chainId) || description.trim() === "";

  console.log(chainId);

  const handleConfirm = () => {
    if (isDisabled) {
      return;
    }

    createContract({
      variables: {
        input: {
          chainId: +chainId,
          address,
          description,
        },
      },
    });

    onClose();
  };

  return (
    <StandardModal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <div className="flex flex-col gap-8">
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
          Create New Contract
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <NumericInput
            amount={chainId}
            onChange={setChainId}
            label="Chain Id"
          />
          <Input
            variant="underlined"
            value={address}
            placeholder="Enter a contract address"
            onValueChange={setAddress}
            label="Address"
          />

          <Textarea
            variant="underlined"
            label="Description"
            value={description}
            onValueChange={setDescription}
            placeholder="Enter a contract description"
            className="col-span-12 mb-6 md:col-span-6 md:mb-0"
          />
        </div>

        <Button onClick={handleConfirm} color="primary" isDisabled={isDisabled}>
          Save
        </Button>
      </div>
    </StandardModal>
  );
}
