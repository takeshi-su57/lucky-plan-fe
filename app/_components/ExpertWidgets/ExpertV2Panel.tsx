"use client";

import { useState, useMemo, ChangeEventHandler } from "react";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { Address } from "viem";
import { Platform } from "@/graphql/gql/graphql";

import {
  GET_BLACKLIST_DOCUMENT,
  GET_WHITELIST_DOCUMENT,
  useGetExpertPnlSnapshotsV2,
} from "@/app/_hooks/usePlan";
import { useGetActiveBots } from "@/app/_hooks/useAutomation";
import { useQuery } from "@apollo/client";
import { twMerge } from "tailwind-merge";
import { EventLogsModalButton } from "../LeaderboardWidgets/EventLogsModalButton";
import { PaginatedViews } from "@/components/views/PaginatedViews";
import { EventLogsWidget } from "../LeaderboardWidgets/EventLogsWidget";

const PAGE_SIZE = 10;

export function ExpertV2Panel() {
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [platform, setPlatform] = useState<Platform>(Platform.Gns);
  const [page, setPage] = useState(1);

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

  const { activeAddresses, blacklistedAddresses, whitelistedAddresses } =
    useMemo(() => {
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

      return {
        activeAddresses,
        blacklistedAddresses,
        whitelistedAddresses,
      };
    }, [blacklist?.getBlacklist, bots, whitelist?.getWhitelist]);

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

      <PaginatedViews
        currentPage={page}
        totalPages={Math.ceil(pnlSnapshots.length / PAGE_SIZE)}
        onChangePage={setPage}
        loading={loading}
      >
        <div className="flex h-[700px] w-full flex-col gap-6 overflow-y-auto">
          {pnlSnapshots
            .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
            .map((item) => (
              <div key={item.id} className="flex w-full flex-col gap-6">
                <span
                  className={twMerge(
                    activeAddresses[item.address.toLowerCase()]
                      ? "text-green-400"
                      : whitelistedAddresses[item.address.toLowerCase()]
                        ? "text-yellow-400"
                        : blacklistedAddresses[item.address.toLowerCase()]
                          ? "text-red-400"
                          : "text-white",
                  )}
                >
                  {activeAddresses[item.address.toLowerCase()] && (
                    <span className="rounded-md bg-green-400/10 p-1 text-green-400">
                      Active
                    </span>
                  )}
                  {whitelistedAddresses[item.address.toLowerCase()] && (
                    <span className="ml-2 rounded-md bg-yellow-400/10 p-1 text-yellow-400">
                      Whitelisted
                    </span>
                  )}
                  {blacklistedAddresses[item.address.toLowerCase()] && (
                    <span className="ml-2 rounded-md bg-red-400/10 p-1 text-red-400">
                      Blacklisted
                    </span>
                  )}
                </span>

                <EventLogsWidget
                  address={item.address as Address}
                  platform={platform}
                  cols={2}
                  fullHistory={false}
                />
              </div>
            ))}
        </div>
      </PaginatedViews>

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
