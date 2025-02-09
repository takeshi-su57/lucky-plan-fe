"use client";

import { useMemo } from "react";

import { PersonalTradeHistory } from "@/types";
import { getHistoriesChartData } from "@/utils/historiesChart";
import LineChart from "@/components/charts/LineChart";

export type AutomationChartProps = {
  title: string;
  histories: PersonalTradeHistory[];
};

export function AutomationChart({ histories, title }: AutomationChartProps) {
  const { pnlChartData, inOutChartData, inChartData, outChartData } = useMemo(
    () => getHistoriesChartData(histories || []),
    [histories],
  );

  return (
    <div>
      <span className="text-base font-bold">{title}</span>

      <div className="flex items-center gap-4">
        <LineChart
          title="PNL"
          data={pnlChartData}
          className="h-[460px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
        />

        <LineChart
          title="In/Out"
          data={inOutChartData}
          className="h-[460px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
        />

        <div className="flex flex-col gap-4">
          <LineChart
            title="Out"
            data={outChartData}
            className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
          />

          <LineChart
            title="In"
            data={inChartData}
            className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>
      </div>
    </div>
  );
}
