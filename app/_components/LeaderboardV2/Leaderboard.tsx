"use client";

import { ChangeEventHandler, useState } from "react";
import {
  Card,
  CardBody,
  Spinner,
  Select,
  SelectItem,
  DatePicker,
  Input,
} from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";
import { Address } from "viem";
import { parseDate, now } from "@internationalized/date";
import dayjs from "dayjs";
import { getServerTimezone } from "@/utils";

import { Platform, PnlSnapshotKind } from "@/graphql/gql/graphql";

import {
  useGetPnlSnapshotsV2,
  useIsPnlSnapshotV2Initialized,
} from "@/app-hooks/useHistory";

import { PerpEventLogPnlChart } from "./PerpEventLogPnlChart/PerpEventLogPnlChart";
import { EventLogsModalButton } from "./EventLogsModalButton";

const availableKind = [PnlSnapshotKind.Month, PnlSnapshotKind.AllTime];

const timestampGapByPnlSnapshotKind = {
  [PnlSnapshotKind.Day]: 24 * 60 * 60 * 1000,
  [PnlSnapshotKind.Week]: 7 * 24 * 60 * 60 * 1000,
  [PnlSnapshotKind.Month]: 30 * 24 * 60 * 60 * 1000,
  [PnlSnapshotKind.ThreeMonth]: 3 * 30 * 24 * 60 * 60 * 1000,
  [PnlSnapshotKind.AllTime]: 10 * 365 * 24 * 60 * 60 * 1000,
};

export type LeaderboardProps = {
  initialKind: PnlSnapshotKind;
  initialPlatform: Platform;
  onChangeParams: (kind: PnlSnapshotKind, platform: Platform) => void;
  hideTags: boolean;
};

export function Leaderboard({
  initialKind,
  initialPlatform,
  onChangeParams,
  hideTags,
}: LeaderboardProps) {
  const [kind, setKind] = useState<PnlSnapshotKind>(initialKind);
  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const [date, setDate] = useState<Date>(now(getServerTimezone()).toDate());
  const [searchAddress, setSearchAddress] = useState<string>("");

  const { pnlSnapshots, fetchMore, hasMore, loading } = useGetPnlSnapshotsV2(
    dayjs(date).format("YYYY-MM-DD"),
    kind,
    platform,
  );
  const {
    data: isPnlSnapshotInitialized,
    loading: isPnlSnapshotInitializedLoading,
  } = useIsPnlSnapshotV2Initialized(dayjs(date).format("YYYY-MM-DD"), platform);

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

          <DatePicker
            className="max-w-[284px]"
            label="Pick a past date"
            value={parseDate(dayjs(date).format("YYYY-MM-DD"))}
            onChange={(date) => setDate(date.toDate(getServerTimezone()))}
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

      {isPnlSnapshotInitializedLoading ? (
        <div className="flex w-full items-center justify-center">
          <Spinner color="warning" size="lg" />
        </div>
      ) : null}

      {!isPnlSnapshotInitialized?.isPnlSnapshotV2Initialized ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 text-primary-400 hover:text-primary-300">
            <p className="text-lg font-bold text-red-400">
              PNL snapshot is not initialized
            </p>
            <p className="text-sm text-neutral-400">
              We kindly ask you to{" "}
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL}?subject=Initialize%20PNL%20Snapshot&body=Please%20initialize%20PNL%20snapshot%20for%20the%20leaderboard.`}
                className="text-primary"
              >
                reach out to our admin
              </a>{" "}
              for assistance in initializing the PNL snapshot. Thank you for
              your understanding!
            </p>
          </div>
        </div>
      ) : (
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
                  range={{
                    from: dayjs(date)
                      .subtract(timestampGapByPnlSnapshotKind[kind], "ms")
                      .toDate(),
                    to: date,
                  }}
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
      )}
    </div>
  );
}
