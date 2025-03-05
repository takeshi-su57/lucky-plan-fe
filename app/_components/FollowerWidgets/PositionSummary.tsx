"use client";

import { Chip } from "@nextui-org/react";

import { MissionStatus, Mission } from "@/graphql/gql/graphql";

import { PairChip } from "../LeaderboardWidgets/PairChip";
import { PositionTradeStatus } from "./PositionTradeStatus";

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

  const openPrice = data?.openPrice ? Number(data.openPrice) / 1e10 : 0;
  const collateralAmount = data?.collateralAmount
    ? Number(data.collateralAmount) / 1e6
    : 0;
  const leverage = data?.leverage ? Number(data.leverage) / 1e3 : 0;

  return (
    <div className="flex w-full items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <Chip>Trade {index}</Chip>
        {mission ? <Chip color="primary">System</Chip> : null}

        <PairChip contractId={1} pairIndex={data.pairIndex} count={1} />

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
          {mission.status}
        </Chip>
      ) : null}
    </div>
  );
}
