"use client";

import { useCallback } from "react";
import { Address } from "viem";
import { Chip, Spinner } from "@nextui-org/react";
import { Platform } from "@/graphql/gql/graphql";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";

import {
  useGetTradingSignalLogs,
  useUnregisterTradingSignal,
} from "@/app/_hooks/useTradingSignals";
import { SignalView } from "./SignalView";
import { EventLogsModalButton } from "../LeaderboardWidgets/EventLogsModalButton";

export function SignalControlPanel() {
  const { tradingSignalLogs, loading } = useGetTradingSignalLogs();
  const { unregisterTradingSignalLog } = useUnregisterTradingSignal();

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
    <div className="flex flex-col gap-6">
      {tradingSignalLogs.map((tradingSignalLog) => (
        <div key={tradingSignalLog.id} className="flex flex-col gap-6">
          <div className="flex flex-row items-center gap-6 rounded bg-neutral-400/5 px-4 py-2">
            <Chip variant="flat" color="default">
              {tradingSignalLog.platform}
            </Chip>
            <AddressWidget address={tradingSignalLog.address as Address} />

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
  );
}
