"use client";

import { useCallback, useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Spinner } from "@nextui-org/react";

import { PaginatedViews } from "@/components/views/PaginatedViews";

import {
  useGetTradingSignalLogs,
  useUnregisterTradingSignal,
} from "@/app/_hooks/useTradingSignals";
import { useGetActiveBots } from "@/app/_hooks/useAutomation";
import { GET_BLACKLIST_DOCUMENT } from "@/app/_hooks/usePlan";
import { GET_WHITELIST_DOCUMENT } from "@/app/_hooks/usePlan";
import { SignalControlItem } from "./SignalControlItem";

const PAGE_SIZE = 10;

export function SignalControlPanel() {
  const { tradingSignalLogs, loading } = useGetTradingSignalLogs();
  const { unregisterTradingSignalLog } = useUnregisterTradingSignal();
  const [page, setPage] = useState(1);

  const { bots } = useGetActiveBots();
  const { data: blacklist } = useQuery(GET_BLACKLIST_DOCUMENT);
  const { data: whitelist } = useQuery(GET_WHITELIST_DOCUMENT);

  const { activeAddresses, blacklistedAddresses, whitelistedAddresses } =
    useMemo(() => {
      const activeAddresses: Record<string, boolean> = {};
      const blacklistedAddresses: Record<string, boolean> = {};
      const whitelistedAddresses: Record<string, boolean> = {};

      bots.forEach((bot) => {
        activeAddresses[bot.leaderAddress.toLowerCase()] = true;
      });

      blacklist?.getBlacklist?.forEach((address) => {
        blacklistedAddresses[address.toLowerCase()] = true;
      });

      whitelist?.getWhitelist?.forEach((params) => {
        const { address } = JSON.parse(params);

        whitelistedAddresses[address.toLowerCase()] = true;
      });

      return {
        activeAddresses,
        blacklistedAddresses,
        whitelistedAddresses,
      };
    }, [blacklist?.getBlacklist, bots, whitelist?.getWhitelist]);

  const handleRemoveSignal = useCallback(
    (id: number) => () => {
      unregisterTradingSignalLog({
        variables: {
          signalId: id,
        },
      });
    },
    [unregisterTradingSignalLog],
  );

  if (loading) {
    return <Spinner color="warning" size="lg" />;
  }

  return (
    <PaginatedViews
      currentPage={page}
      totalPages={Math.ceil(tradingSignalLogs.length / PAGE_SIZE)}
      onChangePage={setPage}
      loading={false}
    >
      <div className="flex w-full flex-col gap-6">
        {tradingSignalLogs
          .sort((a, b) => a.id - b.id)
          .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
          .map((tradingSignalLog) => (
            <SignalControlItem
              key={tradingSignalLog.id}
              tradingSignalLog={tradingSignalLog}
              onUnsubscribeSignal={handleRemoveSignal(tradingSignalLog.id)}
              isActive={activeAddresses[tradingSignalLog.address.toLowerCase()]}
              isWhitelisted={
                whitelistedAddresses[tradingSignalLog.address.toLowerCase()]
              }
              isBlacklisted={
                blacklistedAddresses[tradingSignalLog.address.toLowerCase()]
              }
            />
          ))}
      </div>
    </PaginatedViews>
  );
}
