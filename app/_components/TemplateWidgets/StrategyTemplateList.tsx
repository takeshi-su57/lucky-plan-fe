"use client";

import { useState } from "react";
import { Select, SelectItem, Button, Switch, Spinner } from "@heroui/react";
import { FiRefreshCw } from "react-icons/fi";

import { StrategyCategory } from "@/graphql/gql/graphql";
import { PaginatedViews } from "@/components/views/PaginatedViews";
import {
  useStrategyTemplates,
  useDeleteStrategyTemplate,
  useUpdateStrategyTemplate,
} from "@/app-hooks/useStrategyTemplate";
import { StrategyTemplateCard } from "./StrategyTemplateCard";

const PAGE_SIZE = 9;

const categoryOptions = [
  { key: "all", label: "All Categories" },
  { key: StrategyCategory.TrendFollowing, label: "Trend Following" },
  { key: StrategyCategory.MeanReversion, label: "Mean Reversion" },
  { key: StrategyCategory.Momentum, label: "Momentum" },
  { key: StrategyCategory.Breakout, label: "Breakout" },
  { key: StrategyCategory.Scalping, label: "Scalping" },
  { key: StrategyCategory.Swing, label: "Swing" },
  { key: StrategyCategory.Volatility, label: "Volatility" },
  { key: StrategyCategory.Custom, label: "Custom" },
];

export type StrategyTemplateListProps = {
  onEdit: (templateId: string) => void;
  onNewSearch: (templateId: string) => void;
};

export function StrategyTemplateList({
  onEdit,
  onNewSearch,
}: StrategyTemplateListProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showInactive, setShowInactive] = useState(false);
  const [actionTemplateId, setActionTemplateId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { templates, loading, refetch } = useStrategyTemplates({
    category: categoryFilter === "all" ? undefined : (categoryFilter as StrategyCategory),
    isActive: showInactive ? undefined : true,
    limit: 50,
  });

  const { deleteTemplate, loading: deleteLoading } = useDeleteStrategyTemplate();
  const { updateTemplate, loading: updateLoading } = useUpdateStrategyTemplate();

  const handleDelete = async (templateId: string) => {
    setActionTemplateId(templateId);
    await deleteTemplate({ variables: { id: templateId } });
    setActionTemplateId(null);
  };

  const handleToggleActive = async (templateId: string, isActive: boolean) => {
    setActionTemplateId(templateId);
    await updateTemplate({ variables: { input: { id: templateId, isActive } } });
    setActionTemplateId(null);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select
          label="Category"
          size="sm"
          variant="bordered"
          selectedKeys={[categoryFilter]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            setCategoryFilter(selected);
            setPage(1);
          }}
          className="w-48"
        >
          {categoryOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>

        <div className="flex items-center gap-2">
          <Switch
            size="sm"
            isSelected={showInactive}
            onValueChange={setShowInactive}
          />
          <span className="text-sm text-neutral-400">Show Inactive</span>
        </div>

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

      {/* Template Grid */}
      {templates.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-neutral-400">
          <p>No strategy templates found</p>
          <p className="text-sm">
            Click &quot;Add Template&quot; to create your first template
          </p>
        </div>
      ) : (
        <PaginatedViews
          currentPage={page}
          totalPages={Math.ceil(templates.length / PAGE_SIZE)}
          onChangePage={setPage}
          loading={loading}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates
              .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
              .map((template) => (
                <StrategyTemplateCard
                  key={template.id}
                  template={{
                    id: template.id,
                    name: template.name,
                    description: template.description,
                    category: template.category,
                    isActive: template.isActive,
                    createdAt: template.createdAt,
                    updatedAt: template.updatedAt,
                  }}
                  onEdit={onEdit}
                  onDelete={handleDelete}
                  onNewSearch={onNewSearch}
                  onToggleActive={handleToggleActive}
                  isDeleting={deleteLoading && actionTemplateId === template.id}
                />
              ))}
          </div>
        </PaginatedViews>
      )}
    </div>
  );
}
