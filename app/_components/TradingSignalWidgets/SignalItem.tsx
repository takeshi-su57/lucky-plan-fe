import { PerpTradeHistory } from "@/web3/types";
import { PerpTradeHistoryOperation, Platform } from "@/graphql/gql/graphql";
import { HistoriesView } from "../LeaderboardWidgets/PerpEventLogPnlChart/HistoriesView";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import { useRemoveEventLogsFromTradingSignalLog } from "@/app/_hooks/useTradingSignals";

export type SignalItemProps = {
  signalId?: number;
  platform: Platform;
  histories: (PerpTradeHistory & { id: number; date: Date })[];
};

export function SignalItem({ signalId, platform, histories }: SignalItemProps) {
  const { removeEventLogsFromTradingSignalLog } =
    useRemoveEventLogsFromTradingSignalLog();

  const handleRemoveSignal = () => {
    if (signalId) {
      removeEventLogsFromTradingSignalLog({
        variables: {
          eventLogIds: histories.map((history) => history.id),
          signalId,
        },
      });
    }
  };

  const isClosed = histories.some(
    (history) => history.operation === PerpTradeHistoryOperation.Close,
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <HistoriesView platform={platform} histories={histories} />

      {isClosed && signalId ? (
        <ButtonWithConfirm
          onPress={handleRemoveSignal}
          variant="light"
          color="danger"
        >
          Remove Signal
        </ButtonWithConfirm>
      ) : null}
    </div>
  );
}
