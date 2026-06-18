"use client";

import { PerpEventLogPnlChartExpert } from "./PerpEventLogPnlChartExpert";
import { PerpEventLogPnlChartLightweight } from "./PerpEventLogPnlChartLightweight";
import { PerpEventLogPnlChartWithRefProps } from "./types";

export type {
  PerpEventLogPnlChartHandle,
  PerpEventLogPnlChartProps,
} from "./types";
export { getPairKey, parsePairKey } from "./utils";

export function PerpEventLogPnlChart({
  mode = "lightweight",
  ref,
  ...props
}: PerpEventLogPnlChartWithRefProps) {
  if (mode === "expert") {
    return <PerpEventLogPnlChartExpert ref={ref} {...props} />;
  }

  return <PerpEventLogPnlChartLightweight {...props} />;
}
