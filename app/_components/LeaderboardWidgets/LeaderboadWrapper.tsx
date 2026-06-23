"use client";

import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  DatePicker,
  Select,
  SelectItem,
} from "@heroui/react";
import { parseDate, now } from "@internationalized/date";
import dayjs from "dayjs";
import { getServerTimezone } from "@/utils";

import { Platform } from "@/graphql/gql/graphql";

import { LeaderboardV2 } from "./LeaderboardV2";

type LeaderboardParams = {
  platform: Platform;
  date: Date;
  isDesc: boolean;
};

const defaultParams: LeaderboardParams = {
  platform: Platform.Gns,
  date: now(getServerTimezone()).toDate(),
  isDesc: true,
};

export function LeaderboadWrapper() {
  const router = useRouter();

  const [draft, setDraft] = useState<LeaderboardParams>(defaultParams);
  const [applied, setApplied] = useState<LeaderboardParams>(defaultParams);

  const hasChanges = useMemo(() => {
    return (
      draft.platform !== applied.platform ||
      draft.isDesc !== applied.isDesc ||
      dayjs(draft.date).format("YYYY-MM-DD") !==
        dayjs(applied.date).format("YYYY-MM-DD")
    );
  }, [draft, applied]);

  const handleApply = useCallback(() => {
    setApplied(draft);

    const platformQuery = draft.platform ? `platform=${draft.platform}` : null;

    router.push(`/leaderboards?${platformQuery || ""}`);
  }, [draft, router]);

  const handleChangePlatform: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;
    if (value.trim() !== "") {
      setDraft((prev) => ({ ...prev, platform: value as Platform }));
    }
  };

  return (
    <div className="flex min-w-0 flex-col gap-4">
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

          <DatePicker
            className="w-60"
            size="sm"
            variant="bordered"
            label="Pick a past date"
            value={parseDate(dayjs(draft.date).format("YYYY-MM-DD")) as any}
            onChange={(date) =>
              date &&
              setDraft((prev) => ({
                ...prev,
                date: date.toDate(getServerTimezone()),
              }))
            }
            minValue={parseDate("2024-11-01")}
            maxValue={parseDate(dayjs().format("YYYY-MM-DD"))}
            classNames={{
              inputWrapper: "h-10 rounded-lg border-default-200 bg-content2",
              label: "text-[10px] font-semibold text-neutral-400",
            }}
          />

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

        <div className="flex flex-wrap items-center gap-2">
          <Button
            color="primary"
            variant="shadow"
            onPress={() => router.push("/leaderboards/analyze")}
            size="sm"
            className="h-9 rounded-lg px-5 text-xs font-semibold"
          >
            Analyze
          </Button>
        </div>
      </div>

      <LeaderboardV2
        date={applied.date}
        platform={applied.platform}
        isDesc={applied.isDesc}
      />
    </div>
  );
}
