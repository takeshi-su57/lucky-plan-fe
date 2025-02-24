"use client";

import {
  AccordionItem,
  Accordion,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";

import { PersonalTradeHistory, VirtualBotParams } from "@/types";
import { FollowerStrategyForm } from "./FollowerStrategyForm";
import { VirtualBotItem } from "./VirtualBotItem";

export type PlanSetupStepProps = {
  virtualBotParams: VirtualBotParams[];
  onChangeVirtualBotParam: (virtualBotParams: VirtualBotParams) => void;
  onRemoveVirtualBotParam: (virtualId: string) => void;
  onChangeLeaderHistories: (
    virtualId: string,
    histories: PersonalTradeHistory[],
  ) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
};

export function PlanSetupStep({
  virtualBotParams,
  onChangeVirtualBotParam,
  onRemoveVirtualBotParam,
  onChangeLeaderHistories,
  onNextStep,
  onPrevStep,
}: PlanSetupStepProps) {
  const isInvalid = !!virtualBotParams.find(
    (item) => !item.followerContract || !item.strategy,
  );

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardBody>
          <div className="flex h-[700px] w-full flex-col gap-2 overflow-y-auto">
            <Accordion isCompact variant="splitted">
              {virtualBotParams.map((virtualBotParam) => (
                <AccordionItem
                  key={virtualBotParam.virtualId}
                  title={<VirtualBotItem virtualBot={virtualBotParam} />}
                >
                  <FollowerStrategyForm
                    params={virtualBotParam}
                    onSave={onChangeVirtualBotParam}
                    onRemove={onRemoveVirtualBotParam}
                    onChangeLeaderHistories={onChangeLeaderHistories}
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
          isDisabled={isInvalid}
          onClick={onNextStep}
          color="primary"
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
