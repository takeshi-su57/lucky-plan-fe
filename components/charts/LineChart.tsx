"use client";

import { useRef, useEffect, useCallback } from "react";
import Chart from "chart.js/auto";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export type LineChartProps = {
  data: {
    value: number;
    date: Date;
  }[];
  className?: string;
};

export default function LineChart({ data, className }: LineChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<Chart>();

  const drawChart = useCallback(() => {
    if (ref.current) {
      ref.current.destroy();
    }

    if (data.length === 0) {
      data.push(
        ...[
          {
            value: 0,
            date: new Date(),
          },
          {
            value: 0,
            date: new Date(),
          },
        ],
      );
    }

    const chartContainer = chartRef.current!;

    ref.current = new Chart(chartContainer, {
      type: "line",
      data: {
        labels: data.map((item) =>
          dayjs(new Date(item.date)).format("YYYY/MM/DD hh:mm:ss"),
        ),
        datasets: [
          {
            label: "PNL",
            data: data.map((item) => item.value),
            pointRadius: 0,
            fill: {
              target: "origin",
              above: "#022c22", // Area will be red above the origin
              below: "#450a0a", // And blue below the origin
            },
            tension: 0.1,
            borderWidth: 1,
            borderColor: "#525252",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, [data]);

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
    <div
      ref={containerRef}
      className={twMerge(
        "relative h-full w-full items-center justify-center gap-8 rounded-md p-3.5",
        className,
      )}
    >
      <canvas ref={chartRef} />
    </div>
  );
}
