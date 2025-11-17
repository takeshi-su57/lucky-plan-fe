"use client";

import { useMemo } from "react";
import { Button, useDisclosure } from "@heroui/react";
import { FaPlus } from "react-icons/fa";

import { useGenerateFollower } from "@/app-hooks/useFollower";
import { getPNLPercentage } from "@/utils";
import { getPriceStr } from "@/utils/price";

import { LabeledChip } from "@/components/chips/LabeledChip";
import { WithdrawModal } from "./WithdrawModal";
import { FollowerDetail, PnlSnapshotKind } from "@/graphql/gql/graphql";
import { useGetPrices } from "@/app/_hooks/useGetPrices";

export type FollowerSummaryProps = {
  contractId: number;
  followers: FollowerDetail[];
};

export function FollowerSummary({
  contractId,
  followers,
}: FollowerSummaryProps) {
  const prices = useGetPrices();

  const generateFollower = useGenerateFollower();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleGenerateFollower = () => {
    generateFollower({
      variables: {},
    });
  };

  const summary = followers
    .flatMap((follower) => follower.trades)
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

  const { totalEarned, totalLost, totalEth, totalUsdc } = useMemo(() => {
    return followers.reduce(
      (acc, item) => {
        const accUSDPnl =
          item.pnlSnapshots.find(
            (item) => item.kind === PnlSnapshotKind.AllTime,
          )?.accUSDPnl || 0;

        return {
          totalEarned: acc.totalEarned + (accUSDPnl > 0 ? accUSDPnl : 0),
          totalLost: acc.totalLost + (accUSDPnl < 0 ? accUSDPnl : 0),
          totalEth: acc.totalEth + Number(item.ethBalance || 0) / 1e18,
          totalUsdc: acc.totalUsdc + Number(item.usdcBalance || 0) / 1e6,
        };
      },
      { totalEarned: 0, totalLost: 0, totalEth: 0, totalUsdc: 0 },
    );
  }, [followers]);

  return (
    <div>
      <div className="flex items-center gap-4">
        <LabeledChip
          label="Pending Orders"
          value={followers
            .map((item) => item.pendingOrders.length)
            .reduce((acc, item) => acc + item, 0)}
          unit=""
          color="secondary"
        />

        <LabeledChip
          label="Open Trades"
          value={followers
            .map((item) => item.trades.length)
            .reduce((acc, item) => acc + item, 0)}
          unit=""
          color="success"
        />

        <LabeledChip label="Gas" value={totalEth.toFixed(2)} unit="ETH" />

        <LabeledChip
          label="Collateral"
          value={totalUsdc.toFixed(2)}
          unit="USDC"
          color="default"
        />

        <LabeledChip
          label="Earned"
          value={getPriceStr(totalEarned)}
          unit="USDC"
          color="warning"
        />

        <LabeledChip
          label="Lost"
          value={getPriceStr(totalLost)}
          unit="USDC"
          color="danger"
        />

        <LabeledChip
          label="Unrealized PNL"
          value={summary.pnls.toFixed(1)}
          unit="USDC"
          color={summary.pnls >= 0 ? "warning" : "danger"}
        />

        <LabeledChip
          label="Locked at Gains"
          value={getPriceStr(summary.size)}
          unit="USDC"
          color="default"
        />

        {contractId ? (
          <Button color="primary" variant="flat" radius="sm" onClick={onOpen}>
            Withdraw
          </Button>
        ) : null}

        <Button
          isIconOnly
          color="primary"
          variant="flat"
          radius="sm"
          onClick={handleGenerateFollower}
        >
          <FaPlus />
        </Button>
      </div>

      <WithdrawModal
        contractId={+contractId}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
