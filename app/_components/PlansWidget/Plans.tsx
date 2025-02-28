"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Tab, Tabs, Button, Spinner } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { PlanForwardShallowDetails, PlanStatus } from "@/graphql/gql/graphql";

import { useGetPlansByStatus } from "@/app-hooks/usePlan";
import { PlanCard } from "./PlanCard";
import { getWeekDateStr } from "@/utils";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  "2xl": {
    breakpoint: { max: 3000, min: 1536 },
    items: 4,
  },
  xl: {
    breakpoint: { max: 1536, min: 1280 },
    items: 3,
  },
  lg: {
    breakpoint: { max: 1280, min: 1024 },
    items: 2,
  },
  md: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

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

  const { plans, loading } = useGetPlansByStatus(planStatusByTabType[selected]);

  const groupedPlans = useMemo(() => {
    const weekPlans: Record<string, PlanForwardShallowDetails[]> = {};

    plans
      .sort(
        (a, b) =>
          (b.startedAt ? new Date(b.startedAt).getTime() : 0) -
          (a.startedAt ? new Date(a.startedAt).getTime() : 0),
      )
      .forEach((plan) => {
        const week = plan.startedAt
          ? getWeekDateStr(new Date(plan.startedAt))
          : "Not Started";

        if (!weekPlans[week]) {
          weekPlans[week] = [plan];
        } else {
          weekPlans[week].push(plan);
        }
      });

    return weekPlans;
  }, [plans]);

  return (
    <div className="flex flex-col gap-8">
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
        </div>

        <Link href="/plans/create">
          <Button isIconOnly color="primary" variant="flat">
            <FaPlus />
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex h-[300px] w-full items-center justify-center">
          <Spinner size="lg" color="warning" />
        </div>
      ) : (
        Object.entries(groupedPlans).map(([week, weekPlans]) => (
          <div
            key={week}
            className="flex flex-col gap-4 border-b border-neutral-400/20 pb-4"
          >
            <h2 className="text-lg font-bold text-neutral-400">{week}</h2>

            <Carousel responsive={responsive}>
              {weekPlans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </Carousel>
          </div>
        ))
      )}
    </div>
  );
}
