"use client";

import { Suspense, useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";

import { BacktestTaskList } from "../_components/BacktestWidgets/BacktestTaskList";
import { CreateBacktestTaskDrawer } from "../_components/BacktestWidgets/CreateBacktestTaskDrawer";

export default function BacktestPage() {
  const router = useRouter();
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);

  const handleSelectTask = (taskId: string) => {
    router.push(`/backtest/${taskId}`);
  };

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

          <Button
            color="primary"
            startContent={<FiPlus className="h-4 w-4" />}
            onPress={() => setIsCreateDrawerOpen(true)}
          >
            Add Task
          </Button>
        </div>

        <BacktestTaskList onSelectTask={handleSelectTask} />

        <CreateBacktestTaskDrawer
          isOpen={isCreateDrawerOpen}
          onClose={() => setIsCreateDrawerOpen(false)}
          onOpenChange={setIsCreateDrawerOpen}
        />
      </div>
    </Suspense>
  );
}
