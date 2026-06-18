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
} from "@heroui/react";
import dayjs from "dayjs";
import {
  PlanForwardDetails,
  PlanStatus,
  TaskStatus,
} from "@/graphql/gql/graphql";

import { useGetAlertTasks } from "@/app-hooks/useTask";
import { useDeletePlan } from "@/app-hooks/usePlan";

export const chipColorsByPlanStatus: Record<PlanStatus, ChipProps["color"]> = {
  [PlanStatus.Created]: "primary",
  [PlanStatus.Started]: "success",
  [PlanStatus.Stopped]: "danger",
  [PlanStatus.Finished]: "default",
};

export type PlanCardProps = {
  plan: PlanForwardDetails;
};

export function PlanCard({ plan }: PlanCardProps) {
  const { deletePlan, loading } = useDeletePlan();
  const alertTasks = useGetAlertTasks();

  const handleDelete = () => {
    deletePlan({
      variables: {
        id: plan.id,
      },
    });
  };

  const planTasks = alertTasks.filter(
    (task) => task.mission.bot.planId === plan.id,
  );

  const createdCount = planTasks.filter(
    (task) => task.status === TaskStatus.Created,
  ).length;

  const awaitedCount = planTasks.filter(
    (task) => task.status === TaskStatus.Await,
  ).length;

  const initiatedCount = planTasks.filter(
    (task) => task.status === TaskStatus.Initiated,
  ).length;

  const failedCount = planTasks.filter(
    (task) => task.status === TaskStatus.Failed,
  ).length;

  const items = [
    plan.startedAt
      ? {
          label: "Started At",
          value: plan.startedAt
            ? dayjs(plan.startedAt).format("MMM D, H:m:s")
            : null,
        }
      : {
          label: "Scheduled Start At",
          value: dayjs(plan.scheduledStart).format("MMM D, H:m:s"),
        },
    plan.endedAt
      ? {
          label: "Ended At",
          value: plan.endedAt
            ? dayjs(plan.endedAt).format("MMM D, H:m:s")
            : null,
        }
      : {
          label: "Scheduled End At",
          value: dayjs(plan.scheduledEnd).format("MMM D, H:m:s"),
        },
    {
      label: "Bots",
      value: plan.bots.length,
    },
  ];

  return (
    <div className="pr-4 select-none">
      <Card>
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

            <Divider />

            <span className="text-xs text-neutral-400">
              Leader PnL Overview
            </span>

            <div className="flex flex-wrap items-center gap-2"></div>

            <span className="text-xs text-neutral-400">
              Follower PnL Overview
            </span>

            <div className="flex flex-wrap items-center gap-2"></div>

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

        <CardFooter className="rounded-large justify-between p-3">
          <div className="flex flex-row items-center gap-2">
            <Chip color={chipColorsByPlanStatus[plan.status]} variant="flat">
              {plan.status}
            </Chip>

            {plan.status === PlanStatus.Created ? (
              <Button
                size="sm"
                variant="flat"
                color="danger"
                isDisabled={loading}
                isLoading={loading}
                onPress={handleDelete}
              >
                Delete
              </Button>
            ) : null}
          </div>

          <Link href={`/plans/${plan.id}`}>
            <Button size="sm" variant="flat" color="primary">
              Show Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
