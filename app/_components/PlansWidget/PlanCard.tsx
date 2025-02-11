import { PlanDetails, PlanStatus } from "@/graphql/gql/graphql";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  ChipProps,
  Divider,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export const chipColorsByPlanStatus: Record<PlanStatus, ChipProps["color"]> = {
  [PlanStatus.Created]: "primary",
  [PlanStatus.Started]: "success",
  [PlanStatus.Stopped]: "danger",
  [PlanStatus.Finished]: "default",
};

export type PlanCardProps = {
  plan: PlanDetails;
};

export function PlanCard({ plan }: PlanCardProps) {
  const router = useRouter();

  const handleGoToDetails = () => {
    router.push(`/plans/${plan.id}`);
  };

  const items = [
    {
      label: "Scheduled Start At",
      value: dayjs(plan.scheduledStart).format("MMM D, H:m:s"),
    },
    {
      label: "Scheduled End At",
      value: dayjs(plan.scheduledEnd).format("MMM D, H:m:s"),
    },
    {
      label: "Started At",
      value: plan.startedAt
        ? dayjs(plan.startedAt).format("MMM D, H:m:s")
        : null,
    },
    {
      label: "Ended At",
      value: plan.endedAt ? dayjs(plan.endedAt).format("MMM D, H:m:s") : null,
    },
    {
      label: "Bots",
      value: plan.bots.length,
    },
  ];

  return (
    <Card classNames={{ base: "w-[350px]" }}>
      <CardHeader className="flex flex-row items-start gap-2 p-3">
        <div className="flex flex-1 flex-col">
          <span className="text-base font-bold text-neutral-400">
            {plan.title}
          </span>

          <p className="text-xs text-neutral-400">{plan.description}</p>
        </div>

        <Chip variant="flat">Plan {plan.id}</Chip>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-2">
          {items.map(
            (item) =>
              item.value !== null && (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">
                    {item.label}:
                  </span>
                  <span className="text-sm font-bold text-neutral-300">
                    {item.value}
                  </span>
                </div>
              ),
          )}
        </div>
      </CardBody>

      <Divider />

      <CardFooter className="justify-between rounded-large p-3">
        <Chip color={chipColorsByPlanStatus[plan.status]} variant="flat">
          {plan.status}
        </Chip>

        <Button
          size="sm"
          variant="flat"
          color="primary"
          onClick={handleGoToDetails}
        >
          Show Details
        </Button>
      </CardFooter>
    </Card>
  );
}
