import { useMemo } from "react";
import dayjs from "dayjs";

import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";

import { getDevData } from "@/utils";
import { AccPnl, BotCount } from "@/graphql/gql/graphql";

export type FastTotalProps = {
  startDate: Date;
  endDate: Date;
  accPnls: AccPnl[];
  botCounts: BotCount[];
};

export function FastTotal({
  startDate,
  endDate,
  accPnls,
  botCounts,
}: FastTotalProps) {
  const {
    dailyPnlChartData,
    accDailyPnlChartData,
    dailyInChartData,
    dailyOutChartData,
    dailyMaxInChartData,
    dailyMaxOutChartData,
    dailyMinInOutChartData,
    dailyInOutChartData,
    accDailyInOutChartData,
    accHourlyPnlChartData,
    weekPnlChartData,
    monthWeekPnlChartData,
    monthlyHourPnlChartData,
    hourPnlChartData,
    dailyTaskCountChartData,
    dailyPositionCountChartData,
    dailyTraderCountChartData,
  } = useMemo(() => {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    const dailyScales: string[] = [];

    for (let i = startTimestamp; i < endTimestamp; i += 1000 * 60 * 60 * 24) {
      dailyScales.push(dayjs(i).format("YYYY-MM-DD"));
    }

    const { data: dailyPnlChartData, accData: accDailyPnlChartData } =
      getDevData(accPnls, dailyScales, "YYYY-MM-DD", "sum");

    const { data: dailyInChartData } = getDevData(
      accPnls.map((item) => ({
        pnl: item.in,
        date: item.date,
      })),
      dailyScales,
      "YYYY-MM-DD",
      "sum",
    );

    const { data: dailyOutChartData } = getDevData(
      accPnls.map((item) => ({
        pnl: item.in,
        date: item.date,
      })),
      dailyScales,
      "YYYY-MM-DD",
      "sum",
    );

    const { data: dailyMaxInChartData } = getDevData(
      accPnls.map((item) => ({
        pnl: item.in,
        date: item.date,
      })),
      dailyScales,
      "YYYY-MM-DD",
      "max",
    );

    const { data: dailyMaxOutChartData } = getDevData(
      accPnls.map((item) => ({
        pnl: item.in,
        date: item.date,
      })),
      dailyScales,
      "YYYY-MM-DD",
      "max",
    );

    const { data: dailyInOutChartData, accData: accDailyInOutChartData } =
      getDevData(
        accPnls.map((item) => ({
          pnl: item.inOut,
          date: item.date,
        })),
        dailyScales,
        "YYYY-MM-DD",
        "sum",
      );

    const { data: dailyMinInOutChartData } = getDevData(
      accPnls.map((item) => ({
        pnl: item.inOut,
        date: item.date,
      })),
      dailyScales,
      "YYYY-MM-DD",
      "min",
    );

    const { data: dailyTaskCountChartData } = getDevData(
      accPnls.map((item) => ({
        pnl: item.taskCount,
        date: item.date,
      })),
      dailyScales,
      "YYYY-MM-DD",
      "sum",
    );

    const { data: dailyPositionCountChartData } = getDevData(
      accPnls.map((item) => ({
        pnl: item.positionCount,
        date: item.date,
      })),
      dailyScales,
      "YYYY-MM-DD",
      "sum",
    );

    const { data: dailyTraderCountChartData } = getDevData(
      accPnls.map((item) => ({
        pnl: item.traderCount,
        date: item.date,
      })),
      dailyScales,
      "YYYY-MM-DD",
      "sum",
    );

    const hourlyScales: string[] = [];

    for (let i = startTimestamp; i < endTimestamp; i += 1000 * 60 * 60) {
      hourlyScales.push(dayjs(i).format("YYYY-MM-DD HH:[00]:[00]"));
    }

    const { accData: accHourlyPnlChartData } = getDevData(
      accPnls,
      hourlyScales,
      "YYYY-MM-DD HH:[00]:[00]",
      "sum",
    );

    const hourScales: string[] = [];

    for (let i = 0; i <= 24; i++) {
      hourScales.push(`${i}`);
    }

    const { data: hourPnlChartData } = getDevData(
      accPnls,
      hourScales,
      "H",
      "sum",
    );

    const monthlyHourScales: string[] = [];
    const monthScales = ["2024-11", "2024-12", "2025-01", "2025-02", "2025-03"];

    for (const month of monthScales) {
      for (let i = 0; i <= 24; i++) {
        monthlyHourScales.push(`${month} ${i}`);
      }
    }

    const { data: monthlyHourPnlChartData } = getDevData(
      accPnls,
      monthlyHourScales,
      "YYYY-MM HH",
      "sum",
    );

    const weekScales: string[] = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ];

    const { data: weekPnlChartData } = getDevData(
      accPnls,
      weekScales,
      "ddd",
      "sum",
    );

    const monthWeekScales: string[] = [];

    for (const month of monthScales) {
      for (const week of weekScales) {
        monthWeekScales.push(`${month} ${week}`);
      }
    }

    const { data: monthWeekPnlChartData } = getDevData(
      accPnls,
      monthWeekScales,
      "YYYY-MM ddd",
      "sum",
    );

    return {
      dailyPnlChartData,
      accDailyPnlChartData,
      dailyInChartData,
      dailyOutChartData,
      dailyMaxInChartData,
      dailyMaxOutChartData,
      dailyMinInOutChartData,
      dailyInOutChartData,
      accDailyInOutChartData,
      accHourlyPnlChartData,
      weekPnlChartData,
      monthWeekPnlChartData,
      monthlyHourPnlChartData,
      hourPnlChartData,
      dailyTaskCountChartData,
      dailyPositionCountChartData,
      dailyTraderCountChartData,
    };
  }, [accPnls, endDate, startDate]);

  return (
    <div className="flex flex-col gap-2">
      <LineChart
        title={`Accumulated Daily PNL`}
        data={accDailyPnlChartData.map((item) => ({
          ...item,
          label: dayjs(item.label).format("MM/DD"),
        }))}
        className="h-[450px] rounded-2xl border border-neutral-800 bg-amber-950/5"
        initialSelected={["x", "y"]}
      />

      <LineChart
        title={`Accumulated Hourly PNL`}
        data={accHourlyPnlChartData}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Accumulated Daily In/Out`}
        data={accDailyInOutChartData}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Daily In/Out`}
        data={dailyInOutChartData}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Daily Min In/Out`}
        data={dailyMinInOutChartData}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Daily In`}
        data={dailyInChartData}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Daily Out`}
        data={dailyOutChartData}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Daily Max In`}
        data={dailyMaxInChartData}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Daily Max Out`}
        data={dailyMaxOutChartData}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Daily PNL`}
        data={dailyPnlChartData.map((item) => ({
          ...item,
          label: dayjs(item.label).format("MM/DD"),
        }))}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Daily Task Count`}
        data={dailyTaskCountChartData.map((item) => ({
          ...item,
          label: dayjs(item.label).format("MM/DD"),
        }))}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Daily Position Count`}
        data={dailyPositionCountChartData.map((item) => ({
          ...item,
          label: dayjs(item.label).format("MM/DD"),
        }))}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Daily Bot Count`}
        data={botCounts
          .filter((item) => dayjs(item.date).isAfter(startDate))
          .filter((item) => dayjs(item.date).isBefore(endDate))
          .map((item) => ({
            value: item.botCount,
            label: dayjs(item.date).format("MM/DD"),
          }))}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Daily Trader Count`}
        data={dailyTraderCountChartData.map((item) => ({
          ...item,
          label: dayjs(item.label).format("MM/DD"),
        }))}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Hour PNL`}
        data={hourPnlChartData}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Monthly Hour PNL`}
        data={monthlyHourPnlChartData}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Week PNL`}
        data={weekPnlChartData}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />

      <BarChart
        title={`Month Week PNL`}
        data={monthWeekPnlChartData}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />
    </div>
  );
}
