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
import { Platform } from "@/graphql/gql/graphql";
import {
  SIMULATION_INFO_FRAGMENT_DOCUMENT,
  useCreateSimulation,
} from "@/app/_hooks/useSimulations";
import { getFragmentData } from "@/graphql/gql";

type NumericFieldKey =
  | "selectedLeaderCount"
  | "minTrades"
  | "minNegativeR2"
  | "standardCollateralUsd"
  | "minCollateralUsd"
  | "maxCollateralUsd"
  | "minRatio"
  | "maxRatio"
  | "maxLeverage"
  | "openFeeRate"
  | "closeFeeRate"
  | "slippageRate";

type NumericFields = Record<NumericFieldKey, string>;

const DEFAULT_NUMERIC_FIELDS: NumericFields = {
  selectedLeaderCount: "10",
  minTrades: "3",
  minNegativeR2: "0.25",
  standardCollateralUsd: "100",
  minCollateralUsd: "10",
  maxCollateralUsd: "500",
  minRatio: "0.05",
  maxRatio: "3",
  maxLeverage: "50",
  openFeeRate: "0",
  closeFeeRate: "0",
  slippageRate: "0",
};

const PLATFORM_OPTIONS = [Platform.Gns, Platform.Gmx, Platform.Avnt];

const NUMBER_FIELD_GROUPS: {
  title: string;
  fields: { key: NumericFieldKey; label: string; step?: string }[];
}[] = [
  {
    title: "Leader Selection",
    fields: [
      { key: "selectedLeaderCount", label: "Selected Leaders", step: "1" },
      { key: "minTrades", label: "Min Trades", step: "1" },
      { key: "minNegativeR2", label: "Min Negative R2", step: "0.01" },
    ],
  },
  {
    title: "Sizing Bounds",
    fields: [
      {
        key: "standardCollateralUsd",
        label: "Standard Collateral USD",
        step: "1",
      },
      { key: "minCollateralUsd", label: "Min Collateral USD", step: "1" },
      { key: "maxCollateralUsd", label: "Max Collateral USD", step: "1" },
      { key: "minRatio", label: "Min Ratio", step: "0.01" },
      { key: "maxRatio", label: "Max Ratio", step: "0.01" },
      { key: "maxLeverage", label: "Max Leverage", step: "1" },
    ],
  },
  {
    title: "Cost Assumptions",
    fields: [
      { key: "openFeeRate", label: "Open Fee Rate", step: "0.0001" },
      { key: "closeFeeRate", label: "Close Fee Rate", step: "0.0001" },
      { key: "slippageRate", label: "Slippage Rate", step: "0.0001" },
    ],
  },
];

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toInteger(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : 0;
}

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
  const [numericFields, setNumericFields] = useState<NumericFields>(
    DEFAULT_NUMERIC_FIELDS,
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

    if (toInteger(numericFields.selectedLeaderCount) <= 0) {
      result.selectedLeaderCount = "Selected leaders must be greater than 0";
    }

    if (toInteger(numericFields.minTrades) <= 0) {
      result.minTrades = "Min trades must be greater than 0";
    }

    if (toNumber(numericFields.maxCollateralUsd) < toNumber(numericFields.minCollateralUsd)) {
      result.maxCollateralUsd = "Max collateral must be at least min collateral";
    }

    if (toNumber(numericFields.maxRatio) < toNumber(numericFields.minRatio)) {
      result.maxRatio = "Max ratio must be at least min ratio";
    }

    return result;
  }, [description, numericFields, scheduleRange, title]);

  const isDisabled = Object.keys(errors).length > 0;

  const handleNumericFieldChange = (key: NumericFieldKey, value: string) => {
    setNumericFields((current) => ({ ...current, [key]: value }));
  };

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
          selectedLeaderCount: toInteger(numericFields.selectedLeaderCount),
          minTrades: toInteger(numericFields.minTrades),
          minNegativeR2: toNumber(numericFields.minNegativeR2),
          standardCollateralUsd: toNumber(numericFields.standardCollateralUsd),
          minCollateralUsd: toNumber(numericFields.minCollateralUsd),
          maxCollateralUsd: toNumber(numericFields.maxCollateralUsd),
          minRatio: toNumber(numericFields.minRatio),
          maxRatio: toNumber(numericFields.maxRatio),
          maxLeverage: toNumber(numericFields.maxLeverage),
          openFeeRate: toNumber(numericFields.openFeeRate),
          closeFeeRate: toNumber(numericFields.closeFeeRate),
          slippageRate: toNumber(numericFields.slippageRate),
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
    <div className="flex max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
          Create Auto Simulation
        </h1>
        <p className="text-sm text-neutral-400">
          Configure a walk-forward simulation that selects leaders and creates
          daily simulation plans in the background.
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

          {NUMBER_FIELD_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-neutral-300">
                {group.title}
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {group.fields.map((field) => (
                  <NumericInput
                    key={field.key}
                    amount={numericFields[field.key]}
                    onChange={(value) =>
                      handleNumericFieldChange(field.key, value)
                    }
                    label={field.label}
                    min={0}
                    step={field.step}
                    errorMessage={errors[field.key]}
                    isInvalid={Boolean(errors[field.key])}
                  />
                ))}
              </div>
            </div>
          ))}

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
