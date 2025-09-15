import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { gnsMultiCollatDiamondAbi } from "../abi/GNSMultiCollatDiamond";
import { getGnsPositionKey } from "../../utils";
import { PerpTradeHistory } from "../../../types";
import { getCollateral, getPairName } from "../configs";
import { PendingOrderType } from "../types";
import { PerpTradeHistoryOperation } from "@/graphql/gql/graphql";

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

  const operationMap: Record<string, PerpTradeHistoryOperation> = {
    [PendingOrderType.LIMIT_OPEN]: PerpTradeHistoryOperation.Open,
    [PendingOrderType.LIQ_CLOSE]: PerpTradeHistoryOperation.Close,
    [PendingOrderType.SL_CLOSE]: PerpTradeHistoryOperation.Close,
    [PendingOrderType.TP_CLOSE]: PerpTradeHistoryOperation.Close,
  };

  if (!operationMap[event.args.orderType] || !collateral || !pairName) {
    return null;
  }

  const operation = operationMap[event.args.orderType];

  const collateralUsdPrice = Number(event.args.collateralPriceUsd) / 1e8;

  const usdPnl =
    operation === PerpTradeHistoryOperation.Open
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

  const collateralInUsd =
    operation === PerpTradeHistoryOperation.Open ? collateralUsd : 0;
  const leverage = Number(event.args.t.leverage) / 1e3;

  const sizeInUsd = collateralInUsd * leverage;

  const collateralDeltaUsd =
    operation === PerpTradeHistoryOperation.Open ? 0 : collateralUsd;
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
    isLong: event.args.t.long,
    price: Number(event.args.oraclePrice) / 1e10,
  };
}

export const limitExecutedEventParser = {
  eventName,

  eventToPerpTradeHistory,
};
