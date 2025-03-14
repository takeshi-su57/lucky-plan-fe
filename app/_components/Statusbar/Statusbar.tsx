"use client";

import { twMerge } from "tailwind-merge";
import { useGetSystemStatus } from "@/app-hooks/useSystem";

export function Statusbar() {
  const { data } = useGetSystemStatus();

  return (
    <div className="flex h-full items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        <div className="relative flex items-center justify-center">
          <div
            className={twMerge(
              "z-10 h-2 w-2 rounded-full bg-red-500",
              data?.systemStatus === true ? "bg-red-500" : "bg-green-400",
            )}
          />
          <div
            className={twMerge(
              "absolute h-2 w-2 animate-ping rounded-full bg-red-500",
              data?.systemStatus === true ? "bg-red-500" : "bg-green-400",
            )}
          />
        </div>

        <span
          className={twMerge(
            "text-xs font-medium",
            data?.systemStatus === true ? "text-red-500" : "text-green-400",
          )}
        >
          {data?.systemStatus === true ? "Paused" : "Running"}
        </span>
      </div>
    </div>
  );
}
