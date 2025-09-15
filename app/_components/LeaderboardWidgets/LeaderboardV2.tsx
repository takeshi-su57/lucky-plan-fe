"use client";

import { useState } from "react";
import { Spinner } from "@nextui-org/react";
import { Address } from "viem";
import dayjs from "dayjs";

import { Platform, PnlSnapshotKind } from "@/graphql/gql/graphql";

import {
  useGetPnlSnapshotsV2ForPagination,
  useIsPnlSnapshotV2Initialized,
} from "@/app-hooks/useHistory";

import { PerpEventLogPnlChart } from "./PerpEventLogPnlChart/PerpEventLogPnlChart";
import { PaginatedViews } from "@/components/views/PaginatedViews";

const timestampGapByPnlSnapshotKind = {
  [PnlSnapshotKind.Day]: 24 * 60 * 60 * 1000,
  [PnlSnapshotKind.Week]: 7 * 24 * 60 * 60 * 1000,
  [PnlSnapshotKind.Month]: 30 * 24 * 60 * 60 * 1000,
  [PnlSnapshotKind.ThreeMonth]: 3 * 30 * 24 * 60 * 60 * 1000,
  [PnlSnapshotKind.AllTime]: 10 * 365 * 24 * 60 * 60 * 1000,
};

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
      10,
    );
  const {
    data: isPnlSnapshotInitialized,
    loading: isPnlSnapshotInitializedLoading,
  } = useIsPnlSnapshotV2Initialized(dayjs(date).format("YYYY-MM-DD"), platform);

  return (
    <div className="flex flex-col gap-6">
      {isPnlSnapshotInitializedLoading ? (
        <div className="flex w-full items-center justify-center">
          <Spinner color="warning" size="lg" />
        </div>
      ) : null}

      {!isPnlSnapshotInitialized?.isPnlSnapshotV2Initialized ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 text-primary-400 hover:text-primary-300">
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
              <PerpEventLogPnlChart
                key={item.id}
                address={item.address as Address}
                perpTradingEventLogs={item.perpTradingEventLogs}
                hideTags={hideTags}
                range={{
                  from: dayjs(date)
                    .subtract(timestampGapByPnlSnapshotKind[kind], "ms")
                    .toDate(),
                  to: date,
                }}
              />
            ))}
          </div>
        </PaginatedViews>
      )}
    </div>
  );
}
