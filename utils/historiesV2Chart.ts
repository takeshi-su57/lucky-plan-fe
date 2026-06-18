import {
  PerpTradeHistoryOperation,
  PerpTradeHistory,
} from "@/graphql/gql/graphql";
import { TradeActionType } from "@/types";
import { SimpleLinearRegression } from "ml-regression-simple-linear";

export function getSortedPartialHistories(
  histories: PerpTradeHistory[],
  filters: {
    range?: { from?: Date; to?: Date };
  },
) {
  const sortedHistories = [...histories]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((history) => {
      if (
        filters.range &&
        filters.range.from &&
        filters.range.from > new Date(history.date)
      ) {
        return false;
      }

      if (
        filters.range &&
        filters.range.to &&
        filters.range.to < new Date(history.date)
      ) {
        return false;
      }

      return true;
    });

  let openedPositions = 0;
  let totalDuration = 0;
  let maxDuration = 0;
  let totalPositions = 0;
  let sumOfLeverages = 0;
  const sumOfPnl = {
    total: 0,
    positive: 0,
    negative: 0,
    positiveCount: 0,
    negativeCount: 0,
  };
  let sumOfSize = 0;
  let sumOfCollaterals = 0;

  const missionHistories: (PerpTradeHistory & { date: Date; id: number })[][] =
    [];

  const groupedByPositionKey: Record<
    string,
    (PerpTradeHistory & { date: Date; id: number })[]
  > = {};

  sortedHistories.forEach((history) => {
    if (!history) {
      return;
    }

    if (groupedByPositionKey[history.positionKey]) {
      groupedByPositionKey[history.positionKey].push(history);
    } else {
      groupedByPositionKey[history.positionKey] = [history];
    }
  });

  for (const histories of Object.values(groupedByPositionKey)) {
    for (let i = 0; i < histories.length; i++) {
      const history = histories[i];

      if (history.operation !== PerpTradeHistoryOperation.Open) {
        continue;
      }

      openedPositions++;

      totalPositions++;

      let maxSizeIn = 0;
      let maxCollaterals = 0;
      let maxLeverages = 0;
      let tempPnl = 0;

      const tempHistories: (PerpTradeHistory & { date: Date; id: number })[] =
        [];

      for (let j = i; j < histories.length; j++) {
        const nextHistory = histories[j];

        tempPnl += +nextHistory.usdPnl;

        maxSizeIn = Math.max(maxSizeIn, +nextHistory.sizeInUsd);
        maxCollaterals = Math.max(maxCollaterals, +nextHistory.collateralInUsd);
        maxLeverages = Math.max(maxLeverages, +nextHistory.leverage);

        tempHistories.push(nextHistory);

        if (nextHistory.operation === PerpTradeHistoryOperation.Close) {
          const gap =
            new Date(histories[j].date).getTime() -
            new Date(histories[i].date).getTime();

          totalDuration += gap;

          openedPositions--;
          maxDuration = Math.max(maxDuration, gap);
          break;
        }
      }

      sumOfSize += maxSizeIn;
      sumOfCollaterals += maxCollaterals;
      sumOfPnl.total += tempPnl;
      sumOfLeverages += maxLeverages;

      if (tempPnl > 0) {
        sumOfPnl.positive += tempPnl;
        sumOfPnl.positiveCount++;
      } else {
        sumOfPnl.negative += tempPnl;
        sumOfPnl.negativeCount++;
      }

      missionHistories.push(tempHistories);
    }
  }

  let latestTotalDuration = 0;
  let latestMaxDuration = 0;
  let latestTotalPositions = 0;
  const latestSumOfPnl = {
    total: 0,
    positive: 0,
    negative: 0,
    positiveCount: 0,
    negativeCount: 0,
  };
  let latestSumOfSize = 0;
  let latestSumOfCollaterals = 0;
  let latestSumOfLeverages = 0;

  const groupedByPositionKey2: Record<
    string,
    (PerpTradeHistory & { date: Date })[]
  > = {};

  sortedHistories
    .slice(Math.max(0, sortedHistories.length - 256), sortedHistories.length)
    .forEach((history) => {
      if (!history) {
        return;
      }

      if (groupedByPositionKey2[history.positionKey]) {
        groupedByPositionKey2[history.positionKey].push(history);
      } else {
        groupedByPositionKey2[history.positionKey] = [history];
      }
    });

  for (const histories of Object.values(groupedByPositionKey2)) {
    for (let i = 0; i < histories.length; i++) {
      const history = histories[i];

      if (history.operation !== PerpTradeHistoryOperation.Open) {
        continue;
      }

      latestTotalPositions++;

      let tempPnl = 0;
      let maxSizeIn = 0;
      let maxCollaterals = 0;
      let maxLeverages = 0;

      for (let j = i; j < histories.length; j++) {
        const nextHistory = histories[j];

        tempPnl += +nextHistory.usdPnl;
        maxSizeIn = Math.max(maxSizeIn, +nextHistory.sizeInUsd);
        maxCollaterals = Math.max(maxCollaterals, +nextHistory.collateralInUsd);
        maxLeverages = Math.max(maxLeverages, +nextHistory.leverage);

        if (nextHistory.operation === PerpTradeHistoryOperation.Close) {
          const gap =
            new Date(histories[j].date).getTime() -
            new Date(histories[i].date).getTime();

          latestTotalDuration += gap;

          latestMaxDuration = Math.max(latestMaxDuration, gap);
          break;
        }
      }

      latestSumOfLeverages += maxLeverages;

      latestSumOfSize += maxSizeIn;
      latestSumOfCollaterals += maxCollaterals;
      latestSumOfPnl.total += tempPnl;
      sumOfLeverages += maxLeverages;

      if (tempPnl > 0) {
        latestSumOfPnl.positive += tempPnl;
        latestSumOfPnl.positiveCount++;
      } else {
        latestSumOfPnl.negative += tempPnl;
        latestSumOfPnl.negativeCount++;
      }
    }
  }

  return {
    missionHistories: missionHistories.sort((a, b) => {
      if (a.length === 0 || b.length === 0) {
        return a.length - b.length;
      }

      return (
        new Date(b[b.length - 1].date).getTime() -
        new Date(a[a.length - 1].date).getTime()
      );
    }),
    sortedHistories,
    openedPositions,
    duration: {
      latest: {
        max: latestMaxDuration,
        avg:
          latestTotalPositions > 0
            ? latestTotalDuration / latestTotalPositions
            : 0,
      },
      total: {
        max: maxDuration,
        avg: totalPositions > 0 ? totalDuration / totalPositions : 0,
      },
    },
    pnl: {
      latest: {
        pAvg:
          latestSumOfPnl.positiveCount > 0
            ? latestSumOfPnl.positive / latestSumOfPnl.positiveCount
            : 0,
        avg:
          latestTotalPositions > 0
            ? latestSumOfPnl.total / latestTotalPositions
            : 0,
        nAvg:
          latestSumOfPnl.negativeCount > 0
            ? latestSumOfPnl.negative / latestSumOfPnl.negativeCount
            : 0,
      },
      total: {
        pAvg:
          sumOfPnl.positiveCount > 0
            ? sumOfPnl.positive / sumOfPnl.positiveCount
            : 0,
        avg: totalPositions > 0 ? sumOfPnl.total / totalPositions : 0,
        nAvg:
          sumOfPnl.negativeCount > 0
            ? sumOfPnl.negative / sumOfPnl.negativeCount
            : 0,
      },
    },
    size: {
      latest: {
        avg:
          latestTotalPositions > 0 ? latestSumOfSize / latestTotalPositions : 0,
      },
      total: {
        avg: totalPositions > 0 ? sumOfSize / totalPositions : 0,
      },
    },
    collateral: {
      latest: {
        avg:
          latestTotalPositions > 0
            ? latestSumOfCollaterals / latestTotalPositions
            : 0,
      },
      total: {
        avg: totalPositions > 0 ? sumOfCollaterals / totalPositions : 0,
      },
    },
    pnlP: {
      latest: {
        avgBySize:
          latestSumOfSize > 0
            ? (latestSumOfPnl.total / latestSumOfSize) * 100
            : 1000_000_000,
        avgByCollateral:
          latestSumOfCollaterals > 0
            ? (latestSumOfPnl.total / latestSumOfCollaterals) * 100
            : 1000_000_000,
      },
      total: {
        avgBySize:
          sumOfSize > 0 ? (sumOfPnl.total / sumOfSize) * 100 : 1000_000_000,
        avgByCollateral:
          sumOfCollaterals > 0
            ? (sumOfPnl.total / sumOfCollaterals) * 100
            : 1000_000_000,
      },
    },
    leverage: {
      latest: {
        avg:
          latestSumOfLeverages > 0
            ? latestSumOfLeverages / latestTotalPositions
            : 0,
      },
      total: {
        avg: sumOfLeverages > 0 ? sumOfLeverages / totalPositions : 0,
      },
    },
  };
}

