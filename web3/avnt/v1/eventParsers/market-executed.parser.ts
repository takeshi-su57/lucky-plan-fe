import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { tradingCallbackAbi } from "../abi/ICallback";
import { getAvntPositionKey } from "../../utils";
import { PerpTradeHistory } from "@/web3/types";
import { PerpTradeHistoryOperation } from "@/graphql/gql/graphql";
import { getPairName } from "../configs";

export const eventName = "MarketExecuted";

export const abiItem = getAbiItem({
  abi: tradingCallbackAbi,
  name: eventName,
});

export type MarketExecutedEvent = DecodeEventLogReturnType<
  typeof tradingCallbackAbi,
  typeof eventName
>;
export type MarketExecutedEventArgs = MarketExecutedEvent["args"];

export function eventToPerpTradeHistory(
  event: MarketExecutedEvent,
): PerpTradeHistory | null {
  const pairName = getPairName(Number(event.args.t.pairIndex));

  if (!pairName) {
    return null;
  }

  const operation = event.args.open
    ? PerpTradeHistoryOperation.Open
    : PerpTradeHistoryOperation.Close;

  const usdPnl =
    operation === PerpTradeHistoryOperation.Open
      ? 0
      : Number(
          (Number(event.args.usdcSentToTrader) -
            Number(event.args.positionSizeUSDC)) /
            1e6,
        );

  const collateralUsd = Number(Number(event.args.t.initialPosToken) / 1e6);

  const collateralInUsd = PerpTradeHistoryOperation.Open ? collateralUsd : 0;
  const leverage = Number(event.args.t.leverage) / 1e10;

  const sizeInUsd = collateralInUsd * leverage;

  const collateralDeltaUsd = PerpTradeHistoryOperation.Open ? 0 : collateralUsd;
  const leverageDelta = Number(event.args.t.leverage) / 1e10;
  const sizeDeltaUsd = collateralDeltaUsd * leverageDelta;

  return {
    positionKey: getAvntPositionKey(
      event.args.t.trader,
      Number(event.args.t.index),
    ),
    address: event.args.t.trader.toLowerCase() as `0x${string}`,
    pair: pairName,
    operation,
    usdPnl,
    sizeInUsd,
    leverage,
    collateralInUsd,
    collateralDeltaUsd,
    sizeDeltaUsd,
    leverageDelta,
    isLong: event.args.t.buy,
    price: Number(event.args.price) / 1e10,
  };
}

export const marketExecutedEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
