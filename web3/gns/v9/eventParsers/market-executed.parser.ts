import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { gnsMultiCollatDiamondAbi } from "../abi/GNSMultiCollatDiamond";
import { getGnsPositionKey } from "../../utils";
import { PerpTradeHistory } from "../../../types";
import { getCollateral, getPairName } from "../configs";
import { PerpTradeHistoryOperation } from "@/graphql/gql/graphql";

export const eventName = "MarketExecuted";

export const abiItem = getAbiItem({
  abi: gnsMultiCollatDiamondAbi,
  name: eventName,
});

export type MarketExecutedEvent = DecodeEventLogReturnType<
  typeof gnsMultiCollatDiamondAbi,
  typeof eventName
>;
export type MarketExecutedEventArgs = MarketExecutedEvent["args"];

export function eventToPerpTradeHistory(
  chainId: number,
  event: MarketExecutedEvent,
): PerpTradeHistory | null {
  const collateral = getCollateral(chainId, event.args.t.collateralIndex);

  const pairName = getPairName(chainId, Number(event.args.t.pairIndex));

  if (!collateral || !pairName) {
    return null;
  }

  const operation = event.args.open
    ? PerpTradeHistoryOperation.Open
    : PerpTradeHistoryOperation.Close;

  const collateralUsdPrice = Number(event.args.collateralPriceUsd) / 1e8;

  const usdPnl =
    operation === PerpTradeHistoryOperation.Open
      ? 0
      : Number(
          (Number(event.args.amountSentToTrader) -
            Number(event.args.t.collateralAmount)) /
            Number(collateral.precision),
        ) * collateralUsdPrice;

  const collateralUsd =
    Number(
      Number(event.args.t.collateralAmount) / Number(collateral.precision),
    ) * collateralUsdPrice;

  const collateralInUsd =
    operation === PerpTradeHistoryOperation.Open ? collateralUsd : 0;
  const leverage = Number(event.args.t.leverage) / 1e3;

  const sizeInUsd = collateralInUsd * leverage;

  const collateralDeltaUsd =
    operation === PerpTradeHistoryOperation.Open ? 0 : collateralUsd;
  const leverageDelta = Number(event.args.t.leverage) / 1e3;
  const sizeDeltaUsd = collateralDeltaUsd * leverageDelta;

  return {
    positionKey: getGnsPositionKey(event.args.user, Number(event.args.index)),
    address: event.args.user.toLowerCase() as `0x${string}`,
    pair: pairName,
    operation,
    usdPnl,
    sizeInUsd,
    leverage,
    collateralInUsd,
    collateralDeltaUsd,
    sizeDeltaUsd,
    leverageDelta,
    isLong: event.args.t.long,
    price: Number(event.args.oraclePrice) / 1e10,
  };
}

export const marketExecutedEventParser = {
  eventName,

  eventToPerpTradeHistory,
};
