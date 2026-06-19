"use client";

import { Ref, useImperativeHandle, useMemo, useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import type { Selection } from "@heroui/react";

import { getHistoriesChartData } from "@/utils/historiesV2Chart";
import { HistoryCharts } from "../HistoryCharts";
import { HistoriesSummary } from "./HistoriesSummary";
import { ExpertPositionsPanel } from "./ExpertPositionsPanel";
import { getPairKey, getTradePairs, parsePairKey } from "./utils";
import { PerpEventLogPnlChartHandle, PerpEventLogPnlChartProps } from "./types";

export function PerpEventLogPnlChartExpert({
  address,
  platform,
  perpTradeHistories,
  range,
  ref,
  cols = 2,
}: PerpEventLogPnlChartProps & {
  ref?: Ref<PerpEventLogPnlChartHandle>;
}) {
  const [selectedPair, setSelectedPair] = useState<Selection>(
    new Set<string>([]),
  );

  useImperativeHandle(
    ref ?? null,
    () => ({
      getSelectedPairs: () =>
        (Array.from(selectedPair) as string[]).map(parsePairKey),
    }),
    [selectedPair],
  );

  const tradePairs = useMemo(
    () => getTradePairs(perpTradeHistories),
    [perpTradeHistories],
  );

  const selectedPairKeys = useMemo(() => {
    return new Set(Array.from(selectedPair) as string[]);
  }, [selectedPair]);

  const filteredHistories = useMemo(() => {
    if (selectedPairKeys.size === 0) {
      return perpTradeHistories;
    }

    return perpTradeHistories.filter((item) =>
      selectedPairKeys.has(getPairKey(item.pair, item.isLong)),
    );
  }, [perpTradeHistories, selectedPairKeys]);

  const {
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
  } = useMemo(() => {
    return getHistoriesChartData(filteredHistories, {
      range,
    });
  }, [filteredHistories, range]);

  return (
    <div className="flex min-h-125 gap-4 p-3">
      <div className="border-default-200 bg-content1 flex w-fit flex-col gap-4 rounded-lg border p-5">
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

      <ExpertPositionsPanel
        platform={platform}
        missionHistories={missionHistories}
      />

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
