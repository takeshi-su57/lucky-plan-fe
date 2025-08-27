import { Spinner } from "@nextui-org/react";

import { useGetStatisticData } from "@/app-hooks/useHistory";

import MixedLineChart from "@/components/charts/MixedLineChart";

export function TempPanel() {
  const { statisticData, loading } = useGetStatisticData();

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <MixedLineChart
        title={`Overview`}
        labels={(statisticData || []).map((item) => item.size.toString())}
        datasets={[
          {
            label: "Sum Of Lost",
            data: (statisticData || []).map((item) => -item.sumOfLost),
            pointRadius: 0,
            fill: {
              target: "origin",
              above: "#9F071280",
              below: "#450a0a",
            },
            borderWidth: 1,
            borderColor: "#525252",
          },
          {
            label: "Sum Of Profit",
            data: (statisticData || []).map(
              (item) => item.sumOfWin + item.sumOfLost,
            ),
            pointRadius: 0,
            fill: {
              target: "origin",
              above: "#7CCF0080",
              below: "#450a0a",
            },
            borderWidth: 1,
            borderColor: "#525252",
          },
          {
            label: "Sum Of Win",
            data: (statisticData || []).map((item) => item.sumOfWin),
            pointRadius: 0,
            fill: {
              target: "origin",
              above: "#022c22",
              below: "#450a0a",
            },
            borderWidth: 1,
            borderColor: "#525252",
          },
        ]}
        className="h-[450px] rounded-2xl border border-neutral-800 bg-amber-950/5"
        initialSelected={["x", "y"]}
      />

      <MixedLineChart
        title={`Overview`}
        labels={(statisticData || []).map((item) => item.size.toString())}
        datasets={[
          {
            label: "Avg Of Lost",
            data: (statisticData || []).map((item) =>
              item.countOfLost > 0 ? -item.sumOfLost / item.countOfLost : 0,
            ),
            pointRadius: 0,
            fill: {
              target: "origin",
              above: "#9F071280",
              below: "#450a0a",
            },
            borderWidth: 1,
            borderColor: "#525252",
          },
          {
            label: "Avg Of Win",
            data: (statisticData || []).map((item) =>
              item.countOfWin > 0 ? item.sumOfWin / item.countOfWin : 0,
            ),
            pointRadius: 0,
            fill: {
              target: "origin",
              above: "#022c22",
              below: "#450a0a",
            },
            borderWidth: 1,
            borderColor: "#525252",
          },
        ]}
        className="h-[450px] rounded-2xl border border-neutral-800 bg-amber-950/5"
        initialSelected={["x", "y"]}
      />
    </div>
  );
}
