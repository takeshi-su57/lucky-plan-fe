"use client";

import { ReactNode, useCallback } from "react";
import { Button, Chip } from "@nextui-org/react";
import { Address } from "viem";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { BotDetailsInfoFragment, BotStatus } from "@/graphql/gql/graphql";

import { getFragmentData } from "@/graphql/gql";
import { CONTRACT_INFO_FRAGMENT_DOCUMENT } from "@/app/_hooks/useContract";
import { STRATEGY_INFO_FRAGMENT_DOCUMENT } from "@/app/_hooks/useStrategy";

import {
  useDeleteBot,
  useLiveBot,
  useStopBot,
} from "@/app-hooks/useAutomation";

const colorsByBotsStatus: Record<BotStatus, "default" | "success" | "danger"> =
  {
    [BotStatus.Created]: "default",
    [BotStatus.Live]: "success",
    [BotStatus.Stop]: "danger",
    [BotStatus.Dead]: "default",
  };

export type AutomationInfoWidgetProps = {
  bot: BotDetailsInfoFragment;
};

export function AutomationInfoWidget({ bot }: AutomationInfoWidgetProps) {
  const liveBot = useLiveBot();
  const stopBot = useStopBot();
  const deleteBot = useDeleteBot();

  const leaderContract = getFragmentData(
    CONTRACT_INFO_FRAGMENT_DOCUMENT,
    bot.leaderContract,
  );

  const followerContract = getFragmentData(
    CONTRACT_INFO_FRAGMENT_DOCUMENT,
    bot.followerContract,
  );

  const strategy = getFragmentData(
    STRATEGY_INFO_FRAGMENT_DOCUMENT,
    bot.strategy,
  );

  const items = [
    {
      id: "contract",
      value: (
        <div className="flex flex-col">
          <span className="text-sm">{leaderContract.chainId}</span>
          <AddressWidget address={leaderContract.address as Address} />
          <span className="text-small">{followerContract.chainId}</span>
          <AddressWidget address={followerContract.address as Address} />
        </div>
      ),
    },
    {
      id: "strategy",
      value: (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col font-mono">
            <span className="text-small">{`${strategy.strategyKey}(${strategy.id}, ${strategy.ratio}%)`}</span>
            <span className="text-small">
              Collateral:
              {`(${Number(strategy.minCollateral)} ~ ${Number(strategy.maxCollateral)}) USDC`}
            </span>
            <span className="text-small">
              Leverage:
              {`(${strategy.minLeverage / 1000} ~ ${strategy.maxLeverage / 1000}) x`}
            </span>
            <span className="text-small">
              Capacity:
              {`(${Number(strategy.maxCapacity)} ~ ${Number(strategy.minCapacity)}) USDC`}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "status",
      label: "",
      value: <Chip color={colorsByBotsStatus[bot.status]}>{bot.status}</Chip>,
    },
  ];

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

  let btnCom: ReactNode = null;

  if (bot.status === BotStatus.Created) {
    btnCom = (
      <div className="flex items-center gap-2">
        <Button onClick={() => handleDelete(bot)} color="default">
          Delete
        </Button>
        <Button onClick={() => handleLive(bot)} color="danger">
          Live
        </Button>
      </div>
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

  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-6">
        <Chip>{bot.id}</Chip>

        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-4">
            {item.value}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">{btnCom}</div>
    </div>
  );
}
