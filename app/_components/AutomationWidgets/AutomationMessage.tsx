import { BotBackwardDetails, BotStatus } from "@/graphql/gql/graphql";
import { Chip } from "@heroui/react";

const statusColors: Record<
  BotStatus,
  "default" | "warning" | "secondary" | "primary" | "danger" | "success"
> = {
  [BotStatus.Created]: "default",
  [BotStatus.Live]: "success",
  [BotStatus.Stop]: "danger",
  [BotStatus.Dead]: "secondary",
};

export function AutomationMessage({ bots }: { bots: BotBackwardDetails[] }) {
  const botsByStatus = bots.reduce(
    (acc, bot) => {
      acc[bot.status] = (acc[bot.status] || 0) + 1;
      return acc;
    },
    {} as Record<BotStatus, number>,
  );

  return (
    <div className="flex w-full flex-col gap-2">
      {Object.entries(botsByStatus).map(([status, count]) => (
        <div key={status} className="flex items-center gap-2">
          <span className="text-sm">
            {count} of{" "}
            <Chip variant="flat" color={statusColors[status as BotStatus]}>
              {status}
            </Chip>{" "}
            Automations
          </span>
        </div>
      ))}
    </div>
  );
}
