"use client";

import { Address } from "viem";
import { PnlSnapshotKind, TradeHistory } from "@/graphql/gql/graphql";

import {
  getAllDaysBetween,
  getAllHoursBetween,
  getAllMinutesBetween,
  isSameDay,
  isSameHour,
  isSameMinute,
} from "@/utils";

import LineChart from "@/components/charts/LineChart";
import { AddressWidget } from "@/components/AddressWidget/AddressWidget";

import { TagsWidget } from "../UserWidgets/TagsWidget";

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

  sortedHistories.forEach((history, index) => {
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

  return (
    <div className="flex items-center gap-8 border-y border-neutral-600/80 p-6">
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <span className="text-base text-neutral-400">{item.label}:</span>
            <span className="text-base font-bold text-white">{item.value}</span>
          </div>
        ))}

        <TagsWidget address={address} />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <span>PNL</span>
        <LineChart data={pnlChartData} className="h-[200px] w-full" />
        <span>Scale PNL</span>
        <LineChart data={dayScalePnlChartData} className="h-[200px] w-full" />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <span>In/Out</span>
        <LineChart data={inOutChartData} className="h-[100px] w-full" />
        <span>Scale In/Out</span>
        <LineChart data={dayScaleinOutChartData} className="h-[200px] w-full" />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <span>In</span>
        <LineChart data={inChartData} className="h-[200px] w-full" />
        <span>Out</span>
        <LineChart data={outChartData} className="h-[200px] w-full" />
      </div>
    </div>
  );
}
