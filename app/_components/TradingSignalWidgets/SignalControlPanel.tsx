"use client";

import { useCallback, useState, useMemo } from "react";
import { Address } from "viem";
import { Chip, Spinner } from "@nextui-org/react";
import { Platform } from "@/graphql/gql/graphql";
import { useQuery } from "@apollo/client";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import { PaginatedViews } from "@/components/views/PaginatedViews";

import {
  useGetTradingSignalLogs,
  useUnregisterTradingSignal,
} from "@/app/_hooks/useTradingSignals";
import { SignalView } from "./SignalView";
import { EventLogsModalButton } from "../LeaderboardWidgets/EventLogsModalButton";
import { useGetActiveBots } from "@/app/_hooks/useAutomation";
import { GET_BLACKLIST_DOCUMENT } from "@/app/_hooks/usePlan";
import { GET_WHITELIST_DOCUMENT } from "@/app/_hooks/usePlan";

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
          .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
          .map((tradingSignalLog) => (
            <div key={tradingSignalLog.id} className="flex flex-col gap-6">
              <div className="flex flex-row items-center gap-6 rounded bg-neutral-400/5 px-4 py-2">
                <Chip variant="flat" color="default">
                  {tradingSignalLog.platform}
                </Chip>
                <AddressWidget address={tradingSignalLog.address as Address} />

                {activeAddresses[tradingSignalLog.address.toLowerCase()] && (
                  <span className="rounded-md bg-green-400/10 p-1 text-green-400">
                    Active
                  </span>
                )}

                {whitelistedAddresses[
                  tradingSignalLog.address.toLowerCase()
                ] && (
                  <span className="ml-2 rounded-md bg-yellow-400/10 p-1 text-yellow-400">
                    Whitelisted
                  </span>
                )}
                {blacklistedAddresses[
                  tradingSignalLog.address.toLowerCase()
                ] && (
                  <span className="ml-2 rounded-md bg-red-400/10 p-1 text-red-400">
                    Blacklisted
                  </span>
                )}

                <ButtonWithConfirm
                  onPress={handleRemoveSignal(tradingSignalLog.id)}
                  color="danger"
                  size="sm"
                  variant="bordered"
                >
                  Unsubscribe
                </ButtonWithConfirm>

                <EventLogsModalButton
                  address={tradingSignalLog.address as Address}
                  platform={tradingSignalLog.platform as Platform}
                  label="Check"
                />
              </div>

              {tradingSignalLog.eventLogs.length > 0 ? (
                <SignalView
                  signalId={tradingSignalLog.id}
                  platform={tradingSignalLog.platform as Platform}
                  eventLogs={tradingSignalLog.eventLogs}
                />
              ) : (
                <p className="text-base text-neutral-400">No event logs</p>
              )}
            </div>
          ))}
      </div>
    </PaginatedViews>
  );
}
