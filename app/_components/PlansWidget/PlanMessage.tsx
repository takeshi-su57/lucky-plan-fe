import { PlanStatus, Plan } from "@/graphql/gql/graphql";
import { Chip } from "@nextui-org/react";

const statusColors: Record<
  PlanStatus,
  "default" | "warning" | "secondary" | "primary" | "danger" | "success"
> = {
  [PlanStatus.Created]: "default",
  [PlanStatus.Started]: "success",
  [PlanStatus.Stopped]: "danger",
  [PlanStatus.Finished]: "secondary",
};

export function PlanMessage({ plan }: { plan: Plan }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">Plan #{plan.id}</span>

        <Chip variant="flat" color={statusColors[plan.status]}>
          {plan.status}
        </Chip>
      </div>
    </div>
  );
}
