"use client";

import { Chip } from "@nextui-org/react";
import { Address } from "viem";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { BotDetailsInfoFragment, BotStatus } from "@/graphql/gql/graphql";

import { getFragmentData } from "@/graphql/gql";
import { CONTRACT_INFO_FRAGMENT_DOCUMENT } from "@/app/_hooks/useContract";
import { STRATEGY_INFO_FRAGMENT_DOCUMENT } from "@/app/_hooks/useStrategy";

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

  return (
    <div className="flex items-center gap-6">
      <Chip>{bot.id}</Chip>

      {items.map((item) => (
        <div key={item.id} className="flex flex-col gap-4">
          {item.value}
        </div>
      ))}
    </div>
  );
}
