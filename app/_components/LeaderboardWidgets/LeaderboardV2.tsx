"use client";

import { useMemo } from "react";
import { Card, CardBody, Spinner } from "@heroui/react";
import { Virtuoso } from "react-virtuoso";
import { Address } from "viem";
import dayjs from "dayjs";

import { Platform } from "@/graphql/gql/graphql";

import {
  useGetPnlSnapshotsV2,
  useIsPnlSnapshotV2Initialized,
} from "@/app-hooks/useHistory";

import { PerpEventLogPnlChart } from "./PerpEventLogPnlChart/PerpEventLogPnlChart";
import { useGetActiveBots } from "@/app/_hooks/useAutomation";
import { twMerge } from "tailwind-merge";

function getKey(address: string, platform: Platform) {
  return `${address.toLowerCase()}-${platform}`;
}

export type LeaderboardV2Props = {
  isDesc: boolean;
  platform: Platform;
  date: Date;
};

export function LeaderboardV2({ isDesc, platform, date }: LeaderboardV2Props) {
  const { pnlSnapshots, hasMore, fetchMore, loading } = useGetPnlSnapshotsV2(
    dayjs(date).format("YYYY-MM-DD"),
    platform,
    isDesc,
    20,
  );
  const {
    data: isPnlSnapshotInitialized,
    loading: isPnlSnapshotInitializedLoading,
  } = useIsPnlSnapshotV2Initialized(dayjs(date).format("YYYY-MM-DD"), platform);

  const { bots } = useGetActiveBots();
  const {
    activeAddresses,
    blacklistedAddresses,
    whitelistedAddresses,
    tradingSignalAddresses,
  } = useMemo(() => {
    const activeAddresses: Record<string, boolean> = {};
    const blacklistedAddresses: Record<string, boolean> = {};
    const whitelistedAddresses: Record<string, boolean> = {};
    const tradingSignalAddresses: Record<string, boolean> = {};

    bots.forEach((bot) => {
      activeAddresses[bot.leaderAddress.toLowerCase()] = true;
    });

    return {
      activeAddresses,
      blacklistedAddresses,
      whitelistedAddresses,
      tradingSignalAddresses,
    };
  }, [bots]);

  return (
    <div className="flex flex-col gap-6">
      {isPnlSnapshotInitializedLoading ? (
        <div className="flex w-full items-center justify-center">
          <Spinner color="warning" size="lg" />
        </div>
      ) : null}

      {!isPnlSnapshotInitialized?.isPnlSnapshotV2Initialized ? (
        <div className="flex flex-col gap-2">
          <div className="text-primary-400 hover:text-primary-300 flex flex-col gap-1">
            <p className="text-lg font-bold text-red-400">
              PNL snapshot is not initialized
            </p>
            <p className="text-sm text-neutral-400">
              We kindly ask you to{" "}
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL}?subject=Initialize%20PNL%20Snapshot&body=Please%20initialize%20PNL%20snapshot%20for%20the%20leaderboard.`}
                className="text-primary"
              >
                reach out to our admin
              </a>{" "}
              for assistance in initializing the PNL snapshot. Thank you for
              your understanding!
            </p>
          </div>
        </div>
      ) : (
        <Card className="w-full">
          <CardBody className="flex min-h-75 w-full flex-col gap-6">
            {loading && pnlSnapshots.length === 0 ? (
              <div className="flex w-full items-center justify-center">
                <Spinner color="warning" size="lg" />
              </div>
            ) : (
              <Virtuoso
                style={{ height: 700 }}
                data={pnlSnapshots}
                endReached={() => {
                  if (hasMore && !loading) fetchMore();
                }}
                overscan={200}
                itemContent={(_index, item) => (
                  <div className="flex w-full flex-col gap-6 pb-6">
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
                      {tradingSignalAddresses[
                        getKey(item.address, platform)
                      ] && (
                        <span className="ml-2 rounded-md bg-blue-400/10 p-1 text-blue-400">
                          Trading Signal
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
                    <PerpEventLogPnlChart
                      address={item.address as Address}
                      platform={platform}
                      perpTradeHistories={item.perpTradeHistories}
                      range={{
                        to: date,
                      }}
                    />
                  </div>
                )}
                components={{
                  Footer: () =>
                    loading ? (
                      <div className="flex w-full items-center justify-center py-4">
                        <Spinner color="warning" size="sm" />
                      </div>
                    ) : null,
                }}
              />
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
}
