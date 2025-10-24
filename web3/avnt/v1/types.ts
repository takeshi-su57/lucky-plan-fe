import { MarketExecutedEvent } from './eventParsers/market-executed.parser';
import { LimitExecutedEvent } from './eventParsers/limit-executed.parser';
import { MarketOrderInitiatedEvent } from './eventParsers/market-order-initiated.parser';
import { MarginUpdateEvent } from './eventParsers/margin-update-executed.parser';
import { MarketOpenCanceledEvent } from './eventParsers/market-open-canceled';

export enum LimitOrder {
  TP,
  SL,
  LIQ,
  OPEN,
}

export enum MarginUpdateType {
  DEPOSIT,
  WITHDRAW,
}

export type Pair = {
  pairIndex: number;
  from: string;
  to: string;
  numTiers: string;
};

export type RegisteredEventType =
  | MarketExecutedEvent
  | LimitExecutedEvent
  | MarketOrderInitiatedEvent
  | MarginUpdateEvent
  | MarketOpenCanceledEvent;
