"use client";

import { ChangeEventHandler, useState } from "react";
import { Card, CardBody, Spinner, Select, SelectItem } from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";
import { Address } from "viem";
import dayjs from "dayjs";

import { Platform, PnlSnapshotKind } from "@/graphql/gql/graphql";

import { useGetPnlSnapshotsV2 } from "@/app-hooks/useHistory";

import { PerpEventLogPnlChart } from "./PerpEventLogPnlChart/PerpEventLogPnlChart";

const availableKind = [PnlSnapshotKind.Month, PnlSnapshotKind.AllTime];

export type LeaderboardProps = {
  endDate: Date;
  initialKind: PnlSnapshotKind;
  initialPlatform: Platform;
  onChangeParams: (kind: PnlSnapshotKind, platform: Platform) => void;
  hideTags: boolean;
};

export function Leaderboard({
  endDate,
  initialKind,
  initialPlatform,
  onChangeParams,
  hideTags,
}: LeaderboardProps) {
  const [kind, setKind] = useState<PnlSnapshotKind>(initialKind);
  const [platform, setPlatform] = useState<Platform>(initialPlatform);

  const { pnlSnapshots, fetchMore, hasMore, loading } = useGetPnlSnapshotsV2(
    dayjs(endDate).format("YYYY-MM-DD"),
    kind,
    platform,
  );

  const handleChangeKind: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setKind(value as PnlSnapshotKind);

      onChangeParams(value as PnlSnapshotKind, platform);
    }
  };

  const handleChangePlatform: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setPlatform(value as Platform);

      onChangeParams(kind, value as Platform);
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
        </div>
      </div>

      <Card>
        <CardBody>
          <Virtuoso
            style={{ height: 700 }}
            data={pnlSnapshots}
            itemContent={(_, snapshot) => (
              <PerpEventLogPnlChart
                address={snapshot.address as Address}
                perpTradingEventLogs={snapshot.perpTradingEventLogs}
                hideTags={hideTags}
                range={{ to: endDate }}
              />
            )}
            endReached={() => hasMore && !loading && fetchMore()}
            components={{
              Footer: () => (
                <div className="flex w-full items-center justify-center">
                  {hasMore === false ? (
                    <span className="font-sans text-neutral-400/40">
                      No More Results Available
                    </span>
                  ) : loading ? (
                    <Spinner color="warning" size="lg" />
                  ) : null}
                </div>
              ),
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
