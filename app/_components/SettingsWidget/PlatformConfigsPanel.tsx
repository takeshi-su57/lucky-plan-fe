"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Chip, Input, Switch, Tooltip } from "@heroui/react";

import { Platform } from "@/graphql/gql/graphql";
import {
  usePlatformConfigActions,
  usePlatformConfigDashboard,
  usePlatformConfigItems,
} from "@/app/_hooks/usePlatformConfigs";

import { ago } from "./rpcWorkerShared";

type DashboardChain = NonNullable<
  ReturnType<typeof usePlatformConfigDashboard>["data"]
>["platformConfigDashboard"]["chains"][number];

type Report = NonNullable<DashboardChain["lastCheck"]>;

const GENERATE_COMMAND: Record<Platform, string | null> = {
  [Platform.Gns]: "npm run config:generate:gns",
  [Platform.Gmx]: "npm run config:generate:gmx-v2",
  [Platform.Avnt]: "npm run config:generate:avnt",
};

const PLATFORM_SOURCE: Record<Platform, string> = {
  [Platform.Gns]: "GNS V10 diamond (on-chain)",
  [Platform.Gmx]: "GMX public API (gmxinfra.io)",
  [Platform.Avnt]: "Avantis PairStorage on Base (on-chain)",
};

const SOURCE_COUNT_LABEL: Record<Platform, string> = {
  [Platform.Gns]: "pairs on-chain",
  [Platform.Gmx]: "listed now",
  [Platform.Avnt]: "pairs on-chain",
};

const SOURCE_COUNT_HINT: Record<Platform, string> = {
  [Platform.Gns]:
    "pairsCount on the diamond at the last check. Should equal the pairs count.",
  [Platform.Gmx]:
    "Tradable markets GMX lists today. Lower than our count is expected: delisted markets stay in the config so old trades keep their names.",
  [Platform.Avnt]:
    "pairsCount on PairStorage at the last check. Should equal the pairs count.",
};

const chainKey = (chain: { platform: Platform; chainId: number }) =>
  `${chain.platform}:${chain.chainId}`;

