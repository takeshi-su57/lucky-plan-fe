"use client";

import { ReactNode } from "react";
import { Button, useDisclosure } from "@heroui/react";
import { twMerge } from "tailwind-merge";

import { StandardModal } from "./StandardModal";
import { RightDrawer } from "./RightDrawer";

export type ModaledItemsProps = {
  mode?: "modal" | "rightDrawer";
  trigger: ReactNode;
  content: ReactNode;
  contentTitle?: string;
  classNames?: {
    trigger?: string;
    content?: string;
  };
};

export function ModaledItems({
  mode = "modal",
  trigger,
  content,
  contentTitle,
  classNames,
}: ModaledItemsProps) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  return (
    <>
      <div
        className={twMerge(
          "flex w-full items-center justify-between gap-4",
          classNames?.trigger,
        )}
      >
        <div className="flex-1">{trigger}</div>

        <Button onPress={onOpen} variant="flat" size="sm" color="primary">
          Details
        </Button>
      </div>

      {isOpen &&
        (mode === "modal" ? (
          <StandardModal
            isOpen={isOpen}
            isDismissable={false}
            onOpenChange={onOpenChange}
            backdrop="blur"
            classNames={{
              base: twMerge("max-w-[1200px]", classNames?.content),
            }}
          >
            <div className="flex w-full flex-col gap-8">
              <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
                {contentTitle || ""}
              </h1>

              {content}
            </div>
          </StandardModal>
        ) : (
          <RightDrawer
            isDismissable={false}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{
              base: twMerge("max-w-[80%]", classNames?.content),
            }}
          >
            <div className="flex w-full flex-col gap-8">
              <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
                {contentTitle || ""}
              </h1>

              {content}
            </div>
          </RightDrawer>
        ))}
    </>
  );
}
