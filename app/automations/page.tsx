import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { Automations } from "@/app-components/AutomationWidgets/Automations";
export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <Automations />
    </Suspense>
  );
}
