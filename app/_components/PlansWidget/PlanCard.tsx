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
import {
  PlanForwardDetails,
  PlanStatus,
  TaskStatus,
} from "@/graphql/gql/graphql";

import { useGetAlertTasks } from "@/app-hooks/useTask";
import { useGetUserTransactionCounts } from "@/app-hooks/useHistory";
import { useDeletePlan } from "@/app-hooks/usePlan";
import { useGetAllContracts } from "@/app-hooks/useContract";

import { LabeledChip } from "@/components/chips/LabeledChip";
import { ContractPnl } from "@/app-components/MissionWidgets/ContractPnl";

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
  const { data: transactionCounts } = useGetUserTransactionCounts(
    plan.bots.map((bot) => ({
      address: bot.leaderAddress,
      contractId: bot.leaderContract.id,
      startedAt: bot.startedAt || null,
    })),
  );

  const allContracts = useGetAllContracts();

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
    <div className="pr-4">
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

            <div className="flex flex-row items-center gap-3 font-mono">
              <LabeledChip
                label="Monthly"
                value={transactions.monthly}
                unit="Trades"
              />
              <LabeledChip
                label="Weekly"
                value={transactions.weekly}
                unit="Trades"
              />
              <LabeledChip
                label="Daily"
                value={transactions.daily}
                unit="Trades"
              />
            </div>

            <Divider />

            <div className="flex items-center justify-between">
              <div className="flex flex-1 flex-col gap-2">
                <span className="text-xs text-neutral-400">Leaders Pnl</span>

                {(allContracts || []).map((contract) => (
                  <ContractPnl
                    key={contract.id}
                    showZero
                    label={`Chain (${contract.chainId})`}
                    contractId={contract.id}
                    actions={plan.bots
                      .filter((bot) => bot.leaderContractId === contract.id)
                      .flatMap((bot) =>
                        bot.missions.flatMap((mission) =>
                          mission.tasks.map((task) => task.action),
                        ),
                      )}
                  />
                ))}
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <span className="text-xs text-neutral-400">Followers Pnl</span>
                {(allContracts || []).map((contract) => (
                  <ContractPnl
                    key={contract.id}
                    showZero
                    label={`Chain (${contract.chainId})`}
                    contractId={contract.id}
                    actions={plan.bots
                      .filter((bot) => bot.followerContractId === contract.id)
                      .flatMap((bot) =>
                        bot.missions.flatMap((mission) =>
                          mission.tasks
                            .map((task) => {
                              if (task.followerActions.length === 0) {
                                return null;
                              }

                              const followerAction =
                                task.followerActions[
                                  task.followerActions.length - 1
                                ];

                              if (!followerAction) {
                                return null;
                              }

                              return followerAction.action;
                            })
                            .filter((action) => action !== null),
                        ),
                      )}
                  />
                ))}
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
          </div>
        </CardBody>

        <Divider />

        <CardFooter className="justify-between rounded-large p-3">
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
                onClick={handleDelete}
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
