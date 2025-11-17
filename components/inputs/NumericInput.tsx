"use client";

import { ChangeEvent, ReactNode } from "react";
import { Input, InputSlots, SlotsToClasses } from "@heroui/react";

import { NumericFormat } from "react-number-format";

export type NumericInputProps = {
  amount: string;
  onChange(value: string): void;
  isDisabled?: boolean;
  classNames?: SlotsToClasses<InputSlots>;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  label?: string;
  errorMessage?: ReactNode;
  isInvalid?: boolean;
  labelPlacement?: "outside" | "outside-left" | "inside";
};

export function NumericInput({
  amount,
  onChange,
  isDisabled,
  classNames,
  min,
  max,
  step,
  label,
  labelPlacement,
  errorMessage,
  isInvalid,
}: NumericInputProps) {
  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(",", "");

    if (e.target.value === "" || /^([0-9]+(?:[.,][0-9]*)?)$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <NumericFormat
      variant="underlined"
      label={label}
      labelPlacement={labelPlacement}
      placeholder="0.00"
      autoComplete="off"
      value={amount || undefined}
      onChange={handleChangeAmount}
      min={min}
      max={max}
      step={step}
      classNames={classNames}
      isDisabled={isDisabled}
      customInput={Input}
      allowNegative={false}
      decimalScale={12}
      thousandSeparator
      errorMessage={errorMessage}
      isInvalid={isInvalid}
    />
  );
}
