import { PersonalTradeHistory, TradeActionType } from "@/types";

export function getSortedPartialHistories(
  histories: PersonalTradeHistory[],
  filters: {
    mode: "show_all_activity" | "show_only_valid_activity";
    supportedPairs?: string[];
    range?: { from?: Date; to?: Date };
  },
) {
  const inRangeHistories: PersonalTradeHistory[] = [];
  const supportedPairsMap: Record<string, boolean> = {};

  if (filters.supportedPairs) {
    filters.supportedPairs.forEach((pair) => {
      supportedPairsMap[pair.toLowerCase()] = true;
    });
  }

  histories
    .sort((a, b) => a.block - b.block)
    .forEach((history) => {
      if (
        filters.supportedPairs &&
        !supportedPairsMap[history.pair.toLowerCase()]
      ) {
        return;
      }

      if (!filters.range) {
        inRangeHistories.push(history);
      } else {
        if (filters.range.from && filters.range.from > new Date(history.date)) {
          return;
        }

        if (filters.range.to && filters.range.to < new Date(history.date)) {
          console.log(
            filters.range.to.getTime(),
            new Date(history.date).getTime(),
          );
          return;
        }

        inRangeHistories.push(history);
      }
    });

  console.log(filters?.range, inRangeHistories);

  const historiesByTradeIndex: Record<number, PersonalTradeHistory[]> = {};

  inRangeHistories.forEach((history) => {
    if (!historiesByTradeIndex[history.tradeIndex]) {
      historiesByTradeIndex[history.tradeIndex] = [];
    }

    historiesByTradeIndex[history.tradeIndex].push(history);
  });

  const validHistories = Object.values(historiesByTradeIndex).filter(
    (histories) => {
      const positionSetupAction = histories.find(
        (history) =>
          history.action === TradeActionType.TradeOpenedMarket ||
          history.action === TradeActionType.TradeOpenedLimit,
      );

      if (filters.mode === "show_only_valid_activity" && !positionSetupAction) {
        return false;
      }

      const positionCloseAction = histories.find(
        (history) =>
          history.action === TradeActionType.TradeClosedMarket ||
          history.action === TradeActionType.TradeClosedLIQ ||
          history.action === TradeActionType.TradeClosedSL ||
          history.action === TradeActionType.TradeClosedTP,
      );

      if (filters.mode === "show_only_valid_activity" && !positionCloseAction) {
        return false;
      }

      return true;
    },
  );

  return {
    historiesGroupedByTradeIndex: validHistories
      .filter((item) => item.length > 0)
      .map((item) => ({
        tradeIndex: item[0].tradeIndex,
        pair: item[0].pair,
        long: item[0].long,
        collateralIndex: item[0].collateralIndex,
        actions: item,
      })),
    sortedHistories: validHistories.flat().sort((a, b) => a.block - b.block),
  };
}

