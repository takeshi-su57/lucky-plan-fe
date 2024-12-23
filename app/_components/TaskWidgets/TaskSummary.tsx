"use client";

import { Chip } from "@nextui-org/react";
import dayjs from "dayjs";

import { TaskShallowDetails, TaskStatus } from "@/graphql/gql/graphql";

const colorsByTaskStatus: Record<
  TaskStatus,
  "default" | "primary" | "secondary" | "success" | "warning" | "danger"
> = {
  [TaskStatus.Created]: "primary",
  [TaskStatus.Await]: "warning",
  [TaskStatus.Initiated]: "secondary",
  [TaskStatus.Failed]: "danger",
  [TaskStatus.Stopped]: "default",
  [TaskStatus.Completed]: "success",
};

export type TaskSummaryProps = {
  task: TaskShallowDetails;
};

export function TaskSummary({ task }: TaskSummaryProps) {
  const args = JSON.parse(task.action.args);

  let actionName = "";

  switch (task.action.name) {
    case "LimitExecuted": {
      if (args.open) {
        actionName = "Open Task";
      } else {
        actionName = "Close Task";
      }

      break;
    }
    case "MarketExecuted": {
      if (args.open) {
        actionName = "Open Task";
      } else {
        actionName = "Close Task";
      }

      break;
    }
    case "TradeMaxClosingSlippagePUpdated": {
      actionName = "Max Closing Slippage Update Task";

      break;
    }
    case "LeverageUpdateExecuted": {
      actionName = "Leverage Update Task";

      break;
    }
    case "PositionSizeDecreaseExecuted": {
      actionName = "Position Size Decrease Task";

      break;
    }
    case "PositionSizeIncreaseExecuted": {
      actionName = "Position Size Increase Task";

      break;
    }
    case "CloseMissionAction": {
      actionName = "Manual Close Task";

      break;
    }
    default: {
      actionName = "Unknown Task";
    }
  }

  return (
    <div className="flex items-center gap-6">
      <Chip>{task.id}</Chip>

      <span className="min-w-[300px] text-base text-neutral-400">
        {actionName}
      </span>

      <span className="text-sm text-neutral-500">
        {dayjs(new Date(task.createdAt)).format("YYYY/MM/DD hh:mm:ss")}
      </span>

      <Chip color={colorsByTaskStatus[task.status]}>{task.status}</Chip>
    </div>
  );
}
