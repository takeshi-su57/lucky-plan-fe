"use client";

import { useMemo, useState, useCallback } from "react";
import {
  Tab,
  Tabs,
  Button,
  useDisclosure,
  Accordion,
  AccordionItem,
  Divider,
} from "@nextui-org/react";
import { Address } from "viem";

import { BotDetailsInfoFragment, BotStatus } from "@/graphql/gql/graphql";

import {
  useDeleteBot,
  useLiveBot,
  useStopBot,
  useGetAllBots,
} from "@/app-hooks/useAutomation";

import { CreateAutomationModal } from "@/app-components/AutomationWidgets/CreateAutomationModal";
import { AutomationInfoWidget } from "@/app-components/AutomationWidgets/AutomationInfoWidget";
import { UserTradeHistory } from "@/app-components/UserWidgets/UserTradeHistory";

type TabType = "all" | "created" | "live" | "stop" | "dead";

export default function Page() {
  const allBots = useGetAllBots();
  const liveBot = useLiveBot();
  const stopBot = useStopBot();
  const deleteBot = useDeleteBot();

  const [selected, setSelected] = useState<TabType>("all");

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleDelete = useCallback(
    (bot: BotDetailsInfoFragment) => {
      deleteBot({
        variables: {
          id: bot.id,
        },
      });
    },
    [deleteBot],
  );

  const handleLive = useCallback(
    (bot: BotDetailsInfoFragment) => {
      liveBot({
        variables: {
          id: bot.id,
        },
      });
    },
    [liveBot],
  );

  const handleStop = useCallback(
    (bot: BotDetailsInfoFragment) => {
      stopBot({
        variables: {
          id: bot.id,
        },
      });
    },
    [stopBot],
  );

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

      <Accordion isCompact variant="splitted">
        {rows.map((bot) => (
          <AccordionItem
            key={bot.id}
            title={<AutomationInfoWidget bot={bot} />}
          >
            <div className="flex flex-col gap-8">
              {bot.status === BotStatus.Created ? (
                <div className="flex items-center gap-2">
                  <Button onClick={() => handleDelete(bot)} color="default">
                    Delete
                  </Button>
                  <Button onClick={() => handleLive(bot)} color="danger">
                    Live
                  </Button>
                </div>
              ) : null}

              {bot.status === BotStatus.Live ? (
                <div className="flex items-center gap-2">
                  <Button onClick={() => handleStop(bot)} color="primary">
                    Stop
                  </Button>
                </div>
              ) : null}

              {bot.status === BotStatus.Stop ? (
                <Button disabled>Stop</Button>
              ) : null}

              {bot.status === BotStatus.Dead ? (
                <Button disabled>Copy</Button>
              ) : null}

              <UserTradeHistory
                address={bot.leaderAddress as Address}
                contractId={`${bot.leaderContractId}`}
              />

              <Divider />

              <UserTradeHistory
                address={bot.followerAddress as Address}
                contractId={`${bot.followerContractId}`}
              />
            </div>
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
