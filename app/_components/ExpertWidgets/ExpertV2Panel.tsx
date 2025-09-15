"use client";

import { useState, useMemo, ChangeEventHandler } from "react";
import { Spinner, Input, Select, SelectItem, Button } from "@nextui-org/react";
import { Address } from "viem";
import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import { Platform } from "@/graphql/gql/graphql";

import {
  GET_BLACKLIST_DOCUMENT,
  GET_WHITELIST_DOCUMENT,
  useGetExpertPnlSnapshotsV2,
} from "@/app/_hooks/usePlan";
import { shrinkAddress } from "@/utils";
import { useGetActiveBots } from "@/app/_hooks/useAutomation";
import { useQuery } from "@apollo/client";
import { twMerge } from "tailwind-merge";
import { TagsWidget } from "../TagWidgets/TagsWidget";
import { EventLogsModalButton } from "../LeaderboardWidgets/EventLogsModalButton";

const expertColumns: TableColumnProps[] = [
  {
    id: "no",
    component: "No",
  },
  {
    id: "address",
    component: "Address",
  },
  {
    id: "tags",
    component: "Tags",
  },
  {
    id: "pnl",
    component: "PNL",
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

export function ExpertV2Panel() {
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [platform, setPlatform] = useState<Platform>(Platform.Gns);

  const { pnlSnapshots, loading, fetchMore, hasMore } =
    useGetExpertPnlSnapshotsV2(platform);

  const { bots } = useGetActiveBots();
  const { data: blacklist } = useQuery(GET_BLACKLIST_DOCUMENT);
  const { data: whitelist } = useQuery(GET_WHITELIST_DOCUMENT);

  const handleChangePlatform: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setPlatform(value as Platform);
    }
  };

  const expertRows = useMemo(() => {
    const activeAddresses: Record<string, boolean> = {};
    const blacklistedAddresses: Record<string, boolean> = {};
    const whitelistedAddresses: Record<string, boolean> = {};

    bots.forEach((bot) => {
      activeAddresses[bot.leaderAddress.toLowerCase()] = true;
    });

    blacklist?.getBlacklist?.forEach((address) => {
      blacklistedAddresses[address.toLowerCase()] = true;
    });

    whitelist?.getWhitelist?.forEach((params) => {
      const { address } = JSON.parse(params);

      whitelistedAddresses[address.toLowerCase()] = true;
    });

    return pnlSnapshots.map((snapshot, index) => ({
      id: `${snapshot.address}`,
      className: "group",
      data: {
        no: {
          component: index + 1,
        },
        address: {
          component: (
            <span
              className={twMerge(
                activeAddresses[snapshot.address.toLowerCase()]
                  ? "text-green-400"
                  : whitelistedAddresses[snapshot.address.toLowerCase()]
                    ? "text-yellow-400"
                    : blacklistedAddresses[snapshot.address.toLowerCase()]
                      ? "text-red-400"
                      : "text-white",
              )}
            >
              {shrinkAddress(snapshot.address as Address)}{" "}
              {activeAddresses[snapshot.address.toLowerCase()] && (
                <span className="rounded-md bg-green-400/10 p-1 text-green-400">
                  Active
                </span>
              )}
              {whitelistedAddresses[snapshot.address.toLowerCase()] && (
                <span className="ml-2 rounded-md bg-yellow-400/10 p-1 text-yellow-400">
                  Whitelisted
                </span>
              )}
              {blacklistedAddresses[snapshot.address.toLowerCase()] && (
                <span className="ml-2 rounded-md bg-red-400/10 p-1 text-red-400">
                  Blacklisted
                </span>
              )}
            </span>
          ),
        },
        tags: {
          component: <TagsWidget address={snapshot.address as Address} />,
        },
        pnl: {
          component: snapshot.accUSDPnl.toFixed(2),
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
            <EventLogsModalButton
              address={snapshot.address as Address}
              platform={platform}
            />
          ),
        },
      },
    }));
  }, [
    blacklist?.getBlacklist,
    bots,
    platform,
    pnlSnapshots,
    whitelist?.getWhitelist,
  ]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <Select
          variant="underlined"
          label="Platform"
          selectedKeys={platform ? [platform] : undefined}
          onChange={handleChangePlatform}
          selectionMode="single"
          className="w-[200px] font-mono"
        >
          {Object.values(Platform).map((item) => (
            <SelectItem key={item}>{item}</SelectItem>
          ))}
        </Select>

        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by address"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
          />

          <EventLogsModalButton address={searchAddress} platform={platform} />
        </div>
      </div>

      {expertRows.length > 0 && (
        <DataTable
          isHeaderSticky
          columns={expertColumns}
          rows={expertRows}
          classNames={{
            wrapper: "h-[calc(100vh-300px)] overflow-auto",
            tr: "font-mono cursor-pointer",
            td: "py-3 ",
            th: "text-sm leading-tight bg-neutral-900 tracking-widest font-normal text-neutral-4 00 uppercase",
          }}
        />
      )}

      {loading ? <Spinner color="warning" size="lg" /> : null}

      {hasMore ? (
        <Button
          onClick={fetchMore}
          color="primary"
          variant="flat"
          size="sm"
          isLoading={loading}
          isDisabled={loading}
        >
          Load More
        </Button>
      ) : null}
    </div>
  );
}
