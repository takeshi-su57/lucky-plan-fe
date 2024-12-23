"use client";

import { Chip } from "@nextui-org/react";
import dayjs from "dayjs";

import { Action } from "@/graphql/gql/graphql";

export type ActionSummaryProps = {
  action: Action;
};

export function ActionSummary({ action }: ActionSummaryProps) {
  return (
    <div className="flex items-center gap-6">
      <Chip>{action.id}</Chip>

      <span className="text-base text-neutral-400">{action.name}</span>

      <span className="text-sm text-neutral-500">{action.blockNumber}</span>

      <span className="text-sm text-neutral-500">{action.orderInBlock}</span>

      <span className="text-sm text-neutral-500">
        {dayjs(new Date(action.createdAt)).format("YYYY/MM/DD hh:mm:ss")}
      </span>
    </div>
  );
}
