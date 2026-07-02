"use client";

import Link from "next/link";
import { Button, Chip, Spinner } from "@heroui/react";

import {
  useGetSimulationResearch,
  useGetSimulationsByResearch,
} from "@/app/_hooks/useSimulations";
import { SimulationRow } from "./SimulationRow";
import { getPriceStr } from "@/utils/price";

function RangeListStat({
  label,
  values,
}: {
  label: string;
  values: string[];
}) {
  return (
    <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
      <span className="text-[10px] font-semibold text-neutral-500 uppercase">
        {label}
      </span>
      <span className="mt-1 text-sm font-semibold text-neutral-300">
        {values.length > 0 ? values.join(", ") : "None"}
      </span>
    </div>
  );
}

function formatRangePairs(
  ranges: Array<{ min: number; max: number }>,
  formatter: (value: number) => string = (value) => `${value}`,
) {
  return ranges.map(
    (range) => `${formatter(range.min)}-${formatter(range.max)}`,
  );
}

export function SimulationResearchDetailPanel({
  researchId,
}: {
  researchId: string;
}) {
  const id = Number(researchId);
  const { simulationResearch, loading: researchLoading } =
    useGetSimulationResearch(id);
  const { simulations, loading: simulationsLoading } =
    useGetSimulationsByResearch(id);

  if (researchLoading) {
    return <Spinner size="sm" label="Loading Research..." />;
  }

  if (!simulationResearch) {
    return <div>There is no simulation research</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="border-default-200 flex flex-col gap-4 border-b pb-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-xl font-bold text-neutral-200">
                {simulationResearch.title || "No Title"}
              </h1>
              <Chip variant="flat">Research {simulationResearch.id}</Chip>
              <Chip variant="flat" color="secondary">
                {simulationResearch.platform}
              </Chip>
              <Chip variant="flat">{simulationResearch.direction}</Chip>
              <Chip variant="flat">
                {simulationResearch.days}d / {simulationResearch.gapDays}g
              </Chip>
            </div>

            <p className="mt-2 max-w-4xl text-sm text-neutral-400">
              {simulationResearch.description || "No Description"}
            </p>
          </div>

          <Link href="/simulations">
            <Button color="primary" variant="light" size="sm">
              Back to Researches
            </Button>
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <RangeListStat
            label="Trade Ranges"
            values={formatRangePairs(simulationResearch.trade)}
          />
          <RangeListStat
            label="R2 Ranges"
            values={formatRangePairs(simulationResearch.r2)}
          />
          <RangeListStat
            label="Slope Ranges"
            values={formatRangePairs(simulationResearch.slope)}
          />
          <RangeListStat
            label="Plan Cadence"
            values={[
              `${simulationResearch.days} days`,
              `${simulationResearch.gapDays} gap days`,
            ]}
          />
          <RangeListStat
            label="Leverage Ranges"
            values={formatRangePairs(
              simulationResearch.leverage,
              (value) => `${value}x`,
            )}
          />
          <RangeListStat
            label="Collateral Ranges"
            values={formatRangePairs(simulationResearch.collateral, getPriceStr)}
          />
          <RangeListStat
            label="Score"
            values={formatRangePairs(simulationResearch.score, (value) =>
              value.toFixed(2),
            )}
          />
          <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase">
              Simulations
            </span>
            <span className="mt-1 text-sm font-semibold text-neutral-300">
              {simulationResearch.completedSimulations} /{" "}
              {simulationResearch.totalSimulations}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-neutral-200">
            Generated Simulations
          </h2>
          <Chip variant="flat" size="sm">
            {simulationResearch.totalSimulations}
          </Chip>
        </div>

        {simulationsLoading ? (
          <div className="flex h-40 w-full items-center justify-center">
            <Spinner size="lg" color="warning" />
          </div>
        ) : simulations.length > 0 ? (
          <div className="flex flex-col">
            {simulations.map((simulation) => (
              <SimulationRow key={simulation.id} simulation={simulation} />
            ))}
          </div>
        ) : (
          <div className="border-default-200 bg-content1 rounded-lg border p-6 text-sm text-neutral-400">
            No simulations were generated for this research yet.
          </div>
        )}
      </div>
    </div>
  );
}
