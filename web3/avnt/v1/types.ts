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
