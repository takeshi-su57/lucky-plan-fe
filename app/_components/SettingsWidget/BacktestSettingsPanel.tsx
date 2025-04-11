"use client";

import { Button, Card, CardBody, DatePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import dayjs from "dayjs";
import { useState } from "react";

import { getServerTimezone } from "@/utils";
import { useAutoTesting } from "@/app/_hooks/useHistory";

export function BacktestSettingsPanel() {
  const { autoTesting, loading } = useAutoTesting();

  const [pastDate, setPastDate] = useState<Date>(
    parseDate("2024-11-01").toDate(getServerTimezone()),
  );

  const handleAutoBacktest = () => {
    autoTesting({
      variables: { startDate: dayjs(pastDate).format("YYYY-MM-DD") },
    });
  };

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-6 p-4">
          <div className="flex flex-row items-center gap-4">
            <DatePicker
              className="max-w-[284px]"
              label="Pick a past date"
              value={parseDate(dayjs(pastDate).format("YYYY-MM-DD"))}
              onChange={(date) => setPastDate(date.toDate(getServerTimezone()))}
              minValue={parseDate("2024-11-01")}
              maxValue={parseDate(dayjs().format("YYYY-MM-DD"))}
            />

            <Button
              isLoading={loading}
              isDisabled={loading}
              onClick={handleAutoBacktest}
            >
              Auto Backtest
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
