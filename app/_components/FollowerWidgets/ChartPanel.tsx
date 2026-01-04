"use client";

import { useState, useEffect, useRef } from "react";
import { Autocomplete, AutocompleteItem, Input } from "@heroui/react";

import { getPairName, getPairs } from "@/web3/gns/v10/configs";
import { useGetPrices } from "@/app/_hooks/useGetPrices";
import { useFetchGnsPrices } from "@/app/_hooks/useFollower";
import { PricingChart } from "./PricingChart";

const pairs = getPairs(42161);
const MAX_CHART_POINTS = 10000;
const MIN_CHART_POINTS = 100;
const DEFAULT_CHART_POINTS = 2000;
const INTERVAL_MS = 250;

type PricePoint = {
  price: number;
  date: Date;
};

// Interpolate prices to consistent 250ms intervals
function interpolatePrices(prices: PricePoint[], intervalMs: number): number[] {
  if (prices.length === 0) return [];
  if (prices.length === 1) return [prices[0].price];

  // Sort by date ascending
  const sorted = [...prices].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );

  const startTime = sorted[0].date.getTime();
  const endTime = sorted[sorted.length - 1].date.getTime();
  const totalIntervals = Math.floor((endTime - startTime) / intervalMs);

  if (totalIntervals <= 0) return [sorted[0].price];

  const result: number[] = [];

  for (let i = 0; i <= totalIntervals; i++) {
    const targetTime = startTime + i * intervalMs;

    // Find surrounding price points
    let prevPoint = sorted[0];
    let nextPoint = sorted[sorted.length - 1];

    for (let j = 0; j < sorted.length - 1; j++) {
      if (
        sorted[j].date.getTime() <= targetTime &&
        sorted[j + 1].date.getTime() >= targetTime
      ) {
        prevPoint = sorted[j];
        nextPoint = sorted[j + 1];
        break;
      }
    }

    const prevTime = prevPoint.date.getTime();
    const nextTime = nextPoint.date.getTime();

    // Linear interpolation
    if (nextTime === prevTime) {
      result.push(prevPoint.price);
    } else {
      const ratio = (targetTime - prevTime) / (nextTime - prevTime);
      const interpolatedPrice =
        prevPoint.price + ratio * (nextPoint.price - prevPoint.price);
      result.push(interpolatedPrice);
    }
  }

  return result;
}

// Calculate speed (comparing points at speedUnit distance apart)
function calculateChangeRateSpeed(
  prices: number[],
  speedUnit: number,
): number[] {
  if (prices.length === 0) return [];

  return prices.map((price, i) => {
    const prevIndex = i - speedUnit;
    if (prevIndex < 0) return 0;

    const prevPrice = prices[prevIndex];
    if (prevPrice === 0) return 0;

    return (
      Math.floor(((price - prevPrice) / prevPrice) * 100 * 100000) / 100000
    );
  });
}

const DEFAULT_SPEED_UNIT_1 = 100;
const DEFAULT_SPEED_UNIT_2 = 500;
const MIN_SPEED_UNIT = 10;
const MAX_SPEED_UNIT = 5000;

