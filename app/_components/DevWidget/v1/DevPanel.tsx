"use client";

import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
import { Tab, Tabs } from "@nextui-org/react";

import { getServerTimezone } from "@/utils";
import { Stepper } from "@/components/Stepper/Stepper";
import { PastDatePicker } from "./PastDatePicker";
import { SelectLeaders } from "./SelectLeaders";
import { BacktestResult } from "./BacktestResult";
import { LeaderParams } from "./LeaderItem";
import { MergedLeaderboard } from "./MergedLeaderboard";

import { MonthlyDevPanel } from "./MonthlyDevPanel";
import { TotalDevPanel } from "./TotalDevPanel";
import { FastTotalDevPanel } from "./FastTotalDevPanel";
import { TestParams, TestParamsView, initialTestParams } from "./TestParams";
import { TestingReportPanel } from "./TestingReportPanel";

type TabType = "one_day" | "one_month" | "total" | "fast_total" | "reports";

export function DevPanel() {
  const [currentStep, setCurrentStep] = useState(1);

  const [pastDate, setPastDate] = useState<Date>(
    parseDate("2024-12-01").toDate(getServerTimezone()),
  );
  const [leaders, setLeaders] = useState<LeaderParams[]>([]);
  const [selected, setSelected] = useState<TabType>("one_day");

  const [testParams, setTestParams] = useState<TestParams>(initialTestParams);

  useEffect(() => {
    try {
      const jsonValue = localStorage.getItem("testParams");
      if (jsonValue) {
        setTestParams(JSON.parse(jsonValue) as TestParams);
      } else {
        setTestParams(initialTestParams);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChangeParams = (params: TestParams) => {
    setTestParams(params);
    localStorage.setItem("testParams", JSON.stringify(params));
  };

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
          testParams={testParams}
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
      <TestParamsView params={testParams} onChangeParams={handleChangeParams} />

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
        <Tab key="one_month" title="One Month" />
        <Tab key="total" title="Total" />
        <Tab key="fast_total" title="Fast Total" />
        <Tab key="reports" title="Test Reports" />
      </Tabs>

      {selected === "one_day" && (
        <Stepper steps={steps} currentStep={currentStep} />
      )}
      {selected === "one_month" && <MonthlyDevPanel testParams={testParams} />}
      {selected === "total" && <TotalDevPanel testParams={testParams} />}
      {selected === "fast_total" && (
        <FastTotalDevPanel testParams={testParams} />
      )}
      {selected === "reports" && <TestingReportPanel />}
    </div>
  );
}
