"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { twMerge } from "tailwind-merge";
import { useGetSystemStatus } from "@/app-hooks/useSystem";
import { useGetTradeTransactionCounts } from "@/app/_hooks/useHistory";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import { Chip } from "@nextui-org/react";
import { Badge } from "@nextui-org/react";
import { useGetAlertTasks } from "@/app/_hooks/useTask";
import { TaskStatus } from "@/graphql/gql/graphql";
import { LabeledChip } from "@/components/chips/LabeledChip";

export function Topbar() {
  const { data } = useGetSystemStatus();

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
        <div className="relative flex items-center justify-center">
          <div
            className={twMerge(
              "z-10 h-4 w-4 rounded-full bg-red-500",
              data?.systemStatus === true ? "bg-red-500" : "bg-green-400",
            )}
          />
          <div
            className={twMerge(
              "absolute h-4 w-4 animate-ping rounded-full bg-red-500",
              data?.systemStatus === true ? "bg-red-500" : "bg-green-400",
            )}
          />
        </div>

        <span
          className={twMerge(
            "text-sm font-medium",
            data?.systemStatus === true ? "text-red-500" : "text-green-400",
          )}
        >
          {data?.systemStatus === true ? "Paused" : "Running"}
        </span>
      </div>

      <div className="flex items-center gap-6">
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
