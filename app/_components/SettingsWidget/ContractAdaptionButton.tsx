"use client";

import { useState } from "react";
import { Button, useDisclosure, Checkbox } from "@nextui-org/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useStartAdaption } from "@/app-hooks/useContract";

export function ContractAdaptionButton({ contractId }: { contractId: number }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { startAdaption, loading } = useStartAdaption();

  const [shouldRestart, setShouldRestart] = useState(false);

  const handleStartAdaption = () => {
    startAdaption({
      variables: {
        contractId,
        shouldRestart,
      },
    });

    onClose();
  };

  return (
    <>
      <Button size="sm" onClick={onOpen} color="primary" isLoading={loading}>
        Start Adaption
      </Button>

      <StandardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Start Adaption
          </h1>

          <Checkbox isSelected={shouldRestart} onValueChange={setShouldRestart}>
            Restart Adaption
          </Checkbox>

          <Button onClick={handleStartAdaption} color="primary">
            {shouldRestart ? "Restart Adaption" : "Continue Adaption"}
          </Button>
        </div>
      </StandardModal>
    </>
  );
}
