import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { DevPanelV2 } from "@/app/_components/DevWidget/v2/DevPanelV2";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <DevPanelV2 />
    </Suspense>
  );
}
