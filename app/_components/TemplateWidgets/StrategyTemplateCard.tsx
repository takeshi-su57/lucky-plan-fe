"use client";

import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { FiEdit2, FiTrash2, FiPlay, FiPause } from "react-icons/fi";
import dayjs from "dayjs";

import { StrategyCategory } from "@/graphql/gql/graphql";
import { TemplateCategoryChip } from "./TemplateCategoryChip";

export type StrategyTemplateCardProps = {
  template: {
    id: string;
    name: string;
    description?: string | null;
    category: StrategyCategory;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  onEdit: (templateId: string) => void;
  onDelete: (templateId: string) => void;
  onNewSearch: (templateId: string) => void;
  onToggleActive?: (templateId: string, isActive: boolean) => void;
  isDeleting?: boolean;
};

export function StrategyTemplateCard({
  template,
  onEdit,
  onDelete,
  onNewSearch,
  onToggleActive,
  isDeleting,
}: StrategyTemplateCardProps) {
  return (
    <Card className="border border-neutral-800 bg-neutral-900/50">
      <CardHeader className="flex flex-col items-start gap-2 pb-2">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-base font-semibold text-white">{template.name}</h3>
          <div className="flex items-center gap-2">
            <TemplateCategoryChip category={template.category} />
            {!template.isActive && (
              <span className="text-xs text-neutral-500">Inactive</span>
            )}
          </div>
        </div>
        {template.description && (
          <p className="line-clamp-2 text-sm text-neutral-400">
            {template.description}
          </p>
        )}
      </CardHeader>

      <CardBody className="py-2">
        <div className="flex items-center gap-4 text-xs text-neutral-500">
          <span>Created: {dayjs(template.createdAt).format("YYYY-MM-DD")}</span>
          <span>Updated: {dayjs(template.updatedAt).format("YYYY-MM-DD")}</span>
        </div>
      </CardBody>

      <CardFooter className="flex items-center justify-between gap-2 pt-2">
        <Button
          size="sm"
          color="secondary"
          variant="flat"
          startContent={<FiPlay className="h-3 w-3" />}
          onPress={() => onNewSearch(template.id)}
        >
          New Search
        </Button>

        <div className="flex items-center gap-2">
          {onToggleActive && (
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              color={template.isActive ? "warning" : "success"}
              onPress={() => onToggleActive(template.id, !template.isActive)}
            >
              {template.isActive ? (
                <FiPause className="h-3 w-3" />
              ) : (
                <FiPlay className="h-3 w-3" />
              )}
            </Button>
          )}

          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => onEdit(template.id)}
          >
            <FiEdit2 className="h-3 w-3" />
          </Button>

          <Button
            isIconOnly
            size="sm"
            variant="flat"
            color="danger"
            isLoading={isDeleting}
            onPress={() => onDelete(template.id)}
          >
            <FiTrash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
