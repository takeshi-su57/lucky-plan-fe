"use client";

import { SimulationCreationPanel } from "./SimulationCreationPanel";
import { useSearchParams } from "next/navigation";

export function SimulationCreateTabs() {
  const searchParams = useSearchParams();
  const rawSourceSimulationId = searchParams.get("sourceSimulationId");
  const sourceSimulationId = rawSourceSimulationId
    ? Number(rawSourceSimulationId)
    : undefined;

  return (
    <div className="flex max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
          Create Simulation
        </h1>
        <p className="text-sm text-neutral-400">
          Define a research rule. Simulations, plan windows, and automations are
          generated from it.
        </p>
        <a
          className="text-primary-400 mt-2 w-fit text-sm font-medium hover:underline"
          href={`/simulations/create/professional${
            Number.isInteger(sourceSimulationId) && sourceSimulationId! > 0
              ? `?sourceSimulationId=${sourceSimulationId}`
              : ""
          }`}
        >
          Professional batch creation →
        </a>
      </div>

      <SimulationCreationPanel
        compactHeading
        sourceSimulationId={
          Number.isInteger(sourceSimulationId) && sourceSimulationId! > 0
            ? sourceSimulationId
            : undefined
        }
      />
    </div>
  );
}
