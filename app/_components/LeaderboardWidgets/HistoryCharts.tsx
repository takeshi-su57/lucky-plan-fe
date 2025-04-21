import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import dayjs from "dayjs";

export type HistoryChartData = {
  value: number;
  date: Date;
};

export type HistoryChartsProps = {
  pnlChartData: HistoryChartData[];
  inOutChartData: HistoryChartData[];
  inChartData: HistoryChartData[];
  outChartData: HistoryChartData[];
};

export function HistoryCharts({
  pnlChartData,
  inOutChartData,
  inChartData,
  outChartData,
}: HistoryChartsProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full gap-4">
        <div className="flex-1">
          <LineChart
            title="PNL"
            data={pnlChartData.map((item) => ({
              ...item,
              label: dayjs(item.date).format("YYYY/MM/DD hh:mm:ss"),
            }))}
            className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>

        <div className="flex-1">
          <BarChart
            title="Out"
            data={outChartData.map((item) => ({
              ...item,
              label: dayjs(item.date).format("YYYY/MM/DD hh:mm:ss"),
            }))}
            className="h-[250px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>
      </div>

      <div className="flex w-full gap-4">
        <div className="flex-1">
          <LineChart
            title="In/Out"
            data={inOutChartData.map((item) => ({
              ...item,
              label: dayjs(item.date).format("YYYY/MM/DD hh:mm:ss"),
            }))}
            className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>

        <div className="flex-1">
          <BarChart
            title="In"
            data={inChartData.map((item) => ({
              ...item,
              label: dayjs(item.date).format("YYYY/MM/DD hh:mm:ss"),
            }))}
            className="h-[250px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>
      </div>
    </div>
  );
}
