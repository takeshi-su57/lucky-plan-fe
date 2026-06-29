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

import { NumericInput } from "@/components/inputs/NumericInput";
import { getServerTimezone } from "@/utils";
import { BotMode, Platform } from "@/graphql/gql/graphql";
import {
  SIMULATION_RESEARCH_INFO_FRAGMENT_DOCUMENT,
  useCreateSimulationResearch,
} from "@/app/_hooks/useSimulations";
import { getFragmentData } from "@/graphql/gql";

const PLATFORM_OPTIONS = [Platform.Gns, Platform.Gmx, Platform.Avnt];
const DIRECTION_OPTIONS = [BotMode.Default, BotMode.Reversed];

type RangeState = {
  min: string;
  max: string;
  gap: string;
};

function RangeTriplet({
  label,
  value,
  onChange,
  min,
  max,
  step,
  errors,
}: {
  label: string;
  value: RangeState;
  onChange: (next: RangeState) => void;
  min?: number;
  max?: number;
  step: number;
  errors: Partial<Record<keyof RangeState, string>>;
}) {
  return (
    <div className="border-default-200 bg-content2/20 rounded-lg border p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-neutral-200">{label}</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <NumericInput
          amount={value.min}
          onChange={(next) => onChange({ ...value, min: next })}
          label="Min"
          min={min}
          max={max}
          step={step}
          errorMessage={errors.min}
          isInvalid={Boolean(errors.min)}
        />
        <NumericInput
          amount={value.max}
          onChange={(next) => onChange({ ...value, max: next })}
          label="Max"
          min={min}
          max={max}
          step={step}
          errorMessage={errors.max}
          isInvalid={Boolean(errors.max)}
        />
        <NumericInput
          amount={value.gap}
          onChange={(next) => onChange({ ...value, gap: next })}
          label="Gap"
          min={step}
          step={step}
          errorMessage={errors.gap}
          isInvalid={Boolean(errors.gap)}
        />
      </div>
    </div>
  );
}

function parseRange(range: RangeState) {
  return {
    min: Number(range.min),
    max: Number(range.max),
    gap: Number(range.gap),
  };
}

function validateRange(
  label: string,
  value: RangeState,
  options: { minAllowed?: number; maxAllowed?: number; integer?: boolean } = {},
) {
  const errors: Partial<Record<keyof RangeState, string>> = {};
  const min = Number(value.min);
  const max = Number(value.max);
  const gap = Number(value.gap);

  if (value.min.trim() === "" || Number.isNaN(min)) {
    errors.min = `${label} min is required`;
  } else if (options.minAllowed !== undefined && min < options.minAllowed) {
    errors.min = `${label} min must be at least ${options.minAllowed}`;
  } else if (options.maxAllowed !== undefined && min > options.maxAllowed) {
    errors.min = `${label} min must be at most ${options.maxAllowed}`;
  } else if (options.integer && !Number.isInteger(min)) {
    errors.min = `${label} min must be an integer`;
  }

  if (value.max.trim() === "" || Number.isNaN(max)) {
    errors.max = `${label} max is required`;
  } else if (options.minAllowed !== undefined && max < options.minAllowed) {
    errors.max = `${label} max must be at least ${options.minAllowed}`;
  } else if (options.maxAllowed !== undefined && max > options.maxAllowed) {
    errors.max = `${label} max must be at most ${options.maxAllowed}`;
  } else if (options.integer && !Number.isInteger(max)) {
    errors.max = `${label} max must be an integer`;
  }

  if (value.gap.trim() === "" || Number.isNaN(gap)) {
    errors.gap = `${label} gap is required`;
  } else if (gap <= 0) {
    errors.gap = `${label} gap must be greater than 0`;
  } else if (options.integer && !Number.isInteger(gap)) {
    errors.gap = `${label} gap must be an integer`;
  }

  if (!errors.min && !errors.max && max < min) {
    errors.max = `${label} max must be greater than or equal to min`;
  }

  return errors;
}

