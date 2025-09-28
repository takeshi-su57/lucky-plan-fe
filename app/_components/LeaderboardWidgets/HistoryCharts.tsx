import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

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

export function HistoryCharts({
  pnlChartData,
  pnlAccChartData,
  inOutChartData,
  inOutAccChartData,
  cols = 2,
}: HistoryChartsProps) {
  const chartDataArr = [
    { data: pnlAccChartData, title: "ACC PNL", type: "line" },
    { data: inOutAccChartData, title: "ACC In/Out", type: "line" },
    { data: pnlChartData, title: "PNL", type: "bar" },
    { data: inOutChartData, title: "In/Out", type: "bar" },
  ];

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
          {item.type === "line" ? (
            <LineChart
              title={item.title}
              data={item.data.map((item) => ({
                ...item,
                label: dayjs(item.date).format("YYYY/MM/DD hh:mm:ss"),
              }))}
              initialSelected={["y"]}
              className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
            />
          ) : null}

          {item.type === "bar" ? (
            <BarChart
              title={item.title}
              data={item.data.map((item) => ({
                ...item,
                label: dayjs(item.date).format("YYYY/MM/DD hh:mm:ss"),
              }))}
              initialSelected={["y"]}
              className="h-[250px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
