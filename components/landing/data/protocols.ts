export interface Protocol {
  id: string;
  name: string;
  ticker: string;
  description: string;
  color: string;
  url: string;
  stats: {
    totalVolume: string;
    totalVolumeRaw: number;
    trades?: string;
    users: string;
    pairs?: string;
    maxLeverage: string;
  };
  chains: string[];
  features: string[];
  backers?: string[];
}

export interface Chain {
  id: string;
  name: string;
  color: string;
  url: string;
  stat: { label: string; value: string };
  description: string;
}

export const protocols: Protocol[] = [
  {
    id: "gns",
    name: "gTrade",
    ticker: "GNS",
    description:
      "Synthetic perpetual trading with congestion-proof architecture, gasless one-click execution, and OI hedging across 290+ pairs.",
    color: "#0E76FD",
    url: "https://gains.trade",
    stats: {
      totalVolume: "$129B+",
      totalVolumeRaw: 129_000_000_000,
      trades: "3.9M+",
      users: "43K+",
      pairs: "290+",
      maxLeverage: "500x",
    },
    chains: ["arbitrum", "base", "polygon", "megaeth"],
    features: [
      "Synthetic trading",
      "OI hedging",
      "Congestion-proof",
      "Gasless one-click",
    ],
    backers: ["Chainlink"],
  },
  {
    id: "gmx",
    name: "GMX",
    ticker: "GMX",
    description:
      "Pool-based perpetual and spot exchange with real yield, fee-sharing tokenomics, and composable GM/GLP liquidity pools.",
    color: "#2D42FC",
    url: "https://gmx.io",
    stats: {
      totalVolume: "$355B+",
      totalVolumeRaw: 355_000_000_000,
      users: "758K+",
      maxLeverage: "100x",
    },
    chains: ["arbitrum", "base", "megaeth", "ethereum"],
    features: ["GM/GLP pools", "Real yield", "Fee sharing", "Composable"],
    backers: ["Chainlink"],
  },
  {
    id: "avnt",
    name: "Avantis",
    ticker: "AVNT",
    description:
      "Zero-fee perpetuals with loss protection, positive slippage, dual-oracle pricing (Pyth + Chainlink), and tranched liquidity on Base.",
    color: "#0052FF",
    url: "https://avantisfi.com",
    stats: {
      totalVolume: "$68.7B",
      totalVolumeRaw: 68_700_000_000,
      pairs: "80+",
      users: "—",
      maxLeverage: "500x",
    },
    chains: ["base"],
    features: [
      "Zero-fee perps",
      "20% loss protection",
      "Positive slippage",
      "Tranched liquidity",
    ],
    backers: ["Pantera Capital", "Coinbase Ventures"],
  },
];

export const chains: Chain[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    color: "#627EEA",
    url: "https://ethereum.org",
    stat: { label: "Daily txns", value: "21M+" },
    description:
      "The settlement layer. 292M+ holders, 10 years of uninterrupted uptime.",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    color: "#28A0F0",
    url: "https://arbitrum.io",
    stat: { label: "TVL", value: "$16.6B" },
    description:
      "Leading L2 for DeFi. 44% L2 market share, 250+ protocols, 2B+ total transactions.",
  },
  {
    id: "base",
    name: "Base",
    color: "#0052FF",
    url: "https://base.org",
    stat: { label: "Weekly users", value: "1.74M" },
    description:
      "Coinbase-backed L2. 200ms Flashblocks, $15B+ TVL, 250M gas/sec throughput.",
  },
  {
    id: "polygon",
    name: "Polygon",
    color: "#8247E5",
    url: "https://polygon.technology",
    stat: { label: "Avg tx cost", value: "$0.003" },
    description:
      "5.3B+ total transactions, 117M+ unique addresses, $1.14B in tokenized RWA.",
  },
  {
    id: "megaeth",
    name: "MegaETH",
    color: "#FF3366",
    url: "https://megaeth.com",
    stat: { label: "TPS", value: "100K+" },
    description:
      "The first real-time blockchain. Sub-10ms latency, 10+ GGAS/sec throughput.",
  },
];

export const AGGREGATE_VOLUME = "$552B+";
export const AGGREGATE_TRADERS = "800K+";
export const AGGREGATE_PAIRS = "370+";
export const PROTOCOL_COUNT = protocols.length;
export const CHAIN_COUNT = chains.length;
