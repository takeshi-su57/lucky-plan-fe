"use client";

import { Tab, Tabs } from "@heroui/react";
import { useState } from "react";

import { SimulationCreationPanel } from "./SimulationCreationPanel";
import { SimulationPlanCreationPanel } from "./SimulationPlanCreationPanel";

type CreateTab = "research" | "manual-plan";

export function SimulationCreateTabs({
  defaultTab = "research",
}: {
  defaultTab?: CreateTab;
}) {
  const [selected, setSelected] = useState<CreateTab>(defaultTab);

  return (
    <div className="flex max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
          Create Simulation
        </h1>
        <p className="text-sm text-neutral-400">
          Create a simulation research set or build a manual plan from one page.
        </p>
      </div>

      <Tabs
        aria-label="simulation-create-tabs"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as CreateTab)}
      >
        <Tab key="research" title="Research" />
        <Tab key="manual-plan" title="Manual Plan" />
      </Tabs>

      {selected === "research" ? (
        <SimulationCreationPanel compactHeading />
      ) : (
        <SimulationPlanCreationPanel compactHeading />
      )}
    </div>
  );
}
