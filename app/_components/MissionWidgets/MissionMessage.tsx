import { MissionBackwardDetails, MissionStatus } from "@/graphql/gql/graphql";
import { Chip } from "@nextui-org/react";

const statusColors: Record<
  MissionStatus,
  "default" | "warning" | "secondary" | "primary" | "danger" | "success"
> = {
  [MissionStatus.Created]: "default",
  [MissionStatus.Opening]: "warning",
  [MissionStatus.Opened]: "danger",
  [MissionStatus.Closing]: "warning",
  [MissionStatus.Closed]: "primary",
  [MissionStatus.Ignored]: "secondary",
};

export function MissionMessage({
  mission,
}: {
  mission: MissionBackwardDetails;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">Mission #{mission.id}</span>

        <Chip variant="flat" color={statusColors[mission.status]}>
          {mission.status}
        </Chip>
      </div>
    </div>
  );
}
