"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  Chip,
  DatePicker,
  Tab,
  Tabs,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { DateValue, parseDate } from "@internationalized/date";
import dayjs from "dayjs";

import { getServerTimezone } from "@/utils";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import {
  useGetPnlSnapshotInitializedFlag,
  useBuildPnlSnapshots,
  useInitializePnlSnapshot,
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

type TabType = "v1" | "v2";

export function PnlSnapshotPanel() {
  const { data: v1Data } = useGetPnlSnapshotInitializedFlag();
  const {
    buildPnlSnapshots: v1BuildPnlSnapshots,
    loading: v1BuildPnlSnapshotsLoading,
  } = useBuildPnlSnapshots();
  const {
    initializePnlSnapshot: v1InitializePnlSnapshot,
    loading: v1InitializePnlSnapshotLoading,
  } = useInitializePnlSnapshot();

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

  const [selected, setSelected] = useState<TabType>("v1");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    Platform.Gns,
  );

  const { data: v2Data } = useGetPnlSnapshotV2InitializedFlag(selectedPlatform);

  const [selectedDate, setSelectedDate] = useState<DateValue | null>(
    parseDate(dayjs(new Date()).format("YYYY-MM-DD")),
  );

  const handleForceBuildPnlSnapshotsV1 = () => {
    if (!selectedDate) {
      return;
    }

    v1BuildPnlSnapshots({
      variables: {
        dateStr: dayjs(selectedDate.toDate(getServerTimezone())).format(
          "YYYY-MM-DD",
        ),
      },
    });
  };

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

    if (selected === "v1") {
      v1InitializePnlSnapshot({
        variables: {
          beginingDate: selectedDate.toDate(getServerTimezone()),
          isForceBuild: false,
        },
      });
    } else {
      v2InitializePnlSnapshot({
        variables: {
          beginingDate: selectedDate.toDate(getServerTimezone()),
          isForceBuild: false,
          platform: selectedPlatform,
        },
      });
    }
  };

  const handleForceInitializePnlSnapshot = () => {
    if (!selectedDate) {
      return;
    }

    if (selected === "v1") {
      v1InitializePnlSnapshot({
        variables: {
          beginingDate: selectedDate.toDate(getServerTimezone()),
          isForceBuild: true,
        },
      });
    } else {
      v2InitializePnlSnapshot({
        variables: {
          beginingDate: selectedDate.toDate(getServerTimezone()),
          isForceBuild: true,
          platform: selectedPlatform,
        },
      });
    }
  };

  const v1Exists = useMemo(() => {
    if (!v1Data || !selectedDate) {
      return false;
    }
    return v1Data.getPnlSnapshotInitializedFlag.some(
      (flag) =>
        flag.dateStr ===
        dayjs(selectedDate.toDate(getServerTimezone())).format("YYYY-MM-DD"),
    );
  }, [v1Data, selectedDate]);

  const v1Rows = useMemo(() => {
    if (!v1Data) {
      return [];
    }
    return v1Data.getPnlSnapshotInitializedFlag.map((flag) => ({
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
  }, [v1Data]);

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

  const v2Rows = useMemo(() => {
    if (!v2Data) {
      return [];
    }
    return v2Data.getPnlSnapshotV2InitializedFlag.map((flag) => ({
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
  }, [v2Data]);

  return (
    <>
      <Tabs
        aria-label="users-table-tabs"
        selectedKey={selected}
        onSelectionChange={(value) => value && setSelected(value as TabType)}
      >
        <Tab key="v1" title="V1" />
        <Tab key="v2" title="V2" />
      </Tabs>

      <Card>
        <CardBody>
          <div className="flex flex-row items-center gap-4">
            {selected === "v2" ? (
              <Select
                isRequired
                className="max-w-xs"
                label="Platform"
                placeholder="Select a platform"
                selectedKeys={[selectedPlatform]}
                onChange={(e) =>
                  setSelectedPlatform(e.target.value as Platform)
                }
                selectionMode="single"
              >
                {Object.values(Platform).map((platform) => (
                  <SelectItem key={platform}>{platform}</SelectItem>
                ))}
              </Select>
            ) : null}

            <DatePicker
              className="max-w-[284px]"
              label="Pick a date"
              value={selectedDate}
              onChange={setSelectedDate}
            />

            {selected === "v1" ? (
              <ButtonWithConfirm
                onClick={handleForceBuildPnlSnapshotsV1}
                isLoading={v1BuildPnlSnapshotsLoading}
                color="primary"
                isDisabled={
                  v1BuildPnlSnapshotsLoading || v1InitializePnlSnapshotLoading
                }
              >
                {v1Exists ? "Re-Run" : "Build"}
              </ButtonWithConfirm>
            ) : null}

            {selected === "v2" ? (
              <ButtonWithConfirm
                onClick={handleBuildPnlSnapshotsV2}
                isLoading={v2BuildPnlSnapshotsLoading}
                color="primary"
                isDisabled={
                  v2BuildPnlSnapshotsLoading || v2InitializePnlSnapshotLoading
                }
              >
                {v2Exists ? "Re-Build" : "Build"}
              </ButtonWithConfirm>
            ) : null}

            {selected === "v2" ? (
              <ButtonWithConfirm
                onClick={handleDynamicBuildPnlSnapshotsV2}
                isLoading={v2DynamicBuildPnlSnapshotsLoading}
                color="primary"
                isDisabled={
                  v2DynamicBuildPnlSnapshotsLoading ||
                  v2InitializePnlSnapshotLoading
                }
              >
                {v2Exists ? "Re-Build Dynamic" : "Build Dynamic"}
              </ButtonWithConfirm>
            ) : null}

            <ButtonWithConfirm
              onClick={handleInitializePnlSnapshot}
              isLoading={
                selected === "v1"
                  ? v1InitializePnlSnapshotLoading
                  : v2InitializePnlSnapshotLoading
              }
              color="primary"
              isDisabled={
                selected === "v1"
                  ? v1BuildPnlSnapshotsLoading || v1InitializePnlSnapshotLoading
                  : v2BuildPnlSnapshotsLoading || v2InitializePnlSnapshotLoading
              }
            >
              Sequence Initialization
            </ButtonWithConfirm>

            <ButtonWithConfirm
              onClick={handleForceInitializePnlSnapshot}
              isLoading={
                selected === "v1"
                  ? v1InitializePnlSnapshotLoading
                  : v2InitializePnlSnapshotLoading
              }
              color="primary"
              isDisabled={
                selected === "v1"
                  ? v1BuildPnlSnapshotsLoading || v1InitializePnlSnapshotLoading
                  : v2BuildPnlSnapshotsLoading || v2InitializePnlSnapshotLoading
              }
            >
              Force Initialization
            </ButtonWithConfirm>
          </div>

          <DataTable
            columns={columns}
            rows={selected === "v1" ? v1Rows : v2Rows}
            classNames={{
              tr: "font-mono cursor-pointer",
              td: "py-3 ",
              th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
            }}
          />
        </CardBody>
      </Card>
    </>
  );
}
