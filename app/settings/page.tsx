"use client";

import { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { ControlPanel } from "../_components/SettingsWidget/ControlPanel";
import { StrategyPanel } from "../_components/SettingsWidget/StrategyPanel";
import { ContractPanel } from "../_components/SettingsWidget/ContractPanel";
import { PnlSnapshotPanel } from "../_components/SettingsWidget/PnlSnapshotPanel";
import { UsersPanel } from "../_components/SettingsWidget/UsersPanel";
import { useUserJWT } from "../_hooks/useUserJWT";
import { UserPermission } from "@/graphql/gql/graphql";
import { BacktestSettingsPanel } from "../_components/SettingsWidget/BacktestSettingsPanel";
import { useAppSettings } from "../_hooks/useAppSettings";

type TabType =
  | "contracts"
  | "strategies"
  | "pnlSnapshot"
  | "users"
  | "backtest"
  | "controls";

export default function Page() {
  const [selected, setSelected] = useState<TabType>("controls");

  const { userJwtQuery } = useUserJWT();

  const { appSettings } = useAppSettings();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Tabs
          aria-label="users-table-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => value && setSelected(value as TabType)}
        >
          {appSettings.isDevMode ? (
            <>
              <Tab key="contracts" title="Contracts" />
              <Tab key="strategies" title="Strategies" />
            </>
          ) : null}

          {userJwtQuery?.data?.permission === UserPermission.Admin ? (
            <>
              <Tab key="pnlSnapshot" title="Pnl Snapshot" />
              <Tab key="users" title="Users" />
              <Tab key="backtest" title="Backtest" />
            </>
          ) : null}

          <Tab key="controls" title="Controls" />
        </Tabs>
      </div>

      {selected === "contracts" && <ContractPanel />}
      {selected === "strategies" && <StrategyPanel />}

      {selected === "controls" && <ControlPanel />}

      {userJwtQuery?.data?.permission === UserPermission.Admin ? (
        <>
          {selected === "pnlSnapshot" && <PnlSnapshotPanel />}
          {selected === "users" && <UsersPanel />}
          {selected === "backtest" && <BacktestSettingsPanel />}
        </>
      ) : null}
    </div>
  );
}
