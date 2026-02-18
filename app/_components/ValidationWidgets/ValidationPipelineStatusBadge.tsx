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
  [ValidationPipelineStatus.Layer_1Running]: {
    label: "Layer 1 Running",
    color: "primary",
  },
  [ValidationPipelineStatus.Layer_1Done]: {
    label: "Layer 1 Done",
    color: "primary",
  },
  [ValidationPipelineStatus.Layer_2Running]: {
    label: "Layer 2 Running",
    color: "primary",
  },
  [ValidationPipelineStatus.Layer_2Done]: {
    label: "Layer 2 Done",
    color: "primary",
  },
  [ValidationPipelineStatus.Layer_3Running]: {
    label: "Layer 3 Running",
    color: "primary",
  },
  [ValidationPipelineStatus.Layer_3Done]: {
    label: "Layer 3 Done",
    color: "primary",
  },
  [ValidationPipelineStatus.AwaitingUserSelection]: {
    label: "Awaiting Selection",
    color: "warning",
  },
  [ValidationPipelineStatus.Layer_5Running]: {
    label: "Layer 5 Running",
    color: "primary",
  },
  [ValidationPipelineStatus.Layer_5Done]: {
    label: "Layer 5 Done",
    color: "primary",
  },
  [ValidationPipelineStatus.AwaitingFinalApproval]: {
    label: "Awaiting Approval",
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
