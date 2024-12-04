"use client";

import { useState, ChangeEventHandler } from "react";

import { StandardModal } from "@/components/modals/StandardModal";
import {
  useAddNewStrategy,
  useGetAllStrategyMetadata,
} from "@/app-hooks/useStrategy";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { NumericInput } from "@/components/inputs/NumericInput";

import { lifeTimeItems } from "@/utils";

export type CreateStrategyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (value: boolean) => void;
};

export function CreateStrategyModal({
  isOpen,
  onClose,
  onOpenChange,
}: CreateStrategyModalProps) {
  const createStragey = useAddNewStrategy();

  const allStrategyMetadata = useGetAllStrategyMetadata();

  const [strategy, setStrategy] = useState<string>();
  const [ratio, setRatio] = useState("100");
  const [lifeTimeScale, setLifeTimeScale] = useState("1m");
  const [maxCollateral, setMaxCollateral] = useState("");
  const [minCollateral, setMinCollateral] = useState("");
  const [collateralBaseline, setCollateralBaseline] = useState("");
  const [maxLeverage, setMaxLeverage] = useState("");
  const [minLeverage, setMinLeverage] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [minCapacity, setMinCapacity] = useState("");

  const handleChangeStrategy: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      if (value === "equalCopy") {
        setRatio("100");
      }
      setStrategy(value);
    }
  };

  const handleChangeLifetime: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setLifeTimeScale(value);
    }
  };

  let strategyHelper = "";
  let ratioHelper = "";
  let maxCollateralHelper = "";
  let minCollateralHelper = "";
  let collateralBaselineHelper = "";
  let maxLeverageHelper = "";
  let minLeverageHelper = "";
  let maxCapacityHelper = "";
  let minCapacityHelper = "";

  if (!strategy) {
    strategyHelper = "Please select strategy";
  }

  if (Number.isNaN(+ratio)) {
    ratioHelper = "Invalid ratio";
  } else {
    if (+ratio <= 0) {
      ratioHelper = "Invalid ratio";
    }
  }

  if (Number.isNaN(+maxCapacity)) {
    maxCapacityHelper = "Invalid max capacity";
  } else {
    if (+maxCapacity > 1000000) {
      maxCapacityHelper = "Too big max capacity";
    }

    if (+maxCapacity < 50) {
      maxCapacityHelper = "Too small max capacity";
    }
  }

  if (Number.isNaN(+minCapacity)) {
    minCapacityHelper = "Invalid min capacity";
  } else {
    if (+minCapacity > +maxCapacity) {
      minCapacityHelper = "Too big min capacity";
    }

    if (+minCapacity < 50) {
      minCapacityHelper = "Too small min capacity";
    }
  }

  if (Number.isNaN(+maxCollateral)) {
    maxCollateralHelper = "Invalid max collateral";
  } else {
    if (+maxCollateral > +minCapacity) {
      maxCollateralHelper = "Too big max collateral";
    }

    if (+maxCollateral < 5) {
      maxCollateralHelper = "Too small max capacity";
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
      minLeverageHelper = "Too small min capacity";
    }
  }

  const isDisabled =
    strategyHelper.trim() !== "" ||
    ratioHelper.trim() !== "" ||
    maxCollateralHelper.trim() !== "" ||
    minCollateralHelper.trim() !== "" ||
    maxLeverageHelper.trim() !== "" ||
    minLeverageHelper.trim() !== "" ||
    maxCapacityHelper.trim() !== "" ||
    minCapacityHelper.trim() !== "";

  const handleConfirm = () => {
    if (
      !strategy ||
      ratio.trim() === "" ||
      lifeTimeScale.trim() === "" ||
      maxCollateral.trim() === "" ||
      minCollateral.trim() === "" ||
      collateralBaseline.trim() === "" ||
      maxLeverage.trim() === "" ||
      minLeverage.trim() === "" ||
      maxCapacity.trim() === "" ||
      minCapacity.trim() === ""
    ) {
      return;
    }

    const lifeTime = lifeTimeItems.find((item) => item.id === lifeTimeScale);

    if (!lifeTime) {
      return;
    }

    createStragey({
      variables: {
        input: {
          strategyKey: strategy,
          ratio: Math.floor(+ratio),
          lifeTime: lifeTime.value,
          maxCapacity: Math.floor(+maxCapacity),
          minCapacity: Math.floor(+minCapacity),
          maxCollateral: Math.floor(+maxCollateral),
          minCollateral: Math.floor(+minCollateral),
          collateralBaseline: Math.floor(+collateralBaseline),
          maxLeverage: Math.floor(+maxLeverage * 1000),
          minLeverage: Math.floor(+minLeverage * 1000),
          params: "{}",
        },
      },
    });
    onClose();
  };

  console.log(maxCapacity, maxCapacityHelper);
  console.log(minCapacity, minCapacityHelper);

  return (
    <StandardModal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <div className="flex flex-col gap-8">
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
          Create New Strategy
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex w-full items-center gap-4">
            <Select
              variant="underlined"
              label="Strategy"
              selectedKeys={strategy ? [strategy] : undefined}
              onChange={handleChangeStrategy}
              selectionMode="single"
              className="flex-1"
              errorMessage={strategyHelper}
              isInvalid={strategyHelper.trim() !== ""}
            >
              {allStrategyMetadata.map((metadata) => (
                <SelectItem key={metadata.key}>{metadata.title}</SelectItem>
              ))}
            </Select>

            <div className="flex-1">
              <NumericInput
                amount={ratio}
                onChange={setRatio}
                isDisabled={strategy !== "ratioCopy"}
                label="Ratio"
                errorMessage={ratioHelper}
                isInvalid={ratioHelper.trim() !== ""}
              />
            </div>

            <Select
              variant="underlined"
              label="Lifetime"
              selectedKeys={lifeTimeScale ? [lifeTimeScale] : undefined}
              onChange={handleChangeLifetime}
              selectionMode="single"
              className="flex-1"
              isDisabled={ratioHelper.trim() !== "" || strategy !== "ratioCopy"}
            >
              {lifeTimeItems.map((item) => (
                <SelectItem key={item.id}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <NumericInput
                amount={maxCapacity}
                onChange={setMaxCapacity}
                label="Max Capacity"
                isDisabled={
                  ratioHelper.trim() !== "" || strategy !== "ratioCopy"
                }
                errorMessage={maxCapacityHelper}
                isInvalid={maxCapacityHelper.trim() !== ""}
              />
            </div>
            <div className="flex-1">
              <NumericInput
                amount={minCapacity}
                onChange={setMinCapacity}
                label="Min Capacity"
                isDisabled={maxCapacityHelper.trim() !== ""}
                errorMessage={minCapacityHelper}
                isInvalid={minCapacityHelper.trim() !== ""}
              />
            </div>
          </div>

          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <NumericInput
                amount={maxCollateral}
                onChange={setMaxCollateral}
                label="Max Collateral"
                isDisabled={minCapacityHelper.trim() !== ""}
                errorMessage={maxCollateralHelper}
                isInvalid={maxCollateralHelper.trim() !== ""}
              />
            </div>
            <div className="flex-1">
              <NumericInput
                amount={minCollateral}
                onChange={setMinCollateral}
                label="Min Collateral"
                isDisabled={maxCollateralHelper.trim() !== ""}
                errorMessage={minCollateralHelper}
                isInvalid={minCollateralHelper.trim() !== ""}
              />
            </div>
            <div className="flex-1">
              <NumericInput
                amount={collateralBaseline}
                onChange={setCollateralBaseline}
                label="Collateral Baseline"
                isDisabled={minCollateralHelper.trim() !== ""}
                errorMessage={collateralBaselineHelper}
                isInvalid={collateralBaselineHelper.trim() !== ""}
              />
            </div>
          </div>

          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <NumericInput
                amount={maxLeverage}
                onChange={setMaxLeverage}
                label="Max Leverage"
                isDisabled={ratioHelper.trim() !== ""}
                errorMessage={maxLeverageHelper}
                isInvalid={maxLeverageHelper.trim() !== ""}
              />
            </div>
            <div className="flex-1">
              <NumericInput
                amount={minLeverage}
                onChange={setMinLeverage}
                label="Min Leverage"
                isDisabled={maxLeverageHelper.trim() !== ""}
                errorMessage={minLeverageHelper}
                isInvalid={minLeverageHelper.trim() !== ""}
              />
            </div>
          </div>
        </div>

        <Button onClick={handleConfirm} color="primary" isDisabled={isDisabled}>
          Save
        </Button>
      </div>
    </StandardModal>
  );
}
