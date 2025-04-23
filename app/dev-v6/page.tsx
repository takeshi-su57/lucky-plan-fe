import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { DevPanelV6 } from "@/app/_components/DevWidget/v6/DevPanelV6";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <DevPanelV6 />
    </Suspense>
  );
}
