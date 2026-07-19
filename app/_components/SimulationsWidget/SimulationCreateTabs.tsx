"use client";

import { SimulationCreationPanel } from "./SimulationCreationPanel";
export function SimulationCreateTabs() {

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
      </div>

      <SimulationCreationPanel compactHeading />
    </div>
  );
}
