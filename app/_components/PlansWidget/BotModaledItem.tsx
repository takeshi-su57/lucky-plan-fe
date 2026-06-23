"use client";

import { memo } from "react";

import { AutomationDetails } from "@/app-components/AutomationWidgets/AutomationDetails";
import { ModaledItems } from "@/components/modals/ModaledItems";
import { BotForwardDetails } from "@/graphql/gql/graphql";
import { PlanAutomationSummary } from "./PlanAutomationSummary";

export type BotModaledItemProps = {
  bot: BotForwardDetails;
};

export const BotModaledItem = memo(function BotModaledItem({
  bot,
}: BotModaledItemProps) {
  return (
    <ModaledItems
      mode="rightDrawer"
      trigger={<PlanAutomationSummary bot={bot} />}
      content={<AutomationDetails bot={bot} />}
      contentTitle={`Automation ${bot.id}`}
      classNames={{
        trigger: "border border-neutral-700 rounded-lg bg-content2/50 p-2",
      }}
    />
  );
});
