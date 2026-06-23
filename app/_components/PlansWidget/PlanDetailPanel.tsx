"use client";

import { useCallback, useMemo } from "react";
import { Button, Chip, useDisclosure } from "@heroui/react";
import dayjs from "dayjs";
import { PlanStatus } from "@/graphql/gql/graphql";

import { useEndPlan, useGetPlanById, useStartPlan } from "@/app-hooks/usePlan";

import { chipColorsByPlanStatus } from "./PlanCard";

import { PlanAutomations } from "./PlanAutomations";

import { CreateAutomationModal } from "../AutomationWidgets/CreateAutomationModal";
import { FaPlus } from "react-icons/fa";

export function PlanDetailPanel({ planId }: { planId: string }) {
  const numericPlanId = useMemo(() => +planId, [planId]);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { startPlan, loading: startPlanLoading } = useStartPlan();
  const { endPlan, loading: endPlanLoading } = useEndPlan();

  const plan = useGetPlanById(numericPlanId);

  const handleStartPlan = useCallback(() => {
    if (plan?.status === PlanStatus.Created) {
      startPlan({ variables: { id: numericPlanId } });
    }
  }, [plan?.status, startPlan, numericPlanId]);

  const handleEndPlan = useCallback(() => {
    if (plan?.status === PlanStatus.Started) {
      endPlan({ variables: { id: numericPlanId } });
    }
  }, [plan?.status, endPlan, numericPlanId]);

  const timelineItems = useMemo(
    () =>
      plan
        ? [
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
              value: plan.endedAt
                ? dayjs(plan.endedAt).format("MMM D, H:m:s")
                : null,
            },
          ]
        : [],
    [plan],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="border-default-200 flex flex-col gap-4 border-b pb-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-bold text-neutral-200">
              {plan?.title || ""}
            </h1>
            <p className="mt-1 max-w-4xl text-sm text-neutral-400">
              {plan?.description || ""}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Chip variant="flat">Plan {plan?.id || ""}</Chip>
            {plan && (
              <Chip color={chipColorsByPlanStatus[plan.status]} variant="flat">
                {plan.status}
              </Chip>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {timelineItems.map(
              (item) =>
                item.value !== null && (
                  <div
                    key={item.label}
                    className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2"
                  >
                    <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                      {item.label}
                    </span>
                    <span className="mt-1 text-sm font-semibold text-neutral-300">
                      {item.value}
                    </span>
                  </div>
                ),
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
            {plan?.status === PlanStatus.Created && (
              <Button
                size="sm"
                color="primary"
                onPress={handleStartPlan}
                isLoading={startPlanLoading}
                isDisabled={startPlanLoading}
                className="h-9 rounded-lg px-4 text-xs font-semibold"
              >
                Start Plan
              </Button>
            )}

            {plan?.status === PlanStatus.Started && (
              <Button
                size="sm"
                color="warning"
                onPress={handleEndPlan}
                isLoading={endPlanLoading}
                isDisabled={endPlanLoading}
                className="h-9 rounded-lg px-4 text-xs font-semibold"
              >
                End Plan
              </Button>
            )}

            <Button
              color="primary"
              variant="flat"
              size="sm"
              startContent={<FaPlus />}
              onPress={onOpen}
              className="h-9 rounded-lg px-4 text-xs font-semibold"
            >
              Add Automation
            </Button>
          </div>
        </div>
      </div>

      <PlanAutomations planId={numericPlanId} />

      {isOpen && (
        <CreateAutomationModal
          planId={numericPlanId}
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
        />
      )}
    </div>
  );
}
