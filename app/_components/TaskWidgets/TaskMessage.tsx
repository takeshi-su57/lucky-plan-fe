import { useEffect } from "react";
import { Chip } from "@heroui/react";

import { TaskBackwardDetails, TaskStatus } from "@/graphql/gql/graphql";

const statusColors: Record<
  TaskStatus,
  "default" | "warning" | "secondary" | "danger" | "default" | "success"
> = {
  [TaskStatus.Created]: "default",
  [TaskStatus.Await]: "warning",
  [TaskStatus.Initiated]: "secondary",
  [TaskStatus.Failed]: "danger",
  [TaskStatus.Stopped]: "default",
  [TaskStatus.Completed]: "success",
};

export function TaskMessage({ task }: { task: TaskBackwardDetails }) {
  useEffect(() => {
    if (
      document.visibilityState !== "visible" &&
      Notification.permission === "granted"
    ) {
      const notification = new Notification("New Task", {
        body: `Task ${task.id} has been completed`,
        icon: "/icon.png", // optional
      });

      notification.onclick = () => {
        window.focus();
      };
    }
  }, [task]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">Task #{task.id}</span>

        <Chip variant="flat" color={statusColors[task.status]}>
          {task.status}
        </Chip>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-base">{task.action.name}</span>
      </div>
    </div>
  );
}
