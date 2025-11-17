"use client";

import { useMemo } from "react";
import { Spinner } from "@heroui/react";
import { Platform } from "@/graphql/gql/graphql";

import { useGetExpertPnlSnapshotsV2 } from "@/app/_hooks/usePlan";
import { useGetPerpEventLogs } from "@/app/_hooks/useHistory";
import { InsightPanel } from "./InsightPanel";

export function InsightFromExpertPanel({ platform }: { platform: Platform }) {
  const { pnlSnapshots, loading, hasMore } =
    useGetExpertPnlSnapshotsV2(platform);

  const { eventLogs, loading: eventLogsLoading } = useGetPerpEventLogs(
    pnlSnapshots.length > 0 && !hasMore
      ? pnlSnapshots.map((snapshot) => snapshot.address)
      : [],
    platform,
    200,
  );

  const items = useMemo(() => {
    return eventLogs
      .filter((logs) => logs.length > 0)
      .map((logs) => ({
        address: logs[0].address,
        platform,
        eventLogs: logs,
      }));
  }, [eventLogs, platform]);

  if (loading || hasMore || eventLogsLoading) {
    return <Spinner color="warning" size="lg" />;
  }

  return <InsightPanel items={items} />;
}
