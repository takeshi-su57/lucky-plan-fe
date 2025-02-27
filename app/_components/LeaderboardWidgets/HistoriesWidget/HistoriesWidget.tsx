"use client";

import { useMemo, useState } from "react";
import { Address } from "viem";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";
import dayjs from "dayjs";

import { getHistoriesChartData } from "@/utils/historiesChart";
import { PersonalTradeHistory } from "@/types";

import { PairChip } from "../PairChip";
import { HistoryCharts } from "../HistoryCharts";
import { twMerge } from "tailwind-merge";
import { HistoriesSummary } from "./HistoriesSummary";
import { HistoriesPositionList } from "./HistoriesPositionList";

type TabType = "chart" | "positions";

export type HistoriesWidgetProps = {
  address: Address;
  histories: PersonalTradeHistory[];
  contractId: number;
  hideTags: boolean;
  label?: string;
  isSelected?: boolean;
  onChangeSelection?: (
    address: string,
    contractId: number,
    leaderCollateral: number,
    isSelected: boolean,
  ) => void;
  mode: "show_all_activity" | "show_only_valid_activity";
  showLastTwoDaysTraders?: boolean;
  range?: {
    from?: Date;
    to?: Date;
  };
};

export function HistoriesWidget({
  address,
  histories,
  contractId,
  hideTags,
  isSelected,
  label,
  onChangeSelection,
  showLastTwoDaysTraders,
  mode,
  range,
}: HistoriesWidgetProps) {
  const [selected, setSelected] = useState<TabType>("chart");

  const {
    historiesGroupedByTradeIndex,
    actionCounts,
    pnlChartData,
    inOutChartData,
    inChartData,
    outChartData,
    tradePairs,
    maxIn,
    sumIn,
    countIn,
    firstActivity,
    lastActivity,
  } = useMemo(
    () => getHistoriesChartData(histories, mode, range),
    [histories, mode, range],
  );

  if (range && range.to && showLastTwoDaysTraders) {
    const twoDaysAgo = dayjs(range.to).subtract(2, "day").toDate();

    if (!lastActivity || lastActivity < twoDaysAgo) {
      return <div />;
    }
  }

  return (
    <Card
      className={twMerge("mb-4", isSelected ? "border border-primary-400" : "")}
      isBlurred
    >
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
              contractId={contractId}
              actionCounts={actionCounts}
              maxIn={maxIn}
              sumIn={sumIn}
              countIn={countIn}
              firstActivity={firstActivity}
              lastActivity={lastActivity}
              hideTags={hideTags}
              isSelected={isSelected}
              onChangeSelection={onChangeSelection}
              label={label}
              pnlChartData={pnlChartData}
              inOutChartData={inOutChartData}
            />
          </div>

          <div className="flex flex-1 flex-col items-center justify-start gap-6">
            {contractId !== 0 ? (
              <Virtuoso
                style={{ height: 50, width: 800, overflowY: "hidden" }}
                data={tradePairs}
                horizontalDirection
                itemContent={(_, data) => (
                  <div className="mr-4">
                    <PairChip
                      key={data[0]}
                      contractId={contractId}
                      pairName={data[0]}
                      count={data[1]}
                    />
                  </div>
                )}
              />
            ) : null}

            {selected === "chart" && (
              <HistoryCharts
                pnlChartData={pnlChartData}
                inOutChartData={inOutChartData}
                inChartData={inChartData}
                outChartData={outChartData}
              />
            )}

            {selected === "positions" && (
              <HistoriesPositionList
                contractId={contractId}
                historiesGroupedByTradeIndex={historiesGroupedByTradeIndex}
              />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
