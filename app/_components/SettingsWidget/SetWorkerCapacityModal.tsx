"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Chip, Input, ModalFooter, ModalHeader } from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";

type SetWorkerCapacityModalProps = {
  worker: {
    id: string;
    displayName: string;
    activeCapacity: number;
    desiredCapacity: number;
  };
  isOpen: boolean;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (capacity: number) => Promise<unknown>;
};

export function SetWorkerCapacityModal({
  worker,
  isOpen,
  isLoading,
  onOpenChange,
  onSubmit,
}: SetWorkerCapacityModalProps) {
  const [value, setValue] = useState(String(worker.desiredCapacity));

  useEffect(() => {
    if (isOpen) setValue(String(worker.desiredCapacity));
  }, [isOpen, worker.desiredCapacity]);

  const capacity = Number(value);
  const error = useMemo(() => {
    if (!value) return "Choose a capacity between 1 and 64.";
    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 64) {
      return "Capacity must be a whole number from 1 to 64.";
    }
    return null;
  }, [capacity, value]);

  const submit = async () => {
    if (error) return;
    await onSubmit(capacity);
    onOpenChange(false);
  };

  return (
    <StandardModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalHeader className="px-0 pb-0">Worker capacity</ModalHeader>
      <div className="rounded-xl border border-primary-200 bg-primary-50/70 p-4 dark:bg-primary-950/25">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-semibold">{worker.displayName}</p>
            <p className="text-default-600 mt-1 text-sm">
              Set how many evaluation tasks this client can process in parallel.
            </p>
          </div>
          <Chip color="primary" variant="flat" className="shrink-0">
            {worker.activeCapacity} active
          </Chip>
        </div>
      </div>

      <Input
        autoFocus
        type="number"
        label="Target capacity"
        description="The parent adjusts its child evaluation processes to reach this target."
        min={1}
        max={64}
        step={1}
        value={value}
        onValueChange={setValue}
        isInvalid={Boolean(error)}
        errorMessage={error ?? undefined}
        endContent={<span className="text-default-500 text-sm">slots</span>}
      />

      <div className="text-default-500 flex items-center justify-between rounded-lg bg-default-100 px-3 py-2 text-xs">
        <span>Current target</span>
        <span className="text-foreground font-semibold">
          {worker.desiredCapacity} slots
        </span>
      </div>

      <ModalFooter className="px-0 pt-2">
        <Button variant="light" onPress={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          color="primary"
          isLoading={isLoading}
          isDisabled={Boolean(error) || capacity === worker.desiredCapacity}
          onPress={submit}
        >
          Update capacity
        </Button>
      </ModalFooter>
    </StandardModal>
  );
}