function useNow(intervalMs = 15_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

function checkState(report: Report | null | undefined) {
  if (!report) {
    return { label: "Not checked", color: "default" as const };
  }
  if (report.error) {
    return { label: "Check failed", color: "danger" as const };
  }
  const drift = report.missing.length + report.changed.length;
  return drift
    ? { label: `${drift} out of date`, color: "warning" as const }
    : { label: "In sync", color: "success" as const };
}

function Count({
  label,
  snapshot,
  effective,
}: {
  label: string;
  snapshot: number;
  effective: number;
}) {
  const synced = effective - snapshot;

  return (
    <Tooltip
      content={`${snapshot} in the committed snapshot${
        synced > 0 ? `, ${synced} added by runtime sync` : ""
      }`}
    >
      <div className="min-w-20">
        <p className="text-lg font-semibold">
          {effective}
          {synced > 0 ? (
            <span className="text-warning ml-1 text-xs">+{synced}</span>
          ) : null}
        </p>
        <p className="text-default-500 text-xs">{label}</p>
      </div>
    </Tooltip>
  );
}

function ReportList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: string;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <p className={`text-xs font-semibold ${tone}`}>
        {title} ({items.length})
      </p>
      <div className="mt-1 flex max-h-32 flex-wrap gap-1 overflow-y-auto">
        {items.map((item) => (
          <Chip key={item} size="sm" variant="flat" className="font-mono">
            {item}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function ItemsView({ chain }: { chain: DashboardChain }) {
  const { data, loading, refetch } = usePlatformConfigItems(
    chain.platform,
    chain.chainId,
  );
  const [search, setSearch] = useState("");
  const [syncedOnly, setSyncedOnly] = useState(false);
  const [kind, setKind] = useState<string | null>(null);

  useEffect(() => {
    void refetch();
  }, [chain.effectiveCount, chain.secondaryEffectiveCount, refetch]);

  const items = useMemo(() => data?.platformConfigItems ?? [], [data]);
  const kinds = useMemo(
    () => Array.from(new Set(items.map((item) => item.kind))),
    [items],
  );
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter(
      (item) =>
        (!kind || item.kind === kind) &&
        (!syncedOnly || item.synced) &&
        (!query ||
          item.key.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query) ||
          item.detail.toLowerCase().includes(query)),
    );
  }, [items, kind, search, syncedOnly]);

  return (
    <div className="mt-4 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          size="sm"
          className="max-w-xs"
          placeholder="Search index, name, address"
          value={search}
          onValueChange={setSearch}
          isClearable
          onClear={() => setSearch("")}
        />
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={kind === null ? "solid" : "flat"}
            onPress={() => setKind(null)}
          >
            All
          </Button>
          {kinds.map((value) => (
            <Button
              key={value}
              size="sm"
              variant={kind === value ? "solid" : "flat"}
              onPress={() => setKind(value)}
            >
              {value}s
            </Button>
          ))}
        </div>
        <Switch size="sm" isSelected={syncedOnly} onValueChange={setSyncedOnly}>
          Runtime-synced only
        </Switch>
        <span className="text-default-500 text-xs">
          {loading ? "Loading…" : `${filtered.length} of ${items.length}`}
        </span>
      </div>

      <div className="border-default-200 max-h-96 overflow-y-auto rounded-lg border">
        <table className="w-full text-left text-xs">
          <thead className="bg-default-100 text-default-500 sticky top-0 uppercase">
            <tr>
              <th className="px-3 py-2">Kind</th>
              <th className="px-3 py-2">Key</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Detail</th>
              <th className="px-3 py-2">Source</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {filtered.map((item) => (
              <tr
                key={`${item.kind}:${item.key}`}
                className="border-default-100 border-t"
              >
                <td className="px-3 py-1.5">{item.kind}</td>
                <td className="max-w-48 truncate px-3 py-1.5" title={item.key}>
                  {item.key}
                </td>
                <td className="max-w-64 truncate px-3 py-1.5" title={item.name}>
                  {item.name}
                </td>
                <td className="text-default-500 px-3 py-1.5">{item.detail}</td>
                <td className="px-3 py-1.5">
                  {item.synced ? (
                    <Chip size="sm" variant="flat" color="warning">
                      Synced
                    </Chip>
                  ) : (
                    <span className="text-default-400">Snapshot</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChainRow({
  chain,
  now,
  actions,
  isOpen,
  onToggle,
}: {
  chain: DashboardChain;
  now: number;
  actions: ReturnType<typeof usePlatformConfigActions>;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const state = checkState(chain.lastCheck);
  const busy = actions.checking || actions.syncing;
  const needsSync = state.color === "warning";
  const tone =
    state.color === "danger"
      ? "border-danger-300"
      : needsSync
        ? "border-warning-300 bg-warning-50/40"
        : "border-default-200";

  return (
    <div className={`rounded-lg border px-4 py-3 ${tone}`}>
      <div className="grid grid-cols-[minmax(150px,1.2fr)_minmax(120px,1fr)_repeat(3,minmax(80px,0.7fr))_auto] items-center gap-4">
        <div>
          <p className="font-semibold">{chain.network}</p>
          <p className="text-default-400 text-xs">chain {chain.chainId}</p>
        </div>

        <div className="flex flex-col items-start gap-1">
          <Chip size="sm" variant="dot" color={state.color}>
            {state.label}
          </Chip>
          <Tooltip
            content={`Last sync ${ago(chain.lastSync?.finishedAt, now)}`}
          >
            <span className="text-default-400 text-xs">
              checked {ago(chain.lastCheck?.finishedAt, now)}
            </span>
          </Tooltip>
        </div>

        <Count
          label={chain.itemLabel}
          snapshot={chain.snapshotCount}
          effective={chain.effectiveCount}
        />
        {chain.platform === Platform.Avnt ? (
          <div>
            <p className="text-lg font-semibold">USDC</p>
            <p className="text-default-500 text-xs">only collateral</p>
          </div>
        ) : (
          <Count
            label={chain.secondaryLabel}
            snapshot={chain.secondarySnapshotCount}
            effective={chain.secondaryEffectiveCount}
          />
        )}
        <Tooltip content={SOURCE_COUNT_HINT[chain.platform]}>
          <div>
            <p className="text-lg font-semibold">
              {chain.lastCheck && !chain.lastCheck.error
                ? chain.lastCheck.sourceCount
                : "–"}
            </p>
            <p className="text-default-500 text-xs">
              {SOURCE_COUNT_LABEL[chain.platform]}
            </p>
          </div>
        </Tooltip>

        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="flat"
            isDisabled={busy}
            onPress={() => actions.check(chain.platform, chain.chainId)}
          >
            Check
          </Button>
          <Tooltip content="Add what the source has and the parsers lack. Stored in the DB; every service applies it within 5 minutes.">
            <Button
              size="sm"
              color="primary"
              variant={needsSync ? "solid" : "flat"}
              isDisabled={busy}
              onPress={() => actions.sync(chain.platform, chain.chainId)}
            >
              Sync
            </Button>
          </Tooltip>
          <Button size="sm" variant="light" onPress={onToggle}>
            {isOpen ? "Hide" : "Entries"}
          </Button>
        </div>
      </div>

      {chain.lastCheck?.error ? (
        <p className="text-danger mt-2 text-xs">{chain.lastCheck.error}</p>
      ) : null}

      {chain.lastCheck &&
      chain.lastCheck.missing.length + chain.lastCheck.changed.length > 0 ? (
        <div className="mt-3 flex flex-col gap-2">
          <ReportList
            title="Missing — press Sync to add"
            items={chain.lastCheck.missing}
            tone="text-warning-600"
          />
          <ReportList
            title="Changed"
            items={chain.lastCheck.changed}
            tone="text-warning-600"
          />
        </div>
      ) : null}

      {isOpen ? <ItemsView chain={chain} /> : null}
    </div>
  );
}

function Summary({ chains }: { chains: DashboardChain[] }) {
  const counts = chains.reduce(
    (acc, chain) => {
      const { color } = checkState(chain.lastCheck);
      acc[color] += 1;
      return acc;
    },
    { success: 0, warning: 0, danger: 0, default: 0 },
  );

  const items = [
    { label: "In sync", value: counts.success, tone: "text-success" },
    { label: "Out of date", value: counts.warning, tone: "text-warning" },
    { label: "Check failed", value: counts.danger, tone: "text-danger" },
    { label: "Not checked", value: counts.default, tone: "text-default-500" },
  ];

  return (
    <div className="border-default-200 flex flex-wrap gap-8 rounded-lg border px-4 py-3">
      <div>
        <p className="text-lg font-semibold">{chains.length}</p>
        <p className="text-default-500 text-xs">chains</p>
      </div>
      {items.map((item) => (
        <div key={item.label}>
          <p
            className={`text-lg font-semibold ${item.value ? item.tone : "text-default-300"}`}
          >
            {item.value}
          </p>
          <p className="text-default-500 text-xs">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export function PlatformConfigsPanel() {
  const { data, loading, error } = usePlatformConfigDashboard();
  const actions = usePlatformConfigActions();
  const now = useNow();
  const [openChain, setOpenChain] = useState<string | null>(null);

  const chains = useMemo(
    () => data?.platformConfigDashboard.chains ?? [],
    [data],
  );
  const platforms = useMemo(
    () => Array.from(new Set(chains.map((chain) => chain.platform))),
    [chains],
  );
  const pendingSnapshot = useMemo(
    () =>
      platforms.filter((platform) =>
        chains.some(
          (chain) =>
            chain.platform === platform &&
            (chain.effectiveCount > chain.snapshotCount ||
              chain.secondaryEffectiveCount > chain.secondarySnapshotCount),
        ),
      ),
    [chains, platforms],
  );
  const busy = actions.checking || actions.syncing;

  if (error) {
    return <p className="text-danger text-sm">{error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-default-500 max-w-2xl text-sm">
          Pair and market configs the event parsers use. <b>Check</b> compares
          them with the live source without changing anything. <b>Sync</b> adds
          what is missing; every service picks it up within 5 minutes.
        </p>
        <Button
          color="primary"
          variant="flat"
          isLoading={actions.checking}
          isDisabled={busy || platforms.length === 0}
          onPress={async () => {
            for (const platform of platforms) {
              await actions.check(platform);
            }
          }}
        >
          Check everything
        </Button>
      </div>

      <Summary chains={chains} />

      {pendingSnapshot.length > 0 ? (
        <div className="border-warning-200 bg-warning-50 rounded-lg border p-3 text-xs">
          Some entries exist only in the database (marked{" "}
          <span className="text-warning font-semibold">+N</span>). To make them
          part of the committed snapshot, run{" "}
          {pendingSnapshot
            .map((platform) => GENERATE_COMMAND[platform])
            .filter(Boolean)
            .map((command, index) => (
              <span key={command}>
                {index > 0 ? " and " : ""}
                <code className="font-mono">{command}</code>
              </span>
            ))}{" "}
          in <code className="font-mono">be/</code> and commit the JSON diff.
        </div>
      ) : null}

      {loading && chains.length === 0 ? (
        <p className="text-default-500 text-sm">Loading…</p>
      ) : null}

      {platforms.map((platform) => (
        <section key={platform} className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <h3 className="text-base font-semibold">{platform}</h3>
              <span className="text-default-500 text-xs">
                source: {PLATFORM_SOURCE[platform]}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="flat"
                isDisabled={busy}
                onPress={() => actions.check(platform)}
              >
                Check all {platform}
              </Button>
              <Button
                size="sm"
                color="primary"
                variant="flat"
                isDisabled={busy}
                onPress={() => actions.sync(platform)}
              >
                Sync all {platform}
              </Button>
            </div>
          </div>

          {chains
            .filter((chain) => chain.platform === platform)
            .map((chain) => (
              <ChainRow
                key={chainKey(chain)}
                chain={chain}
                now={now}
                actions={actions}
                isOpen={openChain === chainKey(chain)}
                onToggle={() =>
                  setOpenChain((current) =>
                    current === chainKey(chain) ? null : chainKey(chain),
                  )
                }
              />
            ))}
        </section>
      ))}
    </div>
  );
}
