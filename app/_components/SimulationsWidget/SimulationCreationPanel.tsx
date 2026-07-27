"use client";

import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useMemo,
  useEffect,
  useRef,
  useState,
} from "react";
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
  Textarea,
} from "@heroui/react";
import { now, parseDate } from "@internationalized/date";
import type { DateValue } from "@react-types/datepicker";

import { NumericInput } from "@/components/inputs/NumericInput";
import { getServerTimezone } from "@/utils";
import {
  BotMode,
  Platform,
  SimulationScoreFormular,
  SimulationSizingFormular,
} from "@/graphql/gql/graphql";
import {
  SIMULATION_RESEARCH_INFO_FRAGMENT_DOCUMENT,
  useCreateSimulationResearch,
  useCreateSimulationResearchFromSimulation,
  useGetSimulation,
} from "@/app/_hooks/useSimulations";
import { getFragmentData } from "@/graphql/gql";

const PLATFORM_OPTIONS = [Platform.Gns, Platform.Gmx, Platform.Avnt];
const DIRECTION_OPTIONS = [BotMode.Default, BotMode.Reversed];
const SCORE_FORMULAR_OPTIONS = [SimulationScoreFormular.RiskAdjustedCopyScore];
const SIZING_FORMULAR_OPTIONS = [
  SimulationSizingFormular.ScoreScaledCollateralSizing,
];
const MAX_SIMULATIONS_PER_RESEARCH = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

type RangeEntryState = {
  id: string;
  min: string;
  max: string;
};

type RangeEntryErrors = Partial<Record<"min" | "max", string>>;

type ImportedRange = { min: number; max: number };
type ImportedRangeGroup = { ranges: ImportedRange[] };
export type ImportedResearchConfiguration = {
  version: 2;
  sourceSimulationId?: number;
  title: string;
  description: string;
  platform: Platform;
  startAt: string;
  endAt: string;
  days: number;
  gapDays: number;
  direction: BotMode;
  trade: ImportedRangeGroup[];
  r2: ImportedRangeGroup[];
  slope: ImportedRangeGroup[];
  collateral: ImportedRangeGroup[];
  size: ImportedRangeGroup[];
  leverage: ImportedRangeGroup[];
  leaderExecutionCollateral: ImportedRangeGroup[];
  leaderExecutionSize: ImportedRangeGroup[];
  leaderExecutionLeverage: ImportedRangeGroup[];
  followerRiskSize: ImportedRangeGroup[];
  followerRiskCollateral: ImportedRangeGroup[];
  score: ImportedRangeGroup[];
  scoreFormular: SimulationScoreFormular;
  sizingFormular: SimulationSizingFormular;
};

const EXPERT_CONFIGURATION_TEMPLATE = {
  version: 2,
  sourceSimulationId: null,
  title: "GNS reversed momentum refinement",
  description: "Refined after reviewing a previous simulation research report.",
  platform: Platform.Gns,
  startAt: "2026-01-01",
  endAt: "2026-06-30",
  days: 7,
  gapDays: 1,
  direction: BotMode.Reversed,
  trade: [{ ranges: [{ min: 3, max: 10 }] }],
  r2: [{ ranges: [{ min: 0.25, max: 0.5 }] }],
  slope: [{ ranges: [{ min: 1, max: 3 }] }],
  collateral: [{ ranges: [{ min: 10, max: 500 }] }],
  size: [{ ranges: [{ min: 0, max: 1000000000 }] }],
  leverage: [{ ranges: [{ min: 10, max: 50 }] }],
  leaderExecutionCollateral: [{ ranges: [{ min: 50, max: 150 }] }],
  leaderExecutionSize: [{ ranges: [{ min: 1500, max: 3000 }] }],
  leaderExecutionLeverage: [{ ranges: [{ min: 18, max: 25 }] }],
  followerRiskSize: [{ ranges: [{ min: 50, max: 500 }] }],
  followerRiskCollateral: [{ ranges: [{ min: 10, max: 100 }] }],
  score: [{ ranges: [{ min: 0.5, max: 0.8 }] }],
  scoreFormular: SimulationScoreFormular.RiskAdjustedCopyScore,
  sizingFormular: SimulationSizingFormular.ScoreScaledCollateralSizing,
  guide:
    "sourceSimulationId is optional: omit it or set it to null for normal research; set it to a completed simulation ID for source-driven Layer 2/3 research. Each field is a list of range groups. One group containing multiple ranges means variants; multiple groups with one range each means the ranges match together across fields.",
} as const;

const AI_CONFIGURATION_PROMPT = `Create a LuckyPlans simulation research configuration as valid JSON.

Return JSON only: no Markdown fences, commentary, or comments. Use version 2 and include every field in the example below.

Source-driven workflow:
- Omit sourceSimulationId or set it to null for normal research.
- Set sourceSimulationId to the ID of a completed simulation to reuse its Layer 1 evaluation. In this mode, the source simulation controls platform, direction, date range, plan days, gap days, and Layer 1 ranges. The configuration's title, description, and Layer 2/3 ranges still apply.

Range grouping:
- Each parameter is an array of { "ranges": [{ "min": number, "max": number }] } groups.
- One group with several ranges means alternatives/variants.
- Several groups with one range each means corresponding ranges are matched together across fields.
- Use non-negative values; trade ranges use positive integers; r2 and score must be between 0 and 1.

For a professional batch, return an array of configurations in creation order. Each item can have its own sourceSimulationId. For the standard creator, return exactly one object.

Example:
${JSON.stringify(EXPERT_CONFIGURATION_TEMPLATE, null, 2)}`;

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

