import { DatePicker, Button } from "@nextui-org/react";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import dayjs from "dayjs";

export type PastDatePickerProps = {
  pastDate: Date;
  setPastDate: (date: Date) => void;
  onNextStep: () => void;
};

export function PastDatePicker({
  pastDate,
  setPastDate,
  onNextStep,
}: PastDatePickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <DatePicker
        className="max-w-[284px]"
        label="Pick a past date"
        value={parseDate(dayjs(pastDate).format("YYYY-MM-DD"))}
        onChange={(date) => setPastDate(date.toDate(getLocalTimeZone()))}
        minValue={parseDate("2024-12-01")}
        maxValue={today(getLocalTimeZone()).subtract({ days: 15 })}
      />

      <div className="flex flex-row items-center gap-2">
        <Button variant="solid" onClick={onNextStep} color="primary" size="sm">
          Continue
        </Button>
      </div>
    </div>
  );
}
