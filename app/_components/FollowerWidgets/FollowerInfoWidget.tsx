"use client";

import { Address } from "viem";
import { Chip } from "@nextui-org/react";
import { FollowerDetail, PnlSnapshotKind } from "@/graphql/gql/graphql";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { LabeledChip } from "@/components/chips/LabeledChip";

import { getPriceStr } from "@/utils/price";
import { useGetPrices } from "@/app/_hooks/useGetPrices";
import { getPNLPercentage } from "@/utils";

export type FollowerInfoWidgetProps = {
  follower: FollowerDetail;
};

export function FollowerInfoWidget({ follower }: FollowerInfoWidgetProps) {
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

  const summary = follower.trades
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

  const accUSDPnl =
    follower.pnlSnapshots.find((item) => item.kind === PnlSnapshotKind.AllTime)
      ?.accUSDPnl || 0;

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

        {accUSDPnl !== 0 ? (
          <Chip color={accUSDPnl > 0 ? "warning" : "danger"}>
            {getPriceStr(accUSDPnl)} USDC
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
