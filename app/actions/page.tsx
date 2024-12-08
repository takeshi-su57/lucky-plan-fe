"use client";

import { useMemo } from "react";
import { Card, CardBody, Snippet } from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { useGetAllActions, useSubscribeAction } from "../_hooks/useAction";

const columns: TableColumnProps[] = [
  {
    id: "id",
    component: "ID",
  },
  {
    id: "name",
    component: "Name",
  },
  {
    id: "positionId",
    component: "Position",
  },
  {
    id: "blockNumber",
    component: "Block",
  },
  {
    id: "args",
    component: "Args",
  },
  {
    id: "createdAt",
    component: "Created At",
  },
];

export default function Page() {
  const allActions = useGetAllActions();

  useSubscribeAction();

  const rows = useMemo(() => {
    if (allActions.length === 0) {
      return [];
    }
    return allActions.map((action) => {
      return {
        id: `${action.id}`,
        className: "group",
        data: {
          id: {
            component: action.id,
          },
          name: {
            component: action.name,
          },
          positionId: {
            component: action.positionId,
          },
          blockNumber: {
            component: action.blockNumber,
          },
          args: {
            component: <Snippet>{action.args}</Snippet>,
          },
          createdAt: {
            component: action.createdAt,
          },
        },
      };
    });
  }, [allActions]);

  return (
    <div className="flex flex-col gap-6">
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
