"use client";

import { useState } from "react";
import { Accordion, AccordionItem, Switch } from "@nextui-org/react";

import { BotDetails } from "@/graphql/gql/graphql";

import { AutomationSummary } from "@/app-components/AutomationWidgets/AutomationSummary";
import { AutomationDetails } from "@/app-components/AutomationWidgets/AutomationDetails";

export type PlanAutomationsProps = {
  bots: BotDetails[];
};

export function PlanAutomations({ bots }: PlanAutomationsProps) {
  const [isChatFirst, setIsChatFirst] = useState(true);
  const [isHideAlertForClosedMissions, setIsHideAlertForClosedMissions] =
    useState(true);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Switch
          isSelected={isChatFirst}
          onValueChange={setIsChatFirst}
          size="sm"
        >
          Chat First
        </Switch>

        <Switch
          isSelected={isHideAlertForClosedMissions}
          onValueChange={setIsHideAlertForClosedMissions}
          size="sm"
        >
          Hide Alert For Closed Missions
        </Switch>
      </div>

      <Accordion selectionMode="multiple" isCompact variant="splitted">
        {bots
          .sort((a, b) => a.id - b.id)
          .map((bot) => (
            <AccordionItem
              key={bot.id}
              title={
                <AutomationSummary
                  bot={bot}
                  isHideAlertForClosedMissions={isHideAlertForClosedMissions}
                />
              }
            >
              <AutomationDetails
                botId={bot.id}
                isChatFirst={isChatFirst}
                isHideAlertForClosedMissions={isHideAlertForClosedMissions}
              />
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
