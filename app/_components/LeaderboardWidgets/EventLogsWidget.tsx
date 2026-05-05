import { useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { FaCopy } from "react-icons/fa";
import { Address } from "viem";
import { PerpTradingEventLog, Platform } from "@/graphql/gql/graphql";

import { useGetPerpEventLogs } from "@/app/_hooks/useHistory";
import { PerpEventLogPnlChart } from "./PerpEventLogPnlChart/PerpEventLogPnlChart";

export type EventLogsWidgetProps = {
  address: string;
  platform: Platform;
  cols: 1 | 2 | 4;
  fullHistory?: boolean;
};

function parseJsonLog(jsonLog: string) {
  try {
    return JSON.parse(jsonLog);
  } catch {
    return jsonLog;
  }
}

function getExportLogsPayload(
  logs: PerpTradingEventLog[],
  address: string,
  platform: Platform,
) {
  const sortedLogs = [...logs].sort((a, b) => {
    const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
    if (dateDiff !== 0) {
      return dateDiff;
    }
    return a.logIndex - b.logIndex;
  });

  return {
    meta: {
      address,
      platform,
      logCount: sortedLogs.length,
      exportedAt: new Date().toISOString(),
      format: "lucky-plan-perp-trading-history-v1",
    },
    histories: sortedLogs.map((log) => ({
      id: log.id,
      date: new Date(log.date).toISOString(),
      block: log.block,
      logIndex: log.logIndex,
      contractId: log.contractId,
      usdPnl: log.usdPnl,
      event: parseJsonLog(log.jsonLog),
    })),
  };
}

export function EventLogsWidget({
  address,
  platform,
  cols,
  fullHistory = true,
}: EventLogsWidgetProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const { eventLogs, loading } = useGetPerpEventLogs(
    [address],
    platform,
    fullHistory ? null : 2000,
  );
  const logs = eventLogs[0] ?? [];

  const copyExportPayload = async () => {
    try {
      const exportPayload = getExportLogsPayload(logs, address, platform);

      await navigator.clipboard.writeText(
        JSON.stringify(exportPayload, null, 2),
      );
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("failed");
      setTimeout(() => setCopyState("idle"), 1800);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          size="sm"
          variant="flat"
          color={copyState === "failed" ? "danger" : "primary"}
          isDisabled={loading || logs.length === 0}
          onPress={copyExportPayload}
          startContent={<FaCopy size={14} />}
        >
          {copyState === "copied"
            ? "Copied"
            : copyState === "failed"
              ? "Copy failed"
              : "Copy Trading Histories JSON"}
        </Button>
      </div>

      {loading ? (
        <Spinner color="warning" size="lg" />
      ) : (
        <PerpEventLogPnlChart
          address={address as Address}
          platform={platform}
          perpTradingEventLogs={logs}
          hideTags={false}
          cols={cols}
        />
      )}
    </div>
  );
}
