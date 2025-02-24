import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { PlanCreationPanel } from "@/app-components/PlansWidget/PlanCreationPanel";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <PlanCreationPanel />
    </Suspense>
  );
}
