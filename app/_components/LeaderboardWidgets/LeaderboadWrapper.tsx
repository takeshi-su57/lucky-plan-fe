"use client";

import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  DatePicker,
  Select,
  SelectItem,
  Input,
} from "@heroui/react";
import { parseDate, now } from "@internationalized/date";
import dayjs from "dayjs";
import { getServerTimezone } from "@/utils";

import { Platform, PnlSnapshotKind } from "@/graphql/gql/graphql";

import { LeaderboardV2 } from "./LeaderboardV2";

import { EventLogsModalButton } from "./EventLogsModalButton";

const availableKind = [PnlSnapshotKind.Month, PnlSnapshotKind.AllTime];

type LeaderboardParams = {
  kind: PnlSnapshotKind;
  platform: Platform;
  date: Date;
  minSlope: number;
  minR2: number;
};

const defaultParams: LeaderboardParams = {
  kind: PnlSnapshotKind.Month,
  platform: Platform.Gns,
  date: now(getServerTimezone()).toDate(),
  minSlope: 0.5,
  minR2: 0.85,
};

export function LeaderboadWrapper() {
  const router = useRouter();

  const [draft, setDraft] = useState<LeaderboardParams>(defaultParams);
  const [applied, setApplied] = useState<LeaderboardParams>(defaultParams);
  const [searchAddress, setSearchAddress] = useState<string>("");

  const hasChanges = useMemo(() => {
    return (
      draft.kind !== applied.kind ||
      draft.platform !== applied.platform ||
      dayjs(draft.date).format("YYYY-MM-DD") !==
        dayjs(applied.date).format("YYYY-MM-DD") ||
      draft.minSlope !== applied.minSlope ||
      draft.minR2 !== applied.minR2
    );
  }, [draft, applied]);

  const handleApply = useCallback(() => {
    setApplied(draft);

    const kindQuery = draft.kind ? `kind=${draft.kind}` : null;
    const platformQuery = draft.platform
      ? `platform=${draft.platform}`
      : null;

    router.push(
      `/leaderboards?${kindQuery || ""}${kindQuery && platformQuery ? "&" : ""}${platformQuery || ""}`,
    );
  }, [draft, router]);

  const handleChangeKind: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;
    if (value.trim() !== "") {
      setDraft((prev) => ({ ...prev, kind: value as PnlSnapshotKind }));
    }
  };

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
            className="w-[200px] font-mono"
          >
            {Object.values(Platform).map((item) => (
              <SelectItem key={item}>{item}</SelectItem>
            ))}
          </Select>

          <Select
            variant="underlined"
            label="Before"
            selectedKeys={draft.kind ? [draft.kind] : undefined}
            onChange={handleChangeKind}
            selectionMode="single"
            className="w-[200px] font-mono"
          >
            {availableKind.map((item) => (
              <SelectItem key={item}>{item}</SelectItem>
            ))}
          </Select>

          <DatePicker
            className="max-w-[284px]"
            label="Pick a past date"
            value={
              parseDate(dayjs(draft.date).format("YYYY-MM-DD")) as any
            }
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
        </div>

        <div className="flex items-center gap-4">
          <Input
            className="w-fit"
            variant="underlined"
            label="Min Slope"
            type="number"
            value={`${draft.minSlope}`}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!Number.isNaN(v))
                setDraft((prev) => ({ ...prev, minSlope: v }));
            }}
          />

          <Input
            className="w-fit"
            variant="underlined"
            label="Min R2"
            type="number"
            value={`${draft.minR2}`}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!Number.isNaN(v))
                setDraft((prev) => ({ ...prev, minR2: v }));
            }}
          />

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
            <Button color="primary" onClick={handleApply}>
              Apply
            </Button>
          )}
        </div>
      </div>

      <LeaderboardV2
        date={applied.date}
        kind={applied.kind}
        platform={applied.platform}
        hideTags={false}
        minSlope={applied.minSlope}
        minR2={applied.minR2}
      />
    </div>
  );
}
