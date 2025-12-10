"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useDepositAsset } from "@/app/_hooks/useFollower";
import { NumericInput } from "@/components/inputs/NumericInput";

export type DepositAssetModalProps = {
  isOpen: boolean;
  followerAddress: string;
  contractId: number;
  onOpenChange: (value: boolean) => void;
};

export function DepositAssetModal({
  isOpen,
  followerAddress,
  contractId,
  onOpenChange,
}: DepositAssetModalProps) {
  const { depositAsset, loading } = useDepositAsset();

  const [ethAmount, setEthAmount] = useState("0");
  const [usdcAmount, setUSDCAmount] = useState("0");

  const handleDepositETH = () => {
    if (ethAmount.trim() === "") {
      return;
    }

    const ethAmountNum = +ethAmount;

    if (Number.isNaN(ethAmountNum)) {
      return;
    }

    depositAsset({
      variables: {
        input: {
          contractId,
          amount: Math.floor(ethAmountNum * 1e18).toString(),
          address: followerAddress.toLowerCase(),
          kind: "eth",
        },
      },
    });
  };

  const handleDepositUSDC = () => {
    if (usdcAmount.trim() === "") {
      return;
    }

    const usdcAmountNum = +usdcAmount;

    if (Number.isNaN(usdcAmountNum)) {
      return;
    }

    depositAsset({
      variables: {
        input: {
          contractId,
          amount: Math.floor(usdcAmountNum * 1e6).toString(),
          address: followerAddress.toLowerCase(),
          kind: "usdc",
        },
      },
    });
  };

  const isDisabledETHDeposit =
    ethAmount.trim() === "" || Number.isNaN(+ethAmount);
  const isDisabledUSDCDeposit =
    usdcAmount.trim() === "" || Number.isNaN(+usdcAmount);

  return (
    <StandardModal
      isOpen={isOpen}
      isDismissable={false}
      onOpenChange={onOpenChange}
      backdrop="blur"
    >
      <div className="flex flex-col gap-3.5">
        <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
          Deposit Assets to Follower Wallet
        </h1>

        <div className="flex flex-row items-center gap-4">
          <NumericInput
            amount={ethAmount}
            onChange={setEthAmount}
            label="ETH Amount"
          />

          <Button
            onPress={handleDepositETH}
            isDisabled={isDisabledETHDeposit}
            isLoading={loading}
            className="w-[180px]"
          >
            Deposit ETH
          </Button>
        </div>

        <div className="flex flex-row items-center gap-4">
          <NumericInput
            amount={usdcAmount}
            onChange={setUSDCAmount}
            label="USDC Amount"
          />

          <Button
            onPress={handleDepositUSDC}
            isDisabled={isDisabledUSDCDeposit}
            isLoading={loading}
            className="w-[180px]"
          >
            Deposit USDC
          </Button>
        </div>
      </div>
    </StandardModal>
  );
}
