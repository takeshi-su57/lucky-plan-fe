"use client";

import { Card, CardBody } from "@heroui/react";
import { IoClose } from "react-icons/io5";

import { useDeleteSLTP } from "@/app-hooks/useFollower";
import { PercentageCondition, PriceConditionParams, SLTPCondition } from "@/types";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";

export type SLTPCardProps = {
  id: number;
  condition: SLTPCondition;
};

function formatPercentageParams(params: PercentageCondition) {
  return (
    <div className="flex flex-col gap-1 text-xs">
      <span>Percentage: {params.percentage}%</span>
      <span>Initial: ${params.initialPrice.toFixed(2)}</span>
      <span>Highest: ${params.highestPrice.toFixed(2)}</span>
      <span>Exception: ${params.exceptionPrice.toFixed(2)}</span>
    </div>
  );
}

function formatPriceParams(params: PriceConditionParams) {
  return (
    <div className="flex flex-col gap-1 text-xs">
      <span>Kind: {params.kind.toUpperCase()}</span>
      <span>Trigger: ${params.trigger.toFixed(2)}</span>
    </div>
  );
}

export function SLTPCard({ id, condition }: SLTPCardProps) {
  const { deleteSLTP, loading } = useDeleteSLTP();

  const handleDelete = () => {
    deleteSLTP({
      variables: {
        id,
      },
    });
  };

  const isPercentageType = condition.type === "percentage";

  return (
    <Card className="relative min-w-[160px]">
      <ButtonWithConfirm
        isIconOnly
        size="sm"
        variant="light"
        className="absolute right-1 top-1 z-10 h-6 w-6 min-w-0"
        onPress={handleDelete}
        isDisabled={loading}
        isLoading={loading}
      >
        <IoClose className="h-4 w-4" />
      </ButtonWithConfirm>

      <CardBody className="gap-2 p-3 pt-6">
        <div className="flex items-center gap-2">
          <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
            {condition.type.toUpperCase()}
          </span>
        </div>

        {isPercentageType
          ? formatPercentageParams(condition.params as PercentageCondition)
          : formatPriceParams(condition.params as PriceConditionParams)}
      </CardBody>
    </Card>
  );
}
