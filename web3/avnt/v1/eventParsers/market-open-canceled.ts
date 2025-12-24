import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { tradingCallbackAbi } from "../abi/ICallback";

import { PerpTradeHistory } from "@/web3/types";

export const eventName = "MarketOpenCanceled";

export const abiItem = getAbiItem({
  abi: tradingCallbackAbi,
  name: eventName,
});

export type MarketOpenCanceledEvent = DecodeEventLogReturnType<
  typeof tradingCallbackAbi,
  typeof eventName
>;
export type MarketOpenCanceledEventArgs = MarketOpenCanceledEvent["args"];

export function eventToPerpTradeHistory(
  _event: MarketOpenCanceledEvent,
): PerpTradeHistory | null {
  return null;
}

export const marketOpenCanceledEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
