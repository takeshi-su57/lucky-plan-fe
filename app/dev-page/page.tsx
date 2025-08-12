import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { DevPanel } from "@/app/_components/DevWidget/DevPanel";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <DevPanel />
    </Suspense>
  );
}
