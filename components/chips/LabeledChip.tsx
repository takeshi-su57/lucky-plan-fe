import { Chip, ChipProps } from "@nextui-org/react";

export function LabeledChip({
  label,
  value,
  unit,
  ...props
}: ChipProps & {
  label?: string;
  value: string | number;
  unit: string;
}) {
  return (
    <Chip {...props} className="h-fit rounded-md p-1">
      <div className="flex flex-col">
        {label && <span className="text-xs opacity-80">{label}</span>}
        <div className="flex flex-row items-center gap-2">
          <span className="text-xs font-bold">{value}</span>
          <span className="text-xs opacity-80">{unit}</span>
        </div>
      </div>
    </Chip>
  );
}
