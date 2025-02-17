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
import { Address } from "viem";
import dayjs from "dayjs";

import { PnlSnapshotKind } from "@/graphql/gql/graphql";

import { useGetAllContracts } from "@/app-hooks/useContract";
import { useGetPnlSnapshots } from "@/app-hooks/useHistory";

import { shrinkAddress } from "@/utils";
import { HistoriesWidget } from "./HistoriesWidget";

export type LeaderboardProps = {
  selectionLabel?: string;
  selectedAddresses?: { address: string; contractId: number }[];
  onChangeSelection?: (
    address: string,
    contractId: number,
    isSelected: boolean,
  ) => void;
  endDate: Date;
  initialContractId: string | null;
  initialKind: PnlSnapshotKind;
  onChangeParams: (contractId: string | null, kind: PnlSnapshotKind) => void;
  hideTags: boolean;
};

export function Leaderboard({
  endDate,
  initialContractId,
  initialKind,
  onChangeParams,
  hideTags,
  selectionLabel,
  selectedAddresses,
  onChangeSelection,
}: LeaderboardProps) {
  const allContracts = useGetAllContracts();

  const [contractId, setContractId] = useState<string | null>(
    initialContractId,
  );
  const [kind, setKind] = useState<PnlSnapshotKind>(initialKind);

  const { pnlSnapshots, fetchMore, hasMore, loading } = useGetPnlSnapshots(
    dayjs(endDate).format("YYYY-MM-DD"),
    contractId,
    kind,
  );

  const handleChangeKind: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setKind(value as PnlSnapshotKind);

      onChangeParams(contractId, value as PnlSnapshotKind);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
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
          label="Contract"
          variant="underlined"
          defaultItems={allContracts}
          placeholder="Search contract"
          selectedKey={contractId}
          className="w-[400px]"
          onSelectionChange={(key) => {
            setContractId(key as string | null);

            onChangeParams(key as string | null, kind);
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
                  <div className="flex items-center gap-2">
                    <span className="text-small">Chain: {item.chainId}</span>
                    <span className="text-small">
                      {item.isTestnet ? "(Testnet)" : ""}
                    </span>
                  </div>
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
      </div>

      <Card>
        <CardBody>
          <Virtuoso
            style={{ height: 700 }}
            data={contractId ? pnlSnapshots : []}
            itemContent={(_, snapshot) => (
              <HistoriesWidget
                address={snapshot.address as Address}
                histories={snapshot.histories}
                contractId={snapshot.contractId}
                hideTags={hideTags}
                range={{ to: endDate }}
                label={selectionLabel}
                isSelected={
                  selectedAddresses
                    ? !!selectedAddresses.find(
                        (item) =>
                          item.contractId === snapshot.contractId &&
                          item.address.toLowerCase() ===
                            snapshot.address.toLowerCase(),
                      )
                    : undefined
                }
                onChangeSelection={onChangeSelection}
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
