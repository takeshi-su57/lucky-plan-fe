"use client";

import { useState } from "react";
import { Button, Input, DateRangePicker } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import type { RangeValue } from "@react-types/shared";
import type { DateValue } from "@react-types/datepicker";

import { StandardModal } from "@/components/modals/StandardModal";

import { useCreatePlan } from "@/app/_hooks/usePlan";

export type CreatePlanModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (value: boolean) => void;
};

export function CreatePlanModal({
  isOpen,
  onClose,
  onOpenChange,
}: CreatePlanModalProps) {
  const { createPlan, loading: createPlanLoading } = useCreatePlan();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [scheduleRange, setScheduleRange] =
    useState<RangeValue<DateValue> | null>({
      start: now(getLocalTimeZone()),
      end: now(getLocalTimeZone()).add({ days: 1 }),
    });

  let titleHelper = "";
  let descriptionHelper = "";
  let scheduledEndHelper = "";

  if (title.trim() === "") {
    titleHelper = "Please enter title";
  }

  if (description.trim() === "") {
    descriptionHelper = "Please enter description";
  }

  if (scheduleRange === null) {
    scheduledEndHelper = "Please select a valid date range";
  }

  const isDisabled =
    titleHelper.trim() !== "" ||
    descriptionHelper.trim() !== "" ||
    scheduledEndHelper.trim() !== "";

  const handleConfirm = () => {
    const scheduledStart = scheduleRange?.start?.toDate(getLocalTimeZone());
    const scheduledEnd = scheduleRange?.end?.toDate(getLocalTimeZone());

    if (!scheduledStart || !scheduledEnd) {
      return;
    }

    createPlan({
      variables: {
        createPlanInput: {
          title,
          description,
          scheduledStart,
          scheduledEnd,
        },
      },
    });

    onClose();
  };

  return (
    <StandardModal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <div className="flex flex-col gap-8">
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
          Create New Plan
        </h1>

        <div className="flex flex-col gap-8">
          <Input
            variant="underlined"
            value={title}
            onValueChange={setTitle}
            label="Title"
            errorMessage={titleHelper}
          />

          <Input
            variant="underlined"
            value={description}
            onValueChange={setDescription}
            label="Description"
            errorMessage={descriptionHelper}
          />

          <DateRangePicker
            label="Plan Duration"
            visibleMonths={2}
            value={scheduleRange}
            onChange={setScheduleRange}
            minValue={now(getLocalTimeZone()).subtract({ days: 1 })}
            timeInputProps={{}}
            errorMessage={scheduledEndHelper}
          />
        </div>

        <Button
          onClick={handleConfirm}
          isLoading={createPlanLoading}
          color="primary"
          isDisabled={isDisabled || createPlanLoading}
        >
          Create a plan
        </Button>
      </div>
    </StandardModal>
  );
}
