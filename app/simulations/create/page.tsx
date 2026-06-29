"use client";

import { Suspense } from "react";
import { Spinner } from "@heroui/react";

import { SimulationCreateTabs } from "@/app/_components/SimulationsWidget/SimulationCreateTabs";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <SimulationCreateTabs />
    </Suspense>
  );
}
