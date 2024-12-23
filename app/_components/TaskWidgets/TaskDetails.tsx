"use client";

import { Divider, Progress } from "@nextui-org/react";

import { useGetTask } from "@/app-hooks/useTask";
import { ActionView } from "./ActionView";
import { TaskLogView } from "./TaskLogView";

export type TaskDetailsProps = {
  taskId: number;
};

export function TaskDetails({ taskId }: TaskDetailsProps) {
  const { task, loading, error } = useGetTask(taskId);

  if (loading) {
    return <Progress isIndeterminate className="w-full flex-1" size="sm" />;
  }

  if (error) {
    return (
      <span className="text-bold text-base text-red-400">
        Oops, There is an issue, Please check your network.
      </span>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <div className="flex justify-between p-6 text-neutral-400">
      <div className="flex w-2/3 flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="px-2 text-base">Leader</span>

          <ActionView action={task.action} />
        </div>

        <div className="flex flex-col gap-2">
          <span className="px-2 text-base">Follower</span>

          {task.followerActions.map((action) => (
            <ActionView key={action.id} action={action} />
          ))}
        </div>
      </div>

      <Divider orientation="vertical" />

      <div className="flex w-1/3 flex-col gap-3">
        <span className="px-2 text-base">Logs</span>

        {task.logs.map((log, index) => (
          <TaskLogView taskLog={log} id={index} key={index} />
        ))}
      </div>
    </div>
  );
}
