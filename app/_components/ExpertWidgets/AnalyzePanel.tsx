"use client";

import { Input, Select, SelectItem } from "@heroui/react";
import { Address } from "viem";
import { useState, ChangeEventHandler } from "react";
import { Platform } from "@/graphql/gql/graphql";
import { PerpEventLogPnlChart } from "../LeaderboardWidgets/PerpEventLogPnlChart/PerpEventLogPnlChart";

export function AnalyzePanel() {
  const [platform, setPlatform] = useState<Platform>(Platform.Gns);
  const [address, setAddress] = useState<string>("");

  const handleChangePlatform: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setPlatform(value as Platform);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center gap-6">
        <Select
          variant="underlined"
          label="Platform"
          selectedKeys={platform ? [platform] : undefined}
          onChange={handleChangePlatform}
          selectionMode="single"
          className="w-50 font-mono"
        >
          {Object.values(Platform).map((item) => (
            <SelectItem key={item}>{item}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Filter by addresses"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <PerpEventLogPnlChart
        address={address as Address}
        platform={platform}
        mode="expert"
        stoppedAt={null}
        startedAt={null}
        endedAt={null}
      />
    </div>
  );
}
