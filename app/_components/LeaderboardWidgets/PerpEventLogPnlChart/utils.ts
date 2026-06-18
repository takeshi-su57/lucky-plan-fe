import { PerpTradeHistory } from "@/graphql/gql/graphql";

import { TradePairOption } from "./types";

export function getPairKey(pair: string, isLong: boolean) {
  return JSON.stringify({
    pair: pair.toLowerCase(),
    isLong,
  });
}

export function parsePairKey(key: string) {
  return JSON.parse(key) as { pair: string; isLong: boolean };
}

export function getTradePairs(histories: PerpTradeHistory[]) {
  const tradePairsMap = new Map<string, TradePairOption>();

  histories.forEach((item) => {
    const key = getPairKey(item.pair, item.isLong);
    const existing = tradePairsMap.get(key);

    tradePairsMap.set(key, {
      key,
      pair: existing?.pair ?? item.pair.toLowerCase(),
      isLong: existing?.isLong ?? item.isLong,
      count: (existing?.count ?? 0) + 1,
    });
  });

  return Array.from(tradePairsMap.values());
}
