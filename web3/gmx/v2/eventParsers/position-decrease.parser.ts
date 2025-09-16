import { PerpTradeHistoryOperation } from "@/graphql/gql/graphql";
import { PerpTradeHistory } from "../../../types";
import { getMarketInfo } from "../configs";

export const eventName = "PositionDecrease";

export type PositionDecreaseEventArgs = {
  account: `0x${string}`;
  market: `0x${string}`;
  collateralToken: `0x${string}`;
  sizeInUsd: bigint;
  sizeInTokens: bigint;
  collateralAmount: bigint;
  borrowingFactor: bigint;
  fundingFeeAmountPerSize: bigint;
  longTokenClaimableFundingAmountPerSize: bigint;
  shortTokenClaimableFundingAmountPerSize: bigint;
  executionPrice: bigint;
  "indexTokenPrice.max": bigint;
  "indexTokenPrice.min": bigint;
  "collateralTokenPrice.max": bigint;
  "collateralTokenPrice.min": bigint;
  sizeDeltaUsd: bigint;
  sizeDeltaInTokens: bigint;
  collateralDeltaAmount: bigint;
  "values.priceImpactDiffUsd": bigint;
  orderType: bigint;
  decreasedAtTime: bigint;
  priceImpactUsd: bigint;
  proportionalPendingImpactUsd?: bigint;
  totalImpactUsd?: bigint;
  basePnlUsd: bigint;
  uncappedBasePnlUsd: bigint;
  isLong: boolean;
  orderKey: `0x${string}`;
  positionKey: `0x${string}`;
};

export type PositionDecreaseEvent = {
  eventName: typeof eventName;
  args: PositionDecreaseEventArgs;
};

export function eventToPerpTradeHistory(
  chainId: number,
  event: PositionDecreaseEvent,
): PerpTradeHistory | null {
  const usdPnl =
    Number(event.args.basePnlUsd?.toString() || "0") / 1e30 +
    Number(
      event.args.totalImpactUsd?.toString() ||
        event.args.priceImpactUsd?.toString() ||
        "0",
    ) /
      1e30;

  const sizeInUsd = Number(event.args.sizeInUsd) / 1e30;
  const collateralInUsd =
    (Number(event.args.collateralAmount) *
      Number(event.args["collateralTokenPrice.max"])) /
    1e30;
  const sizeDeltaUsd = Number(event.args.sizeDeltaUsd) / 1e30;
  const collateralDeltaUsd =
    (Number(event.args.collateralDeltaAmount) *
      Number(event.args["collateralTokenPrice.max"])) /
    1e30;

  const leverageDelta =
    collateralDeltaUsd > 0
      ? Math.floor((sizeDeltaUsd / collateralDeltaUsd) * 1e3) / 1e3
      : 0;
  const leverage =
    collateralInUsd > 0
      ? Math.floor((sizeInUsd / collateralInUsd) * 1e3) / 1e3
      : 0;

  let operation: PerpTradeHistoryOperation =
    PerpTradeHistoryOperation.DecreaseSize;

  if (Number(event.args.sizeInUsd) === 0) {
    operation = PerpTradeHistoryOperation.Close;
  }

  if (Number(event.args.sizeDeltaUsd) === 0) {
    operation = PerpTradeHistoryOperation.IncreaseLeverage;
  }

  const marketInfo = getMarketInfo(chainId, event.args.market);

  const pair = marketInfo
    ? `${marketInfo.indexToken.baseSymbol || marketInfo.indexToken.symbol}/usd`.toLowerCase()
    : "";

  return {
    positionKey: event.args.positionKey,
    address: event.args.account,
    pair,
    operation,
    usdPnl,
    sizeInUsd,
    leverage,
    collateralInUsd,
    collateralDeltaUsd,
    sizeDeltaUsd,
    leverageDelta,
    isLong: event.args.isLong,
    price:
      Number(event.args.executionPrice) /
      Math.pow(10, 30 - (marketInfo?.indexToken.decimals || 0)),
  };
}

export const positionDecreaseEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
