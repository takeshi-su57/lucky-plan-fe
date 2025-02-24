import { useState } from "react";
import { Button, DateRangePicker, Switch } from "@nextui-org/react";
import type { RangeValue } from "@react-types/shared";
import type { DateValue } from "@react-types/datepicker";
import { now } from "@internationalized/date";

import { getServerTimezone } from "@/utils";

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
    start: now(getServerTimezone()).subtract({ months: 3 }),
    end: now(getServerTimezone()),
  });
  const [showAllActivity, setShowAllActivity] = useState(false);

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
          maxValue={now(getServerTimezone())}
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

        <Switch
          isSelected={showAllActivity}
          onValueChange={setShowAllActivity}
          size="sm"
        >
          {showAllActivity ? "Show All Activities" : "Show Valid Activities"}
        </Switch>
      </div>

      <AutomationGridChart
        histories={isLeaderChart ? leaderHistories : followerHistories}
        title={`Total Result`}
        range={{
          from: range?.start?.toDate(getServerTimezone()) || new Date(),
          to: range?.end?.toDate(getServerTimezone()) || new Date(),
        }}
        mode={
          showAllActivity ? "show_all_activity" : "show_only_valid_activity"
        }
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
