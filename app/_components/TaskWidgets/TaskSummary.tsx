"use client";

import { Chip } from "@nextui-org/react";
import dayjs from "dayjs";

import { TaskForwardDetails, TaskStatus } from "@/graphql/gql/graphql";
import { PendingOrderType } from "@/types";

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
  task: TaskForwardDetails;
};

export function TaskSummary({ task }: TaskSummaryProps) {
  const args = JSON.parse(task.action.args);

  let actionName = "";

  switch (task.action.name) {
    case "LimitExecuted": {
      if (
        [PendingOrderType.LIMIT_OPEN, PendingOrderType.STOP_OPEN].includes(
          args.orderType,
        )
      ) {
        actionName = "Open Task";
      } else if (
        [
          PendingOrderType.LIQ_CLOSE,
          PendingOrderType.SL_CLOSE,
          PendingOrderType.TP_CLOSE,
        ].includes(args.orderType)
      ) {
        actionName = "Close Task";
      } else {
        actionName = "Unknown LimitExecuted Task";
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
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <Chip>{task.id}</Chip>

        <span className="min-w-[300px] text-sm text-neutral-400">
          {actionName}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-xs text-neutral-600">
          {dayjs(new Date(task.createdAt)).format("YYYY/MM/DD hh:mm:ss")}
        </span>

        <Chip color={colorsByTaskStatus[task.status]}>{task.status}</Chip>
      </div>
    </div>
  );
}
