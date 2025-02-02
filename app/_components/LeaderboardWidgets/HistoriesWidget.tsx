"use client";

import { useState } from "react";
import { Address } from "viem";
import { Card, CardBody, Slider } from "@nextui-org/react";
import { PnlSnapshotKind, TradeHistory } from "@/graphql/gql/graphql";
import dayjs from "dayjs";

import {
  convertMillisToReadableTime,
  getAllDaysBetween,
  getAllHoursBetween,
  getAllMinutesBetween,
  getDateAfterDays,
  getDayGap,
  isSameDay,
  isSameHour,
  isSameMinute,
} from "@/utils";

import LineChart from "@/components/charts/LineChart";
import { AddressWidget } from "@/components/AddressWidget/AddressWidget";

import { TagsWidget } from "../TagWidgets/TagsWidget";

export type HistoriesWidgetProps = {
  address: Address;
  histories: TradeHistory[];
  kind: PnlSnapshotKind;
};

export function HistoriesWidget({
  address,
  histories,
  kind,
}: HistoriesWidgetProps) {
  const [range, setRange] = useState<{
    from: number;
    to: number;
  } | null>(null);

  const pnlChartData: {
    value: number;
    date: Date;
  }[] = [];

  const dayScalePnlChartData: {
    value: number;
    date: Date;
  }[] = [];

  const inOutChartData: {
    value: number;
    date: Date;
  }[] = [];

  const dayScaleinOutChartData: {
    value: number;
    date: Date;
  }[] = [];

  const inChartData: {
    value: number;
    date: Date;
  }[] = [];

  const outChartData: {
    value: number;
    date: Date;
  }[] = [];

  let pnlSum = 0;
  let inOutSum = 0;

  const sortedHistories = histories.sort((a, b) => {
    const first = new Date(a.timestamp);
    const second = new Date(b.timestamp);

    if (first > second) {
      return 1;
    } else if (first < second) {
      return -1;
    } else {
      return 0;
    }
  });

  if (sortedHistories.length > 0) {
    [
      ...sortedHistories,
      {
        __typename: "TradeHistory",
        address,
        blockNumber: 0,
        contractId: 0,
        eventName: "",
        id: 0,
        in: 0,
        out: 0,
        pnl: 0,
        timestamp: Date.now(),
      },
    ].forEach((history, index) => {
      const gap = getDayGap(
        new Date(history.timestamp),
        new Date(sortedHistories[0].timestamp),
      );

      if (range && (range.from > gap || range.to < gap)) {
        return;
      }

      pnlSum += history.pnl;
      inOutSum += history.in - history.out;

      if (pnlChartData.length === 0) {
        pnlChartData.push({
          value: 0,
          date: new Date(history.timestamp),
        });
      }

      if (inOutChartData.length === 0) {
        inOutChartData.push({
          value: 0,
          date: new Date(history.timestamp),
        });
      }

      if (outChartData.length === 0) {
        outChartData.push({
          value: 0,
          date: new Date(history.timestamp),
        });
      }

      if (inChartData.length === 0) {
        outChartData.push({
          value: 0,
          date: new Date(history.timestamp),
        });
      }

      if (dayScalePnlChartData.length === 0) {
        dayScalePnlChartData.push({
          value: 0,
          date: new Date(history.timestamp),
        });
      } else if (
        kind === PnlSnapshotKind.Day &&
        !isSameMinute(
          new Date(history.timestamp),
          new Date(sortedHistories[index - 1].timestamp),
        )
      ) {
        const minutes = getAllMinutesBetween(
          new Date(sortedHistories[index - 1].timestamp),
          new Date(history.timestamp),
        );

        minutes.slice(1).forEach((minute) => {
          dayScalePnlChartData.push({
            value: pnlSum,
            date: minute,
          });
        });
      } else if (
        kind === PnlSnapshotKind.Week &&
        !isSameHour(
          new Date(history.timestamp),
          new Date(sortedHistories[index - 1].timestamp),
        )
      ) {
        const hours = getAllHoursBetween(
          new Date(sortedHistories[index - 1].timestamp),
          new Date(history.timestamp),
        );

        hours.slice(1).forEach((hour) => {
          dayScalePnlChartData.push({
            value: pnlSum,
            date: hour,
          });
        });
      } else if (
        !isSameDay(
          new Date(history.timestamp),
          new Date(sortedHistories[index - 1].timestamp),
        )
      ) {
        const days = getAllDaysBetween(
          new Date(sortedHistories[index - 1].timestamp),
          new Date(history.timestamp),
        );

        days.slice(1).forEach((day) => {
          dayScalePnlChartData.push({
            value: pnlSum,
            date: day,
          });
        });
      }

      if (dayScaleinOutChartData.length === 0) {
        dayScaleinOutChartData.push({
          value: 0,
          date: new Date(history.timestamp),
        });
      } else if (
        kind === PnlSnapshotKind.Day &&
        !isSameMinute(
          new Date(history.timestamp),
          new Date(sortedHistories[index - 1].timestamp),
        )
      ) {
        const minutes = getAllMinutesBetween(
          new Date(sortedHistories[index - 1].timestamp),
          new Date(history.timestamp),
        );

        minutes.slice(1).forEach((minute) => {
          dayScaleinOutChartData.push({
            value: inOutSum,
            date: minute,
          });
        });
      } else if (
        kind === PnlSnapshotKind.Week &&
        !isSameHour(
          new Date(history.timestamp),
          new Date(sortedHistories[index - 1].timestamp),
        )
      ) {
        const hours = getAllHoursBetween(
          new Date(sortedHistories[index - 1].timestamp),
          new Date(history.timestamp),
        );

        hours.slice(1).forEach((hour) => {
          dayScaleinOutChartData.push({
            value: inOutSum,
            date: hour,
          });
        });
      } else if (
        !isSameDay(
          new Date(history.timestamp),
          new Date(sortedHistories[index - 1].timestamp),
        )
      ) {
        const days = getAllDaysBetween(
          new Date(sortedHistories[index - 1].timestamp),
          new Date(history.timestamp),
        );

        days.slice(1).forEach((day) => {
          dayScaleinOutChartData.push({
            value: inOutSum,
            date: day,
          });
        });
      }

      pnlChartData.push({
        value: pnlSum,
        date: new Date(history.timestamp),
      });
      inOutChartData.push({
        value: inOutSum,
        date: new Date(history.timestamp),
      });

      inChartData.push({
        value: history.in,
        date: new Date(history.timestamp),
      });
      outChartData.push({
        value: -history.out,
        date: new Date(history.timestamp),
      });
    });
  }

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
      value: pnlSum,
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
    <Card className="mb-4" isBlurred>
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

              <div className="flex items-center justify-between">
                <span className="text-base text-neutral-400">
                  First Activity:
                </span>
                <span className="text-sm font-bold text-white">
                  {sortedHistories.length > 0
                    ? dayjs(new Date(sortedHistories[0].timestamp)).format(
                        "YYYY/MM/DD",
                      )
                    : ""}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base text-neutral-400">
                  Last Activity:
                </span>
                <span className="text-sm font-bold text-white">
                  {sortedHistories.length > 0
                    ? dayjs(
                        new Date(
                          sortedHistories[sortedHistories.length - 1].timestamp,
                        ),
                      ).format("YYYY/MM/DD")
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

            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-base text-neutral-400">From:</span>
                <span className="text-sm font-bold text-white">
                  {sortedHistories.length > 0
                    ? dayjs(
                        getDateAfterDays(
                          new Date(sortedHistories[0].timestamp),
                          range?.from || 0,
                        ),
                      ).format("YYYY/MM/DD")
                    : ""}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base text-neutral-400">To:</span>
                <span className="text-sm font-bold text-white">
                  {sortedHistories.length > 0
                    ? dayjs(
                        range
                          ? getDateAfterDays(
                              new Date(sortedHistories[0].timestamp),
                              range.to,
                            )
                          : new Date(),
                      ).format("YYYY/MM/DD")
                    : ""}
                </span>
              </div>

              <Slider
                value={
                  range
                    ? [range.from, range.to]
                    : [
                        0,
                        sortedHistories.length > 0
                          ? getDayGap(
                              new Date(sortedHistories[0].timestamp),
                              new Date(),
                            )
                          : 0,
                      ]
                }
                onChange={(value) => {
                  if (Array.isArray(value)) {
                    setRange({
                      from: value[0],
                      to: value[1],
                    });
                  }
                }}
                label="Date Range"
                className="grow-0"
                hideValue
                size="sm"
                maxValue={
                  sortedHistories.length > 0
                    ? getDayGap(
                        new Date(sortedHistories[0].timestamp),
                        new Date(),
                      )
                    : 0
                }
                minValue={0}
                step={1}
              />
            </div>

            <TagsWidget address={address} />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <span>PNL</span>
            <LineChart
              data={pnlChartData}
              className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
            />
            <span>Scale PNL</span>
            <LineChart
              data={dayScalePnlChartData}
              className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
            />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <span>In/Out</span>
            <LineChart
              data={inOutChartData}
              className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
            />
            <span>Scale In/Out</span>
            <LineChart
              data={dayScaleinOutChartData}
              className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
            />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <span>In</span>
            <LineChart
              data={inChartData}
              className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
            />
            <span>Out</span>
            <LineChart
              data={outChartData}
              className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
