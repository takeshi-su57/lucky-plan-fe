import { PersonalTradeHistory, TradeActionType } from "@/types";
import { SimpleLinearRegression } from "ml-regression-simple-linear";

export function getSortedPartialHistories(
  histories: PersonalTradeHistory[],
  filters: {
    mode: "show_all_activity" | "show_only_valid_activity";
    supportedPairs?: string[];
    range?: { from?: Date; to?: Date };
  },
) {
  const supportedPairsMap: Record<string, boolean> = {};

  if (filters.supportedPairs) {
    filters.supportedPairs.forEach((pair) => {
      supportedPairsMap[pair.toLowerCase()] = true;
    });
  }

  const openedHistories = new Map<string, boolean>();
  const pnlMaps = new Map<string, number>();
  const sizeMaps = new Map<string, number>();
  const durationMaps = new Map<
    string,
    { min: number | null; max: number | null }
  >();
  const totalOpenHistories: PersonalTradeHistory[] = [];

  const sortedAndSupportedHistories = histories
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((history) => {
      if (
        filters.supportedPairs &&
        !supportedPairsMap[history.pair.toLowerCase()]
      ) {
        return false;
      }

      return true;
    });

  const valideTradeIndexMap: Record<string, boolean> = {};

  sortedAndSupportedHistories.forEach((history) => {
    if (
      history.action === TradeActionType.TradeOpenedMarket ||
      history.action === TradeActionType.TradeOpenedLimit
    ) {
      openedHistories.set(`${history.contractId}-${history.tradeIndex}`, true);

      durationMaps.set(`${history.contractId}-${history.tradeIndex}`, {
        min: new Date(history.date).getTime(),
        max: new Date().getTime(),
      });

      totalOpenHistories.push(history);
    }

    if (
      history.action === TradeActionType.TradeClosedMarket ||
      history.action === TradeActionType.TradeClosedLIQ ||
      history.action === TradeActionType.TradeClosedSL ||
      history.action === TradeActionType.TradeClosedTP
    ) {
      openedHistories.set(`${history.contractId}-${history.tradeIndex}`, false);

      const prevDuration = durationMaps.get(
        `${history.contractId}-${history.tradeIndex}`,
      );

      durationMaps.set(`${history.contractId}-${history.tradeIndex}`, {
        min: prevDuration?.min || null,
        max: new Date(history.date).getTime(),
      });
    }

    const prevPnl =
      pnlMaps.get(`${history.contractId}-${history.tradeIndex}`) || 0;

    pnlMaps.set(
      `${history.contractId}-${history.tradeIndex}`,
      prevPnl + +history.pnl,
    );

    const prevSize =
      sizeMaps.get(`${history.contractId}-${history.tradeIndex}`) || 0;

    sizeMaps.set(
      `${history.contractId}-${history.tradeIndex}`,
      Math.max(prevSize, +history.size * +history.leverage),
    );

    if (
      filters.range &&
      filters.range.from &&
      filters.range.from > new Date(history.date)
    ) {
      return;
    }

    if (
      filters.range &&
      filters.range.to &&
      filters.range.to < new Date(history.date)
    ) {
      return;
    }

    if (filters.mode === "show_all_activity") {
      valideTradeIndexMap[
        `${history.contractId}-${history.address}-${history.tradeIndex}`
      ] = true;
    } else if (
      history.action === TradeActionType.TradeOpenedMarket ||
      history.action === TradeActionType.TradeOpenedLimit
    ) {
      valideTradeIndexMap[
        `${history.contractId}-${history.address}-${history.tradeIndex}`
      ] = true;
    }
  });

  const openedHistoriesArr = Array.from(openedHistories.entries())
    .filter((item) => item[1])
    .map((item) => item[0]);

  const chunkForPnlHistories = sortedAndSupportedHistories
    .reverse()
    .slice(0, 512);

  let totalDuration = 0;
  let durationCount = 0;

  sortedAndSupportedHistories
    .reverse()
    .slice(0, 512)
    .filter(
      (history) =>
        history.action === TradeActionType.TradeClosedMarket ||
        history.action === TradeActionType.TradeClosedLIQ ||
        history.action === TradeActionType.TradeClosedSL ||
        history.action === TradeActionType.TradeClosedTP,
    )
    .forEach((history) => {
      const duration = durationMaps.get(
        `${history.contractId}-${history.tradeIndex}`,
      );

      if (duration && duration.min !== null && duration.max !== null) {
        totalDuration += duration.max - duration.min;
        durationCount++;
      }
    });

  let sumOfSize = 0;
  let sumOfPnl = 0;

  chunkForPnlHistories
    .filter(
      (history) =>
        history.action === TradeActionType.TradeClosedMarket ||
        history.action === TradeActionType.TradeClosedLIQ ||
        history.action === TradeActionType.TradeClosedSL ||
        history.action === TradeActionType.TradeClosedTP,
    )
    .forEach((item) => {
      const pnl = pnlMaps.get(`${item.contractId}-${item.tradeIndex}`) || 0;
      const size = sizeMaps.get(`${item.contractId}-${item.tradeIndex}`) || 0;
      sumOfSize += size;
      sumOfPnl += pnl;
    });

  const avgDuration = durationCount > 0 ? totalDuration / durationCount : -1;

  const avgPnlP = sumOfSize > 0 ? (sumOfPnl / sumOfSize) * 100 : 1000_000_000;

  const openHistories = totalOpenHistories.reverse().slice(0, 512);

  const totalCollateral = openHistories.reduce((acc, history) => {
    return acc + Number(history.size) * Number(history.collateralPriceUsd);
  }, 0);
  const totalLeverage = openHistories.reduce((acc, history) => {
    return acc + Number(history.leverage);
  }, 0);
  const totalSize = openHistories.reduce((acc, history) => {
    return (
      acc +
      Number(history.size) *
        Number(history.collateralPriceUsd) *
        Number(history.leverage)
    );
  }, 0);

  const avgCollateral = totalCollateral / openHistories.length;
  const avgLeverage = totalLeverage / openHistories.length;
  const avgSize = totalSize / openHistories.length;

  const historiesByTradeIndex: Record<string, PersonalTradeHistory[]> = {};

  sortedAndSupportedHistories.forEach((history) => {
    if (
      !valideTradeIndexMap[
        `${history.contractId}-${history.address}-${history.tradeIndex}`
      ]
    ) {
      return;
    }

    if (
      !historiesByTradeIndex[
        `${history.contractId}-${history.address}-${history.tradeIndex}`
      ]
    ) {
      historiesByTradeIndex[
        `${history.contractId}-${history.address}-${history.tradeIndex}`
      ] = [];
    }

    historiesByTradeIndex[
      `${history.contractId}-${history.address}-${history.tradeIndex}`
    ].push(history);
  });

  const validHistories = Object.values(historiesByTradeIndex);

  return {
    historiesGroupedByTradeIndex: validHistories
      .filter((item) => item.length > 0)
      .map((item) => ({
        tradeIndex: item[0].tradeIndex,
        pair: item[0].pair,
        long: item[0].long,
        collateralIndex: item[0].collateralIndex,
        contractId: item[0].contractId,
        actions: item,
      })),
    sortedHistories: validHistories
      .flat()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    openedHistoriesArr,
    avgDuration,
    avgPnlP,
    avgSize,
    avgCollateral,
    avgLeverage,
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
  const pnlAccChartData: {
    value: number;
    date: Date;
  }[] = [];

  const pnlChartData: {
    value: number;
    date: Date;
  }[] = [];

  const inOutAccChartData: {
    value: number;
    date: Date;
  }[] = [];

  const inOutChartData: {
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

  const {
    sortedHistories,
    historiesGroupedByTradeIndex,
    openedHistoriesArr,
    avgDuration,
    avgPnlP,
    avgSize,
    avgCollateral,
    avgLeverage,
  } = getSortedPartialHistories(histories, filters);

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

      if (pnlAccChartData.length === 0) {
        pnlAccChartData.push({
          value: 0,
          date: new Date(history.date),
        });
      }

      if (inOutAccChartData.length === 0) {
        inOutAccChartData.push({
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

      pnlSum += history.pnl * history.collateralPriceUsd;

      switch (history.action) {
        case TradeActionType.TradeOpenedMarket: {
          inOutSum -= history.size * history.collateralPriceUsd;

          inOutChartData.push({
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

          inOutChartData.push({
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

          inOutChartData.push({
            value: (history.size + history.pnl) * history.collateralPriceUsd,
            date: new Date(history.date),
          });

          break;
        }
        case TradeActionType.TradeClosedLIQ: {
          inOutSum += (history.size + history.pnl) * history.collateralPriceUsd;

          inOutChartData.push({
            value: (history.size + history.pnl) * history.collateralPriceUsd,
            date: new Date(history.date),
          });

          break;
        }
        case TradeActionType.TradeClosedSL: {
          inOutSum += (history.size + history.pnl) * history.collateralPriceUsd;

          inOutChartData.push({
            value: (history.size + history.pnl) * history.collateralPriceUsd,
            date: new Date(history.date),
          });

          break;
        }
        case TradeActionType.TradeClosedTP: {
          inOutSum += (history.size + history.pnl) * history.collateralPriceUsd;

          inOutChartData.push({
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
            inOutChartData.push({
              value: delta,
              date: new Date(history.date),
            });
          }

          if (delta > 0) {
            inOutChartData.push({
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
            inOutChartData.push({
              value: delta,
              date: new Date(history.date),
            });
          }

          if (delta > 0) {
            inOutChartData.push({
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
            inOutChartData.push({
              value: delta,
              date: new Date(history.date),
            });
          }

          if (delta > 0) {
            inOutChartData.push({
              value: delta,
              date: new Date(history.date),
            });
          }

          break;
        }
      }

      pnlChartData.push({
        value: history.pnl * history.collateralPriceUsd,
        date: new Date(history.date),
      });

      pnlAccChartData.push({
        value: pnlSum,
        date: new Date(history.date),
      });

      inOutAccChartData.push({
        value: inOutSum,
        date: new Date(history.date),
      });
    });
  }

  const xs = pnlAccChartData.map((_, index) => index);
  const pnlArrs = pnlAccChartData.map((item) => item.value);

  const regression = new SimpleLinearRegression(xs, pnlArrs);
  const score = regression.score(xs, pnlArrs);

  return {
    historiesGroupedByTradeIndex,
    pnlChartData,
    pnlAccChartData,
    inOutChartData,
    inOutAccChartData,
    tradePairs: Array.from(tradePairIndexsMap.entries()),
    actionCounts,
    minIn,
    maxIn,
    sumIn,
    countIn,
    openedHistoriesArr,
    avgDuration,
    avgPnlP,
    avgSize,
    avgCollateral,
    avgLeverage,
    firstActivity:
      sortedHistories.length > 0 ? new Date(sortedHistories[0].date) : null,
    lastActivity:
      sortedHistories.length > 0
        ? new Date(sortedHistories[sortedHistories.length - 1].date)
        : null,
    slope: regression.slope,
    r2: score.r2,
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

    const deltaFollower = deltaCollateral * strategy.ratio;

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
