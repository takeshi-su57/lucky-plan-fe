"use client";

import { Address } from "viem";
import { Chip, Skeleton } from "@nextui-org/react";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { LabeledChip } from "@/components/chips/LabeledChip";

import {
  useGetTradedOrders,
  useGetPendingOrders,
} from "@/app-hooks/useFollower";
import { useGetPrices } from "@/app-hooks/useGetPrices";

import { getPriceStr } from "@/utils/price";
import { getPNLPercentage } from "@/utils";

export type FollowerInfoWidgetProps = {
  follower: {
    address: string;
    accountIndex: number;
    publicKey: string;
    ethBalance: number;
    usdcBalance: number;
    contractId: number;
    accUSDPnl: number;
  };
};

export function FollowerInfoWidget({ follower }: FollowerInfoWidgetProps) {
  const { pendingOrders, loading: pendingOrdersLoading } = useGetPendingOrders(
    follower.address,
    follower.contractId,
  );
  const { trades, loading: tradedOrdersLoading } = useGetTradedOrders(
    follower.address,
    follower.contractId,
  );
  const prices = useGetPrices();

  const items = [
    {
      id: "eth",
      label: "ETH",
      value: (Number(follower.ethBalance) / 1e18).toFixed(9) || "",
    },
    {
      id: "usdc",
      label: "USDC",
      value: Number(follower.usdcBalance) / 1e6,
    },
  ];

  const counts = trades.length || 0;
  const summary = trades
    .map((trade) => {
      const data = JSON.parse(trade.params);

      const currentPrice = prices?.[data?.pairIndex || 0];
      const openPrice = data?.openPrice ? Number(data.openPrice) / 1e10 : 0;
      const collateralAmount = data?.collateralAmount
        ? Number(data.collateralAmount) / 1e6
        : 0;

      const pnlPercentage = currentPrice
        ? getPNLPercentage({
            closePrice: currentPrice,
            openPrice,
            leverage: data.leverage / 1000,
            long: data.long,
          })
        : 0;

      return {
        pnls: (collateralAmount * pnlPercentage) / 100,
        size: collateralAmount,
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

  const pendingOrdersCount = pendingOrders.length || 0;

  return (
    <div className="flex flex-1 items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Chip>{follower.accountIndex}</Chip>
        <AddressWidget address={follower.address as Address} />

        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <span className="text-sm text-neutral-100">{item.value}</span>
            <span className="text-xs text-neutral-400">{item.label}</span>
          </div>
        ))}

        {follower.accUSDPnl !== 0 ? (
          <Chip color={follower.accUSDPnl > 0 ? "warning" : "danger"}>
            {getPriceStr(follower.accUSDPnl)} USDC
          </Chip>
        ) : null}

        {tradedOrdersLoading ? (
          <Skeleton className="rounded-lg">
            <div className="h-8 w-[80px] rounded-full bg-default-300" />
          </Skeleton>
        ) : counts !== 0 ? (
          <Chip color="success">{counts} Trades</Chip>
        ) : null}

        {pendingOrdersLoading ? (
          <Skeleton className="rounded-lg">
            <div className="h-8 w-[80px] rounded-full bg-default-300" />
          </Skeleton>
        ) : pendingOrdersCount !== 0 ? (
          <Chip color="secondary">{pendingOrdersCount} Pendings</Chip>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
        {counts > 0 && (
          <LabeledChip
            label="uPnL"
            value={getPriceStr(summary.pnls, 2)}
            unit="$"
            isPrefix={true}
            color={summary.pnls > 0 ? "warning" : "danger"}
          />
        )}

        {counts > 0 && (
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
