"use client";

import { useState } from "react";

import { useGetPlanBotGroups } from "@/app/_hooks/usePlan";
import { PaginatedViews } from "@/components/views/PaginatedViews";
import { GroupedAutomations } from "./GroupedAutomations";

const PAGE_SIZE = 10;

export type PlanAutomationsProps = {
  planId: number;
};

export function PlanAutomations({ planId }: PlanAutomationsProps) {
  const [page, setPage] = useState(1);

  const { botGroups, loading, totalPages } = useGetPlanBotGroups(
    planId,
    page,
    PAGE_SIZE,
  );

  return (
    <PaginatedViews
      currentPage={page}
      totalPages={totalPages}
      onChangePage={setPage}
      loading={loading}
    >
      <div className="flex flex-col gap-6">
        {botGroups.map((item) => (
          <GroupedAutomations
            key={`${item.leaderAddress}-${item.platform}`}
            bots={item.bots}
            leaderAddress={item.leaderAddress}
            platform={item.platform}
          />
        ))}
      </div>
    </PaginatedViews>
  );
}
