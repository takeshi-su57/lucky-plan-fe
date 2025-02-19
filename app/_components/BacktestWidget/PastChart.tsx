"use client";

import { Address } from "viem";
import { useMemo, useState } from "react";
import { Checkbox, Switch } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import dayjs from "dayjs";

import { useGetPersonalTradeHistories } from "@/app-hooks/useGetPersonalTradeHistories";
import { useGetAllContracts } from "@/app-hooks/useContract";

import { HistoriesWidget } from "../LeaderboardWidgets/HistoriesWidget";
import { BacktestParameters } from "./BacktestParamtersForm";

import {
  getHistoriesChartData,
  transformHistories,
} from "@/utils/historiesChart";

export type PastChartProps = {
  endDate: Date;
  contractId: number;
  address: string;
  parameters: BacktestParameters;
  onChangeSelection: (value: boolean) => void;
};

export function PastChart({
  endDate,
  contractId,
  address,
  parameters,
  onChangeSelection,
}: PastChartProps) {
  const [isLeaderChart, setIsLeaderChart] = useState(true);
  const [isAllTime, setIsAllTime] = useState(false);

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

    const { sumIn, countIn } = getHistoriesChartData(allHistories || [], {
      to: endDate,
    });

    const transformed = transformHistories(
      allHistories || [],
      countIn > 0 ? sumIn / countIn : 0,
      {
        ...parameters,
        strategyKey: "scaleCopy",
        ratio: 100,
      },
    );

    return transformed;
  }, [allHistories, endDate, isLeaderChart, parameters]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <Checkbox isSelected={true} onValueChange={onChangeSelection}>
          Selected
        </Checkbox>

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
                .toDate(getLocalTimeZone()),
        }}
      />
    </div>
  );
}
