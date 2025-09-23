"use client";

import { useState, useMemo } from "react";
import { Address } from "viem";
import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { Contract, PerpTradingEventLog } from "@/graphql/gql/graphql";

import { HistoryCharts } from "../HistoryCharts";
import { HistoriesSummary } from "../HistoriesWidget/HistoriesSummary";

import { useGetAllContracts } from "@/app/_hooks/useContract";
import { getHistoriesChartData } from "@/utils/historiesV2Chart";
import { HistoriesPositionList } from "./HistoriesPositionList";

type TabType = "chart" | "positions";

export type PerpEventLogPnlChartProps = {
  address: Address;
  perpTradingEventLogs: PerpTradingEventLog[];
  range?: {
    from?: Date;
    to?: Date;
  };
  hideTags: boolean;
  showLatestStats?: boolean;
};

export function PerpEventLogPnlChart({
  address,
  perpTradingEventLogs,
  range,
  hideTags,
  showLatestStats,
}: PerpEventLogPnlChartProps) {
  const [selected, setSelected] = useState<TabType>("chart");
  const [selectedPair, setSelectedPair] = useState<string>("all");

  const allContracts = useGetAllContracts();

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

    return getHistoriesChartData(perpTradingEventLogs, contractsMapa, {
      range,
      pair: selectedPair === "all" ? null : selectedPair,
    });
  }, [perpTradingEventLogs, allContracts, range, selectedPair]);

  return (
    <Card className={twMerge("mb-4 w-full shrink-0")} isBlurred>
      <CardBody>
        <div className="flex min-h-[500px] gap-8 p-3">
          <div className="flex flex-col gap-4">
            <Autocomplete
              label="Select Pairs"
              variant="underlined"
              defaultItems={[["all", 0], ...tradePairs]}
              placeholder="Select Pair"
              selectedKey={selectedPair}
              onSelectionChange={(key) => setSelectedPair(key as string)}
            >
              {(item) => (
                <AutocompleteItem key={item[0]} className="font-mono">
                  {item[0] === "all" ? "All Pairs" : `${item[0]} - ${item[1]}`}
                </AutocompleteItem>
              )}
            </Autocomplete>

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
              />
            )}

            {selected === "positions" && (
              <HistoriesPositionList perpTradeHistories={missionHistories} />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
