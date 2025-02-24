"use client";

import { Address } from "viem";
import { useMemo, useState } from "react";
import { Button, Switch } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import dayjs from "dayjs";
import { FaTrash } from "react-icons/fa";

import { useGetPersonalTradeHistories } from "@/app-hooks/useGetPersonalTradeHistories";
import { useGetAllContracts } from "@/app-hooks/useContract";

import { HistoriesWidget } from "../LeaderboardWidgets/HistoriesWidget";
import {
  BacktestParameters,
  getFollowerCollateralBaseline,
} from "./BacktestParamtersForm";

import {
  getHistoriesChartData,
  transformHistories,
} from "@/utils/historiesChart";
import { getServerTimezone } from "@/utils";

export type PastChartProps = {
  endDate: Date;
  contractId: number;
  address: string;
  parameters: BacktestParameters;
  onRemove: () => void;
  onConfirm: () => void;
};

export function PastChart({
  endDate,
  contractId,
  address,
  parameters,
  onRemove,
  onConfirm,
}: PastChartProps) {
  const [isLeaderChart, setIsLeaderChart] = useState(false);
  const [isAllTime, setIsAllTime] = useState(true);
  const [showAllActivity, setShowAllActivity] = useState(false);

  const allContracts = useGetAllContracts();

  const { data: allHistories } = useGetPersonalTradeHistories(
    allContracts.find((contract) => contract.id === contractId)?.backendUrl ||
      null,
    address,
  );

  const histories = useMemo(() => {
    if (isLeaderChart) {
      return allHistories || [];
    }

    const { sumIn, countIn } = getHistoriesChartData(
      allHistories || [],
      showAllActivity ? "show_all_activity" : "show_only_valid_activity",
      {
        to: endDate,
      },
    );

    const leaderCollateralBaseline = countIn > 0 ? sumIn / countIn : 0;
    const followerCollateralBaseline = getFollowerCollateralBaseline(
      parameters.collateralBaselines,
      leaderCollateralBaseline,
    );

    const transformed = transformHistories(
      allHistories || [],
      leaderCollateralBaseline,
      {
        strategyKey: "scaleCopy",
        ratio: 100,
        collateralBaseline: followerCollateralBaseline,
      },
    );

    return transformed;
  }, [
    allHistories,
    endDate,
    isLeaderChart,
    parameters.collateralBaselines,
    showAllActivity,
  ]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <div className="flex flex-row gap-2">
          <Button size="sm" variant="flat" color="danger" onClick={onRemove}>
            <FaTrash /> Cancel Selection
          </Button>

          <Button size="sm" variant="flat" color="success" onClick={onConfirm}>
            <FaTrash /> Confirm Selection
          </Button>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Switch
            isSelected={isLeaderChart}
            onValueChange={setIsLeaderChart}
            size="sm"
          >
            {isLeaderChart ? "Leader Chart" : "Follower Chart"}
          </Switch>

          <Switch isSelected={isAllTime} onValueChange={setIsAllTime} size="sm">
            {isAllTime ? "All Time" : "Past Week"}
          </Switch>

          <Switch
            isSelected={showAllActivity}
            onValueChange={setShowAllActivity}
            size="sm"
          >
            {showAllActivity ? "Show All Activities" : "Show Valid Activities"}
          </Switch>
        </div>
      </div>

      <HistoriesWidget
        address={address as Address}
        histories={histories}
        contractId={contractId}
        hideTags={true}
        range={{
          to: endDate,
          from: isAllTime
            ? undefined
            : parseDate(dayjs(endDate).format("YYYY-MM-DD"))
                .subtract({ days: 7 })
                .toDate(getServerTimezone()),
        }}
        mode={
          showAllActivity ? "show_all_activity" : "show_only_valid_activity"
        }
      />
    </div>
  );
}
