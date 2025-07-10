import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { ExperPanel } from "../_components/ExpertWidgets/ExperPanel";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <ExperPanel />
    </Suspense>
  );
}
