import { Chip } from "@nextui-org/react";

export function LabeledChip({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <Chip color="secondary" className="h-fit rounded-md p-1">
      <div className="flex flex-col">
        <span className="text-xs opacity-80">{label}</span>
        <div className="flex flex-row items-center gap-2">
          <span className="text-xs font-bold">{value}</span>
          <span className="text-xs opacity-80">{unit}</span>
        </div>
      </div>
    </Chip>
  );
}
