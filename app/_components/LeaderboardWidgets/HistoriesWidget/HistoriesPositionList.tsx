import { useState } from "react";

import { PersonalTradeHistory } from "@/types";
import { HistoriesPosition } from "./HistoriesPosition";
import { PaginatedViews } from "@/components/views/PaginatedViews";

const PAGE_SIZE = 3;

export type HistoriesPositionListProps = {
  historiesGroupedByTradeIndex: {
    tradeIndex: number;
    long: number;
    collateralIndex: number;
    pair: string;
    contractId: number;
    actions: PersonalTradeHistory[];
  }[];
};

export function HistoriesPositionList({
  historiesGroupedByTradeIndex,
}: HistoriesPositionListProps) {
  const [page, setPage] = useState(1);

  return (
    <PaginatedViews
      currentPage={page}
      totalPages={Math.ceil(historiesGroupedByTradeIndex.length / PAGE_SIZE)}
      onChangePage={setPage}
      loading={false}
    >
      <div className="flex h-[650px] w-full flex-col gap-6 overflow-y-auto">
        {historiesGroupedByTradeIndex
          .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
          .map((position) => (
            <HistoriesPosition
              key={position.tradeIndex}
              contractId={position.contractId}
              tradeIndex={position.tradeIndex}
              collateralIndex={position.collateralIndex}
              long={position.long}
              pair={position.pair}
              actions={position.actions}
            />
          ))}
      </div>
    </PaginatedViews>
  );
}
