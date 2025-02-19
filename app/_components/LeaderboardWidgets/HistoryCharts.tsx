import LineChart from "@/components/charts/LineChart";

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
            data={pnlChartData}
            className="h-[200px] rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>

        <div className="flex-1">
          <LineChart
            title="Out"
            data={outChartData}
            className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>
      </div>

      <div className="flex w-full gap-4">
        <div className="flex-1">
          <LineChart
            title="In/Out"
            data={inOutChartData}
            className="h-[200px] rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        </div>

        <div className="flex-1">
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
