"use client";

import { useState } from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

import { Stepper } from "@/components/Stepper/Stepper";
import { PastDatePicker } from "./PastDatePicker";
import { SelectLeaders } from "./SelectLeaders";
import {
  BacktestParametersForm,
  BacktestParameters,
} from "./BacktestParamtersForm";
import { BacktestResult } from "./BacktestResult";
import { BacktestSave } from "./BacktestSave";

export function BacktestPanel() {
  const [currentStep, setCurrentStep] = useState(1);

  const [pastDate, setPastDate] = useState<Date>(
    parseDate("2024-12-01").toDate(getLocalTimeZone()),
  );
  const [parameters, setParameters] = useState<BacktestParameters | null>(null);

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
          onNextStep={() => setCurrentStep(3)}
          onPrevStep={() => setCurrentStep(1)}
        />
      ),
    },
    {
      step: 3,
      label: "Fill Parameters",
      description: `Fill in the backtest parameters for the system. These parameters will be used to backtest the system.`,
      content: (
        <BacktestParametersForm
          parameters={parameters}
          setParameters={setParameters}
          pastDate={pastDate}
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
          onNextStep={() => setCurrentStep(5)}
          onPrevStep={() => setCurrentStep(3)}
        />
      ),
    },
    {
      step: 5,
      label: "Save",
      description: `Save the backtest to your account.`,
      content: <BacktestSave onPrevStep={() => setCurrentStep(4)} />,
    },
  ];

  return <Stepper steps={steps} currentStep={currentStep} />;
}
