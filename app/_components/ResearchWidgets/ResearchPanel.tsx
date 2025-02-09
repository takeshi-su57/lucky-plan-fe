"use client";

import { useMemo, useState } from "react";
import {
  useDisclosure,
  Button,
  CardBody,
  Card,
  Divider,
} from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";
import { BotStatus } from "@/graphql/gql/graphql";

import {
  useBatchCreateBots,
  useCreateBot,
  useGetAllBots,
} from "@/app-hooks/useAutomation";

import { AutomationRow } from "./AutomationRow";
import { PersonalTradeHistory, VirtualBot } from "@/types";
import { getPersonalTradeHistories } from "@/app/_actions/getPersonalTradeHistories";
import { AutomationChart } from "./AutomationChart";
import { transformHistories } from "@/utils/historiesChart";
import { CreateVirtualAutomationModal } from "./CreateVirtualAutomationModal";
import { VirtualAutomationRow } from "./VirtualAutomationRow";

export function ResearchPanel() {
  const { createBots, loading: createBotsLoading } = useBatchCreateBots();

  const bots = useGetAllBots();

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

  const handleSaveVirtualBots = () => {
    if (virtualBots.length > 0) {
      createBots({
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
    }
  };

  const handleBotSelection = async (botId: number, isSelected: boolean) => {
    setSelectedBotIds((prev) => ({
      ...prev,
      [botId]: isSelected,
    }));

    const bot = bots.find((bot) => bot.id === botId);

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

  const liveBots = useMemo(() => {
    return bots.filter((bot) => bot.status === BotStatus.Live);
  }, [bots]);

  return (
    <div className="flex w-full gap-8">
      <div className="flex w-[370px] shrink-0 flex-col gap-4">
        <Card>
          <CardBody>
            <span className="text-base font-bold text-neutral-400">Live</span>

            <Divider />

            <Virtuoso
              style={{ height: 400 }}
              data={liveBots}
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

        <Card>
          <CardBody>
            <span className="text-base font-bold text-neutral-400">
              Virtual
            </span>

            <Divider />

            <Virtuoso
              style={{ height: 400 }}
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

            <div className="flex flex-row items-center justify-end gap-2">
              <Button size="sm" color="primary" onClick={onOpen}>
                Create Virtual Automation
              </Button>

              <Button
                size="sm"
                color="danger"
                isLoading={createBotsLoading}
                isDisabled={createBotsLoading}
                onClick={handleSaveVirtualBots}
              >
                Save as a real automation
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <Card>
          <CardBody>
            <AutomationChart
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

        <Card>
          <CardBody>
            <span className="text-xl font-bold text-neutral-400">
              Live Automation Charts
            </span>

            <Divider />

            <Virtuoso
              style={{ height: 500 }}
              data={Object.keys(selectedBotIds).filter(
                (botId) => selectedBotIds[Number(botId)],
              )}
              itemContent={(_, botId) => (
                <AutomationChart
                  histories={botsHistories[botId] || []}
                  title={`Automation ${botId}`}
                />
              )}
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <span className="text-xl font-bold text-neutral-400">
              Virtual Automation Charts
            </span>

            <Divider />

            <Virtuoso
              style={{ height: 500 }}
              data={Object.keys(selectedVirtualBotIds).filter(
                (virtualId) => selectedVirtualBotIds[virtualId],
              )}
              itemContent={(_, virtualId) => (
                <AutomationChart
                  histories={botsHistories[virtualId] || []}
                  title={`Virtual Automation ${virtualId}`}
                />
              )}
            />
          </CardBody>
        </Card>
      </div>

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
