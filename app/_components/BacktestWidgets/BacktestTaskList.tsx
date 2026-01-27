"use client";

import { useState } from "react";
import { Select, SelectItem, Input, Button } from "@heroui/react";
import { FiSearch, FiRefreshCw } from "react-icons/fi";

import { BacktestTaskStatus } from "@/graphql/gql/graphql";
import { PaginatedViews } from "@/components/views/PaginatedViews";
import {
  useBacktestTasks,
  useBacktestTaskStats,
  useCancelBacktestTask,
  useDeleteBacktestTask,
  useRetryBacktestTask,
} from "@/app-hooks/useBacktest";
import { BacktestTaskRow } from "./BacktestTaskRow";

const PAGE_SIZE = 10;

const statusOptions = [
  { key: "all", label: "All Status" },
  { key: BacktestTaskStatus.Await, label: "Awaiting" },
  { key: BacktestTaskStatus.Processing, label: "Processing" },
  { key: BacktestTaskStatus.Done, label: "Done" },
  { key: BacktestTaskStatus.Failed, label: "Failed" },
  { key: BacktestTaskStatus.Cancelled, label: "Cancelled" },
];

export function BacktestTaskList() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [symbolFilter, setSymbolFilter] = useState<string>("");
  const [actionTaskId, setActionTaskId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const { stats, refetch: refetchStats } = useBacktestTaskStats();
  const { tasks, loading, refetch } = useBacktestTasks({
    status:
      statusFilter === "all" ? undefined : (statusFilter as BacktestTaskStatus),
    symbol: symbolFilter || undefined,
    limit: 50,
  });

  const { cancelTask, loading: cancelLoading } = useCancelBacktestTask();
  const { deleteTask, loading: deleteLoading } = useDeleteBacktestTask();
  const { retryTask, loading: retryLoading } = useRetryBacktestTask();

  const handleCancel = async (taskId: string) => {
    setActionTaskId(taskId);
    await cancelTask({ variables: { taskId } });
    setActionTaskId(null);
    refetch();
  };

  const handleDelete = async (taskId: string) => {
    setActionTaskId(taskId);
    await deleteTask({ variables: { taskId } });
    setActionTaskId(null);
  };

  const handleRetry = async (taskId: string) => {
    setActionTaskId(taskId);
    await retryTask({ variables: { taskId } });
    setActionTaskId(null);
    refetch();
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refetch(), refetchStats()]);
    setIsRefreshing(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Stats Summary */}
      {stats && (
        <div className="flex items-center gap-4 text-sm">
          <span className="text-neutral-400">Tasks:</span>
          <span className="text-yellow-400">{stats.await} Awaiting</span>
          <span className="text-primary-400">
            {stats.processing} Processing
          </span>
          <span className="text-success-400">{stats.done} Done</span>
          <span className="text-danger-400">{stats.failed} Failed</span>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select
          label="Status"
          size="sm"
          variant="bordered"
          selectedKeys={[statusFilter]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            setStatusFilter(selected);
            setPage(1);
          }}
          className="w-40"
        >
          {statusOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>

        <Input
          size="sm"
          variant="bordered"
          placeholder="Filter by symbol..."
          value={symbolFilter}
          onValueChange={(value) => {
            setSymbolFilter(value);
            setPage(1);
          }}
          startContent={<FiSearch className="text-neutral-400" />}
          className="w-48"
        />

        <Button
          isIconOnly
          size="sm"
          variant="flat"
          onPress={handleRefresh}
          isLoading={isRefreshing}
        >
          <FiRefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </Button>
      </div>

      {/* Task List */}
      {tasks.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-neutral-400">
          <p>No backtest tasks found</p>
          <p className="text-sm">
            Click &quot;Add Task&quot; to create your first backtest
          </p>
        </div>
      ) : (
        <PaginatedViews
          currentPage={page}
          totalPages={Math.ceil(tasks.length / PAGE_SIZE)}
          onChangePage={setPage}
          loading={loading}
        >
          <div className="flex flex-col gap-3">
            {tasks
              .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
              .map((task) => (
                <BacktestTaskRow
                  key={task.id}
                  task={{
                    id: task.id,
                    name: task.name,
                    symbol: task.symbol,
                    status: task.status,
                    progress:
                      task.totalConfigs && task.totalConfigs > 0
                        ? task.processedConfigs / task.totalConfigs
                        : 0,
                    totalConfigs: task.totalConfigs,
                    processedConfigs: task.processedConfigs,
                    createdAt: task.createdAt,
                    startedAt: task.startedAt,
                    completedAt: task.completedAt,
                    errorMessage: task.errorMessage,
                    searchStrategy: task.searchStrategy,
                    optimizationMetrics: task.optimizationMetrics,
                    trials: task.trials,
                    bestConfigIds: task.bestConfigIds,
                  }}
                  onCancel={handleCancel}
                  onDelete={handleDelete}
                  onRetry={handleRetry}
                  isCancelling={cancelLoading && actionTaskId === task.id}
                  isDeleting={deleteLoading && actionTaskId === task.id}
                  isRetrying={retryLoading && actionTaskId === task.id}
                />
              ))}
          </div>
        </PaginatedViews>
      )}
    </div>
  );
}
