"use client";

import { useMemo, useState } from "react";
import { Spinner } from "@heroui/react";
import { Address } from "viem";
import dayjs from "dayjs";

import { Platform } from "@/graphql/gql/graphql";

import {
  useGetPnlSnapshotsV2,
  useIsPnlSnapshotV2Initialized,
} from "@/app-hooks/useHistory";

import { PerpEventLogPnlChart } from "./PerpEventLogPnlChart/PerpEventLogPnlChart";
import { twMerge } from "tailwind-merge";
import { PaginatedViews } from "@/components/views/PaginatedViews";

const PAGE_SIZE = 20;

export type LeaderboardV2Props = {
  isDesc: boolean;
  isAppliedFilter: boolean;
  hideDegens: boolean;
  platform: Platform;
  date: Date;
  highlightedAddresses: Map<string, boolean>;
};

export function LeaderboardV2({
  isDesc,
  isAppliedFilter,
  hideDegens,
  platform,
  date,
  highlightedAddresses,
}: LeaderboardV2Props) {
  const [page, setPage] = useState(1);

  const { pnlSnapshots, loading, totalPages } = useGetPnlSnapshotsV2(
    dayjs(date).format("YYYY-MM-DD"),
    platform,
    isDesc,
    hideDegens ? 50 : null,
    page,
    PAGE_SIZE,
  );

  console.log(pnlSnapshots?.length);

  const {
    data: isPnlSnapshotInitialized,
    loading: isPnlSnapshotInitializedLoading,
  } = useIsPnlSnapshotV2Initialized(dayjs(date).format("YYYY-MM-DD"), platform);

  const filtered = useMemo(() => {
    return pnlSnapshots
      .filter((item) => {
        if (!isAppliedFilter) {
          return true;
        }

        // too mig leverage
        if (item.positionsWithSummary.avgLeverage > 50) {
          return false;
        }

        // bot trader
        if (item.positionsWithSummary.avgDuration / 1000 / 60 < 10) {
          return false;
        }

        // too early trader
        if (item.positionsWithSummary.positions.length < 20) {
          return false;
        }

        return true;
      })
      .map((snapshot) => ({
        ...snapshot,
        positionsWithSummary: {
          ...snapshot.positionsWithSummary,
          positions: snapshot.positionsWithSummary.positions.filter(
            (position) => {
              const history = position.histories[0];

              if (hideDegens && history.pair.toLowerCase().includes("degen")) {
                return false;
              }

              if (history.leverage > 50) {
                return false;
              }

              return true;
            },
          ),
        },
      }));
  }, [hideDegens, isAppliedFilter, pnlSnapshots]);

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
          <div className="flex flex-col gap-1">
            {filtered.map((item) => (
              <div
                key={`${item.platform}-${item.dateStr}-${item.address}`}
                className="flex w-full flex-col"
              >
                <PerpEventLogPnlChart
                  address={item.address as Address}
                  platform={platform}
                  positionsWithSummary={item.positionsWithSummary}
                  mode="lightweight"
                  className={twMerge(
                    highlightedAddresses.get(item.address.toLowerCase()) &&
                      "bg-green-500/20",
                  )}
                  startedAt={null}
                  stoppedAt={null}
                  endedAt={date}
                />
              </div>
            ))}
          </div>
        </PaginatedViews>
      )}
    </div>
  );
}
