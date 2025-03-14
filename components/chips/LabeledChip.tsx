import { Chip, ChipProps } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export function LabeledChip({
  label,
  value,
  unit,
  isPrefix,
  ...props
}: ChipProps & {
  label?: string;
  value: string | number;
  unit: string;
  isPrefix?: boolean;
}) {
  return (
    <Chip {...props} className="h-fit rounded-md p-1">
      <div className="flex flex-col">
        {label && <span className="text-xs opacity-80">{label}</span>}
        <div
          className={twMerge(
            "flex items-center gap-2",
            isPrefix ? "flex-row-reverse" : "flex-row",
          )}
        >
          <span className="text-xs font-bold">{value}</span>
          <span className="text-xs opacity-80">{unit}</span>
        </div>
      </div>
    </Chip>
  );
}
