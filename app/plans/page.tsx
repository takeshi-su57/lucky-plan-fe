import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { Plans } from "@/app-components/PlansWidget/Plans";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <Plans />
    </Suspense>
  );
}
