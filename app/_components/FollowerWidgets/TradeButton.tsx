import { Button, useDisclosure } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import { RightDrawer } from "@/components/modals/RightDrawer";
import { Followers } from "./Followers";

export function TradeButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        onPress={onOpen}
        size="sm"
        startContent={<FaPlus className="h-3 w-3" />}
        className="h-8 rounded-lg px-3 text-xs font-semibold shadow-none"
      >
        Open Trade
      </Button>

      <RightDrawer
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        classNames={{ base: twMerge("max-w-[80%]") }}
      >
        <Followers />
      </RightDrawer>
    </>
  );
}
