"use client";

import { twMerge } from "tailwind-merge";
import { useGetSystemStatus } from "@/app-hooks/useSystem";

export function Statusbar() {
  const { data } = useGetSystemStatus();
  const isPaused = data?.systemStatus === true;

  return (
    <div className="flex h-full items-center justify-between text-[11px]">
      <div className="flex flex-row items-center gap-2">
        <div className="relative flex items-center justify-center">
          <div
            className={twMerge(
              "z-10 h-1.5 w-1.5 rounded-full",
              isPaused ? "bg-red-400" : "bg-emerald-400",
            )}
          />
          <div
            className={twMerge(
              "absolute h-1.5 w-1.5 animate-ping rounded-full",
              isPaused ? "bg-red-400" : "bg-emerald-400",
            )}
          />
        </div>

        <span
          className={twMerge(
            "font-semibold tracking-[0.14em] uppercase",
            isPaused ? "text-red-300" : "text-emerald-300",
          )}
        >
          {isPaused ? "Paused" : "Running"}
        </span>
      </div>
    </div>
  );
}
