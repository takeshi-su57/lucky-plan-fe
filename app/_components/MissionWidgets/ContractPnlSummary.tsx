"use client";

import { getPriceStr } from "@/utils/price";

import { LabeledChip } from "@/components/chips/LabeledChip";
import { useGetPrices } from "@/app-hooks/useGetPrices";
import { Skeleton } from "@heroui/react";
import { getPNLPercentage } from "@/utils";
import { OpenPosition } from "@/graphql/gql/graphql";

export type ContractPnlSummaryProps = {
  label: string;
  realizedPnl: number;
  realizedCount: number;
  openPositions: OpenPosition[];
  finished: boolean;
};

export function ContractPnlSummary({
  label,
  realizedPnl,
  realizedCount,
  openPositions,
  finished,
}: ContractPnlSummaryProps) {
  const prices = useGetPrices();

  const positions = finished ? [] : openPositions;

  if (prices === undefined) {
    return (
      <Skeleton className="rounded-lg">
        <div className="h-8 w-[100px] rounded-full bg-default-300" />
      </Skeleton>
    );
  }

  const sumOfnPnL = positions
    .map((position) => {
      const currentPrice = prices[position.pairIndex];

      if (currentPrice === undefined) {
        return 0;
      }

      const pnlPercentage = getPNLPercentage({
        closePrice: currentPrice,
        openPrice: position.openPrice,
        leverage: position.leverage,
        long: !!position.long,
      });

      return (position.size * pnlPercentage) / 100;
    })
    .reduce((acc, item) => acc + item, 0);

  if (positions.length === 0 && realizedCount === 0) {
    return null;
  }

  if (positions.length === 0) {
    return (
      <LabeledChip
        label={label}
        value={getPriceStr(realizedPnl, 1)}
        unit="$"
        isPrefix={true}
        color={realizedPnl > 0 ? "warning" : "danger"}
      />
    );
  }

  if (realizedCount === 0) {
    return (
      <LabeledChip
        label={label}
        value={getPriceStr(sumOfnPnL, 1)}
        unit="unrealized $"
        isPrefix={true}
        color={sumOfnPnL > 0 ? "warning" : "danger"}
      />
    );
  }

  return (
    <LabeledChip
      label={label}
      value={`${getPriceStr(realizedPnl, 1)} + ${getPriceStr(sumOfnPnL, 1)} = ${getPriceStr(sumOfnPnL + realizedPnl, 1)}`}
      unit="$"
      isPrefix={true}
      color={realizedPnl + sumOfnPnL > 0 ? "warning" : "danger"}
    />
  );
}
