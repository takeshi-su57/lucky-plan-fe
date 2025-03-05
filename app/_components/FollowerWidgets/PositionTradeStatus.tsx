"use client";

import { Skeleton } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import { useGetPrices } from "@/app-hooks/useGetPrices";
import { LabeledChip } from "@/components/chips/LabeledChip";

import { getPNLPercentage } from "@/utils";
import { getPercentageStr, getPriceStr } from "@/utils/price";

export type PositionTradeStatusProps = {
  collateralAmount: number;
  leverage: number;
  openPrice: number;
  long: boolean;
  pairIndex: number;
};

export function PositionTradeStatus({
  collateralAmount,
  leverage,
  openPrice,
  long,
  pairIndex,
}: PositionTradeStatusProps) {
  const prices = useGetPrices();

  const currentPrice = prices?.[pairIndex];

  if (currentPrice === undefined) {
    return (
      <Skeleton className="rounded-lg">
        <div className="h-8 w-[100px] rounded-full bg-default-300" />
      </Skeleton>
    );
  }

  const pnlPercentage = getPNLPercentage({
    closePrice: currentPrice,
    openPrice,
    leverage,
    long,
  });

  const pnl = (collateralAmount * pnlPercentage) / 100;

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-row items-center gap-2 text-neutral-400">
        <span className="text-xs">Size:</span>
        <span className={twMerge("text-base font-bold")}>
          {`$${getPriceStr(collateralAmount)}`}
        </span>
      </div>

      <div className="flex flex-row items-center gap-2 text-neutral-400">
        <span className="text-xs">Leverage:</span>
        <span className={twMerge("text-base font-bold")}>{`${leverage}x`}</span>
      </div>

      <LabeledChip
        label="uPnL"
        value={`$${getPriceStr(pnl, 2)}  (${getPercentageStr(pnlPercentage)} %)`}
        unit="$"
        isPrefix={true}
        color={pnl > 0 ? "warning" : "danger"}
      />
    </div>
  );
}
