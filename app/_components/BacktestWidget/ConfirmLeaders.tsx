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
  const handleRemoveSelection = (id: string) => {
    onChangeLeaders(leaders.filter((item) => item.virtualId !== id));
  };

  const handleConfirmSelection = (id: string) => {
    onChangeLeaders(
      leaders.map((item) =>
        item.virtualId === id ? { ...item, isConfirmed: true } : item,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardBody>
          <div className="flex h-[700px] w-full flex-col gap-2 overflow-y-auto">
            <Accordion isCompact variant="splitted">
              {leaders.map((leader) => (
                <AccordionItem
                  key={leader.virtualId}
                  title={<LeaderItem params={leader} />}
                >
                  <PastChart
                    endDate={endDate}
                    contractId={leader.contract.contractId}
                    address={leader.address}
                    parameters={parameters}
                    onRemove={() => handleRemoveSelection(leader.virtualId)}
                    onConfirm={() => handleConfirmSelection(leader.virtualId)}
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
