"use client";

import { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { ControlPanel } from "../_components/SettingsWidget/ControlPanel";
import { StrategyPanel } from "../_components/SettingsWidget/StrategyPanel";
import { ContractPanel } from "../_components/SettingsWidget/ContractPanel";

type TabType = "contracts" | "strategies" | "controls";

export default function Page() {
  const [selected, setSelected] = useState<TabType>("contracts");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Tabs
          aria-label="users-table-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => value && setSelected(value as TabType)}
        >
          <Tab key="contracts" title="Contracts" />
          <Tab key="strategies" title="Strategies" />
          <Tab key="controls" title="Controls" />
        </Tabs>
      </div>

      {selected === "contracts" && <ContractPanel />}
      {selected === "strategies" && <StrategyPanel />}
      {selected === "controls" && <ControlPanel />}
    </div>
  );
}
