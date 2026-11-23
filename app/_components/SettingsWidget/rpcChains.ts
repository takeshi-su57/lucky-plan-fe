/** Chains the backend can run RPC workers on (see rpc-providers.ts). */
export const RPC_CHAIN_NAMES: Record<number, string> = {
  1: "Ethereum",
  137: "Polygon",
  8453: "Base",
  42161: "Arbitrum",
  421614: "Arbitrum Sepolia",
  33139: "ApeChain",
  43114: "Avalanche",
  4326: "MegaETH",
};

export const rpcChainName = (chainId: number) =>
  RPC_CHAIN_NAMES[chainId] ?? `${chainId}`;
