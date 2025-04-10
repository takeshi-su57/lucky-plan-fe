"use client";

import { useEffect, useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";

import { FastTotalDevV4Panel } from "./FastTotalDevV4Panel";
import {
  TestParamsV4View,
  TestParamsV3,
  initialTestParams,
} from "./TestParamsV4";

import { TestingReportV4Panel } from "./TestingReportV4Panel";

import { executableFilter } from "./subcase";

type TabType = "fast_total" | "best_filter" | "reports";

export function DevPanelV4() {
  const [selected, setSelected] = useState<TabType>("fast_total");

  const [testParams, setTestParams] = useState<TestParamsV3>(initialTestParams);
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    try {
      const jsonValue = localStorage.getItem("testParamsV3");
      if (jsonValue) {
        setTestParams(JSON.parse(jsonValue) as TestParamsV3);
      } else {
        setTestParams(initialTestParams);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChangeParams = (params: TestParamsV3, value: number) => {
    setTestParams(params);
    setRatio(value);
    localStorage.setItem("testParamsV3", JSON.stringify(params));
  };

  return (
    <div className="flex flex-col gap-6">
      <TestParamsV4View
        params={testParams}
        ratio={ratio}
        onChangeParams={handleChangeParams}
      />

      <Tabs
        aria-label="dev-tabs"
        selectedKey={selected}
        onSelectionChange={(value) => {
          if (value) {
            setSelected(value as TabType);
          }
        }}
      >
        <Tab key="fast_total" title="Fast Total" />
        <Tab key="best_filter" title="Best Filter" />
        <Tab key="reports" title="Reports" />
      </Tabs>

      {selected === "fast_total" && (
        <FastTotalDevV4Panel testParams={[testParams]} ratio={ratio} />
      )}
      {selected === "best_filter" && (
        <FastTotalDevV4Panel testParams={executableFilter} ratio={ratio} />
      )}
      {selected === "reports" && <TestingReportV4Panel />}
    </div>
  );
}
