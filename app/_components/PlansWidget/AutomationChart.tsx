"use client";

import { useMemo } from "react";

import { PersonalTradeHistory } from "@/types";
import { getHistoriesChartData } from "@/utils/historiesChart";
import LineChart from "@/components/charts/LineChart";

export type AutomationChartProps = {
  title: string;
  histories: PersonalTradeHistory[];
};

export function AutomationGridChart({
  histories,
  title,
}: AutomationChartProps) {
  const { pnlChartData, inOutChartData, inChartData, outChartData } = useMemo(
    () => getHistoriesChartData(histories || []),
    [histories],
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <span className="text-base font-bold">{title}</span>

      <div className="flex w-full gap-4">
        <div className="flex-1">
          <LineChart
            title="PNL"
            data={pnlChartData}
            className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>

        <div className="flex-1">
          <LineChart
            title="Out"
            data={outChartData}
            className="h-[250px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>
      </div>

      <div className="flex w-full gap-4">
        <div className="flex-1">
          <LineChart
            title="In/Out"
            data={inOutChartData}
            className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>

        <div className="flex-1">
          <LineChart
            title="In"
            data={inChartData}
            className="h-[250px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>
      </div>
    </div>
  );
}
