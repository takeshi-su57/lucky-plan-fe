"use client";

import { useState, useMemo } from "react";
import {
  Select,
  SelectItem,
  Button,
  Card,
  CardBody,
  Chip,
} from "@heroui/react";
import {
  FiRefreshCw,
  FiChevronLeft,
  FiSearch,
  FiGrid,
  FiLayers,
} from "react-icons/fi";

import { BacktestTaskStatus, StrategyCategory } from "@/graphql/gql/graphql";
import { PaginatedViews } from "@/components/views/PaginatedViews";
import {
  useBacktestTasks,
  useBacktestTaskStats,
  useCancelBacktestTask,
  useDeleteBacktestTask,
  useRetryBacktestTask,
} from "@/app-hooks/useBacktest";
import { useStrategyTemplates } from "@/app-hooks/useStrategyTemplate";
import { BacktestTaskRow } from "./BacktestTaskRow";
import { BacktestTaskStatusBadge } from "./BacktestTaskStatusBadge";
import { TemplateCategoryChip } from "@/app-components/TemplateWidgets/TemplateCategoryChip";

const PAGE_SIZE = 10;
const INDIVIDUAL_TEMPLATE_ID = "__individual_template__";
const INDIVIDUAL_SEARCH_ID = "__individual_search__";

const statusOptions = [
  { key: "all", label: "All Status" },
  { key: BacktestTaskStatus.Await, label: "Awaiting" },
  { key: BacktestTaskStatus.Processing, label: "Processing" },
  { key: BacktestTaskStatus.Done, label: "Done" },
  { key: BacktestTaskStatus.Failed, label: "Failed" },
  { key: BacktestTaskStatus.Cancelled, label: "Cancelled" },
];

type TaskData = {
  id: string;
  name: string;
  symbol: string;
  status: BacktestTaskStatus;
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
  templateId?: string | null;
  templateSearchId?: string | null;
};

type StatusCounts = {
  await: number;
  processing: number;
  done: number;
  failed: number;
  cancelled: number;
};

// Search group - secondary grouping level (within a template)
type SearchGroup = {
  searchId: string;
  templateSearchId: string | null;
  isIndividual: boolean;
  symbol: string;
  searchStrategy: string | null;
  createdAt: Date;
  tasks: TaskData[];
  statusCounts: StatusCounts;
};

// Template group - primary grouping level
type TemplateGroup = {
  templateId: string;
  templateName: string | null;
  templateCategory: StrategyCategory | null;
  isIndividual: boolean;
  searches: SearchGroup[];
  totalTasks: number;
  statusCounts: StatusCounts;
  createdAt: Date;
};

function countStatus(counts: StatusCounts, status: BacktestTaskStatus) {
  switch (status) {
    case BacktestTaskStatus.Await:
      counts.await++;
      break;
    case BacktestTaskStatus.Processing:
      counts.processing++;
      break;
    case BacktestTaskStatus.Done:
      counts.done++;
      break;
    case BacktestTaskStatus.Failed:
      counts.failed++;
      break;
    case BacktestTaskStatus.Cancelled:
      counts.cancelled++;
      break;
  }
}

function createEmptyStatusCounts(): StatusCounts {
  return { await: 0, processing: 0, done: 0, failed: 0, cancelled: 0 };
}

