"use client";

import { useEffect, useState } from "react";
import { Button, DatePicker } from "@nextui-org/react";
import { parseDate, today } from "@internationalized/date";
import dayjs from "dayjs";

import { getServerTimezone } from "@/utils";
import { NumericInput } from "@/components/inputs/NumericInput";

export type BacktestParameters = {
  futureDate: Date;
  collateralBaseline: number;
};

export type BacktestParametersProps = {
  parameters: BacktestParameters | null;
  setParameters: (parameters: BacktestParameters) => void;
  pastDate: Date;
  onNextStep: () => void;
  onPrevStep: () => void;
};

export function BacktestParametersForm({
  parameters,
  setParameters,
  pastDate,
  onNextStep,
  onPrevStep,
}: BacktestParametersProps) {
  const [collateralBaseline, setCollateralBaseline] = useState("100");
  const [futureDate, setFutureDate] = useState<Date>(
    parseDate(dayjs(pastDate).format("YYYY-MM-DD"))
      .add({ days: 2 })
      .toDate(getServerTimezone()),
  );

  useEffect(() => {
    setFutureDate(
      parseDate(dayjs(pastDate).format("YYYY-MM-DD"))
        .add({ days: 2 })
        .toDate(getServerTimezone()),
    );
  }, [pastDate]);

  useEffect(() => {
    if (parameters) {
      setCollateralBaseline(parameters.collateralBaseline.toString());
      setFutureDate(parameters.futureDate);
    } else {
      setCollateralBaseline("100");
    }
  }, [parameters]);

  let collateralBaselineHelper = "";

  const handleConfirm = () => {
    if (collateralBaseline.trim() === "") {
      return;
    }

    setParameters({
      futureDate: futureDate,
      collateralBaseline: +collateralBaseline,
    });

    onNextStep();
  };

  return (
    <div className="flex flex-col gap-2">
      <DatePicker
        className="max-w-[284px]"
        label="Pick a future of date"
        value={parseDate(dayjs(futureDate).format("YYYY-MM-DD"))}
        onChange={(date) => setFutureDate(date.toDate(getServerTimezone()))}
        minValue={parseDate(dayjs(pastDate).format("YYYY-MM-DD"))}
        maxValue={today(getServerTimezone()).subtract({ days: 15 })}
      />

      <NumericInput
        amount={collateralBaseline}
        onChange={setCollateralBaseline}
        label="Collateral Baseline"
        errorMessage={collateralBaselineHelper}
        isInvalid={collateralBaselineHelper.trim() !== ""}
      />

      <div className="flex flex-row items-center gap-2">
        <Button
          variant="solid"
          onClick={handleConfirm}
          color="primary"
          size="sm"
        >
          Continue
        </Button>

        <Button variant="light" onClick={onPrevStep} color="primary" size="sm">
          Back
        </Button>
      </div>
    </div>
  );
}
