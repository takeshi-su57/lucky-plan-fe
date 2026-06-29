"use client";

import { type Dispatch, type SetStateAction, useMemo, useState } from "react";
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

type RangeEntryState = {
  id: string;
  min: string;
  max: string;
};

type ValueEntryState = {
  id: string;
  value: string;
};

type RangeEntryErrors = Partial<Record<"min" | "max", string>>;

let nextEntryId = 0;

function createEntryId(prefix: string) {
  nextEntryId += 1;
  return `${prefix}-${nextEntryId}`;
}

function createRangeEntry(
  prefix: string,
  initial?: Partial<RangeEntryState>,
): RangeEntryState {
  return {
    id: createEntryId(prefix),
    min: initial?.min ?? "",
    max: initial?.max ?? "",
  };
}

function createValueEntry(prefix: string, value = ""): ValueEntryState {
  return {
    id: createEntryId(prefix),
    value,
  };
}

function RangeEntryCard({
  label,
  entries,
  onAdd,
  onChange,
  onRemove,
  min,
  max,
  step,
  errors,
  emptyMessage,
}: {
  label: string;
  entries: RangeEntryState[];
  onAdd: () => void;
  onChange: (id: string, field: "min" | "max", nextValue: string) => void;
  onRemove: (id: string) => void;
  min?: number;
  max?: number;
  step: number;
  errors: Record<string, RangeEntryErrors>;
  emptyMessage?: string;
}) {
  return (
    <div className="border-default-200 bg-content2/20 rounded-xl border p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-neutral-100">{label}</h3>
        <Button
          size="sm"
          variant="flat"
          color="primary"
          aria-label={`Add ${label} range`}
          onPress={onAdd}
        >
          + Add
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {entries.map((entry) => {
          const entryErrors = errors[entry.id] ?? {};

          return (
            <div
              key={entry.id}
              className="border-default-100 bg-content1/60 rounded-lg border p-3"
            >
              <div className="mb-3 flex justify-end">
                <Button
                  size="sm"
                  color="danger"
                  variant="light"
                  isDisabled={entries.length <= 1}
                  aria-label={`Remove ${label} range`}
                  onPress={() => onRemove(entry.id)}
                >
                  Remove
                </Button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <NumericInput
                  amount={entry.min}
                  onChange={(nextValue) =>
                    onChange(entry.id, "min", nextValue)
                  }
                  label="Min"
                  ariaLabel={`${label} minimum`}
                  min={min}
                  max={max}
                  step={step}
                  errorMessage={entryErrors.min}
                  isInvalid={Boolean(entryErrors.min)}
                />
                <NumericInput
                  amount={entry.max}
                  onChange={(nextValue) =>
                    onChange(entry.id, "max", nextValue)
                  }
                  label="Max"
                  ariaLabel={`${label} maximum`}
                  min={min}
                  max={max}
                  step={step}
                  errorMessage={entryErrors.max}
                  isInvalid={Boolean(entryErrors.max)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {emptyMessage ? (
        <p className="mt-3 text-xs text-danger-300">{emptyMessage}</p>
      ) : null}
    </div>
  );
}

function ValueEntryCard({
  label,
  entries,
  onAdd,
  onChange,
  onRemove,
  min,
  max,
  step,
  errors,
  emptyMessage,
}: {
  label: string;
  entries: ValueEntryState[];
  onAdd: () => void;
  onChange: (id: string, nextValue: string) => void;
  onRemove: (id: string) => void;
  min?: number;
  max?: number;
  step: number;
  errors: Record<string, string | undefined>;
  emptyMessage?: string;
}) {
  return (
    <div className="border-default-200 bg-content2/20 rounded-xl border p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-neutral-100">{label}</h3>
        <Button
          size="sm"
          variant="flat"
          color="primary"
          aria-label={`Add ${label} value`}
          onPress={onAdd}
        >
          + Add
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="border-default-100 bg-content1/60 rounded-lg border p-3"
          >
            <div className="mb-3 flex justify-end">
              <Button
                size="sm"
                color="danger"
                variant="light"
                isDisabled={entries.length <= 1}
                aria-label={`Remove ${label} value`}
                onPress={() => onRemove(entry.id)}
              >
                Remove
              </Button>
            </div>

            <NumericInput
              amount={entry.value}
              onChange={(nextValue) => onChange(entry.id, nextValue)}
              label="Value"
              ariaLabel={label}
              min={min}
              max={max}
              step={step}
              errorMessage={errors[entry.id]}
              isInvalid={Boolean(errors[entry.id])}
            />
          </div>
        ))}
      </div>

      {emptyMessage ? (
        <p className="mt-3 text-xs text-danger-300">{emptyMessage}</p>
      ) : null}
    </div>
  );
}

function validateRangeEntries(
  label: string,
  entries: RangeEntryState[],
  options: { minAllowed?: number; maxAllowed?: number; integer?: boolean } = {},
) {
  const errors: Record<string, RangeEntryErrors> = {};

  entries.forEach((entry) => {
    const min = Number(entry.min);
    const max = Number(entry.max);
    const entryErrors: RangeEntryErrors = {};

    if (entry.min.trim() === "" || Number.isNaN(min)) {
      entryErrors.min = `${label} min is required`;
    } else {
      if (options.minAllowed !== undefined && min < options.minAllowed) {
        entryErrors.min = `${label} min must be at least ${options.minAllowed}`;
      }

      if (options.maxAllowed !== undefined && min > options.maxAllowed) {
        entryErrors.min = `${label} min must be at most ${options.maxAllowed}`;
      }

      if (options.integer && !Number.isInteger(min)) {
        entryErrors.min = `${label} min must be an integer`;
      }
    }

    if (entry.max.trim() === "" || Number.isNaN(max)) {
      entryErrors.max = `${label} max is required`;
    } else {
      if (options.minAllowed !== undefined && max < options.minAllowed) {
        entryErrors.max = `${label} max must be at least ${options.minAllowed}`;
      }

      if (options.maxAllowed !== undefined && max > options.maxAllowed) {
        entryErrors.max = `${label} max must be at most ${options.maxAllowed}`;
      }

      if (options.integer && !Number.isInteger(max)) {
        entryErrors.max = `${label} max must be an integer`;
      }
    }

    if (!entryErrors.min && !entryErrors.max && max < min) {
      entryErrors.max = `${label} max must be greater than or equal to min`;
    }

    if (Object.keys(entryErrors).length > 0) {
      errors[entry.id] = entryErrors;
    }
  });

  return errors;
}

function validateValueEntries(
  label: string,
  entries: ValueEntryState[],
  options: { minAllowed?: number; maxAllowed?: number } = {},
) {
  const errors: Record<string, string | undefined> = {};

  entries.forEach((entry) => {
    const value = Number(entry.value);

    if (entry.value.trim() === "" || Number.isNaN(value)) {
      errors[entry.id] = `${label} value is required`;
      return;
    }

    if (options.minAllowed !== undefined && value < options.minAllowed) {
      errors[entry.id] = `${label} value must be at least ${options.minAllowed}`;
      return;
    }

    if (options.maxAllowed !== undefined && value > options.maxAllowed) {
      errors[entry.id] = `${label} value must be at most ${options.maxAllowed}`;
    }
  });

  return errors;
}

function normalizeRangeEntries(entries: RangeEntryState[]) {
  return entries.map((entry) => ({
    min: Number(entry.min),
    max: Number(entry.max),
  }));
}

function normalizeValueEntries(entries: ValueEntryState[]) {
  return entries.map((entry) => Number(entry.value));
}

export function SimulationCreationPanel({
  compactHeading = false,
}: {
  compactHeading?: boolean;
}) {
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
  const [tradeRanges, setTradeRanges] = useState<RangeEntryState[]>([
    createRangeEntry("trade", { min: "3", max: "10" }),
  ]);
  const [r2Ranges, setR2Ranges] = useState<RangeEntryState[]>([
    createRangeEntry("r2", { min: "0.25", max: "0.5" }),
  ]);
  const [slopeRanges, setSlopeRanges] = useState<RangeEntryState[]>([
    createRangeEntry("slope", { min: "1", max: "3" }),
  ]);
  const [maxLeverageValues, setMaxLeverageValues] = useState<ValueEntryState[]>(
    [createValueEntry("leverage", "10")],
  );

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

    if (tradeRanges.length === 0) {
      result.tradeEmpty = "Add at least one trade range";
    }

    if (r2Ranges.length === 0) {
      result.r2Empty = "Add at least one R2 range";
    }

    if (slopeRanges.length === 0) {
      result.slopeEmpty = "Add at least one slope range";
    }

    if (maxLeverageValues.length === 0) {
      result.maxLeverageEmpty = "Add at least one max leverage value";
    }

    const tradeEntryErrors = validateRangeEntries("Trade", tradeRanges, {
      minAllowed: 1,
      integer: true,
    });
    const r2EntryErrors = validateRangeEntries("R2", r2Ranges, {
      minAllowed: 0,
      maxAllowed: 1,
    });
    const slopeEntryErrors = validateRangeEntries("Slope", slopeRanges, {
      minAllowed: 0,
    });
    const leverageEntryErrors = validateValueEntries(
      "Max Leverage",
      maxLeverageValues,
      {
        minAllowed: 0.01,
      },
    );

    Object.values(tradeEntryErrors).forEach((entryErrors) => {
      Object.values(entryErrors).forEach((message) => {
        if (message) {
          result[`trade-${message}`] = message;
        }
      });
    });

    Object.values(r2EntryErrors).forEach((entryErrors) => {
      Object.values(entryErrors).forEach((message) => {
        if (message) {
          result[`r2-${message}`] = message;
        }
      });
    });

    Object.values(slopeEntryErrors).forEach((entryErrors) => {
      Object.values(entryErrors).forEach((message) => {
        if (message) {
          result[`slope-${message}`] = message;
        }
      });
    });

    Object.values(leverageEntryErrors).forEach((message) => {
      if (message) {
        result[`leverage-${message}`] = message;
      }
    });

    return {
      flat: result,
      tradeEntryErrors,
      r2EntryErrors,
      slopeEntryErrors,
      leverageEntryErrors,
    };
  }, [
    description,
    maxLeverageValues,
    r2Ranges,
    scheduleRange,
    slopeRanges,
    title,
    tradeRanges,
  ]);

  const isDisabled = Object.keys(errors.flat).length > 0;

  const handleRangeEntryChange = (
    setter: Dispatch<SetStateAction<RangeEntryState[]>>,
    id: string,
    field: "min" | "max",
    nextValue: string,
  ) => {
    setter((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, [field]: nextValue } : entry,
      ),
    );
  };

  const handleRangeEntryRemove = (
    setter: Dispatch<SetStateAction<RangeEntryState[]>>,
    id: string,
  ) => {
    setter((current) => current.filter((entry) => entry.id !== id));
  };

  const handleValueEntryChange = (id: string, nextValue: string) => {
    setMaxLeverageValues((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, value: nextValue } : entry,
      ),
    );
  };

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
          trade: normalizeRangeEntries(tradeRanges),
          r2: normalizeRangeEntries(r2Ranges),
          slope: normalizeRangeEntries(slopeRanges),
          maxLeverage: normalizeValueEntries(maxLeverageValues),
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
      {!compactHeading ? (
        <div className="flex flex-col gap-1">
          <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
            Create Simulation Research
          </h1>
          <p className="text-sm text-neutral-400">
            Define explicit research ranges and leverage values, then let the
            backend generate simulations for every valid combination.
          </p>
        </div>
      ) : null}

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
              aria-label="Research title"
              errorMessage={errors.flat.title}
              isInvalid={Boolean(errors.flat.title)}
            />

            <Select
              variant="underlined"
              label="Platform"
              aria-label="Research platform"
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
              aria-label="Research direction"
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
            aria-label="Research description"
            errorMessage={errors.flat.description}
            isInvalid={Boolean(errors.flat.description)}
          />

          <DateRangePicker
            label="Research Duration"
            aria-label="Research duration"
            visibleMonths={2}
            value={scheduleRange as any}
            onChange={setScheduleRange as any}
            maxValue={now(getServerTimezone())}
            timeInputProps={{}}
            errorMessage={errors.flat.scheduleRange}
            isInvalid={Boolean(errors.flat.scheduleRange)}
          />

          <div className="grid gap-4 xl:grid-cols-2">
            <RangeEntryCard
              label="Trades"
              entries={tradeRanges}
              onAdd={() =>
                setTradeRanges((current) => [
                  ...current,
                  createRangeEntry("trade"),
                ])
              }
              onChange={(id, field, nextValue) =>
                handleRangeEntryChange(setTradeRanges, id, field, nextValue)
              }
              onRemove={(id) => handleRangeEntryRemove(setTradeRanges, id)}
              min={1}
              step={1}
              errors={errors.tradeEntryErrors}
              emptyMessage={errors.flat.tradeEmpty}
            />
            <RangeEntryCard
              label="R2"
              entries={r2Ranges}
              onAdd={() =>
                setR2Ranges((current) => [...current, createRangeEntry("r2")])
              }
              onChange={(id, field, nextValue) =>
                handleRangeEntryChange(setR2Ranges, id, field, nextValue)
              }
              onRemove={(id) => handleRangeEntryRemove(setR2Ranges, id)}
              min={0}
              max={1}
              step={0.01}
              errors={errors.r2EntryErrors}
              emptyMessage={errors.flat.r2Empty}
            />
            <RangeEntryCard
              label={`Slope (${direction} uses signed execution behind the scenes)`}
              entries={slopeRanges}
              onAdd={() =>
                setSlopeRanges((current) => [
                  ...current,
                  createRangeEntry("slope"),
                ])
              }
              onChange={(id, field, nextValue) =>
                handleRangeEntryChange(setSlopeRanges, id, field, nextValue)
              }
              onRemove={(id) => handleRangeEntryRemove(setSlopeRanges, id)}
              min={0}
              step={0.1}
              errors={errors.slopeEntryErrors}
              emptyMessage={errors.flat.slopeEmpty}
            />
            <ValueEntryCard
              label="Max Leverage"
              entries={maxLeverageValues}
              onAdd={() =>
                setMaxLeverageValues((current) => [
                  ...current,
                  createValueEntry("leverage"),
                ])
              }
              onChange={handleValueEntryChange}
              onRemove={(id) =>
                setMaxLeverageValues((current) =>
                  current.filter((entry) => entry.id !== id),
                )
              }
              min={0.01}
              step={0.1}
              errors={errors.leverageEntryErrors}
              emptyMessage={errors.flat.maxLeverageEmpty}
            />
          </div>

          <div className="rounded-xl border border-amber-500/45 bg-amber-50 px-4 py-4 text-sm text-amber-950 shadow-[0_10px_30px_rgba(245,158,11,0.10)]">
            <p className="leading-6 font-medium">
              Trades, R2, and slope always use range entries, and each section
              must include at least one item. Max leverage uses exact values,
              and every entry is combined into generated simulations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="solid"
              color="primary"
              size="sm"
              aria-label="Create research"
              isLoading={loading}
              isDisabled={isDisabled || loading}
              onPress={handleSave}
            >
              Create Research
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
