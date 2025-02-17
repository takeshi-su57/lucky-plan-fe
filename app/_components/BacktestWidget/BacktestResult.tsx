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
import { BacktestParameters } from "./BacktestParamtersForm";
import { PersonalTradeHistory } from "@/types";
import { getPersonalTradeHistories } from "@/app/_actions/getPersonalTradeHistories";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import {
  transformHistories,
  getHistoriesChartData,
} from "@/utils/historiesChart";
import { HistoriesWidget } from "../LeaderboardWidgets/HistoriesWidget";
import { AutomationGridChart } from "../PlansWidget/AutomationChart";
import { LeaderItem } from "./LeaderItem";

type TabType = "overview" | "details";

export type BacktestResultProps = {
  startDate: Date;
  leaders: { address: string; contractId: number }[];
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

  const [leaderHistories, setLeaderHistories] = useState<
    Record<string, PersonalTradeHistory[]>
  >({});

  const allContracts = useGetAllContracts();

  useEffect(() => {
    if (allContracts) {
      leaders.forEach((leader) => {
        getPersonalTradeHistories(
          allContracts.find((contract) => contract.id === leader.contractId)
            ?.backendUrl!,
          leader.address,
        ).then((histories) => {
          const { sumIn, countIn } = getHistoriesChartData(histories || [], {
            to: startDate,
          });

          setLeaderHistories((prev) => ({
            ...prev,
            [`${leader.address}-${leader.contractId}`]: transformHistories(
              histories,
              countIn > 0 ? sumIn / countIn : 0,
              {
                ...parameters,
                strategyKey: "scaleCopy",
                ratio: 100,
              },
            ),
          }));
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
        <AutomationGridChart
          histories={[
            ...Object.keys(leaderHistories).filter(
              (leaderId) => leaderHistories[leaderId],
            ),
          ]
            .map((leaderId) => leaderHistories[leaderId] || [])
            .reduce((acc, item) => [...acc, ...item], [])}
          title={`Grouped Result`}
          range={{ from: startDate, to: parameters.futureDate }}
        />
      ) : null}

      {selected === "details" ? (
        <Card>
          <CardBody>
            <div className="flex h-[700px] w-full flex-col gap-2 overflow-y-auto">
              <Accordion isCompact variant="splitted">
                {leaders.map((leader) => (
                  <AccordionItem
                    key={`${leader.address}-${leader.contractId}`}
                    title={
                      <LeaderItem
                        contractId={leader.contractId}
                        address={leader.address}
                      />
                    }
                  >
                    <HistoriesWidget
                      address={leader.address as Address}
                      histories={
                        leaderHistories[
                          `${leader.address}-${leader.contractId}`
                        ] || []
                      }
                      contractId={leader.contractId}
                      hideTags={true}
                      range={{ from: startDate, to: parameters.futureDate }}
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
