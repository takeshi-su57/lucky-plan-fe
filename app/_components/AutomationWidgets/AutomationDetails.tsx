"use client";

import { useCallback, useMemo } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  CardBody,
  Card,
} from "@heroui/react";
import { Address } from "viem";

import {
  BotStatus,
  MissionStatus,
  BotForwardDetails,
  Platform,
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

import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import { ContractPnl } from "../MissionWidgets/ContractPnl";
import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { EditStrategyModal } from "./EditAutomationModal";
import { EventLogsWidget } from "../LeaderboardWidgets/EventLogsWidget";
import { twMerge } from "tailwind-merge";

export type AutomationDetailsProps = {
  bot: BotForwardDetails;
};

export function AutomationDetails({ bot }: AutomationDetailsProps) {
  const liveBot = useLiveBot();
  const stopBot = useStopBot();
  const deleteBot = useDeleteBot();

  const closeMission = useCloseMission();

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

  const { openedMissions, closedMissions } = useMemo(() => {
    const sortedMissions = bot.missions.sort((a, b) => b.id - a.id);
    const openedMissions = sortedMissions.filter(
      (mission) =>
        mission.status !== MissionStatus.Closed &&
        mission.status !== MissionStatus.Ignored,
    );
    const closedMissions = sortedMissions.filter(
      (mission) =>
        mission.status === MissionStatus.Closed ||
        mission.status === MissionStatus.Ignored,
    );
    return { openedMissions, closedMissions };
  }, [bot.missions]);

  return (
    <div className="flex flex-col gap-6 border-t border-t-neutral-400/20 py-6">
      <div className="flex items-center gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-neutral-400/80">Leader:</span>
          <AddressWidget
            address={bot.leaderAddress as Address}
            className="text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-neutral-400/80">Follower:</span>
          <AddressWidget
            address={bot.followerAddress as Address}
            className="text-sm"
          />
        </div>

        <div className="flex flex-col gap-2 font-mono">
          <span className="text-xs">
            Max Collateral:
            {`${Number(bot.strategy.maxCollateral)} USDC`}
          </span>
          <span className="text-xs">
            Ratio:
            {`${bot.strategy.ratio} x`}
          </span>
        </div>

        {bot.status === BotStatus.Dead ? (
          <div className="flex flex-col gap-2 font-mono">
            {bot.startedAt ? (
              <span className="text-xs">
                Started:
                {`${new Date(bot.startedAt).toLocaleString()}`}
              </span>
            ) : (
              <span className="text-xs">
                <span className="text-neutral-400">Not Started</span>
              </span>
            )}

            {bot.endedAt ? (
              <span className="text-xs">
                Ended:
                {`${new Date(bot.endedAt).toLocaleString()}`}
              </span>
            ) : (
              <span className="text-xs">
                <span className="text-neutral-400">Not Ended</span>
              </span>
            )}
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {bot.leaderContract.platform === Platform.Gns ? (
            <ContractPnl
              label="Leader"
              contractId={bot.leaderContractId}
              finished={false}
              finishedMissionActions={bot.missions
                .filter(
                  (mission) =>
                    mission.status === MissionStatus.Closed &&
                    !!mission.achievePositionKey,
                )
                .map((mission) => mission.tasks.map((task) => task.action))}
              openedMissionActions={bot.missions
                .filter(
                  (mission) =>
                    mission.status !== MissionStatus.Closed &&
                    mission.status !== MissionStatus.Ignored &&
                    !mission.achievePositionKey,
                )
                .map((mission) => mission.tasks.map((task) => task.action))}
            />
          ) : null}

          <ContractPnl
            label="Follower"
            contractId={bot.followerContractId}
            finished={false}
            finishedMissionActions={bot.missions
              .filter(
                (mission) =>
                  mission.status === MissionStatus.Closed &&
                  !!mission.achievePositionKey,
              )
              .map((mission) =>
                mission.tasks
                  .map((task) => {
                    if (task.followerActions.length === 0) {
                      return null;
                    }

                    const followerAction =
                      task.followerActions[task.followerActions.length - 1];

                    if (!followerAction) {
                      return null;
                    }

                    return followerAction.action;
                  })
                  .filter((action) => action !== null),
              )}
            openedMissionActions={bot.missions
              .filter(
                (mission) =>
                  mission.status !== MissionStatus.Closed &&
                  mission.status !== MissionStatus.Ignored &&
                  !mission.achievePositionKey,
              )
              .map((mission) =>
                mission.tasks
                  .map((task) => {
                    if (task.followerActions.length === 0) {
                      return null;
                    }

                    const followerAction =
                      task.followerActions[task.followerActions.length - 1];

                    if (!followerAction) {
                      return null;
                    }

                    return followerAction.action;
                  })
                  .filter((action) => action !== null),
              )}
          />

          {bot.status !== BotStatus.Dead ? (
            <EditStrategyModal
              strategy={bot.strategy}
              chainId={bot.followerContract.chainId}
            />
          ) : null}

          {bot.status === BotStatus.Created ? (
            <div className="flex items-center gap-2">
              <ButtonWithConfirm onPress={handleDelete} color="default">
                Delete
              </ButtonWithConfirm>
              <ButtonWithConfirm onPress={handleLive} color="danger">
                Live
              </ButtonWithConfirm>
            </div>
          ) : null}
          {bot.status === BotStatus.Live ? (
            <div className="flex items-center gap-2">
              <ButtonWithConfirm onPress={handleStop} color="primary">
                Stop
              </ButtonWithConfirm>
            </div>
          ) : null}
          {bot.status === BotStatus.Stop ? (
            <ButtonWithConfirm color="danger" onPress={handleCloseAllMissions}>
              Close All Missions
            </ButtonWithConfirm>
          ) : null}
          {bot.status === BotStatus.Dead ? (
            <Button isIconOnly disabled variant="flat">
              <FaCopy />
            </Button>
          ) : null}
        </div>
      </div>

      <Card className={twMerge("mb-4 w-full shrink-0")} isBlurred>
        <CardBody>
          <span className="text-lg font-bold leading-loose text-neutral-400">
            Opened Missions
          </span>

          {openedMissions.length === 0 ? (
            <span className="text-sm text-neutral-400/80">
              No opened missions
            </span>
          ) : null}

          <Accordion isCompact variant="splitted">
            {openedMissions.map((mission) => (
              <AccordionItem
                key={mission.id}
                title={
                  <MissionSummary
                    mission={mission}
                    leaderContract={bot.leaderContract}
                    followerContractId={bot.followerContractId}
                  />
                }
              >
                <MissionDetails
                  mission={mission}
                  followerContractId={bot.followerContractId}
                />
              </AccordionItem>
            ))}
          </Accordion>
        </CardBody>
      </Card>

      <Card className={twMerge("mb-4 w-full shrink-0")} isBlurred>
        <CardBody>
          <span className="text-lg font-bold leading-loose text-neutral-400">
            Closed Missions
          </span>

          {closedMissions.length === 0 ? (
            <span className="text-sm text-neutral-400/80">
              No closed missions
            </span>
          ) : null}

          <Accordion isCompact variant="splitted">
            {closedMissions.map((mission) => (
              <AccordionItem
                key={mission.id}
                title={
                  <MissionSummary
                    mission={mission}
                    leaderContract={bot.leaderContract}
                    followerContractId={bot.followerContractId}
                  />
                }
              >
                <MissionDetails
                  mission={mission}
                  followerContractId={bot.followerContractId}
                />
              </AccordionItem>
            ))}
          </Accordion>
        </CardBody>
      </Card>

      <EventLogsWidget
        address={bot.leaderAddress as Address}
        platform={bot.leaderContract.platform}
        cols={1}
      />
    </div>
  );
}
