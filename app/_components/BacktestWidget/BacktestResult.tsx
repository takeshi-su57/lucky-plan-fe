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
} from "@nextui-org/react";
import { Address } from "viem";
import { BacktestParameters } from "./BacktestParamtersForm";
import { PersonalTradeHistory } from "@/types";
import { getPersonalTradeHistories } from "@/app/_actions/getPersonalTradeHistories";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import { transformHistories } from "@/utils/historiesChart";

import { AutomationGridChart } from "../PlansWidget/AutomationChart";
import { LeaderItem, LeaderParams } from "./LeaderItem";
import { FutureChart } from "./FutureChart";

type TabType = "overview" | "details";

export type BacktestResultProps = {
  startDate: Date;
  leaders: LeaderParams[];
  parameters: BacktestParameters;
  onNextStep: () => void;
  onPrevStep: () => void;
};

export function BacktestResult({
  startDate,
  leaders,
  parameters,
  onNextStep,
  onPrevStep,
}: BacktestResultProps) {
  const [selected, setSelected] = useState<TabType>("overview");
  const [isLeaderChart, setIsLeaderChart] = useState(true);

  const [leaderHistories, setLeaderHistories] = useState<
    Record<string, PersonalTradeHistory[]>
  >({});
  const [followerHistories, setFollowerHistories] = useState<
    Record<string, PersonalTradeHistory[]>
  >({});
  const [totalLeaderHistories, setTotalLeaderHistories] = useState<
    PersonalTradeHistory[]
  >([]);
  const [totalFollowerHistories, setTotalFollowerHistories] = useState<
    PersonalTradeHistory[]
  >([]);

  const allContracts = useGetAllContracts();

  useEffect(() => {
    if (allContracts) {
      leaders.forEach((leader) => {
        getPersonalTradeHistories(
          allContracts.find(
            (contract) => contract.id === leader.contract.contractId,
          )?.backendUrl!,
          leader.address,
        ).then((histories) => {
          const followerHistories = transformHistories(
            histories || [],
            leader.leaderCollateral,
            {
              ...parameters,
              strategyKey: "scaleCopy",
              ratio: 100,
            },
          );

          setLeaderHistories((prev) => ({
            ...prev,
            [leader.virtualId]: histories,
          }));

          setFollowerHistories((prev) => ({
            ...prev,
            [leader.virtualId]: followerHistories,
          }));

          setTotalLeaderHistories((prev) => [...prev, ...histories]);
          setTotalFollowerHistories((prev) => [...prev, ...followerHistories]);
        });
      });
    }
  }, [allContracts, leaders, parameters, startDate]);

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
        <>
          <Switch
            isSelected={isLeaderChart}
            onValueChange={setIsLeaderChart}
            size="sm"
          >
            {isLeaderChart ? "Leader Chart" : "Follower Chart"}
          </Switch>
          <AutomationGridChart
            histories={
              isLeaderChart ? totalLeaderHistories : totalFollowerHistories
            }
            title={`Total Result`}
            range={{ from: startDate, to: parameters.futureDate }}
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
                    title={<LeaderItem params={leader} />}
                  >
                    <FutureChart
                      startDate={startDate}
                      endDate={parameters.futureDate}
                      leaderContractId={leader.contract.contractId}
                      followerContractId={leader.contract.contractId}
                      address={leader.address as Address}
                      leaderHistories={leaderHistories[leader.virtualId] || []}
                      followerHistories={
                        followerHistories[leader.virtualId] || []
                      }
                    />
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CardBody>
        </Card>
      ) : null}

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
