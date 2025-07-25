import { Button, useDisclosure } from "@nextui-org/react";
import { isAddress, Address } from "viem";
import { twMerge } from "tailwind-merge";

import { RightDrawer } from "@/components/modals/RightDrawer";
import { AnalyzeWidget } from "./AnalyzeWidget";

export function AnalyzeButton({ address }: { address: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isDisabled={!isAddress(address)} onClick={onOpen}>
        Analyze
      </Button>

      <RightDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{ base: twMerge("max-w-[80%]") }}
      >
        <div className="flex w-full flex-col gap-6">
          <AnalyzeWidget address={address as Address} />
        </div>
      </RightDrawer>
    </>
  );
}
