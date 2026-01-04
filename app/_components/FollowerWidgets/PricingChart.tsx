"use client";

import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const colors = {
  blue: { border: "#3b82f6", fill: "#1e3a5f" },
  yellow: { border: "#eab308", fill: "#5f4b1e" },
  green: { border: "#22c55e", fill: "#1e5f3a" },
};

export type PricingChartProps = {
  priceHistory?: number[];
  speedHistory1?: number[];
  speedHistory2?: number[];
};

export function PricingChart({
  priceHistory,
  speedHistory1,
  speedHistory2,
}: PricingChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<Chart>();

  useEffect(() => {
    if (!chartRef.current || !containerRef.current) {
      return;
    }

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const priceData = priceHistory ?? [];
    const speedData1 = speedHistory1 ?? [];
    const speedData2 = speedHistory2 ?? [];
    const labels = priceData.map((_, i) => i.toString());

    const datasets = [
      {
        label: "Price",
        data: priceData,
        pointRadius: 0,
        fill: false,
        borderWidth: 1,
        borderColor: colors.blue.border,
        backgroundColor: colors.blue.fill,
        tension: 0.1,
        yAxisID: "yPrice",
      },
      {
        label: "Speed 1",
        data: speedData1,
        pointRadius: 0,
        fill: false,
        borderWidth: 1,
        borderColor: colors.yellow.border,
        backgroundColor: colors.yellow.fill,
        tension: 0.1,
        yAxisID: "ySpeed",
      },
      {
        label: "Speed 2",
        data: speedData2,
        pointRadius: 0,
        fill: false,
        borderWidth: 1,
        borderColor: colors.green.border,
        backgroundColor: colors.green.fill,
        tension: 0.1,
        yAxisID: "ySpeed",
      },
    ];

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          x: {
            display: false,
          },
          yPrice: {
            type: "linear",
            display: true,
            position: "left",
            grid: {
              color: "#333",
            },
            ticks: {
              color: colors.blue.border,
            },
            title: {
              display: true,
              text: "Price",
              color: colors.blue.border,
            },
          },
          ySpeed: {
            type: "linear",
            display: true,
            position: "right",
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              color: colors.yellow.border,
              callback: (value) => `${(+value).toFixed(5)}%`,
            },
            title: {
              display: true,
              text: "Speed",
              color: colors.yellow.border,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#888",
            },
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [priceHistory, speedHistory1, speedHistory2]);

  return (
    <div ref={containerRef} className="h-[600px] w-full">
      <canvas ref={chartRef} />
    </div>
  );
}
