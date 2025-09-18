"use client";

import { useMemo, useState } from "react";
import { Address } from "viem";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import dayjs from "dayjs";

import { getHistoriesChartData } from "@/utils/historiesChart";
import { PersonalTradeHistory } from "@/types";

import { HistoryCharts } from "../HistoryCharts";
import { twMerge } from "tailwind-merge";
import { HistoriesSummary } from "./HistoriesSummary";
import { HistoriesPositionList } from "./HistoriesPositionList";
import { getScore } from "@/utils";

type TabType = "chart" | "positions";

export type HistoriesWidgetProps = {
  address: Address;
  histories: PersonalTradeHistory[];
  hideTags: boolean;
  label?: string;
  isSelected?: boolean;
  onChangeSelection?: (address: string, isSelected: boolean) => void;
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
    pnlAccChartData,
    inOutChartData,
    inOutAccChartData,
    maxIn,
    sumIn,
    countIn,
    firstActivity,
    lastActivity,
    openedHistoriesArr,
    avgDuration,
    avgPnlP,
    avgSize,
    avgCollateral,
    avgLeverage,
    slope,
    r2,
  } = useMemo(() => {
    return getHistoriesChartData(histories, {
      mode,
      range,
    });
  }, [histories, mode, range]);

  const score = useMemo(
    () =>
      getScore(
        range?.to
          ? dayjs(range.to).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
        histories,
      ),
    [histories, range?.to],
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
          <div className="flex flex-1 flex-col gap-4">
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
              pnlChartData={pnlAccChartData}
              inOutChartData={inOutChartData}
              openedPositions={openedHistoriesArr.length}
              avgDuration={avgDuration}
              avgPnlP={avgPnlP}
              avgSize={avgSize}
              avgCollateral={avgCollateral}
              avgLeverage={avgLeverage}
              slope={slope}
              r2={r2}
            />

            <div className="text-red-500">{score}</div>
          </div>

          <div className="flex w-[calc(100%-200px)] flex-col items-center justify-start gap-6">
            {selected === "chart" && (
              <HistoryCharts
                pnlChartData={pnlChartData}
                inOutChartData={inOutChartData}
                inOutAccChartData={inOutAccChartData}
                pnlAccChartData={pnlAccChartData}
              />
            )}

            {selected === "positions" && (
              <HistoriesPositionList
                historiesGroupedByTradeIndex={historiesGroupedByTradeIndex}
              />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
