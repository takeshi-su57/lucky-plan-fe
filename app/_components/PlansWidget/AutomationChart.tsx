"use client";

import { useMemo } from "react";

import { PersonalTradeHistory } from "@/types";
import { getHistoriesChartData } from "@/utils/historiesChart";

import { HistoryCharts } from "../LeaderboardWidgets/HistoryCharts";

export type AutomationChartProps = {
  title: string;
  histories: PersonalTradeHistory[];
  range?: {
    from: Date;
    to: Date;
  };
};

export function AutomationGridChart({
  histories,
  title,
  range,
}: AutomationChartProps) {
  const { pnlChartData, inOutChartData, inChartData, outChartData } = useMemo(
    () => getHistoriesChartData(histories || [], range),
    [histories, range],
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <span className="text-base font-bold">{title}</span>

      <HistoryCharts
        pnlChartData={pnlChartData}
        inOutChartData={inOutChartData}
        inChartData={inChartData}
        outChartData={outChartData}
      />
    </div>
  );
}
