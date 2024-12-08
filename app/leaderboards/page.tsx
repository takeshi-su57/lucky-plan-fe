"use client";

import { ChangeEventHandler, useMemo, useState } from "react";
import {
  Card,
  Button,
  CardBody,
  Autocomplete,
  AutocompleteItem,
  Spinner,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { PnlSnapshotKind } from "@/graphql/gql/graphql";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { Address } from "viem";
import { useGetAllContracts } from "../_hooks/useContract";
import { shrinkAddress } from "@/utils";
import { useGetPnlSnapshots } from "../_hooks/useHistory";
import LineChart from "@/components/charts/LineChart";

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
    id: "pnlChart",
    component: "PNL",
  },
  {
    id: "inOutChart",
    component: "In/Out",
    className: "flex-end",
  },
];

export default function Page() {
  const allContracts = useGetAllContracts();

  const [contractId, setContractId] = useState<string | null>(null);
  const [kind, setKind] = useState<PnlSnapshotKind>(PnlSnapshotKind.AllTime);

  const { pnlSnapshots, fetchMore, hasMore, loading } = useGetPnlSnapshots(
    contractId,
    kind,
  );

  const handleChangeKind: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setKind(value as PnlSnapshotKind);
    }
  };

  const rows = useMemo(() => {
    if (pnlSnapshots.length === 0) {
      return [];
    }
    return pnlSnapshots.map((item) => {
      const pnlChartData: {
        value: number;
        date: Date;
      }[] = [];

      const inOutChartData: {
        value: number;
        date: Date;
      }[] = [];

      let pnlSum = 0;
      let inOutSum = 0;

      item.histories
        .sort((a, b) => {
          const first = new Date(a.timestamp);
          const second = new Date(b.timestamp);

          if (first > second) {
            return 1;
          } else if (first < second) {
            return -1;
          } else {
            return 0;
          }
        })
        .forEach((history) => {
          pnlSum += history.pnl;
          inOutSum += history.in - history.out;

          if (pnlChartData.length === 0) {
            pnlChartData.push({
              value: 0,
              date: new Date(history.timestamp),
            });
          }

          if (inOutChartData.length === 0) {
            inOutChartData.push({
              value: 0,
              date: new Date(history.timestamp),
            });
          }

          pnlChartData.push({
            value: pnlSum,
            date: new Date(history.timestamp),
          });
          inOutChartData.push({
            value: inOutSum,
            date: new Date(history.timestamp),
          });
        });

      return {
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
          pnlChart: {
            component: (
              <LineChart data={pnlChartData} className="h-[100px] w-[300px]" />
            ),
            className: "!w-[400px]",
          },
          inOutChart: {
            component: (
              <LineChart
                data={inOutChartData}
                className="h-[100px] w-[300px]"
              />
            ),
            className: "!w-[400px]",
          },
        },
      };
    });
  }, [pnlSnapshots]);

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
          <DataTable
            columns={columns}
            rows={rows}
            classNames={{
              tr: "font-mono cursor-pointer",
              td: "py-3 ",
              th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
            }}
            bottomContent={
              hasMore ? (
                <div className="flex w-full justify-center">
                  <Button variant="flat" onPress={fetchMore}>
                    {loading && <Spinner color="white" size="sm" />}
                    Load More
                  </Button>
                </div>
              ) : null
            }
          />
        </CardBody>
      </Card>
    </div>
  );
}
