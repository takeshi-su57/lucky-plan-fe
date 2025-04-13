"use client";

import { useEffect, useState } from "react";
import { Button, DatePicker, useDisclosure } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import dayjs from "dayjs";
import { getServerTimezone } from "@/utils";

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

export function TestParamsV5View({
  ratio,
  date,
  onChangeParams,
}: {
  ratio: number;
  date: Date;
  onChangeParams: (ratio: number, pastDate: Date) => void;
}) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const [ratioAmount, setRatioAmount] = useState<string>(ratio.toString());
  const [pastDate, setPastDate] = useState<Date>(
    parseDate("2024-11-01").toDate(getServerTimezone()),
  );

  useEffect(() => {
    setRatioAmount(ratio.toString());
    setPastDate(date);
  }, [ratio, date]);

  const handleConfirm = () => {
    if (ratioAmount === "") {
      return;
    }

    if (Number.isNaN(+ratioAmount)) {
      return;
    }

    onChangeParams(+ratioAmount, pastDate);

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
            amount={ratioAmount}
            onChange={setRatioAmount}
            label="Ratio"
          />

          <DatePicker
            className="max-w-[284px]"
            label="Pick a past date"
            value={parseDate(dayjs(pastDate).format("YYYY-MM-DD"))}
            onChange={(date) => setPastDate(date.toDate(getServerTimezone()))}
            minValue={parseDate("2024-11-01")}
            maxValue={parseDate(dayjs().format("YYYY-MM-DD"))}
          />
        </div>
        <Button onClick={handleConfirm}>Confirm</Button>
      </StandardModal>
    </>
  );
}
