"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Card,
  Button,
  CardBody,
  useDisclosure,
  Tabs,
  Tab,
} from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { Tag, TagCategory } from "@/graphql/gql/graphql";
import {
  useDeleteCategory,
  useDeleteTag,
  useGetAllCategories,
  useGetAllTags,
} from "@/app-hooks/useTag";
import { UpsertTagModal } from "@/app-components/TagWidgets/UpsertTagModal";
import { FaPlus } from "react-icons/fa";
import { UpsertTagCategoryModal } from "@/app-components/TagWidgets/UpsertTagCategoryModal";

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

const categoryColumns: TableColumnProps[] = [
  {
    id: "id",
    component: "Id",
  },
  {
    id: "category",
    component: "Category",
  },
  {
    id: "description",
    component: "Description",
  },
  {
    id: "action",
    component: "",
    className: "flex-end",
  },
];

type TabType = "tag" | "category";

export default function Page() {
  const allTags = useGetAllTags();
  const allCategories = useGetAllCategories();

  const mutateDeleteTag = useDeleteTag();
  const mutateDeleteCategory = useDeleteCategory();

  const {
    isOpen: isTagOpen,
    onOpen: onTagOpen,
    onClose: onTagClose,
    onOpenChange: onTagOpenChange,
  } = useDisclosure();

  const {
    isOpen: isCategoryOpen,
    onOpen: onCategoryOpen,
    onClose: onCategoryClose,
    onOpenChange: onCategoryOpenChange,
  } = useDisclosure();

  const [selected, setSelected] = useState<TabType>("tag");

  const [tag, setTag] = useState<Tag | null>(null);
  const [category, setCategory] = useState<TagCategory | null>(null);

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

  const handleUpdateCategory = useCallback(
    (value: TagCategory) => {
      setCategory(value);
      onCategoryOpen();
    },
    [onCategoryOpen],
  );

  const handleDeleteCategory = useCallback(
    (value: TagCategory) => {
      mutateDeleteCategory({
        variables: {
          id: value.id,
        },
      });
    },
    [mutateDeleteCategory],
  );

  const handleAddNew = () => {
    if (selected === "tag") {
      setTag(null);
      onTagOpen();
    } else {
      setCategory(null);
      onCategoryOpen();
    }
  };

  const categoryRows = useMemo(() => {
    return allCategories
      .sort((a, b) =>
        a.category >= b.category ? (a.category === b.category ? 0 : 1) : -1,
      )
      .map((category) => ({
        id: `${category.id}`,
        className: "group",
        data: {
          id: {
            component: category.id,
          },
          category: {
            component: category.category,
          },
          description: {
            component: category.description,
          },
          action: {
            component: (
              <div className="flex items-center justify-end gap-2">
                <Button
                  onClick={() => handleUpdateCategory(category)}
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteCategory(category)}
                  color="danger"
                >
                  Delete
                </Button>
              </div>
            ),
          },
        },
      }));
  }, [allCategories, handleDeleteCategory, handleUpdateCategory]);

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
      <div className="flex items-center justify-between">
        <Tabs
          aria-label="users-table-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => value && setSelected(value as TabType)}
        >
          <Tab key="tag" title="Tag" />
          <Tab key="live" title="Category" />
        </Tabs>

        <Button
          isIconOnly
          color="primary"
          variant="flat"
          onClick={handleAddNew}
        >
          <FaPlus />
        </Button>
      </div>

      <Card>
        <CardBody>
          {selected === "tag" ? (
            <DataTable
              columns={tagColumns}
              rows={tagRows}
              classNames={{
                tr: "font-mono cursor-pointer",
                td: "py-3 ",
                th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
              }}
            />
          ) : (
            <DataTable
              columns={categoryColumns}
              rows={categoryRows}
              classNames={{
                tr: "font-mono cursor-pointer",
                td: "py-3 ",
                th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
              }}
            />
          )}
        </CardBody>
      </Card>

      <UpsertTagModal
        isOpen={isTagOpen}
        onOpenChange={onTagOpenChange}
        onClose={onTagClose}
        tag={tag}
      />

      <UpsertTagCategoryModal
        isOpen={isCategoryOpen}
        onOpenChange={onCategoryOpenChange}
        onClose={onCategoryClose}
        category={category}
      />
    </div>
  );
}
