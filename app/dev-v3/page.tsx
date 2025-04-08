import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { DevPanelV3 } from "@/app/_components/DevWidget/v3/DevPanelV3";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <DevPanelV3 />
    </Suspense>
  );
}
