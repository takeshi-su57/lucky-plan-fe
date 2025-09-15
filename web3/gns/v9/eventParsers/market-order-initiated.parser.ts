import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { gnsMultiCollatDiamondAbi } from "../abi/GNSMultiCollatDiamond";

import { PerpTradeHistory } from "../../../types";

export const eventName = "MarketOrderInitiated";

export const abiItem = getAbiItem({
  abi: gnsMultiCollatDiamondAbi,
  name: eventName,
});

export type MarketOrderInitiatedEvent = DecodeEventLogReturnType<
  typeof gnsMultiCollatDiamondAbi,
  typeof eventName
>;
export type MarketOrderInitiatedEventArgs = MarketOrderInitiatedEvent["args"];

export function eventToPerpTradeHistory(
  _chainId: number,
  _event: MarketOrderInitiatedEvent,
): PerpTradeHistory | null {
  return null;
}

export const marketOrderInitiatedEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
