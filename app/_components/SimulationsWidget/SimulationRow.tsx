"use client";

import Link from "next/link";
import { Button, Card, CardBody, Chip, Progress } from "@heroui/react";
import dayjs from "dayjs";

import { Simulation, SimulationStatus } from "@/graphql/gql/graphql";
import { UserPermission } from "@/graphql/gql/graphql";
import { LabeledChip } from "@/components/chips/LabeledChip";
import { getPriceStr } from "@/utils/price";
import {
  useCancelSimulation,
  useDeleteSimulation,
  usePlayAutoSimulation,
} from "@/app/_hooks/useSimulations";
import { useUserJWT } from "@/app/_hooks/useUserJWT";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";

export type SimulationRowProps = {
  simulation: Simulation;
};

const STATUS_COLOR: Partial<
  Record<
    SimulationStatus,
    "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  >
> = {
  [SimulationStatus.Created]: "default",
  [SimulationStatus.Running]: "primary",
  [SimulationStatus.Paused]: "warning",
  [SimulationStatus.Completed]: "success",
  [SimulationStatus.Failed]: "danger",
  [SimulationStatus.Cancelled]: "danger",
};

function formatRange(range: { min: number; max: number }) {
  return `${range.min}-${range.max}`;
}

export function SimulationRow({ simulation }: SimulationRowProps) {
  const { playAutoSimulation, loading: playLoading } = usePlayAutoSimulation();
  const { cancelSimulation, loading: cancelLoading } = useCancelSimulation();
  const { deleteSimulation, loading: deleteLoading } = useDeleteSimulation();
  const { userJwtQuery } = useUserJWT();

  const canPlay =
    simulation.status === SimulationStatus.Created ||
    simulation.status === SimulationStatus.Paused ||
    simulation.status === SimulationStatus.Failed ||
    simulation.status === SimulationStatus.Running;
  const canCancel = simulation.status === SimulationStatus.Running;
  const isAdmin = userJwtQuery.data?.permission === UserPermission.Admin;

  return (
    <div className="pb-3 select-none">
      <Card
        shadow="none"
        className="border-default-200 bg-content1 mb-4 w-full shrink-0 rounded-lg border"
      >
        <CardBody className="gap-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate text-sm font-semibold text-neutral-300">
                  {simulation.title}
                </span>
                <Chip variant="flat" size="sm">
                  Simulation {simulation.id}
                </Chip>
                <Chip
                  variant="flat"
                  size="sm"
                  color={STATUS_COLOR[simulation.status] || "default"}
                >
                  {simulation.status}
                </Chip>
                <Chip variant="flat" size="sm" color="secondary">
                  {simulation.platform}
                </Chip>
                <Chip variant="flat" size="sm">
                  {simulation.direction}
                </Chip>
                <Chip variant="flat" size="sm">
                  {simulation.days}d / {simulation.gapDays}g
                </Chip>
              </div>

              <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                {simulation.description}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2 font-mono">
                <LabeledChip
                  size="sm"
                  variant="flat"
                  value={formatRange(simulation.trade)}
                  unit="Trades"
                />
                <LabeledChip
                  size="sm"
                  variant="flat"
                  value={formatRange(simulation.r2)}
                  unit="R2"
                />
                <LabeledChip
                  size="sm"
                  variant="flat"
                  value={formatRange(simulation.slope)}
                  unit="Slope"
                />
                <LabeledChip
                  size="sm"
                  variant="flat"
                  value={`${getPriceStr(simulation.collateral.min)}-${getPriceStr(
                    simulation.collateral.max,
                  )}`}
                  unit="Collateral"
                />
                <LabeledChip
                  size="sm"
                  variant="flat"
                  value={`${formatRange(simulation.leverage)}x`}
                  unit="Leverage"
                />
                <LabeledChip
                  size="sm"
                  variant="flat"
                  value={formatRange(simulation.score)}
                  unit="Score"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/simulations/auto/${simulation.id}`}>
                <Button size="sm" color="primary" variant="light">
                  Show Plans
                </Button>
              </Link>

              {canPlay ? (
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
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
                  size="sm"
                  color="danger"
                  variant="flat"
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
                  size="sm"
                  color="danger"
                  variant="solid"
                  isLoading={deleteLoading}
                  isDisabled={playLoading || cancelLoading || deleteLoading}
                  onPress={() =>
                    deleteSimulation({ variables: { id: simulation.id } })
                  }
                >
                  Remove
                </ButtonWithConfirm>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
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

            <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                Cadence
              </span>
              <span className="mt-1 text-sm font-semibold text-neutral-300">
                {simulation.days}d + {simulation.gapDays}g
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
            <LabeledChip
              size="sm"
              variant="flat"
              color="primary"
              value={`${simulation.winRate.toFixed(2)}%`}
              unit="Win Rate"
            />
            <LabeledChip
              size="sm"
              variant="flat"
              color="primary"
              value={simulation.profitFactor.toFixed(2)}
              unit="Profit Factor"
            />
          </div>

          {simulation.error ? (
            <div className="border-danger-500/30 bg-danger-500/10 text-danger-200 rounded-lg border px-3 py-2 text-xs">
              {simulation.error}
            </div>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}
