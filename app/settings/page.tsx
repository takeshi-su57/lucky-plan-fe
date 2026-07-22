"use client";

import { useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import { ControlPanel } from "../_components/SettingsWidget/ControlPanel";
import { ContractPanel } from "../_components/SettingsWidget/ContractPanel";
import { PnlSnapshotPanel } from "../_components/SettingsWidget/PnlSnapshotPanel";
import { UsersPanel } from "../_components/SettingsWidget/UsersPanel";
import { SimulationEvaluatorWorkersPanel } from "../_components/SettingsWidget/SimulationEvaluatorWorkersPanel";
import { SimulationWorkflowCommandCenter } from "../_components/SettingsWidget/SimulationWorkflowCommandCenter";
import { useUserJWT } from "../_hooks/useUserJWT";
import { UserPermission } from "@/graphql/gql/graphql";

type TabType = "contracts" | "pnlSnapshot" | "users" | "workers" | "workflow" | "controls";

export default function Page() {
  const [selected, setSelected] = useState<TabType>("controls");

  const { userJwtQuery } = useUserJWT();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Tabs
          aria-label="users-table-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => value && setSelected(value as TabType)}
        >
          <Tab key="contracts" title="Contracts" />

          {userJwtQuery?.data?.permission === UserPermission.Admin ? (
            <>
              <Tab key="pnlSnapshot" title="Pnl Snapshot" />
              <Tab key="users" title="Users" />
              <Tab key="workers" title="Evaluator Workers" />
              <Tab key="workflow" title="Simulation Workflow" />
            </>
          ) : null}

          <Tab key="controls" title="Controls" />
        </Tabs>
      </div>

      {selected === "contracts" && <ContractPanel />}

      {selected === "controls" && <ControlPanel />}

      {userJwtQuery?.data?.permission === UserPermission.Admin ? (
        <>
          {selected === "pnlSnapshot" && <PnlSnapshotPanel />}
          {selected === "users" && <UsersPanel />}
          {selected === "workers" && <SimulationEvaluatorWorkersPanel />}
          {selected === "workflow" && <SimulationWorkflowCommandCenter />}
        </>
      ) : null}
    </div>
  );
}
