"use client";

import { Chip } from "@nextui-org/react";

export type PendingOrderSummaryProps = {
  params: string;
};

export function PendingOrderSummary({ params }: PendingOrderSummaryProps) {
  const args = JSON.parse(params);

  return (
    <div className="flex w-full items-center justify-between gap-6 bg-yellow-300/40">
      <Chip>Pending Order {args.index}</Chip>
    </div>
  );
}
