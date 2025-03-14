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
  leaderContract: ContractItem;
  leaderCollateralBaseline: number;
};
