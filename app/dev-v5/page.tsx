import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { DevPanelV5 } from "@/app/_components/DevWidget/v5/DevPanelV5";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <DevPanelV5 />
    </Suspense>
  );
}
