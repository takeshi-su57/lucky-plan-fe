import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { gnsMultiCollatDiamondAbi } from "../abi/GNSMultiCollatDiamond";

import { PerpTradeHistory } from "../../../types";

export const eventName = "TradeMaxClosingSlippagePUpdated";

export const abiItem = getAbiItem({
  abi: gnsMultiCollatDiamondAbi,
  name: eventName,
});

export type TradeMaxClosingSlippagePUpdatedEvent = DecodeEventLogReturnType<
  typeof gnsMultiCollatDiamondAbi,
  typeof eventName
>;
export type TradeMaxClosingSlippagePUpdatedEventArgs =
  TradeMaxClosingSlippagePUpdatedEvent["args"];

export function eventToPerpTradeHistory(
  _chainId: number,
  _event: TradeMaxClosingSlippagePUpdatedEvent,
): PerpTradeHistory | null {
  return null;
}

export const tradeMaxClosingSlippagePUpdatedEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
