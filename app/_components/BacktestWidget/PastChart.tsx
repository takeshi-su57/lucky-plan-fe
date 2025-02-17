import { Address } from "viem";
import { useMemo } from "react";

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
  isLeaderChart: boolean;
  parameters: BacktestParameters;
};

export function PastChart({
  endDate,
  contractId,
  address,
  isLeaderChart,
  parameters,
}: PastChartProps) {
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
    <div className="flex flex-col gap-2">
      <HistoriesWidget
        address={address as Address}
        histories={histories}
        contractId={contractId}
        hideTags={true}
        range={{ to: endDate }}
      />
    </div>
  );
}
