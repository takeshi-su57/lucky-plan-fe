"use client";

import { useCallback } from "react";
import { Button, Progress } from "@nextui-org/react";
import { TaskStatus } from "@/graphql/gql/graphql";

import { useGetTask } from "@/app-hooks/useTask";
import { usePerformTask } from "@/app/_hooks/useTask";

import { ActionView } from "@/app-components/ActionsWidget/ActionView";
import { TaskLogView } from "./TaskLogView";

export type TaskDetailsProps = {
  taskId: number;
};

export function TaskDetails({ taskId }: TaskDetailsProps) {
  const { task, loading, error } = useGetTask(taskId);

  const performTask = usePerformTask();

  const handlePerformTask = useCallback(() => {
    performTask({
      variables: {
        id: taskId,
      },
    });
  }, [performTask, taskId]);

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

  console.log("taskDetails ==>", task);

  return (
    <div className="flex flex-col gap-6 border-t border-t-neutral-400/20 py-6 text-neutral-400">
      {task.status !== TaskStatus.Await &&
      task.status !== TaskStatus.Stopped &&
      task.status !== TaskStatus.Completed ? (
        <div className="flex items-center gap-2">
          <Button onClick={handlePerformTask} color="primary">
            Perform
          </Button>
        </div>
      ) : null}

      <div className="flex justify-between">
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

        <div className="flex w-1/3 flex-col gap-3">
          <span className="px-2 text-base">Logs</span>

          {task.logs.map((log, index) => (
            <TaskLogView taskLog={log} id={index} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
