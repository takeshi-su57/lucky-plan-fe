"use client";

import { Chip } from "@nextui-org/react";

import { MissionStatus, Mission } from "@/graphql/gql/graphql";
import { useGetPrices } from "@/app-hooks/useGetPrices";
import { getPNLPercentage } from "@/utils";
import { getPercentageStr, getPriceStr } from "@/utils/price";
import { twMerge } from "tailwind-merge";
import { PairChip } from "../LeaderboardWidgets/PairChip";

const colorsByMissionStatus: Record<
  MissionStatus,
  "default" | "primary" | "secondary" | "success" | "warning" | "danger"
> = {
  [MissionStatus.Created]: "danger",
  [MissionStatus.Opening]: "warning",
  [MissionStatus.Opened]: "primary",
  [MissionStatus.Closing]: "warning",
  [MissionStatus.Closed]: "default",
  [MissionStatus.Ignored]: "secondary",
};

export type PositionSummaryProps = {
  index: number;
  mission: Mission | null;
  params: string;
};

export function PositionSummary({
  index,
  mission,
  params,
}: PositionSummaryProps) {
  const data = JSON.parse(params);

  const prices = useGetPrices();

  const currentPrice = prices?.[data?.pairIndex || 0] || 0;
  const openPrice = data?.openPrice ? Number(data.openPrice) / 1e10 : 0;
  const collateralAmount = data?.collateralAmount
    ? Number(data.collateralAmount) / 1e6
    : 0;

  const pnlPercentage = getPNLPercentage({
    closePrice: currentPrice,
    openPrice,
    leverage: data.leverage / 1000,
    long: data.long,
  });

  const pnl = (collateralAmount * pnlPercentage) / 100;

  return (
    <div className="flex w-full items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <Chip>Trade {index}</Chip>
        {mission ? <Chip color="primary">System</Chip> : null}

        <PairChip contractId={1} pairIndex={data.pairIndex} count={1} />

        <div className="flex flex-row items-center gap-2 text-neutral-400">
          <span className="text-xs">Size:</span>
          <span className={twMerge("text-base font-bold")}>
            {`$${getPriceStr(collateralAmount)}`}
          </span>
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
            {`$${getPriceStr(pnl)}  (${getPercentageStr(pnlPercentage)} %)`}
          </span>
        </div>
      </div>

      {mission ? (
        <Chip color={colorsByMissionStatus[mission.status]}>
          {mission.status}
        </Chip>
      ) : null}
    </div>
  );
}
