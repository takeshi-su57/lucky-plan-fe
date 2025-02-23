"use client";

import { useState } from "react";
import { parseDate } from "@internationalized/date";
import { AccordionItem, Accordion, Tab, Tabs } from "@nextui-org/react";

import { getServerTimezone } from "@/utils";
import { Stepper } from "@/components/Stepper/Stepper";
import { PastDatePicker } from "./PastDatePicker";
import { SelectLeaders } from "./SelectLeaders";
import { ConfirmLeaders } from "./ConfirmLeaders";
import {
  BacktestParametersForm,
  BacktestParameters,
} from "./BacktestParamtersForm";
import { BacktestResult } from "./BacktestResult";
import { SaveStep } from "./SaveStep";
import { LeaderParams } from "./LeaderItem";

import { useGetBacktestHistories } from "@/app-hooks/useGetBacktestHistories";
import { useSnackbar } from "notistack";

type TabType = "new" | "saved";

export function BacktestPanel() {
  const [currentStep, setCurrentStep] = useState(1);

  const { enqueueSnackbar } = useSnackbar();

  const { data: savedBacktests, handleSave: handleSaveBacktest } =
    useGetBacktestHistories();

  const [selected, setSelected] = useState<TabType>("new");

  const [pastDate, setPastDate] = useState<Date>(
    parseDate("2024-12-01").toDate(getServerTimezone()),
  );
  const [parameters, setParameters] = useState<BacktestParameters | null>(null);
  const [leaders, setLeaders] = useState<LeaderParams[]>([]);

  const handleInitialize = () => {
    setCurrentStep(1);
    setPastDate(parseDate("2024-12-01").toDate(getServerTimezone()));
    setParameters(null);
    setLeaders([]);
  };

  const handleSave = () => {
    if (parameters) {
      handleSaveBacktest(pastDate, leaders, parameters);
      enqueueSnackbar("Backtest saved successfully", {
        variant: "success",
      });
    }
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
      label: "Fill Parameters",
      description: `Fill in the backtest parameters for the system. These parameters will be used to backtest the system.`,
      content: (
        <BacktestParametersForm
          parameters={parameters}
          setParameters={setParameters}
          pastDate={pastDate}
          onNextStep={() => setCurrentStep(3)}
          onPrevStep={() => setCurrentStep(1)}
        />
      ),
    },
    {
      step: 3,
      label: "Select Leaders",
      description:
        "Select the leaders that will be used to backtest the system.",
      content: parameters ? (
        <SelectLeaders
          leaders={leaders}
          onChangeLeaders={setLeaders}
          endDate={pastDate}
          hideTags={true}
          onNextStep={() => setCurrentStep(4)}
          onPrevStep={() => setCurrentStep(2)}
        />
      ) : null,
    },
    {
      step: 4,
      label: "Confirm Leaders",
      description:
        "Confirm the leaders that will be used to backtest the system.",
      content: parameters ? (
        <ConfirmLeaders
          leaders={leaders}
          onChangeLeaders={setLeaders}
          endDate={pastDate}
          parameters={parameters}
          onNextStep={() => setCurrentStep(5)}
          onPrevStep={() => setCurrentStep(3)}
        />
      ) : null,
    },
    {
      step: 5,
      label: "Run",
      description: `Run the backtest to see the results of the system.`,
      content: parameters ? (
        <BacktestResult
          startDate={pastDate}
          leaders={leaders}
          parameters={parameters}
          onNextStep={() => setCurrentStep(6)}
          onPrevStep={() => setCurrentStep(4)}
        />
      ) : null,
    },
    {
      step: 6,
      label: "Save",
      description: `Save the backtest to your account.`,
      content: (
        <SaveStep
          loading={false}
          onPrevStep={() => setCurrentStep(5)}
          onReset={handleInitialize}
          onSave={handleSave}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Tabs
        aria-label="backtest-tabs"
        selectedKey={selected}
        onSelectionChange={(value) => {
          if (value) {
            setSelected(value as TabType);
          }
        }}
      >
        <Tab key="new" title="New" />
        <Tab key="saved" title="Saved" />
      </Tabs>

      {selected === "new" ? (
        <Stepper steps={steps} currentStep={currentStep} />
      ) : null}

      {selected === "saved" ? (
        <Accordion isCompact variant="splitted">
          {savedBacktests.map((backtest, index) => (
            <AccordionItem key={index} title={`Backtest ${index}`}>
              <BacktestResult
                startDate={backtest.pastDate}
                leaders={backtest.leaders}
                parameters={backtest.parameters}
                onNextStep={() => {}}
                onPrevStep={() => {}}
              />
            </AccordionItem>
          ))}
        </Accordion>
      ) : null}
    </div>
  );
}