export function UnifiedTaskList() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );
  const [selectedSearchId, setSelectedSearchId] = useState<string | null>(null);
  const [actionTaskId, setActionTaskId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { stats, refetch: refetchStats } = useBacktestTaskStats();
  const { tasks, loading, refetch } = useBacktestTasks({
    status:
      statusFilter === "all" ? undefined : (statusFilter as BacktestTaskStatus),
    limit: 100,
  });

  // Get templates for names
  const { templates } = useStrategyTemplates({ limit: 100 });
  const templateMap = useMemo(() => {
    const map = new Map<string, { name: string; category: StrategyCategory }>();
    for (const t of templates) {
      map.set(t.id, { name: t.name, category: t.category });
    }
    return map;
  }, [templates]);

  const { cancelTask, loading: cancelLoading } = useCancelBacktestTask();
  const { deleteTask, loading: deleteLoading } = useDeleteBacktestTask();
  const { retryTask, loading: retryLoading } = useRetryBacktestTask();

  // Group tasks by templateId (primary) then by templateSearchId (secondary)
  const templateGroups = useMemo(() => {
    const templates = new Map<string, TemplateGroup>();

    for (const task of tasks) {
      const templateId = task.templateId ?? INDIVIDUAL_TEMPLATE_ID;
      const searchId = task.templateSearchId ?? INDIVIDUAL_SEARCH_ID;

      const taskData: TaskData = {
        id: task.id,
        name: task.name,
        symbol: task.symbol,
        status: task.status,
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
        templateId: task.templateId,
        templateSearchId: task.templateSearchId,
      };

      // Initialize template group if needed
      if (!templates.has(templateId)) {
        const templateInfo =
          templateId !== INDIVIDUAL_TEMPLATE_ID
            ? templateMap.get(templateId)
            : null;

        templates.set(templateId, {
          templateId,
          templateName: templateInfo?.name ?? null,
          templateCategory: templateInfo?.category ?? null,
          isIndividual: templateId === INDIVIDUAL_TEMPLATE_ID,
          searches: [],
          totalTasks: 0,
          statusCounts: createEmptyStatusCounts(),
          createdAt: task.createdAt,
        });
      }

      const templateGroup = templates.get(templateId)!;

      // Find or create search group within template
      let searchGroup = templateGroup.searches.find(
        (s) => s.searchId === searchId,
      );
      if (!searchGroup) {
        searchGroup = {
          searchId,
          templateSearchId: task.templateSearchId ?? null,
          isIndividual: searchId === INDIVIDUAL_SEARCH_ID,
          symbol: task.symbol,
          searchStrategy: task.searchStrategy ?? null,
          createdAt: task.createdAt,
          tasks: [],
          statusCounts: createEmptyStatusCounts(),
        };
        templateGroup.searches.push(searchGroup);
      }

      // Add task to search group
      searchGroup.tasks.push(taskData);
      countStatus(searchGroup.statusCounts, task.status);

      // Update template group stats
      templateGroup.totalTasks++;
      countStatus(templateGroup.statusCounts, task.status);

      // Update template createdAt to the earliest task
      if (new Date(task.createdAt) < new Date(templateGroup.createdAt)) {
        templateGroup.createdAt = task.createdAt;
      }
    }

    // Sort searches within each template by creation date (newest first)
    for (const templateGroup of templates.values()) {
      templateGroup.searches.sort((a, b) => {
        if (a.isIndividual) return 1;
        if (b.isIndividual) return -1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }

    // Convert to array and sort (individual at end, then by creation date)
    return Array.from(templates.values())
      .filter((t) => t.totalTasks > 0)
      .sort((a, b) => {
        if (a.isIndividual) return 1;
        if (b.isIndividual) return -1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
  }, [tasks, templateMap]);

  // Get selected template and search
  const selectedTemplate = selectedTemplateId
    ? templateGroups.find((t) => t.templateId === selectedTemplateId)
    : null;

  const selectedSearch =
    selectedTemplate && selectedSearchId
      ? selectedTemplate.searches.find((s) => s.searchId === selectedSearchId)
      : null;

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

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setSelectedSearchId(null);
    setPage(1);
  };

  const handleSelectSearch = (searchId: string) => {
    setSelectedSearchId(searchId);
    setPage(1);
  };

  const handleBack = () => {
    if (selectedSearchId) {
      // Go back to template's search list
      setSelectedSearchId(null);
    } else if (selectedTemplateId) {
      // Go back to template list
      setSelectedTemplateId(null);
    }
    setPage(1);
  };

  // Determine current view level
  const viewLevel = selectedSearchId
    ? "tasks"
    : selectedTemplateId
      ? "searches"
      : "templates";

  // Get breadcrumb info
  const getBreadcrumb = () => {
    if (viewLevel === "tasks" && selectedTemplate && selectedSearch) {
      return (
        <div className="flex items-center gap-2">
          <FiSearch className="text-secondary-400 h-4 w-4" />
          <span className="text-sm font-medium text-white">
            {selectedSearch.isIndividual
              ? "Individual Tasks"
              : selectedSearch.symbol}
          </span>
          {selectedSearch.searchStrategy && (
            <Chip size="sm" variant="flat" className="text-xs capitalize">
              {selectedSearch.searchStrategy}
            </Chip>
          )}
          <Chip size="sm" variant="flat">
            {selectedSearch.tasks.length} tasks
          </Chip>
        </div>
      );
    }

    if (viewLevel === "searches" && selectedTemplate) {
      return (
        <div className="flex items-center gap-2">
          {selectedTemplate.isIndividual ? (
            <FiGrid className="h-4 w-4 text-neutral-400" />
          ) : (
            <FiLayers className="text-primary-400 h-4 w-4" />
          )}
          <span className="text-sm font-medium text-white">
            {selectedTemplate.isIndividual
              ? "Individual Tasks"
              : (selectedTemplate.templateName ?? "Unknown Template")}
          </span>
          {selectedTemplate.templateCategory && (
            <TemplateCategoryChip
              category={selectedTemplate.templateCategory}
              size="sm"
            />
          )}
          <Chip size="sm" variant="flat">
            {selectedTemplate.searches.length} searches
          </Chip>
        </div>
      );
    }

    return null;
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

      {/* Header with back button or filters */}
      <div className="flex items-center gap-4">
        {viewLevel !== "templates" ? (
          <>
            <Button
              size="sm"
              variant="flat"
              startContent={<FiChevronLeft className="h-4 w-4" />}
              onPress={handleBack}
            >
              Back
            </Button>
            {getBreadcrumb()}
          </>
        ) : (
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
        )}

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

      {/* Content based on view level */}
      {viewLevel === "tasks" && selectedSearch ? (
        // Task list view
        selectedSearch.tasks.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-neutral-400">
            <p>No tasks found in this search</p>
          </div>
        ) : (
          <PaginatedViews
            currentPage={page}
            totalPages={Math.ceil(selectedSearch.tasks.length / PAGE_SIZE)}
            onChangePage={setPage}
            loading={loading}
          >
            <div className="flex flex-col gap-3">
              {selectedSearch.tasks
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
        )
      ) : viewLevel === "searches" && selectedTemplate ? (
        // Search groups view within a template
        selectedTemplate.searches.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-neutral-400">
            <p>No searches found for this template</p>
          </div>
        ) : (
          <PaginatedViews
            currentPage={page}
            totalPages={Math.ceil(selectedTemplate.searches.length / PAGE_SIZE)}
            onChangePage={setPage}
            loading={loading}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selectedTemplate.searches
                .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
                .map((search) => (
                  <SearchGroupCard
                    key={search.searchId}
                    search={search}
                    onClick={() => handleSelectSearch(search.searchId)}
                  />
                ))}
            </div>
          </PaginatedViews>
        )
      ) : // Template groups view (top level)
      templateGroups.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-neutral-400">
          <p>No backtest tasks found</p>
          <p className="text-sm">
            Click &quot;Add Task&quot; to create your first backtest
          </p>
        </div>
      ) : (
        <PaginatedViews
          currentPage={page}
          totalPages={Math.ceil(templateGroups.length / PAGE_SIZE)}
          onChangePage={setPage}
          loading={loading}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templateGroups
              .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
              .map((template) => (
                <TemplateGroupCard
                  key={template.templateId}
                  template={template}
                  onClick={() => handleSelectTemplate(template.templateId)}
                />
              ))}
          </div>
        </PaginatedViews>
      )}
    </div>
  );
}

