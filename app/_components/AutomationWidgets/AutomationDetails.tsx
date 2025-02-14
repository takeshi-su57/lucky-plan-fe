"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Progress,
  Tab,
  Tabs,
} from "@nextui-org/react";

import { BotStatus, MissionStatus } from "@/graphql/gql/graphql";

import {
  useDeleteBot,
  useGetBot,
  useLiveBot,
  useStopBot,
} from "@/app-hooks/useAutomation";
import { MissionSummary } from "../MissionWidgets/MissionSummary";
import { MissionDetails } from "../MissionWidgets/MissionDetails";
import { FaCopy } from "react-icons/fa";
import { useCloseMission } from "@/app/_hooks/useMission";
import { AutomationGridChart } from "../PlansWidget/AutomationChart";
import { useGetPersonalTradeHistories } from "@/app/_hooks/useGetPersonalTradeHistories";

type TabType = "chart" | "missions";

export type AutomationDetailsProps = {
  botId: number;
  isChatFirst: boolean;
  isHideAlertForClosedMissions: boolean;
};

export function AutomationDetails({
  botId,
  isChatFirst,
  isHideAlertForClosedMissions,
}: AutomationDetailsProps) {
  const { bot, loading, error } = useGetBot(botId);

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
        id: botId,
      },
    });
  }, [botId, deleteBot]);

  const handleLive = useCallback(() => {
    liveBot({
      variables: {
        id: botId,
      },
    });
  }, [botId, liveBot]);

  const handleStop = useCallback(() => {
    stopBot({
      variables: {
        id: botId,
      },
    });
  }, [botId, stopBot]);

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
  }, [bot?.missions, closeMission]);

  if (loading) {
    return <Progress isIndeterminate className="w-full flex-1" size="sm" />;
  }

  if (error) {
    return (
      <span className="text-bold text-base text-red-400">
        Oops, There is an issue, Please check your network.
      </span>
    );
  }

  if (!bot) {
    return null;
  }

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

      {selected === "chart" ? (
        <Card>
          <CardBody>
            <AutomationGridChart
              histories={leaderHistories || []}
              title="Leader Chart"
              range={
                showOnlyAutomationHistory
                  ? {
                      from: new Date(bot.startedAt) || new Date(),
                      to: new Date(bot.endedAt) || new Date(),
                    }
                  : undefined
              }
            />

            <Divider />

            <AutomationGridChart
              histories={followerHistories || []}
              title="Follower Chart"
              range={
                showOnlyAutomationHistory
                  ? {
                      from: new Date(bot.startedAt) || new Date(),
                      to: new Date(bot.endedAt) || new Date(),
                    }
                  : undefined
              }
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
                    isHideAlertForClosedMissions={isHideAlertForClosedMissions}
                  />
                }
              >
                <MissionDetails missionId={mission.id} />
              </AccordionItem>
            ))}
        </Accordion>
      )}
    </div>
  );
}
