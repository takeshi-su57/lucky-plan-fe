"use client";

import { useMemo } from "react";
import { Address } from "viem";
import { Card, CardBody, Checkbox } from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";
import dayjs from "dayjs";

import { getHistoriesChartData } from "@/utils/historiesChart";
import { PersonalTradeHistory } from "@/types";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { getPriceStr } from "@/utils/price";
import { TagsWidget } from "../TagWidgets/TagsWidget";
import { PairChip } from "./PairChip";
import { HistoryCharts } from "./HistoryCharts";
import { twMerge } from "tailwind-merge";

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
  const {
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
      label: "Max In",
      value: `$${getPriceStr(-totalInvested)}`,
    },
    {
      id: "remainBalance",
      label: "Remain Balance",
      value: `$${getPriceStr(remainBalance)}`,
    },
    {
      id: "maxInvested",
      label: "Max Invested",
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
        <div className="flex min-h-[500px] items-center gap-8 p-3">
          <div className="flex h-full w-[200px] flex-col justify-between gap-8">
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <div
                  className="flex w-full items-center justify-between gap-4"
                  key={item.id}
                >
                  <span className="text-xs text-neutral-400">
                    {item.label}:
                  </span>
                  <span className="text-base font-bold text-white">
                    {item.value}
                  </span>
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

          <div className="flex flex-1 flex-col items-center gap-6">
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

            <HistoryCharts
              pnlChartData={pnlChartData}
              inOutChartData={inOutChartData}
              inChartData={inChartData}
              outChartData={outChartData}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
