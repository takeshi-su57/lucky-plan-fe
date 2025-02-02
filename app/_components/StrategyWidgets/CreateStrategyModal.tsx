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

  const isDisabled =
    strategyHelper.trim() !== "" ||
    (strategy === "ratioCopy" && ratioHelper.trim() !== "") ||
    maxCollateralHelper.trim() !== "" ||
    minCollateralHelper.trim() !== "" ||
    maxLeverageHelper.trim() !== "" ||
    minLeverageHelper.trim() !== "";

  const handleConfirm = () => {
    if (
      !strategy ||
      (strategy === "ratioCopty" && ratio.trim() === "") ||
      lifeTimeScale.trim() === "" ||
      maxCollateral.trim() === "" ||
      minCollateral.trim() === "" ||
      collateralBaseline.trim() === "" ||
      maxLeverage.trim() === "" ||
      minLeverage.trim() === ""
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
                errorMessage={strategy === "ratioCopy" && ratioHelper}
                isInvalid={
                  strategy === "ratioCopy" && ratioHelper.trim() !== ""
                }
              />
            </div>

            <Select
              variant="underlined"
              label="Lifetime"
              selectedKeys={lifeTimeScale ? [lifeTimeScale] : undefined}
              onChange={handleChangeLifetime}
              selectionMode="single"
              className="flex-1"
              isDisabled={strategy === "ratioCopy" && ratioHelper.trim() !== ""}
            >
              {lifeTimeItems.map((item) => (
                <SelectItem key={item.id}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <NumericInput
                amount={maxCollateral}
                onChange={setMaxCollateral}
                label="Max Collateral"
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
