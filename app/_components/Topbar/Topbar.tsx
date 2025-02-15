"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { twMerge } from "tailwind-merge";
import { useGetSystemStatus } from "@/app-hooks/useSystem";
import { useGetTradeTransactionCounts } from "@/app/_hooks/useHistory";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import { Chip } from "@nextui-org/react";
import { Badge } from "@nextui-org/react";

export function Topbar() {
  const { data } = useGetSystemStatus();

  const contracts = useGetAllContracts();

  const { data: tradeTransactionCounts } = useGetTradeTransactionCounts(
    contracts.map((item) => item.id),
    [],
  );

  return (
    <div className="sticky flex items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        <div className="relative flex items-center justify-center">
          <div
            className={twMerge(
              "z-10 h-4 w-4 rounded-full bg-red-500",
              data?.systemStatus === true ? "bg-red-500" : "bg-green-400",
            )}
          />
          <div
            className={twMerge(
              "absolute h-4 w-4 animate-ping rounded-full bg-red-500",
              data?.systemStatus === true ? "bg-red-500" : "bg-green-400",
            )}
          />
        </div>

        <span
          className={twMerge(
            "text-sm font-medium",
            data?.systemStatus === true ? "text-red-500" : "text-green-400",
          )}
        >
          {data?.systemStatus === true ? "Paused" : "Running"}
        </span>
      </div>

      <div className="flex items-center gap-10">
        <Badge
          color="secondary"
          content={
            tradeTransactionCounts?.getTradeTransactionCounts?.monthly || 0
          }
        >
          <Chip color="secondary">This Month Trades</Chip>
        </Badge>
        <Badge
          color="secondary"
          content={
            tradeTransactionCounts?.getTradeTransactionCounts?.weekly || 0
          }
        >
          <Chip color="secondary">This Week Trades</Chip>
        </Badge>
        <Badge
          color="secondary"
          content={
            tradeTransactionCounts?.getTradeTransactionCounts?.daily || 0
          }
        >
          <Chip color="secondary">Today Trades</Chip>
        </Badge>

        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          chainStatus="icon"
        />
      </div>
    </div>
  );
}
