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
import { getServerTimezone } from "@/utils";
import { usePrebuildSimulationEvaluatorWorker } from "@/app/_hooks/useSimulationEvaluatorWorkers";

type PrebuildWorkerCacheModalProps = {
  worker: { id: string; displayName: string };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
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

  const submit = async () => {
    const start = startedAt.toDate(getServerTimezone());
    const end = endedAt.toDate(getServerTimezone());
    end.setDate(end.getDate() + 1);
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
      <ModalFooter className="px-0">
        <Button variant="light" onPress={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button color="primary" isLoading={loading} onPress={submit}>
          Start prebuild
        </Button>
      </ModalFooter>
    </StandardModal>
  );
}
