"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useWithdrawAssets } from "@/app/_hooks/useFollower";
import { NumericInput } from "@/components/inputs/NumericInput";
import { useCollateralSymbols } from "@/app/_hooks/useCollateralSymbols";
import { getCollaterals } from "@/web3/gns/v10/configs";

export type WithdrawAssetModalProps = {
  isOpen: boolean;
  followerAddress: string;
  contractId: number;
  chainId: number | null;
  onOpenChange: (value: boolean) => void;
};

export function WithdrawAssetModal({
  isOpen,
  followerAddress,
  contractId,
  chainId,
  onOpenChange,
}: WithdrawAssetModalProps) {
  const { withdrawAsset, loading } = useWithdrawAssets();
  const collateralSymbols = useCollateralSymbols(chainId);

  const [ethAmount, setEthAmount] = useState("0");
  const [collateralAmounts, setCollateralAmounts] = useState<
    Record<number, string>
  >({});

  const collaterals = chainId ? getCollaterals(chainId) : [];

  const handleWithdrawETH = () => {
    if (ethAmount.trim() === "") return;
    const ethAmountNum = +ethAmount;
    if (Number.isNaN(ethAmountNum)) return;

    withdrawAsset({
      variables: {
        input: {
          contractId,
          amount: Math.floor(ethAmountNum * 1e18).toString(),
          address: followerAddress.toLowerCase(),
          kind: "eth",
          collateralIndex: 0,
        },
      },
    });
  };

  const handleWithdrawCollateral = (collateralIndex: number) => {
    const amount = collateralAmounts[collateralIndex] || "0";
    if (amount.trim() === "") return;
    const amountNum = +amount;
    if (Number.isNaN(amountNum)) return;

    const collateral = collaterals.find(
      (c) => c.collateralIndex === collateralIndex,
    );
    if (!collateral) return;

    withdrawAsset({
      variables: {
        input: {
          contractId,
          amount: Math.floor(
            amountNum * Number(collateral.precision),
          ).toString(),
          address: followerAddress.toLowerCase(),
          kind: "erc20",
          collateralIndex,
        },
      },
    });
  };

  const isDisabledETHWithdraw =
    ethAmount.trim() === "" || Number.isNaN(+ethAmount);

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
            className="w-45"
          >
            Withdraw ETH
          </Button>
        </div>

        {collaterals.map((collateral) => {
          const symbol =
            collateralSymbols[collateral.collateralIndex] ||
            `C${collateral.collateralIndex}`;
          const amount = collateralAmounts[collateral.collateralIndex] || "0";
          const isDisabled = amount.trim() === "" || Number.isNaN(+amount);

          return (
            <div
              key={collateral.collateralIndex}
              className="flex flex-row items-center gap-4"
            >
              <NumericInput
                amount={amount}
                onChange={(val) =>
                  setCollateralAmounts((prev) => ({
                    ...prev,
                    [collateral.collateralIndex]: val,
                  }))
                }
                label={`${symbol} Amount`}
              />

              <Button
                onPress={() =>
                  handleWithdrawCollateral(collateral.collateralIndex)
                }
                isDisabled={isDisabled}
                isLoading={loading}
                className="w-45"
              >
                Withdraw {symbol}
              </Button>
            </div>
          );
        })}
      </div>
    </StandardModal>
  );
}
