"use client";

import { useState } from "react";
import { Divider, DateRangePicker } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import type { RangeValue } from "@react-types/shared";
import type { DateValue } from "@react-types/datepicker";

import { AutomationRow } from "./AutomationRow";
import { AutomationGridChart } from "./AutomationChart";
import { Virtuoso } from "react-virtuoso";
import { PersonalTradeHistory } from "@/types";
import { BotDetails } from "@/graphql/gql/graphql";

export type RealResultViewProps = {
  bots: BotDetails[];
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
  const [range, setRange] = useState<RangeValue<DateValue> | null>({
    start: now(getLocalTimeZone()).subtract({ months: 3 }),
    end: now(getLocalTimeZone()),
  });

  let rangeHelper = "";

  if (range === null) {
    rangeHelper = "Please select a valid date range";
  }

  const dateRange = range
    ? {
        from: range.start.toDate(getLocalTimeZone()),
        to: range.end.toDate(getLocalTimeZone()),
      }
    : undefined;

  return (
    <div className="flex flex-col gap-6">
      <DateRangePicker
        label="Plan Duration"
        visibleMonths={2}
        value={range}
        onChange={setRange}
        maxValue={now(getLocalTimeZone())}
        errorMessage={rangeHelper}
        className="w-fit"
      />

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
