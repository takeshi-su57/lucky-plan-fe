"use client";

import { useState, ChangeEventHandler } from "react";

import { StandardModal } from "@/components/modals/StandardModal";
import {
  useAddNewStrategy,
  useGetAllStrategyMetadata,
} from "@/app-hooks/useStrategy";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { NumericInput } from "@/components/inputs/NumericInput";

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
  const [lifeTime, setLifeTime] = useState("31536000000");
  const [maxCollateral, setMaxCollateral] = useState("1000000");
  const [minCollateral, setMinCollateral] = useState("5");
  const [maxLeverage, setMaxLeverage] = useState("200");
  const [minLeverage, setMinLeverage] = useState("1.1");
  const [maxGas, setMaxGas] = useState("100000000000000000");
  const [minGas, setMinGas] = useState("1000000000000000");

  console.log(ratio);

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

  const isDisabled =
    !strategy ||
    ratio.trim() === "" ||
    lifeTime.trim() === "" ||
    maxCollateral.trim() === "" ||
    minCollateral.trim() === "" ||
    maxLeverage.trim() === "" ||
    minLeverage.trim() === "" ||
    maxGas.trim() === "" ||
    minGas.trim() === "";

  const handleConfirm = () => {
    if (
      !strategy ||
      ratio.trim() === "" ||
      lifeTime.trim() === "" ||
      maxCollateral.trim() === "" ||
      minCollateral.trim() === "" ||
      maxLeverage.trim() === "" ||
      minLeverage.trim() === "" ||
      maxGas.trim() === "" ||
      minGas.trim() === ""
    ) {
      return;
    }

    createStragey({
      variables: {
        input: {
          strategyKey: strategy,
          ratio: +ratio,
          lifeTime: lifeTime,
          maxCollateral: `${Math.floor(+maxCollateral * 1000000)}`,
          minCollateral: `${Math.floor(+minCollateral * 1000000)}`,
          maxLeverage: Math.floor(+maxLeverage * 1000),
          minLeverage: Math.floor(+minLeverage * 1000),
          maxGas,
          minGas,
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
          <Select
            variant="underlined"
            label="Strategy"
            selectedKeys={strategy ? [strategy] : undefined}
            onChange={handleChangeStrategy}
            selectionMode="single"
            className="w-1/4"
          >
            {allStrategyMetadata.map((metadata) => (
              <SelectItem key={metadata.key}>{metadata.title}</SelectItem>
            ))}
          </Select>

          <div className="w-1/4">
            <NumericInput
              min="0.1"
              step={0.01}
              amount={ratio}
              onChange={setRatio}
              isDisabled={strategy === "equalCopy"}
              label="Ratio"
            />
          </div>

          <div className="w-1/4">
            <NumericInput
              min="60000"
              step={1}
              amount={lifeTime}
              onChange={setLifeTime}
              label="Lifetime"
            />
          </div>
          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <NumericInput
                min={minCollateral}
                max="1000000"
                step={0.1}
                amount={maxCollateral}
                onChange={setMaxCollateral}
                label="Max Collateral"
              />
            </div>
            <div className="flex-1">
              <NumericInput
                min="5"
                max={maxCollateral}
                step={0.1}
                amount={minCollateral}
                onChange={setMinCollateral}
                label="Min Collateral"
              />
            </div>
          </div>

          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <NumericInput
                min={minLeverage}
                max="200"
                step={0.001}
                amount={maxLeverage}
                onChange={setMaxLeverage}
                label="Max Leverage"
              />
            </div>
            <div className="flex-1">
              <NumericInput
                min="5"
                max={maxLeverage}
                step={0.001}
                amount={minLeverage}
                onChange={setMinLeverage}
                label="Min Leverage"
              />
            </div>
          </div>

          <div className="w-full">
            <NumericInput
              min="1000000000000000"
              max={maxGas}
              step={1}
              amount={maxGas}
              onChange={setMaxGas}
              label="Max Gas"
            />
          </div>
          <div className="w-full">
            <NumericInput
              min={minGas}
              max="100000000000000000"
              step={0.001}
              amount={minGas}
              onChange={setMinGas}
              label="Min Gas"
            />
          </div>
        </div>

        <Button onClick={handleConfirm} color="primary" isDisabled={isDisabled}>
          Save
        </Button>
      </div>
    </StandardModal>
  );
}
