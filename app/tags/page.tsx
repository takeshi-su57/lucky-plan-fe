"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, Button, CardBody, useDisclosure } from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { TagInfoFragment } from "@/graphql/gql/graphql";
import { useDeleteTag, useGetAllTags } from "../_hooks/useTag";
import { UpsertTagModal } from "../_components/TagWidgets/UpsertTagModal";

const columns: TableColumnProps[] = [
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

export default function Page() {
  const allTags = useGetAllTags();
  const mutateDeleteTag = useDeleteTag();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [tag, setTag] = useState<TagInfoFragment | null>(null);

  const handleDeleteTag = useCallback(
    (value: TagInfoFragment) => {
      mutateDeleteTag({
        variables: {
          tag: value.tag.toUpperCase(),
        },
      });
    },
    [mutateDeleteTag],
  );

  const handleUpdateTag = useCallback(
    (value: TagInfoFragment) => {
      setTag(value);

      onOpen();
    },
    [onOpen],
  );

  const handleAddNewTag = () => {
    setTag(null);

    onOpen();
  };

  const rows = useMemo(() => {
    return allTags.map((tag) => ({
      id: tag.tag,
      className: "group",
      data: {
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
  }, [allTags, handleDeleteTag, handleUpdateTag]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-end">
        <Button color="primary" onClick={handleAddNewTag}>
          Add New Tag
        </Button>
      </div>

      <Card>
        <CardBody>
          <DataTable
            columns={columns}
            rows={rows}
            classNames={{
              tr: "font-mono cursor-pointer",
              td: "py-3 ",
              th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
            }}
          />
        </CardBody>
      </Card>

      <UpsertTagModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        tag={tag}
      />
    </div>
  );
}
