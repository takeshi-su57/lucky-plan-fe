"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@heroui/react";
import { Virtuoso } from "react-virtuoso";
import { LogSeverity } from "@/graphql/gql/graphql";
import {
  FiCheck,
  FiChevronDown,
  FiChevronRight,
  FiDownload,
  FiFilter,
} from "react-icons/fi";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";

import {
  useGetLogs,
  useGetLogsSeverityCounts,
  useLogReviewWeeks,
  useReviewLogWeek,
} from "@/app-hooks/useLog";
import { LOCAL_USER_JWT_KEY } from "@/app/_hooks/useUserJWT";

import { logSeverityColors } from "@/utils/constants";

const severityStyle: Record<LogSeverity, { dot: string; text: string }> = {
  [LogSeverity.Info]: { dot: "bg-primary", text: "text-primary" },
  [LogSeverity.Warning]: { dot: "bg-warning", text: "text-warning" },
  [LogSeverity.Error]: { dot: "bg-danger", text: "text-danger" },
  [LogSeverity.Debug]: { dot: "bg-secondary", text: "text-secondary" },
  [LogSeverity.Alert]: { dot: "bg-warning", text: "text-warning" },
  [LogSeverity.Critical]: { dot: "bg-danger", text: "text-danger" },
  [LogSeverity.Emergency]: { dot: "bg-danger", text: "text-danger" },
  [LogSeverity.Notice]: { dot: "bg-success", text: "text-success" },
  [LogSeverity.Default]: { dot: "bg-default-400", text: "text-default-500" },
};

const logLevelOptions = [
  { id: "all", label: "All levels" },
  ...Object.values(LogSeverity).map((level) => ({ id: level, label: level })),
];

