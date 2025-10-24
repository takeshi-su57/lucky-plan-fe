import { Pair } from '../types';
import { pairConfigs } from './pairsConfig';

export const pairs: Pair[] = pairConfigs;
export const pairIndexConfigsMap: Record<string, Pair> = {};

pairConfigs.forEach((pair) => {
  pairIndexConfigsMap[`${pair.from}/${pair.to}`.toLowerCase()] = {
    ...pair,
  };
});

export function getPair(pairIndex: number): Pair | null {
  return pairs[pairIndex] || null;
}

export function getPairByName(pairName: string): Pair | null {
  return pairIndexConfigsMap[pairName.toLowerCase()] || null;
}

export function getPairIndex(pairName: string): number {
  const pair = pairIndexConfigsMap[pairName.toLowerCase()];

  return pair ? pair.pairIndex : -1;
}

export function getPairName(pairIndex: number): string | null {
  const pair = pairs[pairIndex];

  return pair ? `${pair.from}/${pair.to}`.toLowerCase() : null;
}

export const contractAddresses = {
  TradingCallback: '0x0C16ff40065Cc3Ab4bc55B60E447504AFB9C7970',
  TradingStorage: '0x8a311D7048c35985aa31C131B9A13e03a5f7422d',
  PairStorage: '0x5db3772136e5557EFE028Db05EE95C84D76faEC4',
  PairInfos: '0x81F22d0Cc22977c91bEfE648C9fddf1f2bd977e5',
  PriceAggregator: '0x64e2625621970F8cfA17B294670d61CB883dA511',
  USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  Trading: '0x44914408af82bC9983bbb330e3578E1105e11d4e',
  Multicall: '0x7A829c5C97A2Bf8BeFB4b01d96A282E4763848d8',
  Referral: '0x1A110bBA13A1f16cCa4b79758BD39290f29De82D',
};
