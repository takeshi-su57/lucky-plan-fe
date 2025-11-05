"use client";

import { Spinner } from "@nextui-org/react";
import { Platform } from "@/graphql/gql/graphql";

import { useGetTradingSignalLogs } from "@/app/_hooks/useTradingSignals";
import { InsightPanel } from "./InsightPanel";

export function InsightFromSignalPanel() {
  const { tradingSignalLogs, loading } = useGetTradingSignalLogs();

  if (loading) {
    return <Spinner color="warning" size="lg" />;
  }

  return (
    <InsightPanel
      items={tradingSignalLogs.map((log) => ({
        address: log.address,
        platform: log.platform as Platform,
        eventLogs: log.eventLogs,
      }))}
    />
  );
}
