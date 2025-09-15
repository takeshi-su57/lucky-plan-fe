import { DecodeEventLogReturnType, getAbiItem } from "viem";
import { gnsMultiCollatDiamondAbi } from "../abi/GNSMultiCollatDiamond";
import { getGnsPositionKey } from "../../utils";
import { PerpTradeHistory } from "../../../types";
import { getCollateral, getPairName } from "../configs";

export const eventName = "LeverageUpdateExecuted";

export const abiItem = getAbiItem({
  abi: gnsMultiCollatDiamondAbi,
  name: eventName,
});

export type LeverageUpdateExecutedEvent = DecodeEventLogReturnType<
  typeof gnsMultiCollatDiamondAbi,
  typeof eventName
>;
export type LeverageUpdateExecutedEventArgs =
  LeverageUpdateExecutedEvent["args"];

export function eventToPerpTradeHistory(
  chainId: number,
  event: LeverageUpdateExecutedEvent,
): PerpTradeHistory | null {
  const collateral = getCollateral(chainId, event.args.collateralIndex);

  const pairName = getPairName(chainId, Number(event.args.pairIndex));

  if (!collateral || !pairName) {
    return null;
  }

  const usdPnl = 0;

  const collateralUsdPrice = 0;

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
  const leverageDelta = 0;
  const sizeDeltaUsd = collateralDeltaUsd * leverageDelta;

  return {
    positionKey: getGnsPositionKey(event.args.trader, Number(event.args.index)),
    address: event.args.trader.toLowerCase() as `0x${string}`,
    pair: pairName,
    operation: event.args.isIncrease ? "increaseLeverage" : "decreaseLeverage",
    usdPnl,
    sizeInUsd,
    leverage,
    collateralInUsd,
    collateralDeltaUsd,
    sizeDeltaUsd,
    leverageDelta,
    isLong: true,
    price: Number(event.args.oraclePrice) / 1e10,
  };
}

export const leverageUpdateExecutedEventParser = {
  eventName,
  eventToPerpTradeHistory,
};
