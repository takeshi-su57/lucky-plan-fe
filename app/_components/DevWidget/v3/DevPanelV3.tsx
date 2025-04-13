"use client";

import { useEffect, useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";

import { FastTotalDevV3Panel } from "./FastTotalDevV3Panel";
import {
  TestParamsV3View,
  TestParamsV3,
  initialTestParams,
} from "./TestParamsV3";

import { statistic } from "./statistic";
import { StatisticPanel } from "./StatisticPanel";
import { TestingReportV3Panel } from "./TestingReportV3Panel";

import { executableFilter } from "./subcase";

type TabType =
  | "fast_total"
  | "best_filter"
  | "reports"
  | "size_statistic"
  | "count_statistic";

export function DevPanelV3() {
  const [selected, setSelected] = useState<TabType>("fast_total");

  const [testParams, setTestParams] = useState<TestParamsV3>(initialTestParams);

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

  const handleChangeParams = (params: TestParamsV3) => {
    setTestParams(params);
    localStorage.setItem("testParamsV3", JSON.stringify(params));
  };

  return (
    <div className="flex flex-col gap-6">
      <TestParamsV3View
        params={testParams}
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
        <Tab key="size_statistic" title="Size Statistic" />
        <Tab key="count_statistic" title="Count Statistic" />
      </Tabs>

      {selected === "fast_total" && (
        <FastTotalDevV3Panel testParams={[testParams]} />
      )}
      {selected === "best_filter" && (
        <FastTotalDevV3Panel testParams={executableFilter} />
      )}
      {selected === "reports" && <TestingReportV3Panel />}
      {selected === "size_statistic" && (
        <StatisticPanel
          title="Size Statistic"
          data={statistic.sizeStatistics}
        />
      )}
      {selected === "count_statistic" && (
        <StatisticPanel
          title="Count Statistic"
          data={statistic.countStatistics}
        />
      )}
    </div>
  );
}
