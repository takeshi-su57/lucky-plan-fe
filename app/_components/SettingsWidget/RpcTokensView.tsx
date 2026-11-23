"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Chip,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Tooltip,
} from "@heroui/react";

import { RpcEndpointState, RpcWorkerStatus } from "@/graphql/gql/graphql";
import { useRpcEndpointActions } from "@/app/_hooks/useRpcWorkers";
import { RPC_CHAIN_NAMES, rpcChainName } from "./rpcChains";
import {
  ago,
  endpointCellClass,
  endpointProblem,
  formatNumber,
  isWorkable,
  RpcWorkerItem,
  TOKEN_HEALTH_STYLE,
  TokenHealth,
  tokenHealth,
} from "./rpcWorkerShared";

type TokenGroup = {
  tokenId: string;
  tokenHint: string;
  provider: string;
  tier: string;
  label: string | null;
  workers: RpcWorkerItem[];
  health: TokenHealth;
};

const HEALTH_ORDER: TokenHealth[] = [
  "Rejected",
  "Down",
  "Degraded",
  "Unchecked",
  "Healthy",
  "Paused",
];

const ALL_CHAINS = Object.keys(RPC_CHAIN_NAMES).map(Number);

type Actions = ReturnType<typeof useRpcEndpointActions>;

function ChainCell({
  chainId,
  worker,
  now,
  onSelect,
}: {
  chainId: number;
  worker: RpcWorkerItem | undefined;
  now: number;
  onSelect: (key: string) => void;
}) {
  if (!worker) {
    return (
      <Tooltip
        content={`${rpcChainName(chainId)}: not configured for this token`}
      >
        <span className="border-default-300 text-default-300 rounded-md border border-dashed px-2 py-0.5 text-xs">
          {rpcChainName(chainId)}
        </span>
      </Tooltip>
    );
  }

  const problem = endpointProblem(worker);

  return (
    <Tooltip
      content={
        <div className="max-w-80 text-xs">
          <p className="font-semibold">
            {rpcChainName(chainId)} · {worker.status}
          </p>
          <p>
            Check:{" "}
            {worker.lastCheckOk == null
              ? "never"
              : worker.lastCheckOk
                ? `ok, ${worker.lastCheckLatencyMs} ms, ${ago(worker.lastCheckedAt, now)}`
                : `failed (${worker.lastCheckErrorKind}), ${ago(worker.lastCheckedAt, now)}`}
          </p>
          {problem && (worker.lastCheckError || worker.lastError) ? (
            <p className="text-default-500 mt-1 break-words">
              {worker.lastCheckError ?? worker.lastError}
            </p>
          ) : null}
          {worker.successCount + worker.failureCount > 0 ? (
            <p>
              Backfill: {worker.successCount} ok / {worker.failureCount} failed
            </p>
          ) : null}
        </div>
      }
    >
      <button
        type="button"
        onClick={() => onSelect(worker.key)}
        className={`rounded-md px-2 py-0.5 text-xs font-medium text-white ${endpointCellClass(worker)} ${
          worker.state === "Paused" ? "opacity-60" : ""
        }`}
      >
        {rpcChainName(chainId)}
        {problem ? " ✕" : ""}
      </button>
    </Tooltip>
  );
}

