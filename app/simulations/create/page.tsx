"use client";

import { Suspense } from "react";
import { Spinner } from "@heroui/react";

import { SimulationPlanCreationPanel } from "@/app/_components/SimulationsWidget/SimulationPlanCreationPanel";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <SimulationPlanCreationPanel />
    </Suspense>
  );
}
