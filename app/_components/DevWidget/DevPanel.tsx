"use client";

import { useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import dayjs from "dayjs";

import { FastTotalDevPanel } from "./FastTotalDevPanel";
import { TestParamsView } from "./TestParams";

import { TestingReportPanel } from "./TestingReportPanel";
import { PastDatePicker } from "./PastDatePicker";
import { SelectLeaders } from "./SelectLeaders";
import { MergedLeaderboard } from "./MergedLeaderboard";
import { BacktestResult } from "./BacktestResult";
import { Stepper } from "@/components/Stepper/Stepper";

import { bestCase, primaryBestCase } from "./subcase";
import { LeaderParams } from "./LeaderItem";
import { getServerTimezone } from "@/utils";

type TabType = "one_day" | "applied_filter" | "wide_filter" | "reports";

export function DevPanel() {
  const [selected, setSelected] = useState<TabType>("one_day");
  const [currentStep, setCurrentStep] = useState(1);

  const [ratio, setRatio] = useState(1);

  const [pastDate, setPastDate] = useState<Date>(
    parseDate("2024-12-01").toDate(getServerTimezone()),
  );
  const [leaders, setLeaders] = useState<LeaderParams[]>([]);
  const [startDate, setStartDate] = useState<Date>(
    parseDate("2025-01-01").toDate(getServerTimezone()),
  );

  const steps = [
    {
      step: 1,
      label: "Select Date For Backtest",
      description: `Select a time period to analyze how your trading strategy would have performed historically. This helps validate your system's effectiveness across different market conditions and scenarios.`,
      content: (
        <PastDatePicker
          pastDate={pastDate}
          setPastDate={setPastDate}
          onNextStep={() => setCurrentStep(2)}
        />
      ),
    },
    {
      step: 2,
      label: "Select Leaders",
      description:
        "Select the leaders that will be used to backtest the system.",
      content: (
        <SelectLeaders
          leaders={leaders}
          onChangeLeaders={setLeaders}
          endDate={pastDate}
          hideTags={true}
          onNextStep={() => setCurrentStep(3)}
          onPrevStep={() => setCurrentStep(1)}
          testParams={bestCase}
          ratio={ratio}
        />
      ),
    },
    {
      step: 3,
      label: "Analyze Combined Performance",
      description:
        "Visualize and analyze the aggregated performance metrics of selected leaders to evaluate overall strategy effectiveness.",
      content: (
        <MergedLeaderboard
          endDate={pastDate}
          leaders={leaders}
          onNextStep={() => setCurrentStep(4)}
          onPrevStep={() => setCurrentStep(2)}
        />
      ),
    },
    {
      step: 4,
      label: "Run",
      description: `Run the backtest to see the results of the system.`,
      content: (
        <BacktestResult
          startDate={pastDate}
          leaders={leaders}
          onNextStep={() => setCurrentStep(1)}
          onPrevStep={() => setCurrentStep(3)}
        />
      ),
    },
  ];

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
        <Tab key="one_day" title="One Day" />
        <Tab key="applied_filter" title="Applied Filter" />
        <Tab key="wide_filter" title="Wide Filter" />
        <Tab key="reports" title="Reports" />
      </Tabs>

      {selected === "one_day" && (
        <Stepper steps={steps} currentStep={currentStep} />
      )}

      {selected === "applied_filter" && (
        <FastTotalDevPanel
          startDate={dayjs(startDate).format("YYYY-MM-DD")}
          isTestnet={false}
          filterParams={bestCase}
        />
      )}

      {selected === "wide_filter" && (
        <FastTotalDevPanel
          startDate={dayjs(startDate).format("YYYY-MM-DD")}
          filterParams={primaryBestCase}
          isTestnet={false}
        />
      )}

      {selected === "reports" && <TestingReportPanel />}
    </div>
  );
}
