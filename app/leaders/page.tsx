"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";

import { Address } from "viem";
import { useGetAllContracts } from "../_hooks/useContract";
import { shrinkAddress } from "@/utils";

import { useGetAllLeaderHistories } from "../_hooks/useUser";
import { HistoriesWidget } from "../_components/LeaderboardWidgets/HistoriesWidget";
import { PnlSnapshotKind } from "@/graphql/gql/graphql";

export default function Page() {
  const allContracts = useGetAllContracts();

  const [contractId, setContractId] = useState<string | null>(null);

  const users = useGetAllLeaderHistories(contractId);

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
      </div>

      <Card>
        <CardBody>
          <Virtuoso
            style={{ height: 700 }}
            data={users}
            itemContent={(_, snapshot) => (
              <HistoriesWidget
                address={snapshot.address as Address}
                kind={PnlSnapshotKind.AllTime}
                histories={snapshot.histories}
              />
            )}
          />
        </CardBody>
      </Card>
    </div>
  );
}
