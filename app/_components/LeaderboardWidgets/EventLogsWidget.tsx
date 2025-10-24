import { Spinner } from "@nextui-org/react";
import { Address } from "viem";
import { Platform } from "@/graphql/gql/graphql";

import { useGetPerpEventLogs } from "@/app/_hooks/useHistory";
import { PerpEventLogPnlChart } from "./PerpEventLogPnlChart/PerpEventLogPnlChart";

export type EventLogsWidgetProps = {
  address: string;
  platform: Platform;
  cols: 1 | 2 | 4;
  fullHistory?: boolean;
};

export function EventLogsWidget({
  address,
  platform,
  cols,
  fullHistory = true,
}: EventLogsWidgetProps) {
  const { eventLogs, loading } = useGetPerpEventLogs([address], platform);

  const fullLogs = eventLogs[0] || [];
  const limitedLogs = fullLogs.slice(Math.max(0, fullLogs.length - 10000), fullLogs.length);

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <Spinner color="warning" size="lg" />
      ) : (
        <PerpEventLogPnlChart
          address={address as Address}
          perpTradingEventLogs={fullHistory ? fullLogs : limitedLogs}
          hideTags={false}
          cols={cols}
        />
      )}
    </div>
  );
}
