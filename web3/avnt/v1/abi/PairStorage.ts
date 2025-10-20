export const pairStorageAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'addFee',
    inputs: [
      {
        name: '_fee',
        type: 'tuple',
        internalType: 'struct IPairStorage.Fee',
        components: [
          {
            name: 'openFeeP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'closeFeeP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'limitOrderFeeP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'minLevPosUSDC',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'pnlFees',
            type: 'tuple',
            internalType: 'struct IPairStorage.PnlFees',
            components: [
              {
                name: 'numTiers',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'tierP',
                type: 'uint256[]',
                internalType: 'uint256[]',
              },
              {
                name: 'feesP',
                type: 'uint256[]',
                internalType: 'uint256[]',
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addGroup',
    inputs: [
      {
        name: '_group',
        type: 'tuple',
        internalType: 'struct IPairStorage.Group',
        components: [
          { name: 'name', type: 'string', internalType: 'string' },
          {
            name: 'maxOpenInterestP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'isSpreadDynamic',
            type: 'bool',
            internalType: 'bool',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addPair',
    inputs: [
      {
        name: '_pair',
        type: 'tuple',
        internalType: 'struct IPairStorage.Pair',
        components: [
          {
            name: 'feed',
            type: 'tuple',
            internalType: 'struct IPairStorage.Feed',
            components: [
              {
                name: 'maxOpenDeviationP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'maxCloseDeviationP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'feedId',
                type: 'bytes32',
                internalType: 'bytes32',
              },
            ],
          },
          {
            name: 'backupFeed',
            type: 'tuple',
            internalType: 'struct IPairStorage.BackupFeed',
            components: [
              {
                name: 'maxDeviationP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'feedId',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          { name: 'spreadP', type: 'uint256', internalType: 'uint256' },
          {
            name: 'pnlSpreadP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'leverages',
            type: 'tuple',
            internalType: 'struct IPairStorage.Leverage',
            components: [
              {
                name: 'minLeverage',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'maxLeverage',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'pnlMinLeverage',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'pnlMaxLeverage',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'priceImpactMultiplier',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'skewImpactMultiplier',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'groupIndex',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'feeIndex',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'values',
            type: 'tuple',
            internalType: 'struct IPairStorage.Values',
            components: [
              {
                name: 'maxGainP',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'maxSlP',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'maxLongOiP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'maxShortOiP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'groupOpenInterestPecentage',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'maxWalletOI',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'isUSDCAligned',
                type: 'bool',
                internalType: 'bool',
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addSkewOpenFees',
    inputs: [
      {
        name: '_skewFee',
        type: 'tuple',
        internalType: 'struct IPairStorage.SkewFee',
        components: [
          {
            name: 'eqParams',
            type: 'int256[2][10]',
            internalType: 'int256[2][10]',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addtionalPairParams',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: 'param_9', type: 'uint256', internalType: 'uint256' },
      { name: 'param_10', type: 'uint256', internalType: 'uint256' },
      { name: 'param_11', type: 'uint256', internalType: 'uint256' },
      { name: 'param_12', type: 'uint256', internalType: 'uint256' },
      { name: 'param_13', type: 'uint256', internalType: 'uint256' },
      { name: 'param_14', type: 'uint256', internalType: 'uint256' },
      { name: 'param_15', type: 'uint256', internalType: 'uint256' },
      { name: 'param_16', type: 'uint256', internalType: 'uint256' },
      { name: 'param_17', type: 'uint256', internalType: 'uint256' },
      { name: 'param_18', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'blockOILimit',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'correctSl',
    inputs: [
      { name: 'openPrice', type: 'uint256', internalType: 'uint256' },
      { name: 'leverage', type: 'uint256', internalType: 'uint256' },
      { name: 'sl', type: 'uint256', internalType: 'uint256' },
      { name: 'buy', type: 'bool', internalType: 'bool' },
      { name: 'pairIndex', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'correctTp',
    inputs: [
      { name: 'openPrice', type: 'uint256', internalType: 'uint256' },
      { name: 'leverage', type: 'uint256', internalType: 'uint256' },
      { name: 'tp', type: 'uint256', internalType: 'uint256' },
      { name: 'buy', type: 'bool', internalType: 'bool' },
      { name: 'pairIndex', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'currentOrderId',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'currentPercentProfit',
    inputs: [
      { name: 'openPrice', type: 'uint256', internalType: 'uint256' },
      {
        name: 'currentPrice',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: 'buy', type: 'bool', internalType: 'bool' },
      { name: 'leverage', type: 'uint256', internalType: 'uint256' },
      { name: 'pairIndex', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: 'p', type: 'int256', internalType: 'int256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'delistPair',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'fees',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: 'openFeeP', type: 'uint256', internalType: 'uint256' },
      { name: 'closeFeeP', type: 'uint256', internalType: 'uint256' },
      {
        name: 'limitOrderFeeP',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'minLevPosUSDC',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'pnlFees',
        type: 'tuple',
        internalType: 'struct IPairStorage.PnlFees',
        components: [
          {
            name: 'numTiers',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'tierP',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
          {
            name: 'feesP',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'feesCount',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPairData',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: 'from', type: 'string', internalType: 'string' },
      { name: 'to', type: 'string', internalType: 'string' },
      { name: 'numTiers', type: 'uint256', internalType: 'uint256' },
      {
        name: 'tierThresholds',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      { name: 'timer', type: 'uint256[]', internalType: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPnlBasedFee',
    inputs: [
      { name: 'pairIndex', type: 'uint256', internalType: 'uint256' },
      { name: 'collateral', type: 'uint256', internalType: 'uint256' },
      { name: 'percentProfit', type: 'int256', internalType: 'int256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPosType',
    inputs: [
      { name: 'trader', type: 'address', internalType: 'address' },
      { name: 'pairIndex', type: 'uint256', internalType: 'uint256' },
      { name: 'index', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getSkewParams',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: 'skewFee',
        type: 'tuple',
        internalType: 'struct IPairStorage.SkewFee',
        components: [
          {
            name: 'eqParams',
            type: 'int256[2][10]',
            internalType: 'int256[2][10]',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'groupMaxOI',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'groupOI',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'groupOIs',
    inputs: [
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'groups',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: 'name', type: 'string', internalType: 'string' },
      {
        name: 'maxOpenInterestP',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: 'isSpreadDynamic', type: 'bool', internalType: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'groupsCount',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'guaranteedSlEnabled',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      { name: '_storageT', type: 'address', internalType: 'address' },
      {
        name: '_currentOrderId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isDynamicSpreadEnabled',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isPairListed',
    inputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isUSDCAligned',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'lossProtection',
    inputs: [
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'lossProtectionMultiplier',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      { name: '_tier', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'maxWalletOI',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'openCloseThreshold',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      { name: '_leveragePos', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'openPosType',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairBackupFeed',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IPairStorage.BackupFeed',
        components: [
          {
            name: 'maxDeviationP',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'feedId', type: 'address', internalType: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairCloseFeeP',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairData',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: 'from', type: 'string', internalType: 'string' },
      { name: 'to', type: 'string', internalType: 'string' },
      { name: 'numTiers', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairFeed',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IPairStorage.Feed',
        components: [
          {
            name: 'maxOpenDeviationP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'maxCloseDeviationP',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'feedId', type: 'bytes32', internalType: 'bytes32' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairGroupIndex',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairJob',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: '', type: 'bytes32', internalType: 'bytes32' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'pairLimitOrderFeeP',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairMaxLeverage',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      { name: '_isPnl', type: 'bool', internalType: 'bool' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairMaxLongOI',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairMaxOI',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairMaxShortOI',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairMinLevPosUSDC',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairMinLeverage',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      { name: '_isPnl', type: 'bool', internalType: 'bool' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairOpenFeeP',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      {
        name: '_leveragedPosition',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: '_buy', type: 'bool', internalType: 'bool' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairParams',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: 'posSpreadCap',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'negSpreadCap',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: 'param_1', type: 'uint256', internalType: 'uint256' },
      { name: 'param_2', type: 'uint256', internalType: 'uint256' },
      { name: 'param_3', type: 'uint256', internalType: 'uint256' },
      { name: 'param_4', type: 'uint256', internalType: 'uint256' },
      { name: 'param_5', type: 'uint256', internalType: 'uint256' },
      { name: 'param_6', type: 'uint256', internalType: 'uint256' },
      { name: 'param_7', type: 'uint256', internalType: 'uint256' },
      { name: 'param_8', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairPriceImpactMultiplier',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairSkewImpactMultiplier',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'int256', internalType: 'int256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairSpreadP',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      { name: '_isPnl', type: 'bool', internalType: 'bool' },
    ],
    outputs: [{ name: 'spreadP', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairs',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: 'feed',
        type: 'tuple',
        internalType: 'struct IPairStorage.Feed',
        components: [
          {
            name: 'maxOpenDeviationP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'maxCloseDeviationP',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'feedId', type: 'bytes32', internalType: 'bytes32' },
        ],
      },
      {
        name: 'backupFeed',
        type: 'tuple',
        internalType: 'struct IPairStorage.BackupFeed',
        components: [
          {
            name: 'maxDeviationP',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'feedId', type: 'address', internalType: 'address' },
        ],
      },
      { name: 'spreadP', type: 'uint256', internalType: 'uint256' },
      { name: 'pnlSpreadP', type: 'uint256', internalType: 'uint256' },
      {
        name: 'leverages',
        type: 'tuple',
        internalType: 'struct IPairStorage.Leverage',
        components: [
          {
            name: 'minLeverage',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'maxLeverage',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'pnlMinLeverage',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'pnlMaxLeverage',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'priceImpactMultiplier',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'skewImpactMultiplier',
        type: 'int256',
        internalType: 'int256',
      },
      { name: 'groupIndex', type: 'uint256', internalType: 'uint256' },
      { name: 'feeIndex', type: 'uint256', internalType: 'uint256' },
      {
        name: 'values',
        type: 'tuple',
        internalType: 'struct IPairStorage.Values',
        components: [
          { name: 'maxGainP', type: 'int256', internalType: 'int256' },
          { name: 'maxSlP', type: 'int256', internalType: 'int256' },
          {
            name: 'maxLongOiP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'maxShortOiP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'groupOpenInterestPecentage',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'maxWalletOI',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'isUSDCAligned', type: 'bool', internalType: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairsBackend',
    inputs: [{ name: '_index', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IPairStorage.Pair',
        components: [
          {
            name: 'feed',
            type: 'tuple',
            internalType: 'struct IPairStorage.Feed',
            components: [
              {
                name: 'maxOpenDeviationP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'maxCloseDeviationP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'feedId',
                type: 'bytes32',
                internalType: 'bytes32',
              },
            ],
          },
          {
            name: 'backupFeed',
            type: 'tuple',
            internalType: 'struct IPairStorage.BackupFeed',
            components: [
              {
                name: 'maxDeviationP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'feedId',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          { name: 'spreadP', type: 'uint256', internalType: 'uint256' },
          {
            name: 'pnlSpreadP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'leverages',
            type: 'tuple',
            internalType: 'struct IPairStorage.Leverage',
            components: [
              {
                name: 'minLeverage',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'maxLeverage',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'pnlMinLeverage',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'pnlMaxLeverage',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'priceImpactMultiplier',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'skewImpactMultiplier',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'groupIndex',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'feeIndex',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'values',
            type: 'tuple',
            internalType: 'struct IPairStorage.Values',
            components: [
              {
                name: 'maxGainP',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'maxSlP',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'maxLongOiP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'maxShortOiP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'groupOpenInterestPecentage',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'maxWalletOI',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'isUSDCAligned',
                type: 'bool',
                internalType: 'bool',
              },
            ],
          },
        ],
      },
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IPairStorage.Group',
        components: [
          { name: 'name', type: 'string', internalType: 'string' },
          {
            name: 'maxOpenInterestP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'isSpreadDynamic',
            type: 'bool',
            internalType: 'bool',
          },
        ],
      },
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IPairStorage.Fee',
        components: [
          {
            name: 'openFeeP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'closeFeeP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'limitOrderFeeP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'minLevPosUSDC',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'pnlFees',
            type: 'tuple',
            internalType: 'struct IPairStorage.PnlFees',
            components: [
              {
                name: 'numTiers',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'tierP',
                type: 'uint256[]',
                internalType: 'uint256[]',
              },
              {
                name: 'feesP',
                type: 'uint256[]',
                internalType: 'uint256[]',
              },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pairsCount',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'resetPosType',
    inputs: [
      { name: 'trader', type: 'address', internalType: 'address' },
      { name: 'pairIndex', type: 'uint256', internalType: 'uint256' },
      { name: 'index', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setBlockOILImits',
    inputs: [
      {
        name: '_pairIndex',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      { name: '_limits', type: 'uint256[]', internalType: 'uint256[]' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setPairData',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      { name: 'from', type: 'string', internalType: 'string' },
      { name: 'to', type: 'string', internalType: 'string' },
      { name: '_numTiers', type: 'uint256', internalType: 'uint256' },
      {
        name: '_tierThresholds',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      { name: '_timer', type: 'uint256[]', internalType: 'uint256[]' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'skewedFeesCount',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'spreadCaps',
    inputs: [{ name: '_pairIndex', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'storageT',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract ITradingStorage',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'storePosType',
    inputs: [
      { name: 'trader', type: 'address', internalType: 'address' },
      { name: 'pairIndex', type: 'uint256', internalType: 'uint256' },
      { name: 'index', type: 'uint256', internalType: 'uint256' },
      { name: 'isPnl', type: 'bool', internalType: 'bool' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'syncGroupOI',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      { name: '_newLongOI', type: 'uint256', internalType: 'uint256' },
      { name: '_newShortOI', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'syncOrderId',
    inputs: [{ name: '_orderId', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'udpateSkewOpenFees',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      {
        name: '_skewFee',
        type: 'tuple',
        internalType: 'struct IPairStorage.SkewFee',
        components: [
          {
            name: 'eqParams',
            type: 'int256[2][10]',
            internalType: 'int256[2][10]',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateAdditionalPairParams',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      {
        name: '_params',
        type: 'tuple',
        internalType: 'struct IPairStorage.AdditionalPairParams',
        components: [
          { name: 'param_9', type: 'uint256', internalType: 'uint256' },
          {
            name: 'param_10',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_11',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_12',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_13',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_14',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_15',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_16',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_17',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'param_18', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateFee',
    inputs: [
      { name: '_id', type: 'uint256', internalType: 'uint256' },
      {
        name: '_fee',
        type: 'tuple',
        internalType: 'struct IPairStorage.Fee',
        components: [
          {
            name: 'openFeeP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'closeFeeP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'limitOrderFeeP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'minLevPosUSDC',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'pnlFees',
            type: 'tuple',
            internalType: 'struct IPairStorage.PnlFees',
            components: [
              {
                name: 'numTiers',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'tierP',
                type: 'uint256[]',
                internalType: 'uint256[]',
              },
              {
                name: 'feesP',
                type: 'uint256[]',
                internalType: 'uint256[]',
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateGroup',
    inputs: [
      { name: '_id', type: 'uint256', internalType: 'uint256' },
      {
        name: '_group',
        type: 'tuple',
        internalType: 'struct IPairStorage.Group',
        components: [
          { name: 'name', type: 'string', internalType: 'string' },
          {
            name: 'maxOpenInterestP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'isSpreadDynamic',
            type: 'bool',
            internalType: 'bool',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateGroupOI',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      { name: '_amount', type: 'uint256', internalType: 'uint256' },
      { name: '_long', type: 'bool', internalType: 'bool' },
      { name: '_increase', type: 'bool', internalType: 'bool' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateLossProtectionMultiplier',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      { name: '_tier', type: 'uint256[]', internalType: 'uint256[]' },
      {
        name: '_multiplierPercent',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updatePair',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      {
        name: '_pair',
        type: 'tuple',
        internalType: 'struct IPairStorage.Pair',
        components: [
          {
            name: 'feed',
            type: 'tuple',
            internalType: 'struct IPairStorage.Feed',
            components: [
              {
                name: 'maxOpenDeviationP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'maxCloseDeviationP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'feedId',
                type: 'bytes32',
                internalType: 'bytes32',
              },
            ],
          },
          {
            name: 'backupFeed',
            type: 'tuple',
            internalType: 'struct IPairStorage.BackupFeed',
            components: [
              {
                name: 'maxDeviationP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'feedId',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          { name: 'spreadP', type: 'uint256', internalType: 'uint256' },
          {
            name: 'pnlSpreadP',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'leverages',
            type: 'tuple',
            internalType: 'struct IPairStorage.Leverage',
            components: [
              {
                name: 'minLeverage',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'maxLeverage',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'pnlMinLeverage',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'pnlMaxLeverage',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'priceImpactMultiplier',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'skewImpactMultiplier',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'groupIndex',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'feeIndex',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'values',
            type: 'tuple',
            internalType: 'struct IPairStorage.Values',
            components: [
              {
                name: 'maxGainP',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'maxSlP',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'maxLongOiP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'maxShortOiP',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'groupOpenInterestPecentage',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'maxWalletOI',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'isUSDCAligned',
                type: 'bool',
                internalType: 'bool',
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updatePairParams',
    inputs: [
      { name: '_pairIndex', type: 'uint256', internalType: 'uint256' },
      {
        name: '_params',
        type: 'tuple',
        internalType: 'struct IPairStorage.PairParams',
        components: [
          {
            name: 'posSpreadCap',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'negSpreadCap',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'param_1', type: 'uint256', internalType: 'uint256' },
          { name: 'param_2', type: 'uint256', internalType: 'uint256' },
          { name: 'param_3', type: 'uint256', internalType: 'uint256' },
          { name: 'param_4', type: 'uint256', internalType: 'uint256' },
          { name: 'param_5', type: 'uint256', internalType: 'uint256' },
          { name: 'param_6', type: 'uint256', internalType: 'uint256' },
          { name: 'param_7', type: 'uint256', internalType: 'uint256' },
          { name: 'param_8', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'AdditionalPairParamsUpdated',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        indexed: false,
        internalType: 'struct IPairStorage.AdditionalPairParams',
        components: [
          { name: 'param_9', type: 'uint256', internalType: 'uint256' },
          {
            name: 'param_10',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_11',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_12',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_13',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_14',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_15',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_16',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'param_17',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'param_18', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'BlockOILimitsSet',
    inputs: [
      {
        name: 'pairIndex',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
      {
        name: 'limits',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'FeeAdded',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'FeeUpdated',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'GroupAdded',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'name',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'GroupUpdated',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [
      {
        name: 'version',
        type: 'uint8',
        indexed: false,
        internalType: 'uint8',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'LossProtectionAdded',
    inputs: [
      {
        name: 'pairIndex',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'tier',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
      {
        name: 'multiplier',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OrderLimitsSet',
    inputs: [
      {
        name: 'pairIndex',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
      {
        name: 'limits',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PairAdded',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'feedId',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PairDataUpdated',
    inputs: [
      {
        name: 'pairIndex',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'from',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'to',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'numTiers',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'tierthresholds',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
      {
        name: 'timers',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PairDelisted',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PairParamsUpdated',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        indexed: false,
        internalType: 'struct IPairStorage.PairParams',
        components: [
          {
            name: 'posSpreadCap',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'negSpreadCap',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'param_1', type: 'uint256', internalType: 'uint256' },
          { name: 'param_2', type: 'uint256', internalType: 'uint256' },
          { name: 'param_3', type: 'uint256', internalType: 'uint256' },
          { name: 'param_4', type: 'uint256', internalType: 'uint256' },
          { name: 'param_5', type: 'uint256', internalType: 'uint256' },
          { name: 'param_6', type: 'uint256', internalType: 'uint256' },
          { name: 'param_7', type: 'uint256', internalType: 'uint256' },
          { name: 'param_8', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PairUpdated',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SkewFeeAdded',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SkewFeeUpdated',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
] as const;
