import { TaskBackwardDetails, TaskStatus } from "@/graphql/gql/graphql";
import { Chip } from "@nextui-org/react";

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
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">Task #{task.id}</span>

        <Chip variant="flat" color={statusColors[task.status]}>
          {task.status}
        </Chip>
      </div>

      <span className="text-base">{task.action.name}</span>
    </div>
  );
}
