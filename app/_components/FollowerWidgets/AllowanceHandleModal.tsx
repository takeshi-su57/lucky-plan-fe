"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Input } from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";

import {
  useDecreaseAllowanceToZero,
  useIncreaseAllowanceToMax,
} from "@/app/_hooks/useFollower";
import { FollowerDetail } from "@/graphql/gql/graphql";
import { useCollateralSymbols } from "@/app/_hooks/useCollateralSymbols";
import { getCollateral } from "@/web3/gns/v10/configs";

export type AllowanceHandleModalProps = {
  isOpen: boolean;
  follower: FollowerDetail;
  chainId: number | null;
  onOpenChange: (value: boolean) => void;
};

export function AllowanceHandleModal({
  isOpen,
  follower,
  chainId,
  onOpenChange,
}: AllowanceHandleModalProps) {
  const { decreaseAllowanceToZero, loading: decreaseAllowanceToZeroLoading } =
    useDecreaseAllowanceToZero();
  const { increaseAllowanceToMax, loading: increaseAllowanceToMaxLoading } =
    useIncreaseAllowanceToMax();

  const collateralSymbols = useCollateralSymbols(chainId);

  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleDecreaseAllowanceToZero = (collateralIndex: number) => {
    decreaseAllowanceToZero({
      variables: {
        contractId: +follower.contractId,
        followerAddress: follower.address,
        password: password.trim(),
        collateralIndex,
      },
      onCompleted: () => {
        setPassword("");
      },
    });
  };

  const handleIncreaseAllowanceToMax = (collateralIndex: number) => {
    increaseAllowanceToMax({
      variables: {
        contractId: +follower.contractId,
        followerAddress: follower.address,
        password: password.trim(),
        collateralIndex,
      },
      onCompleted: () => {
        setPassword("");
      },
    });
  };

  return (
    <StandardModal
      isOpen={isOpen}
      isDismissable={false}
      onOpenChange={onOpenChange}
      backdrop="blur"
    >
      <div className="flex flex-col gap-3.5">
        <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
          Allowance Handle
        </h1>

        <Input
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

        {(follower.collateralBalances || []).map((cb) => {
          const collateral = chainId
            ? getCollateral(chainId, cb.collateralIndex)
            : null;
          const precision = collateral ? Number(collateral.precision) : 1e6;
          const symbol =
            collateralSymbols[cb.collateralIndex] || `C${cb.collateralIndex}`;
          const allowanceDisplay =
            cb.allowance != null
              ? (Number(cb.allowance) / precision).toFixed(2)
              : "N/A";

          return (
            <div
              key={cb.collateralIndex}
              className="flex flex-col gap-2 rounded-lg border border-neutral-700 p-3"
            >
              <span className="text-sm text-gray-500">
                {symbol} Allowance: {allowanceDisplay}
              </span>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onPress={() =>
                    handleDecreaseAllowanceToZero(cb.collateralIndex)
                  }
                  isLoading={decreaseAllowanceToZeroLoading}
                >
                  Decrease to Zero
                </Button>

                <Button
                  size="sm"
                  onPress={() =>
                    handleIncreaseAllowanceToMax(cb.collateralIndex)
                  }
                  isLoading={increaseAllowanceToMaxLoading}
                >
                  Increase to Max
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </StandardModal>
  );
}
