"use client";

import { BacktestResultCard } from "./BacktestResultCard";

export type BacktestResultGridProps = {
  results: Array<{
    id: string;
    taskId: string;
    configId: string;
    runDate: string;
    totalTrades: number;
    winRate: number;
    totalPnlUsdt: number;
    totalPnlPercent: number;
    maxDrawdownPercent: number;
    sharpeRatio?: number | null;
    profitFactor?: number | null;
    strategyConfig: unknown;
  }>;
  onSelectResult: (resultId: string) => void;
};

export function BacktestResultGrid({
  results,
  onSelectResult,
}: BacktestResultGridProps) {
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-neutral-400">
        <p>No results yet</p>
        <p className="text-sm">Results will appear here as they complete</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {results.map((result) => (
        <BacktestResultCard
          key={result.id}
          result={result}
          onSelect={() => onSelectResult(result.id)}
        />
      ))}
    </div>
  );
}
