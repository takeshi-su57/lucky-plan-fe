"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  ChipProps,
  Badge,
  Link,
} from "@heroui/react";
import dayjs from "dayjs";
import { PlanSummary, PlanStatus, TaskStatus } from "@/graphql/gql/graphql";

import { useGetAlertTasks } from "@/app-hooks/useTask";
import { useDeletePlan } from "@/app-hooks/usePlan";

export const chipColorsByPlanStatus: Record<PlanStatus, ChipProps["color"]> = {
  [PlanStatus.Created]: "primary",
  [PlanStatus.Started]: "success",
  [PlanStatus.Stopped]: "danger",
  [PlanStatus.Finished]: "default",
};

export type PlanRowProps = {
  plan: PlanSummary;
};

export function PlanRow({ plan }: PlanRowProps) {
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
            ? dayjs(plan.startedAt).format("MMM D, H:m")
            : null,
        }
      : {
          label: "Start At",
          value: dayjs(plan.scheduledStart).format("MMM D, H:m"),
        },
    plan.endedAt
      ? {
          label: "Ended At",
          value: plan.endedAt ? dayjs(plan.endedAt).format("MMM D, H:m") : null,
        }
      : {
          label: "End At",
          value: dayjs(plan.scheduledEnd).format("MMM D, H:m"),
        },
  ];

  return (
    <div className="pb-3 select-none">
      <Card
        shadow="none"
        className="border-default-200 bg-content1 mb-4 w-full shrink-0 rounded-lg border"
      >
        <CardBody>
          <div className="flex items-start justify-between">
            <div className="flex h-full items-start gap-2">
              <div className="flex w-75 flex-col gap-2 border-r border-neutral-800">
                <div className="flex gap-4">
                  <span className="text-sm text-gray-400">{plan.title}</span>
                  <Chip variant="flat">Plan {plan.id}</Chip>
                </div>
                <div className="flex gap-4">
                  <span className="text-sm text-gray-400">
                    {plan.description}
                  </span>
                  <Chip variant="flat" size="sm" color="primary">
                    Bot {plan.botCount}
                  </Chip>
                </div>
              </div>

              <div className="flex h-full w-43 flex-col gap-2 border-r border-neutral-800">
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
              </div>
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

              <Link href={`/plans/${plan.id}`}>
                <Button size="sm" variant="flat" color="primary">
                  Show Details
                </Button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
