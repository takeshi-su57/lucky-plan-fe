"use client";

import { memo } from "react";
import { Chip } from "@heroui/react";
import { Address } from "viem";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { FollowerBotGroup } from "./plan-automation-types";
import { BotModaledItem } from "./BotModaledItem";

export type FollowerAutomationGroupProps = {
  group: FollowerBotGroup;
};

export const FollowerAutomationGroup = memo(function FollowerAutomationGroup({
  group,
}: FollowerAutomationGroupProps) {
  return (
    <section className="border-default-200 bg-content1 flex min-w-0 flex-col gap-2 rounded-lg border p-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <AddressWidget
            address={group.followerAddress as Address}
            className="text-sm"
          />

          <span className="truncate text-xs text-neutral-500">
            Follower on {group.followerContract.chainId} Chain{" "}
            {group.followerContract.platform}
          </span>
        </div>

        <Chip size="sm" variant="flat">
          {group.bots.length} bots
        </Chip>
      </div>

      <div className="flex flex-col gap-2">
        {group.bots.map((bot) => (
          <BotModaledItem key={bot.id} bot={bot} />
        ))}
      </div>
    </section>
  );
});
