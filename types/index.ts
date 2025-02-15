import { BotDetails, Contract } from "@/graphql/gql/graphql";

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

export type PersonalTradeHistory = {
  action: TradeActionType;
  address: string;
  block: number;
  collateralDelta: number | null;
  collateralIndex: number;
  collateralPriceUsd: number;
  date: string;
  leverage: number;
  leverageDelta: number | null;
  long: number;
  marketPrice: number | null;
  pair: string;
  pnl: number;
  pnl_net: number;
  price: number;
  size: number;
  tradeId: number | null;
  tradeIndex: number;
  tx: string;
};

export type VirtualStrategy = {
  collateralBaseline: number;
  lifeTime: number;
  maxCollateral: number;
  maxLeverage: number;
  minCollateral: number;
  minLeverage: number;
  ratio: number;
  strategyKey: string;
};

export type VirtualBot = {
  virtualId: string;
  followerAddress: string;
  followerContract: {
    contractId: number;
    chainId: number;
    address: string;
    backendUrl: string;
  };
  leaderAddress: string;
  leaderContract: {
    contractId: number;
    chainId: number;
    address: string;
    backendUrl: string;
  };
  leaderCollateralBaseline: number;
  strategy: VirtualStrategy;
};
