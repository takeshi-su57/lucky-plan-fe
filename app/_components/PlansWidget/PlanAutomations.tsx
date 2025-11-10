"use client";

import { useMemo, useState } from "react";
import { Spinner, Switch } from "@nextui-org/react";

import {
  BotForwardDetails,
  BotStatus,
  Contract,
  Platform,
} from "@/graphql/gql/graphql";

import { AutomationSummary } from "@/app-components/AutomationWidgets/AutomationSummary";
import { AutomationDetails } from "@/app-components/AutomationWidgets/AutomationDetails";
import { ModaledItems } from "@/components/modals/ModaledItems";
import { PaginatedViews } from "@/components/views/PaginatedViews";
import { useGetPerpEventLogs } from "@/app/_hooks/useHistory";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import { convertPerpTradingEventLogToHistory } from "@/utils/historiesV2Chart";
import LineChart from "@/components/charts/LineChart";
import dayjs from "dayjs";
import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { Address } from "viem";

const PAGE_SIZE = 10;

export type PlanAutomationsProps = {
  bots: BotForwardDetails[];
};

export function PlanAutomations({ bots }: PlanAutomationsProps) {
  const [isChartFirst, setIsChartFirst] = useState(false);
  const [showDeadBots, setShowDeadBots] = useState(false);
  const [page, setPage] = useState(1);

  const groupedBots = useMemo(() => {
    const botMap: Record<
      string,
      { leaderAddress: string; platform: Platform; bots: BotForwardDetails[] }
    > = {};

    bots
      .filter((bot) => (showDeadBots ? true : bot.status !== BotStatus.Dead))
      .forEach((bot) => {
        const key = `${bot.leaderAddress.toLowerCase()}-${bot.leaderContract.platform}`;

        const obj = botMap[key] || {
          leaderAddress: bot.leaderAddress,
          platform: bot.leaderContract.platform,
          bots: [],
        };
        obj.bots.push(bot);

        botMap[key] = obj;
      });

    return Object.values(botMap);
  }, [bots, showDeadBots]);

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

      <PaginatedViews
        currentPage={page}
        totalPages={Math.ceil(groupedBots.length / PAGE_SIZE)}
        onChangePage={setPage}
        loading={false}
      >
        <div className="flex h-[700px] w-full flex-col gap-6 overflow-y-auto">
          {groupedBots
            .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
            .map((item) => (
              <GroupedAutomations
                key={`${item.leaderAddress}-${item.platform}`}
                bots={item.bots}
                leaderAddress={item.leaderAddress}
                platform={item.platform}
                isChartFirst={isChartFirst}
              />
            ))}
        </div>
      </PaginatedViews>
    </div>
  );
}

export type GroupedAutomationsProps = {
  bots: BotForwardDetails[];
  leaderAddress: string;
  platform: Platform;
  isChartFirst: boolean;
};

export function GroupedAutomations({
  bots,
  leaderAddress,
  platform,
  isChartFirst,
}: GroupedAutomationsProps) {
  const { eventLogs, loading } = useGetPerpEventLogs(
    [leaderAddress],
    platform,
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
            data={pnlAccChartData.map((item) => ({
              ...item,
              label: dayjs(item.date).format("MM/DD"),
            }))}
            initialSelected={["x", "y"]}
            className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {bots.map((bot) => (
          <ModaledItems
            key={bot.id}
            mode="rightDrawer"
            trigger={<AutomationSummary simple bot={bot} />}
            content={
              <AutomationDetails bot={bot} isChartFirst={isChartFirst} />
            }
            contentTitle={`Automation ${bot.id}`}
            classNames={{
              trigger: "border border-neutral-700 rounded-lg p-2 ",
            }}
          />
        ))}
      </div>
    </div>
  );
}
