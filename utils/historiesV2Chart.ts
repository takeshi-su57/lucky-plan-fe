import {
  Contract,
  PerpTradeHistoryOperation,
  PerpTradingEventLog,
} from "@/graphql/gql/graphql";
import { TradeActionType } from "@/types";
import { PerpTradeHistory } from "@/web3/types";
import { getWeb3Info } from "@/web3/utils";
import { SimpleLinearRegression } from "ml-regression-simple-linear";

export function getSortedPartialHistories(
  histories: (PerpTradeHistory & { date: Date })[],
  filters: {
    range?: { from?: Date; to?: Date };
  },
) {
  const sortedHistories = histories
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
  let totalPositions = 0;
  let sumOfPnl = 0;
  let sumOfSize = 0;
  let sumOfCollaterals = 0;
  let sumOfLeverages = 0;

  const missionHistories: (PerpTradeHistory & { date: Date })[][] = [];

  const groupedByPositionKey: Record<
    string,
    (PerpTradeHistory & { date: Date })[]
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

      const tempHistories: (PerpTradeHistory & { date: Date })[] = [];

      for (let j = i; j < histories.length; j++) {
        const nextHistory = histories[j];

        sumOfPnl += +nextHistory.usdPnl;
        maxSizeIn = Math.max(maxSizeIn, +nextHistory.sizeInUsd);
        maxCollaterals = Math.max(maxCollaterals, +nextHistory.collateralInUsd);
        maxLeverages = Math.max(maxLeverages, +nextHistory.leverage);

        tempHistories.push(nextHistory);

        if (nextHistory.operation === PerpTradeHistoryOperation.Close) {
          totalDuration +=
            histories[j].date.getTime() - histories[i].date.getTime();
          openedPositions--;
          break;
        }
      }

      sumOfSize += maxSizeIn;
      sumOfCollaterals += maxCollaterals;
      sumOfLeverages += maxLeverages;

      missionHistories.push(tempHistories);
    }
  }

  let latestTotalDuration = 0;
  let latestTotalPositions = 0;
  let latestSumOfPnl = 0;
  let latestSumOfSize = 0;
  let latestSumOfCollaterals = 0;
  let latestSumOfLeverages = 0;

  const groupedByPositionKey2: Record<
    string,
    (PerpTradeHistory & { date: Date })[]
  > = {};

  sortedHistories
    .slice(Math.max(0, sortedHistories.length - 128), sortedHistories.length)
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

      let maxSizeIn = 0;
      let maxCollaterals = 0;
      let maxLeverages = 0;

      for (let j = i; j < histories.length; j++) {
        const nextHistory = histories[j];

        latestSumOfPnl += +nextHistory.usdPnl;
        maxSizeIn = Math.max(maxSizeIn, +nextHistory.sizeInUsd);
        maxCollaterals = Math.max(maxCollaterals, +nextHistory.collateralInUsd);
        maxLeverages = Math.max(maxLeverages, +nextHistory.leverage);

        if (nextHistory.operation === PerpTradeHistoryOperation.Close) {
          latestTotalDuration +=
            histories[j].date.getTime() - histories[i].date.getTime();
          break;
        }
      }

      latestSumOfSize += maxSizeIn;
      latestSumOfCollaterals += maxCollaterals;
      latestSumOfLeverages += maxLeverages;
    }
  }

  const avgDuration = totalPositions > 0 ? totalDuration / totalPositions : 0;

  return {
    missionHistories: missionHistories.sort((a, b) => {
      if (a.length === 0 || b.length === 0) {
        return a.length - b.length;
      }

      return b[b.length - 1].date.getTime() - a[a.length - 1].date.getTime();
    }),
    sortedHistories,
    openedPositions,
    avgDuration,
    avgPnlP: sumOfSize > 0 ? (sumOfPnl / sumOfSize) * 100 : 1000_000_000,
    avgSize: totalPositions > 0 ? sumOfSize / totalPositions : 0,
    avgCollateral: totalPositions > 0 ? sumOfCollaterals / totalPositions : 0,
    avgLeverage: totalPositions > 0 ? sumOfLeverages / totalPositions : 0,
    latestAvgDuration:
      latestTotalPositions > 0 ? latestTotalDuration / latestTotalPositions : 0,
    latestAvgPnlP:
      latestSumOfSize > 0
        ? (latestSumOfPnl / latestSumOfSize) * 100
        : 1000_000_000,
    latestAvgSize:
      latestSumOfSize > 0 ? latestSumOfSize / latestTotalPositions : 0,
    latestAvgCollateral:
      latestSumOfCollaterals > 0
        ? latestSumOfCollaterals / latestTotalPositions
        : 0,
    latestAvgLeverage:
      latestSumOfLeverages > 0
        ? latestSumOfLeverages / latestTotalPositions
        : 0,
  };
}

export function getHistoriesChartData(
  perpEventLogs: PerpTradingEventLog[],
  contractsMap: Record<number, Contract>,
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

  const tradePairsMap = new Map<string, number>();

  const perpHistories = perpEventLogs
    .map((log) => {
      const contract = contractsMap[log.contractId];

      if (!contract) {
        return null;
      }

      const history = getWeb3Info(
        contract.platform,
        contract.version,
      ).eventToPerpTradeHistory(contract.chainId, JSON.parse(log.jsonLog));

      return history
        ? {
            ...history,
            date: new Date(log.date),
          }
        : null;
    })
    .filter((history) => history !== null);

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
    avgDuration,
    avgPnlP,
    avgSize,
    avgCollateral,
    avgLeverage,
    latestAvgDuration,
    latestAvgPnlP,
    latestAvgSize,
    latestAvgCollateral,
    latestAvgLeverage,
  } = getSortedPartialHistories(perpHistories, filters);

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
      tradePairsMap.set(
        history.pair,
        (tradePairsMap.get(history.pair) || 0) + 1,
      );

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

  const latestRegression = new SimpleLinearRegression(
    xs.slice(Math.max(0, xs.length - 128), xs.length),
    pnlArrs.slice(Math.max(0, xs.length - 128), xs.length),
  );
  const latestScore = latestRegression.score(
    xs.slice(Math.max(0, xs.length - 128), xs.length),
    pnlArrs.slice(Math.max(0, xs.length - 128), xs.length),
  );

  return {
    missionHistories,
    pnlChartData,
    pnlAccChartData,
    inOutChartData,
    inOutAccChartData,
    tradePairs: Array.from(tradePairsMap.entries()),
    minIn,
    maxIn,
    sumIn,
    countIn,
    openedPositions,
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
    latestAvgDuration,
    latestAvgPnlP,
    latestAvgSize,
    latestAvgCollateral,
    latestAvgLeverage,
    latestSlope: latestRegression.slope,
    latestR2: latestScore.r2,
  };
}
