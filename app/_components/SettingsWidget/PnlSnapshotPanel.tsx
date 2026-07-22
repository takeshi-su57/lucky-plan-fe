"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  Chip,
  DatePicker,
  Pagination,
  Select,
  SelectItem,
} from "@heroui/react";
import { DateValue, parseDate } from "@internationalized/date";
import dayjs from "dayjs";

import { getServerTimezone } from "@/utils";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import {
  useGetPnlSnapshotV2InitializedFlag,
  useBuildPnlSnapshotsV2,
  useInitializePnlSnapshotV2,
  useDynamicBuildPnlSnapshotsV2,
} from "@/app-hooks/useHistory";
import { Platform } from "@/graphql/gql/graphql";

const columns: TableColumnProps[] = [
  {
    id: "dateStr",
    component: "Date",
  },
  {
    id: "isInit",
    component: "Initialized",
  },
];

const SNAPSHOT_PAGE_SIZE = 50;

export function PnlSnapshotPanel() {
  const {
    buildPnlSnapshotsV2: v2BuildPnlSnapshots,
    loading: v2BuildPnlSnapshotsLoading,
  } = useBuildPnlSnapshotsV2();
  const {
    dynamicBuildPnlSnapshotsV2: v2DynamicBuildPnlSnapshots,
    loading: v2DynamicBuildPnlSnapshotsLoading,
  } = useDynamicBuildPnlSnapshotsV2();
  const {
    initializePnlSnapshotV2: v2InitializePnlSnapshot,
    loading: v2InitializePnlSnapshotLoading,
  } = useInitializePnlSnapshotV2();

  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    Platform.Gns,
  );
  const [snapshotPage, setSnapshotPage] = useState(1);

  const { data: v2Data } = useGetPnlSnapshotV2InitializedFlag(selectedPlatform);

  const [selectedDate, setSelectedDate] = useState<DateValue | null>(
    parseDate(dayjs(new Date()).format("YYYY-MM-DD")),
  );

  const handleBuildPnlSnapshotsV2 = () => {
    if (!selectedDate) {
      return;
    }

    v2BuildPnlSnapshots({
      variables: {
        dateStr: dayjs(selectedDate.toDate(getServerTimezone())).format(
          "YYYY-MM-DD",
        ),
        isForceBuild: true,
        platform: selectedPlatform,
      },
    });
  };

  const handleDynamicBuildPnlSnapshotsV2 = () => {
    if (!selectedDate) {
      return;
    }

    v2DynamicBuildPnlSnapshots({
      variables: {
        dateStr: dayjs(selectedDate.toDate(getServerTimezone())).format(
          "YYYY-MM-DD",
        ),
        platform: selectedPlatform,
      },
    });
  };

  const handleInitializePnlSnapshot = () => {
    if (!selectedDate) {
      return;
    }

    v2InitializePnlSnapshot({
      variables: {
        beginingDate: selectedDate.toDate(getServerTimezone()),
        isForceBuild: false,
        platform: selectedPlatform,
      },
    });
  };

  const handleForceInitializePnlSnapshot = () => {
    if (!selectedDate) {
      return;
    }

    v2InitializePnlSnapshot({
      variables: {
        beginingDate: selectedDate.toDate(getServerTimezone()),
        isForceBuild: true,
        platform: selectedPlatform,
      },
    });
  };

  const v2Exists = useMemo(() => {
    if (!v2Data || !selectedDate) {
      return false;
    }
    return v2Data.getPnlSnapshotV2InitializedFlag.some(
      (flag) =>
        flag.dateStr ===
        dayjs(selectedDate.toDate(getServerTimezone())).format("YYYY-MM-DD"),
    );
  }, [v2Data, selectedDate]);

  const snapshotFlags = v2Data?.getPnlSnapshotV2InitializedFlag ?? [];
  const snapshotTotalPages = Math.max(
    1,
    Math.ceil(snapshotFlags.length / SNAPSHOT_PAGE_SIZE),
  );
  const safeSnapshotPage = Math.min(snapshotPage, snapshotTotalPages);

  const v2Rows = useMemo(() => {
    if (!v2Data) {
      return [];
    }
    const offset = (safeSnapshotPage - 1) * SNAPSHOT_PAGE_SIZE;
    return v2Data.getPnlSnapshotV2InitializedFlag
      .slice(offset, offset + SNAPSHOT_PAGE_SIZE)
      .map((flag) => ({
        id: `${flag.dateStr}`,
        className: "group",
        data: {
          dateStr: {
            component: flag.dateStr,
          },
          isInit: {
            component: flag.isInit ? (
              <Chip color="primary" className="text-xs">
                Initialized
              </Chip>
            ) : (
              <Chip color="danger" className="text-xs">
                Not Initialized
              </Chip>
            ),
          },
        },
      }));
  }, [v2Data, safeSnapshotPage]);

  return (
    <>
      <Card>
        <CardBody>
          <div className="flex flex-row items-center gap-4">
            <Select
              isRequired
              className="max-w-xs"
              label="Platform"
              placeholder="Select a platform"
              selectedKeys={[selectedPlatform]}
              onChange={(e) => {
                setSelectedPlatform(e.target.value as Platform);
                setSnapshotPage(1);
              }}
              selectionMode="single"
            >
              {Object.values(Platform).map((platform) => (
                <SelectItem key={platform}>{platform}</SelectItem>
              ))}
            </Select>

            <DatePicker
              className="max-w-71"
              label="Pick a date"
              value={selectedDate as any}
              onChange={(date) => date && (setSelectedDate(date as any) as any)}
            />

            <ButtonWithConfirm
              onPress={handleBuildPnlSnapshotsV2}
              isLoading={v2BuildPnlSnapshotsLoading}
              color="primary"
              isDisabled={
                v2BuildPnlSnapshotsLoading || v2InitializePnlSnapshotLoading
              }
            >
              {v2Exists ? "Re-Build" : "Build"}
            </ButtonWithConfirm>

            <ButtonWithConfirm
              onPress={handleDynamicBuildPnlSnapshotsV2}
              isLoading={v2DynamicBuildPnlSnapshotsLoading}
              color="primary"
              isDisabled={
                v2DynamicBuildPnlSnapshotsLoading ||
                v2InitializePnlSnapshotLoading
              }
            >
              {v2Exists ? "Re-Build Dynamic" : "Build Dynamic"}
            </ButtonWithConfirm>

            <ButtonWithConfirm
              onPress={handleInitializePnlSnapshot}
              isLoading={v2InitializePnlSnapshotLoading}
              color="primary"
              isDisabled={
                v2BuildPnlSnapshotsLoading || v2InitializePnlSnapshotLoading
              }
            >
              Sequence Initialization
            </ButtonWithConfirm>

            <ButtonWithConfirm
              onPress={handleForceInitializePnlSnapshot}
              isLoading={v2InitializePnlSnapshotLoading}
              color="primary"
              isDisabled={
                v2BuildPnlSnapshotsLoading || v2InitializePnlSnapshotLoading
              }
            >
              Force Initialization
            </ButtonWithConfirm>
          </div>

          <DataTable
            columns={columns}
            rows={v2Rows}
            classNames={{
              tr: "font-mono cursor-pointer",
              td: "py-3 ",
              th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
            }}
          />
          {snapshotFlags.length > SNAPSHOT_PAGE_SIZE ? (
            <div className="flex justify-center pt-4">
              <Pagination
                showControls
                page={safeSnapshotPage}
                total={snapshotTotalPages}
                onChange={setSnapshotPage}
              />
            </div>
          ) : null}
        </CardBody>
      </Card>
    </>
  );
}
