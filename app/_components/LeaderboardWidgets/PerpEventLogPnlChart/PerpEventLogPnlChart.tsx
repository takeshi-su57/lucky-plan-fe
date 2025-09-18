"use client";

import { useState, useMemo } from "react";
import { Address } from "viem";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
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
    firstActivity,
    lastActivity,
    openedPositions,
    avgDuration,
    avgPnlP,
    avgSize,
    avgCollateral,
    avgLeverage,
    slope,
    r2,
    latestAvgDuration,
    latestAvgPnlP,
    latestAvgSize,
    latestAvgCollateral,
    latestAvgLeverage,
    latestSlope,
    latestR2,
  } = useMemo(() => {
    const contractsMapa: Record<number, Contract> = {};

    allContracts.forEach((contract) => {
      contractsMapa[contract.id] = contract;
    });

    return getHistoriesChartData(perpTradingEventLogs, contractsMapa, {
      range,
    });
  }, [perpTradingEventLogs, allContracts, range]);

  return (
    <Card className={twMerge("mb-4 w-full shrink-0")} isBlurred>
      <CardBody>
        <div className="flex min-h-[500px] gap-8 p-3">
          <div className="flex flex-col gap-4">
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
              avgDuration={showLatestStats ? latestAvgDuration : avgDuration}
              avgPnlP={showLatestStats ? latestAvgPnlP : avgPnlP}
              avgSize={showLatestStats ? latestAvgSize : avgSize}
              avgCollateral={
                showLatestStats ? latestAvgCollateral : avgCollateral
              }
              avgLeverage={showLatestStats ? latestAvgLeverage : avgLeverage}
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
