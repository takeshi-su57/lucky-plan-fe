"use client";

import { useMemo } from "react";

import { PersonalTradeHistory } from "@/types";
import { getHistoriesChartData } from "@/utils/historiesChart";

import { HistoryCharts } from "../LeaderboardWidgets/HistoryCharts";
import { getPriceStr } from "@/utils/price";

export type AutomationChartProps = {
  title: string;
  histories: PersonalTradeHistory[];
  mode: "show_all_activity" | "show_only_valid_activity";
  range?: {
    from: Date;
    to: Date;
  };
};

export function AutomationGridChart({
  histories,
  title,
  mode,
  range,
}: AutomationChartProps) {
  const { pnlChartData, inOutChartData, inChartData, outChartData } = useMemo(
    () => getHistoriesChartData(histories || [], mode, range),
    [histories, mode, range],
  );

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
          <span>Max In: {getPriceStr(-totalInvested)} USDC USDC</span>
          <span>Total PnL: {getPriceStr(totalPnl)} USDC</span>
          <span>Remain balance: {getPriceStr(remainBalance)} USDC</span>
        </div>
      </div>

      <HistoryCharts
        pnlChartData={pnlChartData}
        inOutChartData={inOutChartData}
        inChartData={inChartData}
        outChartData={outChartData}
      />
    </div>
  );
}
