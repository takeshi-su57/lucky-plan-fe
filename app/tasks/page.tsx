"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";
import {
  Tab,
  Tabs,
  Card,
  Button,
  CardBody,
  Snippet,
  Chip,
} from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
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

const columns: TableColumnProps[] = [
  {
    id: "id",
    component: "ID",
    allowsSorting: true,
  },
  {
    id: "mission",
    component: "Mission",
    allowsSorting: true,
  },
  {
    id: "action",
    component: "Action",
    allowsSorting: true,
  },
  {
    id: "logs",
    component: "Logs",
  },
  {
    id: "status",
    component: "Status",
    allowsSorting: true,
  },
  {
    id: "control",
    component: "",
    className: "flex-end",
  },
];

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
      })
      .map((task) => {
        let btnCom: ReactNode = null;

        if (
          task.status === TaskStatus.Failed &&
          task.mission.status !== MissionStatus.Closed
        ) {
          btnCom = (
            <div className="flex items-center gap-2">
              <Button onClick={() => handlePerformTask(task)} color="primary">
                Perform
              </Button>

              <Button
                onClick={() => handleCloseMission(task.missionId)}
                color="danger"
              >
                Close Mission
              </Button>
            </div>
          );
        }

        return {
          id: `${task.id}`,
          className: "group",
          data: {
            id: {
              sortableAmount: task.id,
              component: task.id,
            },
            mission: {
              sortableAmount: task.missionId,
              component: task.missionId,
            },
            action: {
              sortableAmount: task.actionId,
              component: (
                <div className="flex flex-col">
                  <span>Id: {task.actionId}</span>
                  <span>Name: {task.action.name}</span>
                </div>
              ),
            },
            logs: {
              component: (
                <div className="flex flex-col gap-1">
                  {task.logs.map((log, index) => (
                    <Snippet key={index}>
                      <div className="!max-w-[500px] text-wrap">{log}</div>
                    </Snippet>
                  ))}
                </div>
              ),
            },
            status: {
              sortableAmount: task.status,
              component: <Chip>{task.status}</Chip>,
            },
            control: {
              component: btnCom,
              className: "w-[50px]",
            },
          },
        };
      });
  }, [allTasks, handlePerformTask, handleCloseMission, selected]);

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

      <Card>
        <CardBody>
          <DataTable
            columns={columns}
            rows={rows}
            classNames={{
              tr: "font-mono cursor-pointer",
              td: "py-3",
              th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
