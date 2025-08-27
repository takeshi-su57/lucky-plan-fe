import { useEffect, useState } from "react";
import {
  AccordionItem,
  Accordion,
  Button,
  CardBody,
  Card,
  Tab,
  Tabs,
  Switch,
  DatePicker,
} from "@nextui-org/react";
import { Address } from "viem";
import { parseDate } from "@internationalized/date";
import dayjs from "dayjs";

import { PersonalTradeHistory } from "@/types";

import { AutomationGridChart } from "../PlansWidget/AutomationChart";
import { FutureChart } from "./FutureChart";
import { LeaderItem, LeaderParams } from "./LeaderItem";
import { getServerTimezone } from "@/utils";

type TabType = "overview" | "details";

export type MergedLeaderboardProps = {
  endDate: Date;
  leaders: LeaderParams[];
  onNextStep?: () => void;
  onPrevStep?: () => void;
};

export function MergedLeaderboard({
  endDate,
  leaders,
  onNextStep,
  onPrevStep,
}: MergedLeaderboardProps) {
  const [selected, setSelected] = useState<TabType>("overview");
  const [showAllActivity, setShowAllActivity] = useState(false);

  const [startDate, setStartDate] = useState<Date>(
    dayjs(endDate).subtract(15, "days").toDate(),
  );

  const [totalLeaderHistories, setTotalLeaderHistories] = useState<
    PersonalTradeHistory[]
  >([]);

  useEffect(() => {
    const histories = leaders.map((leader) => leader.histories);
    setTotalLeaderHistories(histories.flat());
  }, [leaders]);

  return (
    <div className="flex flex-col gap-2">
      <Tabs
        aria-label="automations-tabs"
        selectedKey={selected}
        onSelectionChange={(value) => {
          if (value) {
            setSelected(value as TabType);
          }
        }}
      >
        <Tab key="overview" title="Overview" />
        <Tab key="details" title="Details" />
      </Tabs>

      <DatePicker
        className="max-w-[284px]"
        label="Pick a past date"
        value={parseDate(dayjs(startDate).format("YYYY-MM-DD"))}
        onChange={(date) => setStartDate(date.toDate(getServerTimezone()))}
        maxValue={parseDate(
          dayjs(endDate).subtract(1, "day").format("YYYY-MM-DD"),
        )}
      />

      {selected === "overview" ? (
        <>
          <div className="flex items-center gap-2">
            <Switch
              isSelected={showAllActivity}
              onValueChange={setShowAllActivity}
              size="sm"
            >
              {showAllActivity
                ? "Show All Activities"
                : "Show Valid Activities"}
            </Switch>
          </div>
          <AutomationGridChart
            mode={
              showAllActivity ? "show_all_activity" : "show_only_valid_activity"
            }
            histories={totalLeaderHistories}
            title={`Total Result`}
            range={{ from: startDate, to: endDate }}
          />
        </>
      ) : null}

      {selected === "details" ? (
        <Card>
          <CardBody>
            <div className="flex h-[700px] w-full flex-col gap-2 overflow-y-auto">
              <Accordion isCompact variant="splitted">
                {leaders.map((leader) => (
                  <AccordionItem
                    key={leader.virtualId}
                    title={
                      <LeaderItem params={{ ...leader, isConfirmed: true }} />
                    }
                  >
                    <FutureChart
                      startDate={startDate}
                      endDate={endDate}
                      address={leader.address as Address}
                      leaderHistories={leader.histories}
                    />
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CardBody>
        </Card>
      ) : null}

      <div className="flex flex-row items-center gap-2">
        {onNextStep ? (
          <Button
            variant="solid"
            onClick={onNextStep}
            color="primary"
            size="sm"
          >
            Continue
          </Button>
        ) : null}

        {onPrevStep ? (
          <Button
            variant="light"
            onClick={onPrevStep}
            color="primary"
            size="sm"
          >
            Back
          </Button>
        ) : null}
      </div>
    </div>
  );
}
