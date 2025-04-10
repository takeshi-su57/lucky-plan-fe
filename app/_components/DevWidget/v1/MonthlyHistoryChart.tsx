import { useMemo } from "react";
import { Spinner } from "@nextui-org/react";
import dayjs from "dayjs";

import { AutomationGridChart } from "../../PlansWidget/AutomationChart";
import { useGetMonthlyDevPnlSnapshots } from "@/app/_hooks/useHistory";
import BarChart from "@/components/charts/BarChart";

import { TestParams } from "./TestParams";

export type MonthlyHistoryChartProps = {
  dateStr: string;
  testParams: TestParams;
};

export function MonthlyHistoryChart({
  dateStr,
  testParams,
}: MonthlyHistoryChartProps) {
  const { histories, loading } = useGetMonthlyDevPnlSnapshots(
    dateStr,
    testParams,
  );

  const dailyPnlChartData = useMemo(() => {
    const dailyPnlData: Record<string, number> = {};

    histories.forEach((history) => {
      const date = dayjs(history.date).format("YYYY-MM-DD");
      dailyPnlData[date] =
        (dailyPnlData[date] ?? 0) + history.pnl * history.collateralPriceUsd;
    });

    return Object.entries(dailyPnlData)
      .map(([date, pnl]) => ({
        value: pnl,
        date: dayjs(date).toDate(),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((item) => ({
        ...item,
        label: dayjs(item.date).format("MM-DD"),
      }));
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

      <BarChart
        title={`Total Result`}
        data={dailyPnlChartData}
        className="h-[550px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />
    </div>
  );
}
