"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Tab,
  Tabs,
} from "@nextui-org/react";

import {
  BotStatus,
  MissionStatus,
  BotForwardDetails,
} from "@/graphql/gql/graphql";

import {
  useDeleteBot,
  useLiveBot,
  useStopBot,
} from "@/app-hooks/useAutomation";
import { MissionSummary } from "../MissionWidgets/MissionSummary";
import { MissionDetails } from "../MissionWidgets/MissionDetails";
import { FaCopy } from "react-icons/fa";
import { useCloseMission } from "@/app/_hooks/useMission";
import { AutomationGridChart } from "../PlansWidget/AutomationChart";
import { useGetPersonalTradeHistories } from "@/app/_hooks/useGetPersonalTradeHistories";
import { useGetAllTradePairs } from "@/app/_hooks/useContract";
import { useGetTradeCollaterals } from "@/app/_hooks/useContract";
import { convertTradeActionToHistory } from "@/utils/convertTradeActionToHistory";
import { LabeledChip } from "@/components/chips/LabeledChip";
import { getPriceStr } from "@/utils/price";

type TabType = "chart" | "missions";

export type AutomationDetailsProps = {
  bot: BotForwardDetails;
  isChatFirst: boolean;
};

export function AutomationDetails({
  bot,
  isChatFirst,
}: AutomationDetailsProps) {
  const liveBot = useLiveBot();
  const stopBot = useStopBot();
  const deleteBot = useDeleteBot();

  const closeMission = useCloseMission();

  const [selected, setSelected] = useState<TabType>("chart");
  const [hideClosedMissions, setHideClosedMissions] = useState(true);
  const [showOnlyAutomationHistory, setShowOnlyAutomationHistory] =
    useState(true);

  const { data: leaderHistories } = useGetPersonalTradeHistories(
    bot?.leaderContract?.backendUrl || null,
    bot?.leaderAddress || null,
  );

  const { data: followerHistories } = useGetPersonalTradeHistories(
    bot?.followerContract?.backendUrl || null,
    bot?.followerAddress || null,
  );

  const leaderCollaterals = useGetTradeCollaterals(bot.leaderContractId);
  const leaderPairs = useGetAllTradePairs(bot.leaderContractId);

  const followerCollaterals = useGetTradeCollaterals(bot.followerContractId);
  const followerPairs = useGetAllTradePairs(bot.followerContractId);

  useEffect(() => {
    if (isChatFirst) {
      setSelected("chart");
    } else {
      setSelected("missions");
    }
  }, [isChatFirst]);

  const handleDelete = useCallback(() => {
    deleteBot({
      variables: {
        id: bot.id,
      },
    });
  }, [bot.id, deleteBot]);

  const handleLive = useCallback(() => {
    liveBot({
      variables: {
        id: bot.id,
      },
    });
  }, [bot.id, liveBot]);

  const handleStop = useCallback(() => {
    stopBot({
      variables: {
        id: bot.id,
      },
    });
  }, [bot.id, stopBot]);

  const handleCloseAllMissions = useCallback(async () => {
    const openedMissions = (bot?.missions || []).filter(
      (item) => item.status !== MissionStatus.Closed,
    );

    const promise = openedMissions.map(async (mission) => {
      await closeMission({
        variables: {
          id: mission.id,
          isForce: false,
        },
      });
    });

    await Promise.all(promise);
  }, [bot.missions, closeMission]);

  const leaderPnl = useMemo(() => {
    if (leaderCollaterals.length === 0 || leaderPairs.length === 0) {
      return 0;
    }

    return bot.missions.reduce((acc, mission) => {
      const pnl = mission.tasks.reduce((acc, task) => {
        const history = convertTradeActionToHistory(
          task.action,
          leaderCollaterals,
          leaderPairs,
        );

        return acc + (history?.pnl || 0) * (history?.collateralPriceUsd || 0);
      }, 0);

      return acc + pnl;
    }, 0);
  }, [bot.missions, leaderCollaterals, leaderPairs]);

  const followerPnl = useMemo(() => {
    if (followerCollaterals.length === 0 || followerPairs.length === 0) {
      return 0;
    }

    return bot.missions.reduce((acc, mission) => {
      if (mission.tasks.length === 0) {
        return acc;
      }

      const pnl = mission.tasks.reduce((acc, task) => {
        if (task.followerActions.length === 0) {
          return acc;
        }

        const followerAction =
          task.followerActions[task.followerActions.length - 1];

        if (!followerAction) {
          return acc;
        }

        const history = convertTradeActionToHistory(
          followerAction.action,
          followerCollaterals,
          followerPairs,
        );

        return acc + (history?.pnl || 0) * (history?.collateralPriceUsd || 0);
      }, 0);

      return acc + pnl;
    }, 0);
  }, [bot.missions, followerCollaterals, followerPairs]);

  return (
    <div className="flex flex-col gap-6 border-t border-t-neutral-400/20 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Tabs
            selectedKey={selected}
            onSelectionChange={(value) =>
              value && setSelected(value as TabType)
            }
          >
            <Tab key="chart" title="Chart" />
            <Tab key="missions" title="Missions" />
          </Tabs>

          {selected === "missions" ? (
            <Checkbox
              isSelected={hideClosedMissions}
              onValueChange={setHideClosedMissions}
            >
              Hide Closed Missions
            </Checkbox>
          ) : null}

          {selected === "chart" ? (
            <Checkbox
              isSelected={showOnlyAutomationHistory}
              onValueChange={setShowOnlyAutomationHistory}
            >
              Show Only Automation History
            </Checkbox>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          {leaderPnl !== 0 && (
            <LabeledChip
              label="Leader PnL"
              value={getPriceStr(leaderPnl)}
              unit="$"
              isPrefix={true}
              color={leaderPnl > 0 ? "warning" : "danger"}
            />
          )}
          {followerPnl !== 0 && (
            <LabeledChip
              label="Follower PnL"
              value={getPriceStr(followerPnl)}
              unit="$"
              isPrefix={true}
              color={followerPnl > 0 ? "warning" : "danger"}
            />
          )}
          {bot.status === BotStatus.Created ? (
            <div className="flex items-center gap-2">
              <Button onClick={handleDelete} color="default">
                Delete
              </Button>
              <Button onClick={handleLive} color="danger">
                Live
              </Button>
            </div>
          ) : null}
          {bot.status === BotStatus.Live ? (
            <div className="flex items-center gap-2">
              <Button onClick={handleStop} color="primary">
                Stop
              </Button>
            </div>
          ) : null}
          {bot.status === BotStatus.Stop ? (
            <Button color="danger" onClick={handleCloseAllMissions}>
              Close All Missions
            </Button>
          ) : null}
          {bot.status === BotStatus.Dead ? (
            <Button isIconOnly disabled variant="flat">
              <FaCopy />
            </Button>
          ) : null}
        </div>
      </div>

      {selected === "chart" ? (
        <Card>
          <CardBody>
            <AutomationGridChart
              histories={leaderHistories || []}
              title="Leader Chart"
              range={
                showOnlyAutomationHistory
                  ? {
                      from: bot.startedAt
                        ? new Date(bot.startedAt)
                        : new Date(),
                      to: bot.endedAt ? new Date(bot.endedAt) : new Date(),
                    }
                  : undefined
              }
              mode="show_all_activity"
            />

            <Divider />

            <AutomationGridChart
              histories={followerHistories || []}
              title="Follower Chart"
              range={
                showOnlyAutomationHistory
                  ? {
                      from: bot.startedAt
                        ? new Date(bot.startedAt)
                        : new Date(),
                      to: bot.endedAt ? new Date(bot.endedAt) : new Date(),
                    }
                  : undefined
              }
              mode="show_all_activity"
            />
          </CardBody>
        </Card>
      ) : (
        <Accordion isCompact variant="splitted">
          {bot.missions
            .sort((a, b) => b.id - a.id)
            .filter((mission) =>
              hideClosedMissions
                ? mission.status !== MissionStatus.Closed &&
                  mission.status !== MissionStatus.Ignored
                : true,
            )
            .map((mission) => (
              <AccordionItem
                key={mission.id}
                title={
                  <MissionSummary
                    mission={mission}
                    leaderContractId={bot.leaderContractId}
                    followerContractId={bot.followerContractId}
                  />
                }
              >
                <MissionDetails mission={mission} />
              </AccordionItem>
            ))}
        </Accordion>
      )}
    </div>
  );
}
