"use client";

import { useGetAllTags } from "@/app/_hooks/useTag";
import {
  useAddTagToUser,
  useGetTagsByAddress,
  useRemoveTagFromUser,
} from "@/app/_hooks/useUser";
import { TagInfoFragment } from "@/graphql/gql/graphql";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export type TagsWidgetProps = {
  address: string;
};

export function TagsWidget({ address }: TagsWidgetProps) {
  const allTags = useGetAllTags();
  const tags = useGetTagsByAddress(address);

  const mutateAddTagToUser = useAddTagToUser();
  const mutateRemoveTagFromUser = useRemoveTagFromUser();

  const handleRemoveTag = (tag: TagInfoFragment) => {
    mutateRemoveTagFromUser({
      variables: {
        input: {
          address,
          tag: tag.tag.toUpperCase(),
        },
      },
    });
  };

  const handleAddTag = (tag: TagInfoFragment) => {
    mutateAddTagToUser({
      variables: {
        input: {
          address,
          tag: tag.tag.toUpperCase(),
        },
      },
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {tags.map((tag) => (
        <Button
          key={tag.tag}
          onClick={() => handleRemoveTag(tag)}
          variant="bordered"
          size="sm"
          className="rounded-full"
          style={{ color: tag.color, borderColor: tag.color }}
        >
          {tag.tag}
        </Button>
      ))}

      <Dropdown>
        <DropdownTrigger>
          <Button color="primary" variant="light">
            + Add Tag
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {allTags.map((tag) => (
            <DropdownItem key={tag.tag} onPress={() => handleAddTag(tag)}>
              <div className="flex items-center gap-2">
                {tag.tag}
                <span className="h-5 w-10" style={{ background: tag.color }} />
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
