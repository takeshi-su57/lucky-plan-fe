import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { BacktestPanel } from "@/app-components/BacktestWidget/BacktestPanel";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <BacktestPanel />
    </Suspense>
  );
}
