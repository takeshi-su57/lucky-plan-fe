import { twMerge } from "tailwind-merge";
import { Chip } from "@heroui/react";
import dayjs from "dayjs";

import { getPercentageStr, getPriceStr } from "@/utils/price";
import { useGetPrices } from "@/app/_hooks/useGetPrices";
import { getPairIndex } from "@/web3/gns/v10/configs";
import { convertMillisToReadableTime, getPNLPercentage } from "@/utils";
import PairIcon from "../PairIcon";

export type PositionItemProps = {
  pair: string;
  openPrice: number;
  price: number;
  collateral: number;
  leverage: number;
  date: Date;
  pnl: number;
  isLong: boolean;
  isClosed: boolean;
  actions: number;
};

export function PositionItem({
  pair,
  openPrice,
  price,
  collateral,
  leverage,
  date,
  pnl,
  isLong,
  isClosed,
  actions,
}: PositionItemProps) {
  const prices = useGetPrices();
  const pairIndex = getPairIndex(42161, pair);

  const currentPrice = prices?.[pairIndex] || 0;

  const priceDelta = currentPrice - price;

  const pnlPercentage = getPNLPercentage({
    closePrice: currentPrice,
    openPrice: price,
    leverage,
    long: isLong,
  });

  const uPnL = isClosed ? 0 : (collateral * pnlPercentage) / 100;
  const totalPnL = uPnL + pnl;
  const isLatest =
    dayjs(date).diff(dayjs(), "minute") >= -60 &&
    dayjs(date).diff(dayjs(), "minute") <= 60;

  const [from, to] = pair.split("/");

  return (
    <div
      className={twMerge(
        "relative w-[250px] rounded-3xl p-4",
        isLong ? "bg-green-900/30" : "bg-red-950/30",
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex size-8">
              {isLatest ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
              ) : null}
              <PairIcon from={from} to={to} width={32} height={32} />
            </span>

            <div className="flex flex-col text-xs text-neutral-400">
              <span className="text-sm">
                {pair} - ({actions})
              </span>
            </div>
          </div>
        </div>

        {isClosed ? (
          <span className="text-xs text-neutral-400">
            <b>{`${getPriceStr(openPrice)}`}</b> {" -> "}
            <b>{`${getPriceStr(price)}`}</b>
          </span>
        ) : (
          <span className="text-base text-neutral-400">
            <b>{`${getPriceStr(price)}`}</b>{" "}
            <span
              className={twMerge(
                "text-xs",
                priceDelta >= 0 ? "text-green-700" : "text-red-700",
              )}
            >{`${priceDelta > 0 ? "+" : "-"}${getPriceStr(priceDelta)}`}</span>
          </span>
        )}

        <span
          className={twMerge(
            "text-sm",
            totalPnL >= 0 ? "text-green-700" : "text-red-700",
          )}
        >
          {`PnL: $${getPriceStr(pnl, 0)} + $${getPriceStr(uPnL, 0)}`}
        </span>

        <span className="text-xs text-neutral-400">
          <b>{`$${getPriceStr(collateral, 0)}`}</b> x <b>{`${leverage}x`}</b>
        </span>

        <span className="text-xs italic text-neutral-400/60">
          {convertMillisToReadableTime(dayjs().diff(dayjs(date)))} ago
        </span>

        <span className="text-xs italic text-neutral-400/60">
          Date: {dayjs(date).format("MMM DD HH:mm")}
        </span>

        {isClosed ? (
          <Chip variant="flat" color="success" className="text-xs">
            Closed
          </Chip>
        ) : (
          <div className="flex items-center gap-6">
            <Chip variant="flat" color="warning" className="text-xs">
              Opened
            </Chip>
            {!isClosed ? (
              <span
                className={twMerge(
                  "text-sm",
                  pnlPercentage >= 0 ? "text-green-700" : "text-red-700",
                )}
              >
                {`${getPercentageStr(pnlPercentage)} %`}
              </span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
