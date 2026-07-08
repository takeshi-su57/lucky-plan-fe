"use client";

import { Progress, ProgressProps } from "@heroui/react";

import { SimulationStatus } from "@/graphql/gql/graphql";

type SimulationProgressBarProps = {
  value: number;
  color?: ProgressProps["color"];
  ariaLabel: string;
  status?: SimulationStatus | null;
};

const ACTIVE_STATUSES = new Set<SimulationStatus>([
  SimulationStatus.Queued,
  SimulationStatus.Running,
]);

export function SimulationProgressBar({
  value,
  color = "primary",
  ariaLabel,
  status,
}: SimulationProgressBarProps) {
  const isActive = status ? ACTIVE_STATUSES.has(status) : false;

  return (
    <Progress
      size="sm"
      value={value}
      color={color}
      aria-label={ariaLabel}
      classNames={{
        indicator: isActive
          ? "simulation-progress-indicator simulation-progress-indicator-active"
          : "simulation-progress-indicator",
      }}
    />
  );
}
