import { ChipProps } from "@heroui/react";

const metricDotColor: Partial<Record<NonNullable<ChipProps["color"]>, string>> =
  {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  };

export type MetricBoxProps = {
  label: string;
  value: string | number;
  unit?: string;
  color?: ChipProps["color"];
};

export function MetricBox({ label, value, unit, color }: MetricBoxProps) {
  return (
    <div
      key={label}
      className="border-default-200 bg-content2/70 min-w-24 rounded-lg border px-3 py-2"
    >
      <div className="text-default-500 text-[11px] font-medium">{label}</div>
      <div className="mt-1 flex min-w-0 items-baseline gap-1">
        <span className="text-default-800 truncate text-sm font-semibold">
          {value}
        </span>
        {unit ? (
          <span className="text-default-400 shrink-0 text-[11px]">{unit}</span>
        ) : null}
        {color ? (
          <span
            className={`${metricDotColor[color] || "bg-default-400"} ml-auto h-1.5 w-1.5 shrink-0 rounded-full`}
          />
        ) : null}
      </div>
    </div>
  );
}
