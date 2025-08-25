import { useEffect, useState } from "react";
import {
  AccordionItem,
  Accordion,
  Button,
  CardBody,
  Card,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Address } from "viem";
import dayjs from "dayjs";
import { PersonalTradeHistory } from "@/types";

import { AutomationGridChart } from "../PlansWidget/AutomationChart";
import { FutureChart } from "./FutureChart";
import { LeaderItem, LeaderParams } from "./LeaderItem";
import { getSortedPartialHistories } from "@/utils/historiesChart";
import { HistoriesWidget } from "../LeaderboardWidgets/HistoriesWidget/HistoriesWidget";

type TabType = "overview" | "details";

export type BacktestResultProps = {
  startDate: Date;
  leaders: LeaderParams[];
  onNextStep?: () => void;
  onPrevStep?: () => void;
};

export function BacktestResult({
  startDate,
  leaders,
  onNextStep,
  onPrevStep,
}: BacktestResultProps) {
  const [selected, setSelected] = useState<TabType>("overview");

  const [totalLeaderHistories, setTotalLeaderHistories] = useState<
    PersonalTradeHistory[]
  >([]);
  const [activeLeaders, setActiveLeaders] = useState<
    (LeaderParams & {
      allHistories: PersonalTradeHistory[];
    })[]
  >([]);

  useEffect(() => {
    const fromDate = dayjs(startDate).add(1, "day").toDate();
    const toDate = dayjs(startDate).add(2, "day").toDate();

    const _activeLeaders = leaders
      .map((leader) => {
        return {
          ...leader,
          histories: getSortedPartialHistories(leader.histories, {
            mode: "show_only_valid_activity",
            range: { from: fromDate, to: toDate },
          }).sortedHistories,
          allHistories: leader.histories,
        };
      })
      .filter((leader) => leader.histories.length > 0);

    setTotalLeaderHistories(
      _activeLeaders.flatMap((leader) => leader.histories),
    );
    setActiveLeaders(_activeLeaders);
  }, [leaders, startDate]);

  const fromDate = dayjs(startDate).add(1, "day").toDate();
  const toDate = dayjs(startDate).add(2, "day").toDate();

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

      {selected === "overview" ? (
        <AutomationGridChart
          mode="show_only_valid_activity"
          histories={totalLeaderHistories}
          title={`Total Result`}
          range={{ from: fromDate, to: toDate }}
        />
      ) : null}

      {selected === "details" ? (
        <Card>
          <CardBody>
            <div className="flex h-[700px] w-full flex-col gap-2 overflow-y-auto">
              <Accordion isCompact variant="splitted">
                {activeLeaders.map((leader) => (
                  <AccordionItem
                    key={leader.virtualId}
                    title={
                      <LeaderItem params={{ ...leader, isConfirmed: true }} />
                    }
                  >
                    <FutureChart
                      startDate={fromDate}
                      endDate={toDate}
                      address={leader.address as Address}
                      leaderHistories={leader.histories}
                    />

                    <HistoriesWidget
                      address={leader.address as Address}
                      histories={leader.allHistories}
                      hideTags
                      range={{ to: toDate }}
                      mode="show_all_activity"
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
