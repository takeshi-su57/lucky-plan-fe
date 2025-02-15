"use client";

import { useState } from "react";
import { Button, Divider, DateRangePicker } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import type { RangeValue } from "@react-types/shared";
import type { DateValue } from "@react-types/datepicker";

import { AutomationRow } from "./AutomationRow";
import { AutomationGridChart } from "./AutomationChart";
import { Virtuoso } from "react-virtuoso";
import { VirtualAutomationRow } from "./VirtualAutomationRow";
import { PersonalTradeHistory, VirtualBot } from "@/types";
import { BotDetails } from "@/graphql/gql/graphql";

export type BackTestingViewProps = {
  isSavingVirtualBots: boolean;
  isDisabledSaveVirtualBots: boolean;
  bots: BotDetails[];
  selectedBotIds: Record<number, boolean>;
  showBotChartIds: Record<number, boolean>;
  virtualBots: VirtualBot[];
  selectedVirtualBotIds: Record<string, boolean>;
  botsHistories: Record<string, PersonalTradeHistory[]>;
  onClickSaveVirtualBots: () => void;
  onOpenCreateVirtualBotModal: () => void;
  onChangeVirtualBotSelection: (
    virtualBot: VirtualBot,
    isSelected: boolean,
  ) => void;
  onEditVirtualBot: (virtualBot: VirtualBot) => void;
  onChangeBotSelection: (botId: number, isSelected: boolean) => void;
  onToggleChart: (botId: number) => void;
};

export function BackTestingView({
  isSavingVirtualBots,
  isDisabledSaveVirtualBots,
  bots,
  selectedBotIds,
  showBotChartIds,
  virtualBots,
  selectedVirtualBotIds,
  botsHistories,
  onClickSaveVirtualBots,
  onOpenCreateVirtualBotModal,
  onChangeVirtualBotSelection,
  onEditVirtualBot,
  onChangeBotSelection,
  onToggleChart,
}: BackTestingViewProps) {
  const [range, setRange] = useState<RangeValue<DateValue> | null>({
    start: now(getLocalTimeZone()).subtract({ months: 3 }),
    end: now(getLocalTimeZone()),
  });

  let rangeHelper = "";

  if (range === null) {
    rangeHelper = "Please select a valid date range";
  }

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
              ...Object.keys(selectedVirtualBotIds).filter(
                (virtualId) => selectedVirtualBotIds[virtualId],
              ),
            ]
              .map((botId) => botsHistories[botId] || [])
              .reduce((acc, item) => [...acc, ...item], [])}
            title={`Grouped Result`}
            range={
              range
                ? {
                    from: range.start.toDate(getLocalTimeZone()),
                    to: range.end.toDate(getLocalTimeZone()),
                  }
                : undefined
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
                    histories={botsHistories[botId] || []}
                    title={`Automation ${botId}`}
                    range={
                      range
                        ? {
                            from: range.start.toDate(getLocalTimeZone()),
                            to: range.end.toDate(getLocalTimeZone()),
                          }
                        : undefined
                    }
                  />
                )}
              />
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="flex w-full gap-4">
        <div className="flex w-[370px] shrink-0 flex-col gap-4">
          <Card>
            <CardBody className="flex flex-col gap-4">
              <span className="text-base font-bold text-neutral-400">
                Virtual
              </span>

              <Divider />

              <div className="flex flex-row items-center justify-end gap-2">
                <Button
                  size="sm"
                  color="primary"
                  onClick={onOpenCreateVirtualBotModal}
                >
                  Create Virtual Automation
                </Button>

                <Button
                  size="sm"
                  color="danger"
                  isLoading={isSavingVirtualBots}
                  isDisabled={isDisabledSaveVirtualBots}
                  onClick={onClickSaveVirtualBots}
                >
                  Save as a real automation
                </Button>
              </div>

              <Virtuoso
                style={{ height: 625 }}
                data={virtualBots}
                itemContent={(_, bot) => (
                  <div className="p-2">
                    <VirtualAutomationRow
                      bot={bot}
                      isSelected={!!selectedVirtualBotIds[bot.virtualId]}
                      onChangeSelection={onChangeVirtualBotSelection}
                      onEditAutomation={onEditVirtualBot}
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
                Virtual Automation Charts
              </span>

              <Divider />

              <Virtuoso
                style={{ height: 700 }}
                data={Object.keys(selectedVirtualBotIds).filter(
                  (virtualId) => selectedVirtualBotIds[virtualId],
                )}
                itemContent={(_, virtualId) => (
                  <AutomationGridChart
                    histories={botsHistories[virtualId] || []}
                    title={`Virtual Automation ${virtualId}`}
                    range={
                      range
                        ? {
                            from: range.start.toDate(getLocalTimeZone()),
                            to: range.end.toDate(getLocalTimeZone()),
                          }
                        : undefined
                    }
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
