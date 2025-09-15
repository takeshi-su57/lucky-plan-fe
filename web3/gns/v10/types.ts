import { Address } from "viem";

import { MarketExecutedEvent } from "./eventParsers/market-executed.parser";
import { LimitExecutedEvent } from "./eventParsers/limit-executed.parser";
import { TradeMaxClosingSlippagePUpdatedEvent } from "./eventParsers/trade-max-closing-slippage-p-updated.parser";
import { LeverageUpdateExecutedEvent } from "./eventParsers/leverage-update-executed.parser";
import { PositionSizeDecreaseExecutedEvent } from "./eventParsers/position-size-decrease-executed.parser";
import { PositionSizeIncreaseExecutedEvent } from "./eventParsers/position-size-increase-executed.parser";
import { MarketOrderInitiatedEvent } from "./eventParsers/market-order-initiated.parser";
import { MarketOpenCanceledEvent } from "./eventParsers/market-open-canceled";
import { MarketCloseCanceledEvent } from "./eventParsers/market-close-canceled";

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
  depth: {
    onePercentDepthAboveUsd: bigint;
    onePercentDepthBelowUsd: bigint;
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

export type Trade = MarketExecutedEvent["args"]["t"];

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

export type MissionEventType =
  | MarketExecutedEvent
  | LimitExecutedEvent
  | MarketOrderInitiatedEvent;
export type TaskEventType =
  | TradeMaxClosingSlippagePUpdatedEvent
  | LeverageUpdateExecutedEvent
  | PositionSizeDecreaseExecutedEvent
  | PositionSizeIncreaseExecutedEvent;
export type TrackEventType =
  | MarketOrderInitiatedEvent
  | MarketOpenCanceledEvent
  | MarketCloseCanceledEvent;

export type RegisteredEventType =
  | MissionEventType
  | TaskEventType
  | TrackEventType;
