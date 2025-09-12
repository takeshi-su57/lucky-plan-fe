"use client";

import { PerpTradingEventLog } from "@/graphql/gql/graphql";
import { JSONTree } from "react-json-tree";

export type EventLogsViewProps = {
  perpTradingEventLogs: PerpTradingEventLog[];
};

export function EventLogsView({ perpTradingEventLogs }: EventLogsViewProps) {
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-y-auto">
      {perpTradingEventLogs.map((eventLog) => (
        <JSONTree
          data={{ ...eventLog, jsonLog: JSON.parse(eventLog.jsonLog) }}
          key={eventLog.id}
        />
      ))}
    </div>
  );
}
