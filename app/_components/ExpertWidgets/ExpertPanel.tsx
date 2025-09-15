"use client";

import { useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";

import { ExpertV1Panel } from "./ExpertV1Panel";
import { ExpertV2Panel } from "./ExpertV2Panel";

type TabType = "v1" | "v2";

export function ExpertPanel() {
  const [selected, setSelected] = useState<TabType>("v1");

  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs
        aria-label="users-table-tabs"
        selectedKey={selected}
        onSelectionChange={(value) => value && setSelected(value as TabType)}
      >
        <Tab key="v1" title="V1" />
        <Tab key="v2" title="V2" />
      </Tabs>

      {selected === "v1" ? <ExpertV1Panel /> : null}
      {selected === "v2" ? <ExpertV2Panel /> : null}
    </div>
  );
}
