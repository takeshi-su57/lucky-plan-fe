import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { gnsMultiCollatDiamondAbi } from "../abi/GNSMultiCollatDiamond";
import { PerpTradeHistory } from "../../../types";

export const eventName = "MarketCloseCanceled";

export const abiItem = getAbiItem({
  abi: gnsMultiCollatDiamondAbi,
  name: eventName,
});

export type MarketCloseCanceledEvent = DecodeEventLogReturnType<
  typeof gnsMultiCollatDiamondAbi,
  typeof eventName
>;
export type MarketCloseCanceledEventArgs = MarketCloseCanceledEvent["args"];

export function eventToPerpTradeHistory(
  _chainId: number,
  _event: MarketCloseCanceledEvent,
): PerpTradeHistory | null {
  return null;
}

export const marketCloseCanceledEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
