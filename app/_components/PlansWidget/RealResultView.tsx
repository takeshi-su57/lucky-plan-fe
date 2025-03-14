"use client";

import { useState } from "react";
import { Divider, DateRangePicker, Switch } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { now } from "@internationalized/date";
import type { RangeValue } from "@react-types/shared";
import type { DateValue } from "@react-types/datepicker";
import { Virtuoso } from "react-virtuoso";
import { BotForwardDetails } from "@/graphql/gql/graphql";

import { getServerTimezone } from "@/utils";

import { AutomationRow } from "./AutomationRow";
import { AutomationGridChart } from "./AutomationChart";
import { PersonalTradeHistory } from "@/types";

export type RealResultViewProps = {
  bots: BotForwardDetails[];
  selectedBotIds: Record<number, boolean>;
  showBotChartIds: Record<number, boolean>;
  botsHistories: Record<string, PersonalTradeHistory[]>;
  onChangeBotSelection: (botId: number, isSelected: boolean) => void;
  onToggleChart: (botId: number) => void;
};

export function RealResultView({
  bots,
  selectedBotIds,
  showBotChartIds,
  botsHistories,
  onChangeBotSelection,
  onToggleChart,
}: RealResultViewProps) {
  const [showAllActivity, setShowAllActivity] = useState(false);

  const [range, setRange] = useState<RangeValue<DateValue> | null>({
    start: now(getServerTimezone()).subtract({ months: 3 }),
    end: now(getServerTimezone()),
  });

  let rangeHelper = "";

  if (range === null) {
    rangeHelper = "Please select a valid date range";
  }

  const dateRange = range
    ? {
        from: range.start.toDate(getServerTimezone()),
        to: range.end.toDate(getServerTimezone()),
      }
    : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <DateRangePicker
          label="Plan Duration"
          visibleMonths={2}
          value={range}
          onChange={setRange}
          maxValue={now(getServerTimezone())}
          errorMessage={rangeHelper}
          className="w-fit"
        />

        <Switch
          isSelected={showAllActivity}
          onValueChange={setShowAllActivity}
          size="sm"
        >
          {showAllActivity ? "Show All Activities" : "Show Valid Activities"}
        </Switch>
      </div>

      <Card>
        <CardBody>
          <AutomationGridChart
            histories={[
              ...Object.keys(selectedBotIds).filter(
                (botId) => selectedBotIds[Number(botId)],
              ),
            ]
              .map((botId) => botsHistories[botId] || [])
              .reduce((acc, item) => [...acc, ...item], [])}
            title={`Grouped Result`}
            range={dateRange}
            mode={
              showAllActivity ? "show_all_activity" : "show_only_valid_activity"
            }
          />
        </CardBody>
      </Card>

      <div className="flex w-full gap-4">
        <div className="flex w-[370px] shrink-0 flex-col gap-4">
          <Card>
            <CardBody className="flex flex-col gap-4">
              <span className="text-base font-bold text-neutral-400">Live</span>

              <Divider />

              <Virtuoso
                style={{ height: 673 }}
                data={bots}
                itemContent={(_, bot) => (
                  <div className="p-2">
                    <AutomationRow
                      bot={bot}
                      isSelected={!!selectedBotIds[bot.id]}
                      isShowChart={!!showBotChartIds[bot.id]}
                      onChangeSelection={onChangeBotSelection}
                      onToggleChart={onToggleChart}
                    />
                  </div>
                )}
              />
            </CardBody>
          </Card>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <Card>
            <CardBody>
              <span className="text-xl font-bold text-neutral-400">
                Live Automation Charts
              </span>

              <Divider />

              <Virtuoso
                style={{ height: 700 }}
                data={Object.keys(selectedBotIds).filter(
                  (botId) => selectedBotIds[Number(botId)],
                )}
                itemContent={(_, botId) => (
                  <AutomationGridChart
                    mode={
                      showAllActivity
                        ? "show_all_activity"
                        : "show_only_valid_activity"
                    }
                    histories={botsHistories[botId] || []}
                    title={`Automation ${botId}`}
                    range={dateRange}
                  />
                )}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
