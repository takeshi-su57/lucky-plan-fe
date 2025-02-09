"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Tab,
  Tabs,
  Card,
  Button,
  CardBody,
  useDisclosure,
} from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import {
  useGetAllStrategy,
  useGetAllStrategyMetadata,
  useRemoveStrategy,
} from "../_hooks/useStrategy";
import { CreateStrategyModal } from "../_components/StrategyWidgets/CreateStrategyModal";
import { convertMinToLifetimeItem } from "@/utils";
import { FaPlus } from "react-icons/fa";

const strategyColumns: TableColumnProps[] = [
  {
    id: "id",
    component: "ID",
    allowsSorting: true,
  },
  {
    id: "strategyKey",
    component: "Strategy",
    allowsSorting: true,
  },
  {
    id: "ratio",
    component: "Ratio/Lifetime",
    allowsSorting: true,
  },
  {
    id: "collateral",
    component: "Collateral",
    allowsSorting: true,
  },
  {
    id: "leverage",
    component: "Leverage",
    allowsSorting: true,
  },
  {
    id: "baseline",
    component: "Baseline",
    allowsSorting: true,
  },
  {
    id: "action",
    component: "",
    className: "flex-end",
  },
];

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

type TabType = "metadata" | "strategy";

export default function Page() {
  const allStrategyMetadata = useGetAllStrategyMetadata();
  const allStrategy = useGetAllStrategy();

  const removeStrategy = useRemoveStrategy();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [selected, setSelected] = useState<TabType>("strategy");

  const handleRemoveStrategy = useCallback(
    (id: number) => {
      removeStrategy({
        variables: {
          id,
        },
      });
    },
    [removeStrategy],
  );

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

  const strategyRows = useMemo(() => {
    if (allStrategy.length === 0) {
      return [];
    }
    return allStrategy.map((strategy) => ({
      id: `${strategy.id}`,
      className: "group",
      data: {
        id: {
          sortableAmount: strategy.id,
          component: strategy.id,
        },
        strategyKey: {
          sortableAmount: strategy.strategyKey,
          component: strategy.strategyKey,
        },
        ratio: {
          sortableAmount: strategy.ratio,
          component: (
            <div className="flex flex-col gap-1">
              <span>{strategy.ratio} %</span>
              <span>{convertMinToLifetimeItem(strategy.lifeTime).label}</span>
            </div>
          ),
        },
        collateral: {
          sortableAmount: strategy.maxCollateral,
          component: (
            <div className="flex flex-col gap-1">
              <span>max: {Number(strategy.maxCollateral)} USDC</span>
              <span>min: {Number(strategy.minCollateral)} USDC</span>
            </div>
          ),
        },
        leverage: {
          sortableAmount: strategy.maxLeverage,
          component: (
            <div className="flex flex-col gap-1">
              <span>max: {strategy.maxLeverage / 1000} x</span>
              <span>min: {strategy.minLeverage / 1000} x</span>
            </div>
          ),
        },
        baseline: {
          sortableAmount: strategy.collateralBaseline,
          component: strategy.collateralBaseline,
        },
        action: {
          component: (
            <Button
              color="danger"
              onClick={() => handleRemoveStrategy(strategy.id)}
            >
              Remove
            </Button>
          ),
          className: "w-[50px]",
        },
      },
    }));
  }, [allStrategy, handleRemoveStrategy]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Tabs
          aria-label="strategy-table-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => value && setSelected(value as TabType)}
        >
          <Tab key="strategy" title="Strategy"></Tab>
          <Tab key="metadata" title="MetaData"></Tab>
        </Tabs>

        {selected === "strategy" && (
          <Button isIconOnly color="primary" variant="flat" onClick={onOpen}>
            <FaPlus />
          </Button>
        )}
      </div>

      <Card>
        <CardBody>
          {selected === "metadata" ? (
            <DataTable
              columns={strategyMetadataColumns}
              rows={strategyMetadataRows}
              classNames={{
                tr: "font-mono cursor-pointer",
                td: "py-3 ",
                th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
              }}
            />
          ) : (
            <DataTable
              columns={strategyColumns}
              rows={strategyRows}
              classNames={{
                tr: "font-mono cursor-pointer",
                td: "py-3 ",
                th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
              }}
            />
          )}
        </CardBody>
      </Card>

      <CreateStrategyModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
