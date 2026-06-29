"use client";

import Link from "next/link";
import { Button, Chip, Spinner } from "@heroui/react";

import {
  useGetSimulationResearch,
  useGetSimulationsByResearch,
} from "@/app/_hooks/useSimulations";
import { SimulationRow } from "./SimulationRow";

function RangeStat({
  label,
  min,
  max,
  gap,
}: {
  label: string;
  min: number;
  max: number;
  gap: number;
}) {
  return (
    <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
      <span className="text-[10px] font-semibold text-neutral-500 uppercase">
        {label}
      </span>
      <span className="mt-1 text-sm font-semibold text-neutral-300">
        {min} - {max} / gap {gap}
      </span>
    </div>
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
          <RangeStat
            label="Min Trades"
            min={simulationResearch.minTradesRange.min}
            max={simulationResearch.minTradesRange.max}
            gap={simulationResearch.minTradesRange.gap}
          />
          <RangeStat
            label="Max Trades"
            min={simulationResearch.maxTradesRange.min}
            max={simulationResearch.maxTradesRange.max}
            gap={simulationResearch.maxTradesRange.gap}
          />
          <RangeStat
            label="Min R2"
            min={simulationResearch.minR2Range.min}
            max={simulationResearch.minR2Range.max}
            gap={simulationResearch.minR2Range.gap}
          />
          <RangeStat
            label="Max R2"
            min={simulationResearch.maxR2Range.min}
            max={simulationResearch.maxR2Range.max}
            gap={simulationResearch.maxR2Range.gap}
          />
          <RangeStat
            label="Min Slope"
            min={simulationResearch.minSlopeRange.min}
            max={simulationResearch.minSlopeRange.max}
            gap={simulationResearch.minSlopeRange.gap}
          />
          <RangeStat
            label="Max Slope"
            min={simulationResearch.maxSlopeRange.min}
            max={simulationResearch.maxSlopeRange.max}
            gap={simulationResearch.maxSlopeRange.gap}
          />
          <RangeStat
            label="Max Leverage"
            min={simulationResearch.maxLeverageRange.min}
            max={simulationResearch.maxLeverageRange.max}
            gap={simulationResearch.maxLeverageRange.gap}
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
