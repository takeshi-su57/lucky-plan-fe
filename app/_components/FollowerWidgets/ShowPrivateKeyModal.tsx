"use client";

import { useEffect } from "react";

import { StandardModal } from "@/components/modals/StandardModal";

import { Spinner } from "@nextui-org/react";

import { Address } from "viem";
import { useGetFollowerPrivateKey } from "@/app/_hooks/useFollower";

export type ShowPrivateKeyModalProps = {
  address: Address;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

export function ShowPrivateKeyModal({
  address,
  isOpen,
  onOpenChange,
}: ShowPrivateKeyModalProps) {
  const { getPrivateKey, data } = useGetFollowerPrivateKey();

  useEffect(() => {
    getPrivateKey({
      variables: {
        input: {
          address,
        },
      },
    });
  }, [address, getPrivateKey]);

  return (
    <StandardModal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <div className="flex flex-col gap-3.5">
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
          Follower Private Key
        </h1>

        {!data ? (
          <Spinner size="lg" />
        ) : (
          <span className="text-clip text-wrap break-words">
            {data.getFollowerPrivateKey}
          </span>
        )}
      </div>
    </StandardModal>
  );
}
