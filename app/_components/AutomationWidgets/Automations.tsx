"use client";

import { useState } from "react";
import {
  Tab,
  Tabs,
  Button,
  useDisclosure,
  Accordion,
  AccordionItem,
  Switch,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

import { BotStatus } from "@/graphql/gql/graphql";

import { useGetBotsByStatus } from "@/app-hooks/useAutomation";

import { CreateAutomationModal } from "@/app-components/AutomationWidgets/CreateAutomationModal";
import { AutomationSummary } from "@/app-components/AutomationWidgets/AutomationSummary";
import { AutomationDetails } from "@/app-components/AutomationWidgets/AutomationDetails";
import { FaPlus } from "react-icons/fa";

type TabType = "created" | "live" | "stop" | "dead";

const botStatusByTabType: Record<TabType, BotStatus> = {
  created: BotStatus.Created,
  live: BotStatus.Live,
  stop: BotStatus.Stop,
  dead: BotStatus.Dead,
};

export function Automations() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selected, setSelected] = useState<TabType>(
    (searchParams.get("status") as TabType) || "live",
  );
  const [isChatFirst, setIsChatFirst] = useState(true);
  const [isHideAlertForClosedMissions, setIsHideAlertForClosedMissions] =
    useState(true);
  const [isHiddedPlanedBots, setIsHiddedPlanedBots] = useState(true);

  const bots = useGetBotsByStatus(botStatusByTabType[selected]);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Tabs
            aria-label="automations-tabs"
            selectedKey={selected}
            onSelectionChange={(value) => {
              if (value) {
                setSelected(value as TabType);
                router.push(`/automations?status=${value}`);
              }
            }}
          >
            <Tab key="created" title="Created" />
            <Tab key="live" title="Live" />
            <Tab key="stop" title="Stop" />
            <Tab key="dead" title="Dead" />
          </Tabs>

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

          <Switch
            isSelected={isHiddedPlanedBots}
            onValueChange={setIsHiddedPlanedBots}
            size="sm"
          >
            Hide Planed Automations
          </Switch>
        </div>

        <Button isIconOnly color="primary" variant="flat" onClick={onOpen}>
          <FaPlus />
        </Button>
      </div>

      <Accordion selectionMode="multiple" isCompact variant="splitted">
        {bots
          .filter((bot) => (isHiddedPlanedBots ? !bot.planId : true))
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

      <CreateAutomationModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
