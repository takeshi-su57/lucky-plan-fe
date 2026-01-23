"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Button, Spinner } from "@heroui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import { useBacktestResultFile } from "@/app-hooks/useBacktest";
import type { BacktestResult } from "@/graphql/gql/graphql";

export type BestConfigChartCarouselProps = {
  results: BacktestResult[];
  onSelectResult?: (resultId: string) => void;
};

function ChartSlide({
  result,
  onSelect,
}: {
  result: BacktestResult;
  onSelect?: () => void;
}) {
  const { file: chartFile, loading: chartLoading } = useBacktestResultFile(
    result.taskId,
    result.runDate,
    result.configId,
    "pnl-chart.png",
  );

  return (
    <div
      className={twMerge(
        "relative h-full w-full",
        onSelect && "cursor-pointer",
      )}
      onClick={onSelect}
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
  );
}

export function BestConfigChartCarousel({
  results,
  onSelectResult,
}: BestConfigChartCarouselProps) {
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
    <div className="relative h-full w-full">
      {/* Carousel Container */}
      <div className="h-full w-full overflow-hidden">
        {/* Sliding Track */}
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {results.map((result) => (
            <div key={result.id} className="h-full w-full shrink-0">
              <ChartSlide
                result={result}
                onSelect={
                  onSelectResult ? () => onSelectResult(result.id) : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showNavigation && (
        <>
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="absolute top-1/2 left-1 z-10 h-6 w-6 min-w-0 -translate-y-1/2 bg-black/50 hover:bg-black/70"
            onPress={handlePrev}
          >
            <FiChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="absolute top-1/2 right-1 z-10 h-6 w-6 min-w-0 -translate-y-1/2 bg-black/50 hover:bg-black/70"
            onPress={handleNext}
          >
            <FiChevronRight className="h-3 w-3" />
          </Button>
        </>
      )}

      {/* Counter Badge */}
      {showNavigation && (
        <div className="absolute top-1 right-1 z-10 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
          {currentIndex + 1}/{results.length}
        </div>
      )}

      {/* Pagination Dots */}
      {showNavigation && (
        <div className="absolute right-0 bottom-1 left-0 z-10 flex items-center justify-center gap-1">
          {results.map((_, index) => (
            <button
              key={index}
              className={twMerge(
                "h-1.5 rounded-full transition-all",
                index === currentIndex
                  ? "bg-primary-400 w-3"
                  : "w-1.5 bg-neutral-600 hover:bg-neutral-500",
              )}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
