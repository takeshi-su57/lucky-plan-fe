import { useState } from "react";
import { DateRangePicker } from "@nextui-org/react";
import type { RangeValue } from "@react-types/shared";
import type { DateValue } from "@react-types/datepicker";
import { now, parseDate } from "@internationalized/date";

import { getServerTimezone } from "@/utils";
import { AccPnl, BotCount } from "@/graphql/gql/graphql";
import { FastTotal } from "./FastTotal";

export type FastTotalNewPanelProps = {
  startDate: string;
  accPnls: AccPnl[];
  botCounts: BotCount[];
};

export function FastTotalNewPanel({
  startDate,
  accPnls,
  botCounts,
}: FastTotalNewPanelProps) {
  const [range, setRange] = useState<RangeValue<DateValue> | null>({
    start: parseDate(startDate),
    end: now(getServerTimezone()),
  });

  let rangeHelper = "";

  if (range === null) {
    rangeHelper = "Please select a valid date range";
  }

  return (
    <div className="flex flex-col gap-2">
      <DateRangePicker
        label="Pick a date range"
        visibleMonths={2}
        value={range}
        onChange={setRange}
        maxValue={now(getServerTimezone())}
        minValue={parseDate(startDate)}
        errorMessage={rangeHelper}
        className="w-fit"
      />

      {range && (
        <FastTotal
          startDate={range?.start?.toDate(getServerTimezone())}
          endDate={range?.end?.toDate(getServerTimezone())}
          accPnls={accPnls}
          botCounts={botCounts}
        />
      )}
    </div>
  );
}
