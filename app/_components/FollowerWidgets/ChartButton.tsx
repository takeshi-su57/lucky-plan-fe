"use client";

import { Button, useDisclosure } from "@heroui/react";
import { FaChartArea } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import { RightDrawer } from "@/components/modals/RightDrawer";
import { ChartPanel } from "./ChartPanel";

export function ChartButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        size="sm"
        startContent={<FaChartArea className="h-3.5 w-3.5" />}
        variant="flat"
        className="bg-content2 text-foreground h-8 rounded-lg px-3 text-xs font-semibold"
      >
        Chart
      </Button>

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
