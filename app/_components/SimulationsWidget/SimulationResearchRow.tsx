"use client";

import Link from "next/link";
import { Button, Card, CardBody, Chip } from "@heroui/react";
import dayjs from "dayjs";

import {
  SimulationResearch,
  SimulationStatus,
  UserPermission,
} from "@/graphql/gql/graphql";
import { getPriceStr } from "@/utils/price";
import { useDeleteSimulationResearch } from "@/app/_hooks/useSimulations";
import { useUserJWT } from "@/app/_hooks/useUserJWT";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import { AiReportDownloadButton } from "./AiReportDownloadButton";
import { SimulationResearchWorkflowProgress } from "./SimulationResearchWorkflowProgress";

function formatRangePairs(
  ranges: Array<{ min: number; max: number }>,
  formatter: (value: number) => string = (value) => `${value}`,
) {
  if (ranges.length === 0) {
    return "None";
  }

  const preview = ranges
    .slice(0, 2)
    .map((range) => `${formatter(range.min)}-${formatter(range.max)}`);

  return ranges.length > 2
    ? `${preview.join(", ")} +${ranges.length - 2}`
    : preview.join(", ");
}

function flattenRangeGroups(
  groups: Array<{ ranges: Array<{ min: number; max: number }> }>,
) {
  return groups.flatMap((group) => group.ranges);
}

export function SimulationResearchRow({
  simulationResearch,
}: {
  simulationResearch: SimulationResearch;
}) {
  const { deleteSimulationResearch, loading: deleteLoading } =
    useDeleteSimulationResearch();
  const { userJwtQuery } = useUserJWT();
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
                  {simulationResearch.title}
                </span>
                <Chip variant="flat" size="sm">
                  Research {simulationResearch.id}
                </Chip>
                <Chip variant="flat" size="sm" color="secondary">
                  {simulationResearch.platform}
                </Chip>
                <Chip variant="flat" size="sm">
                  {simulationResearch.direction}
                </Chip>
                <Chip variant="flat" size="sm">
                  {simulationResearch.days}d / {simulationResearch.gapDays}g
                </Chip>
              </div>

              <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                {simulationResearch.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <AiReportDownloadButton
                researchId={simulationResearch.id}
                ready={simulationResearch.aiReportReady}
                generating={simulationResearch.aiReportGenerating}
                hasError={Boolean(simulationResearch.aiReportError)}
              />

              <Link href={`/simulations/research/${simulationResearch.id}`}>
                <Button size="sm" color="primary" variant="flat">
                  Open Research
                </Button>
              </Link>

              {isAdmin ? (
                <ButtonWithConfirm
                  size="sm"
                  color="danger"
                  variant="solid"
                  isLoading={deleteLoading}
                  isDisabled={deleteLoading}
                  onPress={() =>
                    deleteSimulationResearch({
                      variables: { id: simulationResearch.id },
                    })
                  }
                >
                  Remove
                </ButtonWithConfirm>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-6">
            <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                Start
              </span>
              <span className="mt-1 text-sm font-semibold text-neutral-300">
                {dayjs(simulationResearch.startAt).format("MMM D, H:mm")}
              </span>
            </div>
            <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                End
              </span>
              <span className="mt-1 text-sm font-semibold text-neutral-300">
                {dayjs(simulationResearch.endAt).format("MMM D, H:mm")}
              </span>
            </div>
            <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                Simulations
              </span>
              <span className="mt-1 text-sm font-semibold text-neutral-300">
                {simulationResearch.totalSimulations}
              </span>
            </div>
            <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                Completed
              </span>
              <span className="mt-1 text-sm font-semibold text-neutral-300">
                {simulationResearch.completedSimulations}
              </span>
            </div>
            <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                Cadence
              </span>
              <span className="mt-1 text-sm font-semibold text-neutral-300">
                {simulationResearch.days}d + {simulationResearch.gapDays}g
              </span>
            </div>
            <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                Trade Ranges
              </span>
              <span className="mt-1 text-sm font-semibold text-neutral-300">
                {formatRangePairs(flattenRangeGroups(simulationResearch.trade))}
              </span>
            </div>
            <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                Collateral Ranges
              </span>
              <span className="mt-1 text-sm font-semibold text-neutral-300">
                {formatRangePairs(
                  flattenRangeGroups(simulationResearch.collateral),
                  getPriceStr,
                )}
              </span>
            </div>
            <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                Leverage Ranges
              </span>
              <span className="mt-1 text-sm font-semibold text-neutral-300">
                {formatRangePairs(
                  flattenRangeGroups(simulationResearch.leverage),
                  (value) => `${value}x`,
                )}
              </span>
            </div>
            <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                Score
              </span>
              <span className="mt-1 text-sm font-semibold text-neutral-300">
                {formatRangePairs(
                  flattenRangeGroups(simulationResearch.score),
                  (value) => value.toFixed(2),
                )}
              </span>
            </div>
          </div>

          <SimulationResearchWorkflowProgress
            researchId={simulationResearch.id}
            totalPlans={simulationResearch.totalPlans}
            evaluatedPlans={simulationResearch.evaluatedPlans}
            materializedPlans={simulationResearch.materializedPlans}
            awaitingEventPlans={simulationResearch.awaitingEventPlans}
            finalizedPlans={simulationResearch.finalizedPlans}
            status={simulationResearch.status as SimulationStatus}
            compact
          />
        </CardBody>
      </Card>
    </div>
  );
}
