"use client";

import { useMemo, useState } from "react";
import { Autocomplete, AutocompleteItem, Checkbox } from "@nextui-org/react";
import {
  Contract,
  PerpTradeHistoryOperation,
  PerpTradingEventLog,
  Platform,
} from "@/graphql/gql/graphql";
import { PerpTradeHistory } from "@/web3/types";

import { useGetAllContracts } from "@/app/_hooks/useContract";
import {
  convertPerpTradingEventLogToHistory,
  getSortedPartialHistories,
} from "@/utils/historiesV2Chart";
import { PairChip } from "../LeaderboardWidgets/PairChip";
import { SignalItem } from "./SignalItem";

type MissionItem = {
  id: number;
  platform: Platform;
  isLong: boolean;
  isClosed: boolean;
  collateral: number;
  leverage: number;
  size: number;
  pair: string;
  date: Date;
  price: number;
  histories: (PerpTradeHistory & { date: Date; id: number })[];
};

export type InsightPanelProps = {
  items: {
    address: string;
    platform: Platform;
    eventLogs: PerpTradingEventLog[];
  }[];
};

export function InsightPanel({ items }: InsightPanelProps) {
  const allContracts = useGetAllContracts();

  const [selectedPair, setSelectedPair] = useState<string | null>(null);
  const [hideClosed, setHideClosed] = useState(false);

  const { pairs, missionsMap } = useMemo(() => {
    const contractsMapa: Record<number, Contract> = {};

    const missionsMap: Record<string, MissionItem[]> = {};

    allContracts.forEach((contract) => {
      contractsMapa[contract.id] = contract;
    });

    items.map((item) => {
      const perpTradeHistories = convertPerpTradingEventLogToHistory(
        contractsMapa,
        item.eventLogs,
      );

      const { missionHistories } = getSortedPartialHistories(
        perpTradeHistories,
        {
          range: undefined,
        },
      );

      missionHistories.forEach((histories) => {
        const latestHistory = histories[histories.length - 1];

        const isClosed = histories.some(
          (history) => history.operation === PerpTradeHistoryOperation.Close,
        );

        if (hideClosed && isClosed) {
          return;
        }

        const isLong = latestHistory.isLong;
        const collateral = isClosed
          ? Math.max(...histories.map((history) => history.collateralInUsd))
          : latestHistory.collateralInUsd;
        const leverage = isClosed
          ? Math.max(...histories.map((history) => history.leverage))
          : latestHistory.leverage;
        const size = isClosed
          ? Math.max(...histories.map((history) => history.sizeInUsd))
          : latestHistory.sizeInUsd;

        const missionItem: MissionItem = {
          id: histories[0].id,
          platform: item.platform,
          isLong,
          isClosed,
          collateral,
          leverage,
          size,
          price: latestHistory.price,
          pair: latestHistory.pair,
          date: latestHistory.date,
          histories,
        };

        if (!missionsMap[latestHistory.pair.toLowerCase()]) {
          missionsMap[latestHistory.pair.toLowerCase()] = [];
        }

        missionsMap[latestHistory.pair.toLowerCase()].push(missionItem);
      });
    });

    const pairs = Object.entries(missionsMap)
      .map(([pair, missions]) => {
        return {
          pair,
          long: missions.filter((mission) => mission.isLong).length,
          short: missions.filter((mission) => !mission.isLong).length,
        };
      })
      .sort((a, b) => b.long + b.short - a.long - a.short);

    return {
      pairs,
      missionsMap,
    };
  }, [allContracts, hideClosed, items]);

  return (
    <div className="flex flex-col gap-6">
      <Autocomplete
        label="Search Pair"
        variant="underlined"
        defaultItems={pairs}
        placeholder="Search pair"
        selectedKey={selectedPair}
        onSelectionChange={(key) => setSelectedPair(key as string | null)}
      >
        {(item) => (
          <AutocompleteItem
            key={item.pair}
            className="font-mono"
            textValue={item.pair}
          >
            <div className="flex items-center gap-4">
              <PairChip pairName={item.pair} />
              <span className="text-sm">
                {item.long} Long, {item.short} Short
              </span>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>

      <Checkbox isSelected={hideClosed} onValueChange={setHideClosed}>
        Hide Closed
      </Checkbox>

      {selectedPair ? (
        <div className="flex flex-wrap items-start gap-4">
          {missionsMap[selectedPair]
            .sort((a, b) => b.price - a.price)
            .map((item) => (
              <SignalItem
                key={item.id}
                platform={item.platform}
                histories={item.histories}
              />
            ))}
        </div>
      ) : null}
    </div>
  );
}
