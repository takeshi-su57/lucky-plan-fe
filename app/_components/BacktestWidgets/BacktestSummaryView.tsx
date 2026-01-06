"use client";

import { useMemo } from "react";
import { Spinner } from "@heroui/react";
import { twMerge } from "tailwind-merge";

export type BacktestSummaryViewProps = {
  csvContent?: string;
  result: {
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    winRate: number;
    totalPnlUsdt: number;
    totalPnlPercent: number;
    maxDrawdownUsdt: number;
    maxDrawdownPercent: number;
    sharpeRatio?: number | null;
    profitFactor?: number | null;
  };
  loading?: boolean;
};

export function BacktestSummaryView({
  csvContent,
  result,
  loading,
}: BacktestSummaryViewProps) {
  const parsedSummary = useMemo(() => {
    if (!csvContent) return null;

    try {
      const lines = csvContent.trim().split("\n");
      const summary: Record<string, string> = {};

      for (const line of lines.slice(1)) { // Skip header
        const [metric, value] = line.split(",");
        if (metric && value) {
          summary[metric.trim()] = value.trim();
        }
      }

      return summary;
    } catch {
      return null;
    }
  }, [csvContent]);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner color="white" size="lg" />
      </div>
    );
  }

  const isProfitable = result.totalPnlUsdt >= 0;

  // Primary metrics from result
  const primaryMetrics = [
    {
      label: "Total Trades",
      value: result.totalTrades.toString(),
    },
    {
      label: "Winning Trades",
      value: result.winningTrades.toString(),
      color: "text-success-400",
    },
    {
      label: "Losing Trades",
      value: result.losingTrades.toString(),
      color: "text-danger-400",
    },
    {
      label: "Win Rate",
      value: `${result.winRate.toFixed(2)}%`,
    },
    {
      label: "Total PnL (USDT)",
      value: `${isProfitable ? "+" : ""}$${result.totalPnlUsdt.toFixed(2)}`,
      color: isProfitable ? "text-success-400" : "text-danger-400",
    },
    {
      label: "Total PnL (%)",
      value: `${isProfitable ? "+" : ""}${result.totalPnlPercent.toFixed(2)}%`,
      color: isProfitable ? "text-success-400" : "text-danger-400",
    },
    {
      label: "Max Drawdown (USDT)",
      value: `-$${result.maxDrawdownUsdt.toFixed(2)}`,
      color: "text-danger-400",
    },
    {
      label: "Max Drawdown (%)",
      value: `-${result.maxDrawdownPercent.toFixed(2)}%`,
      color: "text-danger-400",
    },
    {
      label: "Sharpe Ratio",
      value: result.sharpeRatio?.toFixed(3) ?? "N/A",
    },
    {
      label: "Profit Factor",
      value: result.profitFactor?.toFixed(3) ?? "N/A",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {primaryMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4"
          >
            <div className="text-xs text-neutral-500">{metric.label}</div>
            <div
              className={twMerge(
                "mt-1 text-lg font-semibold",
                metric.color || "text-white",
              )}
            >
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Additional metrics from CSV */}
      {parsedSummary && Object.keys(parsedSummary).length > 0 && (
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50">
          <div className="border-b border-neutral-800 px-4 py-3">
            <h3 className="text-sm font-semibold text-white">
              Additional Metrics
            </h3>
          </div>
          <div className="divide-y divide-neutral-800">
            {Object.entries(parsedSummary).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between px-4 py-2"
              >
                <span className="text-sm text-neutral-400">{key}</span>
                <span className="text-sm font-mono text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
