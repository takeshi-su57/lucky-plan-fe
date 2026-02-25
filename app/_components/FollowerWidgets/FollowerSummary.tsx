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
import { useCollateralUsdPrices } from "@/app/_hooks/useCollateralUsdPrices";
import { getCollateral } from "@/web3/gns/v10/configs";

export type FollowerSummaryProps = {
  contractId: number;
  chainId: number;
  diamondAddress: string;
  followers: FollowerDetail[];
};

export function FollowerSummary({
  contractId,
  chainId,
  diamondAddress,
  followers,
}: FollowerSummaryProps) {
  const prices = useGetPrices();
  const collateralUsdPrices = useCollateralUsdPrices(chainId, diamondAddress);

  const generateFollower = useGenerateFollower();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleGenerateFollower = () => {
    generateFollower({
      variables: {},
    });
  };

  const summary = useMemo(() => {
    return followers
      .flatMap((follower) => follower.trades)
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
  }, [followers, prices, chainId, collateralUsdPrices]);

  const { totalEarned, totalLost, totalEth, totalCollateralUsd } =
    useMemo(() => {
      const result = followers.reduce(
        (acc, item) => {
          const accUSDPnl =
            item.pnlSnapshots.find(
              (snap) => snap.kind === PnlSnapshotKind.AllTime,
            )?.accUSDPnl || 0;

          let collateralUsd = 0;
          for (const cb of item.collateralBalances || []) {
            const collateral = getCollateral(chainId, cb.collateralIndex);
            const precision = collateral
              ? Number(collateral.precision)
              : 1e6;
            const amount = Number(cb.balance || 0) / precision;
            const usdPrice = collateralUsdPrices[cb.collateralIndex] || 0;
            collateralUsd += amount * usdPrice;
          }

          return {
            totalEarned: acc.totalEarned + (accUSDPnl > 0 ? accUSDPnl : 0),
            totalLost: acc.totalLost + (accUSDPnl < 0 ? accUSDPnl : 0),
            totalEth: acc.totalEth + Number(item.ethBalance || 0) / 1e18,
            totalCollateralUsd: acc.totalCollateralUsd + collateralUsd,
          };
        },
        { totalEarned: 0, totalLost: 0, totalEth: 0, totalCollateralUsd: 0 },
      );

      return result;
    }, [followers, chainId, collateralUsdPrices]);

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
          value={getPriceStr(totalCollateralUsd)}
          unit="USD"
          color="default"
        />

        <LabeledChip
          label="Earned"
          value={getPriceStr(totalEarned)}
          unit="USD"
          color="warning"
        />

        <LabeledChip
          label="Lost"
          value={getPriceStr(totalLost)}
          unit="USD"
          color="danger"
        />

        <LabeledChip
          label="Unrealized PNL"
          value={getPriceStr(summary.pnls)}
          unit="USD"
          color={summary.pnls >= 0 ? "warning" : "danger"}
        />

        <LabeledChip
          label="Locked at Gains"
          value={getPriceStr(summary.size)}
          unit="USD"
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
        chainId={chainId}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
