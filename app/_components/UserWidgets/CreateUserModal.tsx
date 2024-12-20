"use client";

import { useState } from "react";

import { StandardModal } from "@/components/modals/StandardModal";

import { Button, Input } from "@nextui-org/react";

import { useAddNewUser } from "@/app/_hooks/useUser";
import { isAddress } from "viem";

export type CreateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (value: boolean) => void;
};

export function CreateUserModal({
  isOpen,
  onClose,
  onOpenChange,
}: CreateUserModalProps) {
  const mutateByAddUser = useAddNewUser();

  const [address, setAddress] = useState("");

  const handleConfirm = () => {
    if (!isAddress(address)) {
      return;
    }

    mutateByAddUser({
      variables: {
        input: {
          address,
        },
      },
    });

    onClose();
  };

  return (
    <StandardModal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <div className="flex flex-col gap-3.5">
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
          Add New User
        </h1>

        <Input
          variant="underlined"
          value={address}
          onValueChange={setAddress}
          label="Address"
        />

        <Button
          onClick={handleConfirm}
          color="primary"
          isDisabled={!isAddress(address)}
        >
          Confirm
        </Button>
      </div>
    </StandardModal>
  );
}
