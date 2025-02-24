"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  useDisclosure,
  Tab,
  Tabs,
  Progress,
} from "@nextui-org/react";
import { Address } from "viem";

import { UserTradeHistory } from "@/app-components/UserWidgets/UserTradeHistory";

import { ShowPrivateKeyModal } from "./ShowPrivateKeyModal";
import {
  useGetPendingOrders,
  useGetTradedOrders,
  useWithdrawAllETH,
  useWithdrawAllUSDC,
} from "@/app/_hooks/useFollower";
import { PositionDetails } from "./PositionDetails";
import { PositionSummary } from "./PositionSummary";
import { PendingOrderSummary } from "./PendingOrderSummary";
import { PendingOrderDetails } from "./PendingOrderDetails";

type TabType = "chart" | "positions";

export type FollowerDetailsProps = {
  follower: {
    address: string;
    accountIndex: number;
    publicKey: string;
    ethBalance: number;
    usdcBalance: number;
    contractId: number;
  };
  isChatFirst: boolean;
  mode: "show_all_activity" | "show_only_valid_activity";
};

export function FollowerDetails({
  follower,
  isChatFirst,
  mode,
}: FollowerDetailsProps) {
  const [selected, setSelected] = useState<TabType>("chart");

  const withdrawAllETH = useWithdrawAllETH();
  const withdrawAllUSDC = useWithdrawAllUSDC();

  const { pendingOrders, loading: pendingOrdersLoading } = useGetPendingOrders(
    follower.address,
    follower.contractId,
  );
  const { trades, loading: tradesLoading } = useGetTradedOrders(
    follower.address,
    follower.contractId,
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isChatFirst) {
      setSelected("chart");
    } else {
      setSelected("positions");
    }
  }, [isChatFirst]);

  const handleWithdrawAllETH = useCallback(
    (address: string, contractId: string) => {
      withdrawAllETH({
        variables: {
          input: {
            address,
            contractId: +contractId,
          },
        },
      });
    },
    [withdrawAllETH],
  );

  const handleWithdrawAllUSDC = useCallback(
    (address: string, contractId: string) => {
      withdrawAllUSDC({
        variables: {
          input: {
            address,
            contractId: +contractId,
          },
        },
      });
    },
    [withdrawAllUSDC],
  );

  if (pendingOrdersLoading || tradesLoading) {
    return <Progress isIndeterminate className="w-full flex-1" size="sm" />;
  }

  return (
    <div className="flex flex-col gap-6 border-t border-t-neutral-400/20 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Tabs
            selectedKey={selected}
            onSelectionChange={(value) =>
              value && setSelected(value as TabType)
            }
          >
            <Tab key="chart" title="Chart" />
            <Tab key="positions" title="Positions" />
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              onOpen();
            }}
            size="sm"
          >
            Get Key
          </Button>

          <Button
            onClick={() =>
              handleWithdrawAllETH(follower.address, `${follower.contractId}`)
            }
            size="sm"
          >
            Withdraw All ETH
          </Button>

          <Button
            onClick={() =>
              handleWithdrawAllUSDC(follower.address, `${follower.contractId}`)
            }
            size="sm"
          >
            Withdraw All USDC
          </Button>
        </div>
      </div>

      {selected === "chart" ? (
        <Card>
          <CardBody>
            <UserTradeHistory
              address={follower.address as Address}
              contractId={follower.contractId.toString()}
              mode={mode}
            />
          </CardBody>
        </Card>
      ) : (
        <>
          <Accordion isCompact variant="splitted">
            {trades.map((trade) => (
              <AccordionItem
                key={`${trade.address}-${trade.index}`}
                title={
                  <PositionSummary
                    index={trade.index}
                    mission={trade.mission}
                  />
                }
              >
                <PositionDetails
                  address={trade.address}
                  index={trade.index}
                  contractId={follower.contractId}
                  params={trade.params}
                />
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion isCompact variant="splitted">
            {pendingOrders.map((pendingOrder) => (
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
        </>
      )}

      <ShowPrivateKeyModal
        address={follower.address as Address}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
