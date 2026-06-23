"use client";

import { useMemo, useState } from "react";
import { Address } from "viem";
import {
  Autocomplete,
  AutocompleteItem,
  Accordion,
  AccordionItem,
  Spinner,
  Switch,
  Button,
} from "@heroui/react";
import { FaSync } from "react-icons/fa";

import { ContractStatus } from "@/graphql/gql/graphql";
import { useGetAllFollowerDetails } from "@/app-hooks/useFollower";
import { useGetAllGnsContracts } from "@/app-hooks/useContract";
import { shrinkAddress } from "@/utils";
import { FollowerInfoWidget } from "@/app-components/FollowerWidgets/FollowerInfoWidget";

import { FollowerDetails } from "@/app-components/FollowerWidgets/FollowerDetails";
import { FollowerSummary } from "./FollowerSummary";

export function Followers() {
  const allContracts = useGetAllGnsContracts();

  const [contractId, setContractId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const selectedContract = useMemo(
    () => allContracts.find((c) => c.id === +(contractId || 0)) || null,
    [allContracts, contractId],
  );

  const {
    details: followerDetails,
    loading: followerLoading,
    refetch,
  } = useGetAllFollowerDetails(contractId, showAll);

  return (
    <div className="flex h-[calc(100vh-150px)] flex-col gap-4">
      <div className="surface-panel flex shrink-0 flex-col gap-4 p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-end">
            <Autocomplete
              label="Follower Contract"
              variant="bordered"
              size="sm"
              radius="sm"
              defaultItems={allContracts.filter(
                (contract) => contract.status === ContractStatus.Live,
              )}
              placeholder="Search contract"
              selectedKey={contractId}
              className="w-full sm:max-w-105"
              onSelectionChange={(key) => {
                setContractId(key as string | null);
              }}
            >
              {(item) => (
                <AutocompleteItem
                  key={item.id}
                  className="font-mono"
                  textValue={`${item.chainId}-${shrinkAddress(item.address as Address)}`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-small">Chain: {item.chainId}</span>
                    </div>
                    <span className="text-small">Contract: {item.address}</span>
                    <span className="text-tiny text-default-400">
                      {item.description}
                    </span>
                  </div>
                </AutocompleteItem>
              )}
            </Autocomplete>

            <div className="flex items-center gap-3">
              <Button
                size="sm"
                radius="sm"
                variant="flat"
                color="primary"
                startContent={<FaSync className="text-xs" />}
                onPress={() => refetch()}
              >
                Refetch
              </Button>

              <Switch size="sm" isSelected={showAll} onValueChange={setShowAll}>
                Show All
              </Switch>
            </div>
          </div>

          <div className="min-w-0 xl:max-w-[70%]">
            {contractId && selectedContract?.chainId ? (
              <FollowerSummary
                contractId={+contractId}
                chainId={selectedContract?.chainId}
                diamondAddress={selectedContract?.address}
                followers={followerDetails}
              />
            ) : (
              <div className="border-default-200 bg-default-50 text-default-500 rounded-lg border border-dashed px-4 py-3 text-sm">
                Select a live follower contract to view wallet metrics.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {followerLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner label="Loading followers..." size="lg" />
          </div>
        ) : (
          <div className="flex w-full flex-col gap-3">
            {selectedContract?.chainId &&
              followerDetails.map((follower) => (
                <Accordion
                  key={follower.address}
                  isCompact
                  variant="splitted"
                  className="px-0"
                  itemClasses={{
                    base: "border border-default-200 bg-content1 shadow-sm rounded-lg",
                    title: "w-full",
                    trigger: "px-4 py-3",
                    content: "px-4 pb-4 pt-1",
                  }}
                >
                  <AccordionItem
                    title={
                      <FollowerInfoWidget
                        follower={follower}
                        chainId={selectedContract?.chainId}
                        diamondAddress={selectedContract?.address}
                      />
                    }
                  >
                    <FollowerDetails
                      follower={follower}
                      chainId={selectedContract?.chainId}
                      diamondAddress={selectedContract?.address}
                      isChatFirst={false}
                    />
                  </AccordionItem>
                </Accordion>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
