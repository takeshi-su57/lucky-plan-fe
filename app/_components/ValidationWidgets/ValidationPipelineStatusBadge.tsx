"use client";

import { Chip } from "@heroui/react";
import { ValidationPipelineStatus } from "@/graphql/gql/graphql";

export type ValidationPipelineStatusBadgeProps = {
  status: ValidationPipelineStatus;
  size?: "sm" | "md" | "lg";
};

const statusConfig: Record<
  ValidationPipelineStatus,
  {
    label: string;
    color:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "danger";
  }
> = {
  [ValidationPipelineStatus.Created]: { label: "Created", color: "default" },
  [ValidationPipelineStatus.StepThreshold]: {
    label: "Threshold",
    color: "primary",
  },
  [ValidationPipelineStatus.StepPareto]: {
    label: "Pareto",
    color: "primary",
  },
  [ValidationPipelineStatus.StepWfa]: {
    label: "WFA",
    color: "primary",
  },
  [ValidationPipelineStatus.StepUserSelection]: {
    label: "User Selection",
    color: "warning",
  },
  [ValidationPipelineStatus.StepRobustness]: {
    label: "Robustness",
    color: "primary",
  },
  [ValidationPipelineStatus.StepFinalApproval]: {
    label: "Final Approval",
    color: "warning",
  },
  [ValidationPipelineStatus.Completed]: {
    label: "Completed",
    color: "success",
  },
  [ValidationPipelineStatus.Failed]: { label: "Failed", color: "danger" },
  [ValidationPipelineStatus.Cancelled]: {
    label: "Cancelled",
    color: "default",
  },
};

export function ValidationPipelineStatusBadge({
  status,
  size = "sm",
}: ValidationPipelineStatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status,
    color: "default" as const,
  };

  return (
    <Chip size={size} color={config.color} variant="flat">
      {config.label}
    </Chip>
  );
}
