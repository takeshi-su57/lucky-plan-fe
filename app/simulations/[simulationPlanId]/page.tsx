"use server";

import { SimulationPlanDetailPanel } from "@/app/_components/SimulationsWidget/SimulationPlanDetailPanel";

export default async function Page({
  params,
}: {
  params: Promise<{ simulationPlanId: string }>;
}) {
  const simulationPlanId = (await params).simulationPlanId;

  if (!simulationPlanId) {
    return null;
  }

  return <SimulationPlanDetailPanel simulationPlanId={simulationPlanId} />;
}
