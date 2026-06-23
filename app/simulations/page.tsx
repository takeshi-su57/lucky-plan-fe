"use client";

import { Suspense } from "react";
import { Spinner } from "@heroui/react";

import { Simulations } from "@/app-components/SimulationsWidget/Simulations";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <Simulations />
    </Suspense>
  );
}
