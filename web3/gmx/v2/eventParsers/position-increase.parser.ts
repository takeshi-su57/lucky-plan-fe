import { PerpTradeHistory } from "../../../types";
import { getMarketInfo } from "../configs";

export const eventName = "PositionIncrease";

export type PositionIncreaseEventArgs = {
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
  orderType: bigint;
  increasedAtTime: bigint;
  collateralDeltaAmount: bigint;
  priceImpactUsd?: bigint;
  priceImpactAmount?: bigint;
  pendingPriceImpactUsd?: bigint;
  pendingPriceImpactAmount?: bigint;
  isLong: boolean;
  orderKey: `0x${string}`;
  positionKey: `0x${string}`;
};

export type PositionIncreaseEvent = {
  eventName: typeof eventName;
  args: PositionIncreaseEventArgs;
};

export function eventToPerpTradeHistory(
  chainId: number,
  event: PositionIncreaseEvent,
): PerpTradeHistory | null {
  const usdPnl =
    Number(
      event.args.priceImpactUsd?.toString() ||
        event.args.pendingPriceImpactUsd?.toString() ||
        "0",
    ) / 1e30;

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
    Math.floor((sizeDeltaUsd / collateralDeltaUsd) * 1e3) / 1e3;
  const leverage = Math.floor((sizeInUsd / collateralInUsd) * 1e3) / 1e3;

  let operation: "decreaseLeverage" | "close" | "open" | "increaseSize" =
    "increaseSize";

  if (Number(event.args.sizeInUsd) === Number(event.args.sizeDeltaUsd)) {
    operation = "open";
  }

  if (Number(event.args.sizeDeltaUsd) === 0) {
    operation = "decreaseLeverage";
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

export const positionIncreaseEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
