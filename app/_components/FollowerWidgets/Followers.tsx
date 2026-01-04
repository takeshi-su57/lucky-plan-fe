"use client";

import { useState } from "react";
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

  const {
    details: followerDetails,
    loading: followerLoading,
    refetch,
  } = useGetAllFollowerDetails(contractId, showAll);

  return (
    <div className="flex h-[calc(100vh-150px)] flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Autocomplete
            label="Follower Contract"
            variant="underlined"
            defaultItems={allContracts.filter(
              (contract) => contract.status === ContractStatus.Live,
            )}
            placeholder="Search contract"
            selectedKey={contractId}
            className="w-[400px]"
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
                    <span className="text-small">
                      {item.isTestnet ? "(Testnet)" : ""}
                    </span>
                  </div>
                  <span className="text-small">Contract: {item.address}</span>
                  <span className="text-tiny text-default-400">
                    {item.description}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Button onPress={() => refetch()}>Refetch</Button>
        </div>

        {contractId ? (
          <FollowerSummary
            contractId={+contractId}
            followers={followerDetails}
          />
        ) : null}
      </div>

      <Switch isSelected={showAll} onValueChange={setShowAll}>
        Show All
      </Switch>

      <div className="flex-1 overflow-y-auto">
        {followerLoading ? (
          <Spinner label="Loading..." size="lg" className="mt-[100px]" />
        ) : (
          <div className="flex w-full flex-col gap-2">
            {followerDetails.map((follower) => (
              <Accordion key={follower.address} isCompact variant="splitted">
                <AccordionItem
                  title={<FollowerInfoWidget follower={follower} />}
                >
                  <FollowerDetails follower={follower} isChatFirst={false} />
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
