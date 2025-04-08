import { useMemo } from "react";
import { Spinner } from "@nextui-org/react";
import dayjs from "dayjs";

import { useGetWholeCompressedHistoriesV2 } from "@/app/_hooks/useHistory";

import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import { getPriceStr } from "@/utils/price";
import { TestParamsV2 } from "./TestParamsV2";

function getData(
  items: { pnl: number; date: Date }[],
  scales: string[],
  dateFormat: string,
): {
  data: { value: number; label: string }[];
  accData: { value: number; label: string }[];
} {
  const dailyPnlData: Record<string, number> = {};

  items.forEach((history) => {
    const date = dayjs(history.date).format(dateFormat);
    dailyPnlData[date] = (dailyPnlData[date] ?? 0) + +history.pnl;
  });

  const data: { value: number; label: string }[] = [];
  const accData: { value: number; label: string }[] = [];
  let accPnl = 0;

  for (const scale of scales) {
    const pnl = dailyPnlData[scale] ?? 0;
    accPnl += pnl;

    data.push({
      value: pnl,
      label: scale,
    });

    accData.push({
      value: accPnl,
      label: scale,
    });
  }

  return {
    data,
    accData,
  };
}

export type FastTotalDevV2PanelProps = {
  testParams: TestParamsV2[];
};

export function FastTotalDevV2Panel({ testParams }: FastTotalDevV2PanelProps) {
  const { accPnls, botCounts, maxInvested, loading } =
    useGetWholeCompressedHistoriesV2(testParams);

  const {
    dailyPnlChartData,
    accDailyPnlChartData,
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
    const startTimestamp = new Date("2024-11-01").getTime();
    const endTimestamp = new Date("2025-03-31").getTime();

    const dailyScales: string[] = [];

    for (let i = startTimestamp; i < endTimestamp; i += 1000 * 60 * 60 * 24) {
      dailyScales.push(dayjs(i).format("YYYY-MM-DD"));
    }

    const { data: dailyPnlChartData, accData: accDailyPnlChartData } = getData(
      accPnls,
      dailyScales,
      "YYYY-MM-DD",
    );

    const { accData: accDailyInOutChartData } = getData(
      accPnls.map((item) => ({
        pnl: item.inOut,
        date: item.date,
      })),
      dailyScales,
      "YYYY-MM-DD",
    );

    const { data: dailyTaskCountChartData } = getData(
      accPnls.map((item) => ({
        pnl: item.taskCount,
        date: item.date,
      })),
      dailyScales,
      "YYYY-MM-DD",
    );

    const { data: dailyPositionCountChartData } = getData(
      accPnls.map((item) => ({
        pnl: item.positionCount,
        date: item.date,
      })),
      dailyScales,
      "YYYY-MM-DD",
    );

    const { data: dailyTraderCountChartData } = getData(
      accPnls.map((item) => ({
        pnl: item.traderCount,
        date: item.date,
      })),
      dailyScales,
      "YYYY-MM-DD",
    );

    const hourlyScales: string[] = [];

    for (let i = startTimestamp; i < endTimestamp; i += 1000 * 60 * 60) {
      hourlyScales.push(dayjs(i).format("YYYY-MM-DD HH:[00]:[00]"));
    }

    const { accData: accHourlyPnlChartData } = getData(
      accPnls,
      hourlyScales,
      "YYYY-MM-DD HH:[00]:[00]",
    );

    const hourScales: string[] = [];

    for (let i = 0; i <= 24; i++) {
      hourScales.push(`${i}`);
    }

    const { data: hourPnlChartData } = getData(accPnls, hourScales, "H");

    const monthlyHourScales: string[] = [];
    const monthScales = ["2024-11", "2024-12", "2025-01", "2025-02", "2025-03"];

    for (const month of monthScales) {
      for (let i = 0; i <= 24; i++) {
        monthlyHourScales.push(`${month} ${i}`);
      }
    }

    const { data: monthlyHourPnlChartData } = getData(
      accPnls,
      monthlyHourScales,
      "YYYY-MM HH",
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

    const { data: weekPnlChartData } = getData(accPnls, weekScales, "ddd");

    const monthWeekScales: string[] = [];

    for (const month of monthScales) {
      for (const week of weekScales) {
        monthWeekScales.push(`${month} ${week}`);
      }
    }

    const { data: monthWeekPnlChartData } = getData(
      accPnls,
      monthWeekScales,
      "YYYY-MM ddd",
    );

    return {
      dailyPnlChartData,
      accDailyPnlChartData,
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
  }, [accPnls]);

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  const totalPnl =
    accHourlyPnlChartData.length > 0
      ? accHourlyPnlChartData[accHourlyPnlChartData.length - 1].value
      : 0;
  const remainBalance = -maxInvested + totalPnl;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-8">
        <span>Invested: {getPriceStr(-maxInvested)} USDC</span>
        <span>Total PnL: {getPriceStr(totalPnl)} USDC</span>
        <span>Remain balance: {getPriceStr(remainBalance)} USDC</span>
        <span>
          Total Tasks:{" "}
          {Object.values(dailyTaskCountChartData).reduce(
            (acc, item) => acc + item.value,
            0,
          )}
        </span>
        <span>
          Total Positions:{" "}
          {Object.values(dailyPositionCountChartData).reduce(
            (acc, item) => acc + item.value,
            0,
          )}
        </span>
        <span>
          Total Traders:{" "}
          {Object.values(dailyTraderCountChartData).reduce(
            (acc, item) => acc + item.value,
            0,
          )}
        </span>
        <span>
          Total Bots: {botCounts.reduce((acc, item) => acc + item.botCount, 0)}
        </span>
      </div>

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

      <LineChart
        title={`Accumulated Daily In/Out`}
        data={accDailyInOutChartData}
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
        data={botCounts.map((item) => ({
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
