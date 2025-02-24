"use client";

import { useMemo } from "react";
import { Card, CardBody, Chip } from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import { useGetPnlSnapshotInitializedFlag } from "@/app/_hooks/useHistory";

const columns: TableColumnProps[] = [
  {
    id: "dateStr",
    component: "Date",
  },
  {
    id: "isInit",
    component: "Initialized",
  },
];

export function PnlSnapshotPanel() {
  const { data } = useGetPnlSnapshotInitializedFlag();

  const rows = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getPnlSnapshotInitializedFlag.map((flag) => ({
      id: `${flag.dateStr}`,
      className: "group",
      data: {
        dateStr: {
          component: flag.dateStr,
        },
        isInit: {
          component: flag.isInit ? (
            <Chip color="primary" className="text-xs">
              Initialized
            </Chip>
          ) : (
            <Chip color="danger" className="text-xs">
              Not Initialized
            </Chip>
          ),
        },
      },
    }));
  }, [data]);

  return (
    <Card>
      <CardBody>
        <DataTable
          columns={columns}
          rows={rows}
          classNames={{
            tr: "font-mono cursor-pointer",
            td: "py-3 ",
            th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
          }}
        />
      </CardBody>
    </Card>
  );
}
