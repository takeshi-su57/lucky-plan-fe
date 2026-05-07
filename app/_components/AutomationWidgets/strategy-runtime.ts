import { Strategy } from "@/graphql/gql/graphql";

export type StrategyRuntimeConfig = {
  maxOpenMissions: number;
  tpPercentage: number;
  slPercentage: number;
  selectedPairs: { pair: string; isLong: boolean }[];
  mode: "signal" | "hook" | undefined;
};

function normalizeStrategyMode(mode: string): "signal" | "hook" | undefined {
  const normalizedMode = mode.toLowerCase();

  if (normalizedMode === "signal" || normalizedMode === "hook") {
    return normalizedMode;
  }

  return undefined;
}

export function getAdditionalParams(
  strategy: Pick<
    Strategy,
    "maxOpenMissions" | "tpPercentage" | "slPercentage" | "selectedPairs" | "mode"
  >,
): StrategyRuntimeConfig {
  try {
    const selectedPairs = JSON.parse(strategy.selectedPairs);

    if (!Array.isArray(selectedPairs)) {
      return {
        maxOpenMissions: strategy.maxOpenMissions || 0,
        tpPercentage: strategy.tpPercentage || 0,
        slPercentage: strategy.slPercentage || 0,
        selectedPairs: [],
        mode: normalizeStrategyMode(strategy.mode),
      };
    }

    return {
      maxOpenMissions: strategy.maxOpenMissions || 0,
      tpPercentage: strategy.tpPercentage || 0,
      slPercentage: strategy.slPercentage || 0,
      selectedPairs: selectedPairs
        .map((item: { pair: string; isLong: boolean } | string) =>
          typeof item === "string"
            ? [
                {
                  pair: item.toLowerCase(),
                  isLong: true,
                },
                {
                  pair: item.toLowerCase(),
                  isLong: false,
                },
              ]
            : [
                {
                  pair: item.pair.toLowerCase(),
                  isLong: item.isLong,
                },
              ],
        )
        .flat(),
      mode: normalizeStrategyMode(strategy.mode),
    };
  } catch {
    return {
      maxOpenMissions: strategy.maxOpenMissions || 0,
      tpPercentage: strategy.tpPercentage || 0,
      slPercentage: strategy.slPercentage || 0,
      selectedPairs: [],
      mode: normalizeStrategyMode(strategy.mode),
    };
  }
}
