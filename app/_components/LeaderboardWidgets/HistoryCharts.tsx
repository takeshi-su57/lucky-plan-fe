import { HistoryExtremaChart } from "@/components/charts/HistoryExtremaChart";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { memo, useMemo } from "react";

export type HistoryChartData = {
  value: number;
  date: Date;
};

export type HistoryChartsProps = {
  pnlChartData: HistoryChartData[];
  pnlAccChartData: HistoryChartData[];
  inOutChartData: HistoryChartData[];
  inOutAccChartData: HistoryChartData[];
  cols?: 1 | 2 | 4;
};

export type FormattedHistoryChartData = {
  value: number;
  label: string;
};

export function formatChartData(
  data: HistoryChartData[],
): FormattedHistoryChartData[] {
  return data.map((item) => ({
    value: item.value,
    label: dayjs(item.date).format("YYYY/MM/DD hh:mm:ss"),
  }));
}

export const HistoryCharts = memo(function HistoryCharts({
  pnlChartData,
  pnlAccChartData,
  inOutChartData,
  inOutAccChartData,
  cols = 2,
}: HistoryChartsProps) {
  const chartDataArr = useMemo(
    () => [
      { data: formatChartData(pnlAccChartData), title: "ACC PNL" },
      { data: formatChartData(inOutAccChartData), title: "ACC In/Out" },
      { data: formatChartData(pnlChartData), title: "PNL" },
      { data: formatChartData(inOutChartData), title: "In/Out" },
    ],
    [inOutAccChartData, inOutChartData, pnlAccChartData, pnlChartData],
  );

  return (
    <div
      className={twMerge(
        "grid w-full gap-4",
        cols === 1 && "grid-cols-1",
        cols === 2 && "grid-cols-2",
        cols === 4 && "grid-cols-4",
      )}
    >
      {chartDataArr.map((item) => (
        <div key={item.title} className="flex-1">
          <HistoryExtremaChart
            title={item.title}
            data={item.data}
            initialSelected={["y"]}
            className={twMerge(
              "border-default-200 bg-content1 rounded-lg border",
              cols === 1 ? "h-40" : "h-80",
            )}
          />
        </div>
      ))}
    </div>
  );
});