// Template Group Card Component (top level)
type TemplateGroupCardProps = {
  template: TemplateGroup;
  onClick: () => void;
};

function TemplateGroupCard({ template, onClick }: TemplateGroupCardProps) {
  const hasActive =
    template.statusCounts.await > 0 || template.statusCounts.processing > 0;

  return (
    <Card
      isPressable
      onPress={onClick}
      className="border border-neutral-800 bg-neutral-900/50 transition-colors hover:border-neutral-700"
    >
      <CardBody className="gap-3">
        {/* Header - Template name or Individual */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {template.isIndividual ? (
              <FiGrid className="h-4 w-4 text-neutral-400" />
            ) : (
              <FiLayers className="text-primary-400 h-4 w-4" />
            )}
            <span className="font-semibold text-white">
              {template.isIndividual
                ? "Individual Tasks"
                : (template.templateName ?? "Unknown Template")}
            </span>
          </div>
          {hasActive && (
            <Chip size="sm" color="primary" variant="dot">
              Active
            </Chip>
          )}
        </div>

        {/* Template category */}
        {template.templateCategory && (
          <TemplateCategoryChip
            category={template.templateCategory}
            size="sm"
          />
        )}

        {/* Counts */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-400">
            {template.searches.length}{" "}
            {template.searches.length === 1 ? "search" : "searches"}
          </span>
          <span className="text-sm text-neutral-400">
            {template.totalTasks} {template.totalTasks === 1 ? "task" : "tasks"}
          </span>
        </div>

        {/* Status breakdown */}
        <StatusBreakdown statusCounts={template.statusCounts} />
      </CardBody>
    </Card>
  );
}

// Search Group Card Component (within a template)
type SearchGroupCardProps = {
  search: SearchGroup;
  onClick: () => void;
};

function SearchGroupCard({ search, onClick }: SearchGroupCardProps) {
  const totalTasks = search.tasks.length;
  const hasActive =
    search.statusCounts.await > 0 || search.statusCounts.processing > 0;

  return (
    <Card
      isPressable
      onPress={onClick}
      className="border border-neutral-800 bg-neutral-900/50 transition-colors hover:border-neutral-700"
    >
      <CardBody className="gap-3">
        {/* Header - Symbol or Individual */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {search.isIndividual ? (
              <FiGrid className="h-4 w-4 text-neutral-400" />
            ) : (
              <FiSearch className="text-secondary-400 h-4 w-4" />
            )}
            <span className="font-semibold text-white">
              {search.isIndividual ? "Individual Tasks" : search.symbol}
            </span>
          </div>
          {hasActive && (
            <Chip size="sm" color="primary" variant="dot">
              Active
            </Chip>
          )}
        </div>

        {/* Search strategy */}
        {search.searchStrategy && (
          <Chip size="sm" variant="flat" className="w-fit text-xs capitalize">
            {search.searchStrategy}
          </Chip>
        )}

        {/* Task count */}
        <div className="flex items-center">
          <span className="text-sm text-neutral-400">
            {totalTasks} {totalTasks === 1 ? "task" : "tasks"}
          </span>
        </div>

        {/* Status breakdown */}
        <StatusBreakdown statusCounts={search.statusCounts} />
      </CardBody>
    </Card>
  );
}

// Shared status breakdown component
function StatusBreakdown({ statusCounts }: { statusCounts: StatusCounts }) {
  return (
    <div className="flex flex-wrap gap-2">
      {statusCounts.processing > 0 && (
        <div className="flex items-center gap-1">
          <BacktestTaskStatusBadge
            status={BacktestTaskStatus.Processing}
            size="sm"
          />
          <span className="text-xs text-neutral-400">
            {statusCounts.processing}
          </span>
        </div>
      )}
      {statusCounts.await > 0 && (
        <div className="flex items-center gap-1">
          <BacktestTaskStatusBadge
            status={BacktestTaskStatus.Await}
            size="sm"
          />
          <span className="text-xs text-neutral-400">{statusCounts.await}</span>
        </div>
      )}
      {statusCounts.done > 0 && (
        <div className="flex items-center gap-1">
          <BacktestTaskStatusBadge status={BacktestTaskStatus.Done} size="sm" />
          <span className="text-xs text-neutral-400">{statusCounts.done}</span>
        </div>
      )}
      {statusCounts.failed > 0 && (
        <div className="flex items-center gap-1">
          <BacktestTaskStatusBadge
            status={BacktestTaskStatus.Failed}
            size="sm"
          />
          <span className="text-xs text-neutral-400">
            {statusCounts.failed}
          </span>
        </div>
      )}
    </div>
  );
}
