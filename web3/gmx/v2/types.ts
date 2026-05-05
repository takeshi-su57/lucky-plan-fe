export type TokenCategory = "meme" | "layer1" | "layer2" | "defi" | "rwa";

export type Token = {
  name: string;
  symbol: string;
  assetSymbol?: string;
  baseSymbol?: string;
  decimals: number;
  address: string;
  priceDecimals?: number;
  visualMultiplier?: number;
  visualPrefix?: string;
  wrappedAddress?: string;
  coingeckoUrl?: string;
  coingeckoSymbol?: string;
  metamaskSymbol?: string;
  explorerSymbol?: string;
  explorerUrl?: string;
  reservesUrl?: string;
  imageUrl?: string;
  categories?: TokenCategory[];
  isPermitSupported?: boolean;
  isPermitDisabled?: boolean;
  contractVersion?: string;
  searchAliases?: string[];

  isUsdg?: boolean;
  isNative?: boolean;
  isWrapped?: boolean;
  isShortable?: boolean;
  isStable?: boolean;
  isSynthetic?: boolean;
  isTempHidden?: boolean;
  isChartDisabled?: boolean;
  isV1Available?: boolean;
  isPlatformToken?: boolean;
  isPlatformTradingToken?: boolean;
  isStaking?: boolean;
  shouldResetAllowance?: boolean;
};

export type MarketConfig = {
  marketTokenAddress: string;
  indexTokenAddress: string;
  longTokenAddress: string;
  shortTokenAddress: string;
  indexToken: Token;
  longToken: Token;
  shortToken: Token;
};
