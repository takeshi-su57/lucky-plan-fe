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

  const items = useMemo(
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
            {
              label: "Bots",
              value: plan.bots.length,
            },
          ]
        : [],
    [plan],
  );

  const sortedBots = useMemo(
    () => (plan?.bots ? [...plan.bots].sort((a, b) => a.id - b.id) : []),
    [plan?.bots],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex flex-1 flex-col">
            <span className="text-xl font-bold text-neutral-400">
              {plan?.title || ""}
            </span>
            <p className="text-xs text-neutral-400">
              {plan?.description || ""}
            </p>
          </div>

          <Chip variant="flat">Plan {plan?.id || ""}</Chip>
        </div>

        <div className="flex items-center gap-6">
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

          {plan && (
            <Chip color={chipColorsByPlanStatus[plan.status]} variant="flat">
              {plan.status}
            </Chip>
          )}

          {plan?.status === PlanStatus.Created && (
            <Button
              size="sm"
              color="primary"
              onClick={handleStartPlan}
              isLoading={startPlanLoading}
              isDisabled={startPlanLoading}
            >
              Start Plan
            </Button>
          )}

          {plan?.status === PlanStatus.Started && (
            <Button
              size="sm"
              color="warning"
              onClick={handleEndPlan}
              isLoading={endPlanLoading}
              isDisabled={endPlanLoading}
            >
              End Plan
            </Button>
          )}
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button isIconOnly color="primary" variant="flat" onClick={onOpen}>
            <FaPlus />
          </Button>
        </div>
      </div>

      <PlanAutomations bots={sortedBots} />

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
