"use client";

import { Button, useDisclosure } from "@heroui/react";
import { twMerge } from "tailwind-merge";

import { RightDrawer } from "@/components/modals/RightDrawer";
import { ChartPanel } from "./ChartPanel";

export function ChartButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Chart</Button>

      <RightDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{ base: twMerge("max-w-[80%]") }}
      >
        <ChartPanel />
      </RightDrawer>
    </>
  );
}
