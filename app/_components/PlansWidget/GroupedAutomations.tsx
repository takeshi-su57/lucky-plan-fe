"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { Chip, Spinner } from "@heroui/react";
import { Address } from "viem";

import { useGetPerpTradePositions } from "@/app/_hooks/useHistory";
import { useCloseMission } from "@/app/_hooks/useMission";
import { useLiveBot, useStopBot } from "@/app-hooks/useAutomation";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import {
  BotForwardDetails,
  BotStatus,
  MissionStatus,
  Platform,
} from "@/graphql/gql/graphql";
import { PerpEventLogPnlChart } from "../LeaderboardWidgets/PerpEventLogPnlChart/PerpEventLogPnlChart";
import { FollowerAutomationGroup } from "./FollowerAutomationGroup";
import { FollowerBotGroup } from "./plan-automation-types";

export type GroupedAutomationsProps = {
  bots: BotForwardDetails[];
  leaderAddress: string;
  platform: Platform;
};

export const GroupedAutomations = memo(function GroupedAutomations({
  bots,
  leaderAddress,
  platform,
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
        (bot.missions || [])
          .filter(
            (mission) =>
              mission.status !== MissionStatus.Closed &&
              mission.status !== MissionStatus.Ignored,
          )
          .map((mission) => mission),
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

  const { data, loading } = useGetPerpTradePositions(
    leaderAddress,
    platform,
    null,
    null,
    null,
  );

  const followerGroups = useMemo(() => {
    const groups = new Map<string, FollowerBotGroup>();

    bots.forEach((bot) => {
      const key = `${bot.followerAddress}-${bot.followerContract.id}`;
      const group = groups.get(key);

      if (group) {
        group.bots.push(bot);
        return;
      }

      groups.set(key, {
        key,
        followerAddress: bot.followerAddress,
        followerContract: bot.followerContract,
        bots: [bot],
      });
    });

    return Array.from(groups.values());
  }, [bots]);

  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-neutral-700 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <AddressWidget
            address={leaderAddress as Address}
            className="text-sm"
          />

          <span className="text-xs text-neutral-500">Leader on {platform}</span>
          <Chip size="sm" variant="flat">
            {bots.length} bots
          </Chip>
          <Chip size="sm" variant="flat">
            {followerGroups.length} followers
          </Chip>
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

      {loading ? (
        <div className="flex w-full items-center justify-center py-12">
          <Spinner color="warning" size="lg" />
        </div>
      ) : (
        <PerpEventLogPnlChart
          address={leaderAddress as Address}
          platform={platform}
          positionsWithSummary={data || undefined}
          mode="lightweight"
          className="mb-0"
          startedAt={null}
          stoppedAt={null}
          endedAt={null}
        />
      )}

      <div className="flex min-w-0 flex-col gap-4">
        {followerGroups.map((group) => (
          <FollowerAutomationGroup key={group.key} group={group} />
        ))}
      </div>
    </div>
  );
});
