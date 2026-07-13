"use client";

import { Ref, useImperativeHandle, useMemo, useState } from "react";
import { Button, Select, SelectItem, Spinner, Tab, Tabs } from "@heroui/react";
import type { Selection } from "@heroui/react";
import { FaCopy } from "react-icons/fa";

import { getHistoriesChartData } from "@/utils/historiesV2Chart";
import { useGetPerpTradePositions } from "@/app/_hooks/useHistory";
import {
  PerpTradeHistory,
  PerpTradeHistoryOperation,
  Platform,
} from "@/graphql/gql/graphql";
import { HistoryCharts } from "../HistoryCharts";
import { HistoriesSummary } from "./HistoriesSummary";
import { ExpertPositionsPanel } from "./ExpertPositionsPanel";
import { getTradePairs, parsePairKey } from "./utils";
import { PerpEventLogPnlChartHandle, PerpEventLogPnlChartProps } from "./types";
import { NumericInput } from "@/components/inputs/NumericInput";
import { CopyTradingScorePanel } from "./CopyTradingScorePanel";

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

type TabType = "summary" | "positions" | "analyze";

function getExportLogsPayload(
  perpTradeHistories: PerpTradeHistory[],
  address: string,
  platform: Platform,
) {
  const sortedLogs = [...perpTradeHistories].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const timeline = sortedLogs.map((history) => {
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

export function PerpEventLogPnlChartExpert({
  address,
  platform,
  ref,
  cols = 2,
  startedAt,
  stoppedAt,
  endedAt,
}: PerpEventLogPnlChartProps & {
  ref?: Ref<PerpEventLogPnlChartHandle>;
}) {
  const [selectedPair, setSelectedPair] = useState<Selection>(
    new Set<string>([]),
  );
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const [selected, setSelected] = useState<TabType>("summary");

  const [maxLeverage, setMaxLeverage] = useState("40");

  const { data, loading } = useGetPerpTradePositions(
    address,
    platform,
    Number.isNaN(+maxLeverage) || +maxLeverage === 0 ? null : +maxLeverage,
    startedAt,
    stoppedAt,
    endedAt,
  );

  const canExport = !loading && data;

  useImperativeHandle(
    ref ?? null,
    () => ({
      getSelectedPairs: () =>
        (Array.from(selectedPair) as string[]).map(parsePairKey),
    }),
    [selectedPair],
  );

  const tradePairs = useMemo(() => {
    const missionHistories = (data?.positions || []).map(
      (position) => position.histories,
    );
    const sortedHistories = missionHistories
      .flat()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return getTradePairs(sortedHistories || []);
  }, [data]);

  const selectedPairKeys = useMemo(() => {
    return new Set(Array.from(selectedPair) as string[]);
  }, [selectedPair]);

  const {
    sortedHistories,
    missionHistories,
    pnlChartData,
    pnlAccChartData,
    inOutChartData,
    inOutAccChartData,
    maxIn,
    sumIn,
    countIn,
    firstActivity,
    lastActivity,
    openedPositions,
    duration,
    pnl,
    pnlP,
    size,
    collateral,
    leverage,
    slope,
    r2,
    copyTrading,
  } = useMemo(() => {
    return getHistoriesChartData(data, selectedPairKeys);
  }, [data, selectedPairKeys]);

  const copyExportPayload = async () => {
    try {
      const exportPayload = getExportLogsPayload(
        sortedHistories,
        address,
        platform,
      );

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

  let maxLeverageHelper = "";

  if (Number.isNaN(+maxLeverage)) {
    maxLeverageHelper = "Invalid max leverage";
  }

  if (loading) {
    return (
      <div className="flex min-h-80 w-full items-center justify-center">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  return (
    <div className="grid h-full min-h-0 grid-cols-[300px_minmax(0,1fr)] items-stretch gap-4 p-3">
      <div className="border-default-200 bg-content1 flex h-full min-h-0 flex-col gap-4 rounded-lg border p-5">
        <Tabs
          aria-label="users-table-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => {
            if (value) {
              setSelected(value as TabType);
            }
          }}
        >
          <Tab key="summary" title="Summaries" />
          <Tab key="positions" title="Positions" />
          <Tab key="analyze" title="Analyze" />
        </Tabs>

        {selected === "positions" && (
          <ExpertPositionsPanel missionHistories={missionHistories} />
        )}

        {selected === "analyze" && (
          <CopyTradingScorePanel copyTrading={copyTrading} />
        )}

        {selected === "summary" && (
          <div className="flex flex-col gap-3">
            <Button
              size="sm"
              variant="flat"
              color={copyState === "failed" ? "danger" : "primary"}
              isDisabled={!canExport}
              onPress={copyExportPayload}
              startContent={<FaCopy size={14} />}
              className="h-9 rounded-lg px-3 text-xs font-semibold"
            >
              {copyState === "copied"
                ? "Copied"
                : copyState === "failed"
                  ? "Copy failed"
                  : "Copy Trading Histories JSON"}
            </Button>

            <NumericInput
              amount={maxLeverage}
              onChange={setMaxLeverage}
              label="Max Leverage"
              errorMessage={maxLeverageHelper}
              isInvalid={maxLeverageHelper.trim() !== ""}
            />

            <Select
              variant="underlined"
              label="Pairs"
              placeholder="Select pairs"
              selectedKeys={selectedPair}
              onSelectionChange={setSelectedPair}
              selectionMode="multiple"
              className="w-50 font-mono"
            >
              {tradePairs.map((item) => (
                <SelectItem key={item.key}>
                  {`${item.pair} - (${item.count} ${item.isLong ? "Long" : "Short"})`}
                </SelectItem>
              ))}
            </Select>

            <HistoriesSummary
              address={address}
              actionCounts={{}}
              maxIn={maxIn}
              sumIn={sumIn}
              countIn={countIn}
              firstActivity={firstActivity}
              lastActivity={lastActivity}
              pnlChartData={pnlAccChartData}
              inOutChartData={inOutChartData}
              openedPositions={openedPositions}
              positions={missionHistories.length}
              duration={duration}
              pnl={pnl}
              size={size}
              collateral={collateral}
              leverage={leverage}
              pnlP={pnlP}
              slope={slope}
              r2={r2}
            />
          </div>
        )}
      </div>

      <HistoryCharts
        pnlChartData={pnlChartData}
        pnlAccChartData={pnlAccChartData}
        inOutChartData={inOutChartData}
        inOutAccChartData={inOutAccChartData}
        cols={cols}
      />
    </div>
  );
}
