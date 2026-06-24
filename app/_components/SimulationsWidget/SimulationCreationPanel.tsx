"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  DateRangePicker,
  Input,
  RangeValue,
  Select,
  SelectItem,
} from "@heroui/react";
import { now } from "@internationalized/date";
import type { DateValue } from "@react-types/datepicker";

import { getServerTimezone } from "@/utils";
import { Platform } from "@/graphql/gql/graphql";
import {
  SIMULATION_INFO_FRAGMENT_DOCUMENT,
  useCreateSimulation,
} from "@/app/_hooks/useSimulations";
import { getFragmentData } from "@/graphql/gql";

const PLATFORM_OPTIONS = [Platform.Gns, Platform.Gmx, Platform.Avnt];

export function SimulationCreationPanel() {
  const router = useRouter();
  const { createSimulation, loading } = useCreateSimulation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState<Platform>(Platform.Gns);
  const [scheduleRange, setScheduleRange] =
    useState<RangeValue<DateValue> | null>({
      start: now(getServerTimezone()).subtract({ days: 30 }),
      end: now(getServerTimezone()).subtract({ days: 1 }),
    });

  const errors = useMemo(() => {
    const result: Record<string, string> = {};

    if (title.trim() === "") {
      result.title = "Please enter title";
    }

    if (description.trim() === "") {
      result.description = "Please enter description";
    }

    if (!scheduleRange) {
      result.scheduleRange = "Please select a valid date range";
    }

    return result;
  }, [description, scheduleRange, title]);

  const isDisabled = Object.keys(errors).length > 0;

  const handleSave = async () => {
    if (isDisabled || !scheduleRange) {
      return;
    }

    const { data } = await createSimulation({
      variables: {
        input: {
          title: title.trim(),
          description: description.trim(),
          platform,
          startAt: scheduleRange.start.toDate(getServerTimezone()),
          endAt: scheduleRange.end.toDate(getServerTimezone()),
        },
      },
    });

    const simulation = data?.createSimulation
      ? getFragmentData(
          SIMULATION_INFO_FRAGMENT_DOCUMENT,
          data.createSimulation,
        )
      : null;

    if (simulation?.id) {
      router.push("/simulations");
    }
  };

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
          Create Auto Simulation
        </h1>
        <p className="text-sm text-neutral-400">
          Create a walk-forward simulation. The backend will use the standard
          selection, sizing, and cost defaults for each daily plan.
        </p>
      </div>

      <Card
        shadow="none"
        className="border-default-200 bg-content1 rounded-lg border"
      >
        <CardBody className="gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              variant="underlined"
              value={title}
              onValueChange={setTitle}
              label="Title"
              errorMessage={errors.title}
              isInvalid={Boolean(errors.title)}
            />

            <Select
              variant="underlined"
              label="Platform"
              selectedKeys={[platform]}
              onChange={(event) => setPlatform(event.target.value as Platform)}
            >
              {PLATFORM_OPTIONS.map((item) => (
                <SelectItem key={item}>{item}</SelectItem>
              ))}
            </Select>
          </div>

          <Input
            variant="underlined"
            value={description}
            onValueChange={setDescription}
            label="Description"
            errorMessage={errors.description}
            isInvalid={Boolean(errors.description)}
          />

          <DateRangePicker
            label="Simulation Duration"
            visibleMonths={2}
            value={scheduleRange as any}
            onChange={setScheduleRange as any}
            maxValue={now(getServerTimezone())}
            timeInputProps={{}}
            errorMessage={errors.scheduleRange}
            isInvalid={Boolean(errors.scheduleRange)}
          />

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="solid"
              color="primary"
              size="sm"
              isLoading={loading}
              isDisabled={isDisabled || loading}
              onPress={handleSave}
            >
              Create Simulation
            </Button>

            <Button
              variant="light"
              color="primary"
              size="sm"
              isDisabled={loading}
              onPress={() => router.push("/simulations/create-plan")}
            >
              Create Manual Plan
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
