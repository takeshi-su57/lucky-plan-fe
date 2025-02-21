"use client";

import Link from "next/link";
import { useState } from "react";
import { Tab, Tabs, Button, Switch } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPlus } from "react-icons/fa";

import { PlanStatus } from "@/graphql/gql/graphql";

import { useGetPlansByStatus } from "@/app-hooks/usePlan";
import { PlanCard } from "./PlanCard";

type TabType = "created" | "started" | "stopped" | "finished";

const planStatusByTabType: Record<TabType, PlanStatus> = {
  created: PlanStatus.Created,
  started: PlanStatus.Started,
  stopped: PlanStatus.Stopped,
  finished: PlanStatus.Finished,
};

export function Plans() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selected, setSelected] = useState<TabType>(
    (searchParams.get("status") as TabType) || "started",
  );
  const [isHideAlertForClosedMissions, setIsHideAlertForClosedMissions] =
    useState(true);

  const plans = useGetPlansByStatus(planStatusByTabType[selected]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Tabs
            aria-label="users-table-tabs"
            selectedKey={selected}
            onSelectionChange={(value) => {
              if (value) {
                setSelected(value as TabType);
                router.push(`/plans?status=${value}`);
              }
            }}
          >
            <Tab key="created" title="Created" />
            <Tab key="started" title="Started" />
            <Tab key="stopped" title="Stopped" />
            <Tab key="finished" title="Finished" />
          </Tabs>

          <Switch
            isSelected={isHideAlertForClosedMissions}
            onValueChange={setIsHideAlertForClosedMissions}
            size="sm"
          >
            Hide Alert For Closed Missions
          </Switch>
        </div>

        <Link href="/plans/create">
          <Button isIconOnly color="primary" variant="flat">
            <FaPlus />
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isHideAlertForClosedMissions={isHideAlertForClosedMissions}
          />
        ))}
      </div>
    </div>
  );
}
