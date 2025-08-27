"use client";

import { Address } from "viem";
import { Card, CardBody } from "@nextui-org/react";

import { HistoryCharts } from "../HistoryCharts";
import { twMerge } from "tailwind-merge";
import { HistoriesSummary } from "./HistoriesSummary";
import { PerpTradingEventLog } from "@/graphql/gql/graphql";

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
  const pnlChartData: {
    value: number;
    date: Date;
  }[] = [];

  let pnlSum = 0;

  const sortedHistories = perpTradingEventLogs
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((history) => {
      if (range && range.from && range.from > new Date(history.date)) {
        return false;
      }

      if (range && range.to && range.to < new Date(history.date)) {
        return false;
      }

      return true;
    });

  if (sortedHistories.length > 0) {
    [
      ...sortedHistories,
      {
        ...sortedHistories[sortedHistories.length - 1],
        usdPnl: 0,
      },
      {
        ...sortedHistories[sortedHistories.length - 1],
        usdPnl: 0,
      },
    ].forEach((history) => {
      if (pnlChartData.length === 0) {
        pnlChartData.push({
          value: 0,
          date: new Date(history.date),
        });
      }

      pnlSum += history.usdPnl;

      pnlChartData.push({
        value: pnlSum,
        date: new Date(history.date),
      });
    });
  }

  const firstActivity =
    sortedHistories.length > 0 ? new Date(sortedHistories[0].date) : null;
  const lastActivity =
    sortedHistories.length > 0
      ? new Date(sortedHistories[sortedHistories.length - 1].date)
      : null;

  return (
    <Card className={twMerge("mb-4 w-full")} isBlurred>
      <CardBody>
        <div className="flex gap-8 p-3">
          <div className="flex flex-col gap-4">
            <HistoriesSummary
              address={address}
              firstActivity={firstActivity}
              lastActivity={lastActivity}
              pnlChartData={pnlChartData}
              hideTags={hideTags}
            />
          </div>

          <HistoryCharts pnlChartData={pnlChartData} />
        </div>
      </CardBody>
    </Card>
  );
}
