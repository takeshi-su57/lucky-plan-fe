"use client";

import { useState } from "react";
import { Button, useDisclosure, Checkbox } from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useStartAdaption } from "@/app-hooks/useContract";
import { Contract } from "@/graphql/gql/graphql";

export function ContractAdaptionButton({
  contract,
  isHistorical = false,
}: {
  contract: Contract;
  isHistorical?: boolean;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { startAdaption, loading } = useStartAdaption();

  const [shouldRestart, setShouldRestart] = useState(isHistorical);

  const handleOpen = () => {
    setShouldRestart(isHistorical);
    onOpen();
  };

  const handleStartAdaption = async () => {
    const result = await startAdaption({
      variables: {
        contractId: contract.id,
        shouldRestart,
      },
    });

    if (result.data?.startAdaption) {
      onClose();
    }
  };

  const title = isHistorical ? "Backfill Event Logs" : "Run Event Ingestion";
  const actionLabel = isHistorical ? "Start Backfill" : "Start Ingestion";

  return (
    <>
      <Button size="sm" onPress={handleOpen} color="primary" isLoading={loading}>
        {isHistorical ? "Backfill Event Logs" : "Run Ingestion"}
      </Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
            {title}
          </h1>

          <p className="text-sm text-gray-400">
            {isHistorical
              ? `Scan ${contract.fromBlock.toLocaleString()} through ${contract.toBlock?.toLocaleString() ?? "the current block"} and store normalized event logs for this historical contract.`
              : "Run the event-log ingestion cursor for this contract."}
          </p>

          <Checkbox isSelected={shouldRestart} onValueChange={setShouldRestart}>
            {isHistorical
              ? "Rebuild from the initial block (replaces this contract’s stored logs)"
              : "Restart from the contract’s initial block"}
          </Checkbox>

          <Button onPress={handleStartAdaption} color="primary" isLoading={loading}>
            {shouldRestart
              ? `Rebuild & ${actionLabel}`
              : `Continue ${actionLabel}`}
          </Button>
        </div>
      </StandardModal>
    </>
  );
}
