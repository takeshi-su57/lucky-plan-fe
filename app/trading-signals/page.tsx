"use client";

import { Suspense, useState } from "react";
import { Spinner, Tab, Tabs } from "@nextui-org/react";

import { SignalControlPanel } from "../_components/TradingSignalWidgets/SignalControlPanel";
import { AddTradingSignalButton } from "../_components/TradingSignalWidgets/AddTradingSignalButton";
import { InsightFromSignalPanel } from "../_components/TradingSignalWidgets/InsightFromSignalPanel";
import { InsightFromExpertPanel } from "../_components/TradingSignalWidgets/InsightFromExpertPanel";
import { Platform } from "@/graphql/gql/graphql";

type TabType =
  | "management"
  | "insightFromSignal"
  | "insightFromGnsExpert"
  | "insightFromGmxExpert"
  | "insightFromAvntExpert";

export default function Page() {
  const [selected, setSelected] = useState<TabType>("insightFromSignal");

  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Trading Signals</h1>

        <div className="flex items-center justify-between">
          <Tabs
            aria-label="tabs"
            selectedKey={selected}
            onSelectionChange={(value) =>
              value && setSelected(value as TabType)
            }
          >
            <Tab key="insightFromSignal" title="Insight from Signal" />
            <Tab key="insightFromGnsExpert" title="Insight from GNS Expert" />
            <Tab key="insightFromGmxExpert" title="Insight from GMX Expert" />
            <Tab key="insightFromAvntExpert" title="Insight from AVNT Expert" />
            <Tab key="management" title="Management" />
          </Tabs>
          <AddTradingSignalButton />
        </div>

        {selected === "management" && <SignalControlPanel />}
        {selected === "insightFromSignal" && <InsightFromSignalPanel />}
        {selected === "insightFromGnsExpert" && (
          <InsightFromExpertPanel platform={Platform.Gns} />
        )}
        {selected === "insightFromGmxExpert" && (
          <InsightFromExpertPanel platform={Platform.Gmx} />
        )}
        {selected === "insightFromAvntExpert" && (
          <InsightFromExpertPanel platform={Platform.Avnt} />
        )}
      </div>
    </Suspense>
  );
}
