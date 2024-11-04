"use client";

import { CollateralTypes } from "@tizz-hive/sdk";
import addresses from "@tizz-hive/sdk/lib/src/contracts/addresses.json";

import { PredictionVariable } from "../types";
import { publicClient } from "./wagmi";

import { Address } from "viem";
import { TizzPredictionAbi } from "@/abis/Tizz/TizzPrediction";
import { UnixTime } from "./getUnixTime";

export const testNetChainIds = [3636, 421614];

export const collateralPairIds = {
  [CollateralTypes.WBTC]: 166,
  [CollateralTypes.USDT]: 48,
};

export const collateralPrecisions = {
  [CollateralTypes.WBTC]: 1e8,
  [CollateralTypes.USDT]: 1e18,
};

export const collateralTokenIcons = {
  [CollateralTypes.WBTC]: "btc",
  [CollateralTypes.USDT]: "usdt",
};

export const env = process.env.NEXT_PUBLIC_ENV;

const predictionApis = {
  sepolia: process.env.NEXT_PUBLIC_SEPOLIA_PREDICTION_API || "",
  botanix: process.env.NEXT_PUBLIC_BOTANIX_PREDICTION_API || "",
};
const predictionWSSs = {
  sepolia: process.env.NEXT_PUBLIC_SEPOLIA_PREDICTION_WSS || "",
  botanix: process.env.NEXT_PUBLIC_BOTANIX_PREDICTION_WSS || "",
};
const blockScanDomains = {
  sepolia: "https://sepolia.arbiscan.io",
  botanix: "https://blockscout.botanixlabs.dev/",
};

export const blockScanDomain =
  blockScanDomains[env as keyof typeof blockScanDomains];

export const predictionApi = predictionApis[env as keyof typeof predictionApis];
export const predictionWss = predictionWSSs[env as keyof typeof predictionWSSs];

export const pairsCount = +process.env.NEXT_PUBLIC_PAIRS_COUNT;
export const feesCount = +process.env.NEXT_PUBLIC_FEES_COUNT;
export const groupsCount = +process.env.NEXT_PUBLIC_GROUPS_COUNT;

const scAddresses = {
  botanix: {
    ...addresses["3636"],
    tizzPrediction: "",
  },
  sepolia: {
    ...addresses["421614"],
    tizzPrediction: "0xFbc2b26D525B0F0d45fd9258e0E32091dfa48214",
  },
};

export const tizzContractAddresses =
  scAddresses[env as keyof typeof scAddresses];

const averageBlockTimes = {
  botanix: 30000,
  sepolia: 4000,
};

export const averageBlockTime =
  averageBlockTimes[env as keyof typeof averageBlockTimes];

export async function getPredictionVariables(): Promise<PredictionVariable | null> {
  const data = await publicClient.multicall({
    contracts: [
      {
        address: tizzContractAddresses.tizzPrediction as Address,
        abi: TizzPredictionAbi,
        functionName: "accumulatedFeeAmt",
      },
      {
        address: tizzContractAddresses.tizzPrediction as Address,
        abi: TizzPredictionAbi,
        functionName: "minBetAmount",
      },
      {
        address: tizzContractAddresses.tizzPrediction as Address,
        abi: TizzPredictionAbi,
        functionName: "startedTimestamp",
      },
      {
        address: tizzContractAddresses.tizzPrediction as Address,
        abi: TizzPredictionAbi,
        functionName: "intervalSeconds",
      },
      {
        address: tizzContractAddresses.tizzPrediction as Address,
        abi: TizzPredictionAbi,
        functionName: "bufferSeconds",
      },
      {
        address: tizzContractAddresses.tizzPrediction as Address,
        abi: TizzPredictionAbi,
        functionName: "fee",
      },
      {
        address: tizzContractAddresses.tizzPrediction as Address,
        abi: TizzPredictionAbi,
        functionName: "FEE_PRECISION",
      },
    ],
    multicallAddress: tizzContractAddresses.global.customMulticall as Address,
  });

  if (data.find((item) => item.status === "failure")) {
    return null;
  }

  return {
    accumulatedFeeAmt: data[0].result!,
    minBetAmount: data[1].result!,
    startedTimestamp: Number(data[2].result) * 1000,
    intervalSeconds: Number(data[3].result),
    bufferSeconds: Number(data[4].result),
    fee: Number(data[5].result),
    FEE_PRECISION: Number(data[6].result),
  };
}

export function getCurrentEpoch(
  startedTimestamp: number,
  intervalSeconds: number,
) {
  const currentTime = UnixTime.getUnixTime();
  const passedTime = currentTime - startedTimestamp;

  return Math.ceil(passedTime / intervalSeconds / 1000);
}
