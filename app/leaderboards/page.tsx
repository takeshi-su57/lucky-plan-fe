"use client";

import { useMemo, useState } from "react";
import {
  Card,
  Button,
  CardBody,
  Autocomplete,
  AutocompleteItem,
  Tabs,
  Tab,
} from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { PnlSnapshotKind } from "@/graphql/gql/graphql";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { Address } from "viem";
import { useGetAllContracts } from "../_hooks/useContract";
import { shrinkAddress } from "@/utils";
import { useGetPnlSnapshots } from "../_hooks/useHistory";

const columns: TableColumnProps[] = [
  {
    id: "address",
    component: "Address",
  },
  {
    id: "tradeCounts",
    component: "Trades",
  },
  {
    id: "winCounts",
    component: "Wins",
  },
  {
    id: "pnl",
    component: "PNL",
  },
  {
    id: "action",
    component: "",
    className: "flex-end",
  },
];

export default function Page() {
  const allContracts = useGetAllContracts();

  const [contractId, setContractId] = useState<number | null>(null);
  const [kind, setKind] = useState<PnlSnapshotKind>(PnlSnapshotKind.Day);

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const { pnlSnapshots } = useGetPnlSnapshots(
    contractId !== null ? { contractId, kind } : undefined,
  );
  // const allTradeHistories = useGetAllTradeHistory(
  //   contractId !== null && selectedAddress !== null
  //     ? { address: selectedAddress, contractId }
  //     : undefined,
  // );

  // const handleOpenChange = (isOpen: boolean) => {
  //   if (!isOpen) {
  //     setSelectedAddress(null);
  //   }
  // };

  console.log(selectedAddress);

  const rows = useMemo(() => {
    if (pnlSnapshots.length === 0) {
      return [];
    }
    return pnlSnapshots.map((item) => ({
      id: `${item.contractId}-${item.kind}-${item.address}`,
      className: "group",
      data: {
        address: {
          component: <AddressWidget address={item.address as Address} />,
        },
        tradeCounts: {
          component: item.histories.length,
        },
        winCounts: {
          component: item.histories.filter(
            (history) =>
              (history.eventName === "LimitExecuted" ||
                history.eventName === "MarketExecuted") &&
              history.pnl > 0,
          ).length,
        },
        pnl: {
          component: `$${item.accUSDPnl}`,
        },
        action: {
          component: (
            <Button onClick={() => setSelectedAddress(item.address)}>
              Details
            </Button>
          ),
          className: "w-[50px]",
        },
      },
    }));
  }, [pnlSnapshots]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Autocomplete
            label="Follower Contract"
            variant="underlined"
            defaultItems={allContracts}
            placeholder="Search contract"
            selectedKey={contractId}
            className="w-[400px]"
            onSelectionChange={(key) => setContractId(key as number | null)}
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

          <Tabs
            aria-label="leaderboard-tabs"
            selectedKey={kind}
            onSelectionChange={(value) =>
              value && setKind(value as PnlSnapshotKind)
            }
          >
            {Object.values(PnlSnapshotKind).map((item) => (
              <Tab key={item} title={item} />
            ))}
          </Tabs>
        </div>
      </div>

      <Card>
        <CardBody>
          <DataTable
            columns={columns}
            rows={rows}
            classNames={{
              tr: "hover:bg-white/5 font-mono cursor-pointer",
              td: "py-3 ",
              th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
