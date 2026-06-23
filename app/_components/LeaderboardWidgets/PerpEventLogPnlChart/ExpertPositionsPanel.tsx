"use client";

import { useMemo, useState } from "react";
import { Pagination } from "@heroui/react";

import {
  PerpTradeHistory,
  PerpTradeHistoryOperation,
} from "@/graphql/gql/graphql";

import { HistoriesView } from "./HistoriesView";

const OPENED_PAGE_SIZE = 4;
const CLOSED_PAGE_SIZE = 6;

export type ExpertPositionsPanelProps = {
  missionHistories: PerpTradeHistory[][];
};

function hasCloseOperation(histories: PerpTradeHistory[]) {
  return histories.some(
    (history) => history.operation === PerpTradeHistoryOperation.Close,
  );
}

function PositionSection({
  title,
  histories,
  pageSize,
  page,
  onChangePage,
  emptyLabel,
}: {
  title: string;
  histories: PerpTradeHistory[][];
  pageSize: number;
  page: number;
  onChangePage: (page: number) => void;
  emptyLabel: string;
}) {
  const totalPages = Math.max(1, Math.ceil(histories.length / pageSize));
  const visibleHistories = histories.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col">
        <h3 className="text-sm font-bold text-white">
          {title} ({histories.length})
        </h3>

        {histories.length > pageSize ? (
          <Pagination
            size="sm"
            color="secondary"
            page={page}
            total={totalPages}
            onChange={onChangePage}
          />
        ) : null}
      </div>

      {visibleHistories.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {visibleHistories.map((item) => (
            <HistoriesView
              key={item.map((history) => history.id).join("-")}
              histories={item}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-neutral-800 px-4 py-6 text-center text-xs text-neutral-500">
          {emptyLabel}
        </div>
      )}
    </section>
  );
}

export function ExpertPositionsPanel({
  missionHistories,
}: ExpertPositionsPanelProps) {
  const [openedPage, setOpenedPage] = useState(1);
  const [closedPage, setClosedPage] = useState(1);

  const { openedPositions, closedPositions } = useMemo(() => {
    return {
      openedPositions: missionHistories.filter(
        (histories) => !hasCloseOperation(histories),
      ),
      closedPositions: missionHistories.filter(hasCloseOperation),
    };
  }, [missionHistories]);

  return (
    <div className="flex h-full max-h-175 w-full min-w-0 flex-col gap-5 overflow-y-auto pr-2">
      <PositionSection
        title="Opened Positions"
        histories={openedPositions}
        pageSize={OPENED_PAGE_SIZE}
        page={openedPage}
        onChangePage={setOpenedPage}
        emptyLabel="No opened positions"
      />

      <PositionSection
        title="Closed Positions"
        histories={closedPositions}
        pageSize={CLOSED_PAGE_SIZE}
        page={closedPage}
        onChangePage={setClosedPage}
        emptyLabel="No closed positions"
      />
    </div>
  );
}
