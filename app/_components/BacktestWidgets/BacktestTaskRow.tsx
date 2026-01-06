"use client";

import { Button } from "@heroui/react";
import { FiEye, FiXCircle, FiRefreshCw, FiTrash2 } from "react-icons/fi";
import dayjs from "dayjs";

import { BacktestTaskStatus } from "@/graphql/gql/graphql";
import { BacktestTaskStatusBadge } from "./BacktestTaskStatusBadge";
import { BacktestTaskProgress } from "./BacktestTaskProgress";

export type BacktestTaskRowProps = {
  task: {
    id: string;
    name: string;
    symbol: string;
    status: BacktestTaskStatus;
    progress: number;
    totalConfigs: number;
    processedConfigs: number;
    createdAt: Date;
    startedAt?: Date | null;
    completedAt?: Date | null;
    errorMessage?: string | null;
  };
  onView: (taskId: string) => void;
  onCancel: (taskId: string) => void;
  onRetry: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  isDeleting?: boolean;
  isCancelling?: boolean;
  isRetrying?: boolean;
};

export function BacktestTaskRow({
  task,
  onView,
  onCancel,
  onRetry,
  onDelete,
  isDeleting,
  isCancelling,
  isRetrying,
}: BacktestTaskRowProps) {
  const isProcessing = task.status === BacktestTaskStatus.Processing;
  const isFailed = task.status === BacktestTaskStatus.Failed;
  const isDone = task.status === BacktestTaskStatus.Done;
  const isAwaiting = task.status === BacktestTaskStatus.Await;

  const getTimeLabel = () => {
    if (task.completedAt) {
      return `Completed: ${dayjs(task.completedAt).format("YYYY-MM-DD HH:mm")}`;
    }
    if (task.startedAt) {
      return `Started: ${dayjs(task.startedAt).format("YYYY-MM-DD HH:mm")}`;
    }
    return `Created: ${dayjs(task.createdAt).format("YYYY-MM-DD HH:mm")}`;
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-colors hover:border-neutral-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white">{task.name}</h3>
            <BacktestTaskStatusBadge status={task.status} />
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <span className="font-mono">{task.symbol}</span>
            <span>|</span>
            <span>
              {task.processedConfigs} / {task.totalConfigs} configs
            </span>
          </div>
        </div>
      </div>

      {(isProcessing || isDone || isAwaiting) && (
        <BacktestTaskProgress
          progress={
            task.totalConfigs && task.totalConfigs > 0
              ? (task.processedConfigs * 100) / task.totalConfigs
              : 0
          }
          processedConfigs={task.processedConfigs}
          totalConfigs={task.totalConfigs}
        />
      )}

      {isFailed && task.errorMessage && (
        <div className="bg-danger-500/10 text-danger-400 rounded px-3 py-2 text-sm">
          {task.errorMessage}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-500">{getTimeLabel()}</span>

        <div className="flex items-center gap-2">
          {(isDone || isProcessing) && (
            <Button
              size="sm"
              variant="flat"
              startContent={<FiEye className="h-3 w-3" />}
              onPress={() => onView(task.id)}
            >
              View
            </Button>
          )}

          {(isProcessing || isAwaiting) && (
            <Button
              size="sm"
              variant="flat"
              color="warning"
              isLoading={isCancelling}
              startContent={!isCancelling && <FiXCircle className="h-3 w-3" />}
              onPress={() => onCancel(task.id)}
            >
              Cancel
            </Button>
          )}

          {isFailed && (
            <Button
              size="sm"
              variant="flat"
              color="primary"
              isLoading={isRetrying}
              startContent={!isRetrying && <FiRefreshCw className="h-3 w-3" />}
              onPress={() => onRetry(task.id)}
            >
              Retry
            </Button>
          )}

          <Button
            size="sm"
            variant="flat"
            color="danger"
            isLoading={isDeleting}
            startContent={!isDeleting && <FiTrash2 className="h-3 w-3" />}
            onPress={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
