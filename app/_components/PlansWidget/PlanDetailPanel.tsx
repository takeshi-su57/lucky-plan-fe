"use client";

import { useEffect, useState } from "react";
import { useDisclosure, Button, Chip, Tab, Tabs } from "@nextui-org/react";
import dayjs from "dayjs";
import { useSearchParams, useRouter } from "next/navigation";
import { PlanStatus } from "@/graphql/gql/graphql";

import { useEndPlan, useGetPlanById, useStartPlan } from "@/app-hooks/usePlan";

import { PersonalTradeHistory } from "@/types";

import { getPersonalTradeHistories } from "@/app-actions/getPersonalTradeHistories";

import { chipColorsByPlanStatus } from "./PlanCard";

import { PlanAutomations } from "./PlanAutomations";
import { RealResultView } from "./RealResultView";
import { FaPlus } from "react-icons/fa";
import { CreateAutomationModal } from "../AutomationWidgets/CreateAutomationModal";
import { getSortedPartialHistories } from "@/utils/historiesChart";

type TabType = "overview" | "automations";

export function PlanDetailPanel({ planId }: { planId: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selected, setSelected] = useState<TabType>(
    (searchParams.get("tab") as TabType) || "past",
  );

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
          bot.followerContract.backendUrl!,
          bot.followerAddress,
        ).then((histories) => {
          setFollowerBotsHistories((prev) => ({
            ...prev,
            [bot.id]: getSortedPartialHistories(
              histories,
              "show_all_activity",
              {
                from: new Date(bot.startedAt),
                to: new Date(bot.endedAt),
              },
            ),
          }));
        });
      });
    }
  }, [plan?.bots]);

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

    if (isSelected && bot && !followerBotsHistories[botId]) {
      const histories =
        (await getPersonalTradeHistories(
          bot.followerContract.backendUrl!,
          bot.followerAddress,
        )) || [];
      setFollowerBotsHistories((prev) => ({ ...prev, [botId]: histories }));
    }
  };

  const handleChartToggle = (botId: number) => {
    setShowBotChartIds((prev) => ({
      ...prev,
      [botId]: !prev[botId],
    }));
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

        <div className="flex items-center justify-between gap-2">
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
            <Tab key="overview" title="Overview" />
            <Tab key="automations" title="Automations" />
          </Tabs>

          <Button isIconOnly color="primary" variant="flat" onClick={onOpen}>
            <FaPlus />
          </Button>
        </div>
      </div>

      {selected === "automations" && (
        <PlanAutomations bots={plan?.bots || []} />
      )}

      {selected === "overview" && (
        <RealResultView
          bots={plan?.bots || []}
          selectedBotIds={selectedBotIds}
          showBotChartIds={showBotChartIds}
          botsHistories={followerBotsHistories}
          onChangeBotSelection={handleBotSelection}
          onToggleChart={handleChartToggle}
        />
      )}

      <CreateAutomationModal
        planId={null}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
