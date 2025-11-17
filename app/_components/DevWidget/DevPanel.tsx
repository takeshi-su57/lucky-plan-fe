"use client";

import { useState, ChangeEventHandler } from "react";
import { SelectItem, Select, Tab, Tabs, Checkbox } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import dayjs from "dayjs";

import { TestParamsView } from "./TestParams";

import { bestCase } from "./subcase";
import { getServerTimezone } from "@/utils";
import { FastTotalDevPanelV2 } from "./FastTotalDevPanelV2";
import { Platform } from "@/graphql/gql/graphql";

type TabType = "wide_filter";

export function DevPanel() {
  const [selected, setSelected] = useState<TabType>("wide_filter");
  const [platform, setPlatform] = useState<Platform>(Platform.Gns);
  const [showPanel, setShowPanel] = useState(false);

  const [ratio, setRatio] = useState(1);

  const [startDate, setStartDate] = useState<Date>(
    parseDate("2025-01-01").toDate(getServerTimezone()),
  );

  const handleChangePlatform: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setPlatform(value as Platform);
    }
  };

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

      <Select
        variant="underlined"
        label="Platform"
        selectedKeys={platform ? [platform] : undefined}
        onChange={handleChangePlatform}
        selectionMode="single"
        className="w-[200px] font-mono"
      >
        {Object.values(Platform).map((item) => (
          <SelectItem key={item}>{item}</SelectItem>
        ))}
      </Select>

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

      <Checkbox isSelected={showPanel} onValueChange={setShowPanel}>
        Show Panel
      </Checkbox>

      {selected === "wide_filter" && showPanel && (
        <FastTotalDevPanelV2
          startDate={dayjs(startDate).format("YYYY-MM-DD")}
          filterParams={bestCase}
          platform={platform}
        />
      )}
    </div>
  );
}
