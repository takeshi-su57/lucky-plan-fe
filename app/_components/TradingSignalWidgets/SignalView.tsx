import { useMemo } from "react";

import { Contract, PerpTradingEventLog, Platform } from "@/graphql/gql/graphql";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import { convertPerpTradingEventLogToHistory } from "@/utils/historiesV2Chart";
import { getSortedPartialHistories } from "@/utils/historiesV2Chart";

import { SignalItem } from "./SignalItem";

export type SignalViewProps = {
  platform: Platform;
  signalId: number;
  eventLogs: PerpTradingEventLog[];
};

export function SignalView({ platform, signalId, eventLogs }: SignalViewProps) {
  const allContracts = useGetAllContracts();

  const { missionHistories } = useMemo(() => {
    const contractsMapa: Record<number, Contract> = {};

    allContracts.forEach((contract) => {
      contractsMapa[contract.id] = contract;
    });

    const perpTradeHistories = convertPerpTradingEventLogToHistory(
      contractsMapa,
      eventLogs,
    );

    return getSortedPartialHistories(perpTradeHistories, {
      range: undefined,
    });
  }, [allContracts, eventLogs]);

  return (
    <div className="flex flex-wrap items-start gap-6">
      {missionHistories.map((histories, index) => (
        <SignalItem
          key={index}
          signalId={signalId}
          platform={platform}
          histories={histories}
        />
      ))}
    </div>
  );
}
