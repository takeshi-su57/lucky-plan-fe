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

export type AllowanceHandleModalProps = {
  isOpen: boolean;
  follower: FollowerDetail;
  onOpenChange: (value: boolean) => void;
};

export function AllowanceHandleModal({
  isOpen,
  follower,
  onOpenChange,
}: AllowanceHandleModalProps) {
  const { decreaseAllowanceToZero, loading: decreaseAllowanceToZeroLoading } =
    useDecreaseAllowanceToZero();
  const { increaseAllowanceToMax, loading: increaseAllowanceToMaxLoading } =
    useIncreaseAllowanceToMax();

  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleDecreaseAllowanceToZero = () => {
    decreaseAllowanceToZero({
      variables: {
        contractId: +follower.contractId,
        followerAddress: follower.address,
        password: password.trim(),
      },
      onCompleted: () => {
        setPassword("");
      },
    });
  };

  const handleIncreaseAllowanceToMax = () => {
    increaseAllowanceToMax({
      variables: {
        contractId: +follower.contractId,
        followerAddress: follower.address,
        password: password.trim(),
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

        <span className="w-full text-sm wrap-break-word text-gray-500">
          {follower.usdcAllowance} USDC Allowance
        </span>

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

        <Button
          onPress={handleDecreaseAllowanceToZero}
          isLoading={decreaseAllowanceToZeroLoading}
        >
          Decrease Allowance to Zero
        </Button>

        <Button
          onPress={handleIncreaseAllowanceToMax}
          isLoading={increaseAllowanceToMaxLoading}
        >
          Increase Allowance to Max
        </Button>
      </div>
    </StandardModal>
  );
}
