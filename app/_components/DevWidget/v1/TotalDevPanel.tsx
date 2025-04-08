import { useMemo } from "react";
import { Spinner } from "@nextui-org/react";

import { AutomationGridChart } from "../../PlansWidget/AutomationChart";
import { useGetWholeResultHistories } from "@/app/_hooks/useHistory";
import BarChart from "@/components/charts/BarChart";
import dayjs from "dayjs";
import LineChart from "@/components/charts/LineChart";
import { TestParams } from "./TestParams";

export type TotalDevPanelProps = {
  testParams: TestParams;
};

export function TotalDevPanel({ testParams }: TotalDevPanelProps) {
  const { histories, loading } = useGetWholeResultHistories(testParams);

  const { dailyPnlChartData, accDailyPnlChartData } = useMemo(() => {
    const dailyPnlData: Record<string, number> = {};

    histories.forEach((history) => {
      const date = dayjs(history.date).format("YYYY-MM-DD");
      dailyPnlData[date] =
        (dailyPnlData[date] ?? 0) + history.pnl * history.collateralPriceUsd;
    });

    const dailyPnlChartData = Object.entries(dailyPnlData)
      .map(([date, pnl]) => ({
        value: pnl,
        date: dayjs(date).toDate(),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    let accPnl = 0;

    const accDailyPnlChartData = dailyPnlChartData.map((item) => {
      accPnl += item.value;

      return {
        value: accPnl,
        date: item.date,
      };
    });

    return { dailyPnlChartData, accDailyPnlChartData };
  }, [histories]);

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <AutomationGridChart
        mode="show_only_valid_activity"
        histories={histories}
        title={`Total Result`}
      />
      <LineChart
        title={`Accumulated Daily PNL`}
        data={accDailyPnlChartData.map((item) => ({
          value: item.value,
          label: dayjs(item.date).format("MM-DD"),
        }))}
        className="h-[550px] rounded-2xl border border-neutral-800 bg-amber-950/5"
        initialSelected={["x", "y"]}
      />
      <BarChart
        title={`Daily Pnl`}
        data={dailyPnlChartData.map((item) => ({
          value: item.value,
          label: dayjs(item.date).format("MM-DD"),
        }))}
        className="h-[550px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />
    </div>
  );
}
