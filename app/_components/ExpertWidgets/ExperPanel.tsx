"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardBody,
  Spinner,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { Address, isAddress } from "viem";
import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { useGetExpertPnlSnapshots } from "@/app/_hooks/usePlan";
import { AnalyzeWidget } from "./AnalyzeWidget";
import { shrinkAddress } from "@/utils";

const expertColumns: TableColumnProps[] = [
  {
    id: "address",
    component: "Address",
  },
  {
    id: "pnl",
    component: "PNL",
  },
  {
    id: "score",
    component: "Score",
  },
  {
    id: "maxSize",
    component: "Max Size",
  },
  {
    id: "ratio",
    component: "Ratio",
  },
  {
    id: "openend",
    component: "Opened",
  },
  {
    id: "avgPnlRatio",
    component: "Avg PNL Ratio (%)",
  },
  {
    id: "avgDuration",
    component: "Avg Duration (mins)",
  },
  {
    id: "action",
    component: "",
  },
];

export function ExperPanel() {
  const { pnlSnapshots, loading } = useGetExpertPnlSnapshots();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [searchAddress, setSearchAddress] = useState<string>("");

  const expertRows = useMemo(() => {
    return pnlSnapshots.map((snapshot) => ({
      id: `${snapshot.address}`,
      className: "group",
      data: {
        address: {
          component: shrinkAddress(snapshot.address as Address),
        },
        pnl: {
          component: snapshot.accUSDPnl.toFixed(2),
        },
        score: {
          component: snapshot.score.toFixed(2),
        },
        maxSize: {
          component: snapshot.maxSize,
        },
        ratio: {
          component: snapshot.ratio,
        },
        openend: {
          component: snapshot.openedPositions,
        },
        avgPnlRatio: {
          component: snapshot.avgPnlRatio.toFixed(2),
        },
        avgDuration: {
          component: (snapshot.avgDuration / 1000 / 60).toFixed(2),
        },
        action: {
          component: (
            <div className="flex items-center gap-4">
              <Button
                isIconOnly
                color="primary"
                variant="flat"
                onClick={() => {
                  setSelectedAddress(snapshot.address);
                }}
                className="w-full"
              >
                Analyze
              </Button>
            </div>
          ),
        },
      },
    }));
  }, [pnlSnapshots]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by address"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
        />

        <Button
          isDisabled={!isAddress(searchAddress)}
          onClick={() => {
            setSelectedAddress(searchAddress.toLowerCase());
          }}
        >
          Search
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Divider className="flex-1" />
        <span>Or</span>
        <Divider className="flex-1" />
      </div>

      {loading ? (
        <Spinner color="warning" size="lg" />
      ) : (
        <DataTable
          columns={expertColumns}
          rows={expertRows}
          classNames={{
            tr: "font-mono cursor-pointer",
            td: "py-3 ",
            th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
          }}
        />
      )}
      {selectedAddress && (
        <Card>
          <CardBody>
            <AnalyzeWidget address={selectedAddress} />
          </CardBody>
        </Card>
      )}
    </div>
  );
}
