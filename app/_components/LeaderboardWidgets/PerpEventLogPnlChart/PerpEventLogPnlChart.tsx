"use client";

import {
  useState,
  useMemo,
  PropsWithRef,
  useImperativeHandle,
  RefObject,
} from "react";
import { Address } from "viem";
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { Contract, PerpTradingEventLog, Platform } from "@/graphql/gql/graphql";

import { HistoryCharts } from "../HistoryCharts";
import { HistoriesSummary } from "./HistoriesSummary";

import { useGetAllContracts } from "@/app/_hooks/useContract";
import {
  convertPerpTradingEventLogToHistory,
  getHistoriesChartData,
} from "@/utils/historiesV2Chart";
import { HistoriesPositionList } from "./HistoriesPositionList";

type TabType = "chart" | "positions";

export function getPairKey(pair: string, isLong: boolean) {
  return JSON.stringify({
    pair: pair.toLowerCase(),
    isLong,
  });
}

export function parsePairKey(key: string) {
  return JSON.parse(key) as { pair: string; isLong: boolean };
}

export type PerpEventLogPnlChartHandle = {
  getSelectedPairs: () => { pair: string; isLong: boolean }[];
};

export type PerpEventLogPnlChartProps = {
  address: Address;
  platform: Platform;
  perpTradingEventLogs: PerpTradingEventLog[];
  range?: {
    from?: Date;
    to?: Date;
  };
  hideTags: boolean;
  showLatestStats?: boolean;
  cols?: 1 | 2 | 4;
};

export function PerpEventLogPnlChart({
  address,
  platform,
  perpTradingEventLogs,
  range,
  hideTags,
  showLatestStats,
  ref,
  cols = 2,
}: PropsWithRef<PerpEventLogPnlChartProps> & {
  ref?: RefObject<PerpEventLogPnlChartHandle>;
}) {
  const [selected, setSelected] = useState<TabType>("chart");
  const [selectedPair, setSelectedPair] = useState<Selection>(
    new Set<string>([]),
  );

  const allContracts = useGetAllContracts();

  useImperativeHandle(
    ref ?? null,
    () => ({
      getSelectedPairs: () =>
        (Array.from(selectedPair) as string[]).map(parsePairKey),
    }),
    [selectedPair],
  );

  const {
    missionHistories,
    pnlChartData,
    pnlAccChartData,
    inOutChartData,
    inOutAccChartData,
    maxIn,
    sumIn,
    countIn,
    tradePairs,
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
    latestSlope,
    latestR2,
  } = useMemo(() => {
    const contractsMapa: Record<number, Contract> = {};

    allContracts.forEach((contract) => {
      contractsMapa[contract.id] = contract;
    });

    const pairs = Array.from(selectedPair) as string[];

    const tradePairsMap = new Map<string, number>();

    const perpTradeHistories = convertPerpTradingEventLogToHistory(
      contractsMapa,
      perpTradingEventLogs,
    );

    perpTradeHistories.forEach((item) => {
      const key = getPairKey(item.pair, item.isLong);
      tradePairsMap.set(key, (tradePairsMap.get(key) || 0) + 1);
    });

    const filtered = perpTradeHistories.filter((item) =>
      pairs.length > 0
        ? pairs.includes(getPairKey(item.pair, item.isLong))
        : true,
    );

    return {
      ...getHistoriesChartData(
        showLatestStats
          ? filtered.slice(filtered.length - 256, filtered.length)
          : filtered,
        {
          range,
        },
      ),
      tradePairs: Array.from(tradePairsMap.entries()),
    };
  }, [
    allContracts,
    selectedPair,
    perpTradingEventLogs,
    showLatestStats,
    range,
  ]);

  return (
    <Card className={twMerge("mb-4 w-full shrink-0")} isBlurred>
      <CardBody>
        <div className="flex min-h-[500px] gap-8 p-3">
          <div className="flex flex-col gap-4">
            <Select
              variant="underlined"
              label="Pairs"
              placeholder="Select pairs"
              // selectedKeys={values}
              // onSelectionChange={setValues}
              selectedKeys={selectedPair}
              onSelectionChange={setSelectedPair}
              selectionMode="multiple"
              className="w-[200px] font-mono"
            >
              {tradePairs.map((item) => (
                <SelectItem key={item[0]}>
                  {`${parsePairKey(item[0]).pair} - (${item[1]} ${parsePairKey(item[0]).isLong ? "Long" : "Short"})`}
                </SelectItem>
              ))}
            </Select>

            <Tabs
              selectedKey={selected}
              onSelectionChange={(value) =>
                value && setSelected(value as TabType)
              }
            >
              <Tab key="chart" title="Chart" />
              <Tab key="positions" title="Positions" />
            </Tabs>

            <HistoriesSummary
              address={address}
              actionCounts={{}}
              maxIn={maxIn}
              sumIn={sumIn}
              countIn={countIn}
              firstActivity={firstActivity}
              lastActivity={lastActivity}
              hideTags={hideTags}
              pnlChartData={pnlAccChartData}
              inOutChartData={inOutChartData}
              openedPositions={openedPositions}
              positions={missionHistories.length}
              showLatest={showLatestStats}
              duration={duration}
              pnl={pnl}
              size={size}
              collateral={collateral}
              leverage={leverage}
              pnlP={pnlP}
              slope={showLatestStats ? latestSlope : slope}
              r2={showLatestStats ? latestR2 : r2}
            />
          </div>

          <div className="flex h-full w-[calc(100%-200px)] flex-col items-center justify-start gap-6">
            {selected === "chart" && (
              <HistoryCharts
                pnlChartData={pnlChartData}
                pnlAccChartData={pnlAccChartData}
                inOutChartData={inOutChartData}
                inOutAccChartData={inOutAccChartData}
                cols={cols}
              />
            )}

            {selected === "positions" && (
              <HistoriesPositionList
                platform={platform}
                perpTradeHistories={missionHistories}
              />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
