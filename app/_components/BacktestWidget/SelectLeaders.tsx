"use client";

import { useEffect, useState } from "react";
import {
  AccordionItem,
  Accordion,
  Button,
  Card,
  CardBody,
  Switch,
  Checkbox,
} from "@nextui-org/react";
import dayjs from "dayjs";

import { useIsPnlSnapshotInitialized } from "@/app-hooks/useHistory";

import { InitializePnlSnapshotBoard } from "./InitializePnlSnapshotBoard";
import { PnlSnapshotKind } from "@/graphql/gql/graphql";
import { Leaderboard } from "../LeaderboardWidgets/Leaderboard";
import { LeaderItem, LeaderParams } from "./LeaderItem";
import { BacktestParameters } from "./BacktestParamtersForm";
import { PastChart } from "./PastChart";

export type SelectLeadersProps = {
  leaders: LeaderParams[];
  onChangeLeaders: (leaders: LeaderParams[]) => void;
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

  const [tempLeaders, setTempLeaders] = useState<LeaderParams[]>([]);
  const [isLeaderChart, setIsLeaderChart] = useState(true);
  const [initialContractId, setInitialContractId] = useState<string | null>(
    null,
  );
  const [initialKind, setInitialKind] = useState<PnlSnapshotKind>(
    PnlSnapshotKind.AllTime,
  );

  useEffect(() => {
    setTempLeaders(leaders);
  }, [leaders]);

  const handleConfirm = () => {
    onChangeLeaders(tempLeaders);
    onNextStep();
  };

  const handleChangeSelection = (
    address: string,
    contractId: number,
    leaderCollateral: number,
    isSelected: boolean,
  ) => {
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

        return [...prev, { address, contractId, leaderCollateral }];
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
  };

  if (!isPnlSnapshotInitialized?.isPnlSnapshotInitialized) {
    return (
      <div className="flex flex-col gap-2">
        <InitializePnlSnapshotBoard endDate={endDate} loading={loading} />

        <div className="flex flex-row items-center gap-2">
          <Button
            variant="light"
            onClick={onPrevStep}
            color="primary"
            size="sm"
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Leaderboard
        selectionLabel="Pick as a Leader"
        selectedAddresses={tempLeaders}
        initialContractId={initialContractId}
        initialKind={initialKind}
        onChangeParams={(contractId, kind) => {
          setInitialContractId(contractId);
          setInitialKind(kind);
        }}
        onChangeSelection={handleChangeSelection}
        endDate={endDate}
        hideTags={true}
      />

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
              {tempLeaders.map((leader) => (
                <AccordionItem
                  key={`${leader.address}-${leader.contractId}`}
                  title={<LeaderItem params={leader} />}
                >
                  <Checkbox
                    isSelected={true}
                    onValueChange={(value) =>
                      handleChangeSelection(
                        leader.address,
                        leader.contractId,
                        leader.leaderCollateral,
                        value,
                      )
                    }
                  >
                    Selected
                  </Checkbox>
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
