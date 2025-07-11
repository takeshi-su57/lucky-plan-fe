"use client";

import { Suspense, useState } from "react";
import { Spinner, Tab, Tabs } from "@nextui-org/react";

import { ExperPanel } from "../_components/ExpertWidgets/ExperPanel";
import { TagsPanel } from "../_components/TagWidgets/TagsPanel";
import { CategoriesPanel } from "../_components/TagWidgets/CategoriesPanel";

type TabType = "expert" | "tag" | "category";

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
          <Tab key="tag" title="Tag" />
          <Tab key="category" title="Category" />
        </Tabs>

        {selected === "expert" && <ExperPanel />}
        {selected === "tag" && <TagsPanel />}
        {selected === "category" && <CategoriesPanel />}
      </div>
    </Suspense>
  );
}
