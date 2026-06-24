"use server";

import { SimulationDetailPanel } from "@/app/_components/SimulationsWidget/SimulationDetailPanel";

export default async function Page({
  params,
}: {
  params: Promise<{ simulationId: string }>;
}) {
  const simulationId = (await params).simulationId;

  if (!simulationId) {
    return null;
  }

  return <SimulationDetailPanel simulationId={simulationId} />;
}
