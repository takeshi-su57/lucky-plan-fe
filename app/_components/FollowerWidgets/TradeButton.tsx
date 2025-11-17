import { Button, useDisclosure } from "@heroui/react";
import { twMerge } from "tailwind-merge";

import { RightDrawer } from "@/components/modals/RightDrawer";
import { Followers } from "./Followers";

export function TradeButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Trade</Button>

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
