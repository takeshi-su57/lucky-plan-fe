"use client";

import { Suspense, useState } from "react";
import { Spinner, Tab, Tabs } from "@heroui/react";

import { AnalyzePanel } from "../_components/ExpertWidgets/AnalyzePanel";

type TabType = "analyze";

export default function Page() {
  const [selected, setSelected] = useState<TabType>("analyze");

  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <div className="flex flex-col gap-6">
        <Tabs
          aria-label="users-table-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => value && setSelected(value as TabType)}
        >
          <Tab key="analyze" title="Analyze" />
        </Tabs>

        {selected === "analyze" && <AnalyzePanel />}
      </div>
    </Suspense>
  );
}
