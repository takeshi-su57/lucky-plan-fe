"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Card, CardBody, Spinner } from "@heroui/react";
import { twMerge } from "tailwind-merge";

import { useBacktestResultFile } from "@/app-hooks/useBacktest";

export type BacktestResultCardProps = {
  result: {
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
  };
  onSelect: () => void;
};

export function BacktestResultCard({ result, onSelect }: BacktestResultCardProps) {
  const { file: chartFile, loading: chartLoading } = useBacktestResultFile(
    result.taskId,
    result.runDate,
    result.configId,
    "pnl-chart.png",
  );

  const isProfitable = result.totalPnlUsdt >= 0;

  const strategyLabel = useMemo(() => {
    try {
      const config = result.strategyConfig as {
        signal?: { type?: string };
        risk?: { type?: string };
      };
      const parts: string[] = [];
      if (config?.signal?.type) parts.push(config.signal.type);
      if (config?.risk?.type) parts.push(config.risk.type);
      return parts.join(" + ") || "Custom Strategy";
    } catch {
      return "Custom Strategy";
    }
  }, [result.strategyConfig]);

  return (
    <Card
      isPressable
      onPress={onSelect}
      className="border border-neutral-800 bg-neutral-900/50 transition-colors hover:border-neutral-700"
    >
      <CardBody className="flex flex-col gap-3 p-0">
        {/* Chart Hero Section */}
        <div className="relative h-40 w-full overflow-hidden rounded-t-lg bg-neutral-800">
          {chartLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Spinner size="sm" color="white" />
            </div>
          ) : chartFile?.content ? (
            <Image
              src={`data:image/png;base64,${chartFile.content}`}
              alt="PnL Chart"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-neutral-500">
              No chart available
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-2 px-4 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400">
              #{result.configId.slice(0, 8)}
            </span>
            <span className="text-xs text-neutral-500">{result.runDate}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col">
              <span className="text-xs text-neutral-500">Total PnL</span>
              <span
                className={twMerge(
                  "font-semibold",
                  isProfitable ? "text-success-400" : "text-danger-400",
                )}
              >
                {isProfitable ? "+" : ""}${result.totalPnlUsdt.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-neutral-500">Win Rate</span>
              <span className="font-semibold text-white">
                {result.winRate.toFixed(1)}%
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-neutral-500">Trades</span>
              <span className="text-white">{result.totalTrades}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-neutral-500">Sharpe</span>
              <span className="text-white">
                {result.sharpeRatio?.toFixed(2) ?? "N/A"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-neutral-500">Profit Factor</span>
              <span className="text-white">
                {result.profitFactor?.toFixed(2) ?? "N/A"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-neutral-500">Max DD</span>
              <span className="text-danger-400">
                -{result.maxDrawdownPercent.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="mt-1 border-t border-neutral-800 pt-2">
            <span className="text-xs text-neutral-400">{strategyLabel}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
