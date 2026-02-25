"use client";

import { useEffect, useState } from "react";
import { Address } from "viem";

import { publicClients } from "@/utils/web3";
import { getCollaterals } from "@/web3/gns/v10/configs";
import { gnsMultiCollatDiamondAbi } from "@/web3/gns/v10/abi/GNSMultiCollatDiamond";

export function useCollateralUsdPrices(
  chainId: number | null,
  diamondAddress: string | null,
): Record<number, number> {
  const [prices, setPrices] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!chainId || !diamondAddress) {
      setPrices({});
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

    const fetchPrices = async () => {
      const results = await Promise.all(
        collaterals.map(async (collateral) => {
          try {
            const priceRaw = await client.readContract({
              address: diamondAddress as Address,
              abi: gnsMultiCollatDiamondAbi,
              functionName: "getCollateralPriceUsd",
              args: [collateral.collateralIndex],
            });
            return {
              collateralIndex: collateral.collateralIndex,
              price: Number(priceRaw) / 1e8,
            };
          } catch {
            return {
              collateralIndex: collateral.collateralIndex,
              price: 0,
            };
          }
        }),
      );

      const map: Record<number, number> = {};
      for (const result of results) {
        map[result.collateralIndex] = result.price;
      }
      setPrices(map);
    };

    fetchPrices();
  }, [chainId, diamondAddress]);

  return prices;
}
