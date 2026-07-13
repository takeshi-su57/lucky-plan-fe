"use client";

import { useMemo, useState } from "react";
import { Button } from "@heroui/react";

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
  const safePage = Math.min(page, totalPages);
  const visibleHistories = histories.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col">
        <h3 className="text-sm font-bold text-white">
          {title} ({histories.length})
        </h3>

        {histories.length > pageSize ? (
          <div className="mt-2 flex items-center gap-2">
            <Button
              size="sm"
              variant="flat"
              onPress={() => onChangePage(safePage - 1)}
              isDisabled={safePage === 1}
            >
              Previous
            </Button>
            <span className="text-default-500 text-xs tabular-nums">
              Page {safePage} / {totalPages}
            </span>
            <Button
              size="sm"
              variant="flat"
              onPress={() => onChangePage(safePage + 1)}
              isDisabled={safePage === totalPages}
            >
              Next
            </Button>
          </div>
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
    const openedPositions: PerpTradeHistory[][] = [];
    const closedPositions: PerpTradeHistory[][] = [];

    for (const histories of missionHistories) {
      (hasCloseOperation(histories) ? closedPositions : openedPositions).push(
        histories,
      );
    }

    return { openedPositions, closedPositions };
  }, [missionHistories]);

  return (
    <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-5 overflow-y-auto pr-2">
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
