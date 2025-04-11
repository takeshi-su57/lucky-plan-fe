import { Address } from "viem";
import { TotalBot } from "@/graphql/gql/graphql";

import { useGetAllTradeHistory } from "@/app/_hooks/useHistory";
import { HistoriesWidget } from "../../LeaderboardWidgets/HistoriesWidget/HistoriesWidget";
import { Chip } from "@nextui-org/react";
import { useGetPersonalTradeHistories } from "@/app/_hooks/useGetPersonalTradeHistories";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import dayjs from "dayjs";

export function DevHistoriesWidget({
  item,
}: {
  item: { address: string; contractId: number; bots: TotalBot[] };
}) {
  const allContracts = useGetAllContracts();

  const contract = allContracts.find(
    (contract) => contract.id === item.contractId,
  );

  const histories = useGetAllTradeHistory(item.address, `${item.contractId}`);

  const { data: personalHistories } = useGetPersonalTradeHistories(
    contract?.backendUrl || null,
    item.address,
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
        contractId={item.contractId}
        hideTags={false}
        mode="show_only_valid_activity"
      />

      <span className="text-xl">Platform History</span>

      <HistoriesWidget
        address={item.address as Address}
        histories={personalHistories || []}
        contractId={item.contractId}
        hideTags={false}
        mode="show_only_valid_activity"
        range={{
          from: dayjs("2024-10-01").toDate(),
          to: dayjs().toDate(),
        }}
      />
    </div>
  );
}
