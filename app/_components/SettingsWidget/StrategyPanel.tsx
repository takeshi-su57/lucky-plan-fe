"use client";

import { useMemo } from "react";
import { Card, CardBody } from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { useGetAllStrategyMetadata } from "@/app-hooks/useStrategy";

const strategyMetadataColumns: TableColumnProps[] = [
  {
    id: "key",
    component: "Key",
    allowsSorting: true,
  },
  {
    id: "title",
    component: "Title",
    allowsSorting: true,
  },
  {
    id: "description",
    component: "Description",
  },
];

export function StrategyPanel() {
  const allStrategyMetadata = useGetAllStrategyMetadata();

  const strategyMetadataRows = useMemo(() => {
    if (allStrategyMetadata.length === 0) {
      return [];
    }
    return allStrategyMetadata.map((metadata) => ({
      id: metadata.key,
      className: "group",
      data: {
        key: {
          component: metadata.key,
          sortableAmount: metadata.key,
        },
        title: {
          sortableAmount: metadata.title,
          component: metadata.title,
        },
        description: {
          component: metadata.description,
        },
      },
    }));
  }, [allStrategyMetadata]);

  return (
    <Card>
      <CardBody>
        <DataTable
          columns={strategyMetadataColumns}
          rows={strategyMetadataRows}
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
