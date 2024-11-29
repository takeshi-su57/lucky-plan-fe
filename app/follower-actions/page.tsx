"use client";

import { useMemo } from "react";
import { Card, CardBody } from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import {
  useGetAllFollowerActions,
  useSubscribeFollowerAction,
} from "../_hooks/useFollowerAction";

const columns: TableColumnProps[] = [
  {
    id: "id",
    component: "ID",
  },
  {
    id: "taskId",
    component: "Task",
  },
  {
    id: "actionId",
    component: "Action",
  },
];

export default function Page() {
  const allFollowerActions = useGetAllFollowerActions();

  useSubscribeFollowerAction();

  const rows = useMemo(() => {
    if (allFollowerActions.length === 0) {
      return [];
    }
    return allFollowerActions.map((action) => {
      return {
        id: `${action.id}`,
        className: "group",
        data: {
          id: {
            component: action.id,
          },
          taskId: {
            component: action.taskId,
          },
          actionId: {
            component: action.actionId,
          },
        },
      };
    });
  }, [allFollowerActions]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardBody>
          <DataTable
            columns={columns}
            rows={rows}
            classNames={{
              tr: "hover:bg-white/5 font-mono cursor-pointer",
              td: "py-3",
              th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