function RangeEntryCard({
  label,
  entries,
  onAdd,
  onChange,
  onRemove,
  rangesAreAlternatives,
  onToggleAlternatives,
  min,
  max,
  step,
  errors,
  emptyMessage,
  isDisabled = false,
}: {
  label: string;
  entries: RangeEntryState[];
  onAdd: () => void;
  onChange: (id: string, field: "min" | "max", nextValue: string) => void;
  onRemove: (id: string) => void;
  rangesAreAlternatives: boolean;
  onToggleAlternatives: () => void;
  min?: number;
  max?: number;
  step: number;
  errors: Record<string, RangeEntryErrors>;
  emptyMessage?: string;
  isDisabled?: boolean;
}) {
  return (
    <div className="border-default-200 bg-content2/20 rounded-xl border p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-neutral-100">{label}</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="flat"
            isDisabled={isDisabled}
            onPress={onToggleAlternatives}
          >
            {rangesAreAlternatives
              ? "Ranges match together"
              : "Ranges are variants"}
          </Button>
          <Button
            size="sm"
            variant="flat"
            color="primary"
            isDisabled={isDisabled}
            aria-label={`Add ${label} range`}
            onPress={onAdd}
          >
            + Add
          </Button>
        </div>
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
                  isDisabled={isDisabled || entries.length <= 1}
                  aria-label={`Remove ${label} range`}
                  onPress={() => onRemove(entry.id)}
                >
                  Remove
                </Button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <NumericInput
                  amount={entry.min}
                  onChange={(nextValue) => onChange(entry.id, "min", nextValue)}
                  label="Min"
                  ariaLabel={`${label} minimum`}
                  min={min}
                  max={max}
                  step={step}
                  errorMessage={entryErrors.min}
                  isInvalid={Boolean(entryErrors.min)}
                  isDisabled={isDisabled}
                />
                <NumericInput
                  amount={entry.max}
                  onChange={(nextValue) => onChange(entry.id, "max", nextValue)}
                  label="Max"
                  ariaLabel={`${label} maximum`}
                  min={min}
                  max={max}
                  step={step}
                  errorMessage={entryErrors.max}
                  isInvalid={Boolean(entryErrors.max)}
                  isDisabled={isDisabled}
                />
              </div>
            </div>
          );
        })}
      </div>

      {emptyMessage ? (
        <p className="text-danger-300 mt-3 text-xs">{emptyMessage}</p>
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

function normalizeRangeEntries(entries: RangeEntryState[]) {
  return entries.map((entry) => ({
    min: Number(entry.min),
    max: Number(entry.max),
  }));
}

function normalizeRangeGroups(
  entries: RangeEntryState[],
  rangesAreAlternatives: boolean,
) {
  const ranges = normalizeRangeEntries(entries);
  return rangesAreAlternatives
    ? [{ ranges }]
    : ranges.map((range) => ({ ranges: [range] }));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseImportedRangeGroups(
  value: unknown,
  field: string,
): ImportedRangeGroup[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${field} must contain at least one range group`);
  }

  const groups = value.map((group, groupIndex) => {
    if (
      !isRecord(group) ||
      !Array.isArray(group.ranges) ||
      group.ranges.length === 0
    ) {
      throw new Error(
        `${field}[${groupIndex}].ranges must contain at least one range`,
      );
    }

    return {
      ranges: group.ranges.map((range, rangeIndex) => {
        if (
          !isRecord(range) ||
          typeof range.min !== "number" ||
          typeof range.max !== "number" ||
          !Number.isFinite(range.min) ||
          !Number.isFinite(range.max)
        ) {
          throw new Error(
            `${field}[${groupIndex}].ranges[${rangeIndex}] must have numeric min and max values`,
          );
        }

        return { min: range.min, max: range.max };
      }),
    };
  });

  const representsAlternatives = groups.length === 1;
  const representsMatchingRanges = groups.every(
    (group) => group.ranges.length === 1,
  );

  if (!representsAlternatives && !representsMatchingRanges) {
    throw new Error(
      `${field} must use one group for variants or one range per group for matching ranges`,
    );
  }

  return groups;
}

export function getImportedConfigurationSimulationCount(
  configuration: Pick<
    ImportedResearchConfiguration,
    | "trade"
    | "r2"
    | "slope"
    | "collateral"
    | "size"
    | "leverage"
    | "score"
    | "leaderExecutionCollateral"
    | "leaderExecutionSize"
    | "leaderExecutionLeverage"
  >,
) {
  return Object.values({
    trade: configuration.trade,
    r2: configuration.r2,
    slope: configuration.slope,
    collateral: configuration.collateral,
    size: configuration.size,
    leverage: configuration.leverage,
    score: configuration.score,
    leaderExecutionCollateral: configuration.leaderExecutionCollateral,
    leaderExecutionSize: configuration.leaderExecutionSize,
    leaderExecutionLeverage: configuration.leaderExecutionLeverage,
  }).reduce(
    (count, groups) =>
      count * (groups.length === 1 ? groups[0].ranges.length : groups.length),
    1,
  );
}

export function parseImportedResearchConfiguration(
  rawText: string,
): ImportedResearchConfiguration {
  let value: unknown;

  try {
    value = JSON.parse(rawText);
  } catch {
    throw new Error("Configuration must be valid JSON");
  }

  if (!isRecord(value)) {
    throw new Error("Configuration must be a JSON object");
  }

  const requiredStrings = ["title", "description", "startAt", "endAt"] as const;
  for (const field of requiredStrings) {
    if (typeof value[field] !== "string" || value[field].trim() === "") {
      throw new Error(`${field} must be a non-empty string`);
    }
  }

  if (value.version !== 2) {
    throw new Error("Configuration version must be 2");
  }
  if (
    value.sourceSimulationId !== undefined &&
    value.sourceSimulationId !== null &&
    (typeof value.sourceSimulationId !== "number" ||
      !Number.isInteger(value.sourceSimulationId) ||
      value.sourceSimulationId <= 0)
  ) {
    throw new Error(
      "sourceSimulationId must be a positive integer when provided",
    );
  }

  if (!PLATFORM_OPTIONS.includes(value.platform as Platform)) {
    throw new Error("platform must be Gns, Gmx, or Avnt");
  }
  if (!DIRECTION_OPTIONS.includes(value.direction as BotMode)) {
    throw new Error("direction must be Default or Reversed");
  }
  if (
    !SCORE_FORMULAR_OPTIONS.includes(
      value.scoreFormular as SimulationScoreFormular,
    )
  ) {
    throw new Error("scoreFormular is not supported");
  }
  if (
    !SIZING_FORMULAR_OPTIONS.includes(
      value.sizingFormular as SimulationSizingFormular,
    )
  ) {
    throw new Error("sizingFormular is not supported");
  }
  if (
    typeof value.days !== "number" ||
    !Number.isInteger(value.days) ||
    value.days <= 0
  ) {
    throw new Error("days must be a positive integer");
  }
  if (
    typeof value.gapDays !== "number" ||
    !Number.isInteger(value.gapDays) ||
    value.gapDays < 0
  ) {
    throw new Error("gapDays must be a non-negative integer");
  }

  let startAt: DateValue;
  let endAt: DateValue;
  try {
    startAt = parseDate((value.startAt as string).slice(0, 10));
    endAt = parseDate((value.endAt as string).slice(0, 10));
  } catch {
    throw new Error("startAt and endAt must be ISO dates such as 2026-01-31");
  }

  if (startAt.compare(endAt) >= 0) {
    throw new Error("endAt must be after startAt");
  }

  const configuration = {
    version: 2 as const,
    sourceSimulationId:
      value.sourceSimulationId === null
        ? undefined
        : (value.sourceSimulationId as number | undefined),
    title: value.title as string,
    description: value.description as string,
    platform: value.platform as Platform,
    startAt: value.startAt as string,
    endAt: value.endAt as string,
    days: value.days as number,
    gapDays: value.gapDays as number,
    direction: value.direction as BotMode,
    trade: parseImportedRangeGroups(value.trade, "trade"),
    r2: parseImportedRangeGroups(value.r2, "r2"),
    slope: parseImportedRangeGroups(value.slope, "slope"),
    collateral: parseImportedRangeGroups(value.collateral, "collateral"),
    size: parseImportedRangeGroups(value.size, "size"),
    leverage: parseImportedRangeGroups(value.leverage, "leverage"),
    leaderExecutionCollateral: parseImportedRangeGroups(
      value.leaderExecutionCollateral,
      "leaderExecutionCollateral",
    ),
    leaderExecutionSize: parseImportedRangeGroups(
      value.leaderExecutionSize,
      "leaderExecutionSize",
    ),
    leaderExecutionLeverage: parseImportedRangeGroups(
      value.leaderExecutionLeverage,
      "leaderExecutionLeverage",
    ),
    followerRiskSize: parseImportedRangeGroups(
      value.followerRiskSize,
      "followerRiskSize",
    ),
    followerRiskCollateral: parseImportedRangeGroups(
      value.followerRiskCollateral,
      "followerRiskCollateral",
    ),
    score: parseImportedRangeGroups(value.score, "score"),
    scoreFormular: value.scoreFormular as SimulationScoreFormular,
    sizingFormular: value.sizingFormular as SimulationSizingFormular,
  };

  const validateRanges = (
    field: string,
    groups: ImportedRangeGroup[],
    options: { min?: number; max?: number; integer?: boolean } = {},
  ) => {
    for (const group of groups) {
      for (const range of group.ranges) {
        if (range.max < range.min) {
          throw new Error(`${field} max must be greater than or equal to min`);
        }
        if (options.min !== undefined && range.min < options.min) {
          throw new Error(`${field} min must be at least ${options.min}`);
        }
        if (options.max !== undefined && range.max > options.max) {
          throw new Error(`${field} max must be at most ${options.max}`);
        }
        if (
          options.integer &&
          (!Number.isInteger(range.min) || !Number.isInteger(range.max))
        ) {
          throw new Error(`${field} ranges must use integers`);
        }
      }
    }
  };

  validateRanges("trade", configuration.trade, { min: 1, integer: true });
  validateRanges("r2", configuration.r2, { min: 0, max: 1 });
  validateRanges("slope", configuration.slope, { min: 0 });
  validateRanges("collateral", configuration.collateral, { min: 0 });
  validateRanges("size", configuration.size, { min: 0 });
  validateRanges("leverage", configuration.leverage, { min: 0 });
  validateRanges("score", configuration.score, { min: 0, max: 1 });
  validateRanges(
    "leaderExecutionCollateral",
    configuration.leaderExecutionCollateral,
    { min: 0 },
  );
  validateRanges("leaderExecutionSize", configuration.leaderExecutionSize, {
    min: 0,
  });
  validateRanges(
    "leaderExecutionLeverage",
    configuration.leaderExecutionLeverage,
    { min: 0 },
  );

  const simulationCount =
    getImportedConfigurationSimulationCount(configuration);

  if (simulationCount > MAX_SIMULATIONS_PER_RESEARCH) {
    throw new Error(
      `Configuration would generate ${simulationCount} simulations; the maximum is ${MAX_SIMULATIONS_PER_RESEARCH}`,
    );
  }

  return configuration;
}

function countPlanWindows(
  startAt: Date,
  endAt: Date,
  days: number,
  gapDays: number,
) {
  if (days <= 0 || gapDays < 0 || startAt.getTime() >= endAt.getTime()) {
    return 0;
  }

  let count = 0;
  let cursor = startAt.getTime();
  const end = endAt.getTime();
  const windowMs = days * DAY_MS;
  const gapMs = gapDays * DAY_MS;

  while (cursor < end) {
    const nextCursor = cursor + windowMs;

    if (nextCursor > end) {
      break;
    }

    count += 1;
    cursor = nextCursor + gapMs;
  }

  return count;
}

export function SimulationCreationPanel({
  compactHeading = false,
  sourceSimulationId,
  initialConfigurationText,
  hideConfigurationImporter = false,
  onCreated,
}: {
  compactHeading?: boolean;
  sourceSimulationId?: number;
  initialConfigurationText?: string;
  hideConfigurationImporter?: boolean;
  onCreated?: (researchId: number) => void;
}) {
  const router = useRouter();
  const { createSimulationResearch, loading } = useCreateSimulationResearch();
  const {
    createSimulationResearchFromSimulation,
    loading: sourceCreationLoading,
  } = useCreateSimulationResearchFromSimulation();
  const configurationFileInputRef = useRef<HTMLInputElement>(null);

  const [configurationText, setConfigurationText] = useState("");
  const [configurationMessage, setConfigurationMessage] = useState<
    string | null
  >(null);
  const [configurationError, setConfigurationError] = useState<string | null>(
    null,
  );
  const [configuredSourceSimulationId, setConfiguredSourceSimulationId] =
    useState<number | undefined>();
  const effectiveSourceSimulationId =
    sourceSimulationId ?? configuredSourceSimulationId;
  const { simulation: sourceSimulation, loading: sourceLoading } =
    useGetSimulation(
      effectiveSourceSimulationId ?? 0,
      !effectiveSourceSimulationId,
    );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState<Platform>(Platform.Gns);
  const [direction, setDirection] = useState<BotMode>(BotMode.Reversed);
  const [scoreFormular, setScoreFormular] = useState<SimulationScoreFormular>(
    SimulationScoreFormular.RiskAdjustedCopyScore,
  );
  const [sizingFormular, setSizingFormular] =
    useState<SimulationSizingFormular>(
      SimulationSizingFormular.ScoreScaledCollateralSizing,
    );
  const [scheduleRange, setScheduleRange] =
    useState<RangeValue<DateValue> | null>({
      start: now(getServerTimezone()).subtract({ days: 30 }),
      end: now(getServerTimezone()).subtract({ days: 1 }),
    });
  const [days, setDays] = useState("1");
  const [gapDays, setGapDays] = useState("0");
  const [tradeRanges, setTradeRanges] = useState<RangeEntryState[]>([
    createRangeEntry("trade", { min: "3", max: "10" }),
  ]);
  const [r2Ranges, setR2Ranges] = useState<RangeEntryState[]>([
    createRangeEntry("r2", { min: "0.25", max: "0.5" }),
  ]);
  const [slopeRanges, setSlopeRanges] = useState<RangeEntryState[]>([
    createRangeEntry("slope", { min: "1", max: "3" }),
  ]);
  const [leverageRanges, setLeverageRanges] = useState<RangeEntryState[]>([
    createRangeEntry("leverage", { min: "10", max: "50" }),
  ]);
  const [collateralRanges, setCollateralRanges] = useState<RangeEntryState[]>([
    createRangeEntry("collateral", { min: "10", max: "500" }),
  ]);
  const [sizeRanges, setSizeRanges] = useState<RangeEntryState[]>([
    createRangeEntry("size", { min: "0", max: "1000000000" }),
  ]);
  const [scoreRanges, setScoreRanges] = useState<RangeEntryState[]>([
    createRangeEntry("score", { min: "0.5", max: "0.8" }),
  ]);
  const [leaderExecutionCollateralRanges, setLeaderExecutionCollateralRanges] =
    useState<RangeEntryState[]>([
      createRangeEntry("leader-execution-collateral", {
        min: "50",
        max: "150",
      }),
    ]);
  const [leaderExecutionSizeRanges, setLeaderExecutionSizeRanges] = useState<
    RangeEntryState[]
  >([
    createRangeEntry("leader-execution-size", {
      min: "1500",
      max: "3000",
    }),
  ]);
  const [leaderExecutionLeverageRanges, setLeaderExecutionLeverageRanges] =
    useState<RangeEntryState[]>([
      createRangeEntry("leader-execution-leverage", {
        min: "18",
        max: "25",
      }),
    ]);
  const [followerRiskSizeRanges, setFollowerRiskSizeRanges] = useState([
    createRangeEntry("follower-risk-size", { min: "50", max: "500" }),
  ]);
  const [followerRiskCollateralRanges, setFollowerRiskCollateralRanges] =
    useState([
      createRangeEntry("follower-risk-collateral", { min: "10", max: "100" }),
    ]);
  const [alternatives, setAlternatives] = useState<Record<string, boolean>>({});
  const toggleAlternatives = (field: string) =>
    setAlternatives((current) => ({ ...current, [field]: !current[field] }));

  useEffect(() => {
    if (!sourceSimulation) return;

    const fromSource = (
      prefix: string,
      ranges: Array<{ min: number; max: number }>,
    ) =>
      ranges.map((range) =>
        createRangeEntry(prefix, {
          min: String(range.min),
          max: String(range.max),
        }),
      );

    // A source simulation supplies the frozen Layer 1 baseline only. Title
    // and description describe this new Layer 2/3 research and remain owned
    // by the imported configuration.
    setPlatform(sourceSimulation.platform);
    setDirection(sourceSimulation.direction);
    setScoreFormular(sourceSimulation.scoreFormular);
    setSizingFormular(sourceSimulation.sizingFormular);
    setScheduleRange({
      start: parseDate(String(sourceSimulation.startAt).slice(0, 10)),
      end: parseDate(String(sourceSimulation.endAt).slice(0, 10)),
    });
    setDays(String(sourceSimulation.days));
    setGapDays(String(sourceSimulation.gapDays));
    setTradeRanges(fromSource("trade", sourceSimulation.trade));
    setR2Ranges(fromSource("r2", sourceSimulation.r2));
    setSlopeRanges(fromSource("slope", sourceSimulation.slope));
    setCollateralRanges(fromSource("collateral", sourceSimulation.collateral));
    setSizeRanges(fromSource("size", sourceSimulation.size));
    setLeverageRanges(fromSource("leverage", sourceSimulation.leverage));
    setScoreRanges(fromSource("score", sourceSimulation.score));
    setAlternatives((current) => ({
      ...current,
      trade: false,
      r2: false,
      slope: false,
      collateral: false,
      size: false,
      leverage: false,
      score: false,
    }));
  }, [sourceSimulation]);

  const mapImportedRangeGroups = (
    prefix: string,
    groups: ImportedRangeGroup[],
  ) => ({
    entries: groups.flatMap((group) =>
      group.ranges.map((range) =>
        createRangeEntry(prefix, {
          min: String(range.min),
          max: String(range.max),
        }),
      ),
    ),
    alternatives: groups.length === 1 && groups[0].ranges.length > 1,
  });

  const applyConfiguration = (rawText = configurationText) => {
    setConfigurationError(null);
    setConfigurationMessage(null);

    try {
      const configuration = parseImportedResearchConfiguration(rawText);
      const trade = mapImportedRangeGroups("trade", configuration.trade);
      const r2 = mapImportedRangeGroups("r2", configuration.r2);
      const slope = mapImportedRangeGroups("slope", configuration.slope);
      const collateral = mapImportedRangeGroups(
        "collateral",
        configuration.collateral,
      );
      const size = mapImportedRangeGroups("size", configuration.size);
      const leverage = mapImportedRangeGroups(
        "leverage",
        configuration.leverage,
      );
      const score = mapImportedRangeGroups("score", configuration.score);
      const leaderExecutionCollateral = mapImportedRangeGroups(
        "leader-execution-collateral",
        configuration.leaderExecutionCollateral,
      );
      const leaderExecutionSize = mapImportedRangeGroups(
        "leader-execution-size",
        configuration.leaderExecutionSize,
      );
      const leaderExecutionLeverage = mapImportedRangeGroups(
        "leader-execution-leverage",
        configuration.leaderExecutionLeverage,
      );
      const followerRiskSize = mapImportedRangeGroups(
        "follower-risk-size",
        configuration.followerRiskSize,
      );
      const followerRiskCollateral = mapImportedRangeGroups(
        "follower-risk-collateral",
        configuration.followerRiskCollateral,
      );

      setTitle(configuration.title);
      setDescription(configuration.description);
      setConfiguredSourceSimulationId(configuration.sourceSimulationId);
      if (!effectiveSourceSimulationId) {
        setPlatform(configuration.platform);
        setDirection(configuration.direction);
        setScoreFormular(configuration.scoreFormular);
        setSizingFormular(configuration.sizingFormular);
        setScheduleRange({
          start: parseDate(configuration.startAt.slice(0, 10)),
          end: parseDate(configuration.endAt.slice(0, 10)),
        });
        setDays(String(configuration.days));
        setGapDays(String(configuration.gapDays));
        setTradeRanges(trade.entries);
        setR2Ranges(r2.entries);
        setSlopeRanges(slope.entries);
        setCollateralRanges(collateral.entries);
        setSizeRanges(size.entries);
        setLeverageRanges(leverage.entries);
        setScoreRanges(score.entries);
      }
      setLeaderExecutionCollateralRanges(leaderExecutionCollateral.entries);
      setLeaderExecutionSizeRanges(leaderExecutionSize.entries);
      setLeaderExecutionLeverageRanges(leaderExecutionLeverage.entries);
      setFollowerRiskSizeRanges(followerRiskSize.entries);
      setFollowerRiskCollateralRanges(followerRiskCollateral.entries);
      setAlternatives({
        ...(!effectiveSourceSimulationId
          ? {
              trade: trade.alternatives,
              r2: r2.alternatives,
              slope: slope.alternatives,
              collateral: collateral.alternatives,
              size: size.alternatives,
              leverage: leverage.alternatives,
              score: score.alternatives,
            }
          : {}),
        leaderExecutionCollateral: leaderExecutionCollateral.alternatives,
        leaderExecutionSize: leaderExecutionSize.alternatives,
        leaderExecutionLeverage: leaderExecutionLeverage.alternatives,
        followerRiskSize: followerRiskSize.alternatives,
        followerRiskCollateral: followerRiskCollateral.alternatives,
      });
      setConfigurationMessage(
        "Configuration applied. Review the populated form, then use Create Research to submit it.",
      );
    } catch (error) {
      setConfigurationError(
        error instanceof Error
          ? error.message
          : "Unable to apply configuration",
      );
    }
  };

  useEffect(() => {
    if (!initialConfigurationText) return;

    setConfigurationText(initialConfigurationText);
    applyConfiguration(initialConfigurationText);
    // Each batch-review panel is keyed by its configuration, so this applies
    // exactly once for that review step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialConfigurationText]);

  const handleConfigurationFile = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    try {
      setConfigurationText(await file.text());
      setConfigurationError(null);
      setConfigurationMessage(
        `Loaded ${file.name}. Select Apply Configuration to validate it.`,
      );
    } catch {
      setConfigurationError("Unable to read the selected JSON file");
    }
  };

  const copyConfigurationTemplate = async () => {
    try {
      await navigator.clipboard.writeText(AI_CONFIGURATION_PROMPT);
      setConfigurationError(null);
      setConfigurationMessage(
        "AI configuration prompt copied to your clipboard.",
      );
    } catch {
      setConfigurationError("Unable to copy the configuration template");
    }
  };

  const generatedSimulationCount =
    (alternatives.trade ? 1 : tradeRanges.length) *
    (alternatives.r2 ? 1 : r2Ranges.length) *
    (alternatives.slope ? 1 : slopeRanges.length) *
    (alternatives.collateral ? 1 : collateralRanges.length) *
    (alternatives.size ? 1 : sizeRanges.length) *
    (alternatives.leverage ? 1 : leverageRanges.length) *
    (alternatives.leaderExecutionCollateral
      ? 1
      : leaderExecutionCollateralRanges.length) *
    (alternatives.leaderExecutionSize ? 1 : leaderExecutionSizeRanges.length) *
    (alternatives.leaderExecutionLeverage
      ? 1
      : leaderExecutionLeverageRanges.length) *
    (alternatives.followerRiskSize ? 1 : followerRiskSizeRanges.length) *
    (alternatives.followerRiskCollateral
      ? 1
      : followerRiskCollateralRanges.length) *
    (alternatives.score ? 1 : scoreRanges.length);

  const planWindowCount = useMemo(() => {
    const parsedDays = Number(days);
    const parsedGapDays = Number(gapDays);

    if (
      !scheduleRange ||
      Number.isNaN(parsedDays) ||
      Number.isNaN(parsedGapDays) ||
      !Number.isInteger(parsedDays) ||
      !Number.isInteger(parsedGapDays)
    ) {
      return 0;
    }

    return countPlanWindows(
      scheduleRange.start.toDate(getServerTimezone()),
      scheduleRange.end.toDate(getServerTimezone()),
      parsedDays,
      parsedGapDays,
    );
  }, [days, gapDays, scheduleRange]);

  const estimatedPlanCount = generatedSimulationCount * planWindowCount;

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

    const parsedDays = Number(days);
    const parsedGapDays = Number(gapDays);

    if (
      days.trim() === "" ||
      Number.isNaN(parsedDays) ||
      !Number.isInteger(parsedDays) ||
      parsedDays <= 0
    ) {
      result.days = "Days must be a positive integer";
    }

    if (
      gapDays.trim() === "" ||
      Number.isNaN(parsedGapDays) ||
      !Number.isInteger(parsedGapDays) ||
      parsedGapDays < 0
    ) {
      result.gapDays = "Gap days must be a non-negative integer";
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

    if (leverageRanges.length === 0) {
      result.leverageEmpty = "Add at least one leverage range";
    }

    if (collateralRanges.length === 0) {
      result.collateralEmpty = "Add at least one collateral range";
    }

    if (sizeRanges.length === 0) {
      result.sizeEmpty = "Add at least one size range";
    }

    if (scoreRanges.length === 0) {
      result.scoreEmpty = "Add at least one score range";
    }
    if (leaderExecutionCollateralRanges.length === 0) {
      result.leaderExecutionCollateralEmpty =
        "Add at least one leader execution collateral range";
    }
    if (leaderExecutionSizeRanges.length === 0) {
      result.leaderExecutionSizeEmpty =
        "Add at least one leader execution size range";
    }
    if (leaderExecutionLeverageRanges.length === 0) {
      result.leaderExecutionLeverageEmpty =
        "Add at least one leader execution leverage range";
    }
    if (followerRiskSizeRanges.length === 0) {
      result.followerRiskSizeEmpty = "Add at least one follower size range";
    }
    if (followerRiskCollateralRanges.length === 0) {
      result.followerRiskCollateralEmpty =
        "Add at least one follower collateral range";
    }

    if (generatedSimulationCount > MAX_SIMULATIONS_PER_RESEARCH) {
      result.simulationCount = `This research would generate ${generatedSimulationCount} simulations. Maximum allowed is ${MAX_SIMULATIONS_PER_RESEARCH}. Please reduce grid search combinations.`;
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
    const leverageEntryErrors = validateRangeEntries(
      "Leverage",
      leverageRanges,
      {
        minAllowed: 0,
      },
    );
    const collateralEntryErrors = validateRangeEntries(
      "Collateral",
      collateralRanges,
      {
        minAllowed: 0,
      },
    );
    const sizeEntryErrors = validateRangeEntries("Size", sizeRanges, {
      minAllowed: 0,
    });
    const scoreEntryErrors = validateRangeEntries("Score", scoreRanges, {
      minAllowed: 0,
      maxAllowed: 1,
    });
    const leaderExecutionCollateralEntryErrors = validateRangeEntries(
      "Leader execution collateral",
      leaderExecutionCollateralRanges,
      { minAllowed: 0 },
    );
    const leaderExecutionSizeEntryErrors = validateRangeEntries(
      "Leader execution size",
      leaderExecutionSizeRanges,
      { minAllowed: 0 },
    );
    const leaderExecutionLeverageEntryErrors = validateRangeEntries(
      "Leader execution leverage",
      leaderExecutionLeverageRanges,
      { minAllowed: 0 },
    );
    const followerRiskSizeEntryErrors = validateRangeEntries(
      "Follower size",
      followerRiskSizeRanges,
      { minAllowed: 0 },
    );
    const followerRiskCollateralEntryErrors = validateRangeEntries(
      "Follower collateral",
      followerRiskCollateralRanges,
      { minAllowed: 0 },
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

    Object.values(leverageEntryErrors).forEach((entryErrors) => {
      Object.values(entryErrors).forEach((message) => {
        if (message) {
          result[`leverage-${message}`] = message;
        }
      });
    });

    Object.values(collateralEntryErrors).forEach((entryErrors) => {
      Object.values(entryErrors).forEach((message) => {
        if (message) {
          result[`collateral-${message}`] = message;
        }
      });
    });
    Object.values(sizeEntryErrors).forEach((entryErrors) => {
      Object.values(entryErrors).forEach((message) => {
        if (message) {
          result[`size-${message}`] = message;
        }
      });
    });

    Object.values(scoreEntryErrors).forEach((entryErrors) => {
      Object.values(entryErrors).forEach((message) => {
        if (message) {
          result[`score-${message}`] = message;
        }
      });
    });
    for (const [prefix, entryErrors] of [
      ["leaderExecutionCollateral", leaderExecutionCollateralEntryErrors],
      ["leaderExecutionSize", leaderExecutionSizeEntryErrors],
      ["leaderExecutionLeverage", leaderExecutionLeverageEntryErrors],
      ["followerRiskSize", followerRiskSizeEntryErrors],
      ["followerRiskCollateral", followerRiskCollateralEntryErrors],
    ] as const) {
      Object.values(entryErrors).forEach((fieldErrors) => {
        Object.values(fieldErrors).forEach((message) => {
          if (message) result[`${prefix}-${message}`] = message;
        });
      });
    }

    return {
      flat: result,
      tradeEntryErrors,
      r2EntryErrors,
      slopeEntryErrors,
      leverageEntryErrors,
      collateralEntryErrors,
      sizeEntryErrors,
      scoreEntryErrors,
      leaderExecutionCollateralEntryErrors,
      leaderExecutionSizeEntryErrors,
      leaderExecutionLeverageEntryErrors,
      followerRiskSizeEntryErrors,
      followerRiskCollateralEntryErrors,
    };
  }, [
    collateralRanges,
    sizeRanges,
    days,
    description,
    gapDays,
    generatedSimulationCount,
    leverageRanges,
    leaderExecutionCollateralRanges,
    leaderExecutionSizeRanges,
    leaderExecutionLeverageRanges,
    followerRiskSizeRanges,
    followerRiskCollateralRanges,
    r2Ranges,
    scheduleRange,
    scoreRanges,
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

  const handleSave = async () => {
    if (isDisabled || !scheduleRange) {
      return;
    }

    const input = {
      title: title.trim(),
      description: description.trim(),
      platform,
      startAt: scheduleRange.start.toDate(getServerTimezone()),
      endAt: scheduleRange.end.toDate(getServerTimezone()),
      days: Number(days),
      gapDays: Number(gapDays),
      direction,
      trade: normalizeRangeGroups(tradeRanges, Boolean(alternatives.trade)),
      r2: normalizeRangeGroups(r2Ranges, Boolean(alternatives.r2)),
      slope: normalizeRangeGroups(slopeRanges, Boolean(alternatives.slope)),
      collateral: normalizeRangeGroups(
        collateralRanges,
        Boolean(alternatives.collateral),
      ),
      size: normalizeRangeGroups(sizeRanges, Boolean(alternatives.size)),
      leverage: normalizeRangeGroups(
        leverageRanges,
        Boolean(alternatives.leverage),
      ),
      leaderExecutionCollateral: normalizeRangeGroups(
        leaderExecutionCollateralRanges,
        Boolean(alternatives.leaderExecutionCollateral),
      ),
      leaderExecutionSize: normalizeRangeGroups(
        leaderExecutionSizeRanges,
        Boolean(alternatives.leaderExecutionSize),
      ),
      leaderExecutionLeverage: normalizeRangeGroups(
        leaderExecutionLeverageRanges,
        Boolean(alternatives.leaderExecutionLeverage),
      ),
      followerRiskSize: normalizeRangeGroups(
        followerRiskSizeRanges,
        Boolean(alternatives.followerRiskSize),
      ),
      followerRiskCollateral: normalizeRangeGroups(
        followerRiskCollateralRanges,
        Boolean(alternatives.followerRiskCollateral),
      ),
      score: normalizeRangeGroups(scoreRanges, Boolean(alternatives.score)),
      scoreFormular,
      sizingFormular,
    };
    const { data } = effectiveSourceSimulationId
      ? await createSimulationResearchFromSimulation({
          variables: { sourceSimulationId: effectiveSourceSimulationId, input },
        })
      : await createSimulationResearch({ variables: { input } });

    const createdResearch =
      data && "createSimulationResearchFromSimulation" in data
        ? data.createSimulationResearchFromSimulation
        : data?.createSimulationResearch;
    const research = createdResearch
      ? getFragmentData(
          SIMULATION_RESEARCH_INFO_FRAGMENT_DOCUMENT,
          createdResearch,
        )
      : null;

    if (research?.id && onCreated) {
      onCreated(research.id);
      return;
    }

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
            Define explicit research ranges, collateral, and leverage values,
            then let the backend generate simulations for every valid
            combination.
          </p>
        </div>
      ) : null}

      {!hideConfigurationImporter ? (
        <Card
          shadow="none"
          className="border-default-200 bg-content1 rounded-lg border"
        >
          <CardBody className="gap-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Expert: Input Configuration From JSON
                </h2>
                <p className="text-sm text-neutral-400">
                  Paste an AI-generated configuration or load a JSON file. It
                  only fills this form; Create Research remains the sole
                  submission step.
                </p>
              </div>
              <Button
                size="sm"
                variant="flat"
                onPress={() => void copyConfigurationTemplate()}
              >
                Copy AI Configuration Prompt
              </Button>
            </div>

            <Textarea
              minRows={8}
              value={configurationText}
              onValueChange={setConfigurationText}
              label="Simulation research configuration JSON"
              placeholder='{"version": 2, "title": "...", ...}'
              aria-label="Simulation research configuration JSON"
              isInvalid={Boolean(configurationError)}
              errorMessage={configurationError ?? undefined}
            />

            <input
              ref={configurationFileInputRef}
              className="hidden"
              type="file"
              accept="application/json,.json"
              onChange={(event) => void handleConfigurationFile(event)}
            />

            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="flat"
                onPress={() => configurationFileInputRef.current?.click()}
              >
                Choose JSON File
              </Button>
              <Button
                size="sm"
                color="primary"
                isDisabled={configurationText.trim() === ""}
                onPress={() => applyConfiguration()}
              >
                Apply Configuration
              </Button>
            </div>

            {configurationMessage ? (
              <p className="text-sm text-emerald-400">{configurationMessage}</p>
            ) : null}
          </CardBody>
        </Card>
      ) : null}

      <Card
        shadow="none"
        className="border-default-200 bg-content1 rounded-lg border"
      >
        <CardBody className="gap-6">
          {effectiveSourceSimulationId ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-neutral-300">
              {sourceLoading ? (
                "Loading source simulation…"
              ) : sourceSimulation ? (
                <>
                  Layer 1, platform, duration, plan days, and gap are locked to{" "}
                  <a
                    className="text-emerald-400 underline"
                    href={`/simulations/${sourceSimulation.id}`}
                  >
                    Simulation {sourceSimulation.id}
                  </a>
                  . Imported JSON only changes the title, description, Layer 2,
                  and Layer 3.
                </>
              ) : (
                "The source simulation could not be loaded."
              )}
            </div>
          ) : null}
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
              isDisabled={Boolean(effectiveSourceSimulationId)}
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
              isDisabled={Boolean(effectiveSourceSimulationId)}
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
            isDisabled={Boolean(effectiveSourceSimulationId)}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <NumericInput
              amount={days}
              onChange={setDays}
              label="Plan Days"
              ariaLabel="Plan days"
              min={1}
              step={1}
              errorMessage={errors.flat.days}
              isInvalid={Boolean(errors.flat.days)}
              isDisabled={Boolean(effectiveSourceSimulationId)}
            />
            <NumericInput
              amount={gapDays}
              onChange={setGapDays}
              label="Gap Days"
              ariaLabel="Gap days"
              min={0}
              step={1}
              errorMessage={errors.flat.gapDays}
              isInvalid={Boolean(errors.flat.gapDays)}
              isDisabled={Boolean(effectiveSourceSimulationId)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Select
              variant="underlined"
              label="Score Formula"
              aria-label="Score formula"
              selectedKeys={[scoreFormular]}
              isDisabled={Boolean(effectiveSourceSimulationId)}
              onChange={(event) =>
                setScoreFormular(event.target.value as SimulationScoreFormular)
              }
            >
              {SCORE_FORMULAR_OPTIONS.map((item) => (
                <SelectItem key={item}>{item}</SelectItem>
              ))}
            </Select>

            <Select
              variant="underlined"
              label="Sizing Formula"
              aria-label="Sizing formula"
              selectedKeys={[sizingFormular]}
              isDisabled={Boolean(effectiveSourceSimulationId)}
              onChange={(event) =>
                setSizingFormular(
                  event.target.value as SimulationSizingFormular,
                )
              }
            >
              {SIZING_FORMULAR_OPTIONS.map((item) => (
                <SelectItem key={item}>{item}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="border-primary-500/30 bg-primary-500/5 rounded-xl border p-4">
            <h2 className="font-semibold text-white">
              Layer 1 — Leader qualification
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Define the historical position universe and the metrics used once
              to qualify, score, and size each leader for the plan window.
            </p>
          </div>

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
              rangesAreAlternatives={Boolean(alternatives.trade)}
              onToggleAlternatives={() => toggleAlternatives("trade")}
              isDisabled={Boolean(effectiveSourceSimulationId)}
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
              rangesAreAlternatives={Boolean(alternatives.r2)}
              onToggleAlternatives={() => toggleAlternatives("r2")}
              isDisabled={Boolean(effectiveSourceSimulationId)}
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
              rangesAreAlternatives={Boolean(alternatives.slope)}
              onToggleAlternatives={() => toggleAlternatives("slope")}
              isDisabled={Boolean(effectiveSourceSimulationId)}
            />
            <RangeEntryCard
              label="Historical leader leverage"
              entries={leverageRanges}
              onAdd={() =>
                setLeverageRanges((current) => [
                  ...current,
                  createRangeEntry("leverage"),
                ])
              }
              onChange={(id, field, nextValue) =>
                handleRangeEntryChange(setLeverageRanges, id, field, nextValue)
              }
              onRemove={(id) => handleRangeEntryRemove(setLeverageRanges, id)}
              min={0}
              step={0.1}
              errors={errors.leverageEntryErrors}
              emptyMessage={errors.flat.leverageEmpty}
              rangesAreAlternatives={Boolean(alternatives.leverage)}
              onToggleAlternatives={() => toggleAlternatives("leverage")}
              isDisabled={Boolean(effectiveSourceSimulationId)}
            />
            <RangeEntryCard
              label="Historical leader collateral (USD)"
              entries={collateralRanges}
              onAdd={() =>
                setCollateralRanges((current) => [
                  ...current,
                  createRangeEntry("collateral"),
                ])
              }
              onChange={(id, field, nextValue) =>
                handleRangeEntryChange(
                  setCollateralRanges,
                  id,
                  field,
                  nextValue,
                )
              }
              onRemove={(id) => handleRangeEntryRemove(setCollateralRanges, id)}
              min={0}
              step={1}
              errors={errors.collateralEntryErrors}
              emptyMessage={errors.flat.collateralEmpty}
              rangesAreAlternatives={Boolean(alternatives.collateral)}
              onToggleAlternatives={() => toggleAlternatives("collateral")}
              isDisabled={Boolean(effectiveSourceSimulationId)}
            />
            <RangeEntryCard
              label="Historical leader size (USD)"
              entries={sizeRanges}
              onAdd={() =>
                setSizeRanges((current) => [
                  ...current,
                  createRangeEntry("size"),
                ])
              }
              onChange={(id, field, nextValue) =>
                handleRangeEntryChange(setSizeRanges, id, field, nextValue)
              }
              onRemove={(id) => handleRangeEntryRemove(setSizeRanges, id)}
              min={0}
              step={1}
              errors={errors.sizeEntryErrors}
              emptyMessage={errors.flat.sizeEmpty}
              rangesAreAlternatives={Boolean(alternatives.size)}
              onToggleAlternatives={() => toggleAlternatives("size")}
              isDisabled={Boolean(effectiveSourceSimulationId)}
            />
            <RangeEntryCard
              label="Score"
              entries={scoreRanges}
              onAdd={() =>
                setScoreRanges((current) => [
                  ...current,
                  createRangeEntry("score"),
                ])
              }
              onChange={(id, field, nextValue) =>
                handleRangeEntryChange(setScoreRanges, id, field, nextValue)
              }
              onRemove={(id) => handleRangeEntryRemove(setScoreRanges, id)}
              min={0}
              max={1}
              step={0.01}
              errors={errors.scoreEntryErrors}
              emptyMessage={errors.flat.scoreEmpty}
              rangesAreAlternatives={Boolean(alternatives.score)}
              onToggleAlternatives={() => toggleAlternatives("score")}
              isDisabled={Boolean(effectiveSourceSimulationId)}
            />
          </div>

          <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4">
            <h2 className="font-semibold text-white">
              Layer 2 — Leader-position eligibility
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Filter each new leader position by its entry characteristics. No
              historical score is recalculated here.
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <RangeEntryCard
              label="Leader entry size (USD)"
              entries={leaderExecutionSizeRanges}
              onAdd={() =>
                setLeaderExecutionSizeRanges((current) => [
                  ...current,
                  createRangeEntry("leader-execution-size"),
                ])
              }
              onChange={(id, field, nextValue) =>
                handleRangeEntryChange(
                  setLeaderExecutionSizeRanges,
                  id,
                  field,
                  nextValue,
                )
              }
              onRemove={(id) =>
                handleRangeEntryRemove(setLeaderExecutionSizeRanges, id)
              }
              min={0}
              step={1}
              errors={errors.leaderExecutionSizeEntryErrors}
              emptyMessage={errors.flat.leaderExecutionSizeEmpty}
              rangesAreAlternatives={Boolean(alternatives.leaderExecutionSize)}
              onToggleAlternatives={() =>
                toggleAlternatives("leaderExecutionSize")
              }
            />
            <RangeEntryCard
              label="Leader entry collateral (USD)"
              entries={leaderExecutionCollateralRanges}
              onAdd={() =>
                setLeaderExecutionCollateralRanges((current) => [
                  ...current,
                  createRangeEntry("leader-execution-collateral"),
                ])
              }
              onChange={(id, field, nextValue) =>
                handleRangeEntryChange(
                  setLeaderExecutionCollateralRanges,
                  id,
                  field,
                  nextValue,
                )
              }
              onRemove={(id) =>
                handleRangeEntryRemove(setLeaderExecutionCollateralRanges, id)
              }
              min={0}
              step={1}
              errors={errors.leaderExecutionCollateralEntryErrors}
              emptyMessage={errors.flat.leaderExecutionCollateralEmpty}
              rangesAreAlternatives={Boolean(
                alternatives.leaderExecutionCollateral,
              )}
              onToggleAlternatives={() =>
                toggleAlternatives("leaderExecutionCollateral")
              }
            />
            <RangeEntryCard
              label="Leader entry leverage"
              entries={leaderExecutionLeverageRanges}
              onAdd={() =>
                setLeaderExecutionLeverageRanges((current) => [
                  ...current,
                  createRangeEntry("leader-execution-leverage"),
                ])
              }
              onChange={(id, field, nextValue) =>
                handleRangeEntryChange(
                  setLeaderExecutionLeverageRanges,
                  id,
                  field,
                  nextValue,
                )
              }
              onRemove={(id) =>
                handleRangeEntryRemove(setLeaderExecutionLeverageRanges, id)
              }
              min={0}
              step={0.1}
              errors={errors.leaderExecutionLeverageEntryErrors}
              emptyMessage={errors.flat.leaderExecutionLeverageEmpty}
              rangesAreAlternatives={Boolean(
                alternatives.leaderExecutionLeverage,
              )}
              onToggleAlternatives={() =>
                toggleAlternatives("leaderExecutionLeverage")
              }
            />
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <h2 className="font-semibold text-white">
              Layer 3 — Follower sizing and risk envelope
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Size follower notional from the frozen base ratio, then control
              leverage, collateral, and exposure independently.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <RangeEntryCard
              label="Follower size (USD)"
              entries={followerRiskSizeRanges}
              onAdd={() =>
                setFollowerRiskSizeRanges((current) => [
                  ...current,
                  createRangeEntry("follower-risk-size"),
                ])
              }
              onChange={(id, field, value) =>
                handleRangeEntryChange(
                  setFollowerRiskSizeRanges,
                  id,
                  field,
                  value,
                )
              }
              onRemove={(id) =>
                handleRangeEntryRemove(setFollowerRiskSizeRanges, id)
              }
              min={0}
              step={1}
              errors={errors.followerRiskSizeEntryErrors}
              emptyMessage={errors.flat.followerRiskSizeEmpty}
              rangesAreAlternatives={Boolean(alternatives.followerRiskSize)}
              onToggleAlternatives={() =>
                toggleAlternatives("followerRiskSize")
              }
            />
            <RangeEntryCard
              label="Follower collateral (USD)"
              entries={followerRiskCollateralRanges}
              onAdd={() =>
                setFollowerRiskCollateralRanges((current) => [
                  ...current,
                  createRangeEntry("follower-risk-collateral"),
                ])
              }
              onChange={(id, field, value) =>
                handleRangeEntryChange(
                  setFollowerRiskCollateralRanges,
                  id,
                  field,
                  value,
                )
              }
              onRemove={(id) =>
                handleRangeEntryRemove(setFollowerRiskCollateralRanges, id)
              }
              min={0}
              step={1}
              errors={errors.followerRiskCollateralEntryErrors}
              emptyMessage={errors.flat.followerRiskCollateralEmpty}
              rangesAreAlternatives={Boolean(
                alternatives.followerRiskCollateral,
              )}
              onToggleAlternatives={() =>
                toggleAlternatives("followerRiskCollateral")
              }
            />
          </div>

          <div className="rounded-xl border border-amber-500/45 bg-amber-50 px-4 py-4 text-sm text-amber-950 shadow-[0_10px_30px_rgba(245,158,11,0.10)]">
            <p className="leading-6 font-medium">
              Layer 1 ranges qualify the leader. Layer 2 ranges filter only the
              leader opening. Layer 3 checks the ratio-scaled follower opening
              size and collateral; accepted positions replay the full leader
              lifecycle at that ratio.
            </p>
          </div>

          <div
            className={`rounded-xl border px-4 py-4 text-sm shadow-[0_10px_30px_rgba(15,23,42,0.12)] ${
              generatedSimulationCount > MAX_SIMULATIONS_PER_RESEARCH
                ? "border-danger-400/60 bg-danger-50 text-danger-950"
                : "border-emerald-500/35 bg-emerald-50 text-emerald-950"
            }`}
          >
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase">
                  Generated simulations
                </p>
                <p className="text-lg font-semibold">
                  {generatedSimulationCount} / {MAX_SIMULATIONS_PER_RESEARCH}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase">Ranges</p>
                <p className="text-lg font-semibold">{planWindowCount}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase">Estimated plans</p>
                <p className="text-lg font-semibold">{estimatedPlanCount}</p>
              </div>
            </div>
            {errors.flat.simulationCount ? (
              <p className="mt-3 leading-6 font-medium">
                {errors.flat.simulationCount}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="solid"
              color="primary"
              size="sm"
              aria-label="Create research"
              isLoading={loading || sourceCreationLoading}
              isDisabled={
                isDisabled ||
                loading ||
                sourceCreationLoading ||
                sourceLoading ||
                Boolean(effectiveSourceSimulationId && !sourceSimulation)
              }
              onPress={handleSave}
            >
              {effectiveSourceSimulationId
                ? "Create Research from Simulation"
                : "Create Research"}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
