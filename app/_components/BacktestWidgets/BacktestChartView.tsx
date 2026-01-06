"use client";

import Image from "next/image";
import { Spinner } from "@heroui/react";

export type BacktestChartViewProps = {
  chartContent?: string;
  loading?: boolean;
};

export function BacktestChartView({ chartContent, loading }: BacktestChartViewProps) {
  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner color="white" size="lg" />
      </div>
    );
  }

  if (!chartContent) {
    return (
      <div className="flex h-[400px] items-center justify-center text-neutral-400">
        No chart available
      </div>
    );
  }

  return (
    <div className="relative flex h-[500px] items-center justify-center rounded-lg bg-neutral-800 p-4">
      <Image
        src={`data:image/png;base64,${chartContent}`}
        alt="PnL Chart"
        fill
        className="object-contain p-4"
        unoptimized
      />
    </div>
  );
}
