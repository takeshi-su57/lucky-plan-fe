"use client";

import { useState, useEffect, useCallback } from "react";

export type AmountMode = "collateral" | "usd";
export type SlTpMode = "price" | "percent";

export type BatchOpenAction = {
  id: string;
  contractId: number;
  followerAddress: string;
  pairIndex: number;
  collateralIndex: number;
  collateralAmount: string;
  leverage: string;
  sl: string;
  tp: string;
  slMode: SlTpMode;
  tpMode: SlTpMode;
  slPercent: string;
  tpPercent: string;
  maxSlippageP: string;
  amountMode: AmountMode;
};

const STORAGE_KEY = "batch-open-presets";

export function useBatchOpenStore() {
  const [actions, setActions] = useState<BatchOpenAction[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
  }, [actions]);

  const addAction = useCallback((action: Omit<BatchOpenAction, "id">) => {
    const newAction: BatchOpenAction = {
      ...action,
      id: crypto.randomUUID(),
    };
    setActions((prev) => [...prev, newAction]);
  }, []);

  const removeAction = useCallback((id: string) => {
    setActions((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const updateAction = useCallback(
    (id: string, updates: Partial<Omit<BatchOpenAction, "id">>) => {
      setActions((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updates } : a)),
      );
    },
    [],
  );

  const clearAll = useCallback(() => {
    setActions([]);
  }, []);

  const duplicateAction = useCallback((id: string) => {
    setActions((prev) => {
      const source = prev.find((a) => a.id === id);
      if (!source) return prev;
      return [...prev, { ...source, id: crypto.randomUUID() }];
    });
  }, []);

  return { actions, addAction, removeAction, updateAction, clearAll, duplicateAction };
}
