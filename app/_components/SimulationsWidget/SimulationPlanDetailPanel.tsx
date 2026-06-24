"use client";

import { useCallback, useMemo, useState } from "react";
import { Button, Chip, Spinner, Tab, Tabs, useDisclosure } from "@heroui/react";
import dayjs from "dayjs";

import { SimulationBots } from "./SimulationBots";

import { FaPlus } from "react-icons/fa";
import {
  useGetSimulationPlanById,
  usePlaySimulationPlan,
} from "@/app/_hooks/useSimulations";
import { CreateSimulationBotModal } from "./CreateSimulationBotModal";
import { LabeledChip } from "@/components/chips/LabeledChip";
import { LeaderboardDrawer } from "../LeaderboardWidgets/LeaderboardDrawer";
import { getPriceStr } from "@/utils/price";
import { SimulationOverview } from "./SimulationOverview";

type TabType = "overview" | "bots";

export function SimulationPlanDetailPanel({
  simulationPlanId,
}: {
  simulationPlanId: string;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: isLeaderboardOpen,
    onOpen: onLeaderboardOpen,
    onOpenChange: onLeaderboardOpenChange,
  } = useDisclosure();

  const [selected, setSelected] = useState<TabType>("overview");

  const { playSimulationPlan, loading: playSimulationLoading } =
    usePlaySimulationPlan();
  const { simulationPlan, loading } =
    useGetSimulationPlanById(+simulationPlanId);

  const handlePlaySimulationPlan = useCallback(() => {
    playSimulationPlan({ variables: { id: +simulationPlanId } });
  }, [playSimulationPlan, simulationPlanId]);

  const timelineItems = useMemo(
    () =>
      simulationPlan
        ? [
            {
              label: "Started At",
              value: simulationPlan.startAt
                ? dayjs(simulationPlan.startAt).format("MMM D, H:m:s")
                : null,
            },
            {
              label: "Current",
              value: simulationPlan.cursor
                ? dayjs(simulationPlan.cursor).format("MMM D, H:m:s")
                : null,
            },
            {
              label: "End At",
              value: simulationPlan.endAt
                ? dayjs(simulationPlan.endAt).format("MMM D, H:m:s")
                : null,
            },
          ]
        : [],
    [simulationPlan],
  );

  const { activeAddresses } = useMemo(() => {
    const activeAddresses = new Map<string, boolean>();

    (simulationPlan?.simulationBots || []).forEach((bot) => {
      activeAddresses.set(bot.leaderAddress.toLowerCase(), true);
    });

    return {
      activeAddresses,
    };
  }, [simulationPlan]);

  const canResumt = simulationPlan
    ? dayjs(simulationPlan.cursor).add(1, "day").toDate().getTime() <=
      dayjs(simulationPlan.endAt).toDate().getTime()
    : false;

  if (loading) {
    return <Spinner size="sm" label="Loading Simulation Plan..." />;
  }

  if (!simulationPlan) {
    return <div>There is no simulation</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="border-default-200 flex flex-col gap-4 border-b pb-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-bold text-neutral-200">
              {simulationPlan.title || "No Title"}
            </h1>
            <p className="mt-1 max-w-4xl text-sm text-neutral-400">
              {simulationPlan.description || "No Description"}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Chip variant="flat">
              Simulation Plan {simulationPlan.id || ""}
            </Chip>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {timelineItems.map(
              (item) =>
                item.value !== null && (
                  <div
                    key={item.label}
                    className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2"
                  >
                    <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                      {item.label}
                    </span>
                    <span className="mt-1 text-sm font-semibold text-neutral-300">
                      {item.value}
                    </span>
                  </div>
                ),
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
            {canResumt && (
              <Button
                size="sm"
                color="primary"
                onPress={handlePlaySimulationPlan}
                isLoading={playSimulationLoading}
                isDisabled={playSimulationLoading}
                className="h-9 rounded-lg px-4 text-xs font-semibold"
              >
                Play Simulation
              </Button>
            )}

            <Button
              color="primary"
              variant="flat"
              size="sm"
              startContent={<FaPlus />}
              onPress={onOpen}
              className="h-9 rounded-lg px-4 text-xs font-semibold"
            >
              Add Automation
            </Button>

            <Button
              color="default"
              variant="solid"
              size="sm"
              onPress={onLeaderboardOpen}
              className="h-9 rounded-lg px-4 text-xs font-semibold"
            >
              Open Leaderboard
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-1">
          {simulationPlan.totalLeaderPnl !== 0 ? (
            <LabeledChip
              size="sm"
              variant="flat"
              color="success"
              value={getPriceStr(simulationPlan.totalLeaderPnl)}
              unit="Leader PnL"
            />
          ) : null}

          {simulationPlan.totalFollowerPnl !== 0 ? (
            <LabeledChip
              size="sm"
              variant="flat"
              color="success"
              value={getPriceStr(simulationPlan.totalFollowerPnl)}
              unit="Follower PnL"
            />
          ) : null}
        </div>

        <Tabs
          aria-label="simulation-details"
          selectedKey={selected}
          onSelectionChange={(value) => {
            if (value) {
              setSelected(value as TabType);
            }
          }}
        >
          <Tab key="overview" title="Overview" />
          <Tab key="bots" title="Automations" />
        </Tabs>
      </div>

      {selected === "bots" && (
        <SimulationBots
          simulationBots={simulationPlan.simulationBots}
          cursor={simulationPlan.cursor}
        />
      )}

      {selected === "overview" && (
        <SimulationOverview simulationPlan={simulationPlan} />
      )}

      <CreateSimulationBotModal
        simulationPlan={simulationPlan}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />

      <LeaderboardDrawer
        date={dayjs(simulationPlan.cursor).subtract(1, "day").toDate()}
        isOpen={isLeaderboardOpen}
        onOpenChange={onLeaderboardOpenChange}
        highlighed={activeAddresses}
      />
    </div>
  );
}
