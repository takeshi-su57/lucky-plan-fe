"use client";

import { useState, useCallback } from "react";
import { useApolloClient } from "@apollo/client/react";
import { useSnackbar } from "notistack";

import {
  OPEN_TRADE_MARKET_DOCUMENT,
  CLOSE_TRADE_MARKET_DOCUMENT,
} from "./useFollower";
import { getCollateral } from "@/web3/gns/v10/configs";
import { BatchOpenAction } from "./useBatchOpenStore";

export type BatchActionStatus = "idle" | "loading" | "success" | "error";

export type BatchResult = {
  id: string;
  status: BatchActionStatus;
  message?: string;
};

export type BatchCloseTarget = {
  id: string;
  address: string;
  contractId: number;
  pairIndex: number;
  index: number;
};

export type ContractInfo = {
  id: number;
  chainId: number;
  address: string;
};

function buildOpenTradeInput(
  action: BatchOpenAction,
  long: boolean,
  chainId: number,
  collateralUsdPrices: Record<number, number>,
  pairPrices: Record<number, number>,
) {
  const collateral = getCollateral(chainId, action.collateralIndex);
  const precision = collateral ? Number(collateral.precision) : 1e6;
  const collateralUsdPrice = collateralUsdPrices[action.collateralIndex] || 0;

  let rawAmount = Number(action.collateralAmount);
  if (Number.isNaN(rawAmount)) rawAmount = 0;
  if (action.amountMode === "usd") {
    rawAmount = collateralUsdPrice > 0 ? rawAmount / collateralUsdPrice : 0;
  }

  const currentPairPrice = pairPrices[action.pairIndex];

  let computedSl = action.sl;
  if (action.slMode === "percent" && currentPairPrice) {
    const pct = Number(action.slPercent);
    if (!Number.isNaN(pct)) {
      const slPrice = long
        ? currentPairPrice * (1 - pct / 100)
        : currentPairPrice * (1 + pct / 100);
      computedSl = Math.floor(slPrice * 1e10).toString();
    } else {
      computedSl = "0";
    }
  }

  let computedTp = action.tp;
  if (action.tpMode === "percent" && currentPairPrice) {
    const pct = Number(action.tpPercent);
    if (!Number.isNaN(pct)) {
      const tpPrice = long
        ? currentPairPrice * (1 + pct / 100)
        : currentPairPrice * (1 - pct / 100);
      computedTp = Math.floor(tpPrice * 1e10).toString();
    } else {
      computedTp = "0";
    }
  }

  return {
    address: action.followerAddress,
    contractId: action.contractId,
    pairIndex: action.pairIndex,
    leverage: Math.floor(Number(action.leverage) * 1e3),
    collateralAmount: Math.floor(rawAmount * precision).toString(),
    collateralIndex: action.collateralIndex,
    long,
    sl: computedSl,
    tp: computedTp,
    maxSlippageP: Math.floor(Number(action.maxSlippageP) * 1e3),
  };
}

export function useBatchOpenTrade() {
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();
  const [results, setResults] = useState<BatchResult[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const executeBatchOpen = useCallback(
    async (
      actions: BatchOpenAction[],
      long: boolean,
      contractsMap: Record<number, ContractInfo>,
      collateralUsdPrices: Record<number, number>,
      pairPrices: Record<number, number>,
    ) => {
      if (actions.length === 0) return;

      setIsExecuting(true);
      setResults(
        actions.map((a) => ({ id: a.id, status: "loading" as const })),
      );

      const promises = actions.map(async (action) => {
        try {
          const contract = contractsMap[action.contractId];
          if (!contract) {
            throw new Error(`Contract ${action.contractId} not found`);
          }

          const input = buildOpenTradeInput(
            action,
            long,
            contract.chainId,
            collateralUsdPrices,
            pairPrices,
          );

          const { data } = await client.mutate({
            mutation: OPEN_TRADE_MARKET_DOCUMENT,
            variables: { input },
          });

          if (data?.openTradeMarket.success) {
            setResults((prev) =>
              prev.map((r) =>
                r.id === action.id ? { ...r, status: "success" as const } : r,
              ),
            );
            return { id: action.id, success: true };
          } else {
            const message =
              data?.openTradeMarket.message || "Unknown error";
            setResults((prev) =>
              prev.map((r) =>
                r.id === action.id
                  ? { ...r, status: "error" as const, message }
                  : r,
              ),
            );
            return { id: action.id, success: false };
          }
        } catch (err) {
          setResults((prev) =>
            prev.map((r) =>
              r.id === action.id
                ? { ...r, status: "error" as const, message: String(err) }
                : r,
            ),
          );
          return { id: action.id, success: false };
        }
      });

      const settled = await Promise.allSettled(promises);

      client.cache.modify({
        fields: {
          getAllFollowerDetails: (_, { INVALIDATE }) => INVALIDATE,
        },
      });

      const successCount = settled.filter(
        (r) => r.status === "fulfilled" && r.value.success,
      ).length;

      enqueueSnackbar(
        `Batch open: ${successCount}/${actions.length} succeeded`,
        {
          variant: successCount === actions.length ? "success" : "warning",
        },
      );

      setIsExecuting(false);
    },
    [client, enqueueSnackbar],
  );

  const resetResults = useCallback(() => {
    setResults([]);
  }, []);

  return { executeBatchOpen, results, isExecuting, resetResults };
}

export function useBatchCloseTrade() {
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();
  const [results, setResults] = useState<BatchResult[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const executeBatchClose = useCallback(
    async (targets: BatchCloseTarget[]) => {
      if (targets.length === 0) return;

      setIsExecuting(true);
      setResults(
        targets.map((t) => ({ id: t.id, status: "loading" as const })),
      );

      const promises = targets.map(async (target) => {
        try {
          const { data } = await client.mutate({
            mutation: CLOSE_TRADE_MARKET_DOCUMENT,
            variables: {
              input: {
                address: target.address,
                contractId: target.contractId,
                pairIndex: target.pairIndex,
                index: target.index,
              },
            },
          });

          if (data?.closeTradeMarket.success) {
            setResults((prev) =>
              prev.map((r) =>
                r.id === target.id ? { ...r, status: "success" as const } : r,
              ),
            );
            return { id: target.id, success: true };
          } else {
            const message =
              data?.closeTradeMarket.message || "Unknown error";
            setResults((prev) =>
              prev.map((r) =>
                r.id === target.id
                  ? { ...r, status: "error" as const, message }
                  : r,
              ),
            );
            return { id: target.id, success: false };
          }
        } catch (err) {
          setResults((prev) =>
            prev.map((r) =>
              r.id === target.id
                ? { ...r, status: "error" as const, message: String(err) }
                : r,
            ),
          );
          return { id: target.id, success: false };
        }
      });

      const settled = await Promise.allSettled(promises);

      client.cache.modify({
        fields: {
          getAllFollowerDetails: (_, { INVALIDATE }) => INVALIDATE,
        },
      });

      const successCount = settled.filter(
        (r) => r.status === "fulfilled" && r.value.success,
      ).length;

      enqueueSnackbar(
        `Batch close: ${successCount}/${targets.length} succeeded`,
        {
          variant: successCount === targets.length ? "success" : "warning",
        },
      );

      setIsExecuting(false);
    },
    [client, enqueueSnackbar],
  );

  const resetResults = useCallback(() => {
    setResults([]);
  }, []);

  return { executeBatchClose, results, isExecuting, resetResults };
}
