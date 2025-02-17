"use client";

import { useMemo } from "react";
import { Address } from "viem";
import { Card, CardBody, Checkbox } from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";
import dayjs from "dayjs";

import { convertMillisToReadableTime } from "@/utils";
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
    isSelected: boolean,
  ) => void;
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
  range,
}: HistoriesWidgetProps) {
  const {
    pnlChartData,
    inOutChartData,
    inChartData,
    outChartData,
    tradePairs,
    minIn,
    maxIn,
    sumIn,
    countIn,
    firstActivity,
    lastActivity,
  } = useMemo(
    () => getHistoriesChartData(histories, range),
    [histories, range],
  );

  const items = [
    {
      id: "address",
      label: "Address",
      value: <AddressWidget address={address as Address} />,
    },
    {
      id: "tradeCount",
      label: "Trades",
      value: histories.length,
    },
    {
      id: "pnl",
      label: "PNL",
      value:
        pnlChartData.length > 0
          ? getPriceStr(pnlChartData[pnlChartData.length - 1].value)
          : 0,
    },
  ];

  const openCyclcData = outChartData.filter((item) => item.value < 0);

  let minOpenCycle = Date.now();
  let maxOpenCycle = 0;

  for (let i = 0; i < openCyclcData.length - 1; i++) {
    minOpenCycle = Math.min(
      openCyclcData[i + 1].date.getTime() - openCyclcData[i].date.getTime(),
      minOpenCycle,
    );

    maxOpenCycle = Math.max(
      openCyclcData[i + 1].date.getTime() - openCyclcData[i].date.getTime(),
      maxOpenCycle,
    );
  }

  const closeCycleData = inChartData.filter((item) => item.value > 0);

  let minCloseCycle = Date.now();
  let maxCloseCycle = 0;

  for (let i = 0; i < closeCycleData.length - 1; i++) {
    minCloseCycle = Math.min(
      closeCycleData[i + 1].date.getTime() - closeCycleData[i].date.getTime(),
      minCloseCycle,
    );

    maxCloseCycle = Math.max(
      closeCycleData[i + 1].date.getTime() - closeCycleData[i].date.getTime(),
      maxCloseCycle,
    );
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
                  <span className="text-base text-neutral-400">
                    {item.label}:
                  </span>
                  <span className="text-base font-bold text-white">
                    {item.value}
                  </span>
                </div>
              ))}

              <div className="flex flex-col gap-4 text-xs text-neutral-400">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex-1">Min In: {minIn.toFixed(2)}</span>
                  <span className="flex-1">Max In: {maxIn.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="flex-1">
                    Avg In: {(sumIn / countIn).toFixed(2)}
                  </span>
                  <span className="flex-1">Count In: {countIn}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base text-neutral-400">
                  First Activity:
                </span>
                <span className="text-sm font-bold text-white">
                  {firstActivity
                    ? dayjs(new Date(firstActivity)).format("YYYY/MM/DD")
                    : ""}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base text-neutral-400">
                  Last Activity:
                </span>
                <span className="text-sm font-bold text-white">
                  {lastActivity
                    ? dayjs(new Date(lastActivity)).format("YYYY/MM/DD")
                    : ""}
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2">
              <span className="text-base text-neutral-400">Open Cycle:</span>

              {openCyclcData.length > 1 ? (
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    {convertMillisToReadableTime(minOpenCycle)}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {convertMillisToReadableTime(maxOpenCycle)}
                  </span>
                </div>
              ) : (
                <span className="text-sm font-bold text-white">
                  1 Time Cycle
                </span>
              )}
            </div>

            <div className="flex w-full flex-col gap-2">
              <span className="text-base text-neutral-400">Close Cycle:</span>

              {closeCycleData.length > 1 ? (
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    {convertMillisToReadableTime(minCloseCycle)}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {convertMillisToReadableTime(maxCloseCycle)}
                  </span>
                </div>
              ) : (
                <span className="text-sm font-bold text-white">
                  1 Time Cycle
                </span>
              )}
            </div>

            {!hideTags ? <TagsWidget address={address} /> : null}

            {isSelected !== undefined ? (
              <Checkbox
                isSelected={isSelected}
                onValueChange={(value) =>
                  onChangeSelection?.(address, contractId, value)
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
