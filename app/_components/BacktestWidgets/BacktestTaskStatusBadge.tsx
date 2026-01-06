"use client";

import { Chip } from "@heroui/react";
import { BacktestTaskStatus } from "@/graphql/gql/graphql";

const statusConfig: Record<
  BacktestTaskStatus,
  { color: "default" | "primary" | "success" | "warning" | "danger"; label: string }
> = {
  [BacktestTaskStatus.Await]: { color: "default", label: "Awaiting" },
  [BacktestTaskStatus.Processing]: { color: "primary", label: "Processing" },
  [BacktestTaskStatus.Done]: { color: "success", label: "Done" },
  [BacktestTaskStatus.Failed]: { color: "danger", label: "Failed" },
  [BacktestTaskStatus.Cancelled]: { color: "warning", label: "Cancelled" },
};

export type BacktestTaskStatusBadgeProps = {
  status: BacktestTaskStatus;
  size?: "sm" | "md" | "lg";
};

export function BacktestTaskStatusBadge({
  status,
  size = "sm",
}: BacktestTaskStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Chip color={config.color} size={size} variant="flat">
      {config.label}
    </Chip>
  );
}
