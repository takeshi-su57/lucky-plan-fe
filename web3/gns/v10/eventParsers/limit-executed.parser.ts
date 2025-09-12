import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { gnsMultiCollatDiamondAbi } from "../abi/GNSMultiCollatDiamond";
import { getGnsPositionKey } from "../../utils";
import { PerpTradeHistory } from "../../../types";
import { getCollateral, getPairName } from "../configs";
import { PendingOrderType } from "../types";

export const eventName = "LimitExecuted";

export const abiItem = getAbiItem({
  abi: gnsMultiCollatDiamondAbi,
  name: eventName,
});

export type LimitExecutedEvent = DecodeEventLogReturnType<
  typeof gnsMultiCollatDiamondAbi,
  typeof eventName
>;
export type LimitExecutedEventArgs = LimitExecutedEvent["args"];

export function eventToPerpTradeHistory(
  chainId: number,
  event: LimitExecutedEvent,
): PerpTradeHistory | null {
  const collateral = getCollateral(chainId, event.args.t.collateralIndex);

  const pairName = getPairName(chainId, Number(event.args.t.pairIndex));

  const operationMap: Record<string, "open" | "close"> = {
    [PendingOrderType.LIMIT_OPEN]: "open",
    [PendingOrderType.LIQ_CLOSE]: "close",
    [PendingOrderType.SL_CLOSE]: "close",
    [PendingOrderType.TP_CLOSE]: "close",
  };

  if (!operationMap[event.args.orderType] || !collateral || !pairName) {
    return null;
  }

  const operation = operationMap[event.args.orderType];

  const collateralUsdPrice = Number(event.args.collateralPriceUsd) / 1e8;

  const usdPnl =
    operation === "open"
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

  const collateralInUsd = operation === "open" ? collateralUsd : 0;
  const leverage = Number(event.args.t.leverage) / 1e3;

  const sizeInUsd = collateralInUsd * leverage;

  const collateralDeltaUsd = operation === "open" ? 0 : collateralUsd;
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
  };
}

export const limitExecutedEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
