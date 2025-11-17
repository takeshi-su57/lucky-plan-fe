"use client";

import { Suspense } from "react";
import { Spinner } from "@heroui/react";

import { PlanCreationPanel } from "@/app-components/PlansWidget/PlanCreationPanel";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <PlanCreationPanel />
    </Suspense>
  );
}
