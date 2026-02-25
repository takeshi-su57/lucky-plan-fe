import { createPublicClient, http } from "viem";
import {
  apeChain,
  arbitrum,
  arbitrumSepolia,
  avalanche,
  base,
  polygon,
  megaeth,
} from "viem/chains";

const availableChains = [
  polygon,
  base,
  arbitrum,
  arbitrumSepolia,
  apeChain,
  avalanche,
  megaeth,
];

export const publicClients = Object.fromEntries(
  availableChains.map((chain) => [
    chain.id,
    createPublicClient({
      chain,
      transport: http(),
      batch: {
        multicall: true,
      },
    }),
  ]),
);
