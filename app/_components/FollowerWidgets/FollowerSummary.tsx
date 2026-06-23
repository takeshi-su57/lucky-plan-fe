"use client";

import { useMemo } from "react";
import { Button, ChipProps, Tooltip, useDisclosure } from "@heroui/react";
import { FaPlus, FaWallet } from "react-icons/fa";

import { useGenerateFollower } from "@/app-hooks/useFollower";
import { getPNLPercentage } from "@/utils";
import { getPriceStr } from "@/utils/price";

import { WithdrawModal } from "./WithdrawModal";
import { FollowerDetail } from "@/graphql/gql/graphql";
import { useGetPrices } from "@/app/_hooks/useGetPrices";
import { useCollateralUsdPrices } from "@/app/_hooks/useCollateralUsdPrices";
import { getCollateral } from "@/web3/gns/v10/configs";
import { MetricBox } from "@/components/views/MetricBox";

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
  }, [followers, prices, chainId, collateralUsdPrices]);

  const { totalEarned, totalLost, totalEth, totalCollateralUsd } =
    useMemo(() => {
      const result = followers.reduce(
        (acc, item) => {
          const accUSDPnl = item.pnlSnapshots[0]?.accUSDPnl || 0;

          let collateralUsd = 0;
          for (const cb of item.collateralBalances || []) {
            const collateral = getCollateral(chainId, cb.collateralIndex);
            const precision = collateral ? Number(collateral.precision) : 1e6;
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

  const metrics: {
    label: string;
    value: string | number;
    unit?: string;
    color?: ChipProps["color"];
  }[] = [
    {
      label: "Followers",
      value: followers.length,
      color: "primary",
    },
    {
      label: "Pending",
      value: followers.reduce(
        (acc, item) => acc + item.pendingOrders.length,
        0,
      ),
      color: "secondary",
    },
    {
      label: "Trades",
      value: followers.reduce((acc, item) => acc + item.trades.length, 0),
      color: "success",
    },
    {
      label: "Gas",
      value: totalEth.toFixed(2),
      unit: "ETH",
    },
    {
      label: "Collateral",
      value: getPriceStr(totalCollateralUsd),
      unit: "USD",
    },
    {
      label: "Earned",
      value: getPriceStr(totalEarned),
      unit: "USD",
      color: "warning",
    },
    {
      label: "Lost",
      value: getPriceStr(totalLost),
      unit: "USD",
      color: "danger",
    },
    {
      label: "Unrealized",
      value: getPriceStr(summary.pnls),
      unit: "USD",
      color: summary.pnls >= 0 ? "warning" : "danger",
    },
    {
      label: "Locked",
      value: getPriceStr(summary.size),
      unit: "USD",
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-end">
          {metrics.map((metric) => (
            <MetricBox key={metric.label} {...metric} />
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {contractId ? (
            <Button
              color="primary"
              variant="flat"
              radius="sm"
              size="sm"
              startContent={<FaWallet className="text-xs" />}
              onPress={onOpen}
            >
              Withdraw
            </Button>
          ) : null}

          <Tooltip content="Generate follower">
            <Button
              isIconOnly
              color="primary"
              variant="solid"
              radius="sm"
              size="sm"
              aria-label="Generate follower"
              onPress={handleGenerateFollower}
            >
              <FaPlus className="text-xs" />
            </Button>
          </Tooltip>
        </div>
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
