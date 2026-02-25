"use client";

import { useMemo, useState } from "react";
import { Accordion, AccordionItem, Button, useDisclosure } from "@heroui/react";

import { PositionDetails } from "./PositionDetails";
import { PositionSummary } from "./PositionSummary";
import { PendingOrderSummary } from "./PendingOrderSummary";
import { PendingOrderDetails } from "./PendingOrderDetails";
import { FollowerDetail } from "@/graphql/gql/graphql";

import { PaginatedViews } from "@/components/views/PaginatedViews";
import { OpenPositionButton } from "./OpenPositionButton";
import { AllowanceHandleModal } from "./AllowanceHandleModal";
import { DepositAssetModal } from "./DepositAssetModal";
import { WithdrawAssetModal } from "./WithdrawAssetModal";
import { useCollateralSymbols } from "@/app/_hooks/useCollateralSymbols";
import { useCollateralUsdPrices } from "@/app/_hooks/useCollateralUsdPrices";
import { getCollateral } from "@/web3/gns/v10/configs";
import { getPriceStr } from "@/utils/price";
import TokenIcon from "../LeaderboardWidgets/TokenIcon";

const PAGE_SIZE = 10;

export type FollowerDetailsProps = {
  follower: FollowerDetail;
  chainId: number;
  diamondAddress: string;
  isChatFirst: boolean;
};

export function FollowerDetails({
  follower,
  chainId,
  diamondAddress,
}: FollowerDetailsProps) {
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenDeposit,
    onOpen: onOpenDeposit,
    onOpenChange: onOpenDepositChange,
  } = useDisclosure();
  const {
    isOpen: isOpenWithdraw,
    onOpen: onOpenWithdraw,
    onOpenChange: onOpenWithdrawChange,
  } = useDisclosure();

  const collateralSymbols = useCollateralSymbols(chainId);
  const collateralUsdPrices = useCollateralUsdPrices(chainId, diamondAddress);

  const balances = useMemo(() => {
    const ethBalance = Number(follower.ethBalance || 0) / 1e18;

    const collaterals = (follower.collateralBalances || []).map((cb) => {
      const collateral = getCollateral(chainId, cb.collateralIndex);
      const precision = collateral ? Number(collateral.precision) : 1e6;
      const amount = Number(cb.balance || 0) / precision;
      const symbol =
        collateralSymbols[cb.collateralIndex] || `C${cb.collateralIndex}`;
      const usdPrice = collateralUsdPrices[cb.collateralIndex] || 0;
      const usdValue = amount * usdPrice;
      const decimals = precision >= 1e18 ? 4 : 2;

      // For icon lookup: strip "W" prefix for wrapped tokens (WETH → ETH)
      const iconToken = symbol.toUpperCase().startsWith("W")
        ? symbol.slice(1)
        : symbol;

      return {
        collateralIndex: cb.collateralIndex,
        symbol,
        iconToken,
        amount,
        decimals,
        usdValue,
      };
    });

    return { ethBalance, collaterals };
  }, [follower, chainId, collateralSymbols, collateralUsdPrices]);

  return (
    <div className="flex flex-col gap-6 border-t border-t-neutral-400/20 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button onPress={onOpenWithdraw} size="sm">
            Handle Withdraw
          </Button>

          <Button onPress={onOpenDeposit} size="sm">
            Handle Deposit
          </Button>

          <Button onPress={onOpen} size="sm">
            Handle Allowance
          </Button>

          <OpenPositionButton
            address={follower.address}
            contractId={follower.contractId}
            chainId={chainId}
            diamondAddress={diamondAddress}
            collateralBalances={follower.collateralBalances || []}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <TokenIcon token="ETH" width={20} height={20} />
            <span className="text-sm font-medium">
              {balances.ethBalance.toFixed(4)}
            </span>
            <span className="text-xs text-neutral-400">ETH</span>
          </div>

          {balances.collaterals.map((c) => (
            <div
              key={c.collateralIndex}
              className="flex items-center gap-1.5"
            >
              <TokenIcon token={c.iconToken} width={20} height={20} />
              <span className="text-sm font-medium">
                {c.amount.toFixed(c.decimals)}
              </span>
              <span className="text-xs text-neutral-400">{c.symbol}</span>
              <span className="text-xs text-neutral-500">
                (${getPriceStr(c.usdValue)})
              </span>
            </div>
          ))}
        </div>
      </div>

      <PaginatedViews
        currentPage={page}
        totalPages={Math.ceil(follower.trades.length / PAGE_SIZE)}
        onChangePage={setPage}
        loading={false}
      >
        <Accordion isCompact variant="splitted">
          {follower.trades
            .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
            .map((trade) => (
              <AccordionItem
                key={`${trade.address}-${trade.index}`}
                title={
                  <PositionSummary
                    index={trade.index}
                    mission={trade.mission || null}
                    params={trade.params}
                    chainId={chainId}
                  />
                }
              >
                <PositionDetails
                  address={trade.address}
                  index={trade.index}
                  contractId={follower.contractId}
                  params={trade.params}
                  mission={trade.mission || null}
                  chainId={chainId}
                  diamondAddress={diamondAddress}
                />
              </AccordionItem>
            ))}
        </Accordion>
      </PaginatedViews>

      <Accordion isCompact variant="splitted">
        {follower.pendingOrders.map((pendingOrder) => (
          <AccordionItem
            key={pendingOrder.params}
            title={<PendingOrderSummary params={pendingOrder.params} />}
          >
            <PendingOrderDetails
              address={follower.address}
              contractId={follower.contractId}
              params={pendingOrder.params}
            />
          </AccordionItem>
        ))}
      </Accordion>

      <AllowanceHandleModal
        isOpen={isOpen}
        follower={follower}
        chainId={chainId}
        onOpenChange={onOpenChange}
      />

      <WithdrawAssetModal
        isOpen={isOpenWithdraw}
        followerAddress={follower.address}
        contractId={follower.contractId}
        chainId={chainId}
        onOpenChange={onOpenWithdrawChange}
      />

      <DepositAssetModal
        isOpen={isOpenDeposit}
        followerAddress={follower.address}
        contractId={follower.contractId}
        chainId={chainId}
        onOpenChange={onOpenDepositChange}
      />
    </div>
  );
}
