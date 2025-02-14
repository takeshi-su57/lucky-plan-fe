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
} from "@nextui-org/react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { PlanDetails, PlanStatus, TaskStatus } from "@/graphql/gql/graphql";
import { useGetTasksByStatus } from "@/app/_hooks/useTask";

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
  const router = useRouter();

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

  const handleGoToDetails = () => {
    router.push(`/plans/${plan.id}`);
  };

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

        <Button
          size="sm"
          variant="flat"
          color="primary"
          onClick={handleGoToDetails}
        >
          Show Details
        </Button>
      </CardFooter>
    </Card>
  );
}
