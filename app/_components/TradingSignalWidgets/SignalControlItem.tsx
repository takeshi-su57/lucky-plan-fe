"use client";

import { useMemo } from "react";
import { Chip, Spinner } from "@heroui/react";

import { Contract, Platform, TradingSignalLog } from "@/graphql/gql/graphql";

import { useGetPerpEventLogs } from "@/app/_hooks/useHistory";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import { convertPerpTradingEventLogToHistory } from "@/utils/historiesV2Chart";
import LineChart from "@/components/charts/LineChart";
import dayjs from "dayjs";
import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { Address } from "viem";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import { EventLogsModalButton } from "../LeaderboardWidgets/EventLogsModalButton";
import { SignalView } from "./SignalView";

export type SignalControlItemProps = {
  tradingSignalLog: TradingSignalLog;
  isActive: boolean;
  isWhitelisted: boolean;
  isBlacklisted: boolean;
  onUnsubscribeSignal: () => void;
};

export function SignalControlItem({
  tradingSignalLog,
  isActive,
  isWhitelisted,
  isBlacklisted,
  onUnsubscribeSignal,
}: SignalControlItemProps) {
  const { eventLogs, loading } = useGetPerpEventLogs(
    [tradingSignalLog.address],
    tradingSignalLog.platform as Platform,
    1000,
  );

  const allContracts = useGetAllContracts();

  const pnlAccChartData = useMemo(() => {
    const contractsMapa: Record<number, Contract> = {};

    allContracts.forEach((contract) => {
      contractsMapa[contract.id] = contract;
    });

    const perpTradeHistories = convertPerpTradingEventLogToHistory(
      contractsMapa,
      eventLogs.flat(),
    );

    const pnlAccChartData: {
      value: number;
      date: Date;
    }[] = [];

    let pnlSum = 0;

    perpTradeHistories
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .forEach((history) => {
        if (pnlAccChartData.length === 0) {
          pnlAccChartData.push({
            value: 0,
            date: new Date(history.date),
          });
        }

        pnlSum += history.usdPnl;

        pnlAccChartData.push({
          value: pnlSum,
          date: new Date(history.date),
        });
      });

    return pnlAccChartData;
  }, [eventLogs, allContracts]);

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-neutral-700 p-4">
      <div className="flex flex-row items-center gap-6 rounded bg-neutral-400/5 px-4 py-2">
        <Chip variant="flat" color="default">
          {tradingSignalLog.platform}
        </Chip>
        <AddressWidget address={tradingSignalLog.address as Address} />

        {isActive && (
          <span className="rounded-md bg-green-400/10 p-1 text-green-400">
            Active
          </span>
        )}

        {isWhitelisted && (
          <span className="ml-2 rounded-md bg-yellow-400/10 p-1 text-yellow-400">
            Whitelisted
          </span>
        )}
        {isBlacklisted && (
          <span className="ml-2 rounded-md bg-red-400/10 p-1 text-red-400">
            Blacklisted
          </span>
        )}

        <ButtonWithConfirm
          onPress={onUnsubscribeSignal}
          color="danger"
          size="sm"
          variant="bordered"
        >
          Unsubscribe
        </ButtonWithConfirm>

        <EventLogsModalButton
          address={tradingSignalLog.address as Address}
          platform={tradingSignalLog.platform as Platform}
          label="Check"
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <LineChart
          title="PNL ACC"
          data={pnlAccChartData.map((item) => ({
            ...item,
            label: dayjs(item.date).format("MM/DD"),
          }))}
          initialSelected={["x", "y"]}
          className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
        />
      )}

      {tradingSignalLog.eventLogs.length > 0 ? (
        <SignalView
          signalId={tradingSignalLog.id}
          platform={tradingSignalLog.platform as Platform}
          eventLogs={tradingSignalLog.eventLogs}
        />
      ) : (
        <p className="text-base text-neutral-400">No event logs</p>
      )}
    </div>
  );
}
