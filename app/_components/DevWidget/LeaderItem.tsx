"use client";

import { Chip } from "@heroui/react";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { GoUnverified } from "react-icons/go";

import { getPriceStr } from "@/utils/price";
import { PersonalTradeHistory } from "@/types";

export type LeaderParams = {
  virtualId: string;
  leaderCollateral: number;
  address: string;
  isConfirmed: boolean;
  histories: PersonalTradeHistory[];
};

export function LeaderItem({ params }: { params: LeaderParams }) {
  const { address, leaderCollateral, isConfirmed } = params;

  return (
    <div className="flex flex-row gap-2 text-xs">
      <div className="flex flex-col gap-2">
        <span>Address: {address}</span>

        <div className="flex flex-row gap-2">
          <span>Leader Collateral: {getPriceStr(leaderCollateral)} USDC</span>
        </div>
      </div>

      {isConfirmed ? (
        <Chip color="success">
          <div className="flex flex-row items-center gap-2">
            <RiVerifiedBadgeLine size={20} />
            <span>Confirmed</span>
          </div>
        </Chip>
      ) : (
        <Chip color="danger">
          <div className="flex flex-row items-center gap-2">
            <GoUnverified size={24} />
            <span>Unconfirmed</span>
          </div>
        </Chip>
      )}
    </div>
  );
}
