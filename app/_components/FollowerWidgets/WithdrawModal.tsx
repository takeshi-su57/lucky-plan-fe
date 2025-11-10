"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Input } from "@nextui-org/react";

import { StandardModal } from "@/components/modals/StandardModal";

import {
  useWithdrawETHToUser,
  useWithdrawUSDCToUser,
} from "@/app/_hooks/useFollower";
import { NumericInput } from "@/components/inputs/NumericInput";

export type WithdrawModalProps = {
  isOpen: boolean;
  contractId: number;
  onOpenChange: (value: boolean) => void;
};

export function WithdrawModal({
  isOpen,
  contractId,
  onOpenChange,
}: WithdrawModalProps) {
  const { withdrawETHToUser, loading: ethLoading } = useWithdrawETHToUser();
  const { withdrawUSDCToUser, loading: usdcLoading } = useWithdrawUSDCToUser();

  const [ethAmount, setEthAmount] = useState("0");
  const [usdcAmount, setUSDCAmount] = useState("0");

  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleWithdrawETH = () => {
    if (ethAmount.trim() === "") {
      return;
    }

    const ethAmountNum = +ethAmount;

    if (Number.isNaN(ethAmountNum)) {
      return;
    }

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

  const handleWithdrawUSDC = () => {
    if (usdcAmount.trim() === "") {
      return;
    }

    const usdcAmountNum = +usdcAmount;

    if (Number.isNaN(usdcAmountNum)) {
      return;
    }

    withdrawUSDCToUser({
      variables: {
        contractId,
        amount: usdcAmountNum,
        password: password.trim(),
      },
      onCompleted: () => {
        setPassword("");
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
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
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
          label="New Password"
          placeholder="Enter new password"
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
            onClick={handleWithdrawETH}
            isDisabled={isDisabledETHWithdraw}
            isLoading={ethLoading}
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
            onClick={handleWithdrawUSDC}
            isDisabled={isDisabledUSDCWithdraw}
            isLoading={usdcLoading}
            className="w-[180px]"
          >
            Withdraw USDC
          </Button>
        </div>
      </div>
    </StandardModal>
  );
}
