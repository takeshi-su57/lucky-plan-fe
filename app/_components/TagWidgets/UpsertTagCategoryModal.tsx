"use client";

import { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { TagCategory } from "@/graphql/gql/graphql";

import { StandardModal } from "@/components/modals/StandardModal";

import { useUpsertCategory } from "@/app/_hooks/useTag";

export type UpsertTagCategoryModalProps = {
  category: TagCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (value: boolean) => void;
};

export function UpsertTagCategoryModal({
  category,
  isOpen,
  onClose,
  onOpenChange,
}: UpsertTagCategoryModalProps) {
  const upsertCategory = useUpsertCategory();

  const [categoryStr, setCategoryStr] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (category) {
      setCategoryStr(category.category);
      setDescription(category.description);
    } else {
      setCategoryStr("");
      setDescription("");
    }
  }, [category]);

  const isDisabled = categoryStr.trim() === "" || description.trim() === "";

  const handleConfirm = () => {
    upsertCategory({
      variables: {
        input: {
          category: categoryStr.toUpperCase(),
          description,
        },
      },
    });

    onClose();
  };

  return (
    <StandardModal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <div className="flex flex-col gap-8">
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
          Create New Category
        </h1>

        <Input
          variant="underlined"
          value={categoryStr}
          onValueChange={setCategoryStr}
          label="Category"
        />
        <Input
          variant="underlined"
          value={description}
          onValueChange={setDescription}
          label="Description"
        />

        <Button onClick={handleConfirm} color="primary" isDisabled={isDisabled}>
          Save
        </Button>
      </div>
    </StandardModal>
  );
}
