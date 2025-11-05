import { useState } from "react";

import { HistoriesView } from "./HistoriesView";
import { PaginatedViews } from "@/components/views/PaginatedViews";
import { PerpTradeHistory } from "@/web3/types";
import { Platform } from "@/graphql/gql/graphql";

const PAGE_SIZE = 12;

export type HistoriesPositionListProps = {
  platform: Platform;
  perpTradeHistories: (PerpTradeHistory & { date: Date })[][];
};

export function HistoriesPositionList({
  platform,
  perpTradeHistories,
}: HistoriesPositionListProps) {
  const [page, setPage] = useState(1);

  return (
    <PaginatedViews
      currentPage={page}
      totalPages={Math.ceil(perpTradeHistories.length / PAGE_SIZE)}
      onChangePage={setPage}
      loading={false}
    >
      <div className="flex h-[650px] w-full flex-wrap gap-6">
        {perpTradeHistories
          .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
          .map((histories, index) => (
            <HistoriesView
              key={index}
              platform={platform}
              histories={histories}
            />
          ))}
      </div>
    </PaginatedViews>
  );
}
