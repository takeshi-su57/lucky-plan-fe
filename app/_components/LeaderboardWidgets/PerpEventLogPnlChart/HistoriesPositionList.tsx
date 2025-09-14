import { useState } from "react";

import { HistoriesView } from "./HistoriesView";
import { PaginatedViews } from "@/components/views/PaginatedViews";
import { PerpTradeHistory } from "@/web3/types";

const PAGE_SIZE = 3;

export type HistoriesPositionListProps = {
  perpTradeHistories: (PerpTradeHistory & { date: Date })[][];
};

export function HistoriesPositionList({
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
      <div className="flex h-[650px] w-full flex-col gap-6 overflow-y-auto">
        {perpTradeHistories
          .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
          .map((histories, index) => (
            <HistoriesView key={index} histories={histories} />
          ))}
      </div>
    </PaginatedViews>
  );
}
