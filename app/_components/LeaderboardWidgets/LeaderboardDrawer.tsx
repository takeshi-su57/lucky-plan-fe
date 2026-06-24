"use client";

import { useState, ChangeEventHandler, useMemo, useCallback } from "react";
import { Button, Checkbox, Select, SelectItem } from "@heroui/react";

import { RightDrawer } from "@/components/modals/RightDrawer";

import { Platform } from "@/graphql/gql/graphql";
import { LeaderboardV2 } from "./LeaderboardV2";

type LeaderboardParams = {
  platform: Platform;
  isDesc: boolean;
  isAppliedFilter: boolean;
  hideDegens: boolean;
};

const defaultParams: LeaderboardParams = {
  platform: Platform.Gns,
  isDesc: true,
  isAppliedFilter: true,
  hideDegens: true,
};

export type LeaderboardDrawerProps = {
  date: Date;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  highlighed: Map<string, boolean>;
};

export function LeaderboardDrawer({
  date,
  highlighed,
  isOpen,
  onOpenChange,
}: LeaderboardDrawerProps) {
  const [draft, setDraft] = useState<LeaderboardParams>(defaultParams);
  const [applied, setApplied] = useState<LeaderboardParams>(defaultParams);

  const hasChanges = useMemo(() => {
    return (
      draft.platform !== applied.platform || draft.isDesc !== applied.isDesc
    );
  }, [draft, applied]);

  const handleApply = useCallback(() => {
    setApplied(draft);
  }, [draft]);

  const handleChangePlatform: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;
    if (value.trim() !== "") {
      setDraft((prev) => ({ ...prev, platform: value as Platform }));
    }
  };

  return (
    <RightDrawer
      isOpen={isOpen}
      isDismissable={false}
      onOpenChange={onOpenChange}
      classNames={{ base: "w-[90vw] max-w-[90vw]" }}
    >
      <div className="flex h-full min-h-0 w-full flex-col gap-4">
        <h1 className="h-15 leading-normal font-bold text-white md:text-2xl md:leading-none">
          Leaderboard
        </h1>

        <div className="border-default-200 flex flex-col gap-3 border-b pb-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex flex-wrap items-end gap-3">
            <Select
              variant="bordered"
              size="sm"
              label="Platform"
              selectedKeys={draft.platform ? [draft.platform] : undefined}
              onChange={handleChangePlatform}
              selectionMode="single"
              className="w-44 font-mono"
              classNames={{
                trigger: "h-10 rounded-lg border-default-200 bg-content2",
                label: "text-[10px] font-semibold text-neutral-400",
              }}
            >
              {Object.values(Platform).map((item) => (
                <SelectItem key={item}>{item}</SelectItem>
              ))}
            </Select>

            <Checkbox
              isSelected={draft.isDesc}
              onValueChange={(isDesc) =>
                setDraft((prev) => ({ ...prev, isDesc }))
              }
              className="h-10 px-1"
              classNames={{
                label: "text-xs font-semibold text-neutral-200",
              }}
            >
              {draft.isDesc ? "Desc" : "Asc"}
            </Checkbox>

            <Checkbox
              isSelected={draft.isAppliedFilter}
              onValueChange={(isAppliedFilter) =>
                setDraft((prev) => ({ ...prev, isAppliedFilter }))
              }
              className="h-10 px-1"
              classNames={{
                label: "text-xs font-semibold text-neutral-200",
              }}
            >
              {draft.isAppliedFilter ? "Filtered" : "Original"}
            </Checkbox>

            <Checkbox
              isSelected={draft.hideDegens}
              onValueChange={(hideDegens) =>
                setDraft((prev) => ({ ...prev, hideDegens }))
              }
              className="h-10 px-1"
              classNames={{
                label: "text-xs font-semibold text-neutral-200",
              }}
            >
              {draft.hideDegens ? "Hide Degens" : "Show Degens"}
            </Checkbox>
          </div>

          {hasChanges && (
            <Button
              color="primary"
              onPress={handleApply}
              size="sm"
              className="h-9 rounded-lg px-4 text-xs font-semibold"
            >
              Apply
            </Button>
          )}
        </div>

        <LeaderboardV2
          date={date}
          platform={applied.platform}
          isDesc={applied.isDesc}
          isAppliedFilter={applied.isAppliedFilter}
          hideDegens={applied.hideDegens}
          highlightedAddresses={highlighed}
        />
      </div>
    </RightDrawer>
  );
}
