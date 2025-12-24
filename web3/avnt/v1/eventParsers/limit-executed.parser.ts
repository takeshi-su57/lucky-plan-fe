import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { tradingCallbackAbi } from "../abi/ICallback";
import { getAvntPositionKey } from "../../utils";
import { PerpTradeHistory } from "@/web3/types";
import { PerpTradeHistoryOperation } from "@/graphql/gql/graphql";
import { getPairName } from "../configs";
import { LimitOrder } from "../types";

export const eventName = "LimitExecuted";

export const abiItem = getAbiItem({
  abi: tradingCallbackAbi,
  name: eventName,
});

export type LimitExecutedEvent = DecodeEventLogReturnType<
  typeof tradingCallbackAbi,
  typeof eventName
>;
export type LimitExecutedEventArgs = LimitExecutedEvent["args"];

export function eventToPerpTradeHistory(
  event: LimitExecutedEvent,
): PerpTradeHistory | null {
  const pairName = getPairName(Number(event.args.t.pairIndex));

  const operationMap: Record<string, PerpTradeHistoryOperation> = {
    [LimitOrder.OPEN]: PerpTradeHistoryOperation.Open,
    [LimitOrder.LIQ]: PerpTradeHistoryOperation.Close,
    [LimitOrder.SL]: PerpTradeHistoryOperation.Close,
    [LimitOrder.TP]: PerpTradeHistoryOperation.Close,
  };

  if (!operationMap[event.args.orderType] || !pairName) {
    return null;
  }

  const operation = operationMap[event.args.orderType];

  const usdPnl =
    operation === PerpTradeHistoryOperation.Open
      ? 0
      : (Number(event.args.usdcSentToTrader) -
          Number(event.args.positionSizeUSDC)) /
        1e6;

  const collateralUsd = Number(event.args.positionSizeUSDC) / 1e6;

  const collateralInUsd =
    operation === PerpTradeHistoryOperation.Open ? collateralUsd : 0;
  const leverage = Number(event.args.t.leverage) / 1e10;

  const sizeInUsd = collateralInUsd * leverage;

  const collateralDeltaUsd =
    operation === PerpTradeHistoryOperation.Open ? 0 : collateralUsd;
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

export const limitExecutedEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
