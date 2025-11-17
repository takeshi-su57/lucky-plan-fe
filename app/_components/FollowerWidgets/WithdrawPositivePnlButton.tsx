"use client";

import { useState } from "react";
import { Button, useDisclosure } from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useWithdrawPositivePnl } from "@/app/_hooks/useFollower";

import { NumericInput } from "@/components/inputs/NumericInput";

export type WithdrawPositivePnlButtonProps = {
  address: string;
  contractId: number;
  index: number;
};

export function WithdrawPositivePnlButton({
  address,
  contractId,
  index,
}: WithdrawPositivePnlButtonProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const { withdrawPositivePnl, loading } = useWithdrawPositivePnl();

  const [amount, setAmount] = useState("0");

  const handleWithdraw = () => {
    if (amount.trim() === "") {
      return;
    }

    withdrawPositivePnl({
      variables: {
        input: {
          address,
          contractId,
          index,
          amountCollateral: amount,
        },
      },
      onCompleted: () => {
        setAmount("0");
        onClose();
      },
    });
  };

  const isDisabledWithdraw = amount.trim() === "";

  return (
    <>
      <Button color="success" size="sm" onClick={onOpen} isLoading={loading}>
        Withdraw Positive PNL
      </Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Withdraw Positive PNL
          </h1>

          <div className="flex flex-row items-center gap-4">
            <NumericInput
              amount={amount}
              onChange={setAmount}
              label="Amount (BigInt)"
            />

            <Button
              onClick={handleWithdraw}
              isDisabled={isDisabledWithdraw}
              isLoading={loading}
              className="w-[180px]"
            >
              Withdraw Positive PNL
            </Button>
          </div>
        </div>
      </StandardModal>
    </>
  );
}
