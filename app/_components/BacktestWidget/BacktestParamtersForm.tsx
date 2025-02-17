"use client";

import { useEffect, useState } from "react";
import { Button, DatePicker } from "@nextui-org/react";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import dayjs from "dayjs";

import { NumericInput } from "@/components/inputs/NumericInput";

export type BacktestParameters = {
  futureDate: Date;
  maxCollateral: number;
  minCollateral: number;
  collateralBaseline: number;
  maxLeverage: number;
  minLeverage: number;
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
  const [maxCollateral, setMaxCollateral] = useState("200");
  const [minCollateral, setMinCollateral] = useState("5");
  const [collateralBaseline, setCollateralBaseline] = useState("100");
  const [maxLeverage, setMaxLeverage] = useState("200");
  const [minLeverage, setMinLeverage] = useState("1.1");
  const [futureDate, setFutureDate] = useState<Date>(
    parseDate(dayjs(pastDate).format("YYYY-MM-DD"))
      .add({ days: 15 })
      .toDate(getLocalTimeZone()),
  );

  useEffect(() => {
    setFutureDate(
      parseDate(dayjs(pastDate).format("YYYY-MM-DD"))
        .add({ days: 15 })
        .toDate(getLocalTimeZone()),
    );
  }, [pastDate]);

  useEffect(() => {
    if (parameters) {
      setCollateralBaseline(parameters.collateralBaseline.toString());
      setMaxCollateral(parameters.maxCollateral.toString());
      setMinCollateral(parameters.minCollateral.toString());
      setMaxLeverage(parameters.maxLeverage.toString());
      setMinLeverage(parameters.minLeverage.toString());
    } else {
      setCollateralBaseline("100");
      setMaxCollateral("200");
      setMinCollateral("5");
      setMaxLeverage("200");
      setMinLeverage("1.1");
    }
  }, [parameters]);

  let maxCollateralHelper = "";
  let minCollateralHelper = "";
  let collateralBaselineHelper = "";
  let maxLeverageHelper = "";
  let minLeverageHelper = "";

  if (Number.isNaN(+maxCollateral)) {
    maxCollateralHelper = "Invalid max collateral";
  } else {
    if (+maxCollateral < 5) {
      maxCollateralHelper = "Too small max collateral";
    }
  }

  if (Number.isNaN(+minCollateral)) {
    minCollateralHelper = "Invalid min collateral";
  } else {
    if (+minCollateral > +maxCollateral) {
      minCollateralHelper = "Too big min collateral";
    }

    if (+minCollateral < 5) {
      minCollateralHelper = "Too small min collateral";
    }
  }

  if (Number.isNaN(+collateralBaseline)) {
    collateralBaselineHelper = "Invalid collateral baseline";
  } else {
    if (+collateralBaseline > +maxCollateral) {
      collateralBaselineHelper = "Too big collateral baseline";
    }

    if (+collateralBaseline < +minCollateral) {
      collateralBaselineHelper = "Too small collateral baseline";
    }
  }

  if (Number.isNaN(+maxLeverage)) {
    maxLeverageHelper = "Invalid max leverage";
  } else {
    if (+maxLeverage > 200) {
      maxLeverageHelper = "Too big max leverage";
    }

    if (+maxLeverage < 1.1) {
      maxLeverageHelper = "Too small max leverage";
    }
  }

  if (Number.isNaN(+minLeverage)) {
    minLeverageHelper = "Invalid min leverage";
  } else {
    if (+minLeverage > +maxLeverage) {
      minLeverageHelper = "Too big min leverage";
    }

    if (+minLeverage < 1.1) {
      minLeverageHelper = "Too small min leverage";
    }
  }

  const handleConfirm = () => {
    if (
      maxCollateral.trim() === "" ||
      minCollateral.trim() === "" ||
      collateralBaseline.trim() === "" ||
      maxLeverage.trim() === "" ||
      minLeverage.trim() === ""
    ) {
      return;
    }

    setParameters({
      futureDate: futureDate,
      maxCollateral: +maxCollateral,
      minCollateral: +minCollateral,
      collateralBaseline: +collateralBaseline,
      maxLeverage: +maxLeverage,
      minLeverage: +minLeverage,
    });

    onNextStep();
  };

  const isDisabledStrategy =
    maxCollateralHelper.trim() !== "" ||
    minCollateralHelper.trim() !== "" ||
    maxLeverageHelper.trim() !== "" ||
    minLeverageHelper.trim() !== "";

  return (
    <div className="flex flex-col gap-2">
      <DatePicker
        className="max-w-[284px]"
        label="Pick a future of date"
        value={parseDate(dayjs(futureDate).format("YYYY-MM-DD"))}
        onChange={(date) => setFutureDate(date.toDate(getLocalTimeZone()))}
        minValue={parseDate(dayjs(pastDate).format("YYYY-MM-DD"))}
        maxValue={today(getLocalTimeZone()).subtract({ days: 15 })}
      />

      <NumericInput
        amount={maxCollateral}
        onChange={setMaxCollateral}
        label="Max Collateral"
        errorMessage={maxCollateralHelper}
        isInvalid={maxCollateralHelper.trim() !== ""}
      />

      <NumericInput
        amount={minCollateral}
        onChange={setMinCollateral}
        label="Min Collateral"
        isDisabled={maxCollateralHelper.trim() !== ""}
        errorMessage={minCollateralHelper}
        isInvalid={minCollateralHelper.trim() !== ""}
      />

      <NumericInput
        amount={collateralBaseline}
        onChange={setCollateralBaseline}
        label="Collateral Baseline"
        isDisabled={minCollateralHelper.trim() !== ""}
        errorMessage={collateralBaselineHelper}
        isInvalid={collateralBaselineHelper.trim() !== ""}
      />

      <NumericInput
        amount={maxLeverage}
        onChange={setMaxLeverage}
        label="Max Leverage"
        errorMessage={maxLeverageHelper}
        isInvalid={maxLeverageHelper.trim() !== ""}
      />

      <NumericInput
        amount={minLeverage}
        onChange={setMinLeverage}
        label="Min Leverage"
        isDisabled={maxLeverageHelper.trim() !== ""}
        errorMessage={minLeverageHelper}
        isInvalid={minLeverageHelper.trim() !== ""}
      />

      <div className="flex flex-row items-center gap-2">
        <Button
          isDisabled={isDisabledStrategy}
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
