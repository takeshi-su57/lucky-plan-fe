"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Address } from "viem";

import { WalletAccountTradeHistory } from "@/app/_components/WalletAccountWidgets/WalletAccountTradeHistory";

import {
  useWithdrawAllETH,
  useWithdrawAllUSDC,
} from "@/app/_hooks/useFollower";
import { PositionDetails } from "./PositionDetails";
import { PositionSummary } from "./PositionSummary";
import { PendingOrderSummary } from "./PendingOrderSummary";
import { PendingOrderDetails } from "./PendingOrderDetails";
import { FollowerDetail } from "@/graphql/gql/graphql";

type TabType = "chart" | "positions";

export type FollowerDetailsProps = {
  follower: FollowerDetail;
  isChatFirst: boolean;
};

export function FollowerDetails({
  follower,
  isChatFirst,
}: FollowerDetailsProps) {
  const [selected, setSelected] = useState<TabType>("positions");

  const withdrawAllETH = useWithdrawAllETH();
  const withdrawAllUSDC = useWithdrawAllUSDC();

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
            <Tab key="positions" title="Positions" />
            <Tab key="chart" title="Chart" />
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
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
            <WalletAccountTradeHistory
              address={follower.address as Address}
              contractId={follower.contractId.toString()}
              mode="show_all_activity"
            />
          </CardBody>
        </Card>
      ) : (
        <>
          <Accordion isCompact variant="splitted">
            {follower.trades.map((trade) => (
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
        </>
      )}
    </div>
  );
}