export function getHistoriesChartData(
  perpTradeHistories: PerpTradeHistory[],
  filters: {
    range?: { from?: Date; to?: Date };
  },
) {
  const pnlChartData: {
    value: number;
    date: Date;
  }[] = [];

  const pnlAccChartData: {
    value: number;
    date: Date;
  }[] = [];

  const inOutChartData: {
    value: number;
    date: Date;
  }[] = [];

  const inOutAccChartData: {
    value: number;
    date: Date;
  }[] = [];

  let pnlSum = 0;
  let inOutSum = 0;
  let minIn = 10000000;
  let maxIn = 0;
  let sumIn = 0;
  let countIn = 0;

  const {
    missionHistories,
    sortedHistories,
    openedPositions,
    duration,
    pnl,
    size,
    collateral,
    pnlP,
    leverage,
  } = getSortedPartialHistories(perpTradeHistories, filters);

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

      if (inOutChartData.length === 0) {
        inOutChartData.push({
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

      pnlSum += history.usdPnl;

      switch (history.operation) {
        case PerpTradeHistoryOperation.Open: {
          inOutSum -= history.collateralInUsd;

          inOutChartData.push({
            value: -history.collateralInUsd,
            date: new Date(history.date),
          });

          minIn = Math.min(minIn, history.collateralInUsd);
          maxIn = Math.max(maxIn, history.collateralInUsd);
          sumIn += history.collateralInUsd;
          countIn++;

          break;
        }
        case PerpTradeHistoryOperation.Close: {
          inOutSum += history.usdPnl + history.collateralDeltaUsd;

          inOutChartData.push({
            value: history.usdPnl + history.collateralDeltaUsd,
            date: new Date(history.date),
          });

          break;
        }
        case PerpTradeHistoryOperation.IncreaseLeverage: {
          inOutSum += history.collateralDeltaUsd;

          inOutChartData.push({
            value: history.collateralDeltaUsd,
            date: new Date(history.date),
          });

          break;
        }
        case PerpTradeHistoryOperation.DecreaseLeverage: {
          inOutSum -= history.collateralDeltaUsd;

          inOutChartData.push({
            value: -history.collateralDeltaUsd,
            date: new Date(history.date),
          });
          break;
        }
        case PerpTradeHistoryOperation.IncreaseSize: {
          inOutSum -= history.collateralDeltaUsd;

          inOutChartData.push({
            value: -history.collateralDeltaUsd,
            date: new Date(history.date),
          });

          break;
        }
        case PerpTradeHistoryOperation.DecreaseSize: {
          const delta = history.collateralDeltaUsd + history.usdPnl;

          inOutSum += delta;

          inOutChartData.push({
            value: delta,
            date: new Date(history.date),
          });

          break;
        }
      }

      pnlChartData.push({
        value: history.usdPnl,
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
    missionHistories,
    pnlChartData,
    pnlAccChartData,
    inOutChartData,
    inOutAccChartData,
    minIn,
    maxIn,
    sumIn,
    countIn,
    openedPositions,
    duration,
    pnl,
    pnlP,
    size,
    collateral,
    leverage,
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
