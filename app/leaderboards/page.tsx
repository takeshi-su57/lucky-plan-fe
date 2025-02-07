"use client";

import { ChangeEventHandler, useState } from "react";
import {
  Card,
  CardBody,
  Autocomplete,
  AutocompleteItem,
  Spinner,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";
import { useRouter, useSearchParams } from "next/navigation";
import { Address } from "viem";

import { PnlSnapshotKind } from "@/graphql/gql/graphql";

import { useGetAllContracts } from "../_hooks/useContract";
import { shrinkAddress } from "@/utils";
import { useGetPnlSnapshots } from "../_hooks/useHistory";
import { HistoriesWidget } from "../_components/LeaderboardWidgets/HistoriesWidget";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allContracts = useGetAllContracts();

  const [contractId, setContractId] = useState<string | null>(
    searchParams.get("contractId") || null,
  );
  const [kind, setKind] = useState<PnlSnapshotKind>(
    (searchParams.get("kind") as PnlSnapshotKind) || PnlSnapshotKind.AllTime,
  );

  const { pnlSnapshots, fetchMore, hasMore, loading } = useGetPnlSnapshots(
    contractId,
    kind,
  );

  const handleChangeKind: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setKind(value as PnlSnapshotKind);

      const contractQuery = contractId ? `contractId=${contractId}` : null;
      const kindQuery = value ? `kind=${value}` : null;

      router.push(
        `/leaderboards?${contractQuery || ""}${contractQuery && kindQuery ? `&` : ""}${kindQuery || ""}`,
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Select
          variant="underlined"
          label="Before"
          selectedKeys={kind ? [kind] : undefined}
          onChange={handleChangeKind}
          selectionMode="single"
          className="w-[200px] font-mono"
        >
          {Object.values(PnlSnapshotKind).map((item) => (
            <SelectItem key={item}>{item}</SelectItem>
          ))}
        </Select>

        <Autocomplete
          label="Follower Contract"
          variant="underlined"
          defaultItems={allContracts}
          placeholder="Search contract"
          selectedKey={contractId}
          className="w-[400px]"
          onSelectionChange={(key) => {
            setContractId(key as string | null);

            const contractQuery = key ? `contractId=${key}` : null;
            const kindQuery = kind ? `kind=${kind}` : null;

            router.push(
              `/leaderboards?${contractQuery || ""}${contractQuery && kindQuery ? `&` : ""}${kindQuery || ""}`,
            );
          }}
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
            data={pnlSnapshots}
            itemContent={(_, snapshot) => (
              <HistoriesWidget
                address={snapshot.address as Address}
                kind={kind}
                histories={snapshot.histories}
              />
            )}
            endReached={() => hasMore && !loading && fetchMore()}
            components={{ Footer: () => <Spinner color="white" size="sm" /> }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
