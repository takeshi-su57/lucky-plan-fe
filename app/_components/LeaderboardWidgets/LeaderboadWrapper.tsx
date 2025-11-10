"use client";

import { ChangeEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { DatePicker, Select, SelectItem, Input } from "@nextui-org/react";
import { parseDate, now } from "@internationalized/date";
import dayjs from "dayjs";
import { getServerTimezone } from "@/utils";

import { Platform, PnlSnapshotKind } from "@/graphql/gql/graphql";

import { LeaderboardV2 } from "./LeaderboardV2";

import { EventLogsModalButton } from "./EventLogsModalButton";

const availableKind = [PnlSnapshotKind.Month, PnlSnapshotKind.AllTime];

export function LeaderboadWrapper() {
  const router = useRouter();

  const [kind, setKind] = useState<PnlSnapshotKind>(PnlSnapshotKind.Month);
  const [platform, setPlatform] = useState<Platform>(Platform.Gns);
  const [date, setDate] = useState<Date>(now(getServerTimezone()).toDate());
  const [searchAddress, setSearchAddress] = useState<string>("");

  const handleChangeParams = (kind: PnlSnapshotKind, platform: Platform) => {
    const kindQuery = kind ? `kind=${kind}` : null;
    const platformQuery = platform ? `platform=${platform}` : null;

    router.push(
      `/leaderboards?${kindQuery || ""}${kindQuery && platformQuery && "&"}${platformQuery || ""}`,
    );
  };

  const handleChangeKind: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setKind(value as PnlSnapshotKind);

      handleChangeParams(value as PnlSnapshotKind, platform);
    }
  };

  const handleChangePlatform: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setPlatform(value as Platform);

      handleChangeParams(kind, value as Platform);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select
            variant="underlined"
            label="Platform"
            selectedKeys={platform ? [platform] : undefined}
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
            selectedKeys={kind ? [kind] : undefined}
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
            value={parseDate(dayjs(date).format("YYYY-MM-DD")) as any}
            onChange={(date) =>
              date && (setDate(date.toDate(getServerTimezone())) as any)
            }
            minValue={parseDate("2024-11-01")}
            maxValue={parseDate(dayjs().format("YYYY-MM-DD"))}
          />
        </div>

        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by address"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
          />

          <EventLogsModalButton address={searchAddress} platform={platform} />
        </div>
      </div>

      <LeaderboardV2
        date={date}
        kind={kind}
        platform={platform}
        hideTags={false}
      />
    </div>
  );
}