export function SimulationCreationPanel() {
  const router = useRouter();
  const { createSimulationResearch, loading } = useCreateSimulationResearch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState<Platform>(Platform.Gns);
  const [direction, setDirection] = useState<BotMode>(BotMode.Reversed);
  const [scheduleRange, setScheduleRange] =
    useState<RangeValue<DateValue> | null>({
      start: now(getServerTimezone()).subtract({ days: 30 }),
      end: now(getServerTimezone()).subtract({ days: 1 }),
    });
  const [minTrades, setMinTrades] = useState<RangeState>({
    min: "3",
    max: "10",
    gap: "1",
  });
  const [maxTrades, setMaxTrades] = useState<RangeState>({
    min: "10",
    max: "30",
    gap: "5",
  });
  const [minR2, setMinR2] = useState<RangeState>({
    min: "0.25",
    max: "0.5",
    gap: "0.05",
  });
  const [maxR2, setMaxR2] = useState<RangeState>({
    min: "0.5",
    max: "0.9",
    gap: "0.1",
  });
  const [minSlope, setMinSlope] = useState<RangeState>({
    min: "1",
    max: "3",
    gap: "1",
  });
  const [maxSlope, setMaxSlope] = useState<RangeState>({
    min: "3",
    max: "8",
    gap: "1",
  });
  const [maxLeverage, setMaxLeverage] = useState<RangeState>({
    min: "10",
    max: "50",
    gap: "10",
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

    const rangeErrors = {
      minTrades: validateRange("Min Trades", minTrades, {
        minAllowed: 1,
        integer: true,
      }),
      maxTrades: validateRange("Max Trades", maxTrades, {
        minAllowed: 1,
        integer: true,
      }),
      minR2: validateRange("Min R2", minR2, { minAllowed: 0, maxAllowed: 1 }),
      maxR2: validateRange("Max R2", maxR2, { minAllowed: 0, maxAllowed: 1 }),
      minSlope: validateRange("Min Slope", minSlope, { minAllowed: 0 }),
      maxSlope: validateRange("Max Slope", maxSlope, { minAllowed: 0 }),
      maxLeverage: validateRange("Max Leverage", maxLeverage, {
        minAllowed: 0.01,
      }),
    };

    Object.entries(rangeErrors).forEach(([key, value]) => {
      Object.entries(value).forEach(([field, message]) => {
        if (message) {
          result[`${key}.${field}`] = message;
        }
      });
    });

    return result;
  }, [
    description,
    maxLeverage,
    maxR2,
    maxSlope,
    maxTrades,
    minR2,
    minSlope,
    minTrades,
    scheduleRange,
    title,
  ]);

  const isDisabled = Object.keys(errors).length > 0;

  const handleSave = async () => {
    if (isDisabled || !scheduleRange) {
      return;
    }

    const { data } = await createSimulationResearch({
      variables: {
        input: {
          title: title.trim(),
          description: description.trim(),
          platform,
          startAt: scheduleRange.start.toDate(getServerTimezone()),
          endAt: scheduleRange.end.toDate(getServerTimezone()),
          direction,
          minTrades: parseRange(minTrades),
          maxTrades: parseRange(maxTrades),
          minR2: parseRange(minR2),
          maxR2: parseRange(maxR2),
          minSlope: parseRange(minSlope),
          maxSlope: parseRange(maxSlope),
          maxLeverage: parseRange(maxLeverage),
        },
      },
    });

    const research = data?.createSimulationResearch
      ? getFragmentData(
          SIMULATION_RESEARCH_INFO_FRAGMENT_DOCUMENT,
          data.createSimulationResearch,
        )
      : null;

    if (research?.id) {
      router.push(`/simulations/research/${research.id}`);
    }
  };

  return (
    <div className="flex max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
          Create Simulation Research
        </h1>
        <p className="text-sm text-neutral-400">
          Define one research and let the backend generate concrete simulations
          for every valid parameter combination.
        </p>
      </div>

      <Card
        shadow="none"
        className="border-default-200 bg-content1 rounded-lg border"
      >
        <CardBody className="gap-6">
          <div className="grid gap-4 md:grid-cols-3">
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

            <Select
              variant="underlined"
              label="Direction"
              selectedKeys={[direction]}
              onChange={(event) => setDirection(event.target.value as BotMode)}
            >
              {DIRECTION_OPTIONS.map((item) => (
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
            label="Research Duration"
            visibleMonths={2}
            value={scheduleRange as any}
            onChange={setScheduleRange as any}
            maxValue={now(getServerTimezone())}
            timeInputProps={{}}
            errorMessage={errors.scheduleRange}
            isInvalid={Boolean(errors.scheduleRange)}
          />

          <div className="grid gap-4 xl:grid-cols-2">
            <RangeTriplet
              label="Min Trades"
              value={minTrades}
              onChange={setMinTrades}
              min={1}
              step={1}
              errors={{
                min: errors["minTrades.min"],
                max: errors["minTrades.max"],
                gap: errors["minTrades.gap"],
              }}
            />
            <RangeTriplet
              label="Max Trades"
              value={maxTrades}
              onChange={setMaxTrades}
              min={1}
              step={1}
              errors={{
                min: errors["maxTrades.min"],
                max: errors["maxTrades.max"],
                gap: errors["maxTrades.gap"],
              }}
            />
            <RangeTriplet
              label="Min R2"
              value={minR2}
              onChange={setMinR2}
              min={0}
              max={1}
              step={0.01}
              errors={{
                min: errors["minR2.min"],
                max: errors["minR2.max"],
                gap: errors["minR2.gap"],
              }}
            />
            <RangeTriplet
              label="Max R2"
              value={maxR2}
              onChange={setMaxR2}
              min={0}
              max={1}
              step={0.01}
              errors={{
                min: errors["maxR2.min"],
                max: errors["maxR2.max"],
                gap: errors["maxR2.gap"],
              }}
            />
            <RangeTriplet
              label={`Min Slope (${direction} input uses absolute values)`}
              value={minSlope}
              onChange={setMinSlope}
              min={0}
              step={0.1}
              errors={{
                min: errors["minSlope.min"],
                max: errors["minSlope.max"],
                gap: errors["minSlope.gap"],
              }}
            />
            <RangeTriplet
              label={`Max Slope (${direction} input uses absolute values)`}
              value={maxSlope}
              onChange={setMaxSlope}
              min={0}
              step={0.1}
              errors={{
                min: errors["maxSlope.min"],
                max: errors["maxSlope.max"],
                gap: errors["maxSlope.gap"],
              }}
            />
            <RangeTriplet
              label="Max Leverage"
              value={maxLeverage}
              onChange={setMaxLeverage}
              min={0.01}
              step={0.1}
              errors={{
                min: errors["maxLeverage.min"],
                max: errors["maxLeverage.max"],
                gap: errors["maxLeverage.gap"],
              }}
            />
          </div>

          <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Valid simulations are generated only when{" "}
            <code>minTrades &lt;= maxTrades</code>,{" "}
            <code>minR2 &lt;= maxR2</code>, and{" "}
            <code>minSlope &lt;= maxSlope</code> after direction-based slope
            signing.
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="solid"
              color="primary"
              size="sm"
              isLoading={loading}
              isDisabled={isDisabled || loading}
              onPress={handleSave}
            >
              Create Research
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
