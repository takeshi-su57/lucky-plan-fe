"use client";

import { Button, Card, CardBody, Chip, Link } from "@heroui/react";
import dayjs from "dayjs";
import { SimulationPlan } from "@/graphql/gql/graphql";
import { LabeledChip } from "@/components/chips/LabeledChip";
import { getPriceStr } from "@/utils/price";

export type SimulationPlanRowProps = {
  simulationPlan: SimulationPlan;
};

export function SimulationPlanRow({ simulationPlan }: SimulationPlanRowProps) {
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
                  <span className="text-sm text-gray-400">
                    {simulationPlan.title}
                  </span>
                  <Chip variant="flat">
                    Simulation Plan {simulationPlan.id}
                  </Chip>
                </div>
                <div className="flex gap-4">
                  <span className="text-sm text-gray-400">
                    {simulationPlan.description}
                  </span>
                  <Chip variant="flat" size="sm" color="primary">
                    Bot {simulationPlan.simulationBots.length}
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
              {simulationPlan.openedPositions > 0 ? (
                <LabeledChip
                  size="sm"
                  variant="flat"
                  color="secondary"
                  value={simulationPlan.openedPositions}
                  unit="Opened Positions"
                />
              ) : null}

              {simulationPlan.totalPositions > 0 ? (
                <LabeledChip
                  size="sm"
                  variant="flat"
                  color="warning"
                  value={simulationPlan.totalPositions}
                  unit="Total Positions"
                />
              ) : null}

              {simulationPlan.totalLeaderPnl > 0 ? (
                <LabeledChip
                  size="sm"
                  variant="flat"
                  color="success"
                  value={getPriceStr(simulationPlan.totalLeaderPnl)}
                  unit="Follower PnL"
                />
              ) : null}

              {simulationPlan.totalFollowerPnl > 0 ? (
                <LabeledChip
                  size="sm"
                  variant="flat"
                  color="success"
                  value={getPriceStr(simulationPlan.totalFollowerPnl)}
                  unit="Follower PnL"
                />
              ) : null}
            </div>

            <div className="flex flex-row items-center gap-2">
              <Link href={`/simulations/${simulationPlan.id}`}>
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
