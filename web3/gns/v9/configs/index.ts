import { Collateral, Pair } from "../types";
import { pairConfigs } from "./pairsConfig";
import { collateralConfigs } from "./collateralsConfig";

export const pairConfigsMap: Record<number, Pair[]> = {};
export const pairIndexConfigsMap: Record<number, Record<string, Pair>> = {};
export const collateralConfigsMap: Record<number, Collateral[]> = {};

for (const [chainId, pairs] of Object.entries(pairConfigs)) {
  pairConfigsMap[+chainId] = pairs.map((pair) => ({
    ...pair,
    feed: {
      ...pair.feed,
      maxDeviationP: BigInt(pair.feed.maxDeviationP),
    },
    depth: {
      onePercentDepthAboveUsd: BigInt(pair.depth.onePercentDepthAboveUsd),
      onePercentDepthBelowUsd: BigInt(pair.depth.onePercentDepthBelowUsd),
    },
    spreadP: BigInt(pair.spreadP),
    groupIndex: BigInt(pair.groupIndex),
    feeIndex: BigInt(pair.feeIndex),
  }));

  const tempPairIndexConfigsMap: Record<string, Pair> = {};

  pairConfigsMap[+chainId].forEach((pair) => {
    tempPairIndexConfigsMap[`${pair.from}/${pair.to}`.toLowerCase()] = {
      ...pair,
      feed: {
        ...pair.feed,
        maxDeviationP: BigInt(pair.feed.maxDeviationP),
      },
    };
  });

  pairIndexConfigsMap[+chainId] = tempPairIndexConfigsMap;
}

for (const [chainId, collaterals] of Object.entries(collateralConfigs)) {
  collateralConfigsMap[+chainId] = collaterals.map((collateral) => ({
    ...collateral,
    precision: BigInt(collateral.precision),
    precisionDelta: BigInt(collateral.precisionDelta),
    __placeholder: BigInt(collateral.__placeholder),
  }));
}

export function getPair(chainId: number, pairIndex: number): Pair | null {
  if (!pairConfigsMap[chainId]) {
    throw new Error(`Pair configs not found for chainId: ${chainId}`);
  }

  return pairConfigsMap[chainId][pairIndex] || null;
}

export function getPairByName(chainId: number, pairName: string): Pair | null {
  if (!pairConfigsMap[chainId]) {
    throw new Error(`Pair configs not found for chainId: ${chainId}`);
  }

  return pairIndexConfigsMap[chainId][pairName.toLowerCase()] || null;
}

export function getPairIndex(chainId: number, pairName: string): number {
  if (!pairConfigsMap[chainId]) {
    throw new Error(`Pair configs not found for chainId: ${chainId}`);
  }

  const pair = pairIndexConfigsMap[chainId][pairName.toLowerCase()];

  return pair ? pair.pairIndex : -1;
}

export function getPairName(chainId: number, pairIndex: number): string | null {
  if (!pairConfigsMap[chainId]) {
    throw new Error(`Pair configs not found for chainId: ${chainId}`);
  }

  const pair = pairConfigsMap[chainId][pairIndex];

  return pair ? `${pair.from}/${pair.to}`.toLowerCase() : null;
}

export function getCollateral(
  chainId: number,
  collateralIndex: number,
): Collateral | null {
  if (!collateralConfigsMap[chainId]) {
    throw new Error(`Collateral configs not found for chainId: ${chainId}`);
  }

  return collateralConfigsMap[chainId][collateralIndex - 10] || null;
}

export function getCollaterals(chainId: number) {
  return collateralConfigsMap[chainId] || [];
}
