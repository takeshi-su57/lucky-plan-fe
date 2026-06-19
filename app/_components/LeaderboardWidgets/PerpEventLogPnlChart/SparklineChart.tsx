"use client";

import { useId, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { getPriceStr } from "@/utils/price";
import { HistoryChartData } from "../HistoryCharts";

export type SparklineChartProps = {
  title: string;
  data: HistoryChartData[];
};

export function SparklineChart({ title, data }: SparklineChartProps) {
  const clipId = useId();
  const { areaPath, linePath, zeroY, minValue, finalValue } = useMemo(() => {
    const width = 300;
    const height = 80;
    const maxPoints = 96;
    const step = Math.max(1, Math.ceil(data.length / maxPoints));
    const points = data.filter((_, index) => index % step === 0);
    const normalizedPoints =
      data.length > 0 && points[points.length - 1] !== data[data.length - 1]
        ? [...points, data[data.length - 1]]
        : points;
    const values =
      normalizedPoints.length > 0
        ? normalizedPoints.map((item) => item.value)
        : [0, 0];
    const min = Math.min(...values, 0);
    const max = Math.max(...values, 0);
    const range = max - min || 1;
    const toX = (index: number) =>
      normalizedPoints.length > 1
        ? (index / (normalizedPoints.length - 1)) * width
        : 0;
    const toY = (value: number) => height - ((value - min) / range) * height;
    const coordinates = values.map((value, index) => ({
      x: toX(index),
      y: toY(value),
    }));
    const linePath = coordinates
      .map(({ x, y }, index) => `${index === 0 ? "M" : "L"}${x},${y}`)
      .join(" ");
    const zeroY = toY(0);
    const first = coordinates[0] ?? { x: 0, y: zeroY };
    const last = coordinates[coordinates.length - 1] ?? { x: width, y: zeroY };

    return {
      areaPath: `M${first.x},${zeroY} ${coordinates
        .map(({ x, y }) => `L${x},${y}`)
        .join(" ")} L${last.x},${zeroY} Z`,
      linePath,
      zeroY,
      minValue: min,
      finalValue: values[values.length - 1] ?? 0,
    };
  }, [data]);

  return (
    <div className="border-default-200 bg-content1 flex min-h-56 flex-1 flex-col gap-2 rounded-lg border p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-foreground text-xs font-semibold">{title}</span>
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-neutral-500">Min ${getPriceStr(minValue)}</span>
          <span
            className={twMerge(
              finalValue >= 0 ? "text-emerald-400" : "text-rose-400",
            )}
          >
            ${getPriceStr(finalValue)}
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 300 80"
        preserveAspectRatio="none"
        className="h-44 w-full overflow-visible"
      >
        <defs>
          <clipPath id={`${clipId}-positive`}>
            <rect x="0" y="0" width="300" height={zeroY} />
          </clipPath>
          <clipPath id={`${clipId}-negative`}>
            <rect x="0" y={zeroY} width="300" height={80 - zeroY} />
          </clipPath>
        </defs>
        <line
          x1="0"
          x2="300"
          y1={zeroY}
          y2={zeroY}
          className="stroke-default-300"
          strokeWidth="1"
        />
        <path
          d={areaPath}
          fill="rgb(52 211 153 / 0.16)"
          clipPath={`url(#${clipId}-positive)`}
        />
        <path
          d={areaPath}
          fill="rgb(244 63 94 / 0.22)"
          clipPath={`url(#${clipId}-negative)`}
        />
        <path
          d={linePath}
          fill="none"
          className="stroke-emerald-400"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          clipPath={`url(#${clipId}-positive)`}
        />
        <path
          d={linePath}
          fill="none"
          className="stroke-rose-500"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          clipPath={`url(#${clipId}-negative)`}
        />
      </svg>
    </div>
  );
}