export function getHistoriesChartData(
  histories: PersonalTradeHistory[],
  filters: {
    mode: "show_all_activity" | "show_only_valid_activity";
    supportedPairs?: string[];
    range?: { from?: Date; to?: Date };
  },
) {
  const pnlChartData: {
    value: number;
    date: Date;
  }[] = [];

  const inOutChartData: {
    value: number;
    date: Date;
  }[] = [];

  const inChartData: {
    value: number;
    date: Date;
  }[] = [];

  const outChartData: {
    value: number;
    date: Date;
  }[] = [];

  const tradePairIndexsMap = new Map<string, number>();

  let pnlSum = 0;
  let inOutSum = 0;
  let minIn = 10000000;
  let maxIn = 0;
  let sumIn = 0;
  let countIn = 0;
  const actionCounts: Record<string, number> = {};

  const { sortedHistories, historiesGroupedByTradeIndex } =
    getSortedPartialHistories(histories, filters);

  if (sortedHistories.length > 0) {
    [
      ...sortedHistories,
      {
        ...sortedHistories[sortedHistories.length - 1],
        action: TradeActionType.TradeOpenedMarket,
        pnl: 0,
        pnl_net: 0,
        size: 0,
        collateralDelta: 0,
      },
      {
        ...sortedHistories[sortedHistories.length - 1],
        action: TradeActionType.TradeClosedMarket,
        pnl: 0,
        pnl_net: 0,
        size: 0,
        collateralDelta: 0,
      },
    ].forEach((history) => {
      tradePairIndexsMap.set(
        history.pair,
        (tradePairIndexsMap.get(history.pair) || 0) + 1,
      );

      actionCounts[history.action] = (actionCounts[history.action] || 0) + 1;

      if (pnlChartData.length === 0) {
        pnlChartData.push({
          value: 0,
          date: new Date(history.date),
        });
      }

      if (inOutChartData.length === 0) {
        inOutChartData.push({
          value: 0,
          date: new Date(history.date),
        });
      }

      if (outChartData.length === 0) {
        outChartData.push({
          value: 0,
          date: new Date(history.date),
        });
      }

      if (inChartData.length === 0) {
        inChartData.push({
          value: 0,
          date: new Date(history.date),
        });
      }

      pnlSum += history.pnl * history.collateralPriceUsd;

      switch (history.action) {
        case TradeActionType.TradeOpenedMarket: {
          inOutSum -= history.size * history.collateralPriceUsd;

          inChartData.push({
            value: -history.size * history.collateralPriceUsd,
            date: new Date(history.date),
          });

          minIn = Math.min(minIn, history.size * history.collateralPriceUsd);
          maxIn = Math.max(maxIn, history.size * history.collateralPriceUsd);
          sumIn += history.size * history.collateralPriceUsd;
          countIn++;

          break;
        }
        case TradeActionType.TradeOpenedLimit: {
          inOutSum -= history.size * history.collateralPriceUsd;

          inChartData.push({
            value: -history.size * history.collateralPriceUsd,
            date: new Date(history.date),
          });

          minIn = Math.min(minIn, history.size * history.collateralPriceUsd);
          maxIn = Math.max(maxIn, history.size * history.collateralPriceUsd);
          sumIn += history.size * history.collateralPriceUsd;
          countIn++;

          break;
        }
        case TradeActionType.TradeClosedMarket: {
          inOutSum += (history.size + history.pnl) * history.collateralPriceUsd;

          outChartData.push({
            value: (history.size + history.pnl) * history.collateralPriceUsd,
            date: new Date(history.date),
          });

          break;
        }
        case TradeActionType.TradeClosedLIQ: {
          inOutSum += (history.size + history.pnl) * history.collateralPriceUsd;

          outChartData.push({
            value: (history.size + history.pnl) * history.collateralPriceUsd,
            date: new Date(history.date),
          });

          break;
        }
        case TradeActionType.TradeClosedSL: {
          inOutSum += (history.size + history.pnl) * history.collateralPriceUsd;

          outChartData.push({
            value: (history.size + history.pnl) * history.collateralPriceUsd,
            date: new Date(history.date),
          });

          break;
        }
        case TradeActionType.TradeClosedTP: {
          inOutSum += (history.size + history.pnl) * history.collateralPriceUsd;

          outChartData.push({
            value: (history.size + history.pnl) * history.collateralPriceUsd,
            date: new Date(history.date),
          });

          break;
        }
        case TradeActionType.TradeLeverageUpdate: {
          const delta =
            (-(history.collateralDelta || 0) + history.pnl) *
            history.collateralPriceUsd;

          inOutSum += delta;

          if (delta < 0) {
            inChartData.push({
              value: delta,
              date: new Date(history.date),
            });
          }

          if (delta > 0) {
            outChartData.push({
              value: delta,
              date: new Date(history.date),
            });
          }

          break;
        }
        case TradeActionType.TradePosSizeIncrease: {
          const delta =
            (-(history.collateralDelta || 0) + history.pnl) *
            history.collateralPriceUsd;

          inOutSum += delta;

          if (delta < 0) {
            inChartData.push({
              value: delta,
              date: new Date(history.date),
            });
          }

          if (delta > 0) {
            outChartData.push({
              value: delta,
              date: new Date(history.date),
            });
          }

          break;
        }
        case TradeActionType.TradePosSizeDecrease: {
          const delta =
            (-(history.collateralDelta || 0) + history.pnl) *
            history.collateralPriceUsd;

          inOutSum += delta;

          if (delta < 0) {
            inChartData.push({
              value: delta,
              date: new Date(history.date),
            });
          }

          if (delta > 0) {
            outChartData.push({
              value: delta,
              date: new Date(history.date),
            });
          }

          break;
        }
      }

      pnlChartData.push({
        value: pnlSum,
        date: new Date(history.date),
      });

      inOutChartData.push({
        value: inOutSum,
        date: new Date(history.date),
      });
    });
  }

  return {
    historiesGroupedByTradeIndex,
    pnlChartData,
    inOutChartData,
    inChartData,
    outChartData,
    tradePairs: Array.from(tradePairIndexsMap.entries()),
    actionCounts,
    minIn,
    maxIn,
    sumIn,
    countIn,
    firstActivity:
      sortedHistories.length > 0 ? new Date(sortedHistories[0].date) : null,
    lastActivity:
      sortedHistories.length > 0
        ? new Date(sortedHistories[sortedHistories.length - 1].date)
        : null,
  };
}

