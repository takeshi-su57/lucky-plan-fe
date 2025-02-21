"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  ChipProps,
  Divider,
  Badge,
  Link,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { PlanDetails, PlanStatus, TaskStatus } from "@/graphql/gql/graphql";

import { useGetTasksByStatus } from "@/app-hooks/useTask";
import { useGetUserTransactionCounts } from "@/app-hooks/useHistory";

export const chipColorsByPlanStatus: Record<PlanStatus, ChipProps["color"]> = {
  [PlanStatus.Created]: "primary",
  [PlanStatus.Started]: "success",
  [PlanStatus.Stopped]: "danger",
  [PlanStatus.Finished]: "default",
};

export type PlanCardProps = {
  plan: PlanDetails;
  isHideAlertForClosedMissions: boolean;
};

export function PlanCard({
  plan,
  isHideAlertForClosedMissions,
}: PlanCardProps) {
  const { data: transactionCounts } = useGetUserTransactionCounts(
    plan.bots.map((bot) => ({
      address: bot.leaderAddress,
      contractId: bot.leaderContract.id,
      startedAt: bot.startedAt || null,
    })),
  );

  const { satistic: createdStatistic } = useGetTasksByStatus(
    TaskStatus.Created,
    isHideAlertForClosedMissions,
  );
  const { satistic: awaitedStatistic } = useGetTasksByStatus(
    TaskStatus.Await,
    isHideAlertForClosedMissions,
  );
  const { satistic: initiatedStatistic } = useGetTasksByStatus(
    TaskStatus.Initiated,
    isHideAlertForClosedMissions,
  );
  const { satistic: failedStatistic } = useGetTasksByStatus(
    TaskStatus.Failed,
    isHideAlertForClosedMissions,
  );

  const createdCount = plan.bots
    .map((bot) =>
      createdStatistic[bot.id]
        ? Object.values(createdStatistic[bot.id]).reduce(
            (acc, item) => acc + item,
            0,
          )
        : 0,
    )
    .reduce((acc, item) => acc + item, 0);

  const awaitedCount = plan.bots
    .map((bot) =>
      awaitedStatistic[bot.id]
        ? Object.values(awaitedStatistic[bot.id]).reduce(
            (acc, item) => acc + item,
            0,
          )
        : 0,
    )
    .reduce((acc, item) => acc + item, 0);

  const initiatedCount = plan.bots
    .map((bot) =>
      initiatedStatistic[bot.id]
        ? Object.values(initiatedStatistic[bot.id]).reduce(
            (acc, item) => acc + item,
            0,
          )
        : 0,
    )
    .reduce((acc, item) => acc + item, 0);

  const failedCount = plan.bots
    .map((bot) =>
      failedStatistic[bot.id]
        ? Object.values(failedStatistic[bot.id]).reduce(
            (acc, item) => acc + item,
            0,
          )
        : 0,
    )
    .reduce((acc, item) => acc + item, 0);

  const transactions = transactionCounts?.getUserTransactionCounts
    ? transactionCounts.getUserTransactionCounts.reduce(
        (acc, item) => ({
          daily: acc.daily + item.daily,
          weekly: acc.weekly + item.weekly,
          monthly: acc.monthly + item.monthly,
        }),
        { daily: 0, weekly: 0, monthly: 0 },
      )
    : {
        daily: 0,
        weekly: 0,
        monthly: 0,
      };

  const items = [
    {
      label: "Scheduled Start At",
      value: dayjs(plan.scheduledStart).format("MMM D, H:m:s"),
    },
    {
      label: "Scheduled End At",
      value: dayjs(plan.scheduledEnd).format("MMM D, H:m:s"),
    },
    {
      label: "Started At",
      value: plan.startedAt
        ? dayjs(plan.startedAt).format("MMM D, H:m:s")
        : null,
    },
    {
      label: "Ended At",
      value: plan.endedAt ? dayjs(plan.endedAt).format("MMM D, H:m:s") : null,
    },
    {
      label: "Bots",
      value: plan.bots.length,
    },
  ];

  return (
    <Card classNames={{ base: "w-[400px]" }}>
      <CardHeader className="flex flex-row items-start gap-2 p-3">
        <div className="flex flex-1 flex-col">
          <span className="text-base font-bold text-neutral-400">
            {plan.title}
          </span>

          <p className="text-xs text-neutral-400">{plan.description}</p>
        </div>

        <Chip variant="flat">Plan {plan.id}</Chip>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-2">
          {items.map(
            (item) =>
              item.value !== null && (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">
                    {item.label}:
                  </span>
                  <span className="text-sm font-bold text-neutral-300">
                    {item.value}
                  </span>
                </div>
              ),
          )}

          <div className="flex flex-row items-center gap-3 font-mono">
            <Chip color="secondary">Monthly: {transactions.monthly}</Chip>
            <Chip color="secondary">Weekly: {transactions.weekly}</Chip>
            <Chip color="secondary">Daily: {transactions.daily}</Chip>
          </div>

          <div className="flex flex-row items-center gap-3 font-mono">
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
        </div>
      </CardBody>

      <Divider />

      <CardFooter className="justify-between rounded-large p-3">
        <Chip color={chipColorsByPlanStatus[plan.status]} variant="flat">
          {plan.status}
        </Chip>

        <Link href={`/plans/${plan.id}`}>
          <Button size="sm" variant="flat" color="primary">
            Show Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
