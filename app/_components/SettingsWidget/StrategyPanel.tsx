"use client";

import { useMemo } from "react";
import { Card, CardBody } from "@heroui/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { useGetAllStrategy } from "@/app-hooks/useStrategy";

const strategyColumns: TableColumnProps[] = [
  {
    id: "id",
    component: "ID",
    allowsSorting: true,
  },
  {
    id: "ratio",
    component: "Ratio",
    allowsSorting: true,
  },
  {
    id: "collateral",
    component: "Collateral (USDC)",
  },
  {
    id: "leverage",
    component: "Leverage",
  },
  {
    id: "lifeTime",
    component: "Lifetime",
  },
];

export function StrategyPanel() {
  const allStrategy = useGetAllStrategy();

  const strategyRows = useMemo(() => {
    if (allStrategy.length === 0) {
      return [];
    }
    return allStrategy.map((strategy) => ({
      id: `${strategy.id}`,
      className: "group",
      data: {
        id: {
          component: `${strategy.id}`,
          sortableAmount: strategy.id,
        },
        ratio: {
          sortableAmount: strategy.ratio,
          component: `${strategy.ratio}`,
        },
        collateral: {
          component: `${strategy.minCollateral} ~ ${strategy.maxCollateral}`,
        },
        leverage: {
          component: `${strategy.minLeverage / 1000}x ~ ${strategy.maxLeverage / 1000}x`,
        },
        lifeTime: {
          component: `${strategy.lifeTime}`,
          sortableAmount: strategy.lifeTime,
        },
      },
    }));
  }, [allStrategy]);

  return (
    <Card>
      <CardBody>
        <DataTable
          columns={strategyColumns}
          rows={strategyRows}
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
