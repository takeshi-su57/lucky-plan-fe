import { Ref } from "react";
import { Address } from "viem";

import { PerpTradePositionsWithSummary, Platform } from "@/graphql/gql/graphql";

export type PerpEventLogPnlChartHandle = {
  getSelectedPairs: () => { pair: string; isLong: boolean }[];
};

export type PerpEventLogPnlChartProps = {
  address: Address;
  platform: Platform;
  positionsWithSummary?: PerpTradePositionsWithSummary;
  cols?: 1 | 2 | 4;
  mode?: "lightweight" | "expert";
  className?: string;
  startedAt: Date | null;
  stoppedAt: Date | null;
  endedAt: Date | null;
};

export type PerpEventLogPnlChartWithRefProps = PerpEventLogPnlChartProps & {
  ref?: Ref<PerpEventLogPnlChartHandle>;
};

export type TradePairOption = {
  key: string;
  pair: string;
  isLong: boolean;
  count: number;
};
