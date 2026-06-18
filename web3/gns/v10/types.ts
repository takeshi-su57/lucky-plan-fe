import { Address } from "viem";

export enum TradeType {
  TRADE,
  LIMIT,
  STOP,
}

export enum PendingOrderType {
  MARKET_OPEN,
  MARKET_CLOSE,
  LIMIT_OPEN,
  STOP_OPEN,
  TP_CLOSE,
  SL_CLOSE,
  LIQ_CLOSE,
  UPDATE_LEVERAGE,
  MARKET_PARTIAL_OPEN,
  MARKET_PARTIAL_CLOSE,
}

export enum CancelReason {
  NONE,
  PAUSED, // deprecated
  MARKET_CLOSED,
  SLIPPAGE,
  TP_REACHED,
  SL_REACHED,
  EXPOSURE_LIMITS,
  PRICE_IMPACT,
  MAX_LEVERAGE,
  NO_TRADE,
  WRONG_TRADE, // deprecated
  NOT_HIT,
  LIQ_REACHED,
}

export enum ContractsVersion {
  BEFORE_V9_2,
  V9_2,
}

export type Pair = {
  pairIndex: number;
  from: string;
  to: string;
  feed: {
    feed1: Address;
    feed2: Address;
    feedCalculation: number;
    maxDeviationP: bigint;
  };
  spreadP: bigint;
  groupIndex: bigint;
  feeIndex: bigint;
};

export type Collateral = {
  collateralIndex: number;
  collateral: Address;
  isActive: boolean;
  precision: bigint;
  precisionDelta: bigint;
  __placeholder: bigint;
};

export type Id = {
  user: Address;
  index: number;
};

export type TradeInfo = {
  createdBlock: number;
  tpLastUpdatedBlock: number;
  slLastUpdatedBlock: number;
  maxSlippageP: number;
  lastOiUpdateTs: number;
  collateralPriceUsd: number;
  contractsVersion: ContractsVersion;
  lastPosIncreaseBlock: number;
  __placeholder: number;
};

export type TradingVariable = {
  pairs: (Pair | undefined)[];
  collaterals: Collateral[];
};
