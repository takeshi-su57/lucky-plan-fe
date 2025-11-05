import { Contract, TradingSignalLog } from "@/graphql/gql/graphql";

import { useMemo } from "react";
import { convertPerpTradingEventLogToHistory } from "@/utils/historiesV2Chart";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import { PairChip } from "../LeaderboardWidgets/PairChip";
import { twMerge } from "tailwind-merge";

function getKey(pair: string, isLong: boolean) {
  return JSON.stringify({ pair, isLong });
}

function parseKey(key: string) {
  return JSON.parse(key) as {
    pair: string;
    isLong: boolean;
  };
}

export function SignalMessage({ signals }: { signals: TradingSignalLog[] }) {
  const allContracts = useGetAllContracts();

  const items = useMemo(() => {
    const eventLogs = signals.flatMap((signal) => signal.eventLogs);

    const contractsMapa: Record<number, Contract> = {};

    allContracts.forEach((contract) => {
      contractsMapa[contract.id] = contract;
    });

    const perpTradeHistories = convertPerpTradingEventLogToHistory(
      contractsMapa,
      eventLogs,
    );

    const operationMaps: Record<string, Record<string, number>> = {};

    perpTradeHistories.forEach((history) => {
      const key = getKey(history.pair.toLowerCase(), history.isLong);

      const obj = operationMaps[key];

      if (obj) {
        obj[history.operation] = (obj[history.operation] || 0) + 1;
      } else {
        operationMaps[key] = {
          [history.operation]: 1,
        };
      }
    });

    return Object.entries(operationMaps).map(([key, operations]) => {
      const { pair, isLong } = parseKey(key);

      return {
        pair,
        isLong,
        operations: Object.entries(operations).map(([operation, count]) => ({
          operation,
          count,
        })),
      };
    });
  }, [allContracts, signals]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">({signals.length}) Trading Signals</span>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={getKey(item.pair, item.isLong)}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <PairChip pairName={item.pair} />

              <span
                className={twMerge(
                  "text-sm",
                  item.isLong ? "text-green-700" : "text-red-700",
                )}
              >
                {item.isLong ? "Long" : "Short"}
              </span>
            </div>

            {item.operations.map((operation) => (
              <div
                key={operation.operation}
                className="flex items-center gap-2"
              >
                <span className="text-base text-neutral-400/60">
                  {operation.operation}
                </span>
                <span className="text-base text-green-400">
                  {operation.count}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
