"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, Button, CardBody, useDisclosure } from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { TagCategory } from "@/graphql/gql/graphql";
import { useDeleteCategory, useGetAllCategories } from "@/app-hooks/useTag";
import { FaPlus } from "react-icons/fa";
import { UpsertTagCategoryModal } from "@/app-components/TagWidgets/UpsertTagCategoryModal";

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

export function CategoriesPanel() {
  const allCategories = useGetAllCategories();

  const mutateDeleteCategory = useDeleteCategory();

  const {
    isOpen: isCategoryOpen,
    onOpen: onCategoryOpen,
    onClose: onCategoryClose,
    onOpenChange: onCategoryOpenChange,
  } = useDisclosure();

  const [category, setCategory] = useState<TagCategory | null>(null);
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
    setCategory(null);
    onCategoryOpen();
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

  return (
    <div className="flex flex-col gap-6">
      <Button isIconOnly color="primary" variant="flat" onClick={handleAddNew}>
        <FaPlus />
      </Button>

      <Card>
        <CardBody>
          <DataTable
            columns={categoryColumns}
            rows={categoryRows}
            classNames={{
              tr: "font-mono cursor-pointer",
              td: "py-3 ",
              th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
            }}
          />
        </CardBody>
      </Card>

      <UpsertTagCategoryModal
        isOpen={isCategoryOpen}
        onOpenChange={onCategoryOpenChange}
        onClose={onCategoryClose}
        category={category}
      />
    </div>
  );
}
