"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Chip, Progress, Spinner, Tab, Tabs } from "@heroui/react";
import dayjs from "dayjs";

import {
  useCancelSimulation,
  useDeleteSimulation,
  useGetSimulation,
  useGetSimulationPlanDetailsBySimulation,
  useGetSimulationPlansBySimulation,
  usePlayAutoSimulation,
} from "@/app/_hooks/useSimulations";
import { LabeledChip } from "@/components/chips/LabeledChip";
import { getPriceStr } from "@/utils/price";
import { SimulationPlanRow } from "./SimulationPlanRow";
import {
  Simulation,
  SimulationStatus,
  UserPermission,
} from "@/graphql/gql/graphql";
import { SimulationAutoOverview } from "./SimulationAutoOverview";
import { useUserJWT } from "@/app/_hooks/useUserJWT";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";

type DetailTab = "overview" | "plans";
type DetailStatTone = "default" | "success" | "danger" | "warning";

function formatPercent(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}

function getEffectiveSlopeBounds(simulation: Simulation) {
  if (simulation.direction === "Reversed") {
    return {
      minSlope: -Math.abs(simulation.slope.max),
      maxSlope: -Math.abs(simulation.slope.min),
    };
  }

  return {
    minSlope: Math.abs(simulation.slope.min),
    maxSlope: Math.abs(simulation.slope.max),
  };
}

const SIMULATION_SYSTEM_CONFIG = {
  minCollateralUsd: 10,
  maxCollateralUsd: 500,
  minRatio: 0,
  maxRatio: 3,
} as const;

function DetailStat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string | number;
  tone?: DetailStatTone;
}) {
  const toneClass =
    tone === "success"
      ? "text-emerald-600"
      : tone === "danger"
        ? "text-rose-600"
        : tone === "warning"
          ? "text-amber-600"
          : "text-neutral-700";

  return (
    <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
      <span className="text-[10px] font-semibold text-neutral-500 uppercase">
        {label}
      </span>
      <span className={`mt-1 text-sm font-semibold ${toneClass}`}>
        {value}
      </span>
    </div>
  );
}

