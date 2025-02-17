"use client";

import { useEffect, useState } from "react";
import {
  AccordionItem,
  Accordion,
  Button,
  Tab,
  Tabs,
  Card,
  CardBody,
  Switch,
} from "@nextui-org/react";
import dayjs from "dayjs";

import { useIsPnlSnapshotInitialized } from "@/app-hooks/useHistory";

import { InitializePnlSnapshotBoard } from "./InitializePnlSnapshotBoard";
import { PnlSnapshotKind } from "@/graphql/gql/graphql";
import { Leaderboard } from "../LeaderboardWidgets/Leaderboard";
import { LeaderItem } from "./LeaderItem";
import { BacktestParameters } from "./BacktestParamtersForm";
import { PastChart } from "./PastChart";

type TabType = "leaderboard" | "leaders";

export type SelectLeadersProps = {
  leaders: { address: string; contractId: number }[];
  onChangeLeaders: (leaders: { address: string; contractId: number }[]) => void;
  endDate: Date;
  parameters: BacktestParameters;
  onNextStep: () => void;
  onPrevStep: () => void;
};

export function SelectLeaders({
  leaders,
  onChangeLeaders,
  endDate,
  parameters,
  onNextStep,
  onPrevStep,
}: SelectLeadersProps) {
  const { data: isPnlSnapshotInitialized, loading } =
    useIsPnlSnapshotInitialized(dayjs(endDate).format("YYYY-MM-DD"));

  const [selected, setSelected] = useState<TabType>("leaderboard");
  const [tempLeaders, setTempLeaders] = useState<
    { address: string; contractId: number }[]
  >([]);
  const [isLeaderChart, setIsLeaderChart] = useState(true);

  useEffect(() => {
    setTempLeaders(leaders);
  }, [leaders]);

  const handleConfirm = () => {
    onChangeLeaders(tempLeaders);
    onNextStep();
  };

  if (!isPnlSnapshotInitialized?.isPnlSnapshotInitialized) {
    <div className="flex flex-col gap-2">
      <InitializePnlSnapshotBoard endDate={endDate} loading={loading} />

      <div className="flex flex-row items-center gap-2">
        <Button variant="light" onClick={onPrevStep} color="primary" size="sm">
          Back
        </Button>
      </div>
    </div>;
  }

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
        <Tab key="leaderboard" title="Leaderboard" />
        <Tab key="leaders" title="Leaders" />
      </Tabs>

      {selected === "leaderboard" ? (
        <Leaderboard
          selectionLabel="Pick as a Leader"
          selectedAddresses={leaders}
          onChangeSelection={(address, contractId, isSelected) => {
            if (isSelected) {
              setTempLeaders((prev) => {
                const exists = prev.find(
                  (item) =>
                    item.contractId === contractId &&
                    item.address.toLowerCase() === address.toLowerCase(),
                );

                if (exists) {
                  return prev;
                }

                return [...prev, { address, contractId }];
              });
            } else {
              setTempLeaders((prev) => {
                return prev.filter(
                  (item) =>
                    item.contractId !== contractId ||
                    item.address.toLowerCase() !== address.toLowerCase(),
                );
              });
            }
          }}
          endDate={endDate}
          initialContractId={null}
          initialKind={PnlSnapshotKind.AllTime}
          onChangeParams={() => {}}
          hideTags={true}
        />
      ) : null}

      {selected === "leaders" ? (
        <Card>
          <CardBody>
            <div className="flex h-[700px] w-full flex-col gap-2 overflow-y-auto">
              <Switch
                isSelected={isLeaderChart}
                onValueChange={setIsLeaderChart}
                size="sm"
              >
                {isLeaderChart ? "Leader Chart" : "Follower Chart"}
              </Switch>

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
                    <PastChart
                      endDate={endDate}
                      contractId={leader.contractId}
                      address={leader.address}
                      isLeaderChart={isLeaderChart}
                      parameters={parameters}
                    />
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CardBody>
        </Card>
      ) : null}

      <div className="flex flex-row items-center gap-2">
        <Button
          variant="solid"
          onClick={handleConfirm}
          color="primary"
          isDisabled={tempLeaders.length === 0}
          size="sm"
        >
          Continue
        </Button>

        <Button variant="light" onClick={onPrevStep} color="primary" size="sm">
          Back
        </Button>
      </div>
    </div>
  );
}
