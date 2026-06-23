"use client";

import { useMemo } from "react";
import { Spinner } from "@heroui/react";
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
    10,
  );
  const {
    data: isPnlSnapshotInitialized,
    loading: isPnlSnapshotInitializedLoading,
  } = useIsPnlSnapshotV2Initialized(dayjs(date).format("YYYY-MM-DD"), platform);

  const { bots } = useGetActiveBots();
  const { activeAddresses } = useMemo(() => {
    const activeAddresses: Record<string, boolean> = {};

    bots.forEach((bot) => {
      activeAddresses[bot.leaderAddress.toLowerCase()] = true;
    });

    return {
      activeAddresses,
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
        <div className="bg-content1 shadow-small w-full overflow-hidden rounded-lg p-4">
          {loading && pnlSnapshots.length === 0 ? (
            <div
              className="flex w-full items-center justify-center"
              style={{ height: "calc(100vh - 250px)", minHeight: 520 }}
            >
              <Spinner color="warning" size="lg" />
            </div>
          ) : (
            <Virtuoso
              style={{ height: "calc(100vh - 250px)", minHeight: 520 }}
              data={pnlSnapshots}
              endReached={() => {
                if (hasMore && !loading) fetchMore();
              }}
              overscan={200}
              itemContent={(_index, item) => (
                <div className="flex w-full flex-col pr-1">
                  <PerpEventLogPnlChart
                    address={item.address as Address}
                    platform={platform}
                    positionsWithSummary={item.positionsWithSummary}
                    mode="lightweight"
                    className={twMerge(
                      activeAddresses[item.address.toLowerCase()] &&
                        "bg-green-500/20",
                    )}
                    startedAt={null}
                    stoppedAt={null}
                    endedAt={date}
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
        </div>
      )}
    </div>
  );
}
