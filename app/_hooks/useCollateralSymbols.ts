"use client";

import { useEffect, useState } from "react";
import { erc20Abi } from "viem";

import { publicClients } from "@/utils/web3";
import { getCollaterals } from "@/web3/gns/v10/configs";

export function useCollateralSymbols(
  chainId: number | null,
): Record<number, string> {
  const [symbols, setSymbols] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!chainId) {
      setSymbols({});
      return;
    }

    const client = publicClients[chainId];

    if (!client) {
      return;
    }

    const collaterals = getCollaterals(chainId);

    if (collaterals.length === 0) {
      return;
    }

    const fetchSymbols = async () => {
      const results = await Promise.all(
        collaterals.map(async (collateral) => {
          try {
            const symbol = await client.readContract({
              address: collateral.collateral,
              abi: erc20Abi,
              functionName: "symbol",
            });
            return { collateralIndex: collateral.collateralIndex, symbol };
          } catch {
            return {
              collateralIndex: collateral.collateralIndex,
              symbol: `C${collateral.collateralIndex}`,
            };
          }
        }),
      );

      const map: Record<number, string> = {};
      for (const result of results) {
        map[result.collateralIndex] = result.symbol;
      }
      setSymbols(map);
    };

    fetchSymbols();
  }, [chainId]);

  return symbols;
}
