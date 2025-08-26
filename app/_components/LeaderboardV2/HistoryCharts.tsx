import LineChart from "@/components/charts/LineChart";
import dayjs from "dayjs";

export type HistoryChartData = {
  value: number;
  date: Date;
};

export type HistoryChartsProps = {
  pnlChartData: HistoryChartData[];
};

export function HistoryCharts({ pnlChartData }: HistoryChartsProps) {
  return (
    <div className="flex w-full gap-4">
      <LineChart
        title="PNL"
        data={pnlChartData.map((item) => ({
          ...item,
          label: dayjs(item.date).format("YYYY/MM/DD hh:mm:ss"),
        }))}
        className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
      />
    </div>
  );
}
