"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { Spinner, Switch } from "@heroui/react";

import {
  BotForwardDetails,
  BotStatus,
  Contract,
  MissionStatus,
  Platform,
} from "@/graphql/gql/graphql";

import { AutomationSummary } from "@/app-components/AutomationWidgets/AutomationSummary";
import { AutomationDetails } from "@/app-components/AutomationWidgets/AutomationDetails";
import { ModaledItems } from "@/components/modals/ModaledItems";
import { useGetPerpEventLogs } from "@/app/_hooks/useHistory";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import { useGetPlanBotGroups } from "@/app/_hooks/usePlan";
import { useLiveBot, useStopBot } from "@/app-hooks/useAutomation";
import { useCloseMission } from "@/app/_hooks/useMission";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import { convertPerpTradingEventLogToHistory } from "@/utils/historiesV2Chart";
import LineChart from "@/components/charts/LineChart";
import dayjs from "dayjs";
import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { Address } from "viem";
import { PaginatedViews } from "@/components/views/PaginatedViews";

const CHART_INITIAL_SELECTED = ["x", "y"];
const PAGE_SIZE = 10;

export type PlanAutomationsProps = {
  planId: number;
};

export function PlanAutomations({ planId }: PlanAutomationsProps) {
  const allContracts = useGetAllContracts();
  const [isChartFirst, setIsChartFirst] = useState(false);
  const [showDeadBots, setShowDeadBots] = useState(false);
  const [page, setPage] = useState(1);

  const { botGroups, loading, totalPages } = useGetPlanBotGroups(
    planId,
    !showDeadBots,
    page,
    PAGE_SIZE,
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
          onValueChange={(value) => {
            setShowDeadBots(value);
            setPage(1);
          }}
          size="sm"
        >
          Show Dead Automations
        </Switch>
      </div>

      <PaginatedViews
        currentPage={page}
        totalPages={totalPages}
        onChangePage={setPage}
        loading={loading}
      >
        <div className="flex flex-col gap-6">
          {botGroups.map((item) => (
            <GroupedAutomations
              key={`${item.leaderAddress}-${item.platform}`}
              bots={item.bots}
              leaderAddress={item.leaderAddress}
              platform={item.platform}
              isChartFirst={isChartFirst}
              allContracts={allContracts}
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
  allContracts: Contract[];
};

export const GroupedAutomations = memo(function GroupedAutomations({
  bots,
  leaderAddress,
  platform,
  allContracts,
}: GroupedAutomationsProps) {
  const liveBot = useLiveBot();
  const stopBot = useStopBot();
  const closeMission = useCloseMission();

  const [liveAllLoading, setLiveAllLoading] = useState(false);
  const [stopAllLoading, setStopAllLoading] = useState(false);
  const [closeAllMissionsLoading, setCloseAllMissionsLoading] = useState(false);

  const createdBots = useMemo(
    () => bots.filter((bot) => bot.status === BotStatus.Created),
    [bots],
  );

  const liveBots = useMemo(
    () => bots.filter((bot) => bot.status === BotStatus.Live),
    [bots],
  );

  const allOpenMissions = useMemo(
    () =>
      bots.flatMap((bot) =>
        (bot.missions || []).filter(
          (mission) =>
            mission.status !== MissionStatus.Closed &&
            mission.status !== MissionStatus.Ignored,
        ).map((mission) => mission),
      ),
    [bots],
  );

  const handleLiveAll = useCallback(async () => {
    if (createdBots.length === 0) return;
    setLiveAllLoading(true);
    try {
      await Promise.all(
        createdBots.map((bot) => liveBot({ variables: { id: bot.id } })),
      );
    } finally {
      setLiveAllLoading(false);
    }
  }, [createdBots, liveBot]);

  const handleStopAll = useCallback(async () => {
    if (liveBots.length === 0) return;
    setStopAllLoading(true);
    try {
      await Promise.all(
        liveBots.map((bot) => stopBot({ variables: { id: bot.id } })),
      );
    } finally {
      setStopAllLoading(false);
    }
  }, [liveBots, stopBot]);

  const handleCloseAllMissions = useCallback(async () => {
    if (allOpenMissions.length === 0) return;
    setCloseAllMissionsLoading(true);
    try {
      await Promise.all(
        allOpenMissions.map((mission) =>
          closeMission({ variables: { id: mission.id, isForce: false } }),
        ),
      );
    } finally {
      setCloseAllMissionsLoading(false);
    }
  }, [allOpenMissions, closeMission]);

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
    <div className="flex w-full flex-col gap-2 rounded-lg border border-neutral-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AddressWidget
            address={leaderAddress as Address}
            className="text-sm"
          />

          <span className="text-base text-neutral-400/60">
            {`Leader on ${platform}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ButtonWithConfirm
            onPress={handleLiveAll}
            isDisabled={createdBots.length === 0}
            isLoading={liveAllLoading}
            color="success"
            size="sm"
          >
            {`Live All (${createdBots.length})`}
          </ButtonWithConfirm>

          <ButtonWithConfirm
            onPress={handleStopAll}
            isDisabled={liveBots.length === 0}
            isLoading={stopAllLoading}
            color="warning"
            size="sm"
          >
            {`Stop All (${liveBots.length})`}
          </ButtonWithConfirm>

          <ButtonWithConfirm
            onPress={handleCloseAllMissions}
            isDisabled={allOpenMissions.length === 0}
            isLoading={closeAllMissionsLoading}
            color="danger"
            size="sm"
          >
            {`Close All Missions (${allOpenMissions.length})`}
          </ButtonWithConfirm>
        </div>
      </div>

      <div className="flex w-full gap-2">
        <div className="flex h-[300px] w-1/3 flex-col gap-4">
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
