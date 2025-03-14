"use client";

import { useState } from "react";
import { Switch } from "@nextui-org/react";

import { BotForwardDetails } from "@/graphql/gql/graphql";

import { AutomationSummary } from "@/app-components/AutomationWidgets/AutomationSummary";
import { AutomationDetails } from "@/app-components/AutomationWidgets/AutomationDetails";
import { ModaledItems } from "@/components/modals/ModaledItems";

export type PlanAutomationsProps = {
  bots: BotForwardDetails[];
};

export function PlanAutomations({ bots }: PlanAutomationsProps) {
  const [isChatFirst, setIsChatFirst] = useState(true);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Switch
          isSelected={isChatFirst}
          onValueChange={setIsChatFirst}
          size="sm"
        >
          Chat First
        </Switch>
      </div>

      {bots
        .sort((a, b) => a.id - b.id)
        .map((bot) => (
          <ModaledItems
            key={bot.id}
            mode="rightDrawer"
            trigger={<AutomationSummary bot={bot} />}
            content={<AutomationDetails bot={bot} isChatFirst={isChatFirst} />}
            contentTitle={`Automation ${bot.id}`}
            classNames={{
              trigger: "border border-neutral-700 rounded-lg p-2 ",
            }}
          />
        ))}
    </div>
  );
}
