"use client";
import dayjs from "dayjs";
import { Address } from "viem";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { getPriceStr } from "@/utils/price";
import { HistoryChartData } from "../HistoryCharts";
import { TagsWidget } from "../../TagWidgets/TagsWidget";

export type HistoriesSummaryProps = {
  address: Address;
  firstActivity: Date | null;
  lastActivity: Date | null;
  pnlChartData: HistoryChartData[];
  hideTags: boolean;
};

export function HistoriesSummary({
  address,
  firstActivity,
  lastActivity,
  pnlChartData,
  hideTags,
}: HistoriesSummaryProps) {
  const totalPnl =
    pnlChartData.length > 0 ? pnlChartData[pnlChartData.length - 1].value : 0;

  const primaryItems = [
    {
      id: "address",
      label: "Address",
      value: <AddressWidget address={address as Address} />,
    },
    {
      id: "totalPnl",
      label: "Total PnL",
      value: `$${getPriceStr(totalPnl)}`,
    },
    {
      id: "tradeCount",
      label: "Trades",
      value: pnlChartData.length,
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
  ];

  return (
    <div className="flex h-full w-[200px] flex-col gap-2">
      {primaryItems.map((item) => (
        <div
          className="flex w-full items-center justify-between gap-4"
          key={item.id}
        >
          <span className="text-xs text-neutral-400">{item.label}:</span>
          <span className="text-base font-bold text-white">{item.value}</span>
        </div>
      ))}

      {!hideTags ? <TagsWidget address={address} /> : null}
    </div>
  );
}
