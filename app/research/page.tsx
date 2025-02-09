import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { ResearchPanel } from "@/app-components/ResearchWidgets/ResearchPanel";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <ResearchPanel />
    </Suspense>
  );
}