export default function Page() {
  const [severity, setSeverity] = useState<LogSeverity | null>(null);
  const [expandedLogIds, setExpandedLogIds] = useState<Set<string>>(new Set());
  const { enqueueSnackbar } = useSnackbar();
  const { logs, hasMore, fetchMore, loading } = useGetLogs(severity, false);
  const { data } = useGetLogsSeverityCounts();
  const { data: reviewData } = useLogReviewWeeks();
  const [reviewWeek, { loading: reviewing }] = useReviewLogWeek();
  const [downloading, setDownloading] = useState<"week" | "month" | null>(null);

  const pendingWeek = useMemo(
    () => reviewData?.logReviewWeeks.find((week) => !week.reviewedAt),
    [reviewData],
  );
  const totalUnreviewed = useMemo(
    () =>
      data?.getLogsSeverityCounts.reduce(
        (total, item) => total + item.counts,
        0,
      ) ?? 0,
    [data],
  );

  const toggleLog = (id: string) => {
    setExpandedLogIds((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const downloadLogs = async (kind: "week" | "month") => {
    try {
      setDownloading(kind);
      const from =
        kind === "week" && pendingWeek
          ? new Date(pendingWeek.weekStart).toISOString().slice(0, 10)
          : new Date(Date.now() - 29 * 24 * 60 * 60 * 1000)
              .toISOString()
              .slice(0, 10);
      const to =
        kind === "week" && pendingWeek
          ? new Date(
              new Date(pendingWeek.weekStart).getTime() +
                6 * 24 * 60 * 60 * 1000,
            )
              .toISOString()
              .slice(0, 10)
          : new Date().toISOString().slice(0, 10);
      const token = window.localStorage.getItem(LOCAL_USER_JWT_KEY);
      const apiBase = process.env.NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_API.replace(
        /\/graphql$/,
        "",
      );
      const response = await fetch(
        `${apiBase}/admin/logs/download?from=${from}&to=${to}`,
        {
          headers: token
            ? { Authorization: `Bearer ${JSON.parse(token)}` }
            : {},
        },
      );
      if (!response.ok) throw new Error("Unable to download logs");
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = `luckyplans-logs-${from}-to-${to}.jsonl.gz`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
    } catch {
      enqueueSnackbar("Unable to download logs. Please try again.", {
        variant: "error",
      });
    } finally {
      setDownloading(null);
    }
  };

  return (
    <main className="flex min-h-0 flex-col gap-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            Logs
          </h1>
          <p className="text-default-500 mt-1 text-sm">
            {totalUnreviewed.toLocaleString()} unreviewed event
            {totalUnreviewed === 1 ? "" : "s"}
            {severity ? ` · ${severity}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="flat"
            startContent={<FiDownload />}
            isDisabled={!pendingWeek}
            isLoading={downloading === "week"}
            onPress={() => void downloadLogs("week")}
          >
            Review week
          </Button>
          <Button
            size="sm"
            variant="flat"
            startContent={<FiDownload />}
            isLoading={downloading === "month"}
            onPress={() => void downloadLogs("month")}
          >
            Export 30 days
          </Button>
        </div>
      </header>

      {pendingWeek ? (
        <section className="border-warning/30 bg-warning/10 flex flex-col gap-3 rounded-lg border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-foreground text-sm">
            <span className="font-medium">Weekly review due.</span> Review logs
            from {dayjs(pendingWeek.weekStart).format("MMM D, YYYY")}.
          </p>
          <Button
            size="sm"
            color="warning"
            variant="flat"
            isLoading={reviewing}
            startContent={<FiCheck />}
            onPress={() =>
              void reviewWeek({
                variables: { weekStart: pendingWeek.weekStart },
              }).catch(() =>
                enqueueSnackbar("Unable to mark this week as reviewed.", {
                  variant: "error",
                }),
              )
            }
          >
            Mark reviewed
          </Button>
        </section>
      ) : null}

      <section className="border-default-200 bg-content1 min-h-0 overflow-hidden rounded-xl border">
        <div className="border-default-200 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-foreground text-sm font-medium">
              Event stream
            </span>
            <Chip size="sm" variant="flat" color="success">
              Live
            </Chip>
            {data?.getLogsSeverityCounts.map((item) => (
              <button
                key={item.severity}
                type="button"
                onClick={() => setSeverity(item.severity)}
                className={`hover:bg-default-100 rounded-md px-2 py-1 text-xs transition-colors ${severityStyle[item.severity].text}`}
              >
                {item.severity} {item.counts}
              </button>
            ))}
          </div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                size="sm"
                variant="flat"
                startContent={<FiFilter />}
                endContent={<FiChevronDown />}
              >
                {severity ?? "All levels"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Filter logs by level"
              items={logLevelOptions}
              selectedKeys={severity ? [severity] : ["all"]}
              selectionMode="single"
              onAction={(key) =>
                setSeverity(key === "all" ? null : (key as LogSeverity))
              }
            >
              {(item) => (
                <DropdownItem key={item.id}>{item.label}</DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="border-default-200 bg-default-50 text-default-500 hidden grid-cols-[8px_132px_92px_160px_minmax(0,1fr)_72px] gap-3 border-b px-4 py-2 text-[11px] font-medium tracking-wider uppercase md:grid">
          <span />
          <span>Time</span>
          <span>Level</span>
          <span>Service</span>
          <span>Message</span>
          <span />
        </div>

        <Virtuoso
          style={{ height: 650, width: "100%" }}
          data={logs}
          itemContent={(_, log) => {
            const expanded = expandedLogIds.has(log.id);
            const hasDetails = Boolean(log.details);
            const style = severityStyle[log.severity];
            return (
              <button
                type="button"
                onClick={() => hasDetails && toggleLog(log.id)}
                className={`border-default-100 hover:bg-default-50 grid w-full grid-cols-[8px_minmax(0,1fr)_20px] gap-3 border-b px-4 py-3 text-left transition-colors md:grid-cols-[8px_132px_92px_160px_minmax(0,1fr)_72px] ${hasDetails ? "cursor-pointer" : "cursor-default"}`}
              >
                <span className={`mt-1.5 size-2 rounded-full ${style.dot}`} />
                <time className="text-default-500 font-mono text-xs tabular-nums md:col-start-2">
                  <span className="md:hidden">
                    {dayjs(log.timestamp).format("MMM D, HH:mm:ss")}
                  </span>
                  <span className="hidden md:inline">
                    {dayjs(log.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                  </span>
                </time>
                <span
                  className={`hidden text-xs font-medium md:block ${style.text}`}
                >
                  {log.severity}
                </span>
                <span className="text-default-500 hidden truncate font-mono text-xs md:block">
                  {log.service}
                </span>
                <span className="min-w-0 md:col-start-5">
                  <span className="mb-1 flex items-center gap-2 md:hidden">
                    <span className={`text-xs font-medium ${style.text}`}>
                      {log.severity}
                    </span>
                    <span className="text-default-400 truncate font-mono text-[11px]">
                      {log.service}
                    </span>
                  </span>
                  <span className="text-foreground block text-sm leading-5 break-words">
                    {log.summary}
                  </span>
                  {expanded && log.details ? (
                    <pre className="bg-default-100 text-default-700 mt-3 max-h-80 overflow-auto rounded-md border border-default-200 p-3 font-mono text-xs leading-5 whitespace-pre-wrap">
                      {log.details}
                    </pre>
                  ) : null}
                </span>
                <span className="text-default-400 flex min-w-0 items-center justify-self-end gap-1 pt-0.5 text-xs whitespace-nowrap">
                  {hasDetails ? (
                    <>
                      <span className="hidden md:inline">
                        {expanded ? "Hide" : "Details"}
                      </span>
                      {expanded ? <FiChevronDown /> : <FiChevronRight />}
                    </>
                  ) : null}
                </span>
              </button>
            );
          }}
          endReached={() => hasMore && !loading && fetchMore()}
          components={{
            Footer: () => (
              <div className="text-default-500 flex min-h-14 w-full items-center justify-center text-sm">
                {hasMore === false ? (
                  "End of retained logs"
                ) : loading ? (
                  <Spinner size="sm" />
                ) : null}
              </div>
            ),
          }}
        />
      </section>
    </main>
  );
}
