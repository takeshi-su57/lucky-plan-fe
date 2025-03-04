"use client";

import { useGetPrices } from "@/app/_hooks/useGetPrices";
import { getPNLPercentage } from "@/utils";
import { getPercentageStr, getPriceStr } from "@/utils/price";
import { Skeleton } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

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

      <div className="flex flex-row items-center gap-2 text-neutral-400">
        <span className="text-xs">Unrealized PNL:</span>
        <span
          className={twMerge(
            "text-base font-bold",
            pnlPercentage > 0 && "text-green-700",
            pnlPercentage < 0 && "text-red-700",
            pnlPercentage === 0 && "text-neutral-400",
          )}
        >
          {`$${getPriceStr(pnl, 2)}  (${getPercentageStr(pnlPercentage)} %)`}
        </span>
      </div>
    </div>
  );
}
