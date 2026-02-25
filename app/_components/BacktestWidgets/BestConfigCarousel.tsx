"use client";

import { useState, useCallback } from "react";
import { Button } from "@heroui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import type { BacktestResult } from "@/graphql/gql/graphql";
import { BacktestResultCard } from "./BacktestResultCard";

export type BestConfigCarouselProps = {
  results: BacktestResult[];
  onSelectResult?: (resultId: string) => void;
};

export function BestConfigCarousel({
  results,
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

  const showNavigation = results.length > 1;

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* Carousel Container */}
      <div className="relative flex-1 overflow-hidden">
        {/* Sliding Track */}
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {results.map((result) => (
            <div key={result.id} className="h-full w-full shrink-0 px-1">
              <BacktestResultCard
                result={{
                  id: result.id,
                  taskId: result.taskId,
                  configId: result.configId,
                  runDate: result.runDate,
                  totalTrades: result.totalTrades,
                  winRate: result.winRate,
                  totalPnlUsdt: result.totalPnlUsdt,
                  totalPnlPercent: result.totalPnlPercent,
                  maxDrawdownPercent: result.maxDrawdownPercent,
                  sharpeRatio: result.sharpeRatio,
                  profitFactor: result.profitFactor,
                  strategyConfig: result.strategyConfig,
                }}
                onSelect={() => {
                  onSelectResult?.(result.id);
                }}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showNavigation && (
          <>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="absolute top-1/2 left-2 z-10 h-8 w-8 min-w-0 -translate-y-1/2 bg-black/60 hover:bg-black/80"
              onPress={handlePrev}
            >
              <FiChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="absolute top-1/2 right-2 z-10 h-8 w-8 min-w-0 -translate-y-1/2 bg-black/60 hover:bg-black/80"
              onPress={handleNext}
            >
              <FiChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Counter Badge */}
        {showNavigation && (
          <div className="absolute top-2 right-2 z-10 rounded bg-black/60 px-2 py-1 text-xs text-white">
            {currentIndex + 1} / {results.length}
          </div>
        )}
      </div>

      {/* Pagination Indicators */}
      {showNavigation && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {results.map((_, index) => (
            <button
              key={index}
              className={twMerge(
                "h-2 rounded-full transition-all",
                index === currentIndex
                  ? "bg-primary-400 w-4"
                  : "w-2 bg-neutral-600 hover:bg-neutral-500",
              )}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
