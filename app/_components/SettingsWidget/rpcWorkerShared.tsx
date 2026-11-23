"use client";

import { useEffect, useState } from "react";
import { Chip, Tooltip } from "@heroui/react";

import {
  RpcWorkerDashboardQuery,
  RpcWorkerStatus,
} from "@/graphql/gql/graphql";

export type RpcWorkerItem =
  RpcWorkerDashboardQuery["rpcWorkerDashboard"]["workers"][number];
export const STATUS_ORDER: RpcWorkerStatus[] = [
  RpcWorkerStatus.Working,
  RpcWorkerStatus.Available,
  RpcWorkerStatus.Penalized,
  RpcWorkerStatus.Paused,
  RpcWorkerStatus.Disabled,
  RpcWorkerStatus.Idle,
  RpcWorkerStatus.Unknown,
];

export const STATUS_STYLE: Record<
  RpcWorkerStatus,
  {
    chip:
      | "primary"
      | "success"
      | "warning"
      | "default"
      | "danger"
      | "secondary";
    cell: string;
    hint: string;
  }
> = {
  [RpcWorkerStatus.Working]: {
    chip: "primary",
    cell: "bg-primary",
    hint: "Fetching a block range now",
  },
  [RpcWorkerStatus.Available]: {
    chip: "success",
    cell: "bg-success",
    hint: "Ready to take a range",
  },
  [RpcWorkerStatus.Penalized]: {
    chip: "warning",
    cell: "bg-warning",
    hint: "Backing off after errors",
  },
  [RpcWorkerStatus.Paused]: {
    chip: "default",
    cell: "bg-default-400",
    hint: "Paused by an admin",
  },
  [RpcWorkerStatus.Disabled]: {
    chip: "danger",
    cell: "bg-danger",
    hint: "Stopped automatically after permanent errors",
  },
  [RpcWorkerStatus.Idle]: {
    chip: "secondary",
    cell: "bg-default-200",
    hint: "No backfill running on this chain",
  },
  [RpcWorkerStatus.Unknown]: {
    chip: "default",
    cell: "bg-default-100",
    hint: "Analytics service did not respond",
  },
};

export function useNow(intervalMs = 1_000) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return now;
}

export const formatDuration = (ms: number) => {
  const seconds = Math.max(0, Math.round(ms / 1000));
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
};

export const ago = (at: number | null | undefined, now: number) =>
  at ? `${formatDuration(now - at)} ago` : "Never";

export const formatNumber = (value: number) => value.toLocaleString("en-US");

export const workerName = (worker: RpcWorkerItem) =>
  worker.label || worker.maskedUrl.replace(/^https?:\/\//, "");

export function StatusChip({ status }: { status: RpcWorkerStatus }) {
  return (
    <Tooltip content={STATUS_STYLE[status].hint}>
      <Chip size="sm" variant="flat" color={STATUS_STYLE[status].chip}>
        {status}
      </Chip>
    </Tooltip>
  );
}

/** Statuses that can take work now or as soon as a backfill starts. */
export const isWorkable = (worker: RpcWorkerItem) =>
  worker.state === "Active" &&
  worker.lastCheckOk !== false &&
  (worker.status === RpcWorkerStatus.Working ||
    worker.status === RpcWorkerStatus.Available ||
    worker.status === RpcWorkerStatus.Idle);

/** Worst known problem for an endpoint, from runtime errors or health checks. */
export const endpointProblem = (worker: RpcWorkerItem): string | null => {
  if (worker.status === RpcWorkerStatus.Disabled) {
    return worker.lastErrorKind ?? worker.lastCheckErrorKind ?? "disabled";
  }
  if (worker.lastCheckOk === false) {
    return worker.lastCheckErrorKind ?? "check failed";
  }
  return null;
};

export type TokenHealth =
  | "Healthy"
  | "Degraded"
  | "Rejected"
  | "Down"
  | "Paused"
  | "Unchecked";

export const TOKEN_HEALTH_STYLE: Record<
  TokenHealth,
  {
    chip: "success" | "warning" | "danger" | "default" | "secondary";
    hint: string;
  }
> = {
  Healthy: { chip: "success", hint: "Every active chain answers" },
  Degraded: {
    chip: "warning",
    hint: "Some chains fail or are backing off; others work",
  },
  Rejected: {
    chip: "danger",
    hint: "The provider rejects this key on every chain: expired, invalid, or this server's IP is not allowed",
  },
  Down: { chip: "danger", hint: "No active chain works for this token" },
  Paused: { chip: "default", hint: "All chains paused" },
  Unchecked: {
    chip: "secondary",
    hint: "No health check or traffic yet. Run Check.",
  },
};

export function tokenHealth(workers: RpcWorkerItem[]): TokenHealth {
  const active = workers.filter((worker) => worker.state !== "Paused");

  if (active.length === 0) return "Paused";

  const authFailures = active.filter(
    (worker) =>
      (worker.lastCheckOk === false && worker.lastCheckErrorKind === "auth") ||
      (worker.status === RpcWorkerStatus.Disabled &&
        worker.lastErrorKind === "auth"),
  );

  if (authFailures.length === active.length) return "Rejected";

  const broken = active.filter((worker) => endpointProblem(worker));

  if (broken.length === active.length) return "Down";

  if (
    broken.length > 0 ||
    active.some((worker) => worker.status === RpcWorkerStatus.Penalized)
  ) {
    return "Degraded";
  }

  const hasEvidence = active.some(
    (worker) =>
      (worker.lastCheckOk !== null && worker.lastCheckOk !== undefined) ||
      worker.successCount > 0,
  );

  return hasEvidence ? "Healthy" : "Unchecked";
}

/** Color for one endpoint cell, letting failed health checks win. */
export const endpointCellClass = (worker: RpcWorkerItem) =>
  worker.lastCheckOk === false && worker.state !== "Paused"
    ? "bg-danger"
    : STATUS_STYLE[worker.status].cell;
