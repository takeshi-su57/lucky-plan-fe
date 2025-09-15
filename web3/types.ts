import { Address } from "viem";

export type PerpTradeHistory = {
  positionKey: string;
  address: Address;
  pair: string;
  operation:
    | "open"
    | "close"
    | "increaseSize"
    | "decreaseSize"
    | "increaseLeverage"
    | "decreaseLeverage";
  usdPnl: number;
  sizeInUsd: number;
  leverage: number;
  collateralInUsd: number;
  collateralDeltaUsd: number;
  sizeDeltaUsd: number;
  leverageDelta: number;
  isLong: boolean;
  price: number;
};
