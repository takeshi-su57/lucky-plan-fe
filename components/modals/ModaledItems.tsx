"use client";

import { ReactNode } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
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

        <Button onClick={onOpen} variant="flat" size="sm" color="primary">
          Details
        </Button>
      </div>

      {mode === "modal" ? (
        <StandardModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          backdrop="blur"
          classNames={{ base: twMerge("max-w-[1100px]", classNames?.content) }}
        >
          <div className="flex w-full flex-col gap-8">
            <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
              {contentTitle || ""}
            </h1>

            {content}
          </div>
        </StandardModal>
      ) : (
        <RightDrawer
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{ base: twMerge("max-w-[1100px]", classNames?.content) }}
        >
          <div className="flex w-full flex-col gap-8">
            <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
              {contentTitle || ""}
            </h1>

            {content}
          </div>
        </RightDrawer>
      )}
    </>
  );
}
