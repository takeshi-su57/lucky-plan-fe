import { Platform } from "@/graphql/gql/graphql";

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

export enum TradeActionType {
  TradeOpenedMarket = "TradeOpenedMarket",
  TradeOpenedLimit = "TradeOpenedLimit",
  TradeClosedMarket = "TradeClosedMarket",
  TradeClosedLIQ = "TradeClosedLIQ",
  TradeClosedSL = "TradeClosedSL",
  TradeClosedTP = "TradeClosedTP",
  TradeLeverageUpdate = "TradeLeverageUpdate",
  TradePosSizeIncrease = "TradePosSizeIncrease",
  TradePosSizeDecrease = "TradePosSizeDecrease",
}

export type VirtualStrategy = {
  collateralBaseline: number;
  lifeTime: number;
  maxCollateral: number;
  maxLeverage: number;
  minCollateral: number;
  minLeverage: number;
  ratio: number;
};

export type ContractItem = {
  contractId: number;
  chainId: number;
  address: string;
  backendUrl: string;
};

export type VirtualBot = {
  virtualId: string;
  followerContract: ContractItem;
  leaderAddress: string;
  leaderContract: ContractItem;
  leaderCollateralBaseline: number;
  strategy: VirtualStrategy;
};

export type VirtualBotParams = Partial<VirtualBot> & {
  virtualId: string;
  leaderAddress: string;
  platform: Platform;
};

export type LeaderParams = {
  virtualId: string;
  address: string;
  isConfirmed: boolean;
};

export enum ServiceStatus {
  READY = "ready",
  PROCESS = "process",
  PAUSED = "paused",
  KILLED = "killed",
}

export type SLTPCondition = {
  type: "price" | "percentage";
  isLong: boolean;
  pair: string;
  params: PercentageCondition | PriceConditionParams;
  updatedAt: string;
};

export type PercentageCondition = {
  percentage: number;
  initialPrice: number;
  highestPrice: number;
  exceptionPrice: number;
};

export type PriceConditionParams = {
  kind: "tp" | "sl";
  trigger: number;
};
