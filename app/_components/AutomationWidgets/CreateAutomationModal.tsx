"use client";

import { useState } from "react";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { Address } from "viem";

import { StandardModal } from "@/components/modals/StandardModal";

import { useGetAllContracts } from "@/app-hooks/useContract";
import { useCreateBot } from "@/app/_hooks/useAutomation";
import { useGetAllLeaders } from "@/app/_hooks/useUser";
import { useGetAllFollowers } from "@/app/_hooks/useFollower";
import { useGetAllStrategy } from "@/app/_hooks/useStrategy";
import { shrinkAddress } from "@/utils";
import { NumericInput } from "@/components/inputs/NumericInput";

export type CreateAutomationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (value: boolean) => void;
};

export function CreateAutomationModal({
  isOpen,
  onClose,
  onOpenChange,
}: CreateAutomationModalProps) {
  const createBot = useCreateBot();

  const allLeaders = useGetAllLeaders();
  const allFollowers = useGetAllFollowers();
  const allContracts = useGetAllContracts();
  const allStrategies = useGetAllStrategy();

  const [leaderAddress, setLeaderAddress] = useState<string | null>(null);
  const [followerAddress, setFollowerAddress] = useState<string | null>(null);
  const [leaderContractId, setLeaderContractId] = useState<string | null>(null);
  const [followerContractId, setFollowerContractId] = useState<string | null>(
    null,
  );
  const [strategyId, setStrategyId] = useState<string | null>(null);
  const [collateralBaseline, setCollateralBaseline] = useState<string>("");

  const isDisabled =
    !leaderAddress ||
    !followerAddress ||
    !leaderContractId ||
    !followerContractId ||
    !collateralBaseline ||
    !strategyId;

  const handleConfirm = () => {
    if (isDisabled) {
      return;
    }

    createBot({
      variables: {
        input: {
          leaderAddress,
          followerAddress,
          leaderContractId: +leaderContractId,
          followerContractId: +followerContractId,
          strategyId: +strategyId,
          leaderCollateralBaseline: Math.floor(+collateralBaseline),
        },
      },
    });

    onClose();
  };

  return (
    <StandardModal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <div className="flex flex-col gap-8">
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
          Create New Automation
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Autocomplete
            label="Leader"
            variant="underlined"
            defaultItems={allLeaders}
            placeholder="Search leader"
            selectedKey={leaderAddress}
            onSelectionChange={(key) => setLeaderAddress(key as string | null)}
          >
            {(item) => (
              <AutocompleteItem
                className="font-mono"
                key={item.address}
                textValue={item.address}
              >
                {item.address}
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Autocomplete
            label="Leader Contract"
            variant="underlined"
            defaultItems={allContracts}
            placeholder="Search contract"
            selectedKey={leaderContractId}
            onSelectionChange={(key) =>
              setLeaderContractId(key as string | null)
            }
          >
            {(item) => (
              <AutocompleteItem
                key={item.id}
                className="font-mono"
                textValue={`${item.chainId}-${shrinkAddress(item.address as Address)}`}
              >
                <div className="flex flex-col">
                  <span className="text-small">Chain: {item.chainId}</span>
                  <span className="text-small">Contract: {item.address}</span>
                  <span className="text-tiny text-default-400">
                    {item.description}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Autocomplete
            label="Follower"
            variant="underlined"
            defaultItems={allFollowers}
            placeholder="Search follower"
            selectedKey={followerAddress}
            onSelectionChange={(key) =>
              setFollowerAddress(key as string | null)
            }
          >
            {(item) => (
              <AutocompleteItem
                className="font-mono"
                key={item.address}
                textValue={item.address}
              >
                {`${item.address}`}
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Autocomplete
            label="Follower Contract"
            variant="underlined"
            defaultItems={allContracts}
            placeholder="Search contract"
            selectedKey={followerContractId}
            onSelectionChange={(key) =>
              setFollowerContractId(key as string | null)
            }
          >
            {(item) => (
              <AutocompleteItem
                key={item.id}
                className="font-mono"
                textValue={`${item.chainId}-${shrinkAddress(item.address as Address)}`}
              >
                <div className="flex flex-col">
                  <span className="text-small">Chain: {item.chainId}</span>
                  <span className="text-small">Contract: {item.address}</span>
                  <span className="text-tiny text-default-400">
                    {item.description}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>

          <NumericInput
            amount={collateralBaseline}
            onChange={setCollateralBaseline}
            label="Collateral Baseline"
          />

          <Autocomplete
            label="Strategy"
            variant="underlined"
            defaultItems={allStrategies}
            placeholder="Search strategy"
            selectedKey={strategyId}
            onSelectionChange={(key) => setStrategyId(key as string | null)}
          >
            {(item) => (
              <AutocompleteItem
                key={item.id}
                className="font-mono"
                textValue={`${item.id}-${item.strategyKey}-${item.ratio}x`}
              >
                <div className="flex flex-col font-mono">
                  <span className="text-small">{`${item.strategyKey}(${item.id}, ${item.ratio}%)`}</span>
                  <span className="text-small">
                    Collateral:
                    {`(${Number(item.minCollateral)} ~ ${Number(item.maxCollateral)}) USDC`}
                  </span>
                  <span className="text-small">
                    Leverage:
                    {`(${item.minLeverage / 1000} ~ ${item.maxLeverage / 1000}) x`}
                  </span>
                  <span className="text-small">
                    Capacity:
                    {`(${item.minCapacity} ~ ${item.maxCapacity}) USDC`}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        <Button onClick={handleConfirm} color="primary" isDisabled={isDisabled}>
          Save
        </Button>
      </div>
    </StandardModal>
  );
}
