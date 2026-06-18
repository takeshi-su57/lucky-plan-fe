"use client";

import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  DatePicker,
  Select,
  SelectItem,
  Input,
} from "@heroui/react";
import { parseDate, now } from "@internationalized/date";
import dayjs from "dayjs";
import { getServerTimezone } from "@/utils";

import { Platform } from "@/graphql/gql/graphql";

import { LeaderboardV2 } from "./LeaderboardV2";

import { EventLogsModalButton } from "./EventLogsModalButton";

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
  const [searchAddress, setSearchAddress] = useState<string>("");

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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select
            variant="underlined"
            label="Platform"
            selectedKeys={draft.platform ? [draft.platform] : undefined}
            onChange={handleChangePlatform}
            selectionMode="single"
            className="w-50 font-mono"
          >
            {Object.values(Platform).map((item) => (
              <SelectItem key={item}>{item}</SelectItem>
            ))}
          </Select>

          <DatePicker
            className="max-w-71"
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
          />

          <Checkbox
            isSelected={draft.isDesc}
            onValueChange={(isDesc) =>
              setDraft((prev) => ({ ...prev, isDesc }))
            }
          >
            {draft.isDesc ? "Desc" : "Asc"}
          </Checkbox>
        </div>

        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by address"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
          />

          <EventLogsModalButton
            address={searchAddress}
            platform={draft.platform}
          />

          {hasChanges && (
            <Button color="primary" onPress={handleApply}>
              Apply
            </Button>
          )}
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
