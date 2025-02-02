"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { twMerge } from "tailwind-merge";
import { useGetSystemStatus } from "@/app-hooks/useSystem";

export function Topbar() {
  const { data } = useGetSystemStatus();

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

      <ConnectButton
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
        chainStatus="icon"
      />
    </div>
  );
}
