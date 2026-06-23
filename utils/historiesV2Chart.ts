import { getPairKey } from "@/app/_components/LeaderboardWidgets/PerpEventLogPnlChart/utils";
import {
  PerpTradeHistoryOperation,
  PerpTradePositionsWithSummary,
} from "@/graphql/gql/graphql";
import { TradeActionType } from "@/types";
import { SimpleLinearRegression } from "ml-regression-simple-linear";

export function getHistoriesChartData(
  summary: PerpTradePositionsWithSummary | null,
  selectedPairs: Set<string>,
) {
  if (!summary) {
    return {
      sortedHistories: [],
      missionHistories: [],
      pnlChartData: [],
      pnlAccChartData: [],
      inOutChartData: [],
      inOutAccChartData: [],
      minIn: 0,
      maxIn: 0,
      sumIn: 0,
      countIn: 0,
      openedPositions: 0,
      duration: {
        max: 0,
        avg: 0,
      },
      pnl: {
        pAvg: 0,
        avg: 0,
        nAvg: 0,
      },
      size: {
        avg: 0,
      },
      collateral: {
        avg: 0,
      },
      pnlP: {
        avgBySize: 0,
        avgByCollateral: 0,
      },
      leverage: {
        avg: 0,
      },
      firstActivity: null,
      lastActivity: null,
      slope: 0,
      r2: 0,
    };
  }

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

  const missionHistories = summary.positions.map((position) =>
    position.histories.filter(
      (history) =>
        selectedPairs.size === 0 ||
        selectedPairs.has(getPairKey(history.pair, history.isLong)),
    ),
  );
  const sortedHistories = missionHistories
    .flat()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
    sortedHistories,
    missionHistories,
    pnlChartData,
    pnlAccChartData,
    inOutChartData,
    inOutAccChartData,
    minIn,
    maxIn,
    sumIn,
    countIn,
    openedPositions: summary.openedPositions,
    duration: {
      max: summary.maxDuration,
      avg: summary.avgDuration,
    },
    pnl: {
      pAvg: summary.avgPositivePnl,
      avg: summary.avgPnl,
      nAvg: summary.avgNegativePnl,
    },
    size: {
      avg: summary.avgSize,
    },
    collateral: {
      avg: summary.avgCollateral,
    },
    pnlP: {
      avgBySize: summary.avgPnlPercentageBySize,
      avgByCollateral: summary.avgPnlPercentageByCollateral,
    },
    leverage: {
      avg: summary.avgLeverage,
    },
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
