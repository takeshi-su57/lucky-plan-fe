"use client";

import { useMemo, useState } from "react";
import { Tab, Tabs, Switch, Spinner, Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Virtuoso } from "react-virtuoso";
import { useDebounce } from "use-debounce";

import { BotStatus } from "@/graphql/gql/graphql";

import { useGetBotsByStatus, useLiveBots } from "@/app-hooks/useAutomation";

import { AutomationSummary } from "@/app-components/AutomationWidgets/AutomationSummary";
import { AutomationDetails } from "@/app-components/AutomationWidgets/AutomationDetails";

import { ModaledItems } from "@/components/modals/ModaledItems";

type TabType = "live" | "history";

export function Automations() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selected, setSelected] = useState<TabType>(
    (searchParams.get("status") as TabType) || "live",
  );
  const [isChatFirst, setIsChatFirst] = useState(true);
  const [isHiddedPlanedBots, setIsHiddedPlanedBots] = useState(false);
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [debouncedSearchAddress] = useDebounce(searchAddress, 1000);

  const {
    bots: botHistories,
    hasMore: hasMoreHistories,
    loading: loadingHistories,
    fetchMore: fetchMoreHistories,
  } = useGetBotsByStatus(BotStatus.Dead);
  const {
    bots: liveBots,
    hasMore: hasMoreLives,
    loading: loadingLives,
    fetchMore: fetchMoreLives,
  } = useLiveBots();

  const bots = useMemo(() => {
    return (selected === "live" ? liveBots : botHistories)
      .sort((a, b) => b.id - a.id)
      .filter(
        (bot) =>
          debouncedSearchAddress.trim() === "" ||
          bot.leaderAddress
            .toLowerCase()
            .includes(debouncedSearchAddress.toLowerCase()) ||
          bot.followerAddress
            .toLowerCase()
            .includes(debouncedSearchAddress.toLowerCase()),
      );
  }, [botHistories, debouncedSearchAddress, liveBots, selected]);

  const hasMore = selected === "live" ? hasMoreLives : hasMoreHistories;
  const loading = selected === "live" ? loadingLives : loadingHistories;
  const fetchMore = selected === "live" ? fetchMoreLives : fetchMoreHistories;

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
            <Tab key="live" title="Live" />
            <Tab key="history" title="Histories" />
          </Tabs>

          <Input
            placeholder="Search by address"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
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
      </div>

      <Virtuoso
        style={{ height: 750 }}
        data={bots.filter((bot) => (isHiddedPlanedBots ? !bot.planId : true))}
        itemContent={(_, bot) => (
          <ModaledItems
            mode="rightDrawer"
            trigger={<AutomationSummary bot={bot} />}
            content={<AutomationDetails bot={bot} isChartFirst={isChatFirst} />}
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
              ) : (
                <Spinner color="warning" size="lg" />
              )}
            </div>
          ),
        }}
      />
    </div>
  );
}
