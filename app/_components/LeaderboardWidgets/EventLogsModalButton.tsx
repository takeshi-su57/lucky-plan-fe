import { Button, useDisclosure } from "@nextui-org/react";
import { isAddress, Address } from "viem";
import { twMerge } from "tailwind-merge";
import { Platform } from "@/graphql/gql/graphql";

import { RightDrawer } from "@/components/modals/RightDrawer";
import { EventLogsWidget } from "./EventLogsWidget";

export function EventLogsModalButton({
  address,
  platform,
  label,
}: {
  address?: string;
  platform?: Platform;
  label?: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isDisabled={(address && !isAddress(address)) || !platform}
        color="primary"
        size="sm"
        onClick={onOpen}
      >
        {label || "Open"}
      </Button>

      {address && platform && (
        <RightDrawer
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{ base: twMerge("max-w-[80%]") }}
        >
          <div className="flex w-full flex-col gap-6">
            <EventLogsWidget
              address={address as Address}
              platform={platform}
              cols={1}
            />
          </div>
        </RightDrawer>
      )}
    </>
  );
}
