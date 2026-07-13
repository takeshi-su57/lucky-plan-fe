"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Checkbox, CheckboxGroup } from "@heroui/react";
import { twMerge } from "tailwind-merge";

import {
  compressHistoryChartData,
  HistoryChartPoint,
} from "./historyChartCompression";

export type HistoryExtremaChartProps = {
  title: string;
  data: HistoryChartPoint[];
  className?: string;
  initialSelected?: string[];
};

const EMPTY_CHART_DATA = [
  { value: 0, label: "" },
  { value: 0, label: "" },
];

export const HistoryExtremaChart = memo(function HistoryExtremaChart({
  title,
  data,
  className,
  initialSelected,
}: HistoryExtremaChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<Chart | null>(null);
  const [selected, setSelected] = useState<string[]>(initialSelected ?? []);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => setWidth(container.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const chartData = useMemo(() => {
    return compressHistoryChartData(
      data.length === 0 ? EMPTY_CHART_DATA : data,
      width,
    );
  }, [data, width]);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const labels = chartData.map((point) => point.endLabel);
    const datasets = [
      {
        label: "Max",
        data: chartData.map((point) => point.max),
        borderColor: "rgb(34 197 94)",
        backgroundColor: "rgb(34 197 94 / 0.08)",
        borderWidth: 1,
        fill: false,
        pointRadius: 0,
      },
      {
        label: "Min",
        data: chartData.map((point) => point.min),
        backgroundColor: "rgb(239 68 68 / 0.08)",
        borderColor: "rgb(239 68 68)",
        borderWidth: 1,
        fill: "-1",
        pointRadius: 0,
      },
      {
        label: "Average",
        data: chartData.map((point) => point.avg),
        borderColor: "#525252",
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
      },
    ];

    instanceRef.current?.destroy();
    instanceRef.current = new Chart(canvas, {
      type: "line",
      data: { labels, datasets },
      options: {
        animation: false,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => {
                const point = chartData[items[0]?.dataIndex];
                if (!point) return "";
                return point.startLabel === point.endLabel
                  ? point.startLabel
                  : point.startLabel + " - " + point.endLabel;
              },
            },
          },
        },
        scales: {
          x: { display: selected.includes("x") },
          y: { display: selected.includes("y") },
        },
      },
    });

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [chartData, selected]);

  return (
    <div className="relative flex w-full flex-col gap-3">
      <div className="absolute top-3 left-4 z-1000 flex flex-row items-center gap-1 bg-white">
        <span className="text-xs font-semibold">{title}</span>
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
