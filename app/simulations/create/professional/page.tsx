"use client";

import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import { useSearchParams } from "next/navigation";

import { ProfessionalSimulationResearchCreation } from "@/app/_components/SimulationsWidget/ProfessionalSimulationResearchCreation";

function ProfessionalCreationPage() {
  const searchParams = useSearchParams();
  const rawSourceSimulationId = searchParams.get("sourceSimulationId");
  const sourceSimulationId = rawSourceSimulationId
    ? Number(rawSourceSimulationId)
    : undefined;

  return (
    <ProfessionalSimulationResearchCreation
      sourceSimulationId={
        Number.isInteger(sourceSimulationId) && sourceSimulationId! > 0
          ? sourceSimulationId
          : undefined
      }
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <ProfessionalCreationPage />
    </Suspense>
  );
}
