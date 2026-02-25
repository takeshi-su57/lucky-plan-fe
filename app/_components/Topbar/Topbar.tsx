"use client";

import { Chip, Badge } from "@heroui/react";
import { TaskStatus } from "@/graphql/gql/graphql";

import { useGetAlertTasks } from "@/app-hooks/useTask";

import { TradeButton } from "../FollowerWidgets/TradeButton";
import { CalculatorButton } from "../FollowerWidgets/CalculatorButton";
import { ChartButton } from "../FollowerWidgets/ChartButton";
import { BatchOpenButton } from "../FollowerWidgets/BatchOpenButton";
import { BatchCloseButton } from "../FollowerWidgets/BatchCloseButton";
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
    <div className="sticky flex items-center justify-between">
      <div className="flex flex-row items-center gap-4">
        <TradeButton />

        <CalculatorButton />

        <ChartButton />

        <BatchOpenButton />

        <BatchCloseButton />

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
      </div>

      <div className="flex items-center gap-6">
        <WalletConnectButton />
      </div>
    </div>
  );
}
