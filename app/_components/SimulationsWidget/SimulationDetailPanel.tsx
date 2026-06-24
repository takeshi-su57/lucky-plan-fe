"use client";

import Link from "next/link";
import { Button, Chip, Progress, Spinner } from "@heroui/react";
import dayjs from "dayjs";

import {
  useCancelSimulation,
  useGetSimulation,
  useGetSimulationPlansBySimulation,
  usePlayAutoSimulation,
} from "@/app/_hooks/useSimulations";
import { LabeledChip } from "@/components/chips/LabeledChip";
import { getPriceStr } from "@/utils/price";
import { SimulationPlanRow } from "./SimulationPlanRow";
import { SimulationStatus } from "@/graphql/gql/graphql";

export function SimulationDetailPanel({
  simulationId,
}: {
  simulationId: string;
}) {
  const id = Number(simulationId);
  const { simulation, loading: simulationLoading } = useGetSimulation(id);
  const { simulationPlans, loading: plansLoading } =
    useGetSimulationPlansBySimulation(id);
  const { playAutoSimulation, loading: playLoading } = usePlayAutoSimulation();
  const { cancelSimulation, loading: cancelLoading } = useCancelSimulation();

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
                isDisabled={playLoading || cancelLoading}
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
                isDisabled={playLoading || cancelLoading}
                onPress={() =>
                  cancelSimulation({ variables: { id: simulation.id } })
                }
              >
                Cancel
              </Button>
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
      </div>

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
    </div>
  );
}
