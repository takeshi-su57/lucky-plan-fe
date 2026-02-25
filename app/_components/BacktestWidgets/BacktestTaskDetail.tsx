"use client";

import { useState, useMemo } from "react";
import { Button, Select, SelectItem, Spinner, Chip, Link, Input } from "@heroui/react";
import {
  FiArrowLeft,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiSquare,
} from "react-icons/fi";
import dayjs from "dayjs";

import {
  useBacktestTask,
  useBacktestResults,
  useOptunaDashboardStatus,
  useStartOptunaDashboard,
  useStopOptunaDashboard,
  useBestBacktestResults,
  useResumeBacktestTask,
} from "@/app-hooks/useBacktest";

import { BestConfigCarousel } from "./BestConfigCarousel";
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
  const [extendTrials, setExtendTrials] = useState("50");
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

  // Optuna-related hooks
  const isOptuna = task?.searchStrategy === "optuna";
  const hasBestConfigs = task?.bestConfigIds && task.bestConfigIds.length > 0;

  // Fetch best results for bestConfigIds
  const { bestResults, loading: bestResultsLoading } = useBestBacktestResults(
    hasBestConfigs ? taskId : null,
    task?.bestConfigIds ?? null,
  );

  const { status: dashboardStatus, refetch: refetchDashboardStatus } =
    useOptunaDashboardStatus();
  const { startDashboard, loading: startingDashboard } =
    useStartOptunaDashboard();
  const { stopDashboard, loading: stoppingDashboard } =
    useStopOptunaDashboard();
  const { resumeTask, loading: resumingTask } = useResumeBacktestTask();

  const isDashboardRunning = dashboardStatus?.running ?? false;

  const handleRefresh = async () => {
    setOffset(0);
    await Promise.all([refetchTask(), refetchResults()]);
  };

  const handleStartDashboard = async () => {
    await startDashboard({
      variables: { port: 8080 },
    });
    await refetchDashboardStatus();
  };

  const handleStopDashboard = async () => {
    await stopDashboard();
    await refetchDashboardStatus();
  };

  const handleResumeTask = async () => {
    if (!task) return;
    await resumeTask({
      variables: {
        taskId: task.id,
        additionalTrials: 0,
      },
    });
    refetchTask();
  };

  const handleExtendTask = async () => {
    if (!task || !extendTrials) return;
    const trials = parseInt(extendTrials, 10);
    if (isNaN(trials) || trials <= 0) return;

    await resumeTask({
      variables: {
        taskId: task.id,
        additionalTrials: trials,
      },
    });
    refetchTask();
  };

  const selectedResult = useMemo(() => {
    return (
      results.find((r) => r.id === selectedResultId) ||
      bestResults.find((r) => r.id === selectedResultId)
    );
  }, [results, selectedResultId, bestResults]);

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(0, prev - limit));
  };

  const handleNextPage = () => {
    setOffset((prev) => prev + limit);
  };

  const currentPage = Math.floor(offset / limit) + 1;
  const hasPrevPage = offset > 0;
  const hasNextPage = results.length === limit;

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
            {task.searchStrategy && (
              <Chip
                size="sm"
                variant="flat"
                color={isOptuna ? "secondary" : "default"}
              >
                {isOptuna ? "Optuna" : "Grid"}
              </Chip>
            )}
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
            {isOptuna &&
              task.optimizationMetrics &&
              task.optimizationMetrics.length > 0 && (
                <>
                  <span>|</span>
                  <span className="text-secondary-400">
                    {task.optimizationMetrics.length > 3
                      ? `${task.optimizationMetrics.slice(0, 3).join(", ")}...`
                      : task.optimizationMetrics.join(", ")}
                  </span>
                </>
              )}
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

      {/* Best Configs Carousel */}
      {hasBestConfigs && bestResults.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-success-400 text-sm font-semibold">
              Best Configurations (Pareto Optimal)
            </h3>
            <Chip
              size="sm"
              variant="flat"
              color="success"
              classNames={{ base: "h-5" }}
            >
              {bestResults.length} config{bestResults.length > 1 ? "s" : ""}
            </Chip>
          </div>

          <div className="h-[450px] w-[400px]">
            <BestConfigCarousel
              results={bestResults}
              onSelectResult={setSelectedResultId}
            />
          </div>
        </div>
      )}

      {/* Best Config Loading State */}
      {hasBestConfigs && bestResultsLoading && (
        <div className="flex flex-col gap-3">
          <h3 className="text-success-400 text-sm font-semibold">
            Best Configurations
          </h3>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Spinner size="sm" />
            <span>Loading best configurations...</span>
          </div>
        </div>
      )}

      {/* Optuna Info Panel */}
      {isOptuna && (
        <div className="border-secondary-800 rounded-lg border p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-secondary-300 text-sm font-semibold">
                Optuna Optimization
              </h3>
              {task.trials && (
                <span className="text-sm text-neutral-400">
                  {task.trials} trials
                </span>
              )}
            </div>

            {/* Dashboard Controls */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-neutral-400">
                Optuna Dashboard
              </span>
              <div className="flex items-center gap-3">
                {isDashboardRunning ? (
                  <>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      startContent={<FiSquare className="h-3 w-3" />}
                      isLoading={stoppingDashboard}
                      onPress={handleStopDashboard}
                    >
                      Stop Dashboard
                    </Button>
                    {dashboardStatus?.url && (
                      <Link
                        href={dashboardStatus.url}
                        isExternal
                        showAnchorIcon
                        className="text-secondary-400 text-sm"
                      >
                        Open Dashboard
                      </Link>
                    )}
                  </>
                ) : (
                  <Button
                    size="sm"
                    color="secondary"
                    variant="flat"
                    startContent={<FiPlay className="h-3 w-3" />}
                    isLoading={startingDashboard}
                    onPress={handleStartDashboard}
                  >
                    Start Dashboard
                  </Button>
                )}
                <span className="text-xs text-neutral-500">
                  Study: task-{taskId.slice(0, 8)}...
                </span>
              </div>
            </div>

            {/* Extend Optimization Panel */}
            {task.status === "DONE" && (
              <div className="flex flex-col gap-2 border-t border-neutral-800 pt-3">
                <span className="text-xs font-medium text-neutral-400">
                  Extend Optimization
                </span>
                <div className="flex items-center gap-3">
                  <Input
                    size="sm"
                    variant="bordered"
                    placeholder="Trials"
                    value={extendTrials}
                    onValueChange={setExtendTrials}
                    className="w-24"
                    type="number"
                  />
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={handleExtendTask}
                    isLoading={resumingTask}
                    isDisabled={!extendTrials || parseInt(extendTrials) <= 0}
                  >
                    Add Trials & Resume
                  </Button>
                </div>
              </div>
            )}

            {/* Resume Optimization Panel (for FAILED/CANCELLED) */}
            {(task.status === "FAILED" || task.status === "CANCELLED") && (
              <div className="flex flex-col gap-2 border-t border-neutral-800 pt-3">
                <span className="text-xs font-medium text-neutral-400">
                  Resume Optimization
                </span>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    color="success"
                    variant="flat"
                    onPress={handleResumeTask}
                    isLoading={resumingTask}
                    startContent={!resumingTask && <FiPlay className="h-3 w-3" />}
                  >
                    Resume from Last Checkpoint
                  </Button>
                  <span className="text-xs text-neutral-500">
                    Continue from {task.processedConfigs} / {task.totalConfigs} trials
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
          Page {currentPage} · Showing {results.length} results
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

          {(hasPrevPage || hasNextPage) && (
            <div className="flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant="flat"
                startContent={<FiChevronLeft className="h-4 w-4" />}
                onPress={handlePrevPage}
                isDisabled={!hasPrevPage || resultsLoading}
              >
                Previous
              </Button>
              <span className="px-3 text-sm text-neutral-400">
                Page {currentPage}
              </span>
              <Button
                size="sm"
                variant="flat"
                endContent={<FiChevronRight className="h-4 w-4" />}
                onPress={handleNextPage}
                isDisabled={!hasNextPage || resultsLoading}
              >
                Next
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
