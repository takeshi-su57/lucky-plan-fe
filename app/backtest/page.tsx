"use client";

import { Suspense, useState } from "react";
import {
  Button,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { FiPlus, FiGrid, FiZap } from "react-icons/fi";

import { BacktestTaskList } from "../_components/BacktestWidgets/BacktestTaskList";
import { CreateGridBacktestTaskDrawer } from "../_components/BacktestWidgets/CreateGridBacktestTaskDrawer";
import { CreateOptunaBacktestTaskDrawer } from "../_components/BacktestWidgets/CreateOptunaBacktestTaskDrawer";

export default function BacktestPage() {
  const [isGridDrawerOpen, setIsGridDrawerOpen] = useState(false);
  const [isOptunaDrawerOpen, setIsOptunaDrawerOpen] = useState(false);

  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Backtest for Composable Strategy
            </h1>
            <p className="text-sm text-neutral-400">
              Create and manage backtest optimization tasks
            </p>
          </div>

          <Dropdown>
            <DropdownTrigger>
              <Button
                color="primary"
                startContent={<FiPlus className="h-4 w-4" />}
              >
                Add Task
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Create task options">
              <DropdownItem
                key="grid"
                startContent={<FiGrid className="h-4 w-4" />}
                description="Exhaustive search of all parameter combinations"
                onPress={() => setIsGridDrawerOpen(true)}
              >
                Grid Search
              </DropdownItem>
              <DropdownItem
                key="optuna"
                startContent={<FiZap className="h-4 w-4" />}
                description="Bayesian optimization with configurable trials"
                onPress={() => setIsOptunaDrawerOpen(true)}
              >
                Optuna (Smart)
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <BacktestTaskList />

        <CreateGridBacktestTaskDrawer
          isOpen={isGridDrawerOpen}
          onClose={() => setIsGridDrawerOpen(false)}
          onOpenChange={setIsGridDrawerOpen}
        />

        <CreateOptunaBacktestTaskDrawer
          isOpen={isOptunaDrawerOpen}
          onClose={() => setIsOptunaDrawerOpen(false)}
          onOpenChange={setIsOptunaDrawerOpen}
        />
      </div>
    </Suspense>
  );
}