function SimulationConfigResults({ simulation }: { simulation: Simulation }) {
  const effectiveSlopeBounds = getEffectiveSlopeBounds(simulation);
  const configItems = [
    { label: "Direction", value: simulation.direction },
    { label: "Plan Days", value: simulation.days },
    { label: "Gap Days", value: simulation.gapDays },
    { label: "Min Trades", value: simulation.trade.min },
    { label: "Max Trades", value: simulation.trade.max },
    { label: "Min R2", value: simulation.r2.min.toFixed(2) },
    { label: "Max R2", value: simulation.r2.max.toFixed(2) },
    { label: "Min Slope", value: effectiveSlopeBounds.minSlope.toFixed(2) },
    { label: "Max Slope", value: effectiveSlopeBounds.maxSlope.toFixed(2) },
    {
      label: "Base Collateral",
      value: getPriceStr(simulation.standardCollateralUsd),
    },
    {
      label: "Collateral",
      value: `${getPriceStr(
        SIMULATION_SYSTEM_CONFIG.minCollateralUsd,
      )} - ${getPriceStr(
        SIMULATION_SYSTEM_CONFIG.maxCollateralUsd,
      )}`,
    },
    {
      label: "Ratio",
      value: `${SIMULATION_SYSTEM_CONFIG.minRatio}x - ${SIMULATION_SYSTEM_CONFIG.maxRatio}x`,
    },
    { label: "Max Leverage", value: `${simulation.maxLeverage}x` },
    { label: "Score", value: simulation.score.toFixed(2) },
  ];

  const resultItems: Array<{
    label: string;
    value: string | number;
    tone?: DetailStatTone;
  }> = [
    {
      label: "Net PnL",
      value: getPriceStr(simulation.totalNetPnlUsd),
      tone: simulation.totalNetPnlUsd >= 0 ? "success" : "danger",
    },
    {
      label: "Leader PnL",
      value: getPriceStr(simulation.totalLeaderPnl),
      tone: simulation.totalLeaderPnl >= 0 ? "success" : "danger",
    },
    {
      label: "Follower PnL",
      value: getPriceStr(simulation.totalFollowerPnl),
      tone: simulation.totalFollowerPnl >= 0 ? "success" : "danger",
    },
    {
      label: "Max Drawdown",
      value: getPriceStr(simulation.maxDrawdownUsd),
      tone: "warning",
    },
    { label: "Cost", value: getPriceStr(simulation.totalCostUsd) },
    { label: "Trades", value: simulation.tradeCount },
    { label: "Win Rate", value: formatPercent(simulation.winRate) },
    { label: "Profit Factor", value: simulation.profitFactor.toFixed(2) },
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-300">
            Configuration
          </h2>
          <Chip size="sm" variant="flat">
            {simulation.platform}
          </Chip>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {configItems.map((item) => (
            <DetailStat
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-300">Results</h2>
          <Chip size="sm" variant="flat">
            {simulation.completedPlans} / {simulation.totalSimulationPlans}
          </Chip>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2">
          {resultItems.map((item) => (
            <DetailStat
              key={item.label}
              label={item.label}
              value={item.value}
              tone={item.tone}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export function SimulationDetailPanel({
  simulationId,
}: {
  simulationId: string;
}) {
  const [selected, setSelected] = useState<DetailTab>("overview");
  const id = Number(simulationId);
  const router = useRouter();
  const { simulation, loading: simulationLoading } = useGetSimulation(id);
  const { simulationPlans, loading: plansLoading } =
    useGetSimulationPlansBySimulation(id);
  const { simulationPlanDetails, loading: detailsLoading } =
    useGetSimulationPlanDetailsBySimulation(id);
  const { playAutoSimulation, loading: playLoading } = usePlayAutoSimulation();
  const { cancelSimulation, loading: cancelLoading } = useCancelSimulation();
  const { deleteSimulation, loading: deleteLoading } = useDeleteSimulation();
  const { userJwtQuery } = useUserJWT();

  if (simulationLoading) {
    return <Spinner size="sm" label="Loading Simulation..." />;
  }

  if (!simulation) {
    return <div>There is no simulation</div>;
  }

  const canPlay =
    simulation.status === SimulationStatus.Created ||
    simulation.status === SimulationStatus.Paused ||
    simulation.status === SimulationStatus.Failed ||
    simulation.status === SimulationStatus.Running;
  const canCancel = simulation.status === SimulationStatus.Running;
  const isAdmin = userJwtQuery.data?.permission === UserPermission.Admin;

  return (
    <div className="flex flex-col gap-6">
      <div className="border-default-200 flex flex-col gap-4 border-b pb-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-xl font-bold text-neutral-200">
                {simulation.title || "No Title"}
              </h1>
              <Chip variant="flat">Simulation {simulation.id}</Chip>
              <Chip variant="flat" color="secondary">
                {simulation.platform}
              </Chip>
              <Chip
                variant="flat"
                color={
                  simulation.status === SimulationStatus.Completed
                    ? "success"
                    : simulation.status === SimulationStatus.Failed
                      ? "danger"
                      : simulation.status === SimulationStatus.Running
                        ? "primary"
                        : "default"
                }
              >
                {simulation.status}
              </Chip>
            </div>

            <p className="mt-2 max-w-4xl text-sm text-neutral-400">
              {simulation.description || "No Description"}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {canPlay ? (
              <Button
                color="primary"
                variant="flat"
                size="sm"
                isLoading={playLoading}
                isDisabled={playLoading || cancelLoading || deleteLoading}
                onPress={() =>
                  playAutoSimulation({ variables: { id: simulation.id } })
                }
              >
                {simulation.status === SimulationStatus.Running
                  ? "Resume"
                  : "Play Auto"}
              </Button>
            ) : null}

            {canCancel ? (
              <Button
                color="danger"
                variant="flat"
                size="sm"
                isLoading={cancelLoading}
                isDisabled={playLoading || cancelLoading || deleteLoading}
                onPress={() =>
                  cancelSimulation({ variables: { id: simulation.id } })
                }
              >
                Cancel
              </Button>
            ) : null}

            {isAdmin ? (
              <ButtonWithConfirm
                color="danger"
                variant="solid"
                size="sm"
                isLoading={deleteLoading}
                isDisabled={playLoading || cancelLoading || deleteLoading}
                onPress={async () => {
                  await deleteSimulation({
                    variables: { id: simulation.id },
                  });
                  router.push("/simulations");
                }}
              >
                Remove
              </ButtonWithConfirm>
            ) : null}

            <Link href="/simulations">
              <Button color="primary" variant="light" size="sm">
                Back to Simulations
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase">
              Start
            </span>
            <span className="mt-1 text-sm font-semibold text-neutral-300">
              {dayjs(simulation.startAt).format("MMM D, H:mm")}
            </span>
          </div>

          <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase">
              Cursor
            </span>
            <span className="mt-1 text-sm font-semibold text-neutral-300">
              {simulation.cursor
                ? dayjs(simulation.cursor).format("MMM D, H:mm")
                : "Not started"}
            </span>
          </div>

          <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase">
              End
            </span>
            <span className="mt-1 text-sm font-semibold text-neutral-300">
              {dayjs(simulation.endAt).format("MMM D, H:mm")}
            </span>
          </div>

          <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase">
              Plans
            </span>
            <span className="mt-1 text-sm font-semibold text-neutral-300">
              {simulation.completedPlans} / {simulation.totalSimulationPlans}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Progress
            size="sm"
            value={simulation.progressPercent}
            color={
              simulation.status === SimulationStatus.Failed
                ? "danger"
                : "primary"
            }
            aria-label={`Simulation ${simulation.id} progress`}
          />
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
            <span>{simulation.progressMessage || "Waiting to run"}</span>
            <span>{simulation.progressPhase || "created"}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono">
          <LabeledChip
            size="sm"
            variant="flat"
            color={simulation.totalNetPnlUsd >= 0 ? "success" : "danger"}
            value={getPriceStr(simulation.totalNetPnlUsd)}
            unit="Net PnL"
          />
          <LabeledChip
            size="sm"
            variant="flat"
            color="success"
            value={getPriceStr(simulation.totalFollowerPnl)}
            unit="Follower PnL"
          />
          <LabeledChip
            size="sm"
            variant="flat"
            color="warning"
            value={getPriceStr(simulation.totalCostUsd)}
            unit="Cost"
          />
          <LabeledChip
            size="sm"
            variant="flat"
            color="secondary"
            value={simulation.tradeCount}
            unit="Trades"
          />
        </div>

        <SimulationConfigResults simulation={simulation} />
      </div>

      <Tabs
        aria-label="auto-simulation-details"
        selectedKey={selected}
        onSelectionChange={(value) => setSelected(value as DetailTab)}
      >
        <Tab key="overview" title="Overview" />
        <Tab key="plans" title="Plans" />
      </Tabs>

      {selected === "overview" &&
        (detailsLoading ? (
          <div className="flex h-40 w-full items-center justify-center">
            <Spinner size="lg" color="warning" />
          </div>
        ) : (
          <SimulationAutoOverview simulationPlans={simulationPlanDetails} />
        ))}

      {selected === "plans" ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-neutral-200">
              Generated Plans
            </h2>
            <Chip variant="flat" size="sm">
              {simulationPlans.length}
            </Chip>
          </div>

          {plansLoading ? (
            <div className="flex h-40 w-full items-center justify-center">
              <Spinner size="lg" color="warning" />
            </div>
          ) : simulationPlans.length > 0 ? (
            <div className="flex flex-col">
              {simulationPlans.map((plan) => (
                <SimulationPlanRow key={plan.id} simulationPlan={plan} />
              ))}
            </div>
          ) : (
            <div className="border-default-200 bg-content1 rounded-lg border p-6 text-sm text-neutral-400">
              No generated plans yet. Start the auto simulation to create daily
              plans.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
