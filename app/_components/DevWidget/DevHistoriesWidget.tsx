import { Chip } from "@nextui-org/react";
import { Address } from "viem";
import { TotalBot } from "@/graphql/gql/graphql";

import { useGetAllTradeHistory } from "@/app/_hooks/useHistory";
import { HistoriesWidget } from "../LeaderboardWidgets/HistoriesWidget/HistoriesWidget";

export function DevHistoriesWidget({
  item,
}: {
  item: { address: string; contractId: number; bots: TotalBot[] };
}) {
  const { histories } = useGetAllTradeHistory(
    item.address,
    `${item.contractId}`,
  );

  return (
    <div className="mb-10 flex flex-col gap-4">
      <span>
        {item.address} - {item.contractId}
      </span>

      <div className="flex flex-wrap items-center gap-4">
        {item.bots.map((bot) => (
          <Chip key={bot.dateStr}>{bot.dateStr}</Chip>
        ))}
      </div>

      <span className="text-xl">App History</span>

      <HistoriesWidget
        address={item.address as Address}
        histories={histories || []}
        hideTags={false}
        mode="show_only_valid_activity"
      />
    </div>
  );
}
