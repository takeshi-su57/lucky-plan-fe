"use client";

import { useState } from "react";
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

const PAGE_SIZE = 10;

export type FollowerDetailsProps = {
  follower: FollowerDetail;
  isChatFirst: boolean;
};

export function FollowerDetails({ follower }: FollowerDetailsProps) {
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
          />
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
                  />
                }
              >
                <PositionDetails
                  address={trade.address}
                  index={trade.index}
                  contractId={follower.contractId}
                  params={trade.params}
                  mission={trade.mission || null}
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
        onOpenChange={onOpenChange}
      />

      <WithdrawAssetModal
        isOpen={isOpenWithdraw}
        followerAddress={follower.address}
        contractId={follower.contractId}
        onOpenChange={onOpenWithdrawChange}
      />

      <DepositAssetModal
        isOpen={isOpenDeposit}
        followerAddress={follower.address}
        contractId={follower.contractId}
        onOpenChange={onOpenDepositChange}
      />
    </div>
  );
}
