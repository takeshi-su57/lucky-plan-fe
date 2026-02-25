"use client";

import { Progress } from "@heroui/react";

export type BacktestTaskProgressProps = {
  progress: number;
  processedConfigs: number;
  totalConfigs: number;
  showLabel?: boolean;
};

export function BacktestTaskProgress({
  progress,
  processedConfigs,
  totalConfigs,
  showLabel = true,
}: BacktestTaskProgressProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <Progress
        aria-label="Task progress"
        value={progress}
        color={progress >= 100 ? "success" : "primary"}
        size="sm"
        className="w-full"
      />
      {showLabel && (
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>
            {processedConfigs} / {totalConfigs} configs
          </span>
          <span>{progress.toFixed(1)}%</span>
        </div>
      )}
    </div>
  );
}
