"use client";

import { useState } from "react";
import {
  Card,
  Button,
  CardBody,
  Autocomplete,
  AutocompleteItem,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

import {
  useGenerateFollower,
  useGetAllFollowerDetails,
  useSubscribeFollowerDetailUpdated,
} from "@/app-hooks/useFollower";
import { Address } from "viem";
import { useGetAllContracts } from "../_hooks/useContract";
import { shrinkAddress } from "@/utils";
import { FollowerInfoWidget } from "../_components/FollowerWidgets/FollowerInfoWidget";
import { UserTradeHistory } from "../_components/UserWidgets/UserTradeHistory";

export default function Page() {
  const allContracts = useGetAllContracts();
  const generateFollower = useGenerateFollower();

  const [contractId, setContractId] = useState<string | null>(null);

  const allFollowers = useGetAllFollowerDetails(contractId);
  useSubscribeFollowerDetailUpdated(contractId);

  const handleGenerateFollower = () => {
    generateFollower({
      variables: {},
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Autocomplete
          label="Follower Contract"
          variant="underlined"
          defaultItems={allContracts}
          placeholder="Search contract"
          selectedKey={contractId}
          className="w-[400px]"
          onSelectionChange={(key) => setContractId(key as string | null)}
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

        <Button color="primary" onClick={handleGenerateFollower}>
          Generate Follower
        </Button>
      </div>

      <Card>
        <CardBody>
          {contractId ? (
            <Accordion isCompact>
              {allFollowers.map((follower) => (
                <AccordionItem
                  key={follower.address}
                  title={<FollowerInfoWidget follower={follower} />}
                >
                  <UserTradeHistory
                    address={follower.address as Address}
                    contractId={contractId}
                  />
                </AccordionItem>
              ))}
            </Accordion>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}
