export const avntMarginUpdatedAbi = {
  type: 'event',
  name: 'MarginUpdated',
  inputs: [
    {
      name: 'trader',
      type: 'address',
      indexed: true,
      internalType: 'address',
    },
    {
      name: 'pairIndex',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
    {
      name: 'index',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
    {
      name: '_type',
      type: 'uint8',
      indexed: false,
      internalType: 'enum ITradingStorage.updateType',
    },
    {
      name: 'newTrade',
      type: 'tuple',
      indexed: false,
      internalType: 'struct ITradingStorage.Trade',
      components: [
        { name: 'trader', type: 'address', internalType: 'address' },
        {
          name: 'pairIndex',
          type: 'uint256',
          internalType: 'uint256',
        },
        { name: 'index', type: 'uint256', internalType: 'uint256' },
        {
          name: 'initialPosToken',
          type: 'uint256',
          internalType: 'uint256',
        },
        {
          name: 'positionSizeUSDC',
          type: 'uint256',
          internalType: 'uint256',
        },
        {
          name: 'openPrice',
          type: 'uint256',
          internalType: 'uint256',
        },
        { name: 'buy', type: 'bool', internalType: 'bool' },
        {
          name: 'leverage',
          type: 'uint256',
          internalType: 'uint256',
        },
        { name: 'tp', type: 'uint256', internalType: 'uint256' },
        { name: 'sl', type: 'uint256', internalType: 'uint256' },
        {
          name: 'timestamp',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
    },
    {
      name: 'marginFees',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
    {
      name: 'lossProtectionTier',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
    {
      name: 'timestamp',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
  ],
  anonymous: false,
};

export const avntMarketExecutedAbi = {
  type: 'event',
  name: 'MarketExecuted',
  inputs: [
    {
      name: 'orderId',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
    {
      name: 't',
      type: 'tuple',
      indexed: false,
      internalType: 'struct ITradingStorage.Trade',
      components: [
        { name: 'trader', type: 'address', internalType: 'address' },
        {
          name: 'pairIndex',
          type: 'uint256',
          internalType: 'uint256',
        },
        { name: 'index', type: 'uint256', internalType: 'uint256' },
        {
          name: 'initialPosToken',
          type: 'uint256',
          internalType: 'uint256',
        },
        {
          name: 'positionSizeUSDC',
          type: 'uint256',
          internalType: 'uint256',
        },
        {
          name: 'openPrice',
          type: 'uint256',
          internalType: 'uint256',
        },
        { name: 'buy', type: 'bool', internalType: 'bool' },
        {
          name: 'leverage',
          type: 'uint256',
          internalType: 'uint256',
        },
        { name: 'tp', type: 'uint256', internalType: 'uint256' },
        { name: 'sl', type: 'uint256', internalType: 'uint256' },
        {
          name: 'timestamp',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
    },
    {
      name: 'open',
      type: 'bool',
      indexed: false,
      internalType: 'bool',
    },
    {
      name: 'price',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
    {
      name: 'positionSizeUSDC',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
    {
      name: 'percentProfit',
      type: 'int256',
      indexed: false,
      internalType: 'int256',
    },
    {
      name: 'usdcSentToTrader',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
  ],
  anonymous: false,
};

export const avntLimitExecutedAbi = {
  type: 'event',
  name: 'LimitExecuted',
  inputs: [
    {
      name: 'orderId',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
    {
      name: 'limitIndex',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
    {
      name: 't',
      type: 'tuple',
      indexed: false,
      internalType: 'struct ITradingStorage.Trade',
      components: [
        { name: 'trader', type: 'address', internalType: 'address' },
        {
          name: 'pairIndex',
          type: 'uint256',
          internalType: 'uint256',
        },
        { name: 'index', type: 'uint256', internalType: 'uint256' },
        {
          name: 'initialPosToken',
          type: 'uint256',
          internalType: 'uint256',
        },
        {
          name: 'positionSizeUSDC',
          type: 'uint256',
          internalType: 'uint256',
        },
        {
          name: 'openPrice',
          type: 'uint256',
          internalType: 'uint256',
        },
        { name: 'buy', type: 'bool', internalType: 'bool' },
        {
          name: 'leverage',
          type: 'uint256',
          internalType: 'uint256',
        },
        { name: 'tp', type: 'uint256', internalType: 'uint256' },
        { name: 'sl', type: 'uint256', internalType: 'uint256' },
        {
          name: 'timestamp',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
    },
    {
      name: 'orderType',
      type: 'uint8',
      indexed: false,
      internalType: 'enum ITradingStorage.LimitOrder',
    },
    {
      name: 'price',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
    {
      name: 'positionSizeUSDC',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
    {
      name: 'percentProfit',
      type: 'int256',
      indexed: false,
      internalType: 'int256',
    },
    {
      name: 'usdcSentToTrader',
      type: 'uint256',
      indexed: false,
      internalType: 'uint256',
    },
  ],
  anonymous: false,
};

export const avntGeneralAbi = [
  avntMarginUpdatedAbi,
  avntMarketExecutedAbi,
  avntLimitExecutedAbi,
] as const;
