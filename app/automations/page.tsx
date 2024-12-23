"use client";

import { useMemo, useState } from "react";
import {
  Tab,
  Tabs,
  Button,
  useDisclosure,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

import { BotStatus } from "@/graphql/gql/graphql";

import { useGetAllBots } from "@/app-hooks/useAutomation";

import { CreateAutomationModal } from "@/app-components/AutomationWidgets/CreateAutomationModal";
import { AutomationSummary } from "@/app-components/AutomationWidgets/AutomationSummary";
import { AutomationDetails } from "@/app-components/AutomationWidgets/AutomationDetails";

type TabType = "all" | "created" | "live" | "stop" | "dead";

export default function Page() {
  const allBots = useGetAllBots();

  const [selected, setSelected] = useState<TabType>("all");

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const rows = useMemo(() => {
    return allBots
      .filter((bot) => {
        if (selected === "all") {
          return true;
        }

        if (selected === "created") {
          return bot.status === BotStatus.Created;
        }
        if (selected === "live") {
          return bot.status === BotStatus.Live;
        }
        if (selected === "stop") {
          return bot.status === BotStatus.Stop;
        }

        if (selected === "dead") {
          return bot.status === BotStatus.Dead;
        }

        return false;
      })
      .sort((a, b) => b.id - a.id);
  }, [allBots, selected]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Tabs
          aria-label="users-table-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => value && setSelected(value as TabType)}
        >
          <Tab key="all" title="All" />
          <Tab key="created" title="Created" />
          <Tab key="live" title="Live" />
          <Tab key="stop" title="Stop" />
          <Tab key="dead" title="Dead" />
        </Tabs>

        <Button color="primary" variant="bordered" onClick={onOpen}>
          + New
        </Button>
      </div>

      <Accordion isCompact variant="splitted">
        {rows.map((bot) => (
          <AccordionItem key={bot.id} title={<AutomationSummary bot={bot} />}>
            <AutomationDetails botId={bot.id} />
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
