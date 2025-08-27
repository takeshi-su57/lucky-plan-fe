"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Chart from "chart.js/auto";
import { twMerge } from "tailwind-merge";
import { Checkbox } from "@nextui-org/react";
import { CheckboxGroup } from "@nextui-org/react";

export type MixedLineChartProps = {
  title?: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    pointRadius: number;
    fill: {
      target: string;
      above: string;
      below: string;
    };
    borderWidth: number;
    borderColor: string;
  }[];
  className?: string;
  initialSelected?: string[];
};

export default function MixedLineChart({
  title,
  labels,
  datasets,
  className,
  initialSelected,
}: MixedLineChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<Chart>();
  const [selected, setSelected] = useState<string[]>(initialSelected || []);

  const drawChart = useCallback(() => {
    if (ref.current) {
      ref.current.destroy();
    }

    const chartContainer = chartRef.current!;

    ref.current = new Chart(chartContainer, {
      type: "line",
      data: {
        labels,
        datasets,
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
  }, [datasets, labels, selected]);

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
      <div className="absolute left-4 top-3 z-[1000] flex flex-row items-center gap-1">
        <span className="text-sm font-bold">{title || ""}</span>
      </div>

      <div className="absolute bottom-4 right-4 z-[1000] flex flex-row items-center justify-between gap-0">
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
}
