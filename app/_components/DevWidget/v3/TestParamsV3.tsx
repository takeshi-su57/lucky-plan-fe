"use client";

import { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";

import { StandardModal } from "@/components/modals/StandardModal";
import { NumericInput } from "@/components/inputs/NumericInput";

export type TestParamsV3 = {
  minR2: number;
  minSize: number;
  maxSize: number;
  minCount: number;
  maxCount: number;
};

export const initialTestParams: TestParamsV3 = {
  minR2: 0.9,
  minSize: 0,
  maxSize: 1000000,
  minCount: 0,
  maxCount: 1000000,
};

export function TestParamsV3View({
  params,
  onChangeParams,
}: {
  params: TestParamsV3;
  onChangeParams: (params: TestParamsV3) => void;
}) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const [minR2, setMinR2] = useState<string>(params.minR2.toString());
  const [minSize, setMinSize] = useState<string>(params.minSize.toString());
  const [maxSize, setMaxSize] = useState<string>(params.maxSize.toString());
  const [minCount, setMinCount] = useState<string>(params.minCount.toString());
  const [maxCount, setMaxCount] = useState<string>(params.maxCount.toString());

  useEffect(() => {
    setMinR2(params.minR2.toString());
    setMinSize(params.minSize.toString());
    setMaxSize(params.maxSize.toString());
    setMinCount(params.minCount.toString());
    setMaxCount(params.maxCount.toString());
  }, [params]);

  const handleConfirm = () => {
    onChangeParams({
      minR2: +minR2,
      minSize: +minSize,
      maxSize: +maxSize,
      minCount: +minCount,
      maxCount: +maxCount,
    });

    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Set Test Params</Button>
      <StandardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-4">
          <NumericInput
            min={0}
            amount={minR2}
            onChange={setMinR2}
            label="Min R2"
          />
          <NumericInput
            min={minSize}
            amount={maxSize}
            onChange={setMaxSize}
            label="Max Size"
          />
          <NumericInput
            max={maxSize}
            amount={minSize}
            onChange={setMinSize}
            label="Min Size"
          />
          <NumericInput
            min={minCount}
            amount={maxCount}
            onChange={setMaxCount}
            label="Max Count"
          />
          <NumericInput
            max={maxCount}
            amount={minCount}
            onChange={setMinCount}
            label="Min Count"
          />
        </div>
        <Button onClick={handleConfirm}>Confirm</Button>
      </StandardModal>
    </>
  );
}
