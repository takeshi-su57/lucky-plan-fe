"use client";

import { useState, useEffect } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Tag } from "@/graphql/gql/graphql";

import { StandardModal } from "@/components/modals/StandardModal";

import { isValidColor } from "@/utils";
import { useGetAllCategories, useUpsertTag } from "@/app/_hooks/useTag";

export type UpsertTagModalProps = {
  tag: Tag | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (value: boolean) => void;
};

export function UpsertTagModal({
  tag,
  isOpen,
  onClose,
  onOpenChange,
}: UpsertTagModalProps) {
  const allCategories = useGetAllCategories();

  const upsertTag = useUpsertTag();

  const [tagStr, setTagStr] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (tag) {
      setTagStr(tag.tag);
      setDescription(tag.description);
      setColor(tag.color);
      setCategory(tag.categoryId ? `${tag.categoryId}` : undefined);
    } else {
      setTagStr("");
      setDescription("");
      setColor("");
      setCategory(undefined);
    }
  }, [tag]);

  const isDisabled =
    tagStr.trim() === "" ||
    description.trim() === "" ||
    color.trim() === "" ||
    !isValidColor(color);

  const handleConfirm = () => {
    upsertTag({
      variables: {
        input: {
          tag: tagStr.toUpperCase(),
          description,
          color,
          categoryId: category ? +category : null,
        },
      },
    });

    onClose();
  };

  return (
    <StandardModal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <div className="flex flex-col gap-8">
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
          Create New Tag
        </h1>

        <Input
          variant="underlined"
          value={tagStr}
          onValueChange={setTagStr}
          label="Tag"
        />
        <Input
          variant="underlined"
          value={description}
          onValueChange={setDescription}
          label="Description"
        />
        <Input
          variant="underlined"
          value={color}
          onValueChange={setColor}
          label="Color"
        />
        <Select
          variant="underlined"
          label="Category"
          selectedKeys={category ? [category] : undefined}
          onChange={(e) => setCategory(e.target.value)}
          selectionMode="single"
          className="flex-1"
        >
          {allCategories.map((category) => (
            <SelectItem key={category.id}>{category.category}</SelectItem>
          ))}
        </Select>

        <Button onClick={handleConfirm} color="primary" isDisabled={isDisabled}>
          Save
        </Button>
      </div>
    </StandardModal>
  );
}
