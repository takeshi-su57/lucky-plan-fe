"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Chip, Badge } from "@nextui-org/react";
import { TaskStatus } from "@/graphql/gql/graphql";

import { useGetTradeTransactionCounts } from "@/app-hooks/useHistory";
import { useGetAllContracts } from "@/app-hooks/useContract";
import { useGetAlertTasks } from "@/app-hooks/useTask";

import { LabeledChip } from "@/components/chips/LabeledChip";

export function Topbar() {
  const contracts = useGetAllContracts();
  const alertTasks = useGetAlertTasks();

  const { data: tradeTransactionCounts } = useGetTradeTransactionCounts(
    contracts.map((item) => item.id),
    [],
  );

  const createdCount = alertTasks.filter(
    (task) => task.status === TaskStatus.Created,
  ).length;

  const awaitedCount = alertTasks.filter(
    (task) => task.status === TaskStatus.Await,
  ).length;

  const initiatedCount = alertTasks.filter(
    (task) => task.status === TaskStatus.Initiated,
  ).length;

  const failedCount = alertTasks.filter(
    (task) => task.status === TaskStatus.Failed,
  ).length;

  return (
    <div className="sticky flex items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        <LabeledChip
          label="This Month"
          value={
            tradeTransactionCounts?.getTradeTransactionCounts?.monthly || 0
          }
          unit="Trades"
        />
        <LabeledChip
          label="This Week"
          value={tradeTransactionCounts?.getTradeTransactionCounts?.weekly || 0}
          unit="Trades"
        />
        <LabeledChip
          label="Today"
          value={tradeTransactionCounts?.getTradeTransactionCounts?.daily || 0}
          unit="Trades"
        />
      </div>

      <div className="flex items-center gap-6">
        {createdCount > 0 ? (
          <Badge color="secondary" content={createdCount}>
            <Chip color="secondary">Created</Chip>
          </Badge>
        ) : null}

        {awaitedCount > 0 ? (
          <Badge color="warning" content={awaitedCount}>
            <Chip color="warning">Await</Chip>
          </Badge>
        ) : null}

        {initiatedCount > 0 ? (
          <Badge color="success" content={initiatedCount}>
            <Chip color="success">Initiated</Chip>
          </Badge>
        ) : null}

        {failedCount > 0 ? (
          <Badge color="danger" content={failedCount}>
            <Chip color="danger">Failed</Chip>
          </Badge>
        ) : null}

        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          chainStatus="icon"
        />
      </div>
    </div>
  );
}
