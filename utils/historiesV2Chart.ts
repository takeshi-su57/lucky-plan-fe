import { getPairKey } from "@/app/_components/LeaderboardWidgets/PerpEventLogPnlChart/utils";
import {
  PerpTradeHistoryOperation,
  PerpTradePositionsWithSummary,
} from "@/graphql/gql/graphql";
import { SimpleLinearRegression } from "ml-regression-simple-linear";

export function getHistoriesChartData(
  summary: PerpTradePositionsWithSummary | null,
  selectedPairs: Set<string>,
  copyTradingOptions: {
    standardCollateralUsd?: number;
    minRatio?: number;
    maxRatio?: number;
    minCollateralUsd?: number;
    maxCollateralUsd?: number;

    /**
     * If slope / avgCollateral reaches this value, slopeScore becomes 1.
     * Example: 0.03 means +3% of avg collateral per chart point is excellent.
     */
    excellentSlopeCollateralRatio?: number;

    /**
     * If avg pnl / avgCollateral reaches this value, pnlQualityScore becomes 1.
     */
    excellentAvgPnlCollateralRatio?: number;

    /**
     * Higher value means r2 is punished harder when it is far from 1.
     */
    r2Power?: number;

    /**
     * Position count required for full sample score.
     */
    minPositionsForFullSampleScore?: number;

    /**
     * Used to normalize drawdown when initial capital is unknown.
     */
    drawdownCollateralMultiplier?: number;

    /**
     * Average leverage above this becomes very risky.
     */
    maxReasonableLeverage?: number;
  } = {},
) {
  const {
    standardCollateralUsd = 100,
    minRatio = 0,
    maxRatio = Number.POSITIVE_INFINITY,
    minCollateralUsd = 0,
    maxCollateralUsd = Number.POSITIVE_INFINITY,
    excellentSlopeCollateralRatio = 0.03,
    excellentAvgPnlCollateralRatio = 0.1,
    r2Power = 1.5,
    minPositionsForFullSampleScore = 50,
    drawdownCollateralMultiplier = 10,
    maxReasonableLeverage = 50,
  } = copyTradingOptions;

  const clamp = (value: number, min = 0, max = 1) => {
    if (!Number.isFinite(value)) return min;
    return Math.min(Math.max(value, min), max);
  };

  const createEmptyCopyTradingScore = () => ({
    score: 0,
    slopeScore: 0,
    r2Score: 0,
    trendScore: 0,
    sampleScore: 0,
    winRateScore: 0,
    pnlQualityScore: 0,
    drawdownScore: 0,
    leverageScore: 0,
    positionSizeSuggestion: {
      standardCollateralUsd,
      suggestedCollateralUsd: 0,
      leaderAvgCollateralUsd: 0,
      suggestedRatio: 0,
    },
  });

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
      copyTrading: {
        standardCollateralUsd,
        leaderAvgCollateralUsd: 0,
        defaultCopy: createEmptyCopyTradingScore(),
        reverseCopy: createEmptyCopyTradingScore(),
      },
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
  let minIn = Number.POSITIVE_INFINITY;
  let maxIn = 0;
  let sumIn = 0;
  let countIn = 0;

  const missionHistories = summary.positions
    .filter((position) => {
      const history = position.histories[0];

      if (
        selectedPairs.size > 0 &&
        !selectedPairs.has(getPairKey(history.pair, history.isLong))
      ) {
        return false;
      }

      return true;
    })
    .map((position) => position.histories);

  const sortedHistories = missionHistories
    .flat()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const positionPnls = missionHistories
    .filter((histories) => histories.length > 0)
    .map((histories) =>
      histories.reduce((sum, history) => sum + history.usdPnl, 0),
    );

  if (sortedHistories.length > 0) {
    sortedHistories.forEach((history) => {
      const date = new Date(history.date);

      if (pnlChartData.length === 0) {
        pnlChartData.push({
          value: 0,
          date,
        });
      }

      if (pnlAccChartData.length === 0) {
        pnlAccChartData.push({
          value: 0,
          date,
        });
      }

      if (inOutChartData.length === 0) {
        inOutChartData.push({
          value: 0,
          date,
        });
      }

      if (inOutAccChartData.length === 0) {
        inOutAccChartData.push({
          value: 0,
          date,
        });
      }

      pnlSum += history.usdPnl;

      switch (history.operation) {
        case PerpTradeHistoryOperation.Open: {
          inOutSum -= history.collateralInUsd;

          inOutChartData.push({
            value: -history.collateralInUsd,
            date,
          });

          minIn = Math.min(minIn, history.collateralInUsd);
          maxIn = Math.max(maxIn, history.collateralInUsd);
          sumIn += history.collateralInUsd;
          countIn++;

          break;
        }

        case PerpTradeHistoryOperation.Close: {
          const value = history.usdPnl + history.collateralDeltaUsd;

          inOutSum += value;

          inOutChartData.push({
            value,
            date,
          });

          break;
        }

        case PerpTradeHistoryOperation.IncreaseLeverage: {
          inOutSum += history.collateralDeltaUsd;

          inOutChartData.push({
            value: history.collateralDeltaUsd,
            date,
          });

          break;
        }

        case PerpTradeHistoryOperation.DecreaseLeverage: {
          inOutSum -= history.collateralDeltaUsd;

          inOutChartData.push({
            value: -history.collateralDeltaUsd,
            date,
          });

          break;
        }

        case PerpTradeHistoryOperation.IncreaseSize: {
          inOutSum -= history.collateralDeltaUsd;

          inOutChartData.push({
            value: -history.collateralDeltaUsd,
            date,
          });

          break;
        }

        case PerpTradeHistoryOperation.DecreaseSize: {
          const value = history.collateralDeltaUsd + history.usdPnl;

          inOutSum += value;

          inOutChartData.push({
            value,
            date,
          });

          break;
        }
      }

      pnlChartData.push({
        value: history.usdPnl,
        date,
      });

      pnlAccChartData.push({
        value: pnlSum,
        date,
      });

      inOutAccChartData.push({
        value: inOutSum,
        date,
      });
    });
  }

  let slope = 0;
  let r2 = 0;

  if (pnlAccChartData.length >= 2) {
    const xs = pnlAccChartData.map((_, index) => index);
    const ys = pnlAccChartData.map((item) => item.value);

    try {
      const regression = new SimpleLinearRegression(xs, ys);
      const score = regression.score(xs, ys);

      slope = Number.isFinite(regression.slope) ? regression.slope : 0;
      r2 = Number.isFinite(score.r2) ? clamp(score.r2) : 0;
    } catch {
      slope = 0;
      r2 = 0;
    }
  }

  const leaderAvgCollateralUsd =
    countIn > 0 ? sumIn / countIn : summary.avgCollateral;

  const collateralBase = Math.max(leaderAvgCollateralUsd, 1);

  const sampleCount = positionPnls.length;

  const avgPositionPnl =
    sampleCount > 0
      ? positionPnls.reduce((sum, pnl) => sum + pnl, 0) / sampleCount
      : summary.avgPnl;

  const defaultWinRate =
    sampleCount > 0
      ? positionPnls.filter((pnl) => pnl > 0).length / sampleCount
      : 0;

  const reverseWinRate =
    sampleCount > 0
      ? positionPnls.filter((pnl) => pnl < 0).length / sampleCount
      : 0;

  const getMaxDrawdown = (values: number[]) => {
    if (values.length === 0) return 0;

    let peak = values[0];
    let maxDrawdown = 0;

    values.forEach((value) => {
      peak = Math.max(peak, value);
      maxDrawdown = Math.max(maxDrawdown, peak - value);
    });

    return maxDrawdown;
  };

  const getPositionSizeSuggestion = (leaderScore: number) => {
    const rawSuggestedCollateralUsd = standardCollateralUsd * leaderScore;

    const clampedCollateralUsd = clamp(
      rawSuggestedCollateralUsd,
      minCollateralUsd,
      maxCollateralUsd,
    );

    const rawRatio = clampedCollateralUsd / collateralBase;

    const suggestedRatio = clamp(rawRatio, minRatio, maxRatio);

    return {
      standardCollateralUsd,
      suggestedCollateralUsd: suggestedRatio * collateralBase,
      leaderAvgCollateralUsd: collateralBase,
      suggestedRatio,
    };
  };

  const pnlAccValues = pnlAccChartData.map((item) => item.value);

  const buildLeaderScore = (mode: "default" | "reverse") => {
    const isDefaultMode = mode === "default";

    /**
     * Default copy:
     *   positive slope is good.
     *
     * Reverse copy:
     *   negative slope is good, so we multiply slope by -1.
     */
    const signedSlope = isDefaultMode ? slope : -slope;

    const slopeScore = clamp(
      signedSlope / (collateralBase * excellentSlopeCollateralRatio),
    );

    /**
     * r2 close to 1 means the leader's PnL curve is consistent.
     * r2Power > 1 punishes noisy curves harder.
     */
    const r2Score = Math.pow(clamp(r2), r2Power);

    /**
     * Main trend score.
     *
     * A leader needs both:
     * - correct slope direction
     * - high r2
     */
    const trendScore = slopeScore * r2Score;

    const sampleScore = clamp(
      Math.sqrt(sampleCount / minPositionsForFullSampleScore),
    );

    const winRateScore = isDefaultMode ? defaultWinRate : reverseWinRate;

    const signedAvgPnl = isDefaultMode ? avgPositionPnl : -avgPositionPnl;

    const pnlQualityScore = clamp(
      signedAvgPnl / (collateralBase * excellentAvgPnlCollateralRatio),
    );

    const drawdownValues = isDefaultMode
      ? pnlAccValues
      : pnlAccValues.map((value) => -value);

    const maxDrawdown = getMaxDrawdown(drawdownValues);

    const drawdownBase = Math.max(
      collateralBase * drawdownCollateralMultiplier,
      Math.abs(drawdownValues[drawdownValues.length - 1] ?? 0),
      1,
    );

    const drawdownScore = 1 - clamp(maxDrawdown / drawdownBase);

    const leverageScore =
      1 -
      clamp((summary.avgLeverage - 1) / Math.max(maxReasonableLeverage - 1, 1));

    /**
     * Final leader score.
     *
     * Most weight goes to trendScore because your main requirement is:
     * - default mode: higher positive slope + r2 close to 1
     * - reverse mode: lower negative slope + r2 close to 1
     */
    const score = clamp(
      trendScore * 0.55 +
        sampleScore * 0.1 +
        winRateScore * 0.1 +
        pnlQualityScore * 0.1 +
        drawdownScore * 0.1 +
        leverageScore * 0.05,
    );

    return {
      score,
      slopeScore,
      r2Score,
      trendScore,
      sampleScore,
      winRateScore,
      pnlQualityScore,
      drawdownScore,
      leverageScore,
      positionSizeSuggestion: getPositionSizeSuggestion(score),
    };
  };

  const defaultCopy = buildLeaderScore("default");
  const reverseCopy = buildLeaderScore("reverse");

  return {
    sortedHistories,
    missionHistories,
    pnlChartData,
    pnlAccChartData,
    inOutChartData,
    inOutAccChartData,
    minIn: countIn > 0 ? minIn : 0,
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
    slope,
    r2,
    copyTrading: {
      standardCollateralUsd,
      leaderAvgCollateralUsd: collateralBase,
      defaultCopy,
      reverseCopy,
    },
  };
}
