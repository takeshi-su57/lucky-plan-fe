"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Input } from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";

import {
  useWithdrawETHToUser,
  useWithdrawErc20ToUser,
} from "@/app/_hooks/useFollower";
import { NumericInput } from "@/components/inputs/NumericInput";
import { useCollateralSymbols } from "@/app/_hooks/useCollateralSymbols";
import { getCollaterals } from "@/web3/gns/v10/configs";

export type WithdrawModalProps = {
  isOpen: boolean;
  contractId: number;
  chainId: number;
  onOpenChange: (value: boolean) => void;
};

export function WithdrawModal({
  isOpen,
  contractId,
  chainId,
  onOpenChange,
}: WithdrawModalProps) {
  const { withdrawETHToUser, loading: ethLoading } = useWithdrawETHToUser();
  const { withdrawErc20ToUser, loading: erc20Loading } =
    useWithdrawErc20ToUser();
  const collateralSymbols = useCollateralSymbols(chainId);

  const collaterals = getCollaterals(chainId);

  const [ethAmount, setEthAmount] = useState("0");
  const [collateralAmounts, setCollateralAmounts] = useState<
    Record<number, string>
  >({});

  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleWithdrawETH = () => {
    if (ethAmount.trim() === "") return;
    const ethAmountNum = +ethAmount;
    if (Number.isNaN(ethAmountNum)) return;

    withdrawETHToUser({
      variables: {
        contractId,
        amount: ethAmountNum,
        password: password.trim(),
      },
      onCompleted: () => {
        setPassword("");
      },
    });
  };

  const handleWithdrawCollateral = (collateralIndex: number) => {
    const amount = collateralAmounts[collateralIndex] || "0";
    if (amount.trim() === "") return;
    const amountNum = +amount;
    if (Number.isNaN(amountNum)) return;

    withdrawErc20ToUser({
      variables: {
        contractId,
        collateralIndex,
        amount: amountNum,
        password: password.trim(),
      },
      onCompleted: () => {
        setPassword("");
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
          Withdraw to User Wallet
        </h1>

        <Input
          className="max-w-xs"
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          }
          value={password}
          onValueChange={setPassword}
          label="Password"
          placeholder="Enter password"
          type={isVisible ? "text" : "password"}
          variant="bordered"
        />

        <div className="flex flex-row items-center gap-4">
          <NumericInput
            amount={ethAmount}
            onChange={setEthAmount}
            label="ETH Amount"
          />

          <Button
            onPress={handleWithdrawETH}
            isDisabled={isDisabledETHWithdraw}
            isLoading={ethLoading}
            className="w-[180px]"
          >
            Withdraw ETH
          </Button>
        </div>

        {collaterals.map((collateral) => {
          const symbol =
            collateralSymbols[collateral.collateralIndex] ||
            `C${collateral.collateralIndex}`;
          const amount =
            collateralAmounts[collateral.collateralIndex] || "0";
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
                isLoading={erc20Loading}
                className="w-[180px]"
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
