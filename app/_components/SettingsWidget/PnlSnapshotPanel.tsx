"use client";

import { useMemo, useState } from "react";
import { Button, Card, CardBody, Chip, DatePicker } from "@nextui-org/react";
import {
  DateValue,
  parseDate,
  getLocalTimeZone,
} from "@internationalized/date";
import dayjs from "dayjs";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import {
  useGetPnlSnapshotInitializedFlag,
  useBuildPnlSnapshots,
} from "@/app/_hooks/useHistory";

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

export function PnlSnapshotPanel() {
  const { data } = useGetPnlSnapshotInitializedFlag();
  const { buildPnlSnapshots, loading: buildPnlSnapshotsLoading } =
    useBuildPnlSnapshots();

  const [selectedDate, setSelectedDate] = useState<DateValue | null>(
    parseDate(dayjs(new Date()).format("YYYY-MM-DD")),
  );

  const handleBuildPnlSnapshots = () => {
    if (!selectedDate) {
      return;
    }

    buildPnlSnapshots({
      variables: { endDate: selectedDate.toDate(getLocalTimeZone()) },
    });
  };

  const exists = useMemo(() => {
    if (!data || !selectedDate) {
      return false;
    }
    return data.getPnlSnapshotInitializedFlag.some(
      (flag) =>
        flag.dateStr ===
        dayjs(selectedDate.toDate(getLocalTimeZone())).format("YYYY-MM-DD"),
    );
  }, [data, selectedDate]);

  const rows = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getPnlSnapshotInitializedFlag.map((flag) => ({
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
  }, [data]);

  return (
    <Card>
      <CardBody>
        <div className="flex flex-row items-center gap-4">
          <DatePicker
            className="max-w-[284px]"
            label="Pick a date"
            value={selectedDate}
            onChange={setSelectedDate}
          />

          <Button
            onClick={handleBuildPnlSnapshots}
            isLoading={buildPnlSnapshotsLoading}
            color="primary"
            isDisabled={buildPnlSnapshotsLoading}
          >
            {exists ? "Re-Run" : "Build"}
          </Button>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          classNames={{
            tr: "font-mono cursor-pointer",
            td: "py-3 ",
            th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
          }}
        />
      </CardBody>
    </Card>
  );
}
