"use client";

import {
  AccordionItem,
  Accordion,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";

import { LeaderItem, LeaderParams } from "./LeaderItem";
import { BacktestParameters } from "./BacktestParamtersForm";
import { PastChart } from "./PastChart";

export type ConfirmLeadersProps = {
  leaders: LeaderParams[];
  onChangeLeaders: (leaders: LeaderParams[]) => void;
  endDate: Date;
  parameters: BacktestParameters;
  onNextStep: () => void;
  onPrevStep: () => void;
};

export function ConfirmLeaders({
  leaders,
  onChangeLeaders,
  endDate,
  parameters,
  onNextStep,
  onPrevStep,
}: ConfirmLeadersProps) {
  const handleChangeSelection = (
    address: string,
    contractId: number,
    leaderCollateral: number,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      const exists = leaders.find(
        (item) =>
          item.contractId === contractId &&
          item.address.toLowerCase() === address.toLowerCase(),
      );

      if (exists) {
        return;
      }

      onChangeLeaders([...leaders, { address, contractId, leaderCollateral }]);
    } else {
      onChangeLeaders(
        leaders.filter(
          (item) =>
            item.contractId !== contractId ||
            item.address.toLowerCase() !== address.toLowerCase(),
        ),
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardBody>
          <div className="flex h-[700px] w-full flex-col gap-2 overflow-y-auto">
            <Accordion isCompact variant="splitted">
              {leaders.map((leader) => (
                <AccordionItem
                  key={`${leader.address}-${leader.contractId}`}
                  title={<LeaderItem params={leader} />}
                >
                  <PastChart
                    endDate={endDate}
                    contractId={leader.contractId}
                    address={leader.address}
                    parameters={parameters}
                    onChangeSelection={(value) =>
                      handleChangeSelection(
                        leader.address,
                        leader.contractId,
                        leader.leaderCollateral,
                        value,
                      )
                    }
                  />
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardBody>
      </Card>

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
