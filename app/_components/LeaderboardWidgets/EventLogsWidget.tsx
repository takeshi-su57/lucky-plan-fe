import { useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { FaCopy } from "react-icons/fa";
import { Address } from "viem";
import {
  PerpTradeHistory,
  PerpTradeHistoryOperation,
  Platform,
} from "@/graphql/gql/graphql";

import { useGetPerpTradeHistories } from "@/app/_hooks/useHistory";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import { PerpEventLogPnlChart } from "./PerpEventLogPnlChart/PerpEventLogPnlChart";

export type EventLogsWidgetProps = {
  address: string;
  platform: Platform;
  cols: 1 | 2 | 4;
};

function roundTo(value: number, decimals = 2) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function getOperationLabel(operation: PerpTradeHistoryOperation) {
  switch (operation) {
    case PerpTradeHistoryOperation.Open:
      return "open position";
    case PerpTradeHistoryOperation.Close:
      return "close position";
    case PerpTradeHistoryOperation.IncreaseLeverage:
      return "increase leverage";
    case PerpTradeHistoryOperation.DecreaseLeverage:
      return "decrease leverage";
    case PerpTradeHistoryOperation.IncreaseSize:
      return "increase size";
    case PerpTradeHistoryOperation.DecreaseSize:
      return "decrease size";
    default:
      return "trade update";
  }
}

function getExportLogsPayload(
  perpTradeHistories: PerpTradeHistory[],
  address: string,
  platform: Platform,
) {
  const sortedLogs = [...perpTradeHistories].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const timeline = perpTradeHistories.map((history) => {
    const side = history.isLong ? "long" : "short";
    const action = getOperationLabel(history.operation);

    return {
      when: new Date(history.date).toISOString(),
      action,
      market: history.pair,
      side,
      priceUsd: roundTo(history.price, 6),
      leverageX: roundTo(history.leverage, 3),
      sizeUsd: roundTo(history.sizeInUsd),
      collateralUsd: roundTo(history.collateralInUsd),
      realizedPnlUsd: roundTo(history.usdPnl),
      summary: `${action} ${side} ${history.pair} @ ${roundTo(history.price, 6)} | size ${roundTo(history.sizeInUsd)} | collateral ${roundTo(history.collateralInUsd)} | lev ${roundTo(history.leverage, 3)}x | pnl ${roundTo(history.usdPnl)}`,
    };
  });

  const actionsByType = timeline.reduce<Record<string, number>>((acc, item) => {
    acc[item.action] = (acc[item.action] ?? 0) + 1;
    return acc;
  }, {});

  const realizedPnlTotal = roundTo(
    timeline.reduce((sum, item) => sum + item.realizedPnlUsd, 0),
  );

  const uniqueMarkets = Array.from(
    new Set(timeline.map((item) => `${item.market}:${item.side}`)),
  );

  return {
    meta: {
      address,
      platform,
      sourceLogCount: sortedLogs.length,
      usableHistoryCount: timeline.length,
      skippedLogCount: sortedLogs.length - timeline.length,
      exportedAt: new Date().toISOString(),
      format: "lucky-plan-perp-trading-history-v2-readable",
      range:
        timeline.length > 0
          ? {
              from: timeline[0].when,
              to: timeline[timeline.length - 1].when,
            }
          : null,
    },
    summary: {
      totalActions: timeline.length,
      realizedPnlTotalUsd: realizedPnlTotal,
      actionsByType,
      markets: uniqueMarkets,
    },
    timeline,
  };
}

export function EventLogsWidget({
  address,
  platform,
  cols,
}: EventLogsWidgetProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const allContracts = useGetAllContracts();
  const { histories, loading } = useGetPerpTradeHistories([address], platform);
  const logs = histories[0] ?? [];
  const canExport = !loading && logs.length > 0 && allContracts.length > 0;

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
          isDisabled={!canExport}
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
          perpTradeHistories={logs}
          cols={cols}
        />
      )}
    </div>
  );
}
