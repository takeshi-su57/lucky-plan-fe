import { Contract, PerpTradingEventLog } from "@/graphql/gql/graphql";
import { TradeActionType } from "@/types";
import { PerpTradeHistory } from "@/web3/types";
import { getWeb3Info } from "@/web3/utils";

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

  const groupedByPositionKey: Record<
    string,
    (PerpTradeHistory & { date: Date })[]
  > = {};

  const missionHistories: (PerpTradeHistory & { date: Date })[][] = [];

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

      if (history.operation !== "open") {
        continue;
      }

      openedPositions++;
      totalPositions++;

      sumOfSize += history.sizeInUsd;
      sumOfCollaterals += history.collateralInUsd;
      sumOfLeverages += history.leverage;

      const tempHistories: (PerpTradeHistory & { date: Date })[] = [];

      for (let j = i; j < histories.length; j++) {
        const nextHistory = histories[j];

        sumOfPnl += +nextHistory.usdPnl;

        tempHistories.push(nextHistory);

        if (nextHistory.operation === "close") {
          openedPositions--;

          totalDuration +=
            histories[j].date.getTime() - histories[i].date.getTime();
          break;
        }
      }

      missionHistories.push(tempHistories);
    }
  }

  const avgDuration = totalPositions > 0 ? totalDuration / totalPositions : 0;

  return {
    missionHistories,
    sortedHistories,
    openedPositions,
    avgDuration,
    avgPnlP: sumOfSize > 0 ? (sumOfPnl / sumOfSize) * 100 : 1000_000_000,
    avgSize: totalPositions > 0 ? sumOfSize / totalPositions : 0,
    avgCollateral: totalPositions > 0 ? sumOfCollaterals / totalPositions : 0,
    avgLeverage: totalPositions > 0 ? sumOfLeverages / totalPositions : 0,
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

      pnlSum += history.usdPnl;

      switch (history.operation) {
        case "open": {
          inOutSum -= history.collateralInUsd;

          inChartData.push({
            value: -history.collateralInUsd,
            date: new Date(history.date),
          });

          minIn = Math.min(minIn, history.collateralInUsd);
          maxIn = Math.max(maxIn, history.collateralInUsd);
          sumIn += history.collateralInUsd;
          countIn++;

          break;
        }
        case "close": {
          inOutSum += history.usdPnl + history.collateralDeltaUsd;

          outChartData.push({
            value: history.usdPnl + history.collateralDeltaUsd,
            date: new Date(history.date),
          });

          break;
        }
        case "increaseLeverage": {
          inOutSum += history.collateralDeltaUsd;

          outChartData.push({
            value: history.collateralDeltaUsd,
            date: new Date(history.date),
          });

          break;
        }
        case "decreaseLeverage": {
          inOutSum -= history.collateralDeltaUsd;

          inChartData.push({
            value: -history.collateralDeltaUsd,
            date: new Date(history.date),
          });
          break;
        }
        case "increaseSize": {
          inOutSum -= history.collateralDeltaUsd;

          inChartData.push({
            value: -history.collateralDeltaUsd,
            date: new Date(history.date),
          });

          break;
        }
        case "decreaseSize": {
          const delta = history.collateralDeltaUsd + history.usdPnl;

          inOutSum += delta;

          outChartData.push({
            value: delta,
            date: new Date(history.date),
          });

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
    missionHistories,
    pnlChartData,
    inOutChartData,
    inChartData,
    outChartData,
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
  };
}
