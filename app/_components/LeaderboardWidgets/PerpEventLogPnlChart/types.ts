import { Ref } from "react";
import { Address } from "viem";

import { PerpTradeHistory, Platform } from "@/graphql/gql/graphql";

export type PerpEventLogPnlChartHandle = {
  getSelectedPairs: () => { pair: string; isLong: boolean }[];
};

export type PerpEventLogPnlChartProps = {
  address: Address;
  platform: Platform;
  perpTradeHistories: PerpTradeHistory[];
  range?: {
    from?: Date;
    to?: Date;
  };
  cols?: 1 | 2 | 4;
  mode?: "lightweight" | "expert";
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
