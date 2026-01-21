"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Button, Spinner } from "@heroui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import { useBacktestResultFile } from "@/app-hooks/useBacktest";
import type { BacktestResult } from "@/graphql/gql/graphql";

export type BestConfigCarouselProps = {
  results: BacktestResult[];
  variant?: "compact" | "full";
  onSelectResult?: (resultId: string) => void;
};

function CarouselChartItem({
  result,
  variant,
  onSelect,
}: {
  result: BacktestResult;
  variant: "compact" | "full";
  onSelect?: () => void;
}) {
  const { file: chartFile, loading: chartLoading } = useBacktestResultFile(
    result.taskId,
    result.runDate,
    result.configId,
    "pnl-chart.png",
  );

  const isProfitable = result.totalPnlUsdt >= 0;
  const isCompact = variant === "compact";

  return (
    <div
      className={twMerge(
        "flex flex-col overflow-hidden rounded-lg bg-neutral-800",
        isCompact ? "h-full w-full" : "h-full w-full",
        onSelect && "cursor-pointer transition-colors hover:bg-neutral-700",
      )}
      onClick={onSelect}
    >
      {/* Chart */}
      <div
        className={twMerge(
          "relative w-full overflow-hidden bg-neutral-900",
          isCompact ? "h-full" : "h-48",
        )}
      >
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
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500">
            No chart
          </div>
        )}
      </div>

      {/* Stats (only for full variant) */}
      {!isCompact && (
        <div className="flex flex-col gap-2 p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-neutral-400">
              #{result.configId.slice(0, 8)}
            </span>
            <span
              className={twMerge(
                "text-sm font-semibold",
                isProfitable ? "text-success-400" : "text-danger-400",
              )}
            >
              {isProfitable ? "+" : ""}${result.totalPnlUsdt.toFixed(2)}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex flex-col">
              <span className="text-neutral-500">Win Rate</span>
              <span className="text-white">{result.winRate.toFixed(1)}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-500">Sharpe</span>
              <span className="text-white">
                {result.sharpeRatio?.toFixed(2) ?? "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-500">Max DD</span>
              <span className="text-danger-400">
                -{result.maxDrawdownPercent.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function BestConfigCarousel({
  results,
  variant = "compact",
  onSelectResult,
}: BestConfigCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
  }, [results.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
  }, [results.length]);

  if (results.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500">
        No best configs
      </div>
    );
  }

  const currentResult = results[currentIndex];
  const isCompact = variant === "compact";
  const showNavigation = results.length > 1;

  return (
    <div className={twMerge("relative flex h-full w-full flex-col")}>
      {/* Main Content */}
      <div className="relative flex-1">
        <CarouselChartItem
          result={currentResult}
          variant={variant}
          onSelect={
            onSelectResult ? () => onSelectResult(currentResult.id) : undefined
          }
        />

        {/* Navigation Arrows */}
        {showNavigation && (
          <>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="absolute left-1 top-1/2 z-10 h-6 w-6 min-w-0 -translate-y-1/2 bg-black/50"
              onPress={handlePrev}
            >
              <FiChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="absolute right-1 top-1/2 z-10 h-6 w-6 min-w-0 -translate-y-1/2 bg-black/50"
              onPress={handleNext}
            >
              <FiChevronRight className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>

      {/* Pagination Indicators */}
      {showNavigation && (
        <div
          className={twMerge(
            "flex items-center justify-center gap-1",
            isCompact ? "absolute bottom-1 left-0 right-0" : "mt-2",
          )}
        >
          {results.map((_, index) => (
            <button
              key={index}
              className={twMerge(
                "h-1.5 rounded-full transition-all",
                index === currentIndex
                  ? "w-3 bg-primary-400"
                  : "w-1.5 bg-neutral-600 hover:bg-neutral-500",
              )}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}

      {/* Counter Badge (compact only) */}
      {showNavigation && isCompact && (
        <div className="absolute right-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
          {currentIndex + 1}/{results.length}
        </div>
      )}
    </div>
  );
}
