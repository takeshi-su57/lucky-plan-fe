"use client";

import { useCallback, useMemo, useState } from "react";
import { Tab, Tabs, Accordion, AccordionItem, Button } from "@nextui-org/react";

import {
  MissionStatus,
  TaskShallowDetailsInfoFragment,
  TaskStatus,
} from "@/graphql/gql/graphql";

import {
  useGetAllTasks,
  usePerformTask,
  useSubscribeTask,
} from "@/app-hooks/useTask";
import { useCloseMission, useSubscribeMission } from "../_hooks/useMission";
import { TaskSummary } from "../_components/TaskWidgets/TaskSummary";
import { TaskDetails } from "../_components/TaskWidgets/TaskDetails";

type TabType =
  | "all"
  | "created"
  | "await"
  | "initiated"
  | "failed"
  | "stopped"
  | "completed";

export default function Page() {
  const allTasks = useGetAllTasks();
  const performTask = usePerformTask();
  const closeMission = useCloseMission();
  useSubscribeMission();

  useSubscribeTask();

  const [selected, setSelected] = useState<TabType>("all");

  const handlePerformTask = useCallback(
    (task: TaskShallowDetailsInfoFragment) => {
      performTask({
        variables: {
          id: task.id,
        },
      });
    },
    [performTask],
  );

  const handleCloseMission = useCallback(
    (missionId: number) => {
      closeMission({
        variables: {
          id: missionId,
        },
      });
    },
    [closeMission],
  );

  const rows = useMemo(() => {
    if (allTasks.length === 0) {
      return [];
    }
    return allTasks
      .sort((a, b) => b.id - a.id)
      .filter((task) => {
        if (selected === "all") {
          return true;
        }

        if (selected === "created") {
          return task.status === TaskStatus.Created;
        }
        if (selected === "await") {
          return task.status === TaskStatus.Await;
        }
        if (selected === "initiated") {
          return task.status === TaskStatus.Initiated;
        }

        if (selected === "failed") {
          return task.status === TaskStatus.Failed;
        }

        if (selected === "stopped") {
          return task.status === TaskStatus.Stopped;
        }

        if (selected === "completed") {
          return task.status === TaskStatus.Completed;
        }

        return false;
      });
  }, [allTasks, selected]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Tabs
          aria-label="users-table-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => value && setSelected(value as TabType)}
        >
          <Tab key="all" title="All" />
          <Tab key="created" title="Created" />
          <Tab key="await" title="Await" />
          <Tab key="initiated" title="Initiated" />
          <Tab key="failed" title="Failed" />
          <Tab key="stopped" title="Stopped" />
          <Tab key="completed" title="Completed" />
        </Tabs>
      </div>

      <Accordion isCompact variant="splitted">
        {rows.map((task) => (
          <AccordionItem key={task.id} title={<TaskSummary task={task} />}>
            <div className="flex flex-col gap-8">
              {task.status === TaskStatus.Failed &&
              task.mission.status !== MissionStatus.Closed &&
              task.mission.status !== MissionStatus.Closing ? (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handlePerformTask(task)}
                    color="primary"
                  >
                    Perform
                  </Button>

                  <Button
                    onClick={() => handleCloseMission(task.missionId)}
                    color="danger"
                  >
                    Close Mission
                  </Button>
                </div>
              ) : null}

              <TaskDetails taskId={task.id} />
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