export function ChartPanel() {
  const prices = useGetPrices();
  const fetchGnsPrices = useFetchGnsPrices();

  const [pairIndex, setPairIndex] = useState<string | null>(null);
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [visiblePoints, setVisiblePoints] = useState(DEFAULT_CHART_POINTS);
  const [speedUnit1, setSpeedUnit1] = useState(DEFAULT_SPEED_UNIT_1);
  const [speedUnit2, setSpeedUnit2] = useState(DEFAULT_SPEED_UNIT_2);

  const timerRef = useRef<number>(0);

  const selectedPair = pairs.find((p) => p.pairIndex.toString() === pairIndex);
  const pairName = selectedPair
    ? `${selectedPair.from}/${selectedPair.to}`
    : "";

  const handleChangePairIndex = async (newPairIndex: string) => {
    setPairIndex(newPairIndex);
    const pairName = getPairName(42161, Number(newPairIndex));
    if (!pairName) return;

    const toDate = new Date();
    const fromDate = new Date(toDate.getTime() - 30 * 60 * 1000);

    const historicalPrices = await fetchGnsPrices(pairName, fromDate, toDate);
    const interpolated = interpolatePrices(historicalPrices, INTERVAL_MS);
    setPriceHistory(interpolated.slice(-MAX_CHART_POINTS));
  };

  // Update with live prices
  useEffect(() => {
    if (!prices || pairIndex === null) {
      return;
    }

    if (Date.now() - timerRef.current < 250) {
      return;
    }

    timerRef.current = Date.now();

    setPriceHistory((prev) => {
      const newPrices: number[] = [...(prev || []), prices[Number(pairIndex)]];

      return newPrices.slice(
        Math.max(0, newPrices.length - MAX_CHART_POINTS),
        newPrices.length,
      );
    });
  }, [prices, pairIndex]);

  // Slice price history based on visible points for display
  const displayPriceHistory = priceHistory.slice(
    Math.max(0, priceHistory.length - visiblePoints),
    priceHistory.length,
  );

  // Calculate speed data
  const speedData1 = calculateChangeRateSpeed(displayPriceHistory, speedUnit1);
  const speedData2 = calculateChangeRateSpeed(displayPriceHistory, speedUnit2);
  const currentSpeed1 =
    speedData1.length > 0 ? speedData1[speedData1.length - 1] : 0;
  const currentSpeed2 =
    speedData2.length > 0 ? speedData2[speedData2.length - 1] : 0;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
        Charts
      </h1>

      <Autocomplete
        label="Pair"
        variant="underlined"
        defaultItems={pairs}
        placeholder="Search pair"
        selectedKey={pairIndex}
        onSelectionChange={(key) => {
          if (key) {
            handleChangePairIndex(key as string);
          }
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.pairIndex} className="font-mono">
            {`${item.from}/${item.to}`}
          </AutocompleteItem>
        )}
      </Autocomplete>

      <div className="flex flex-row gap-4">
        <Input
          type="number"
          label="Visible Points"
          min={MIN_CHART_POINTS}
          max={MAX_CHART_POINTS}
          value={visiblePoints.toString()}
          onValueChange={(value) => {
            const num = parseInt(value, 10);
            if (!isNaN(num)) {
              setVisiblePoints(Math.min(MAX_CHART_POINTS, Math.max(MIN_CHART_POINTS, num)));
            }
          }}
          className="max-w-32"
        />

        <Input
          type="number"
          label="Speed 1 Unit"
          min={MIN_SPEED_UNIT}
          max={MAX_SPEED_UNIT}
          value={speedUnit1.toString()}
          onValueChange={(value) => {
            const num = parseInt(value, 10);
            if (!isNaN(num)) {
              setSpeedUnit1(Math.min(MAX_SPEED_UNIT, Math.max(MIN_SPEED_UNIT, num)));
            }
          }}
          className="max-w-32"
        />

        <Input
          type="number"
          label="Speed 2 Unit"
          min={MIN_SPEED_UNIT}
          max={MAX_SPEED_UNIT}
          value={speedUnit2.toString()}
          onValueChange={(value) => {
            const num = parseInt(value, 10);
            if (!isNaN(num)) {
              setSpeedUnit2(Math.min(MAX_SPEED_UNIT, Math.max(MIN_SPEED_UNIT, num)));
            }
          }}
          className="max-w-32"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-neutral-400">
          {pairName} - Live Price: $
          {prices?.[Number(pairIndex)]?.toFixed(2) || "0.00"}
          <span
            className={
              currentSpeed1 >= 0 ? "text-yellow-500" : "text-orange-500"
            }
          >
            {" "}
            [S1: {currentSpeed1 >= 0 ? "+" : ""}
            {currentSpeed1.toFixed(4)}%]
          </span>
          <span
            className={
              currentSpeed2 >= 0 ? "text-green-500" : "text-red-500"
            }
          >
            {" "}
            [S2: {currentSpeed2 >= 0 ? "+" : ""}
            {currentSpeed2.toFixed(4)}%]
          </span>{" "}
          ({displayPriceHistory.length} points)
        </span>
      </div>

      <PricingChart
        priceHistory={displayPriceHistory}
        speedHistory1={speedData1}
        speedHistory2={speedData2}
      />
    </div>
  );
}
