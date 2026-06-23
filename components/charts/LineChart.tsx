"use client";

import { memo, useRef, useEffect, useCallback, useState } from "react";
import Chart from "chart.js/auto";
import { twMerge } from "tailwind-merge";
import { Checkbox } from "@heroui/react";
import { CheckboxGroup } from "@heroui/react";

export type LineChartProps = {
  title?: string;
  data: {
    value: number;
    label: string;
  }[];
  className?: string;
  initialSelected?: string[];
};

const EMPTY_CHART_DATA = [
  { value: 0, label: "" },
  { value: 0, label: "" },
];

const LineChart = memo(function LineChart({
  title,
  data,
  className,
  initialSelected,
}: LineChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<Chart>(null);

  const [selected, setSelected] = useState<string[]>(initialSelected || []);

  const drawChart = useCallback(() => {
    if (ref.current) {
      ref.current.destroy();
    }

    const chartData = data.length === 0 ? EMPTY_CHART_DATA : data;

    const chartContainer = chartRef.current!;

    ref.current = new Chart(chartContainer, {
      type: "line",
      data: {
        labels: chartData.map((item) => item.label),
        datasets: [
          {
            label: "Amount",
            data: chartData.map((item) => item.value),
            pointRadius: 0,
            fill: {
              target: "origin",
              above: "rgb(16 185 129 / 0.72)",
              below: "rgb(239 68 68 / 0.72)",
            },
            borderWidth: 1,
            borderColor: "#525252",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            display: selected.includes("x"),
          },
          y: {
            display: selected.includes("y"),
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, [data, selected]);

  useEffect(() => {
    if (!chartRef.current || !containerRef.current) {
      return;
    }

    drawChart();

    const observer = new ResizeObserver(() => {
      drawChart();
    });

    observer.observe(containerRef.current);

    return () => {
      ref.current?.destroy();
      observer.disconnect();
    };
  }, [drawChart]);

  return (
    <div className="relative flex w-full flex-col gap-3">
      <div className="absolute top-3 left-4 z-1000 flex flex-row items-center gap-1 bg-white">
        <span className="text-xs font-semibold">{title || ""}</span>
      </div>

      <div className="absolute right-4 bottom-4 z-1000 flex flex-row items-center justify-between gap-0">
        <CheckboxGroup
          color="warning"
          value={selected}
          onValueChange={setSelected}
          orientation="horizontal"
        >
          <Checkbox value="x">X Scale</Checkbox>
          <Checkbox value="y">Y Scale</Checkbox>
        </CheckboxGroup>
      </div>

      <div
        ref={containerRef}
        className={twMerge(
          "relative h-full w-full items-center justify-center gap-8 rounded-md p-3.5",
          className,
        )}
      >
        <canvas ref={chartRef} />
      </div>
    </div>
  );
});

export default LineChart;
