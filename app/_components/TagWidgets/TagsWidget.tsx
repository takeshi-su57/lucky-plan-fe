"use client";

import { useGetAllCategories, useGetAllTags } from "@/app-hooks/useTag";
import {
  useAddTagToWalletAccount,
  useGetTagsByAddress,
  useRemoveTagFromWalletAccount,
} from "@/app-hooks/useWalletAccount";
import { Tag, TagCategory, TagInfoFragment } from "@/graphql/gql/graphql";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Fragment, useMemo } from "react";

export type TagsWidgetProps = {
  address: string;
};

export function TagsWidget({ address }: TagsWidgetProps) {
  const allCategories = useGetAllCategories();
  const allTags = useGetAllTags();
  const tags = useGetTagsByAddress(address);

  const mutateAddTagToUser = useAddTagToWalletAccount();
  const mutateRemoveTagFromUser = useRemoveTagFromWalletAccount();

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

  const handleAddTag = (tag: string) => {
    mutateAddTagToUser({
      variables: {
        input: {
          address,
          tag: tag.toUpperCase(),
        },
      },
    });
  };

  const menuItems = useMemo(() => {
    const categoriesMap: Record<string, TagCategory> = {};
    const tagsMap: Record<string, Tag[]> = {};
    const noCategoryTags: Tag[] = [];

    allCategories.forEach(
      (category) => (categoriesMap[category.id] = category),
    );

    allTags.forEach((tag) => {
      if (tag.categoryId) {
        const arr = tagsMap[tag.categoryId];

        if (arr) {
          arr.push(tag);
        } else {
          tagsMap[tag.categoryId] = [tag];
        }
      } else {
        noCategoryTags.push(tag);
      }
    });

    return [
      ...noCategoryTags.map((tag) => ({
        id: tag.tag,
        title: tag.tag,
        color: tag.color,
        tags: [],
      })),
      ...Object.entries(tagsMap)
        .sort((a, b) => (a[0] > b[0] ? 1 : a[0] === b[0] ? 0 : -1))
        .map(([key, value]) => ({
          id: key,
          title: categoriesMap[key]?.category || "",
          color: "",
          tags: value,
        })),
    ];
  }, [allCategories, allTags]);

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

      <Popover placement="right">
        <PopoverTrigger>
          <Button color="default" className="underline" variant="light">
            + Add Tag
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex max-h-[300px] flex-col gap-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Fragment key={item.id}>
                {item.tags.length === 0 ? (
                  <Button
                    color="default"
                    variant="bordered"
                    className="mb-2 shrink-0"
                    fullWidth
                    onClick={() => handleAddTag(item.id)}
                  >
                    {item.title}
                    <span
                      className="h-5 w-10"
                      style={{ background: item.color }}
                    />
                  </Button>
                ) : (
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        color="default"
                        variant="bordered"
                        className="mb-2 shrink-0"
                        fullWidth
                      >
                        {item.title}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      classNames={{ list: "max-h-[250px] overflow-y-auto" }}
                    >
                      {item.tags.map((tag) => (
                        <DropdownItem
                          key={tag.tag}
                          onPress={() => handleAddTag(tag.tag)}
                        >
                          <div className="flex items-center gap-2">
                            {tag.tag}
                            <span
                              className="h-5 w-10"
                              style={{ background: tag.color }}
                            />
                          </div>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                )}
              </Fragment>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
