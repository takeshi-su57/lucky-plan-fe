import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { gnsMultiCollatDiamondAbi } from "../abi/GNSMultiCollatDiamond";

import { getGnsPositionKey } from "../../utils";
import { PerpTradeHistory } from "../../../types";
import { getCollateral, getPairName } from "../configs";
import { CancelReason } from "../types";

export const eventName = "PositionSizeIncreaseExecuted";

export const abiItem = getAbiItem({
  abi: gnsMultiCollatDiamondAbi,
  name: eventName,
});

export type PositionSizeIncreaseExecutedEvent = DecodeEventLogReturnType<
  typeof gnsMultiCollatDiamondAbi,
  typeof eventName
>;
export type PositionSizeIncreaseExecutedEventArgs =
  PositionSizeIncreaseExecutedEvent["args"];

export function eventToPerpTradeHistory(
  chainId: number,
  event: PositionSizeIncreaseExecutedEvent,
): PerpTradeHistory | null {
  const collateral = getCollateral(chainId, event.args.collateralIndex);

  const pairName = getPairName(chainId, Number(event.args.pairIndex));

  if (
    !collateral ||
    !pairName ||
    event.args.cancelReason !== CancelReason.NONE
  ) {
    return null;
  }

  const collateralUsdPrice = Number(event.args.collateralPriceUsd) / 1e8;

  const usdPnl =
    -Number(
      Number(event.args.values.borrowingFeeCollateral) /
        Number(collateral.precision),
    ) * collateralUsdPrice;

  const collateralInUsd =
    Number(
      Number(event.args.values.newCollateralAmount) /
        Number(collateral.precision),
    ) * collateralUsdPrice;
  const leverage = Number(event.args.values.newLeverage) / 1e3;

  const sizeInUsd = collateralInUsd * leverage;

  const collateralDeltaUsd =
    (Number(event.args.collateralDelta) / Number(collateral.precision)) *
    collateralUsdPrice;
  const leverageDelta = Number(event.args.leverageDelta) / 1e3;
  const sizeDeltaUsd = collateralDeltaUsd * leverageDelta;

  return {
    positionKey: getGnsPositionKey(event.args.trader, Number(event.args.index)),
    address: event.args.trader.toLowerCase() as `0x${string}`,
    pair: pairName,
    operation: "increaseSize",
    usdPnl,
    sizeInUsd,
    leverage,
    collateralInUsd,
    collateralDeltaUsd,
    sizeDeltaUsd,
    leverageDelta,
    isLong: event.args.long,
    price: Number(event.args.oraclePrice) / 1e10,
  };
}

export const positionSizeIncreaseExecutedEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
