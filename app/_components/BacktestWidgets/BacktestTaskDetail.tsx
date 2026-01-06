"use client";

import { useState, useMemo } from "react";
import { Button, Select, SelectItem, Spinner } from "@heroui/react";
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import dayjs from "dayjs";

import { useBacktestTask, useBacktestResults } from "@/app-hooks/useBacktest";
import { BacktestTaskStatusBadge } from "./BacktestTaskStatusBadge";
import { BacktestTaskProgress } from "./BacktestTaskProgress";
import { BacktestResultGrid } from "./BacktestResultGrid";
import { BacktestResultDetailModal } from "./BacktestResultDetailModal";

export type BacktestTaskDetailProps = {
  taskId: string;
  onBack: () => void;
};

const sortOptions = [
  { key: "totalPnlUsdt", label: "Total PnL" },
  { key: "winRate", label: "Win Rate" },
  { key: "sharpeRatio", label: "Sharpe Ratio" },
  { key: "profitFactor", label: "Profit Factor" },
  { key: "maxDrawdownPercent", label: "Max Drawdown" },
];

const orderOptions = [
  { key: "desc", label: "Descending" },
  { key: "asc", label: "Ascending" },
];

export function BacktestTaskDetail({
  taskId,
  onBack,
}: BacktestTaskDetailProps) {
  const [sortBy, setSortBy] = useState("totalPnlUsdt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const {
    task,
    loading: taskLoading,
    refetch: refetchTask,
  } = useBacktestTask(taskId);
  const {
    results,
    loading: resultsLoading,
    refetch: refetchResults,
  } = useBacktestResults(taskId, {
    sortBy,
    sortOrder,
    limit,
    offset,
  });

  const handleRefresh = async () => {
    setOffset(0);
    await Promise.all([refetchTask(), refetchResults()]);
  };

  const selectedResult = useMemo(() => {
    return results.find((r) => r.id === selectedResultId);
  }, [results, selectedResultId]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };

  if (taskLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner color="white" size="lg" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-neutral-400">Task not found</p>
        <Button variant="flat" onPress={onBack}>
          Back to Tasks
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button isIconOnly variant="flat" size="sm" onPress={onBack}>
          <FiArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">{task.name}</h2>
            <BacktestTaskStatusBadge status={task.status} />
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <span className="font-mono">{task.symbol}</span>
            <span>|</span>
            <span>
              {dayjs(task.startDate).format("YYYY-MM-DD")} to{" "}
              {dayjs(task.endDate).format("YYYY-MM-DD")}
            </span>
            <span>|</span>
            <span>{task.interval}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
        <BacktestTaskProgress
          progress={
            task.totalConfigs && task.totalConfigs > 0
              ? (task.processedConfigs * 100) / task.totalConfigs
              : 0
          }
          processedConfigs={task.processedConfigs}
          totalConfigs={task.totalConfigs}
        />
        {task.completedAt && (
          <p className="mt-2 text-xs text-neutral-500">
            Completed: {dayjs(task.completedAt).format("YYYY-MM-DD HH:mm:ss")}
          </p>
        )}
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-4">
        <Select
          label="Sort by"
          size="sm"
          variant="bordered"
          selectedKeys={[sortBy]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            setSortBy(selected);
            setOffset(0);
          }}
          className="w-40"
        >
          {sortOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>

        <Select
          label="Order"
          size="sm"
          variant="bordered"
          selectedKeys={[sortOrder]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            setSortOrder(selected);
            setOffset(0);
          }}
          className="w-36"
        >
          {orderOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>

        <span className="text-sm text-neutral-400">
          Showing {results.length} results
        </span>

        <div className="ml-auto">
          <Button
            size="sm"
            variant="flat"
            startContent={
              <FiRefreshCw
                className={`h-4 w-4 ${resultsLoading ? "animate-spin" : ""}`}
              />
            }
            onPress={handleRefresh}
            isDisabled={resultsLoading}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Results Grid */}
      {resultsLoading && results.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <Spinner color="white" size="lg" />
        </div>
      ) : (
        <>
          <BacktestResultGrid
            results={results}
            onSelectResult={setSelectedResultId}
          />

          {results.length >= offset + limit && (
            <div className="flex justify-center">
              <Button
                variant="flat"
                onPress={handleLoadMore}
                isLoading={resultsLoading}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}

      {/* Result Detail Modal */}
      {selectedResult && (
        <BacktestResultDetailModal
          isOpen={!!selectedResultId}
          onClose={() => setSelectedResultId(null)}
          result={selectedResult}
          taskId={taskId}
        />
      )}
    </div>
  );
}
