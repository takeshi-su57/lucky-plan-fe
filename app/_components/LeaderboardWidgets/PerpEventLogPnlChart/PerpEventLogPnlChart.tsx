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
};

export function PerpEventLogPnlChart({
  address,
  perpTradingEventLogs,
  range,
  hideTags,
}: PerpEventLogPnlChartProps) {
  const [selected, setSelected] = useState<TabType>("chart");

  const allContracts = useGetAllContracts();

  const {
    missionHistories,
    pnlChartData,
    inOutChartData,
    inChartData,
    outChartData,
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
        <div className="flex h-[500px] gap-8 p-3">
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
              pnlChartData={pnlChartData}
              inOutChartData={inOutChartData}
              openedPositions={openedPositions}
              avgDuration={avgDuration}
              avgPnlP={avgPnlP}
              avgSize={avgSize}
              avgCollateral={avgCollateral}
              avgLeverage={avgLeverage}
            />
          </div>

          <div className="flex h-full flex-1 flex-col items-center justify-start gap-6">
            {selected === "chart" && (
              <HistoryCharts
                pnlChartData={pnlChartData}
                inOutChartData={inOutChartData}
                inChartData={inChartData}
                outChartData={outChartData}
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
