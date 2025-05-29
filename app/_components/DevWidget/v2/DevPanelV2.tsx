"use client";

import { useEffect, useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";

import { FastTotalDevV2Panel } from "./FastTotalDevV2Panel";
import {
  TestParamsV2View,
  TestParamsV2,
  initialTestParams,
} from "./TestParamsV2";
import { TestingReportV2Panel } from "./TestingReportV2Panel";
import { PnlSnapshotKind } from "@/graphql/gql/graphql";

import { statistic } from "./statistic";
import { StatisticPanel } from "./StatisticPanel";

type TabType =
  | "fast_total"
  | "best_filter"
  | "reports"
  | "size_statistic"
  | "count_statistic";

const bestFilterParams = [
  {
    minSlope: 0,
    maxSlope: 1000000,
    r2MinsByPnlSnapshotKind: {
      [PnlSnapshotKind.Day]: 1,
      [PnlSnapshotKind.Week]: 1,
      [PnlSnapshotKind.Month]: 0.99,
      [PnlSnapshotKind.ThreeMonth]: 1,
      [PnlSnapshotKind.AllTime]: 1,
    },
  },
];

// const bestFilterParams = [
//   {
//     minSlope: 0,
//     maxSlope: 150,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 1,
//       [PnlSnapshotKind.Month]: 1,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 150,
//     maxSlope: 225,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 0.8,
//       [PnlSnapshotKind.TwoDay]: 0.8,
//       [PnlSnapshotKind.ThreeDay]: 0.8,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 1,
//       [PnlSnapshotKind.Month]: 0.8,
//       [PnlSnapshotKind.ThreeMonth]: 0.8,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 225,
//     maxSlope: 337,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 0.85,
//       [PnlSnapshotKind.TwoWeek]: 0.85,
//       [PnlSnapshotKind.Month]: 0.85,
//       [PnlSnapshotKind.ThreeMonth]: 0.85,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 337,
//     maxSlope: 506,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 0.9,
//       [PnlSnapshotKind.TwoDay]: 0.9,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 1,
//       [PnlSnapshotKind.Month]: 0.9,
//       [PnlSnapshotKind.ThreeMonth]: 0.9,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 506,
//     maxSlope: 759,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 0.9,
//       [PnlSnapshotKind.Month]: 0.9,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 759,
//     maxSlope: 1139,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 0.9,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 1,
//       [PnlSnapshotKind.Month]: 1,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 1139,
//     maxSlope: 1708,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 0.9,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 0.9,
//       [PnlSnapshotKind.Month]: 1,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 1708,
//     maxSlope: 2562,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 0.85,
//       [PnlSnapshotKind.TwoDay]: 0.85,
//       [PnlSnapshotKind.ThreeDay]: 0.85,
//       [PnlSnapshotKind.Week]: 0.85,
//       [PnlSnapshotKind.TwoWeek]: 0.85,
//       [PnlSnapshotKind.Month]: 0.85,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 2562,
//     maxSlope: 3844,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 0.9,
//       [PnlSnapshotKind.TwoWeek]: 0.9,
//       [PnlSnapshotKind.Month]: 0.9,
//       [PnlSnapshotKind.ThreeMonth]: 0.9,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 3844,
//     maxSlope: 5766,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 0.9,
//       [PnlSnapshotKind.TwoWeek]: 0.9,
//       [PnlSnapshotKind.Month]: 0.9,
//       [PnlSnapshotKind.ThreeMonth]: 0.9,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 5766,
//     maxSlope: 8649,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 0.85,
//       [PnlSnapshotKind.Month]: 0.85,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 8649,
//     maxSlope: 12974,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 1,
//       [PnlSnapshotKind.Month]: 1,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 8649,
//     maxSlope: 1000000,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 1,
//       [PnlSnapshotKind.Month]: 1,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
// ];
// const bestFilterParams = [
//   {
//     minSlope: 0,
//     maxSlope: 150,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 1,
//       [PnlSnapshotKind.Month]: 1,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 150,
//     maxSlope: 225,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 0.9,
//       [PnlSnapshotKind.TwoDay]: 0.9,
//       [PnlSnapshotKind.ThreeDay]: 0.9,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 1,
//       [PnlSnapshotKind.Month]: 0.8,
//       [PnlSnapshotKind.ThreeMonth]: 0.75,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 225,
//     maxSlope: 337,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 0.85,
//       [PnlSnapshotKind.TwoWeek]: 0.55,
//       [PnlSnapshotKind.Month]: 0.85,
//       [PnlSnapshotKind.ThreeMonth]: 0.7,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 337,
//     maxSlope: 506,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 0.7,
//       [PnlSnapshotKind.TwoDay]: 0.9,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 1,
//       [PnlSnapshotKind.Month]: 0.9,
//       [PnlSnapshotKind.ThreeMonth]: 0.95,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 506,
//     maxSlope: 759,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 0.9,
//       [PnlSnapshotKind.Month]: 0.95,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 759,
//     maxSlope: 1139,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 0.9,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 1,
//       [PnlSnapshotKind.Month]: 1,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 1139,
//     maxSlope: 1708,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 0.8,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 0.95,
//       [PnlSnapshotKind.Month]: 1,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 1708,
//     maxSlope: 2562,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 0.9,
//       [PnlSnapshotKind.TwoDay]: 0.9,
//       [PnlSnapshotKind.ThreeDay]: 0.8,
//       [PnlSnapshotKind.Week]: 0.85,
//       [PnlSnapshotKind.TwoWeek]: 0.85,
//       [PnlSnapshotKind.Month]: 0.9,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 2562,
//     maxSlope: 3844,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 0.95,
//       [PnlSnapshotKind.TwoWeek]: 0.9,
//       [PnlSnapshotKind.Month]: 0.9,
//       [PnlSnapshotKind.ThreeMonth]: 0.9,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 3844,
//     maxSlope: 5766,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 0.9,
//       [PnlSnapshotKind.TwoWeek]: 0.9,
//       [PnlSnapshotKind.Month]: 0.9,
//       [PnlSnapshotKind.ThreeMonth]: 0.9,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 5766,
//     maxSlope: 8649,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 0.85,
//       [PnlSnapshotKind.Month]: 0.75,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 8649,
//     maxSlope: 12974,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 1,
//       [PnlSnapshotKind.Month]: 1,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
//   {
//     minSlope: 8649,
//     maxSlope: 1000000,
//     r2MinsByPnlSnapshotKind: {
//       [PnlSnapshotKind.Day]: 1,
//       [PnlSnapshotKind.TwoDay]: 1,
//       [PnlSnapshotKind.ThreeDay]: 1,
//       [PnlSnapshotKind.Week]: 1,
//       [PnlSnapshotKind.TwoWeek]: 1,
//       [PnlSnapshotKind.Month]: 1,
//       [PnlSnapshotKind.ThreeMonth]: 1,
//       [PnlSnapshotKind.HalfYear]: 1,
//       [PnlSnapshotKind.Year]: 1,
//       [PnlSnapshotKind.AllTime]: 1,
//     },
//   },
// ];

export function DevPanelV2() {
  const [selected, setSelected] = useState<TabType>("fast_total");

  const [testParams, setTestParams] = useState<TestParamsV2>(initialTestParams);

  useEffect(() => {
    try {
      const jsonValue = localStorage.getItem("testParamsV2");
      if (jsonValue) {
        setTestParams(JSON.parse(jsonValue) as TestParamsV2);
      } else {
        setTestParams(initialTestParams);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChangeParams = (params: TestParamsV2) => {
    setTestParams(params);
    localStorage.setItem("testParamsV2", JSON.stringify(params));
  };

  return (
    <div className="flex flex-col gap-6">
      <TestParamsV2View
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
        <Tab key="best_filter" title="Best Cases" />
        <Tab key="reports" title="Test Reports" />
        <Tab key="size_statistic" title="Size Statistic" />
        <Tab key="count_statistic" title="Count Statistic" />
      </Tabs>

      {selected === "fast_total" && (
        <FastTotalDevV2Panel testParams={[testParams]} />
      )}
      {selected === "best_filter" && (
        <FastTotalDevV2Panel testParams={bestFilterParams} />
      )}
      {selected === "reports" && <TestingReportV2Panel />}
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
