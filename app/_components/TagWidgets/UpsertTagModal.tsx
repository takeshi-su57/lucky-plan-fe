"use client";

import { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { TagInfoFragment } from "@/graphql/gql/graphql";

import { StandardModal } from "@/components/modals/StandardModal";

import { isValidColor } from "@/utils";
import { useUpsertTag } from "@/app/_hooks/useTag";

export type UpsertTagModalProps = {
  tag: TagInfoFragment | null;
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
  const upsertTag = useUpsertTag();

  const [tagStr, setTagStr] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (tag) {
      setTagStr(tag.tag);
      setDescription(tag.description);
      setColor(tag.color);
    } else {
      setTagStr("");
      setDescription("");
      setColor("");
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

        <Button onClick={handleConfirm} color="primary" isDisabled={isDisabled}>
          Save
        </Button>
      </div>
    </StandardModal>
  );
}
