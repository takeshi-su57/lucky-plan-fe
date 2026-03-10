"use client";

import { memo, useMemo, useState } from "react";
import { Spinner, Switch } from "@heroui/react";
import { Virtuoso } from "react-virtuoso";

import {
  BotForwardDetails,
  Contract,
  Platform,
} from "@/graphql/gql/graphql";

import { AutomationSummary } from "@/app-components/AutomationWidgets/AutomationSummary";
import { AutomationDetails } from "@/app-components/AutomationWidgets/AutomationDetails";
import { ModaledItems } from "@/components/modals/ModaledItems";
import { useGetPerpEventLogs } from "@/app/_hooks/useHistory";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import { useGetPlanBotGroups } from "@/app/_hooks/usePlan";
import { convertPerpTradingEventLogToHistory } from "@/utils/historiesV2Chart";
import LineChart from "@/components/charts/LineChart";
import dayjs from "dayjs";
import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { Address } from "viem";

const CHART_INITIAL_SELECTED = ["x", "y"];

export type PlanAutomationsProps = {
  planId: number;
};

export function PlanAutomations({ planId }: PlanAutomationsProps) {
  const allContracts = useGetAllContracts();
  const [isChartFirst, setIsChartFirst] = useState(false);
  const [showDeadBots, setShowDeadBots] = useState(false);

  const { botGroups, fetchMore, hasMore } = useGetPlanBotGroups(
    planId,
    !showDeadBots,
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Switch
          isSelected={isChartFirst}
          onValueChange={setIsChartFirst}
          size="sm"
        >
          Chart First
        </Switch>

        <Switch
          isSelected={showDeadBots}
          onValueChange={setShowDeadBots}
          size="sm"
        >
          Show Dead Automations
        </Switch>
      </div>

      <Virtuoso
        style={{ height: 700 }}
        data={botGroups}
        endReached={() => {
          if (hasMore) fetchMore();
        }}
        itemContent={(_index, item) => (
          <div className="pb-6">
            <GroupedAutomations
              bots={item.bots}
              leaderAddress={item.leaderAddress}
              platform={item.platform}
              isChartFirst={isChartFirst}
              allContracts={allContracts}
            />
          </div>
        )}
      />
    </div>
  );
}

export type GroupedAutomationsProps = {
  bots: BotForwardDetails[];
  leaderAddress: string;
  platform: Platform;
  isChartFirst: boolean;
  allContracts: Contract[];
};

export const GroupedAutomations = memo(function GroupedAutomations({
  bots,
  leaderAddress,
  platform,
  allContracts,
}: GroupedAutomationsProps) {
  const { eventLogs, loading } = useGetPerpEventLogs(
    [leaderAddress],
    platform,
    1000,
  );

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

  const chartData = useMemo(
    () =>
      pnlAccChartData.map((item) => ({
        ...item,
        label: dayjs(item.date).format("MM/DD"),
      })),
    [pnlAccChartData],
  );

  return (
    <div className="flex w-full gap-2 rounded-lg border border-neutral-700 p-4">
      <div className="flex h-[300px] w-1/3 flex-col gap-4">
        <div className="flex items-center gap-4">
          <AddressWidget
            address={leaderAddress as Address}
            className="text-sm"
          />

          <span className="text-base text-neutral-400/60">
            {`Leader on ${platform}`}
          </span>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <LineChart
            title="PNL ACC"
            data={chartData}
            initialSelected={CHART_INITIAL_SELECTED}
            className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {bots.map((bot) => (
          <BotModaledItem key={bot.id} bot={bot} />
        ))}
      </div>
    </div>
  );
});

const BotModaledItem = memo(function BotModaledItem({
  bot,
}: {
  bot: BotForwardDetails;
}) {
  return (
    <ModaledItems
      mode="rightDrawer"
      trigger={<AutomationSummary bot={bot} />}
      content={<AutomationDetails bot={bot} />}
      contentTitle={`Automation ${bot.id}`}
      classNames={{
        trigger: "border border-neutral-700 rounded-lg p-2 ",
      }}
    />
  );
});
