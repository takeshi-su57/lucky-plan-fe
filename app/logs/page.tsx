"use client";

import { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Spinner,
} from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";
import { LogSeverity } from "@/graphql/gql/graphql";
import { FiFilter } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

import { useGetLogs, useGetLogsSeverityCounts } from "@/app-hooks/useLog";

import { logSeverityColors } from "@/utils/constants";

export default function Page() {
  const [severity, setSeverity] = useState<LogSeverity | null>(null);

  const { logs, hasMore, fetchMore, loading } = useGetLogs(severity, false);
  const { data } = useGetLogsSeverityCounts();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        {data?.getLogsSeverityCounts.map((item) => (
          <Chip
            key={item.severity}
            variant="flat"
            color={logSeverityColors[item.severity]}
          >
            System {item.severity} {item.counts}
          </Chip>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {severity ? (
            <Chip
              variant="flat"
              color={logSeverityColors[severity]}
              onClose={() => setSeverity(null)}
            >
              {severity}
            </Chip>
          ) : null}
        </div>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly variant="bordered">
              <FiFilter />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="log severity dropdown"
            onAction={(key) => setSeverity(key as LogSeverity)}
          >
            {Object.values(LogSeverity).map((item) => (
              <DropdownItem key={item}>{item}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <Virtuoso
        style={{ height: 700, width: "100%" }}
        data={logs}
        itemContent={(_, log) => (
          <div
            className={twMerge(
              "flex w-full items-start gap-2 border-t border-neutral-400/20 p-2",
            )}
          >
            <div className="shrink-0">
              <Chip variant="flat" color={logSeverityColors[log.severity]}>
                {log.severity} {log.id}
              </Chip>
            </div>

            <div className="flex-1 text-sm text-neutral-400">
              <span>{log.summary}</span>
              <p className="w-full break-all py-2 text-xs text-neutral-400">
                {log.details}
              </p>
            </div>

            <div className="shrink-0">
              <Chip variant="flat" color="default">
                {dayjs(new Date(log.timestamp)).format("MMM D, YYYY h:mm A")}
              </Chip>
            </div>
          </div>
        )}
        endReached={() => hasMore && !loading && fetchMore()}
        components={{
          Footer: () => (
            <div className="flex w-full items-center justify-center">
              {hasMore === false ? (
                <span className="font-sans text-neutral-400/40">
                  No More Results Available
                </span>
              ) : loading ? (
                <Spinner color="primary" size="lg" />
              ) : null}
            </div>
          ),
        }}
      />
    </div>
  );
}
