"use client";

import { useMemo } from "react";
import { Contract, PerpTradingEventLog } from "@/graphql/gql/graphql";

import {
  getHistoriesChartData,
  convertPerpTradingEventLogToHistory,
} from "@/utils/historiesV2Chart";

import { HistoryCharts } from "../LeaderboardWidgets/HistoryCharts";
import { getPriceStr } from "@/utils/price";
import { useGetAllContracts } from "@/app/_hooks/useContract";

export type AutomationChartProps = {
  title: string;
  eventLogs: PerpTradingEventLog[];
  range?: {
    from: Date;
    to: Date;
  };
};

export function AutomationGridChart({
  eventLogs,
  title,
  range,
}: AutomationChartProps) {
  const allContracts = useGetAllContracts();

  const { pnlChartData, pnlAccChartData, inOutChartData, inOutAccChartData } =
    useMemo(() => {
      const contractsMapa: Record<number, Contract> = {};

      allContracts.forEach((contract) => {
        contractsMapa[contract.id] = contract;
      });

      const perpTradeHistories = convertPerpTradingEventLogToHistory(
        contractsMapa,
        eventLogs,
      );

      return getHistoriesChartData(perpTradeHistories, {
        range,
      });
    }, [eventLogs, allContracts, range]);

  const totalInvested = inOutChartData.reduce(
    (acc, curr) => (acc > curr.value ? curr.value : acc),
    0,
  );
  const totalPnl =
    pnlChartData.length > 0 ? pnlChartData[pnlChartData.length - 1].value : 0;
  const remainBalance = -totalInvested + totalPnl;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <span className="text-base font-bold">{title}</span>

        <div className="flex flex-row items-center gap-8">
          <span>Invested: {getPriceStr(-totalInvested)} USDC</span>
          <span>Total PnL: {getPriceStr(totalPnl)} USDC</span>
          <span>Remain balance: {getPriceStr(remainBalance)} USDC</span>
        </div>
      </div>

      <HistoryCharts
        pnlChartData={pnlChartData}
        pnlAccChartData={pnlAccChartData}
        inOutChartData={inOutChartData}
        inOutAccChartData={inOutAccChartData}
      />
    </div>
  );
}
