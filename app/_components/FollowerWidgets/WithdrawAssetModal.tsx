"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useWithdrawAssets } from "@/app/_hooks/useFollower";
import { NumericInput } from "@/components/inputs/NumericInput";

export type WithdrawAssetModalProps = {
  isOpen: boolean;
  followerAddress: string;
  contractId: number;
  onOpenChange: (value: boolean) => void;
};

export function WithdrawAssetModal({
  isOpen,
  followerAddress,
  contractId,
  onOpenChange,
}: WithdrawAssetModalProps) {
  const { withdrawAsset, loading } = useWithdrawAssets();

  const [ethAmount, setEthAmount] = useState("0");
  const [usdcAmount, setUSDCAmount] = useState("0");

  const handleWithdrawETH = () => {
    if (ethAmount.trim() === "") {
      return;
    }

    const ethAmountNum = +ethAmount;

    if (Number.isNaN(ethAmountNum)) {
      return;
    }

    withdrawAsset({
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

  const handleWithdrawUSDC = () => {
    if (usdcAmount.trim() === "") {
      return;
    }

    const usdcAmountNum = +usdcAmount;

    if (Number.isNaN(usdcAmountNum)) {
      return;
    }

    withdrawAsset({
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

  const isDisabledETHWithdraw =
    ethAmount.trim() === "" || Number.isNaN(+ethAmount);
  const isDisabledUSDCWithdraw =
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
          Withdraw Assets to Master Wallet
        </h1>

        <div className="flex flex-row items-center gap-4">
          <NumericInput
            amount={ethAmount}
            onChange={setEthAmount}
            label="ETH Amount"
          />

          <Button
            onPress={handleWithdrawETH}
            isDisabled={isDisabledETHWithdraw}
            isLoading={loading}
            className="w-[180px]"
          >
            Withdraw ETH
          </Button>
        </div>

        <div className="flex flex-row items-center gap-4">
          <NumericInput
            amount={usdcAmount}
            onChange={setUSDCAmount}
            label="USDC Amount"
          />

          <Button
            onPress={handleWithdrawUSDC}
            isDisabled={isDisabledUSDCWithdraw}
            isLoading={loading}
            className="w-[180px]"
          >
            Withdraw USDC
          </Button>
        </div>
      </div>
    </StandardModal>
  );
}
