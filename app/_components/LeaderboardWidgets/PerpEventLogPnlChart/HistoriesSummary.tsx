"use client";
import dayjs from "dayjs";
import { useState } from "react";
import { Address } from "viem";
import { Checkbox, Switch } from "@heroui/react";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { getPriceStr } from "@/utils/price";
import { HistoryChartData } from "../HistoryCharts";

export type HistoriesSummaryProps = {
  address?: Address;
  actionCounts: Record<string, number>;
  maxIn: number;
  sumIn: number;
  countIn: number;
  firstActivity: Date | null;
  lastActivity: Date | null;
  label?: string;
  isSelected?: boolean;
  onChangeSelection?: (address: string, isSelected: boolean) => void;
  pnlChartData: HistoryChartData[];
  inOutChartData: HistoryChartData[];
  openedPositions: number;
  positions: number;
  duration: {
    max: number;
    avg: number;
  };
  pnl: {
    pAvg: number;
    avg: number;
    nAvg: number;
  };
  size: {
    avg: number;
  };
  collateral: {
    avg: number;
  };
  pnlP: {
    avgBySize: number;
    avgByCollateral: number;
  };
  leverage: {
    avg: number;
  };
  slope: number | null;
  r2: number | null;
};

export function HistoriesSummary({
  address,
  actionCounts,
  sumIn,
  countIn,
  firstActivity,
  lastActivity,
  isSelected,
  onChangeSelection,
  label,
  pnlChartData,
  inOutChartData,
  openedPositions,
  positions,
  duration,
  pnl,
  size,
  collateral,
  leverage,
  pnlP,
  slope,
  r2,
}: HistoriesSummaryProps) {
  const [showMore, setShowMore] = useState(false);

  const totalInvested = inOutChartData.reduce(
    (acc, curr) => (acc > curr.value ? curr.value : acc),
    0,
  );
  const totalPnl =
    pnlChartData.length > 0 ? pnlChartData[pnlChartData.length - 1].value : 0;
  const remainBalance = -totalInvested + totalPnl;

  const primaryItems = [
    ...(address
      ? [
          {
            id: "address",
            label: "Address",
            value: <AddressWidget address={address as Address} />,
          },
        ]
      : []),
    {
      id: "totalPnl",
      label: "Total PnL",
      value: `$${getPriceStr(totalPnl)}`,
    },
    {
      id: "totalInvested",
      label: "Invested",
      value: `$${getPriceStr(-totalInvested)}`,
    },
    {
      id: "tradeCount",
      label: "positions",
      value: positions,
    },
    {
      id: "firstActivity",
      label: "First Activity",
      value: firstActivity
        ? dayjs(new Date(firstActivity)).format("YYYY/MM/DD")
        : "",
    },
    {
      id: "lastActivity",
      label: "Last Activity",
      value: lastActivity
        ? dayjs(new Date(lastActivity)).format("YYYY/MM/DD")
        : "",
    },
    {
      id: "openedHistories",
      label: "Opened Histories",
      value: openedPositions,
    },
    ...(showMore
      ? [
          {
            id: "maxDuration",
            label: "Max Duration",
            value: `${(duration.max / 1000 / 60).toFixed(2)}mins`,
          },
        ]
      : []),
    {
      id: "avgDuration",
      label: "Avg Duration",
      value: `${(duration.avg / 1000 / 60).toFixed(2)}mins`,
    },
    ...(showMore
      ? [
          {
            id: "pAvg",
            label: "Avg Of Positive PnL",
            value: `$${pnl.pAvg.toFixed(2)}`,
          },
          {
            id: "nAvg",
            label: "Avg Negative PnL",
            value: `$${pnl.nAvg.toFixed(2)}`,
          },
        ]
      : []),
    {
      id: "avgPnl",
      label: "Avg PnL",
      value: `$${pnl.avg.toFixed(2)}`,
    },
    ...(showMore
      ? [
          {
            id: "pnlPByCollateral",
            label: "Avg PnL % By Collateral",
            value: `${pnlP.avgByCollateral.toFixed(2)}%`,
          },
        ]
      : []),
    {
      id: "avgPnlPBySize",
      label: "Avg PnL % By Size",
      value: `${pnlP.avgBySize.toFixed(2)}%`,
    },
    {
      id: "avgSize",
      label: "Avg Size",
      value: `$${getPriceStr(size.avg)}`,
    },
    {
      id: "avgCollateral",
      label: "Avg Collateral",
      value: `$${getPriceStr(collateral.avg)}`,
    },
    {
      id: "avgLeverage",
      label: "Avg Leverage",
      value: `${leverage.avg.toFixed(2)}x`,
    },
    {
      id: "slope",
      label: "Slope",
      value: slope ? slope.toFixed(2) : "CANT_CALCULATE",
    },
    {
      id: "r2",
      label: "R2",
      value: r2 ? r2.toFixed(2) : "CANT_CALCULATE",
    },
  ];

  const extraItems = [
    ...Object.entries(actionCounts).map(([action, count]) => ({
      id: action,
      label: action,
      value: count,
    })),
    {
      id: "remainBalance",
      label: "Remain Balance",
      value: `$${getPriceStr(remainBalance)}`,
    },
    {
      id: "avgInvested",
      label: "Avg Invested",
      value: `$${getPriceStr(sumIn / countIn)}`,
    },
    {
      id: "countInvested",
      label: "Invested Count",
      value: countIn,
    },
  ];

  return (
    <div className="flex h-full w-50 flex-col justify-between gap-8">
      <div className="flex flex-col gap-2">
        {primaryItems.map((item) => (
          <div
            className="flex w-full items-center justify-between gap-4"
            key={item.id}
          >
            <span className="text-xs text-neutral-400">{item.label}:</span>
            <span className="text-base font-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {showMore &&
          extraItems.map((item) => (
            <div
              className="flex w-full items-center justify-between gap-4"
              key={item.id}
            >
              <span className="text-xs text-neutral-400">{item.label}:</span>
              <span className="text-base font-bold text-white">
                {item.value}
              </span>
            </div>
          ))}
      </div>

      <Switch isSelected={showMore} onValueChange={setShowMore}>
        Show More
      </Switch>

      {isSelected !== undefined ? (
        <Checkbox
          isSelected={isSelected}
          onValueChange={(value) => onChangeSelection?.(address, value)}
        >
          {label || ""}
        </Checkbox>
      ) : null}
    </div>
  );
}