export function getOpenMissionParams(
  strategy: {
    strategyKey: string;
    ratio: number;
    collateralBaseline: number;
  },
  args: {
    collateralAmount: number;
    collateralPriceUsd: number;
  },

  leaderCollateralBaseline: number,
) {
  const collateralUSDAmount = args.collateralAmount * args.collateralPriceUsd;

  let ratioAmount = collateralUSDAmount;

  if (strategy.strategyKey === "ratioCopy") {
    const deltaCollateral = collateralUSDAmount - leaderCollateralBaseline;

    const deltaFollower = (deltaCollateral * strategy.ratio) / 100;

    ratioAmount = strategy.collateralBaseline + deltaFollower;
  }

  if (strategy.strategyKey === "scaleCopy") {
    const collateralRatio =
      leaderCollateralBaseline > 0
        ? collateralUSDAmount / leaderCollateralBaseline
        : collateralUSDAmount;

    ratioAmount = strategy.collateralBaseline * collateralRatio;
  }

  return {
    collateralAmount: ratioAmount,
  };
}

export function transformHistories(
  histories: PersonalTradeHistory[],
  collateralBaseline: number,
  strategy: {
    strategyKey: string;
    ratio: number;
    collateralBaseline: number;
  },
): PersonalTradeHistory[] {
  return histories.map((history) => {
    let collateralSize = 0;
    let pnl = 0;
    let collateralDelta = 0;

    if (
      history.action === TradeActionType.TradeOpenedLimit ||
      history.action === TradeActionType.TradeOpenedMarket
    ) {
      const calculatedParams = getOpenMissionParams(
        strategy,
        {
          collateralAmount: history.size,
          collateralPriceUsd: history.collateralPriceUsd,
        },
        collateralBaseline,
      );

      collateralSize = calculatedParams.collateralAmount;
      pnl = 0;
      collateralDelta = 0;
    }

    if (
      history.action === TradeActionType.TradeClosedMarket ||
      history.action === TradeActionType.TradeClosedLIQ ||
      history.action === TradeActionType.TradeClosedSL ||
      history.action === TradeActionType.TradeClosedTP
    ) {
      const calculatedParams = getOpenMissionParams(
        strategy,
        {
          collateralAmount: history.size,
          collateralPriceUsd: history.collateralPriceUsd,
        },
        collateralBaseline,
      );

      collateralSize = calculatedParams.collateralAmount;
      pnl = (collateralSize * history.pnl) / history.size;
      collateralDelta = 0;
    }

    if (history.action === TradeActionType.TradeLeverageUpdate) {
      const oldCollateralSize = history.size - (history.collateralDelta || 0);
      const oldLeverage = (history.size * history.leverage) / oldCollateralSize;

      const calculatedParams = getOpenMissionParams(
        strategy,
        {
          collateralAmount: oldCollateralSize,
          collateralPriceUsd: history.collateralPriceUsd,
        },
        collateralBaseline,
      );

      const delta =
        (calculatedParams.collateralAmount * oldLeverage) / history.leverage -
        calculatedParams.collateralAmount;

      collateralSize = calculatedParams.collateralAmount + delta;
      pnl = 0;
      collateralDelta = delta;
    }

    if (history.action === TradeActionType.TradePosSizeIncrease) {
      const oldCollateralSize = history.size - (history.collateralDelta || 0);

      const calculatedParams = getOpenMissionParams(
        strategy,
        {
          collateralAmount: oldCollateralSize,
          collateralPriceUsd: history.collateralPriceUsd,
        },
        collateralBaseline,
      );

      const delta =
        (calculatedParams.collateralAmount * (history.collateralDelta || 0)) /
        oldCollateralSize;

      collateralSize = calculatedParams.collateralAmount + delta;
      pnl = (collateralSize * history.pnl) / history.size;
      collateralDelta = delta;
    }

    if (history.action === TradeActionType.TradePosSizeDecrease) {
      const oldCollateralSize = history.size - (history.collateralDelta || 0);

      const calculatedParams = getOpenMissionParams(
        strategy,
        {
          collateralAmount: oldCollateralSize,
          collateralPriceUsd: history.collateralPriceUsd,
        },
        collateralBaseline,
      );

      const delta =
        (calculatedParams.collateralAmount * (history.collateralDelta || 0)) /
        oldCollateralSize;

      collateralSize = calculatedParams.collateralAmount + delta;
      pnl = (collateralSize * history.pnl) / history.size;
      collateralDelta = delta;
    }

    return {
      ...history,
      collateralPriceUsd: 1,
      pnl: pnl,
      pnl_net: pnl,
      collateralDelta: collateralDelta,
      size: collateralSize,
    };
  });
}
