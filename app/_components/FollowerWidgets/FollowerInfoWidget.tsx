"use client";

import { useMemo } from "react";
import { Address } from "viem";
import { Chip } from "@heroui/react";
import { FollowerDetail, PnlSnapshotKind } from "@/graphql/gql/graphql";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { LabeledChip } from "@/components/chips/LabeledChip";

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
        const openPrice = data?.openPrice
          ? Number(data.openPrice) / 1e10
          : 0;

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

  const accUSDPnl =
    follower.pnlSnapshots.find((item) => item.kind === PnlSnapshotKind.AllTime)
      ?.accUSDPnl || 0;

  const ethBalance = (Number(follower.ethBalance) / 1e18).toFixed(4);

  return (
    <div className="flex flex-1 items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Chip>{follower.accountIndex}</Chip>
        <AddressWidget address={follower.address as Address} />

        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-100">{ethBalance}</span>
          <span className="text-xs text-neutral-400">ETH</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-100">
            {getPriceStr(totalCollateralUsd)}
          </span>
          <span className="text-xs text-neutral-400">USD</span>
        </div>

        {accUSDPnl !== 0 ? (
          <Chip color={accUSDPnl > 0 ? "warning" : "danger"}>
            {getPriceStr(accUSDPnl)} USD
          </Chip>
        ) : null}

        {follower.trades.length > 0 ? (
          <Chip color="success">{follower.trades.length} Trades</Chip>
        ) : null}

        {follower.pendingOrders.length > 0 ? (
          <Chip color="secondary">
            {follower.pendingOrders.length} Pendings
          </Chip>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
        {follower.trades.length > 0 && (
          <LabeledChip
            label="uPnL"
            value={getPriceStr(summary.pnls, 2)}
            unit="$"
            isPrefix={true}
            color={summary.pnls >= 0 ? "warning" : "danger"}
          />
        )}

        {follower.trades.length > 0 && (
          <LabeledChip
            label="Size"
            value={getPriceStr(summary.size)}
            unit="$"
            isPrefix={true}
            color="default"
          />
        )}
      </div>
    </div>
  );
}
