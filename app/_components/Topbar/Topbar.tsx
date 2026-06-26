"use client";

import { Chip, Badge } from "@heroui/react";
import { TaskStatus } from "@/graphql/gql/graphql";

import { useGetAlertTasks } from "@/app-hooks/useTask";

import { TradeButton } from "../FollowerWidgets/TradeButton";
import { CalculatorButton } from "../FollowerWidgets/CalculatorButton";
import WalletConnectButton from "./WalletConnectButton";

export function Topbar() {
  const alertTasks = useGetAlertTasks();

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
    <div className="flex min-h-10 items-center justify-between gap-4">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <TradeButton />

        <CalculatorButton />

        {createdCount > 0 ? (
          <Badge color="secondary" content={createdCount}>
            <Chip color="secondary" size="sm" variant="flat">
              Created
            </Chip>
          </Badge>
        ) : null}

        {awaitedCount > 0 ? (
          <Badge color="warning" content={awaitedCount}>
            <Chip color="warning" size="sm" variant="flat">
              Await
            </Chip>
          </Badge>
        ) : null}

        {initiatedCount > 0 ? (
          <Badge color="success" content={initiatedCount}>
            <Chip color="success" size="sm" variant="flat">
              Initiated
            </Chip>
          </Badge>
        ) : null}

        {failedCount > 0 ? (
          <Badge color="danger" content={failedCount}>
            <Chip color="danger" size="sm" variant="flat">
              Failed
            </Chip>
          </Badge>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <WalletConnectButton />
      </div>
    </div>
  );
}
