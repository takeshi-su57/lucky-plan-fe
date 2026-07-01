"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Chip, Spinner, Tab, Tabs, useDisclosure } from "@heroui/react";
import dayjs from "dayjs";

import { SimulationBots } from "./SimulationBots";

import { FaPlus } from "react-icons/fa";
import {
  useDeleteSimulationPlan,
  useGetSimulationPlanById,
  usePlaySimulationPlan,
} from "@/app/_hooks/useSimulations";
import { CreateSimulationBotModal } from "./CreateSimulationBotModal";
import { LabeledChip } from "@/components/chips/LabeledChip";
import { LeaderboardDrawer } from "../LeaderboardWidgets/LeaderboardDrawer";
import { getPriceStr } from "@/utils/price";
import { SimulationOverview } from "./SimulationOverview";
import { useUserJWT } from "@/app/_hooks/useUserJWT";
import { UserPermission } from "@/graphql/gql/graphql";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";

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
  const router = useRouter();

  const { playSimulationPlan, loading: playSimulationLoading } =
    usePlaySimulationPlan();
  const { deleteSimulationPlan, loading: deleteSimulationPlanLoading } =
    useDeleteSimulationPlan();
  const { simulationPlan, loading } =
    useGetSimulationPlanById(+simulationPlanId);
  const { userJwtQuery } = useUserJWT();

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
  const cacheSummary = useMemo(() => {
    const summary = {
      ready: 0,
      rebuilding: 0,
      queued: 0,
      failed: 0,
      pending: 0,
    };

    for (const bot of simulationPlan?.simulationBots || []) {
      if (bot.cacheState?.lastError) {
        summary.failed += 1;
      } else if (bot.cacheState?.rebuilding) {
        summary.rebuilding += 1;
      } else if (bot.cacheState?.rebuildRequested) {
        summary.queued += 1;
      } else if (bot.cacheState?.completed) {
        summary.ready += 1;
      } else {
        summary.pending += 1;
      }
    }

    return summary;
  }, [simulationPlan]);

  if (loading) {
    return <Spinner size="sm" label="Loading Simulation Plan..." />;
  }

  if (!simulationPlan) {
    return <div>There is no simulation</div>;
  }

  const backHref = simulationPlan.simulationId
    ? `/simulations/auto/${simulationPlan.simulationId}`
    : "/simulations";
  const backLabel = simulationPlan.simulationId
    ? "Back to Auto Simulation"
    : "Back to Simulations";
  const isAdmin = userJwtQuery.data?.permission === UserPermission.Admin;

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
            <Link href={backHref}>
              <Button color="primary" variant="light" size="sm">
                {backLabel}
              </Button>
            </Link>
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
                isDisabled={
                  playSimulationLoading || deleteSimulationPlanLoading
                }
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

            {isAdmin ? (
              <ButtonWithConfirm
                color="danger"
                variant="solid"
                size="sm"
                isLoading={deleteSimulationPlanLoading}
                isDisabled={
                  playSimulationLoading || deleteSimulationPlanLoading
                }
                onPress={async () => {
                  await deleteSimulationPlan({
                    variables: { id: simulationPlan.id },
                  });
                  router.push(backHref);
                }}
                className="h-9 rounded-lg px-4 text-xs font-semibold"
              >
                Remove
              </ButtonWithConfirm>
            ) : null}
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

          <LabeledChip
            size="sm"
            variant="flat"
            color="success"
            value={cacheSummary.ready}
            unit="Cache Ready"
          />

          {cacheSummary.rebuilding > 0 ? (
            <LabeledChip
              size="sm"
              variant="flat"
              color="warning"
              value={cacheSummary.rebuilding}
              unit="Rebuilding"
            />
          ) : null}

          {cacheSummary.queued > 0 ? (
            <LabeledChip
              size="sm"
              variant="flat"
              color="secondary"
              value={cacheSummary.queued}
              unit="Queued"
            />
          ) : null}

          {cacheSummary.failed > 0 ? (
            <LabeledChip
              size="sm"
              variant="flat"
              color="danger"
              value={cacheSummary.failed}
              unit="Cache Errors"
            />
          ) : null}
        </div>

        {(cacheSummary.rebuilding > 0 ||
          cacheSummary.queued > 0 ||
          cacheSummary.failed > 0 ||
          cacheSummary.pending > 0) && (
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm text-amber-800">
            Cached bot results are still syncing for this plan. Some overview
            charts or position details may be partial until rebuilding finishes.
          </div>
        )}

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
