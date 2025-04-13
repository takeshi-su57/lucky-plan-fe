import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { DevPanelV4 } from "@/app/_components/DevWidget/v4/DevPanelV4";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <DevPanelV4 />
    </Suspense>
  );
}
