import BarChart from "@/components/charts/BarChart";
import { Divider } from "@nextui-org/react";

const slideWindow = 3000;

export function StatisticPanel({
  title,
  data,
}: {
  title: string;
  data: Record<string, Record<string, number>>;
}) {
  const chartDatas = Object.entries(data).map(([key, value]) => ({
    label: key,
    value: Object.entries(value)
      .map(([key1, value1]) => ({
        label: +key1,
        value: value1,
      }))
      .sort((a, b) => a.label - b.label),
  }));

  const accChartDatas = chartDatas.map((chartData) => {
    let acc = 0;
    const slides = [];
    let accForSlide = 0;

    for (let i = 0; i < chartData.value.length; i++) {
      accForSlide += chartData.value[i].value;

      if (accForSlide >= slideWindow) {
        slides.push(chartData.value[i].label);
        accForSlide = 0;
      }
    }

    return {
      label: chartData.label,
      value: chartData.value.map((item) => ({
        label: +item.label,
        value: (acc += item.value),
      })),
      slides,
    };
  });

  console.log(
    title,
    accChartDatas.map((chartData) => ({
      label: chartData.label,
      slides: chartData.slides,
    })),
  );

  return (
    <div className="flex flex-col gap-2">
      {chartDatas.map((chartData) => (
        <BarChart
          key={chartData.label}
          title={`${chartData.label}`}
          data={chartData.value.map((item) => ({
            label: item.label.toString(),
            value: item.value,
          }))}
          className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
        />
      ))}

      <Divider />

      {accChartDatas.map((chartData) => (
        <BarChart
          key={chartData.label}
          title={`${chartData.label} Acc`}
          data={chartData.value.map((item) => ({
            label: item.label.toString(),
            value: item.value,
          }))}
          className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
        />
      ))}
    </div>
  );
}
