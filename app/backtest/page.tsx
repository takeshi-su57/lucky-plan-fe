"use client";

import { Suspense, useState } from "react";
import {
  Button,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tabs,
  Tab,
} from "@heroui/react";
import { FiPlus, FiGrid, FiZap, FiLayers, FiList } from "react-icons/fi";

import { UnifiedTaskList } from "../_components/BacktestWidgets/UnifiedTaskList";
import { CreateGridBacktestTaskDrawer } from "../_components/BacktestWidgets/CreateGridBacktestTaskDrawer";
import { CreateOptunaBacktestTaskDrawer } from "../_components/BacktestWidgets/CreateOptunaBacktestTaskDrawer";
import {
  StrategyTemplateList,
  CreateTemplateDrawer,
  EditTemplateDrawer,
  CreateTemplateSearchDrawer,
} from "../_components/TemplateWidgets";
import { useSubscribeBacktestTask } from "../_hooks/useBacktest";
import { useSubscribeTemplateSearch } from "../_hooks/useTemplateSearch";

type TabKey = "tasks" | "templates";

export default function BacktestPage() {
  const [selectedTab, setSelectedTab] = useState<TabKey>("tasks");

  // Task drawer state
  const [isGridDrawerOpen, setIsGridDrawerOpen] = useState(false);
  const [isOptunaDrawerOpen, setIsOptunaDrawerOpen] = useState(false);

  // Template drawer state
  const [isCreateTemplateDrawerOpen, setIsCreateTemplateDrawerOpen] =
    useState(false);
  const [isEditTemplateDrawerOpen, setIsEditTemplateDrawerOpen] =
    useState(false);
  const [editTemplateId, setEditTemplateId] = useState<string | null>(null);

  // Template search drawer state
  const [isCreateSearchDrawerOpen, setIsCreateSearchDrawerOpen] =
    useState(false);
  const [preselectedTemplateId, setPreselectedTemplateId] = useState<
    string | null
  >(null);

  // Subscribe to real-time updates
  useSubscribeBacktestTask();
  useSubscribeTemplateSearch();

  const handleEditTemplate = (templateId: string) => {
    setEditTemplateId(templateId);
    setIsEditTemplateDrawerOpen(true);
  };

  const handleNewSearchFromTemplate = (templateId: string) => {
    setPreselectedTemplateId(templateId);
    setIsCreateSearchDrawerOpen(true);
  };

  const renderHeaderActions = () => {
    if (selectedTab === "tasks") {
      return (
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
      );
    }

    if (selectedTab === "templates") {
      return (
        <Button
          color="primary"
          startContent={<FiPlus className="h-4 w-4" />}
          onPress={() => setIsCreateTemplateDrawerOpen(true)}
        >
          Add Template
        </Button>
      );
    }

    return null;
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
              Create and manage backtest optimization tasks and templates
            </p>
          </div>

          {renderHeaderActions()}
        </div>

        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as TabKey)}
          color="secondary"
          variant="underlined"
          classNames={{
            tabList: "gap-6",
            cursor: "bg-secondary-500",
            tab: "h-10 px-0",
          }}
        >
          <Tab
            key="tasks"
            title={
              <div className="flex items-center gap-2">
                <FiList className="h-4 w-4" />
                <span>Tasks</span>
              </div>
            }
          >
            <div className="pt-4">
              <UnifiedTaskList />
            </div>
          </Tab>

          <Tab
            key="templates"
            title={
              <div className="flex items-center gap-2">
                <FiLayers className="h-4 w-4" />
                <span>Templates</span>
              </div>
            }
          >
            <div className="pt-4">
              <StrategyTemplateList
                onEdit={handleEditTemplate}
                onNewSearch={handleNewSearchFromTemplate}
              />
            </div>
          </Tab>
        </Tabs>

        {/* Task Drawers */}
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

        {/* Template Drawers */}
        <CreateTemplateDrawer
          isOpen={isCreateTemplateDrawerOpen}
          onClose={() => setIsCreateTemplateDrawerOpen(false)}
          onOpenChange={setIsCreateTemplateDrawerOpen}
        />

        <EditTemplateDrawer
          isOpen={isEditTemplateDrawerOpen}
          templateId={editTemplateId}
          onClose={() => {
            setIsEditTemplateDrawerOpen(false);
            setEditTemplateId(null);
          }}
          onOpenChange={setIsEditTemplateDrawerOpen}
        />

        {/* Template Search Drawer */}
        <CreateTemplateSearchDrawer
          isOpen={isCreateSearchDrawerOpen}
          onClose={() => {
            setIsCreateSearchDrawerOpen(false);
            setPreselectedTemplateId(null);
          }}
          onOpenChange={setIsCreateSearchDrawerOpen}
          preselectedTemplateId={preselectedTemplateId}
        />
      </div>
    </Suspense>
  );
}
