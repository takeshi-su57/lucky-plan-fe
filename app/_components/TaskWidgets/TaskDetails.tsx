"use client";

import { useCallback } from "react";
import { Button } from "@nextui-org/react";
import {
  MissionStatus,
  TaskForwardDetails,
  TaskStatus,
} from "@/graphql/gql/graphql";

import { useStopTask } from "@/app-hooks/useTask";
import { usePerformTask } from "@/app-hooks/useTask";

import { ActionView } from "@/app-components/ActionsWidget/ActionView";

import { TaskLogView } from "./TaskLogView";

export type TaskDetailsProps = {
  task: TaskForwardDetails;
  missionStatus: MissionStatus;
};

export function TaskDetails({ task, missionStatus }: TaskDetailsProps) {
  const performTask = usePerformTask();
  const stopTask = useStopTask();

  const handlePerformTask = useCallback(() => {
    performTask({
      variables: {
        id: task.id,
      },
    });
  }, [performTask, task.id]);

  const handleStopTask = useCallback(() => {
    stopTask({
      variables: {
        id: task.id,
      },
    });
  }, [stopTask, task.id]);

  return (
    <div className="flex flex-col gap-6 border-t border-t-neutral-400/20 py-6 text-neutral-400">
      {missionStatus === MissionStatus.Opened &&
      task.status !== TaskStatus.Await &&
      task.status !== TaskStatus.Stopped &&
      task.status !== TaskStatus.Completed ? (
        <div className="flex items-center gap-2">
          <Button onClick={handlePerformTask} size="sm" color="primary">
            Perform
          </Button>
          <Button onClick={handleStopTask} size="sm" color="danger">
            Stop
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
              <ActionView key={action.id} action={action.action} />
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
