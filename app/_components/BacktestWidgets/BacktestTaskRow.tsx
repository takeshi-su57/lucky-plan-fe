"use client";

import Link from "next/link";
import { Button, Chip, Spinner } from "@heroui/react";
import { FiEye, FiXCircle, FiRefreshCw, FiTrash2 } from "react-icons/fi";
import dayjs from "dayjs";

import { BacktestTaskStatus } from "@/graphql/gql/graphql";
import { BacktestTaskStatusBadge } from "./BacktestTaskStatusBadge";
import { BacktestTaskProgress } from "./BacktestTaskProgress";
import { BestConfigCarousel } from "./BestConfigCarousel";
import { useBestBacktestResults } from "@/app-hooks/useBacktest";

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
    searchStrategy?: string | null;
    optimizationMetrics?: string[] | null;
    trials?: number | null;
    bestConfigIds?: string[] | null;
  };
  onCancel: (taskId: string) => void;
  onRetry: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  isDeleting?: boolean;
  isCancelling?: boolean;
  isRetrying?: boolean;
};

export function BacktestTaskRow({
  task,
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

  const hasBestConfigs = task.bestConfigIds && task.bestConfigIds.length > 0;

  // Fetch best results when bestConfigIds exist
  const { bestResults, loading: bestResultsLoading } = useBestBacktestResults(
    isDone && hasBestConfigs ? task.id : null,
    task.bestConfigIds ?? null,
  );

  const getTimeLabel = () => {
    if (task.completedAt) {
      return `Completed: ${dayjs(task.completedAt).format("YYYY-MM-DD HH:mm")}`;
    }
    if (task.startedAt) {
      return `Started: ${dayjs(task.startedAt).format("YYYY-MM-DD HH:mm")}`;
    }
    return `Created: ${dayjs(task.createdAt).format("YYYY-MM-DD HH:mm")}`;
  };

  const isOptuna = task.searchStrategy === "optuna";
  const showCarousel = isDone && hasBestConfigs;

  return (
    <div className="flex gap-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-colors hover:border-neutral-700">
      {/* Best Configs Carousel */}
      {showCarousel && (
        <div className="relative h-[250px] w-1/2 shrink-0 overflow-hidden rounded-lg bg-neutral-800">
          {bestResultsLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Spinner size="sm" color="white" />
            </div>
          ) : bestResults.length > 0 ? (
            <BestConfigCarousel results={bestResults} variant="compact" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500">
              No best configs
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-white">
                {task.name}
              </h3>
              <BacktestTaskStatusBadge status={task.status} />
              {task.searchStrategy && (
                <Chip
                  size="sm"
                  variant="flat"
                  color={isOptuna ? "secondary" : "default"}
                  classNames={{ base: "h-5" }}
                >
                  {isOptuna ? "Optuna" : "Grid"}
                </Chip>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <span className="font-mono">{task.symbol}</span>
              <span>|</span>
              <span>
                {task.processedConfigs} / {task.totalConfigs}{" "}
                {isOptuna ? "trials" : "configs"}
              </span>
              {isOptuna && task.optimizationMetrics && task.optimizationMetrics.length > 0 && (
                <>
                  <span>|</span>
                  <span className="text-secondary-400">
                    {task.optimizationMetrics.length > 2
                      ? `${task.optimizationMetrics.slice(0, 2).join(", ")}...`
                      : task.optimizationMetrics.join(", ")}
                  </span>
                </>
              )}
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
              <Link href={`/backtest/${task.id}`}>
                <Button
                  size="sm"
                  variant="flat"
                  startContent={<FiEye className="h-3 w-3" />}
                >
                  View
                </Button>
              </Link>
            )}

            {(isProcessing || isAwaiting) && (
              <Button
                size="sm"
                variant="flat"
                color="warning"
                isLoading={isCancelling}
                startContent={
                  !isCancelling && <FiXCircle className="h-3 w-3" />
                }
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
                startContent={
                  !isRetrying && <FiRefreshCw className="h-3 w-3" />
                }
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
    </div>
  );
}
