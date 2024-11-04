import { CollateralTypes } from "@tizz-hive/sdk";

import { publicClient } from "./wagmi";

import { averageBlockTime, tizzContractAddresses } from "./tizz";
import { Address } from "viem";
import { TTokenAbi } from "@/abis/Tizz/TToken";

// timestamp is millisec
export function estimateBlockByTimestamp(
  targetTimestamp: number,
  block: {
    blockNumber: number;
    blockTimestamp: number;
  },
) {
  // Calculate the estimated number of blocks ago
  const timeDifference = block.blockTimestamp - targetTimestamp;
  const estimatedBlocksAgo = Math.floor(timeDifference / averageBlockTime);

  // Estimate the block number
  const estimatedBlockNumber = block.blockNumber - estimatedBlocksAgo;

  return Number(estimatedBlockNumber);
}

const precision = 1e18;

export async function getAPY(
  collateralType: CollateralTypes,
): Promise<number | null> {
  try {
    // Get the latest block number and timestamp
    const latestBlockNumber = await publicClient.getBlockNumber();
    const latestBlock = await publicClient.getBlock({
      blockNumber: latestBlockNumber,
    });
    const latestTimestamp = Number(latestBlock.timestamp) * 1000;

    const sevenDaysAgoTimestamp = latestTimestamp - 7 * 24 * 3600 * 1000;
    const sevenDaysAgoBlockNumber = estimateBlockByTimestamp(
      sevenDaysAgoTimestamp,
      {
        blockNumber: Number(latestBlockNumber),
        blockTimestamp: latestTimestamp,
      },
    );

    const [nowAccRewardsPerToken, beforeAccRewardsPerToken] = await Promise.all(
      [
        publicClient.readContract({
          address: tizzContractAddresses[collateralType].tizzToken as Address,
          abi: TTokenAbi,
          functionName: "accRewardsPerToken",
        }),
        publicClient.readContract({
          address: tizzContractAddresses[collateralType].tizzToken as Address,
          abi: TTokenAbi,
          functionName: "accRewardsPerToken",
          blockNumber: BigInt(sevenDaysAgoBlockNumber),
        }),
      ],
    );

    const rewardsPerTokenDelta =
      Number(nowAccRewardsPerToken - beforeAccRewardsPerToken) / precision;

    const avgRewardsPerToken =
      Number(nowAccRewardsPerToken + beforeAccRewardsPerToken) / precision / 2;

    const annualRounds = 365 / 7;

    const apr =
      (rewardsPerTokenDelta / (1 + avgRewardsPerToken)) * annualRounds;

    const apy = Math.pow(1 + apr / annualRounds, annualRounds) - 1;

    return apy;
  } catch (error) {
    console.error("Error calculating apy:", error);
    return null;
  }
}
