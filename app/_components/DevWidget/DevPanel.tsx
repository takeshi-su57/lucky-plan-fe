"use client";

import { useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import dayjs from "dayjs";

import { TestParamsView } from "./TestParams";

import { bestCase } from "./subcase";
import { getServerTimezone } from "@/utils";
import { FastTotalDevPanelV2 } from "./FastTotalDevPanelV2";

type TabType = "wide_filter";

export function DevPanel() {
  const [selected, setSelected] = useState<TabType>("wide_filter");

  const [ratio, setRatio] = useState(1);

  const [startDate, setStartDate] = useState<Date>(
    parseDate("2025-01-01").toDate(getServerTimezone()),
  );

  return (
    <div className="flex flex-col gap-6">
      <TestParamsView
        ratio={ratio}
        date={startDate}
        onChangeParams={(ratio, date) => {
          setRatio(ratio);
          setStartDate(date);
        }}
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
        <Tab key="wide_filter" title="Wide Filter" />
      </Tabs>

      {selected === "wide_filter" && (
        <FastTotalDevPanelV2
          startDate={dayjs(startDate).format("YYYY-MM-DD")}
          filterParams={bestCase}
        />
      )}
    </div>
  );
}
