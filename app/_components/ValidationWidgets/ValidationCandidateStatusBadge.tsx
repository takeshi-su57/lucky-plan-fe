"use client";

import { Chip } from "@heroui/react";
import { ValidationCandidateStatus } from "@/graphql/gql/graphql";

export type ValidationCandidateStatusBadgeProps = {
  status: ValidationCandidateStatus;
  size?: "sm" | "md" | "lg";
};

const statusConfig: Record<
  ValidationCandidateStatus,
  { label: string; color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" }
> = {
  [ValidationCandidateStatus.Pending]: { label: "Pending", color: "default" },
  [ValidationCandidateStatus.PassedThreshold]: { label: "Passed Threshold", color: "primary" },
  [ValidationCandidateStatus.FailedThreshold]: { label: "Failed Threshold", color: "danger" },
  [ValidationCandidateStatus.ParetoOptimal]: { label: "Pareto Optimal", color: "secondary" },
  [ValidationCandidateStatus.ParetoDominated]: { label: "Dominated", color: "default" },
  [ValidationCandidateStatus.WfaPending]: { label: "WFA Pending", color: "default" },
  [ValidationCandidateStatus.WfaPassed]: { label: "WFA Passed", color: "primary" },
  [ValidationCandidateStatus.WfaFailed]: { label: "WFA Failed", color: "danger" },
  [ValidationCandidateStatus.UserSelected]: { label: "Selected", color: "warning" },
  [ValidationCandidateStatus.UserRejected]: { label: "Rejected", color: "default" },
  [ValidationCandidateStatus.RobustnessPending]: { label: "Robustness Pending", color: "default" },
  [ValidationCandidateStatus.RobustnessPassed]: { label: "Robustness Passed", color: "primary" },
  [ValidationCandidateStatus.RobustnessFailed]: { label: "Robustness Failed", color: "danger" },
  [ValidationCandidateStatus.FinalApproved]: { label: "Approved", color: "success" },
  [ValidationCandidateStatus.FinalRejected]: { label: "Final Rejected", color: "danger" },
};

export function ValidationCandidateStatusBadge({
  status,
  size = "sm",
}: ValidationCandidateStatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, color: "default" as const };

  return (
    <Chip size={size} color={config.color} variant="flat">
      {config.label}
    </Chip>
  );
}
