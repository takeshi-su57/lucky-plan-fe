import { PersonalTradeHistory, TradeActionType } from "@/types";

export function getHistoriesChartData(
  histories: PersonalTradeHistory[],
  range?: {
    from: Date;
    to: Date;
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

  const sortedHistories = histories.sort((a, b) => {
    const first = new Date(a.date);
    const second = new Date(b.date);

    if (first > second) {
      return 1;
    } else if (first < second) {
      return -1;
    } else {
      return 0;
    }
  });

  if (sortedHistories.length > 0) {
    [...sortedHistories, sortedHistories[sortedHistories.length - 1]].forEach(
      (history) => {
        if (
          range &&
          (range.from >= new Date(history.date) ||
            range.to <= new Date(history.date))
        ) {
          return;
        }

        tradePairIndexsMap.set(
          history.pair,
          (tradePairIndexsMap.get(history.pair) || 0) + 1,
        );

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
            inOutSum +=
              (history.size + history.pnl) * history.collateralPriceUsd;

            outChartData.push({
              value: (history.size + history.pnl) * history.collateralPriceUsd,
              date: new Date(history.date),
            });

            break;
          }
          case TradeActionType.TradeClosedLIQ: {
            inOutSum +=
              (history.size + history.pnl) * history.collateralPriceUsd;

            outChartData.push({
              value: (history.size + history.pnl) * history.collateralPriceUsd,
              date: new Date(history.date),
            });

            break;
          }
          case TradeActionType.TradeClosedSL: {
            inOutSum +=
              (history.size + history.pnl) * history.collateralPriceUsd;

            outChartData.push({
              value: (history.size + history.pnl) * history.collateralPriceUsd,
              date: new Date(history.date),
            });

            break;
          }
          case TradeActionType.TradeClosedTP: {
            inOutSum +=
              (history.size + history.pnl) * history.collateralPriceUsd;

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
            break;
          }
          case TradeActionType.TradePosSizeIncrease: {
            const delta =
              (-(history.collateralDelta || 0) + history.pnl) *
              history.collateralPriceUsd;

            inOutSum += delta;
            break;
          }
          case TradeActionType.TradePosSizeDecrease: {
            const delta =
              (-(history.collateralDelta || 0) + history.pnl) *
              history.collateralPriceUsd;

            inOutSum += delta;
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
      },
    );
  }

  return {
    pnlChartData,
    inOutChartData,
    inChartData,
    outChartData,
    tradePairs: Array.from(tradePairIndexsMap.entries()),
    minIn,
    maxIn,
    sumIn,
    countIn,
  };
}

export function getOpenMissionParams(
  strategy: {
    strategyKey: string;
    ratio: number;
    collateralBaseline: number;
    maxCollateral: number;
    minCollateral: number;
    maxLeverage: number;
    minLeverage: number;
  },
  args: {
    leverage: number;
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

  const maxCollateral = strategy.maxCollateral;
  const minCollateral = strategy.minCollateral;

  ratioAmount = ratioAmount < maxCollateral ? ratioAmount : maxCollateral;
  ratioAmount = ratioAmount > minCollateral ? ratioAmount : minCollateral;

  return {
    leverage: Math.max(
      Math.min(args.leverage, strategy.maxLeverage / 1000),
      strategy.minLeverage / 1000,
    ),
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
    maxCollateral: number;
    minCollateral: number;
    maxLeverage: number;
    minLeverage: number;
  },
): PersonalTradeHistory[] {
  return histories.map((history) => {
    const originalUSDPositionSize =
      history.size * history.leverage * history.collateralPriceUsd;

    const calculatedParams = getOpenMissionParams(
      strategy,
      {
        leverage: history.leverage,
        collateralAmount: history.size,
        collateralPriceUsd: history.collateralPriceUsd,
      },
      collateralBaseline,
    );

    const calculatedUSDPositionSize =
      calculatedParams.collateralAmount * calculatedParams.leverage;

    return {
      ...history,
      collateralPriceUsd: 1,
      pnl:
        originalUSDPositionSize > 0
          ? history.pnl * (calculatedUSDPositionSize / originalUSDPositionSize)
          : 0,
      pnl_net:
        originalUSDPositionSize > 0
          ? history.pnl_net *
            (calculatedUSDPositionSize / originalUSDPositionSize)
          : 0,
      collateralDelta:
        history.collateralDelta !== null && originalUSDPositionSize > 0
          ? history.collateralDelta *
            (calculatedUSDPositionSize / originalUSDPositionSize)
          : null,
      size: calculatedParams.collateralAmount,
      leverage: calculatedParams.leverage,
    };
  });
}
