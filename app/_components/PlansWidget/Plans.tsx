"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Tab, Tabs, Button, Spinner } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { GroupedVirtuoso } from "react-virtuoso";

import { PlanSummary } from "@/graphql/gql/graphql";

import {
  useFinishedPlanSummaries,
  useLivePlanSummaries,
} from "@/app-hooks/usePlan";
import { PlanRow } from "./PlanRow";
import { getWeekDateStr } from "@/utils";

type TabType = "live" | "history";

export function Plans() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selected, setSelected] = useState<TabType>(
    (searchParams.get("status") as TabType) || "live",
  );

  const {
    plans: livePlans,
    hasMore: hasMoreLives,
    loading: loadingLives,
    fetchMore: fetchMoreLives,
  } = useLivePlanSummaries();
  const {
    plans: planHistories,
    hasMore: hasMoreHistories,
    loading: loadingHistories,
    fetchMore: fetchMoreHistories,
  } = useFinishedPlanSummaries();

  const { groupCounts, groupContent, plans } = useMemo(() => {
    const weekPlans: Record<string, PlanSummary[]> = {};
    const selectedPlans = selected === "live" ? livePlans : planHistories;

    [...selectedPlans]
      .sort(
        (a, b) =>
          new Date(b.startedAt ?? b.scheduledStart).getTime() -
          new Date(a.startedAt ?? a.scheduledStart).getTime(),
      )
      .forEach((plan) => {
        const groupDate = plan.startedAt;
        const week = groupDate
          ? getWeekDateStr(new Date(groupDate))
          : "Not Started";

        if (!weekPlans[week]) {
          weekPlans[week] = [plan];
        } else {
          weekPlans[week].push(plan);
        }
      });

    const groupCounts: number[] = [];
    const groupContent: string[] = [];
    const plans: PlanSummary[] = [];

    Object.entries(weekPlans).forEach(([week, weekPlans]) => {
      groupCounts.push(weekPlans.length);
      groupContent.push(week);
      plans.push(...weekPlans);
    });

    return { groupCounts, groupContent, plans };
  }, [livePlans, planHistories, selected]);

  const loading = selected === "live" ? loadingLives : loadingHistories;
  const hasMore = selected === "live" ? hasMoreLives : hasMoreHistories;
  const fetchMore = selected === "live" ? fetchMoreLives : fetchMoreHistories;

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
            <Tab key="live" title="Live" />
            <Tab key="history" title="Histories" />
          </Tabs>
        </div>

        <Link href="/plans/create">
          <Button isIconOnly color="primary" variant="flat">
            <FaPlus />
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex h-75 w-full items-center justify-center">
          <Spinner size="lg" color="warning" />
        </div>
      ) : (
        <GroupedVirtuoso
          style={{ height: 700 }}
          groupCounts={groupCounts}
          groupContent={(index) => (
            <h2 className="w-fit rounded-lg bg-red-800/40 px-3 py-1 text-lg font-bold text-neutral-400">
              {groupContent[index]}
            </h2>
          )}
          itemContent={(index) => <PlanRow plan={plans[index]} />}
          components={{
            Footer: () => (
              <div className="flex w-full items-center justify-center py-4">
                {hasMore === false ? (
                  <span className="font-sans text-neutral-400/40">
                    No More Results Available
                  </span>
                ) : hasMore ? (
                  <Button
                    variant="flat"
                    color="primary"
                    isLoading={loading}
                    onPress={() => fetchMore()}
                  >
                    Load More
                  </Button>
                ) : null}
              </div>
            ),
          }}
        />
      )}
    </div>
  );
}
