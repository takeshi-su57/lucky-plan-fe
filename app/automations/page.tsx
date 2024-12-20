"use client";

import { useMemo, useState } from "react";
import {
  Tab,
  Tabs,
  Card,
  Button,
  CardBody,
  useDisclosure,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { Address } from "viem";

import { BotStatus } from "@/graphql/gql/graphql";
import { useGetAllBots } from "../_hooks/useAutomation";
import { CreateAutomationModal } from "../_components/AutomationWidgets/CreateAutomationModal";
import { AutomationInfoWidget } from "../_components/AutomationWidgets/AutomationInfoWidget";
import { UserTradeHistory } from "../_components/UserWidgets/UserTradeHistory";

type TabType = "all" | "created" | "live" | "stop" | "dead";

export default function Page() {
  const allBots = useGetAllBots();

  const [selected, setSelected] = useState<TabType>("all");

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const rows = useMemo(() => {
    return allBots.filter((bot) => {
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
    });
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

        <Button color="primary" onClick={onOpen}>
          Add New Automation
        </Button>
      </div>

      <Card>
        <CardBody>
          <Accordion isCompact>
            {rows.map((bot) => (
              <AccordionItem
                key={bot.id}
                title={<AutomationInfoWidget bot={bot} />}
              >
                <UserTradeHistory
                  address={bot.leaderAddress as Address}
                  contractId={`${bot.leaderContractId}`}
                />

                <UserTradeHistory
                  address={bot.followerAddress as Address}
                  contractId={`${bot.followerContractId}`}
                />
              </AccordionItem>
            ))}
          </Accordion>
        </CardBody>
      </Card>

      <CreateAutomationModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
