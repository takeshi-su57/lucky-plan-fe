"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Chip,
  Input,
  Progress,
  Select,
  SelectItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Switch,
  Tab,
  Tabs,
  Tooltip,
} from "@heroui/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import { RightDrawer } from "@/components/modals/RightDrawer";
import {
  RpcWorkerDashboardQuery,
  RpcWorkerStatus,
} from "@/graphql/gql/graphql";
import {
  useRpcEndpointActions,
  useRpcWorkerDashboard,
} from "@/app/_hooks/useRpcWorkers";
import { AddRpcWorkerModal } from "./AddRpcWorkerModal";
import { RpcChainsView } from "./RpcChainsView";
import { RpcTokensView } from "./RpcTokensView";
import { RPC_CHAIN_NAMES, rpcChainName } from "./rpcChains";
import {
  ago,
  formatDuration,
  formatNumber,
  RpcWorkerItem,
  StatusChip,
  STATUS_ORDER,
  STATUS_STYLE,
  useNow,
  workerName,
} from "./rpcWorkerShared";

type RateGroupItem =
  RpcWorkerDashboardQuery["rpcWorkerDashboard"]["rateGroups"][number];
type AdaptionItem =
  RpcWorkerDashboardQuery["rpcWorkerDashboard"]["adaptions"][number];

const chainName = rpcChainName;

