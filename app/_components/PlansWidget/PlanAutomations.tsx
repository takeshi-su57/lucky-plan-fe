"use client";

import { useState } from "react";
import { Accordion, AccordionItem, Switch } from "@nextui-org/react";

import { BotForwardDetails } from "@/graphql/gql/graphql";

import { AutomationSummary } from "@/app-components/AutomationWidgets/AutomationSummary";
import { AutomationDetails } from "@/app-components/AutomationWidgets/AutomationDetails";

export type PlanAutomationsProps = {
  bots: BotForwardDetails[];
};

export function PlanAutomations({ bots }: PlanAutomationsProps) {
  const [isChatFirst, setIsChatFirst] = useState(true);

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
      </div>

      <Accordion selectionMode="multiple" isCompact variant="splitted">
        {bots
          .sort((a, b) => a.id - b.id)
          .map((bot) => (
            <AccordionItem key={bot.id} title={<AutomationSummary bot={bot} />}>
              <AutomationDetails bot={bot} isChatFirst={isChatFirst} />
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
