"use client";

import { useEffect, useState } from "react";
import { useDisclosure, Button, Chip, Tab, Tabs } from "@nextui-org/react";
import dayjs from "dayjs";
import { useSearchParams, useRouter } from "next/navigation";
import { getFragmentData } from "@/graphql/gql";
import { PlanStatus } from "@/graphql/gql/graphql";

import {
  BOTDETAILS_INFO_FRAGMENT_DOCUMENT,
  useBatchCreateBots,
} from "@/app-hooks/useAutomation";
import {
  useAddBotsToPlan,
  useEndPlan,
  useGetPlanById,
  useStartPlan,
} from "@/app-hooks/usePlan";

import { PersonalTradeHistory, VirtualBot } from "@/types";
import {
  getSortedPartialHistories,
  transformHistories,
} from "@/utils/historiesChart";

import { getPersonalTradeHistories } from "@/app-actions/getPersonalTradeHistories";

import { CreateVirtualAutomationModal } from "./CreateVirtualAutomationModal";

import { chipColorsByPlanStatus } from "./PlanCard";

import { PlanAutomations } from "./PlanAutomations";
import { BackTestingView } from "./BackTestingView";
import { RealResultView } from "./RealResultView";

type TabType = "backtesting" | "real" | "automations";

export function PlanDetailPanel({ planId }: { planId: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selected, setSelected] = useState<TabType>(
    (searchParams.get("tab") as TabType) || "backtesting",
  );

  const { batchCreateBots, loading: createBotsLoading } = useBatchCreateBots();
  const { addBotsToPlan, loading: addBotsLoading } = useAddBotsToPlan();
  const { startPlan, loading: startPlanLoading } = useStartPlan();
  const { endPlan, loading: endPlanLoading } = useEndPlan();

  const plan = useGetPlanById(+planId);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [selectedBotIds, setSelectedBotIds] = useState<Record<number, boolean>>(
    {},
  );
  const [showBotChartIds, setShowBotChartIds] = useState<
    Record<number, boolean>
  >({});

  const [virtualBots, setVirtualBots] = useState<VirtualBot[]>([]);
  const [selectedVirtualBotIds, setSelectedVirtualBotIds] = useState<
    Record<string, boolean>
  >({});
  const [selectedVirtualBot, setSelectedVirtualBot] =
    useState<VirtualBot | null>(null);

  const [leaderBotsHistories, setLeaderBotsHistories] = useState<
    Record<string, PersonalTradeHistory[]>
  >({});

  const [followerBotsHistories, setFollowerBotsHistories] = useState<
    Record<string, PersonalTradeHistory[]>
  >({});

  useEffect(() => {
    if (plan?.bots) {
      setSelectedBotIds(
        plan.bots.reduce((acc, bot) => ({ ...acc, [bot.id]: true }), {}),
      );

      plan.bots.forEach((bot) => {
        getPersonalTradeHistories(
          bot.leaderContract.backendUrl!,
          bot.leaderAddress,
        ).then((histories) => {
          setLeaderBotsHistories((prev) => ({
            ...prev,
            [bot.id]: transformHistories(
              histories,
              bot.leaderCollateralBaseline,
              bot.strategy,
            ),
          }));
        });

        getPersonalTradeHistories(
          bot.followerContract.backendUrl!,
          bot.followerAddress,
        ).then((histories) => {
          setFollowerBotsHistories((prev) => ({
            ...prev,
            [bot.id]: getSortedPartialHistories(histories, {
              from: bot.startedAt ? new Date(bot.startedAt) : new Date(),
              to: bot.endedAt ? new Date(bot.endedAt) : new Date(),
            }),
          }));
        });
      });
    }
  }, [plan?.bots]);

  const handleSaveVirtualBots = async () => {
    if (virtualBots.length > 0) {
      const { data } = await batchCreateBots({
        variables: {
          input: virtualBots
            .filter((item) => selectedVirtualBotIds[item.virtualId])
            .map((item) => ({
              followerContractId: item.followerContract.contractId,
              leaderAddress: item.leaderAddress,
              leaderCollateralBaseline: item.leaderCollateralBaseline,
              leaderContractId: item.leaderContract.contractId,
              strategy: {
                strategyKey: item.strategy.strategyKey,
                ratio: item.strategy.ratio,
                lifeTime: item.strategy.lifeTime,
                maxCollateral: item.strategy.maxCollateral,
                minCollateral: item.strategy.minCollateral,
                collateralBaseline: item.strategy.collateralBaseline,
                maxLeverage: Math.floor(+item.strategy.maxLeverage * 1000),
                minLeverage: Math.floor(+item.strategy.minLeverage * 1000),
                params: "{}",
              },
            })),
        },
      });

      const newBotIds = data?.batchCreateBots?.map(
        (bot) => getFragmentData(BOTDETAILS_INFO_FRAGMENT_DOCUMENT, bot).id,
      );

      if (newBotIds) {
        await addBotsToPlan({
          variables: {
            botIds: newBotIds,
            planId: +planId,
          },
        });

        setVirtualBots((prev) =>
          prev.filter((item) => !selectedVirtualBotIds[item.virtualId]),
        );

        setSelectedVirtualBotIds({});
      }
    }
  };

  const handleStartPlan = () => {
    if (plan?.status === PlanStatus.Created) {
      startPlan({ variables: { id: +planId } });
    }
  };

  const handleEndPlan = () => {
    if (plan?.status === PlanStatus.Started) {
      endPlan({ variables: { id: +planId } });
    }
  };

  const handleBotSelection = async (botId: number, isSelected: boolean) => {
    setSelectedBotIds((prev) => ({
      ...prev,
      [botId]: isSelected,
    }));

    const bot = plan?.bots.find((bot) => bot.id === botId);

    if (isSelected && bot && !leaderBotsHistories[botId]) {
      const histories = transformHistories(
        (await getPersonalTradeHistories(
          bot.leaderContract.backendUrl!,
          bot.leaderAddress,
        )) || [],
        bot.leaderCollateralBaseline,
        bot.strategy,
      );
      setLeaderBotsHistories((prev) => ({ ...prev, [botId]: histories }));
    }

    if (isSelected && bot && !followerBotsHistories[botId]) {
      const histories =
        (await getPersonalTradeHistories(
          bot.followerContract.backendUrl!,
          bot.followerAddress,
        )) || [];
      setFollowerBotsHistories((prev) => ({ ...prev, [botId]: histories }));
    }
  };

  const handleVirtualBotSelection = async (
    virtualBot: VirtualBot,
    isSelected: boolean,
  ) => {
    setSelectedVirtualBotIds((prev) => ({
      ...prev,
      [virtualBot.virtualId]: isSelected,
    }));
  };

  const handleEditVirtualBot = (virtualBot: VirtualBot) => {
    setSelectedVirtualBot(virtualBot);
    onOpen();
  };

  const handleChartToggle = (botId: number) => {
    setShowBotChartIds((prev) => ({
      ...prev,
      [botId]: !prev[botId],
    }));
  };

  const handleSaveVirtualBot = async (virtualBot: VirtualBot) => {
    setVirtualBots((prev) => {
      const exists = prev.find(
        (item) => item.virtualId === virtualBot.virtualId,
      );

      if (exists) {
        return prev.map((item) =>
          item.virtualId === virtualBot.virtualId ? virtualBot : item,
        );
      }
      return [...prev, virtualBot];
    });

    const leaderHistories = transformHistories(
      (await getPersonalTradeHistories(
        virtualBot.leaderContract.backendUrl!,
        virtualBot.leaderAddress,
      )) || [],
      virtualBot.leaderCollateralBaseline,
      {
        ...virtualBot.strategy,
      },
    );
    setLeaderBotsHistories((prev) => ({
      ...prev,
      [virtualBot.virtualId]: leaderHistories,
    }));

    setSelectedVirtualBot(null);
    onClose();
  };

  const items = plan
    ? [
        {
          label: "Scheduled Start At",
          value: dayjs(plan.scheduledStart).format("MMM D, H:m:s"),
        },
        {
          label: "Scheduled End At",
          value: dayjs(plan.scheduledEnd).format("MMM D, H:m:s"),
        },
        {
          label: "Started At",
          value: plan.startedAt
            ? dayjs(plan.startedAt).format("MMM D, H:m:s")
            : null,
        },
        {
          label: "Ended At",
          value: plan.endedAt
            ? dayjs(plan.endedAt).format("MMM D, H:m:s")
            : null,
        },
        {
          label: "Bots",
          value: plan.bots.length,
        },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex flex-1 flex-col">
            <span className="text-xl font-bold text-neutral-400">
              {plan?.title || ""}
            </span>
            <p className="text-xs text-neutral-400">
              {plan?.description || ""}
            </p>
          </div>

          <Chip variant="flat">Plan {plan?.id || ""}</Chip>
        </div>

        <div className="flex items-center gap-6">
          {items.map(
            (item) =>
              item.value !== null && (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">
                    {item.label}:
                  </span>
                  <span className="text-sm font-bold text-neutral-300">
                    {item.value}
                  </span>
                </div>
              ),
          )}

          {plan && (
            <Chip color={chipColorsByPlanStatus[plan.status]} variant="flat">
              {plan.status}
            </Chip>
          )}

          {plan?.status === PlanStatus.Created && (
            <Button
              size="sm"
              color="primary"
              onClick={handleStartPlan}
              isLoading={startPlanLoading}
              isDisabled={startPlanLoading}
            >
              Start Plan
            </Button>
          )}

          {plan?.status === PlanStatus.Started && (
            <Button
              size="sm"
              color="warning"
              onClick={handleEndPlan}
              isLoading={endPlanLoading}
              isDisabled={endPlanLoading}
            >
              End Plan
            </Button>
          )}
        </div>

        <Tabs
          aria-label="plans-tab-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => {
            if (value) {
              setSelected(value as TabType);
              router.push(`/plans/${planId}?tab=${value}`);
            }
          }}
        >
          <Tab key="backtesting" title="Back Testing" />
          <Tab key="real" title="Real Results" />
          <Tab key="automations" title="Automations" />
        </Tabs>
      </div>

      {selected === "automations" && (
        <PlanAutomations bots={plan?.bots || []} />
      )}

      {selected === "backtesting" && (
        <BackTestingView
          isSavingVirtualBots={createBotsLoading || addBotsLoading}
          isDisabledSaveVirtualBots={
            !Object.values(selectedVirtualBotIds).find((item) => item) ||
            createBotsLoading ||
            addBotsLoading
          }
          bots={plan?.bots || []}
          selectedBotIds={selectedBotIds}
          showBotChartIds={showBotChartIds}
          botsHistories={leaderBotsHistories}
          virtualBots={virtualBots}
          selectedVirtualBotIds={selectedVirtualBotIds}
          onClickSaveVirtualBots={handleSaveVirtualBots}
          onOpenCreateVirtualBotModal={onOpen}
          onChangeVirtualBotSelection={handleVirtualBotSelection}
          onEditVirtualBot={handleEditVirtualBot}
          onChangeBotSelection={handleBotSelection}
          onToggleChart={handleChartToggle}
        />
      )}

      {selected === "real" && (
        <RealResultView
          bots={plan?.bots || []}
          selectedBotIds={selectedBotIds}
          showBotChartIds={showBotChartIds}
          botsHistories={followerBotsHistories}
          onChangeBotSelection={handleBotSelection}
          onToggleChart={handleChartToggle}
        />
      )}

      <CreateVirtualAutomationModal
        virtualBot={selectedVirtualBot}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        onSave={handleSaveVirtualBot}
      />
    </div>
  );
}
