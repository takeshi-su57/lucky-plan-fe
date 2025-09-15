import { MarketConfig, Token } from '../types';

import { gmxMarketConfigs } from './marketConfigs';
import { gmxTokenConfigs } from './tokenConfigs';

const marketMap: Record<string, MarketConfig> = {};

for (const [chainId, markets] of Object.entries(gmxMarketConfigs)) {
  for (const [market, marketConfig] of Object.entries(markets)) {
    marketMap[`${chainId}-${market}`.toLowerCase()] = marketConfig;
  }
}

export function getMarketInfo(
  chainId: number,
  market: string,
): MarketConfig | undefined {
  return marketMap[`${chainId}-${market}`.toLowerCase()];
}

export function getTokenInfo(
  chainId: number,
  token: string,
): Token | undefined {
  return gmxTokenConfigs[chainId][token.toLowerCase()];
}
