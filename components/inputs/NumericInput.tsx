"use client";

import { ChangeEvent } from "react";
import { Input, InputSlots, SlotsToClasses } from "@nextui-org/react";

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
}: NumericInputProps) {
  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value === "" ||
      /^([0-9]+(?:[.,][0-9]*)?)$/.test(e.target.value)
    ) {
      onChange(e.target.value.replaceAll(",", ""));
    }
  };

  return (
    <NumericFormat
      variant="underlined"
      label={label}
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
    />
  );
}
