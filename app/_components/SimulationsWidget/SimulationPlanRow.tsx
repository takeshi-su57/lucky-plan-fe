"use client";

import { Button, Card, CardBody, Chip, Link } from "@heroui/react";
import dayjs from "dayjs";
import { SimulationPlan, UserPermission } from "@/graphql/gql/graphql";
import { LabeledChip } from "@/components/chips/LabeledChip";
import { getPriceStr } from "@/utils/price";
import { useDeleteSimulationPlan } from "@/app/_hooks/useSimulations";
import { useUserJWT } from "@/app/_hooks/useUserJWT";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";

export type SimulationPlanRowProps = {
  simulationPlan: SimulationPlan;
};

export function SimulationPlanRow({ simulationPlan }: SimulationPlanRowProps) {
  const { deleteSimulationPlan, loading: deleteLoading } =
    useDeleteSimulationPlan();
  const { userJwtQuery } = useUserJWT();
  const isAdmin = userJwtQuery.data?.permission === UserPermission.Admin;

  const items = [
    {
      label: "Start At",
      value: simulationPlan.startAt
        ? dayjs(simulationPlan.startAt).format("MMM D, H:m")
        : null,
    },
    {
      label: "End At",
      value: dayjs(simulationPlan.endAt).format("MMM D, H:m"),
    },
  ];
  const followerPnlColor =
    simulationPlan.totalFollowerPnl >= 0 ? "success" : "danger";
  const leaderPnlColor =
    simulationPlan.totalLeaderPnl >= 0 ? "success" : "danger";

  return (
    <div className="pb-3 select-none">
      <Card
        shadow="none"
        className="border-default-200 bg-content1 mb-4 w-full shrink-0 rounded-lg border"
      >
        <CardBody className="gap-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-start">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-semibold text-neutral-300">
                    {simulationPlan.title}
                  </span>
                  <Chip variant="flat" size="sm">
                    Simulation Plan {simulationPlan.id}
                  </Chip>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="line-clamp-2 text-sm text-neutral-500">
                    {simulationPlan.description}
                  </span>
                  <Chip variant="flat" size="sm" color="primary">
                    Bot {simulationPlan.simulationBots.length}
                  </Chip>
                </div>
              </div>

              <div className="border-default-200 flex min-w-40 flex-col gap-2 lg:border-l lg:pl-4">
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

            <div className="flex flex-wrap items-center gap-2 font-mono xl:justify-end">
              <LabeledChip
                size="sm"
                variant="flat"
                color={followerPnlColor}
                value={getPriceStr(simulationPlan.totalFollowerPnl)}
                unit="Follower PnL"
              />
              <LabeledChip
                size="sm"
                variant="flat"
                color={leaderPnlColor}
                value={getPriceStr(simulationPlan.totalLeaderPnl)}
                unit="Leader PnL"
              />
              <LabeledChip
                size="sm"
                variant="flat"
                color="secondary"
                value={simulationPlan.totalPositions}
                unit="Trades"
              />
              <LabeledChip
                size="sm"
                variant="flat"
                color="warning"
                value={simulationPlan.openedPositions}
                unit="Opened"
              />
              <LabeledChip
                size="sm"
                variant="flat"
                color="primary"
                value={simulationPlan.simulationBots.length}
                unit="Bots"
              />
            </div>

            <div className="flex flex-row items-center gap-2 xl:justify-end">
              <Link href={`/simulations/${simulationPlan.id}`}>
                <Button size="sm" variant="flat" color="primary">
                  Show Details
                </Button>
              </Link>

              {isAdmin ? (
                <ButtonWithConfirm
                  size="sm"
                  variant="solid"
                  color="danger"
                  isLoading={deleteLoading}
                  isDisabled={deleteLoading}
                  onPress={() =>
                    deleteSimulationPlan({
                      variables: { id: simulationPlan.id },
                    })
                  }
                >
                  Remove
                </ButtonWithConfirm>
              ) : null}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
