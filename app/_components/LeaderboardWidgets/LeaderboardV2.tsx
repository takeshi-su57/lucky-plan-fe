"use client";

import { useMemo } from "react";
import { Card, CardBody, Spinner } from "@heroui/react";
import { Virtuoso } from "react-virtuoso";
import { Address } from "viem";
import dayjs from "dayjs";
import { useQuery } from "@apollo/client/react";

import { Platform, PnlSnapshotKind } from "@/graphql/gql/graphql";

import {
  useGetPnlSnapshotsV2,
  useIsPnlSnapshotV2Initialized,
} from "@/app-hooks/useHistory";

import { PerpEventLogPnlChart } from "./PerpEventLogPnlChart/PerpEventLogPnlChart";
import { useGetTradingSignalLogs } from "@/app/_hooks/useTradingSignals";
import { useGetActiveBots } from "@/app/_hooks/useAutomation";
import { GET_BLACKLIST_DOCUMENT } from "@/app/_hooks/usePlan";
import { GET_WHITELIST_DOCUMENT } from "@/app/_hooks/usePlan";
import { twMerge } from "tailwind-merge";

const timestampGapByPnlSnapshotKind = {
  [PnlSnapshotKind.Day]: 24 * 60 * 60 * 1000,
  [PnlSnapshotKind.Week]: 7 * 24 * 60 * 60 * 1000,
  [PnlSnapshotKind.Month]: 30 * 24 * 60 * 60 * 1000,
  [PnlSnapshotKind.ThreeMonth]: 3 * 30 * 24 * 60 * 60 * 1000,
  [PnlSnapshotKind.AllTime]: 10 * 365 * 24 * 60 * 60 * 1000,
};

function getKey(address: string, platform: Platform) {
  return `${address.toLowerCase()}-${platform}`;
}

export type LeaderboardV2Props = {
  kind: PnlSnapshotKind;
  platform: Platform;
  date: Date;
  hideTags: boolean;
  minSlope: number;
  minR2: number;
};

export function LeaderboardV2({
  kind,
  platform,
  date,
  hideTags,
  minSlope,
  minR2,
}: LeaderboardV2Props) {
  const { pnlSnapshots, hasMore, fetchMore, loading } = useGetPnlSnapshotsV2(
    dayjs(date).format("YYYY-MM-DD"),
    kind,
    platform,
    20,
    minSlope,
    minR2,
  );
  const {
    data: isPnlSnapshotInitialized,
    loading: isPnlSnapshotInitializedLoading,
  } = useIsPnlSnapshotV2Initialized(dayjs(date).format("YYYY-MM-DD"), platform);

  const { tradingSignalLogs } = useGetTradingSignalLogs();
  const { bots } = useGetActiveBots();
  const { data: blacklist } = useQuery(GET_BLACKLIST_DOCUMENT);
  const { data: whitelist } = useQuery(GET_WHITELIST_DOCUMENT);

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

    blacklist?.getBlacklist?.forEach((address) => {
      blacklistedAddresses[address.toLowerCase()] = true;
    });

    whitelist?.getWhitelist?.forEach((params) => {
      const { address } = JSON.parse(params);

      whitelistedAddresses[address.toLowerCase()] = true;
    });

    tradingSignalLogs.forEach((log) => {
      tradingSignalAddresses[getKey(log.address, log.platform as Platform)] =
        true;
    });

    return {
      activeAddresses,
      blacklistedAddresses,
      whitelistedAddresses,
      tradingSignalAddresses,
    };
  }, [
    blacklist?.getBlacklist,
    bots,
    tradingSignalLogs,
    whitelist?.getWhitelist,
  ]);

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
          <CardBody className="flex min-h-[300px] w-full flex-col gap-6">
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
                      perpTradingEventLogs={item.perpTradingEventLogs}
                      hideTags={hideTags}
                      range={{
                        from: dayjs(date)
                          .subtract(
                            timestampGapByPnlSnapshotKind[kind],
                            "ms",
                          )
                          .toDate(),
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
