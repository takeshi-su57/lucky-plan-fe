import { useEffect, useState } from "react";
import { Button, RangeValue, Input, DateRangePicker } from "@nextui-org/react";
import { now } from "@internationalized/date";
import type { DateValue } from "@react-types/datepicker";

import { getServerTimezone } from "@/utils";

export type PlanMetadata = {
  title: string;
  description: string;
  scheduleRange: RangeValue<DateValue>;
};

export type PlanMetadataFormProps = {
  planMetadata: PlanMetadata | null;
  onChangePlanMetadata: (params: PlanMetadata) => void;
  onNextStep: () => void;
};

export function PlanMetadataForm({
  planMetadata,
  onChangePlanMetadata,
  onNextStep,
}: PlanMetadataFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [scheduleRange, setScheduleRange] =
    useState<RangeValue<DateValue> | null>({
      start: now(getServerTimezone()),
      end: now(getServerTimezone()).add({ days: 2 }),
    });

  useEffect(() => {
    if (planMetadata) {
      setTitle(planMetadata.title);
      setDescription(planMetadata.description);
      setScheduleRange(planMetadata.scheduleRange);
    } else {
      setTitle("");
      setDescription("");
      setScheduleRange({
        start: now(getServerTimezone()),
        end: now(getServerTimezone()).add({ days: 2 }),
      });
    }
  }, [planMetadata]);

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
    if (isDisabled || scheduleRange === null) {
      return;
    }

    onChangePlanMetadata({
      title,
      description,
      scheduleRange,
    });

    onNextStep();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
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
          minValue={now(getServerTimezone()).subtract({ days: 1 })}
          timeInputProps={{}}
          errorMessage={scheduledEndHelper}
        />
      </div>

      <div className="flex flex-row items-center gap-2">
        <Button
          isDisabled={isDisabled}
          variant="solid"
          onClick={handleConfirm}
          color="primary"
          size="sm"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
