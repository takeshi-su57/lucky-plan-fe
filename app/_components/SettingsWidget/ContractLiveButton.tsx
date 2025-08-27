"use client";

import { Button, Checkbox, useDisclosure } from "@nextui-org/react";
import { Contract } from "@/graphql/gql/graphql";
import { NumericInput } from "@/components/inputs/NumericInput";
import { StandardModal } from "@/components/modals/StandardModal";
import { useEffect, useState } from "react";
import { useLiveContract } from "@/app-hooks/useContract";
import { publicClients } from "@/utils/web3";

export function ContractLiveButton({ contract }: { contract: Contract }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { liveContract } = useLiveContract();

  const [fromBlock, setFromBlock] = useState("0");
  const [shouldContinue, setShouldContinue] = useState(false);
  const [lastBlock, setLastBlock] = useState(0);

  useEffect(() => {
    const fetchLastBlock = async () => {
      const block = await publicClients[contract.chainId].getBlockNumber();
      setLastBlock(Number(block));
    };

    fetchLastBlock();
  }, [contract.chainId]);

  const handleLiveContract = () => {
    liveContract({
      variables: {
        contractId: contract.id,
        fromBlock: shouldContinue ? undefined : Number(fromBlock),
      },
    });

    onClose();
  };

  const fromBlockNumber = Number(fromBlock);

  const isValidFromBlock =
    fromBlockNumber > contract.fromBlock && fromBlockNumber < lastBlock;

  const isDisabled = !shouldContinue && !isValidFromBlock;

  return (
    <>
      <Button size="sm" variant="solid" color="primary" onClick={onOpen}>
        Live
      </Button>

      <StandardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Live Contract
          </h1>

          <span className="text-xs text-gray-400/60">
            Last Block Number: {lastBlock}
          </span>

          <NumericInput
            amount={fromBlock}
            onChange={setFromBlock}
            label="From Block"
          />

          <Checkbox
            isSelected={shouldContinue}
            onValueChange={setShouldContinue}
          >
            Continue?
          </Checkbox>

          <Button
            onClick={handleLiveContract}
            color="primary"
            isDisabled={isDisabled}
          >
            Confirm
          </Button>
        </div>
      </StandardModal>
    </>
  );
}
