import { BotBackwardDetails, BotStatus } from "@/graphql/gql/graphql";
import { Chip } from "@nextui-org/react";

const statusColors: Record<
  BotStatus,
  "default" | "warning" | "secondary" | "primary" | "danger" | "success"
> = {
  [BotStatus.Created]: "default",
  [BotStatus.Live]: "success",
  [BotStatus.Stop]: "danger",
  [BotStatus.Dead]: "secondary",
};

export function AutomationMessage({ bot }: { bot: BotBackwardDetails }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">Automation #{bot.id}</span>

        <Chip variant="flat" color={statusColors[bot.status]}>
          {bot.status}
        </Chip>
      </div>
    </div>
  );
}