function RateGroupControl({
  group,
  actions,
  now,
}: {
  group: RateGroupItem;
  actions: ReturnType<typeof useRpcEndpointActions>;
  now: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(String(group.limit));
  const [rateValue, setRateValue] = useState(String(group.ratePerSecond ?? 0));
  const limit = Number(value);
  const rate = Number(rateValue);
  const isValid = Number.isInteger(limit) && limit >= 1 && limit <= 500;
  const isRateValid = rateValue !== "" && rate >= 0 && rate <= 1000;
  const cooling = !!group.cooldownUntil && group.cooldownUntil > now;
  const changed = limit !== group.limit || rate !== (group.ratePerSecond ?? 0);

  return (
    <Popover
      placement="bottom-end"
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          setValue(String(group.limit));
          setRateValue(String(group.ratePerSecond ?? 0));
        }
      }}
    >
      <PopoverTrigger>
        <Chip
          as="button"
          size="sm"
          variant="flat"
          className="cursor-pointer"
          color={
            cooling
              ? "danger"
              : group.inFlight >= group.limit
                ? "warning"
                : "default"
          }
        >
          {group.key} {group.inFlight}/{group.limit} in flight
          {group.ratePerSecond ? ` · ${group.ratePerSecond}/s` : ""}
          {cooling
            ? ` · cooling ${formatDuration((group.cooldownUntil ?? now) - now)}`
            : ""}
          {group.rateLimitedCount ? ` · ${group.rateLimitedCount}× 429` : ""}
          {" · Edit"}
        </Chip>
      </PopoverTrigger>
      <PopoverContent className="w-80 items-stretch gap-3 p-4">
        <div>
          <p className="font-semibold">{group.key} limits</p>
          <p className="text-default-500 mt-1 text-xs">
            Shared by every {group.key} worker on every chain: these keys share
            one per-IP rate limit, so adding tokens does not add capacity. When
            the provider answers with a rate-limit error the whole group pauses
            briefly (1s, doubling up to 30s) instead of sidelining one token.
          </p>
        </div>
        <Input
          autoFocus
          size="sm"
          type="number"
          label="Max requests at once"
          min={1}
          max={500}
          value={value}
          onValueChange={setValue}
          isInvalid={!isValid}
          errorMessage={isValid ? undefined : "Whole number from 1 to 500"}
        />
        <Input
          size="sm"
          type="number"
          label="Requests per second"
          description="0 = no rate limit. dRPC free measured ~2-3/s per IP."
          min={0}
          max={1000}
          step={0.5}
          value={rateValue}
          onValueChange={setRateValue}
          isInvalid={!isRateValid}
          errorMessage={isRateValid ? undefined : "From 0 to 1000"}
        />
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="light" onPress={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            color="primary"
            isDisabled={!isValid || !isRateValid || !changed || actions.loading}
            onPress={async () => {
              if (await actions.setRateGroupLimit(group.key, limit, rate)) {
                setIsOpen(false);
              }
            }}
          >
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function AdaptionCard({
  adaption,
  now,
}: {
  adaption: AdaptionItem;
  now: number;
}) {
  const done = Math.max(adaption.checkpointBlock - adaption.fromBlock + 1, 0);
  const percent = adaption.totalBlocks
    ? (adaption.completedBlocks / adaption.totalBlocks) * 100
    : 100;
  const elapsed = now - adaption.startedAt;
  const rate = elapsed > 0 ? adaption.completedBlocks / (elapsed / 1000) : 0;
  const remaining = adaption.totalBlocks - adaption.completedBlocks;

  return (
    <div className="border-default-200 rounded-xl border p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold">Contract #{adaption.contractId}</p>
          <p className="text-default-500 text-xs">
            {chainName(adaption.chainId)} · running {formatDuration(elapsed)}
          </p>
        </div>
        <Chip size="sm" variant="flat" color="primary">
          {percent.toFixed(1)}%
        </Chip>
      </div>
      <Progress
        aria-label="Backfill progress"
        className="mt-3"
        size="sm"
        value={percent}
      />
      <dl className="text-default-600 mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <dt>Checkpoint</dt>
        <dd className="text-right font-mono">
          {formatNumber(adaption.checkpointBlock)}
        </dd>
        <dt>Contiguous done</dt>
        <dd className="text-right font-mono">{formatNumber(done)}</dd>
        <dt>Speed</dt>
        <dd className="text-right font-mono">
          {formatNumber(Math.round(rate))} blocks/s
        </dd>
        <dt>ETA</dt>
        <dd className="text-right font-mono">
          {rate > 0 ? formatDuration((remaining / rate) * 1000) : "—"}
        </dd>
        <dt>In flight / retry</dt>
        <dd className="text-right font-mono">
          {adaption.inFlightRanges} / {adaption.retryRanges}
        </dd>
      </dl>
    </div>
  );
}

function WorkerDetails({
  worker,
  now,
  actions,
}: {
  worker: RpcWorkerItem;
  now: number;
  actions: ReturnType<typeof useRpcEndpointActions>;
}) {
  const [maxRange, setMaxRange] = useState(
    worker.maxBlockRange ? String(worker.maxBlockRange) : "",
  );
  const [parallel, setParallel] = useState(String(worker.concurrency));
  const [confirmDelete, setConfirmDelete] = useState(false);
  const total = worker.successCount + worker.failureCount;
  const id = worker.endpointId ?? null;

  const rows: [string, React.ReactNode][] = [
    ["Chain", chainName(worker.chainId)],
    ["Provider", `${worker.provider} · ${worker.tier}`],
    [
      "URL",
      <span className="font-mono break-all" key="url">
        {worker.maskedUrl}
      </span>,
    ],
    [
      "Max block range",
      worker.maxBlockRange
        ? formatNumber(worker.maxBlockRange)
        : "Unknown (learned on error)",
    ],
    [
      "Parallel requests",
      `${worker.activeSlots} running of ${worker.concurrency}`,
    ],
    ["Penalty level", worker.penaltyLevel],
    [
      "Available in",
      worker.penaltyUntil ? formatDuration(worker.penaltyUntil - now) : "Now",
    ],
    [
      "Success rate",
      total
        ? `${((worker.successCount / total) * 100).toFixed(1)}% of ${formatNumber(total)}`
        : "—",
    ],
    ["Blocks processed", formatNumber(worker.blocksProcessed)],
    [
      "Avg latency",
      worker.avgLatencyMs ? `${formatNumber(worker.avgLatencyMs)} ms` : "—",
    ],
    ["Last success", ago(worker.lastSuccessAt, now)],
    ["Last error", ago(worker.lastErrorAt, now)],
    [
      "Token",
      worker.tokenHint ? (
        <span className="font-mono" key="token">
          {worker.tokenHint}
        </span>
      ) : (
        "None (public URL)"
      ),
    ],
    [
      "Health check",
      worker.lastCheckOk == null
        ? "Never"
        : worker.lastCheckOk
          ? `OK · ${worker.lastCheckLatencyMs} ms · ${ago(worker.lastCheckedAt, now)}`
          : `Failed (${worker.lastCheckErrorKind}) · ${ago(worker.lastCheckedAt, now)}`,
    ],
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3 pr-10">
        <div className="min-w-0">
          <h1 className="truncate font-semibold">{workerName(worker)}</h1>
          <p className="text-default-500 text-xs">{worker.key}</p>
        </div>
        <StatusChip status={worker.status} />
      </div>

      {worker.stateReason ? (
        <div className="border-default-200 bg-default-50 rounded-lg border px-3 py-2 text-xs">
          {worker.stateReason}
        </div>
      ) : null}

      {worker.assignmentContractId ? (
        <div className="border-primary-200 bg-primary-50 rounded-lg border px-3 py-2 text-xs">
          Working on contract #{worker.assignmentContractId}, blocks{" "}
          <span className="font-mono">
            {formatNumber(worker.assignmentFromBlock ?? 0)} –{" "}
            {formatNumber(worker.assignmentToBlock ?? 0)}
          </span>{" "}
          for {formatDuration(now - (worker.assignmentStartedAt ?? now))}
        </div>
      ) : null}

      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-default-500">{label}</dt>
            <dd className="text-right">{value}</dd>
          </div>
        ))}
      </dl>

      {worker.lastCheckOk === false && worker.lastCheckError ? (
        <div>
          <p className="text-default-500 mb-1 text-xs">Health check error</p>
          <pre className="bg-danger-50 max-h-48 overflow-auto rounded-lg p-3 text-xs whitespace-pre-wrap">
            {worker.lastCheckError}
          </pre>
        </div>
      ) : null}

      {worker.lastError ? (
        <div>
          <p className="text-default-500 mb-1 text-xs">
            Last error{worker.lastErrorKind ? ` · ${worker.lastErrorKind}` : ""}
          </p>
          <pre className="bg-default-100 max-h-48 overflow-auto rounded-lg p-3 text-xs whitespace-pre-wrap">
            {worker.lastError}
          </pre>
        </div>
      ) : null}

      {id === null ? (
        <p className="text-default-500 text-xs">
          This worker comes from .env because its chain has no seeded endpoints.
          Run the seed to manage it here.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-end gap-2">
            <Input
              size="sm"
              type="number"
              label="Max block range"
              description="Blocks per getLogs call. Empty = learn it."
              placeholder="Unknown"
              value={maxRange}
              onValueChange={setMaxRange}
              min={0}
              max={100000}
            />
            <Input
              size="sm"
              type="number"
              label="Parallel requests"
              description="1–64. Raise for paid keys."
              value={parallel}
              onValueChange={setParallel}
              min={1}
              max={64}
            />
            <Button
              size="sm"
              variant="flat"
              isDisabled={
                actions.loading ||
                !(Number(parallel) >= 1 && Number(parallel) <= 64) ||
                Number(maxRange) > 100000
              }
              onPress={() =>
                actions.setEndpointSettings(id, {
                  maxBlockRange: Number(maxRange) || 0,
                  concurrency: Number(parallel),
                })
              }
            >
              Save
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="flat"
              isLoading={actions.checking}
              onPress={() => actions.checkEndpoints({ ids: [id] })}
            >
              Check now
            </Button>
            {worker.state === "Active" ? (
              <Button
                color="warning"
                variant="flat"
                isDisabled={actions.loading}
                onPress={() => actions.pauseEndpoint(id)}
              >
                Pause
              </Button>
            ) : (
              <Button
                color="success"
                variant="flat"
                isDisabled={actions.loading}
                onPress={() => actions.resumeEndpoint(id)}
              >
                Resume
              </Button>
            )}
            {confirmDelete ? (
              <Button
                color="danger"
                isDisabled={actions.loading}
                onPress={() => actions.deleteEndpoint(id)}
              >
                Confirm delete
              </Button>
            ) : (
              <Button
                color="danger"
                variant="light"
                onPress={() => setConfirmDelete(true)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const columns: TableColumnProps[] = [
  { id: "worker", component: "Worker", allowsSorting: true },
  { id: "chain", component: "Chain", allowsSorting: true },
  { id: "status", component: "Status", allowsSorting: true },
  { id: "range", component: "Max range", allowsSorting: true },
  { id: "penalty", component: "Penalty", allowsSorting: true },
  { id: "results", component: "OK / Fail", allowsSorting: true },
  { id: "latency", component: "Latency", allowsSorting: true },
  { id: "error", component: "Last error" },
  { id: "actions", component: "" },
];

const PAGE_SIZE = 50;

type RpcView = "chains" | "tokens" | "endpoints";

export function RpcWorkersPanel() {
  const { data, loading, error } = useRpcWorkerDashboard();
  const actions = useRpcEndpointActions();
  const now = useNow();

  const [chainFilter, setChainFilter] = useState<string>("all");
  const [providerFilter, setProviderFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<RpcWorkerStatus | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [view, setView] = useState<RpcView>("chains");

  const dashboard = data?.rpcWorkerDashboard;
  const workers = useMemo(() => dashboard?.workers ?? [], [dashboard]);

  // Status is computed server-side when polled; refine penalty expiry locally
  // so countdowns flip to Available without waiting for the next poll.
  const liveWorkers = useMemo(
    () =>
      workers.map((worker) =>
        worker.status === RpcWorkerStatus.Penalized &&
        worker.penaltyUntil &&
        worker.penaltyUntil <= now
          ? { ...worker, status: RpcWorkerStatus.Available }
          : worker,
      ),
    [workers, now],
  );

  const chains = useMemo(
    () =>
      Array.from(new Set(liveWorkers.map((w) => w.chainId))).sort(
        (a, b) => a - b,
      ),
    [liveWorkers],
  );
  const providers = useMemo(
    () => Array.from(new Set(liveWorkers.map((w) => w.provider))).sort(),
    [liveWorkers],
  );

  const baseFiltered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return liveWorkers.filter(
      (worker) =>
        (chainFilter === "all" || worker.chainId === Number(chainFilter)) &&
        (providerFilter === "all" || worker.provider === providerFilter) &&
        (!term ||
          workerName(worker).toLowerCase().includes(term) ||
          worker.maskedUrl.toLowerCase().includes(term) ||
          (worker.lastError ?? "").toLowerCase().includes(term)),
    );
  }, [liveWorkers, chainFilter, providerFilter, search]);

  const filtered = useMemo(
    () =>
      statusFilter
        ? baseFiltered.filter((worker) => worker.status === statusFilter)
        : baseFiltered,
    [baseFiltered, statusFilter],
  );

  const statusCounts = useMemo(() => {
    const counts = Object.fromEntries(
      STATUS_ORDER.map((status) => [status, 0]),
    ) as Record<RpcWorkerStatus, number>;
    baseFiltered.forEach((worker) => counts[worker.status]++);
    return counts;
  }, [baseFiltered]);

  const byChain = useMemo(() => {
    const groups = new Map<number, RpcWorkerItem[]>();
    filtered.forEach((worker) => {
      groups.set(worker.chainId, [
        ...(groups.get(worker.chainId) ?? []),
        worker,
      ]);
    });
    return Array.from(groups.entries()).sort(([a], [b]) => a - b);
  }, [filtered]);

  const selected = liveWorkers.find((worker) => worker.key === selectedKey);

  const rows = useMemo(
    () =>
      filtered.slice(0, limit).map((worker) => {
        const total = worker.successCount + worker.failureCount;

        return {
          id: worker.key,
          className: "cursor-pointer",
          data: {
            worker: {
              sortableAmount: workerName(worker),
              component: (
                <button
                  type="button"
                  className="flex max-w-64 flex-col text-left"
                  onClick={() => setSelectedKey(worker.key)}
                >
                  <span className="truncate font-medium">
                    {workerName(worker)}
                  </span>
                  <span className="text-default-400 truncate text-xs">
                    {worker.provider} · {worker.tier}
                  </span>
                </button>
              ),
            },
            chain: {
              sortableAmount: worker.chainId,
              component: chainName(worker.chainId),
            },
            status: {
              sortableAmount: STATUS_ORDER.indexOf(worker.status),
              component: <StatusChip status={worker.status} />,
            },
            range: {
              sortableAmount: worker.maxBlockRange ?? 0,
              component: worker.maxBlockRange
                ? formatNumber(worker.maxBlockRange)
                : "—",
            },
            penalty: {
              sortableAmount: worker.penaltyLevel,
              component:
                worker.penaltyLevel > 0 ? (
                  <span className="font-mono text-xs">
                    L{worker.penaltyLevel}
                    {worker.penaltyUntil && worker.penaltyUntil > now
                      ? ` · ${formatDuration(worker.penaltyUntil - now)}`
                      : ""}
                  </span>
                ) : (
                  "—"
                ),
            },
            results: {
              sortableAmount: total ? worker.successCount / total : -1,
              component: (
                <span className="font-mono text-xs">
                  <span className="text-success">{worker.successCount}</span> /{" "}
                  <span className="text-danger">{worker.failureCount}</span>
                </span>
              ),
            },
            latency: {
              sortableAmount: worker.avgLatencyMs ?? 0,
              component: worker.avgLatencyMs
                ? `${formatNumber(worker.avgLatencyMs)} ms`
                : "—",
            },
            error: {
              component: worker.lastError ? (
                <Tooltip
                  content={
                    <span className="max-w-96 text-xs">{worker.lastError}</span>
                  }
                >
                  <span className="text-default-500 block max-w-56 truncate text-xs">
                    {worker.lastErrorKind ? `${worker.lastErrorKind}: ` : ""}
                    {worker.lastError}
                  </span>
                </Tooltip>
              ) : (
                "—"
              ),
            },
            actions: {
              component:
                worker.endpointId == null ? null : worker.state === "Active" ? (
                  <Button
                    size="sm"
                    variant="flat"
                    color="warning"
                    isDisabled={actions.loading}
                    onPress={() => actions.pauseEndpoint(worker.endpointId!)}
                  >
                    Pause
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="flat"
                    color="success"
                    isDisabled={actions.loading}
                    onPress={() => actions.resumeEndpoint(worker.endpointId!)}
                  >
                    Resume
                  </Button>
                ),
            },
          },
        };
      }),
    [filtered, limit, now, actions],
  );

  if (loading && !data) return <Spinner />;

  if (error && !data) {
    return <p className="text-danger text-sm">{error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h6 className="text-lg font-semibold">RPC workers</h6>
          <p className="text-default-500 text-sm">
            Endpoints used by the aggressive leaderboard backfill. Updates every
            3 seconds.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {dashboard?.rateGroups.map((group) => (
            <RateGroupControl
              key={group.key}
              group={group}
              actions={actions}
              now={now}
            />
          ))}
          <Chip
            size="sm"
            variant="dot"
            color={dashboard?.analyticsOnline ? "success" : "danger"}
          >
            Analytics {dashboard?.analyticsOnline ? "online" : "offline"}
          </Chip>
          <Tooltip
            content={
              dashboard?.paidOnly
                ? "Backfill uses only Paid-tier endpoints. Other endpoints keep their state and come back when you turn this off."
                : "Turn on to backfill with Paid-tier endpoints only (e.g. the paid dRPC key), without pausing everything else."
            }
          >
            <div className="flex items-center">
              <Switch
                size="sm"
                color="warning"
                isSelected={!!dashboard?.paidOnly}
                isDisabled={actions.loading}
                onValueChange={(enabled) => actions.setPaidOnly(enabled)}
              >
                Paid endpoints only
              </Switch>
            </div>
          </Tooltip>{" "}
          <Button color="primary" size="sm" onPress={() => setIsAddOpen(true)}>
            Add worker
          </Button>
        </div>
      </div>

      {dashboard?.paidOnly
        ? (() => {
            const activePaid = liveWorkers.filter(
              (worker) => worker.tier === "Paid" && worker.state === "Active",
            );
            const paidChains = new Set(activePaid.map((w) => w.chainId));
            const runningChains = Array.from(
              new Set(dashboard.adaptions.map((a) => a.chainId)),
            );
            const uncovered = runningChains.filter((c) => !paidChains.has(c));

            return (
              <div
                className={`rounded-xl border px-4 py-3 text-sm ${
                  activePaid.length === 0 || uncovered.length
                    ? "border-danger-200 bg-danger-50"
                    : "border-warning-200 bg-warning-50"
                }`}
              >
                <p className="font-semibold">Paid-only backfill is on</p>
                <p className="text-default-600 mt-1">
                  {activePaid.length === 0
                    ? "No Paid endpoint is active, so backfills cannot make progress. Resume the paid token in the Tokens view, or turn this off."
                    : uncovered.length
                      ? `No active Paid endpoint on ${uncovered.map(chainName).join(", ")}: backfills there are stalled.`
                      : `${activePaid.length} active Paid endpoints on ${paidChains.size} chains, ${activePaid.reduce((sum, w) => sum + w.concurrency, 0)} parallel requests in total.`}
                </p>
              </div>
            );
          })()
        : null}

      {dashboard?.adaptions.length ? (
        <section>
          <h2 className="mb-2 font-semibold">Running backfills</h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {dashboard.adaptions.map((adaption) => (
              <AdaptionCard
                key={adaption.contractId}
                adaption={adaption}
                now={now}
              />
            ))}
          </div>
        </section>
      ) : (
        <p className="text-default-500 text-sm">
          No aggressive backfill is running.
        </p>
      )}

      <Tabs
        aria-label="rpc-worker-views"
        selectedKey={view}
        onSelectionChange={(key) => key && setView(key as RpcView)}
      >
        <Tab key="chains" title="Chains" />
        <Tab key="tokens" title="Tokens" />
        <Tab key="endpoints" title="Endpoints" />
      </Tabs>

      {view === "chains" ? (
        <RpcChainsView
          workers={liveWorkers}
          now={now}
          actions={actions}
          onOpenChain={(chainId) => {
            setChainFilter(String(chainId));
            setView("endpoints");
          }}
        />
      ) : null}

      {view === "tokens" ? (
        <RpcTokensView
          workers={liveWorkers}
          now={now}
          actions={actions}
          onSelectWorker={setSelectedKey}
        />
      ) : null}

      {view === "endpoints" ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            {STATUS_ORDER.filter(
              (status) => statusCounts[status] > 0 || status === statusFilter,
            ).map((status) => (
              <Chip
                key={status}
                variant={statusFilter === status ? "solid" : "flat"}
                color={STATUS_STYLE[status].chip}
                className="cursor-pointer"
                onClick={() =>
                  setStatusFilter(statusFilter === status ? null : status)
                }
              >
                {status} · {statusCounts[status]}
              </Chip>
            ))}
            {statusFilter ? (
              <Button
                size="sm"
                variant="light"
                onPress={() => setStatusFilter(null)}
              >
                Clear
              </Button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              size="sm"
              className="max-w-48"
              label="Chain"
              selectedKeys={[chainFilter]}
              onChange={(e) => setChainFilter(e.target.value || "all")}
            >
              {[
                <SelectItem key="all">All chains</SelectItem>,
                ...chains.map((chainId) => (
                  <SelectItem key={String(chainId)}>
                    {chainName(chainId)}
                  </SelectItem>
                )),
              ]}
            </Select>
            <Select
              size="sm"
              className="max-w-48"
              label="Provider"
              selectedKeys={[providerFilter]}
              onChange={(e) => setProviderFilter(e.target.value || "all")}
            >
              {[
                <SelectItem key="all">All providers</SelectItem>,
                ...providers.map((provider) => (
                  <SelectItem key={provider}>{provider}</SelectItem>
                )),
              ]}
            </Select>
            <Input
              size="sm"
              className="max-w-72"
              label="Search"
              placeholder="Name, URL or error"
              value={search}
              onValueChange={setSearch}
              isClearable
              onClear={() => setSearch("")}
            />
          </div>

          <section className="flex flex-col gap-4">
            <h2 className="font-semibold">Worker map</h2>
            {byChain.length === 0 ? (
              <p className="text-default-500 text-sm">
                No workers match the filters.
              </p>
            ) : null}
            {byChain.map(([chainId, chainWorkers]) => (
              <div key={chainId}>
                <div className="mb-2 flex items-center gap-2 text-sm">
                  <span className="font-medium">{chainName(chainId)}</span>
                  <span className="text-default-400 text-xs">
                    {chainWorkers.length} workers ·{" "}
                    {
                      chainWorkers.filter(
                        (w) => w.status === RpcWorkerStatus.Working,
                      ).length
                    }{" "}
                    working
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {chainWorkers.map((worker) => (
                    <Tooltip
                      key={worker.key}
                      content={
                        <div className="text-xs">
                          <p className="font-semibold">{workerName(worker)}</p>
                          <p>
                            {worker.status}
                            {worker.penaltyUntil && worker.penaltyUntil > now
                              ? ` · ${formatDuration(worker.penaltyUntil - now)} left`
                              : ""}
                          </p>
                          {worker.lastErrorKind ? (
                            <p>Last error: {worker.lastErrorKind}</p>
                          ) : null}
                        </div>
                      }
                    >
                      <button
                        type="button"
                        aria-label={`${workerName(worker)}: ${worker.status}`}
                        className={`h-4 w-4 rounded-sm ${STATUS_STYLE[worker.status].cell} ${
                          worker.key === selectedKey
                            ? "ring-foreground ring-2"
                            : ""
                        }`}
                        onClick={() => setSelectedKey(worker.key)}
                      />
                    </Tooltip>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-semibold">
              Workers{" "}
              <span className="text-default-400 text-sm">
                ({filtered.length})
              </span>
            </h2>
            <DataTable
              aria-label="RPC workers"
              columns={columns}
              rows={rows}
              classNames={{
                td: "py-2",
                th: "text-xs uppercase tracking-widest font-normal",
              }}
            />
            {filtered.length > limit ? (
              <Button
                variant="flat"
                onPress={() => setLimit(limit + PAGE_SIZE)}
              >
                Show {Math.min(PAGE_SIZE, filtered.length - limit)} more
              </Button>
            ) : null}
          </section>
        </>
      ) : null}

      <RightDrawer
        isOpen={!!selected}
        isDismissable
        isKeyboardDismissDisabled={false}
        onOpenChange={(open) => !open && setSelectedKey(null)}
      >
        {selected ? (
          <WorkerDetails
            key={selected.key}
            worker={selected}
            now={now}
            actions={actions}
          />
        ) : null}
      </RightDrawer>

      <AddRpcWorkerModal
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        chains={Object.keys(RPC_CHAIN_NAMES).map(Number)}
        onSubmit={actions.createEndpoints}
        isLoading={actions.loading}
      />
    </div>
  );
}
