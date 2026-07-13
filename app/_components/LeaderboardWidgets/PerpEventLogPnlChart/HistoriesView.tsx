"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import { getPriceStr } from "@/utils/price";
import {
  convertMillisToReadableTime,
  getPNLPercentage,
} from "@/utils";
import { useGetPrices } from "@/app/_hooks/useGetPrices";
import { getPairIndex } from "@/web3/gns/v10/configs";
import {
  PerpTradeHistoryOperation,
  type PerpTradeHistory,
} from "@/graphql/gql/graphql";
import PairIcon from "../PairIcon";

export type HistoriesViewProps = {
  histories: PerpTradeHistory[];
};

export function HistoriesView({ histories }: HistoriesViewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const prices = useGetPrices();

  if (histories.length === 0) return null;

  const latestHistory = histories[histories.length - 1];
  const openHistory = histories[0];
  const isLong = latestHistory.isLong;
  const isClosed = histories.some(
    (history) => history.operation === PerpTradeHistoryOperation.Close,
  );
  const pnl = histories.reduce((acc, history) => acc + history.usdPnl, 0);
  const collateral = isClosed
    ? Math.max(...histories.map((history) => history.collateralInUsd))
    : latestHistory.collateralInUsd;
  const leverage = isClosed
    ? Math.max(...histories.map((history) => history.leverage))
    : latestHistory.leverage;
  const currentPrice = prices?.[getPairIndex(42161, latestHistory.pair)] || 0;
  const pnlPercentage = getPNLPercentage({
    closePrice: currentPrice,
    openPrice: latestHistory.price,
    leverage,
    long: isLong,
  });
  const unrealizedPnl = isClosed ? 0 : (collateral * pnlPercentage) / 100;
  const totalPnl = pnl + unrealizedPnl;
  const [from, to] = latestHistory.pair.split("/");
  const directionClass = isLong ? "text-green-500" : "text-red-500";

  return (
    <section className="border-default-100 border-b last:border-b-0">
      <button
        type="button"
        onClick={() => setIsExpanded((expanded) => !expanded)}
        aria-expanded={isExpanded}
        className="hover:bg-default-100/50 flex w-full items-start gap-3 rounded-lg px-2 py-3 text-left transition-colors"
      >
        <span className="text-default-500 mt-1 shrink-0" aria-hidden="true">
          {isExpanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
        </span>

        <PairIcon from={from} to={to} width={22} height={22} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span className={twMerge("truncate text-sm font-semibold", directionClass)}>
              {latestHistory.pair}
            </span>
            <span
              className={twMerge(
                "shrink-0 text-xs font-medium",
                totalPnl >= 0 ? "text-green-500" : "text-red-500",
              )}
            >
              {`PnL: $${getPriceStr(pnl, 0)} + $${getPriceStr(unrealizedPnl, 0)}`}
            </span>
          </div>

          <p className="text-default-500 mt-1 text-xs">
            <b>{getPriceStr(openHistory.price)}</b> {" → "}{" "}
            <b>{getPriceStr(latestHistory.price)}</b>
          </p>
          <p className="text-default-500 mt-0.5 text-xs">
            {`$${getPriceStr(collateral, 0)} × ${leverage}x`}
            <span className="mx-1.5">·</span>
            {`${convertMillisToReadableTime(dayjs().diff(dayjs(latestHistory.date)))} ago`}
            <span className="mx-1.5">·</span>
            {dayjs(latestHistory.date).format("MMM DD HH:mm")}
          </p>
        </div>
      </button>

      {isExpanded ? (
        <div className="pb-4 pl-8 pr-2">
          <p className="text-default-600 mb-3 text-xs font-semibold">
            Position activities
          </p>
          <ol className="border-default-200 ml-3 space-y-0 border-l">
            {histories.map((history, index) => {
              const previousHistory = histories[index - 1];
              const elapsed = previousHistory
                ? convertMillisToReadableTime(
                    dayjs(history.date).diff(dayjs(previousHistory.date)),
                  )
                : null;

              return (
                <li key={`${history.operation}-${history.date}-${index}`} className="relative pb-4 pl-5 last:pb-0">
                  <span
                    className={twMerge(
                      "border-background absolute -left-1.5 top-1 size-3 rounded-full border-2",
                      isLong ? "bg-green-500" : "bg-red-500",
                    )}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="text-sm font-medium">{history.operation}</span>
                    <span className="text-default-500 text-xs">
                      {dayjs(history.date).format("MMM DD HH:mm")}
                    </span>
                  </div>
                  <p className="text-default-500 mt-1 text-xs">
                    {`${getPriceStr(history.price)} ${history.pair.split("/")[1]} · $${getPriceStr(history.collateralInUsd, 0)} × ${history.leverage}x`}
                  </p>
                  {previousHistory ? (
                    <p className="text-default-500 mt-1 text-xs">
                      {`${elapsed} later · Delta: $${getPriceStr(history.collateralDeltaUsd)}`}
                      {history.usdPnl !== 0 ? (
                        <span
                          className={twMerge(
                            "ml-1.5",
                            history.usdPnl > 0 ? "text-green-500" : "text-red-500",
                          )}
                        >
                          {`$${getPriceStr(history.usdPnl)}`}
                        </span>
                      ) : null}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
