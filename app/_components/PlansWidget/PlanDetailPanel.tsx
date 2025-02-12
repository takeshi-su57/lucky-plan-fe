"use client";

import { useState } from "react";
import {
  useDisclosure,
  Button,
  CardBody,
  Card,
  Divider,
  Chip,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";
import dayjs from "dayjs";

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
import { transformHistories } from "@/utils/historiesChart";

import { getPersonalTradeHistories } from "@/app-actions/getPersonalTradeHistories";

import { AutomationRow } from "@/app/_components/PlansWidget/AutomationRow";
import { VirtualAutomationRow } from "@/app/_components/PlansWidget/VirtualAutomationRow";

import { CreateVirtualAutomationModal } from "./CreateVirtualAutomationModal";
import { AutomationGridChart } from "./AutomationChart";
import { getFragmentData } from "@/graphql/gql";
import { chipColorsByPlanStatus } from "./PlanCard";
import { PlanStatus } from "@/graphql/gql/graphql";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { PlanAutomations } from "./PlanAutomations";

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

  const [botsHistories, setBotsHistories] = useState<
    Record<string, PersonalTradeHistory[]>
  >({});

  const handleSaveVirtualBots = async () => {
    if (virtualBots.length > 0) {
      const { data } = await batchCreateBots({
        variables: {
          input: virtualBots
            .filter((item) => selectedVirtualBotIds[item.virtualId])
            .map((item) => ({
              followerAddress: item.followerAddress,
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

    if (isSelected && bot && !botsHistories[botId]) {
      const histories = transformHistories(
        (await getPersonalTradeHistories(
          bot.leaderContract.backendUrl!,
          bot.leaderAddress,
        )) || [],
        bot.leaderCollateralBaseline,
        bot.strategy,
      );
      setBotsHistories((prev) => ({ ...prev, [botId]: histories }));
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

    const histories = transformHistories(
      (await getPersonalTradeHistories(
        virtualBot.leaderContract.backendUrl!,
        virtualBot.leaderAddress,
      )) || [],
      virtualBot.leaderCollateralBaseline,
      {
        ...virtualBot.strategy,
        maxLeverage: virtualBot.strategy.maxLeverage * 1000,
        minLeverage: virtualBot.strategy.minLeverage * 1000,
      },
    );
    setBotsHistories((prev) => ({
      ...prev,
      [virtualBot.virtualId]: histories,
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
          <Tab key="backtesting" title="Backtesting" />
          <Tab key="real" title="Real Results" />
          <Tab key="automations" title="Automations" />
        </Tabs>
      </div>

      {selected === "automations" ? (
        <PlanAutomations bots={plan?.bots || []} />
      ) : (
        <>
          <Card>
            <CardBody>
              <AutomationGridChart
                histories={[
                  ...Object.keys(selectedBotIds).filter(
                    (botId) => selectedBotIds[Number(botId)],
                  ),
                  ...Object.keys(selectedVirtualBotIds).filter(
                    (virtualId) => selectedVirtualBotIds[virtualId],
                  ),
                ]
                  .map((botId) => botsHistories[botId] || [])
                  .reduce((acc, item) => [...acc, ...item], [])}
                title={`Grouped Result`}
              />
            </CardBody>
          </Card>

          <div className="flex w-full gap-4">
            <div className="flex w-[370px] shrink-0 flex-col gap-4">
              <Card>
                <CardBody className="flex flex-col gap-4">
                  <span className="text-base font-bold text-neutral-400">
                    Live
                  </span>

                  <Divider />

                  <Virtuoso
                    style={{ height: 673 }}
                    data={plan?.bots || []}
                    itemContent={(_, bot) => (
                      <div className="p-2">
                        <AutomationRow
                          bot={bot}
                          isSelected={!!selectedBotIds[bot.id]}
                          isShowChart={!!showBotChartIds[bot.id]}
                          onChangeSelection={handleBotSelection}
                          onToggleChart={(botId) => {
                            setShowBotChartIds((prev) => ({
                              ...prev,
                              [botId]: !prev[botId],
                            }));
                          }}
                        />
                      </div>
                    )}
                  />
                </CardBody>
              </Card>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <Card>
                <CardBody>
                  <span className="text-xl font-bold text-neutral-400">
                    Live Automation Charts
                  </span>

                  <Divider />

                  <Virtuoso
                    style={{ height: 700 }}
                    data={Object.keys(selectedBotIds).filter(
                      (botId) => selectedBotIds[Number(botId)],
                    )}
                    itemContent={(_, botId) => (
                      <AutomationGridChart
                        histories={botsHistories[botId] || []}
                        title={`Automation ${botId}`}
                      />
                    )}
                  />
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex w-[370px] shrink-0 flex-col gap-4">
              <Card>
                <CardBody className="flex flex-col gap-4">
                  <span className="text-base font-bold text-neutral-400">
                    Virtual
                  </span>

                  <Divider />

                  <div className="flex flex-row items-center justify-end gap-2">
                    <Button size="sm" color="primary" onClick={onOpen}>
                      Create Virtual Automation
                    </Button>

                    <Button
                      size="sm"
                      color="danger"
                      isLoading={createBotsLoading || addBotsLoading}
                      isDisabled={
                        !Object.values(selectedVirtualBotIds).find(
                          (item) => item,
                        ) ||
                        createBotsLoading ||
                        addBotsLoading
                      }
                      onClick={handleSaveVirtualBots}
                    >
                      Save as a real automation
                    </Button>
                  </div>

                  <Virtuoso
                    style={{ height: 625 }}
                    data={virtualBots}
                    itemContent={(_, bot) => (
                      <div className="p-2">
                        <VirtualAutomationRow
                          bot={bot}
                          isSelected={!!selectedVirtualBotIds[bot.virtualId]}
                          onChangeSelection={handleVirtualBotSelection}
                          onEditAutomation={handleEditVirtualBot}
                        />
                      </div>
                    )}
                  />
                </CardBody>
              </Card>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <Card>
                <CardBody>
                  <span className="text-xl font-bold text-neutral-400">
                    Virtual Automation Charts
                  </span>

                  <Divider />

                  <Virtuoso
                    style={{ height: 700 }}
                    data={Object.keys(selectedVirtualBotIds).filter(
                      (virtualId) => selectedVirtualBotIds[virtualId],
                    )}
                    itemContent={(_, virtualId) => (
                      <AutomationGridChart
                        histories={botsHistories[virtualId] || []}
                        title={`Virtual Automation ${virtualId}`}
                      />
                    )}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </>
      )}

      <CreateVirtualAutomationModal
        virtualBot={selectedVirtualBot}
        virtualFollowers={virtualBots.map((bot) => bot.followerAddress)}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        onSave={handleSaveVirtualBot}
      />
    </div>
  );
}
