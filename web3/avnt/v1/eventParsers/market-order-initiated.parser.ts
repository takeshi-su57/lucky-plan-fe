import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { tradingAbi } from "../abi/Trading";
import { PerpTradeHistory } from "@/web3/types";

export const eventName = "MarketOrderInitiated";

export const abiItem = getAbiItem({
  abi: tradingAbi,
  name: eventName,
});

export type MarketOrderInitiatedEvent = DecodeEventLogReturnType<
  typeof tradingAbi,
  typeof eventName
>;
export type MarketOrderInitiatedEventArgs = MarketOrderInitiatedEvent["args"];

export function eventToPerpTradeHistory(
  _event: MarketOrderInitiatedEvent,
): PerpTradeHistory | null {
  return null;
}

export const marketOrderInitiatedEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