function AddChainsButton({
  group,
  actions,
}: {
  group: TokenGroup;
  actions: Actions;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const existing = new Set(group.workers.map((worker) => worker.chainId));
  const missing = ALL_CHAINS.filter((chainId) => !existing.has(chainId));

  if (missing.length === 0) return null;

  return (
    <Popover
      placement="bottom-end"
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setSelected([]);
      }}
    >
      <PopoverTrigger>
        <Button size="sm" variant="light">
          Add chains
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 items-stretch gap-3 p-4">
        <p className="text-sm font-semibold">Add chains to {group.tokenHint}</p>
        <p className="text-default-500 text-xs">
          The server reuses the stored key, so you don&apos;t need to paste it.
          Each chain is checked before it is saved.
        </p>
        <CheckboxGroup value={selected} onValueChange={setSelected}>
          {missing.map((chainId) => (
            <Checkbox key={chainId} value={String(chainId)}>
              {rpcChainName(chainId)}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Button
          size="sm"
          color="primary"
          isDisabled={selected.length === 0 || actions.loading}
          onPress={async () => {
            if (
              await actions.addTokenChains(group.tokenId, selected.map(Number))
            ) {
              setIsOpen(false);
            }
          }}
        >
          Add {selected.length || ""}
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function TokenSettingsButton({
  group,
  actions,
}: {
  group: TokenGroup;
  actions: Actions;
}) {
  const ranges = Array.from(
    new Set(group.workers.map((worker) => worker.maxBlockRange ?? 0)),
  );
  const parallels = Array.from(
    new Set(group.workers.map((worker) => worker.concurrency)),
  );
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState("");
  const [parallel, setParallel] = useState("");
  const rangeNumber = Number(range);
  const parallelNumber = Number(parallel);
  const rangeValid =
    range === "" ||
    (Number.isInteger(rangeNumber) &&
      rangeNumber >= 0 &&
      rangeNumber <= 100_000);
  const parallelValid =
    Number.isInteger(parallelNumber) &&
    parallelNumber >= 1 &&
    parallelNumber <= 64;

  return (
    <Popover
      placement="bottom-end"
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          setRange(ranges.length === 1 && ranges[0] ? String(ranges[0]) : "");
          setParallel(String(Math.max(...parallels)));
        }
      }}
    >
      <PopoverTrigger>
        <Button size="sm" variant="light">
          Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 items-stretch gap-3 p-4">
        <div>
          <p className="text-sm font-semibold">
            {group.tokenHint} on all {group.workers.length} chains
          </p>
          <p className="text-default-500 mt-1 text-xs">
            Applies to every chain of this token. Paid keys usually allow
            10,000-block getLogs and many parallel requests; free dRPC allows
            100 blocks and shares one per-IP rate limit.
          </p>
        </div>
        <Input
          size="sm"
          type="number"
          label="Max block range per request"
          description={
            ranges.length > 1
              ? "Chains currently differ. Empty keeps each chain's value; 0 = learn from errors."
              : "Empty keeps the current value; 0 = learn from errors. Max 100,000."
          }
          min={0}
          max={100000}
          value={range}
          onValueChange={setRange}
          isInvalid={!rangeValid}
        />
        <Input
          size="sm"
          type="number"
          label="Parallel requests per chain"
          description="1–64. Free dRPC: keep 1 (the group rate limit applies anyway)."
          min={1}
          max={64}
          value={parallel}
          onValueChange={setParallel}
          isInvalid={!parallelValid}
        />
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="light" onPress={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            color="primary"
            isDisabled={!rangeValid || !parallelValid || actions.loading}
            onPress={async () => {
              // An empty range field keeps each chain's current value.
              const ok = await actions.setTokenSettings(group.tokenId, {
                maxBlockRange: range === "" ? undefined : rangeNumber,
                concurrency: parallelNumber,
              });
              if (ok) setIsOpen(false);
            }}
          >
            Apply to all chains
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function TokenRow({
  group,
  now,
  actions,
  onSelectWorker,
}: {
  group: TokenGroup;
  now: number;
  actions: Actions;
  onSelectWorker: (key: string) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const byChain = new Map(
    group.workers.map((worker) => [worker.chainId, worker]),
  );
  const workable = group.workers.filter(isWorkable).length;
  const penalized = group.workers.filter(
    (worker) => worker.status === RpcWorkerStatus.Penalized,
  ).length;
  const broken = group.workers.filter(
    (worker) => worker.state !== "Paused" && endpointProblem(worker),
  ).length;
  const paused = group.workers.filter(
    (worker) => worker.state === "Paused",
  ).length;
  const allPaused = paused === group.workers.length;
  const lastChecked = Math.max(
    0,
    ...group.workers.map((w) => w.lastCheckedAt ?? 0),
  );
  const blocks = group.workers.reduce(
    (sum, worker) => sum + worker.blocksProcessed,
    0,
  );
  const style = TOKEN_HEALTH_STYLE[group.health];
  const rangeValues = Array.from(
    new Set(group.workers.map((worker) => worker.maxBlockRange ?? 0)),
  );
  const rangeLabel =
    rangeValues.length > 1
      ? "mixed"
      : rangeValues[0]
        ? formatNumber(rangeValues[0])
        : "learn";
  const parallelValues = Array.from(
    new Set(group.workers.map((worker) => worker.concurrency)),
  );
  const parallelLabel =
    parallelValues.length > 1
      ? "mixed parallel"
      : `${parallelValues[0]} parallel`;
  const running = group.workers.reduce((sum, w) => sum + w.activeSlots, 0);

  return (
    <div
      className={`rounded-xl border p-4 ${
        style.chip === "danger"
          ? "border-danger-300"
          : style.chip === "warning"
            ? "border-warning-300"
            : "border-default-200"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-semibold">{group.tokenHint}</span>
            <Chip size="sm" variant="flat">
              {group.provider} · {group.tier}
            </Chip>
            <Tooltip content={style.hint}>
              <Chip size="sm" variant="flat" color={style.chip}>
                {group.health}
              </Chip>
            </Tooltip>
          </div>
          <p className="text-default-500 mt-1 text-xs">
            {group.label ? `${group.label} · ` : ""}
            {group.workers.length} chains · {workable} workable · {penalized}{" "}
            penalized · {broken} broken · {paused} paused ·{" "}
            {formatNumber(blocks)} blocks · range {rangeLabel} · {parallelLabel}
            {running ? ` (${running} running)` : ""} · checked{" "}
            {ago(lastChecked || null, now)}
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          <Button
            size="sm"
            variant="flat"
            isDisabled={actions.checking}
            onPress={() => actions.checkEndpoints({ tokenId: group.tokenId })}
          >
            Check
          </Button>
          {allPaused ? (
            <Button
              size="sm"
              variant="flat"
              color="success"
              isDisabled={actions.loading}
              onPress={() =>
                actions.setTokenState(group.tokenId, RpcEndpointState.Active)
              }
            >
              Resume all
            </Button>
          ) : (
            <Button
              size="sm"
              variant="flat"
              color="warning"
              isDisabled={actions.loading}
              onPress={() =>
                actions.setTokenState(group.tokenId, RpcEndpointState.Paused)
              }
            >
              Pause all
            </Button>
          )}
          {paused > 0 && !allPaused ? (
            <Button
              size="sm"
              variant="light"
              color="success"
              isDisabled={actions.loading}
              onPress={() =>
                actions.setTokenState(group.tokenId, RpcEndpointState.Active)
              }
            >
              Resume all
            </Button>
          ) : null}
          <TokenSettingsButton group={group} actions={actions} />
          <AddChainsButton group={group} actions={actions} />
          {confirmDelete ? (
            <Button
              size="sm"
              color="danger"
              isDisabled={actions.loading}
              onPress={() => actions.deleteToken(group.tokenId)}
            >
              Delete {group.workers.length} endpoints
            </Button>
          ) : (
            <Button
              size="sm"
              variant="light"
              color="danger"
              onPress={() => setConfirmDelete(true)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {ALL_CHAINS.map((chainId) => (
          <ChainCell
            key={chainId}
            chainId={chainId}
            worker={byChain.get(chainId)}
            now={now}
            onSelect={onSelectWorker}
          />
        ))}
      </div>
    </div>
  );
}

export function RpcTokensView({
  workers,
  now,
  actions,
  onSelectWorker,
}: {
  workers: RpcWorkerItem[];
  now: number;
  actions: Actions;
  onSelectWorker: (key: string) => void;
}) {
  const [providerFilter, setProviderFilter] = useState("all");
  const [healthFilter, setHealthFilter] = useState<TokenHealth | null>(null);
  const [search, setSearch] = useState("");

  const groups = useMemo(() => {
    const map = new Map<string, RpcWorkerItem[]>();
    workers.forEach((worker) => {
      if (!worker.tokenId) return;
      map.set(worker.tokenId, [...(map.get(worker.tokenId) ?? []), worker]);
    });

    return Array.from(map.entries())
      .map(
        ([tokenId, items]): TokenGroup => ({
          tokenId,
          tokenHint: items[0].tokenHint ?? tokenId,
          provider: items[0].provider,
          tier: items[0].tier,
          label: items[0].label ?? null,
          workers: items,
          health: tokenHealth(items),
        }),
      )
      .sort(
        (a, b) =>
          HEALTH_ORDER.indexOf(a.health) - HEALTH_ORDER.indexOf(b.health) ||
          a.provider.localeCompare(b.provider) ||
          (a.label ?? "").localeCompare(b.label ?? "", undefined, {
            numeric: true,
          }),
      );
  }, [workers]);

  const providers = Array.from(new Set(groups.map((group) => group.provider)));

  const baseFiltered = groups.filter((group) => {
    const term = search.trim().toLowerCase();
    return (
      (providerFilter === "all" || group.provider === providerFilter) &&
      (!term ||
        group.tokenHint.toLowerCase().includes(term) ||
        (group.label ?? "").toLowerCase().includes(term))
    );
  });
  const filtered = healthFilter
    ? baseFiltered.filter((group) => group.health === healthFilter)
    : baseFiltered;

  const healthCounts = HEALTH_ORDER.map((health) => ({
    health,
    count: baseFiltered.filter((group) => group.health === health).length,
  })).filter((item) => item.count > 0 || item.health === healthFilter);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {healthCounts.map(({ health, count }) => (
          <Tooltip key={health} content={TOKEN_HEALTH_STYLE[health].hint}>
            <Chip
              className="cursor-pointer"
              variant={healthFilter === health ? "solid" : "flat"}
              color={TOKEN_HEALTH_STYLE[health].chip}
              onClick={() =>
                setHealthFilter(healthFilter === health ? null : health)
              }
            >
              {health} · {count}
            </Chip>
          </Tooltip>
        ))}
        <span className="text-default-400 text-xs">
          Tokens are grouped by key fingerprint; the raw key never leaves the
          server.
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
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
          placeholder="Token hint or label"
          value={search}
          onValueChange={setSearch}
          isClearable
          onClear={() => setSearch("")}
        />
        <Button
          size="sm"
          variant="flat"
          className="ml-auto"
          isLoading={actions.checking}
          onPress={() => actions.checkEndpoints({})}
        >
          Check all endpoints
        </Button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-default-500 text-sm">No tokens match the filters.</p>
      ) : null}

      {filtered.map((group) => (
        <TokenRow
          key={group.tokenId}
          group={group}
          now={now}
          actions={actions}
          onSelectWorker={onSelectWorker}
        />
      ))}
    </div>
  );
}
