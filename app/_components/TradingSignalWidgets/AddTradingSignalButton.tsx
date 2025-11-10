import { ChangeEventHandler, useState } from "react";
import {
  Button,
  Select,
  SelectItem,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { Platform } from "@/graphql/gql/graphql";

import { RightDrawer } from "@/components/modals/RightDrawer";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import { useRegisterTradingSignal } from "@/app/_hooks/useTradingSignals";
import { isAddress } from "viem";

export function AddTradingSignalButton() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { registerTradingSignalLog, loading } = useRegisterTradingSignal();

  const [platform, setPlatform] = useState<Platform>(Platform.Gns);
  const [address, setAddress] = useState<string>("");

  const handleChangePlatform: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setPlatform(value as Platform);
    }
  };

  const handleAddTradingSignal = () => {
    registerTradingSignalLog({
      variables: {
        address: address.trim().toLowerCase(),
        platform,
      },
      onCompleted: () => {
        onClose();
      },
    });
  };

  return (
    <>
      <Button size="sm" onPress={onOpen}>
        Add Trading Signal
      </Button>

      <RightDrawer
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        classNames={{ base: twMerge("max-w-[80%]") }}
      >
        <div className="flex w-full flex-col gap-6">
          <Select
            variant="underlined"
            label="Platform"
            selectedKeys={platform ? [platform] : undefined}
            onChange={handleChangePlatform}
            selectionMode="single"
            className="w-[200px] font-mono"
          >
            {Object.values(Platform).map((item) => (
              <SelectItem key={item}>{item}</SelectItem>
            ))}
          </Select>

          <Input
            placeholder="Enter Trading Signal Address"
            value={address || ""}
            onChange={(e) => setAddress(e.target.value)}
          />

          <ButtonWithConfirm
            onPress={handleAddTradingSignal}
            color="primary"
            isLoading={loading}
            isDisabled={!isAddress(address) || !platform}
          >
            Add Trading Signal
          </ButtonWithConfirm>
        </div>
      </RightDrawer>
    </>
  );
}
