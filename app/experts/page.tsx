"use client";

import { Suspense, useState } from "react";
import { Spinner, Tab, Tabs } from "@nextui-org/react";

import { ExpertPanel } from "../_components/ExpertWidgets/ExpertPanel";
import { TagsPanel } from "../_components/TagWidgets/TagsPanel";
import { CategoriesPanel } from "../_components/TagWidgets/CategoriesPanel";
import { AnalyzePanel } from "../_components/ExpertWidgets/AnalyzePanel";

type TabType = "expert" | "analyze" | "tag" | "category";

export default function Page() {
  const [selected, setSelected] = useState<TabType>("expert");

  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <div className="flex flex-col gap-6">
        <Tabs
          aria-label="users-table-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => value && setSelected(value as TabType)}
        >
          <Tab key="expert" title="Expert" />
          <Tab key="analyze" title="Analyze" />
          <Tab key="tag" title="Tag" />
          <Tab key="category" title="Category" />
        </Tabs>

        {selected === "expert" && <ExpertPanel />}
        {selected === "analyze" && <AnalyzePanel />}
        {selected === "tag" && <TagsPanel />}
        {selected === "category" && <CategoriesPanel />}
      </div>
    </Suspense>
  );
}
