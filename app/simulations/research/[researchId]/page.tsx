import { Suspense } from "react";
import { Spinner } from "@heroui/react";

import { SimulationResearchDetailPanel } from "@/app/_components/SimulationsWidget/SimulationResearchDetailPanel";

export default async function Page({
  params,
}: {
  params: Promise<{ researchId: string }>;
}) {
  const { researchId } = await params;

  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <SimulationResearchDetailPanel researchId={researchId} />
    </Suspense>
  );
}
