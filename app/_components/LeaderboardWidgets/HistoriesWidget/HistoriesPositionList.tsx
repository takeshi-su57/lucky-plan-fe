import { PersonalTradeHistory } from "@/types";
import { HistoriesPosition } from "./HistoriesPosition";
import { Virtuoso } from "react-virtuoso";

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
  return (
    <Virtuoso
      style={{ height: 500, width: "100%" }}
      data={historiesGroupedByTradeIndex.sort(
        (a, b) => b.tradeIndex - a.tradeIndex,
      )}
      itemContent={(_, position) => (
        <HistoriesPosition
          key={position.tradeIndex}
          contractId={position.contractId}
          tradeIndex={position.tradeIndex}
          collateralIndex={position.collateralIndex}
          long={position.long}
          pair={position.pair}
          actions={position.actions}
        />
      )}
    />
  );
}
