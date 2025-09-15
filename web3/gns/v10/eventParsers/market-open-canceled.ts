import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { gnsMultiCollatDiamondAbi } from "../abi/GNSMultiCollatDiamond";
import { PerpTradeHistory } from "../../../types";

export const eventName = "MarketOpenCanceled";

export const abiItem = getAbiItem({
  abi: gnsMultiCollatDiamondAbi,
  name: eventName,
});

export type MarketOpenCanceledEvent = DecodeEventLogReturnType<
  typeof gnsMultiCollatDiamondAbi,
  typeof eventName
>;
export type MarketOpenCanceledEventArgs = MarketOpenCanceledEvent["args"];

export function eventToPerpTradeHistory(
  _chainId: number,
  _event: MarketOpenCanceledEvent,
): PerpTradeHistory | null {
  return null;
}

export const marketOpenCanceledEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
