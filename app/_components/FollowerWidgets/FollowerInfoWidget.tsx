"use client";

import { useMemo } from "react";
import { Address } from "viem";
import { Chip } from "@heroui/react";
import { FollowerDetail } from "@/graphql/gql/graphql";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { getPriceStr } from "@/utils/price";
import { useGetPrices } from "@/app/_hooks/useGetPrices";
import { getPNLPercentage } from "@/utils";
import { useCollateralUsdPrices } from "@/app/_hooks/useCollateralUsdPrices";
import { getCollateral } from "@/web3/gns/v10/configs";

export type FollowerInfoWidgetProps = {
  follower: FollowerDetail;
  chainId: number;
  diamondAddress: string;
};

export function FollowerInfoWidget({
  follower,
  chainId,
  diamondAddress,
}: FollowerInfoWidgetProps) {
  const prices = useGetPrices();
  const collateralUsdPrices = useCollateralUsdPrices(chainId, diamondAddress);

  const totalCollateralUsd = useMemo(() => {
    let total = 0;
    for (const cb of follower.collateralBalances || []) {
      const collateral = getCollateral(chainId, cb.collateralIndex);
      const precision = collateral ? Number(collateral.precision) : 1e6;
      const amount = Number(cb.balance || 0) / precision;
      const usdPrice = collateralUsdPrices[cb.collateralIndex] || 0;
      total += amount * usdPrice;
    }
    return total;
  }, [follower.collateralBalances, chainId, collateralUsdPrices]);

  const summary = useMemo(() => {
    return follower.trades
      .map((trade) => {
        const data = JSON.parse(trade.params);

        const currentPrice = prices?.[data?.pairIndex || 0];
        const openPrice = data?.openPrice ? Number(data.openPrice) / 1e10 : 0;

        const tradeCollateral =
          chainId && data?.collateralIndex
            ? getCollateral(chainId, data.collateralIndex)
            : null;
        const tradePrecision = tradeCollateral
          ? Number(tradeCollateral.precision)
          : 1e6;

        const collateralAmount = data?.collateralAmount
          ? Number(data.collateralAmount) / tradePrecision
          : 0;

        const usdPrice = collateralUsdPrices[data?.collateralIndex] || 0;

        const pnlPercentage = currentPrice
          ? getPNLPercentage({
              closePrice: currentPrice,
              openPrice,
              leverage: data.leverage / 1000,
              long: data.long,
            })
          : 0;

        return {
          pnls: ((collateralAmount * pnlPercentage) / 100) * usdPrice,
          size: collateralAmount * usdPrice,
        };
      })
      .reduce(
        (acc, item) => {
          return {
            pnls: acc.pnls + item.pnls,
            size: acc.size + item.size,
          };
        },
        { pnls: 0, size: 0 },
      );
  }, [follower.trades, prices, chainId, collateralUsdPrices]);

  const accUSDPnl = follower.pnlSnapshots[0]?.accUSDPnl || 0;

  const ethBalance = (Number(follower.ethBalance) / 1e18).toFixed(4);

  const pnlColor = accUSDPnl > 0 ? "text-warning" : "text-danger";

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <Chip
          size="sm"
          radius="sm"
          variant="flat"
          color="primary"
          className="shrink-0 font-semibold"
        >
          #{follower.accountIndex}
        </Chip>

        <div className="min-w-0">
          <AddressWidget address={follower.address as Address} />
          <div className="text-default-500 mt-1 flex flex-wrap items-center gap-2 text-[11px]">
            <span>User {follower.userId}</span>
            <span className="bg-default-300 h-1 w-1 rounded-full" />
            <span>Contract {follower.contractId}</span>
          </div>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-4 md:flex md:flex-wrap md:justify-end">
        <div className="border-default-200 bg-default-50 rounded-lg border px-3 py-2">
          <div className="text-default-500 text-[11px]">Gas</div>
          <div className="text-default-800 mt-1 text-sm font-semibold whitespace-nowrap">
            {ethBalance}{" "}
            <span className="text-default-400 text-[11px]">ETH</span>
          </div>
        </div>

        <div className="border-default-200 bg-default-50 rounded-lg border px-3 py-2">
          <div className="text-default-500 text-[11px]">Collateral</div>
          <div className="text-default-800 mt-1 text-sm font-semibold whitespace-nowrap">
            {getPriceStr(totalCollateralUsd)}{" "}
            <span className="text-default-400 text-[11px]">USD</span>
          </div>
        </div>

        <div className="border-default-200 bg-default-50 rounded-lg border px-3 py-2">
          <div className="text-default-500 text-[11px]">Realized PnL</div>
          <div
            className={`mt-1 text-sm font-semibold whitespace-nowrap ${
              accUSDPnl === 0 ? "text-default-700" : pnlColor
            }`}
          >
            {getPriceStr(accUSDPnl)}{" "}
            <span className="text-default-400 text-[11px]">USD</span>
          </div>
        </div>

        <div className="border-default-200 bg-default-50 flex items-center gap-2 rounded-lg border px-3 py-2">
          <Chip size="sm" radius="sm" variant="flat" color="success">
            {follower.trades.length}
          </Chip>
          <span className="text-default-500 text-[11px]">Trades</span>
          <Chip size="sm" radius="sm" variant="flat" color="secondary">
            {follower.pendingOrders.length}
          </Chip>
          <span className="text-default-500 text-[11px]">Pending</span>
        </div>

        {follower.trades.length > 0 ? (
          <>
            <div className="border-default-200 bg-default-50 rounded-lg border px-3 py-2">
              <div className="text-default-500 text-[11px]">uPnL</div>
              <div
                className={`mt-1 text-sm font-semibold whitespace-nowrap ${
                  summary.pnls >= 0 ? "text-warning" : "text-danger"
                }`}
              >
                ${getPriceStr(summary.pnls, 2)}
              </div>
            </div>

            <div className="border-default-200 bg-default-50 rounded-lg border px-3 py-2">
              <div className="text-default-500 text-[11px]">Size</div>
              <div className="text-default-800 mt-1 text-sm font-semibold whitespace-nowrap">
                ${getPriceStr(summary.size)}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
