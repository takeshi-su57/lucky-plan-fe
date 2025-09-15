import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { gnsMultiCollatDiamondAbi } from "../abi/GNSMultiCollatDiamond";

import { PerpTradeHistory } from "../../../types";

export const eventName = "TradePositivePnlWithdrawn";

export const abiItem = getAbiItem({
  abi: gnsMultiCollatDiamondAbi,
  name: eventName,
});

export type TradePositivePnlWithdrawnEvent = DecodeEventLogReturnType<
  typeof gnsMultiCollatDiamondAbi,
  typeof eventName
>;
export type TradePositivePnlWithdrawnEventArgs =
  TradePositivePnlWithdrawnEvent["args"];

export function eventToPerpTradeHistory(
  _chainId: number,
  _event: TradePositivePnlWithdrawnEvent,
): PerpTradeHistory | null {
  return null;
}

export const tradePositivePnlWithdrawnEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
