"use client";

import { useState } from "react";
import { parseDate, type DateValue } from "@internationalized/date";
import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";
import { Platform } from "@/graphql/gql/graphql";
import { usePrebuildSimulationEvaluatorWorker } from "@/app/_hooks/useSimulationEvaluatorWorkers";

type PrebuildWorkerCacheModalProps = {
  worker: { id: string; displayName: string };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const utcDayStart = (value: DateValue) =>
  new Date(`${value.toString()}T00:00:00.000Z`);

const monthlyJobCount = (startedAt: Date, endedAt: Date) => {
  let count = 0;
  const cursor = new Date(startedAt);
  while (cursor < endedAt) {
    count += 1;
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return count;
};

export function PrebuildWorkerCacheModal({
  worker,
  isOpen,
  onOpenChange,
}: PrebuildWorkerCacheModalProps) {
  const [platform, setPlatform] = useState<Platform>(Platform.Gns);
  const [startedAt, setStartedAt] = useState<DateValue>(
    parseDate(dayjs().subtract(30, "day").format("YYYY-MM-DD")),
  );
  const [endedAt, setEndedAt] = useState<DateValue>(
    parseDate(dayjs().format("YYYY-MM-DD")),
  );
  const [prebuild, { loading }] = usePrebuildSimulationEvaluatorWorker();
  // The selected "To" date is inclusive. Cache tasks use an exclusive end.
  const start = utcDayStart(startedAt);
  const end = utcDayStart(endedAt.add({ days: 1 }));
  const jobCount = start < end ? monthlyJobCount(start, end) : 0;

  const submit = async () => {
    if (start >= end) return;

    await prebuild({
      variables: {
        workerId: worker.id,
        platform,
        startedAt: start.toISOString(),
        endedAt: end.toISOString(),
      },
    });
    onOpenChange(false);
  };

  return (
    <StandardModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalHeader className="px-0">Prebuild worker cache</ModalHeader>
      <p className="text-default-500 text-sm">{worker.displayName}</p>
      <Select
        label="Platform"
        selectedKeys={[platform]}
        onChange={(event) => setPlatform(event.target.value as Platform)}
      >
        {Object.values(Platform).map((value) => (
          <SelectItem key={value}>{value}</SelectItem>
        ))}
      </Select>
      <div className="flex gap-3">
        <DatePicker
          label="From"
          value={startedAt}
          onChange={(value) => value && setStartedAt(value)}
        />
        <DatePicker
          label="To"
          value={endedAt}
          onChange={(value) => value && setEndedAt(value)}
        />
      </div>
      <p className="text-default-500 text-sm">
        This will create {jobCount} monthly cache{" "}
        {jobCount === 1 ? "job" : "jobs"}. The selected end date is included.
      </p>
      <ModalFooter className="px-0">
        <Button variant="light" onPress={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          color="primary"
          isDisabled={jobCount === 0}
          isLoading={loading}
          onPress={submit}
        >
          Start prebuild
        </Button>
      </ModalFooter>
    </StandardModal>
  );
}
