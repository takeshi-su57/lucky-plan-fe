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
  MissionStatus,
  PlanForwardDetails,
  PlanStatus,
  TaskStatus,
} from "@/graphql/gql/graphql";

import { useGetAlertTasks } from "@/app-hooks/useTask";
import { useDeletePlan } from "@/app-hooks/usePlan";
import { useGetAllGnsContracts } from "@/app-hooks/useContract";

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

  const gnsContracts = useGetAllGnsContracts();

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
    <div className="select-none pr-4">
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

            <div className="flex flex-wrap items-center gap-2">
              {(gnsContracts || []).map((contract) => (
                <ContractPnl
                  key={contract.id}
                  label={`Chain (${contract.chainId})`}
                  contractId={contract.id}
                  finished={plan.status === PlanStatus.Finished}
                  finishedMissionActions={plan.bots
                    .filter((bot) => bot.leaderContractId === contract.id)
                    .flatMap((bot) =>
                      bot.missions
                        .filter(
                          (mission) =>
                            !!mission.achievePositionKey &&
                            mission.status === MissionStatus.Closed,
                        )
                        .map((mission) =>
                          mission.tasks.map((task) => task.action),
                        ),
                    )}
                  openedMissionActions={plan.bots
                    .filter((bot) => bot.leaderContractId === contract.id)
                    .flatMap((bot) =>
                      bot.missions
                        .filter(
                          (mission) =>
                            !mission.achievePositionKey &&
                            mission.status !== MissionStatus.Closed,
                        )
                        .map((mission) =>
                          mission.tasks.map((task) => task.action),
                        ),
                    )}
                />
              ))}
            </div>

            <span className="text-xs text-neutral-400">
              Follower PnL Overview
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {(gnsContracts || []).map((contract) => (
                <ContractPnl
                  key={contract.id}
                  label={`Chain (${contract.chainId})`}
                  contractId={contract.id}
                  finished={plan.status === PlanStatus.Finished}
                  finishedMissionActions={plan.bots
                    .filter((bot) => bot.followerContractId === contract.id)
                    .flatMap((bot) =>
                      bot.missions
                        .filter(
                          (mission) =>
                            mission.status === MissionStatus.Closed &&
                            !!mission.achievePositionKey,
                        )
                        .map((mission) =>
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
                  openedMissionActions={plan.bots
                    .filter((bot) => bot.followerContractId === contract.id)
                    .flatMap((bot) =>
                      bot.missions
                        .filter(
                          (mission) =>
                            mission.status !== MissionStatus.Closed &&
                            mission.status !== MissionStatus.Ignored &&
                            !!mission.achievePositionKey,
                        )
                        .map((mission) =>
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
