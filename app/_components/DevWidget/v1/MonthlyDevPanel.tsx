import { useState } from "react";
import { PastDatePicker } from "./PastDatePicker";
import dayjs from "dayjs";
import { MonthlyHistoryChart } from "./MonthlyHistoryChart";
import { TestParams } from "./TestParams";

export function MonthlyDevPanel({ testParams }: { testParams: TestParams }) {
  const [firstDate, setFirstDate] = useState<Date>(new Date("2024-11-01"));
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <PastDatePicker
        pastDate={firstDate}
        setPastDate={(date) => {
          // Set to first day of the month
          const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
          setFirstDate(firstOfMonth);
        }}
        onNextStep={() => {
          setConfirmed(true);
        }}
      />

      {firstDate && confirmed ? (
        <MonthlyHistoryChart
          dateStr={dayjs(firstDate).format("YYYY-MM-DD")}
          testParams={testParams}
        />
      ) : null}
    </div>
  );
}
