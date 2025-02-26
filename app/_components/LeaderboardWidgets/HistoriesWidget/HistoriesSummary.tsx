import dayjs from "dayjs";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { getPriceStr } from "@/utils/price";
import { Address } from "viem";
import { TagsWidget } from "../../TagWidgets/TagsWidget";
import { Checkbox } from "@nextui-org/react";
import { HistoryChartData } from "../HistoryCharts";

export type HistoriesSummaryProps = {
  address: Address;
  contractId: number;
  actionCounts: Record<string, number>;
  maxIn: number;
  sumIn: number;
  countIn: number;
  firstActivity: Date | null;
  lastActivity: Date | null;
  hideTags: boolean;
  label?: string;
  isSelected?: boolean;
  onChangeSelection?: (
    address: string,
    contractId: number,
    leaderCollateral: number,
    isSelected: boolean,
  ) => void;
  pnlChartData: HistoryChartData[];
  inOutChartData: HistoryChartData[];
};

export function HistoriesSummary({
  address,
  contractId,
  actionCounts,
  maxIn,
  sumIn,
  countIn,
  firstActivity,
  lastActivity,
  hideTags,
  isSelected,
  onChangeSelection,
  label,
  pnlChartData,
  inOutChartData,
}: HistoriesSummaryProps) {
  const totalInvested = inOutChartData.reduce(
    (acc, curr) => (acc > curr.value ? curr.value : acc),
    0,
  );
  const totalPnl =
    pnlChartData.length > 0 ? pnlChartData[pnlChartData.length - 1].value : 0;
  const remainBalance = -totalInvested + totalPnl;

  const items = [
    {
      id: "address",
      label: "Address",
      value: <AddressWidget address={address as Address} />,
    },
    ...Object.entries(actionCounts).map(([action, count]) => ({
      id: action,
      label: action,
      value: count,
    })),
    {
      id: "tradeCount",
      label: "Trades",
      value: pnlChartData.length,
    },
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
      id: "remainBalance",
      label: "Remain Balance",
      value: `$${getPriceStr(remainBalance)}`,
    },
    {
      id: "maxInvested",
      label: "Invested",
      value: `$${getPriceStr(maxIn)}`,
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
    <div className="flex h-full w-[200px] flex-col justify-between gap-8">
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            className="flex w-full items-center justify-between gap-4"
            key={item.id}
          >
            <span className="text-xs text-neutral-400">{item.label}:</span>
            <span className="text-base font-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>

      {!hideTags ? <TagsWidget address={address} /> : null}

      {isSelected !== undefined ? (
        <Checkbox
          isSelected={isSelected}
          onValueChange={(value) =>
            onChangeSelection?.(
              address,
              contractId,
              countIn > 0 ? sumIn / countIn : 0,
              value,
            )
          }
        >
          {label || ""}
        </Checkbox>
      ) : null}
    </div>
  );
}
