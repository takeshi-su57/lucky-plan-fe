"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";
import {
  Tab,
  Tabs,
  Card,
  Button,
  CardBody,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { Address } from "viem";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import { BotDetailsInfoFragment, BotStatus } from "@/graphql/gql/graphql";
import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { useGetAllBots, useLiveBot, useStopBot } from "../_hooks/useAutomation";
import { CreateAutomationModal } from "../_components/AutomationWidgets/CreateAutomationModal";

const columns: TableColumnProps[] = [
  {
    id: "id",
    component: "ID",
    allowsSorting: true,
  },
  {
    id: "leader",
    component: "Leader",
    allowsSorting: true,
  },
  {
    id: "follower",
    component: "Follower",
    allowsSorting: true,
  },
  {
    id: "strategy",
    component: "Strategy",
    allowsSorting: true,
  },
  {
    id: "status",
    component: "Status",
    allowsSorting: true,
  },
  {
    id: "action",
    component: "",
    className: "flex-end",
  },
];

type TabType = "all" | "created" | "live" | "stop" | "dead";

export default function Page() {
  const allBots = useGetAllBots();
  const liveBot = useLiveBot();
  const stopBot = useStopBot();

  const [selected, setSelected] = useState<TabType>("all");

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

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
    if (allBots.length === 0) {
      return [];
    }
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
      .map((bot) => {
        let btnCom: ReactNode = null;

        if (bot.status === BotStatus.Created) {
          btnCom = (
            <Button onClick={() => handleLive(bot)} color="danger">
              Live
            </Button>
          );
        }

        if (bot.status === BotStatus.Live) {
          btnCom = (
            <Button onClick={() => handleStop(bot)} color="primary">
              Stop
            </Button>
          );
        }

        if (bot.status === BotStatus.Stop) {
          btnCom = <Button disabled>Stop</Button>;
        }

        if (bot.status === BotStatus.Dead) {
          btnCom = <Button disabled>Copy</Button>;
        }

        return {
          id: `${bot.id}`,
          className: "group",
          data: {
            id: {
              sortableAmount: bot.id,
              component: bot.id,
            },
            leader: {
              sortableAmount: bot.leaderAddress,
              component: (
                <div className="flex flex-col">
                  <AddressWidget address={bot.leaderAddress as Address} />
                  <span>
                    Leader Collateral Baseline: {bot.leaderCollateralBaseline}{" "}
                    USDC
                  </span>
                  <span>Chain: {bot.leaderContract.chainId}</span>
                  <span className="flex items-center gap-2">
                    Contract:
                    <AddressWidget
                      address={bot.leaderContract.address as Address}
                    />
                  </span>
                  {bot.leaderStartedBlock && (
                    <span>Started: {bot.leaderStartedBlock || ""}</span>
                  )}
                  {bot.leaderEndedBlock && (
                    <span>Ended: {bot.leaderEndedBlock || ""}</span>
                  )}
                </div>
              ),
            },
            follower: {
              sortableAmount: bot.followerAddress,
              component: (
                <div className="flex flex-col">
                  <AddressWidget address={bot.followerAddress as Address} />
                  <span>Chain: {bot.followerContract.chainId}</span>
                  <span className="flex items-center gap-2">
                    Contract:
                    <AddressWidget
                      address={bot.followerContract.address as Address}
                    />
                  </span>
                  {bot.followerStartedBlock && (
                    <span>Started: {bot.followerStartedBlock || ""}</span>
                  )}
                  {bot.followerEndedBlock && (
                    <span>Ended: {bot.followerEndedBlock || ""}</span>
                  )}
                </div>
              ),
            },
            strategy: {
              sortableAmount: bot.strategyId,
              component: (
                <div className="flex flex-col font-mono">
                  <span className="text-small">{`${bot.strategy.strategyKey}(${bot.strategy.id}, ${bot.strategy.ratio}%)`}</span>
                  <span className="text-small">
                    Collateral:
                    {`(${Number(bot.strategy.minCollateral)} ~ ${Number(bot.strategy.maxCollateral)}) USDC`}
                  </span>
                  <span className="text-small">
                    Leverage:
                    {`(${bot.strategy.minLeverage / 1000} ~ ${bot.strategy.maxLeverage / 1000}) x`}
                  </span>
                  <span className="text-small">
                    Capacity:
                    {`(${Number(bot.strategy.maxCapacity)} ~ ${Number(bot.strategy.minCapacity)}) USDC`}
                  </span>
                </div>
              ),
            },
            status: {
              sortableAmount: bot.status,
              component: <Chip>{bot.status}</Chip>,
            },
            action: {
              component: btnCom,
              className: "w-[50px]",
            },
          },
        };
      });
  }, [allBots, handleLive, handleStop, selected]);

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
          <DataTable
            columns={columns}
            rows={rows}
            classNames={{
              tr: "hover:bg-white/5 font-mono cursor-pointer",
              td: "py-3",
              th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
            }}
          />
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
