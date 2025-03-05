"use client";

import { useState } from "react";
import {
  Tab,
  Tabs,
  Button,
  useDisclosure,
  Switch,
  Spinner,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

import { BotStatus } from "@/graphql/gql/graphql";

import { useGetBotsByStatus } from "@/app-hooks/useAutomation";

import { CreateAutomationModal } from "@/app-components/AutomationWidgets/CreateAutomationModal";
import { AutomationSummary } from "@/app-components/AutomationWidgets/AutomationSummary";
import { AutomationDetails } from "@/app-components/AutomationWidgets/AutomationDetails";
import { FaPlus } from "react-icons/fa";
import { Virtuoso } from "react-virtuoso";
import { ModaledItems } from "@/components/modals/ModaledItems";

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
  const [isHiddedPlanedBots, setIsHiddedPlanedBots] = useState(false);

  const { bots, hasMore, loading, fetchMore } = useGetBotsByStatus(
    botStatusByTabType[selected],
  );

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

      <Virtuoso
        style={{ height: 750 }}
        data={bots.filter((bot) => (isHiddedPlanedBots ? !bot.planId : true))}
        itemContent={(_, bot) => (
          <ModaledItems
            mode="rightDrawer"
            trigger={<AutomationSummary bot={bot} />}
            content={<AutomationDetails bot={bot} isChatFirst={isChatFirst} />}
            contentTitle={`Automation ${bot.id}`}
            classNames={{
              trigger: "border border-neutral-700 rounded-lg p-2 mb-2",
            }}
          />
        )}
        endReached={() => hasMore && !loading && fetchMore()}
        components={{
          Footer: () => (
            <div className="flex w-full items-center justify-center">
              {hasMore === false ? (
                <span className="font-sans text-neutral-400/40">
                  No More Results Available
                </span>
              ) : loading ? (
                <Spinner color="warning" size="lg" />
              ) : null}
            </div>
          ),
        }}
      />

      <CreateAutomationModal
        planId={null}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
