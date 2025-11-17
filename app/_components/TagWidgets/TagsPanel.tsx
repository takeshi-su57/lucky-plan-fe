"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, Button, CardBody, useDisclosure } from "@heroui/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { Tag, TagCategory } from "@/graphql/gql/graphql";
import {
  useDeleteTag,
  useGetAllCategories,
  useGetAllTags,
} from "@/app-hooks/useTag";
import { UpsertTagModal } from "@/app-components/TagWidgets/UpsertTagModal";
import { FaPlus } from "react-icons/fa";

const tagColumns: TableColumnProps[] = [
  {
    id: "category",
    component: "Category",
  },
  {
    id: "tag",
    component: "Tag",
  },
  {
    id: "description",
    component: "Description",
  },
  {
    id: "color",
    component: "Color",
  },
  {
    id: "action",
    component: "",
    className: "flex-end",
  },
];

export function TagsPanel() {
  const allTags = useGetAllTags();
  const allCategories = useGetAllCategories();

  const mutateDeleteTag = useDeleteTag();

  const {
    isOpen: isTagOpen,
    onOpen: onTagOpen,
    onClose: onTagClose,
    onOpenChange: onTagOpenChange,
  } = useDisclosure();

  const [tag, setTag] = useState<Tag | null>(null);

  const handleDeleteTag = useCallback(
    (value: Tag) => {
      mutateDeleteTag({
        variables: {
          tag: value.tag.toUpperCase(),
        },
      });
    },
    [mutateDeleteTag],
  );

  const handleUpdateTag = useCallback(
    (value: Tag) => {
      setTag(value);

      onTagOpen();
    },
    [onTagOpen],
  );

  const handleAddNew = () => {
    setTag(null);
    onTagOpen();
  };

  const tagRows = useMemo(() => {
    const categoryMap: Record<string, TagCategory> = {};

    allCategories.forEach((category) => (categoryMap[category.id] = category));

    return allTags
      .map((tag) => ({
        ...tag,
        category:
          tag.categoryId && categoryMap[tag.categoryId]
            ? categoryMap[tag.categoryId].category
            : "",
      }))
      .sort((a, b) =>
        a.category >= b.category ? (a.category === b.category ? 0 : 1) : -1,
      )
      .map((tag) => ({
        id: tag.tag,
        className: "group",
        data: {
          category: {
            component: tag.category,
          },
          tag: {
            component: tag.tag,
          },
          description: {
            component: tag.description,
          },
          color: {
            component: (
              <div className="h-5 w-10" style={{ background: tag.color }} />
            ),
          },
          action: {
            component: (
              <div className="flex items-center justify-end gap-2">
                <Button onClick={() => handleUpdateTag(tag)} color="primary">
                  Edit
                </Button>
                <Button onClick={() => handleDeleteTag(tag)} color="danger">
                  Delete
                </Button>
              </div>
            ),
          },
        },
      }));
  }, [allCategories, allTags, handleDeleteTag, handleUpdateTag]);

  return (
    <div className="flex flex-col gap-6">
      <Button isIconOnly color="primary" variant="flat" onClick={handleAddNew}>
        <FaPlus />
      </Button>

      <Card>
        <CardBody>
          <DataTable
            columns={tagColumns}
            rows={tagRows}
            classNames={{
              tr: "font-mono cursor-pointer",
              td: "py-3 ",
              th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
            }}
          />
        </CardBody>
      </Card>

      <UpsertTagModal
        isOpen={isTagOpen}
        onOpenChange={onTagOpenChange}
        onClose={onTagClose}
        tag={tag}
      />
    </div>
  );
}
