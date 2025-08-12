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

  useEffect(() => {
    const endDate = dayjs(startDate).add(1, "day").toDate();

    const histories = leaders.map(
      (leader) =>
        getSortedPartialHistories(leader.histories, {
          mode: "show_only_valid_activity",
          range: { from: startDate, to: endDate },
        }).sortedHistories,
    );
    setTotalLeaderHistories(histories.flat());
  }, [leaders, startDate]);

  const endDate = dayjs(startDate).add(1, "day").toDate();

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
          range={{ from: startDate, to: endDate }}
        />
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
                      leaderContractId={leader.contract.contractId}
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
