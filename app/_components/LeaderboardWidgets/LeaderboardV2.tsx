"use client";

import { useMemo, useState } from "react";
import { Spinner } from "@heroui/react";
import { Address } from "viem";
import dayjs from "dayjs";
import { useQuery } from "@apollo/client/react";

import { Platform, PnlSnapshotKind } from "@/graphql/gql/graphql";

import {
  useGetPnlSnapshotsV2ForPagination,
  useIsPnlSnapshotV2Initialized,
} from "@/app-hooks/useHistory";

import { PerpEventLogPnlChart } from "./PerpEventLogPnlChart/PerpEventLogPnlChart";
import { PaginatedViews } from "@/components/views/PaginatedViews";
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
};

export function LeaderboardV2({
  kind,
  platform,
  date,
  hideTags,
}: LeaderboardV2Props) {
  const [page, setPage] = useState(1);

  const { pnlSnapshots, totalPages, loading } =
    useGetPnlSnapshotsV2ForPagination(
      dayjs(date).format("YYYY-MM-DD"),
      kind,
      platform,
      Math.max(0, page - 1),
      5,
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
        <PaginatedViews
          currentPage={page}
          totalPages={totalPages}
          onChangePage={setPage}
          loading={loading}
        >
          <div className="flex h-[700px] w-full flex-col gap-6 overflow-y-auto">
            {pnlSnapshots.map((item) => (
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
                  {tradingSignalAddresses[getKey(item.address, platform)] && (
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
                      .subtract(timestampGapByPnlSnapshotKind[kind], "ms")
                      .toDate(),
                    to: date,
                  }}
                />
              </div>
            ))}
          </div>
        </PaginatedViews>
      )}
    </div>
  );
}
