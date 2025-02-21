import { useState } from "react";
import { Button, DateRangePicker, Switch } from "@nextui-org/react";
import type { RangeValue } from "@react-types/shared";
import type { DateValue } from "@react-types/datepicker";
import { now, getLocalTimeZone } from "@internationalized/date";

import { PersonalTradeHistory } from "@/types";

import { AutomationGridChart } from "./AutomationChart";

export type PlanCreationOverviewProps = {
  leaderHistories: PersonalTradeHistory[];
  followerHistories: PersonalTradeHistory[];
  onNextStep: () => void;
  onPrevStep: () => void;
};

export function PlanCreationOverview({
  leaderHistories,
  followerHistories,
  onNextStep,
  onPrevStep,
}: PlanCreationOverviewProps) {
  const [isLeaderChart, setIsLeaderChart] = useState(true);
  const [range, setRange] = useState<RangeValue<DateValue> | null>({
    start: now(getLocalTimeZone()).subtract({ months: 3 }),
    end: now(getLocalTimeZone()),
  });

  let rangeHelper = "";

  if (range === null) {
    rangeHelper = "Please select a valid date range";
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <DateRangePicker
          label="Back Test Duration"
          visibleMonths={2}
          value={range}
          onChange={setRange}
          maxValue={now(getLocalTimeZone())}
          errorMessage={rangeHelper}
          className="w-fit"
        />

        <Switch
          isSelected={isLeaderChart}
          onValueChange={setIsLeaderChart}
          size="sm"
        >
          {isLeaderChart ? "Leader Chart" : "Follower Chart"}
        </Switch>
      </div>

      <AutomationGridChart
        histories={isLeaderChart ? leaderHistories : followerHistories}
        title={`Total Result`}
        range={{
          from: range?.start?.toDate(getLocalTimeZone()) || new Date(),
          to: range?.end?.toDate(getLocalTimeZone()) || new Date(),
        }}
      />

      <div className="flex flex-row items-center gap-2">
        <Button variant="solid" onClick={onNextStep} color="primary" size="sm">
          Continue
        </Button>

        <Button variant="light" onClick={onPrevStep} color="primary" size="sm">
          Back
        </Button>
      </div>
    </div>
  );
}
