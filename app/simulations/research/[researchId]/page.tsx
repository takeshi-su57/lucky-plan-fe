import { Suspense } from "react";

import { SimulationResearchDetailPanel } from "@/app/_components/SimulationsWidget/SimulationResearchDetailPanel";

export default async function Page({
  params,
}: {
  params: Promise<{ researchId: string }>;
}) {
  const { researchId } = await params;

  return (
    <Suspense
      fallback={
        <div
          aria-live="polite"
          className="flex min-h-24 items-center justify-center text-sm text-neutral-400"
        >
          Loading research...
        </div>
      }
    >
      <SimulationResearchDetailPanel researchId={researchId} />
    </Suspense>
  );
}
