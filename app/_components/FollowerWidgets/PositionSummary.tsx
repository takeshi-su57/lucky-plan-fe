"use client";

import { Chip } from "@heroui/react";
import { twMerge } from "tailwind-merge";

import { MissionStatus, MissionForwardDetails } from "@/graphql/gql/graphql";

import { PairChip } from "../LeaderboardWidgets/PairChip";
import { PositionTradeStatus } from "./PositionTradeStatus";
import { getPairName } from "@/web3/gns/v10/configs";

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
  mission: MissionForwardDetails | null;
  params: string;
};

export function PositionSummary({
  index,
  mission,
  params,
}: PositionSummaryProps) {
  const data = JSON.parse(params);

  const openPrice = data?.openPrice ? Number(data.openPrice) / 1e10 : 0;
  const collateralAmount = data?.collateralAmount
    ? Number(data.collateralAmount) / 1e6
    : 0;
  const leverage = data?.leverage ? Number(data.leverage) / 1e3 : 0;

  const pairName = getPairName(42161, data.pairIndex);

  return (
    <div className={twMerge("flex w-full items-center justify-between gap-6")}>
      <div className="flex items-center gap-6">
        <Chip>Trade {index}</Chip>
        {mission ? <Chip color="primary">System</Chip> : null}

        <span
          className={twMerge(
            "text-xs",
            data.long ? "text-green-700" : "text-red-700",
          )}
        >
          {data.long ? "Long" : "Short"}
        </span>

        <PairChip pairName={pairName ?? "Unknown"} />

        <PositionTradeStatus
          collateralAmount={collateralAmount}
          leverage={leverage}
          long={data.long}
          pairIndex={data.pairIndex}
          openPrice={openPrice}
        />
      </div>

      {mission ? (
        <Chip color={colorsByMissionStatus[mission.status]}>
          Mission {mission.id} - {mission.status}
        </Chip>
      ) : null}
    </div>
  );
}
