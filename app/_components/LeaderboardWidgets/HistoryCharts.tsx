import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
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
};

export function HistoryCharts({
  pnlChartData,
  pnlAccChartData,
  inOutChartData,
  inOutAccChartData,
}: HistoryChartsProps) {
  return (
    <div className="flex w-full gap-4">
      <div className="flex w-1/2 flex-col gap-4">
        <div className="flex-1">
          <LineChart
            title="ACC PNL"
            data={pnlAccChartData.map((item) => ({
              ...item,
              label: dayjs(item.date).format("YYYY/MM/DD hh:mm:ss"),
            }))}
            initialSelected={["y"]}
            className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>

        <div className="flex-1">
          <LineChart
            title="ACC In/Out"
            data={inOutAccChartData.map((item) => ({
              ...item,
              label: dayjs(item.date).format("YYYY/MM/DD hh:mm:ss"),
            }))}
            initialSelected={["y"]}
            className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>
      </div>

      <div className="flex w-1/2 flex-col gap-4">
        <div className="flex-1">
          <BarChart
            title="PNL"
            data={pnlChartData.map((item) => ({
              ...item,
              label: dayjs(item.date).format("YYYY/MM/DD hh:mm:ss"),
            }))}
            initialSelected={["y"]}
            className="h-[250px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>

        <div className="flex-1">
          <BarChart
            title="In/Out"
            data={inOutChartData
              .slice(
                Math.max(0, inOutChartData.length - 128),
                inOutChartData.length,
              )
              .map((item) => ({
                ...item,
                label: dayjs(item.date).format("YYYY/MM/DD hh:mm:ss"),
              }))}
            initialSelected={["y"]}
            className="h-[250px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>
      </div>
    </div>
  );
}
