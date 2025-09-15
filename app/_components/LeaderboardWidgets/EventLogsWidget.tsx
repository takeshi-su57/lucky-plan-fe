import { Spinner } from "@nextui-org/react";
import { Address } from "viem";
import { Platform } from "@/graphql/gql/graphql";

import { useGetPerpEventLogs } from "@/app/_hooks/useHistory";
import { PerpEventLogPnlChart } from "./PerpEventLogPnlChart/PerpEventLogPnlChart";

export type EventLogsWidgetProps = {
  address: string;
  platform: Platform;
};

export function EventLogsWidget({ address, platform }: EventLogsWidgetProps) {
  const { eventLogs, loading } = useGetPerpEventLogs(address, platform);

  return (
    <div className="flex flex-col gap-4">
      <h6>Analyze User</h6>
      <span>Address: {address}</span>
      {loading ? (
        <Spinner color="warning" size="lg" />
      ) : (
        <PerpEventLogPnlChart
          address={address as Address}
          perpTradingEventLogs={eventLogs}
          hideTags
        />
      )}
    </div>
  );
}
