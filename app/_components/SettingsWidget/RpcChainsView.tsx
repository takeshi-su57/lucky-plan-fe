"use client";

import { useMemo } from "react";
import { Button, Chip, Tooltip } from "@heroui/react";

import { RpcWorkerStatus } from "@/graphql/gql/graphql";
import { useRpcEndpointActions } from "@/app/_hooks/useRpcWorkers";
import { rpcChainName } from "./rpcChains";
import {
  ago,
  endpointProblem,
  isWorkable,
  RpcWorkerItem,
  STATUS_ORDER,
  STATUS_STYLE,
} from "./rpcWorkerShared";

type ChainSummary = {
  chainId: number;
  workers: RpcWorkerItem[];
  tokens: number;
  publicEndpoints: number;
  workable: number;
  working: number;
  penalized: number;
  paused: number;
  broken: number;
  checkOk: number;
  checkFailed: number;
  unchecked: number;
  lastCheckedAt: number | null;
  byStatus: Record<RpcWorkerStatus, number>;
};

function summarize(chainId: number, workers: RpcWorkerItem[]): ChainSummary {
  const byStatus = Object.fromEntries(
    STATUS_ORDER.map((status) => [status, 0]),
  ) as Record<RpcWorkerStatus, number>;
  workers.forEach((worker) => byStatus[worker.status]++);

  const checked = workers.map((worker) => worker.lastCheckedAt ?? 0);

  return {
    chainId,
    workers,
    tokens: new Set(workers.map((w) => w.tokenId).filter(Boolean)).size,
    publicEndpoints: workers.filter((w) => !w.tokenId).length,
    workable: workers.filter(isWorkable).length,
    working: byStatus[RpcWorkerStatus.Working],
    penalized: byStatus[RpcWorkerStatus.Penalized],
    paused: byStatus[RpcWorkerStatus.Paused],
    broken: workers.filter(
      (worker) => worker.state !== "Paused" && endpointProblem(worker),
    ).length,
    checkOk: workers.filter((w) => w.lastCheckOk === true).length,
    checkFailed: workers.filter((w) => w.lastCheckOk === false).length,
    unchecked: workers.filter((w) => w.lastCheckOk == null).length,
    lastCheckedAt: Math.max(0, ...checked) || null,
    byStatus,
  };
}

function Metric({
  label,
  value,
  tone,
  hint,
}: {
  label: string;
  value: number;
  tone?: string;
  hint: string;
}) {
  return (
    <Tooltip content={hint}>
      <div className="min-w-16">
        <p
          className={`text-lg font-semibold ${value ? (tone ?? "") : "text-default-300"}`}
        >
          {value}
        </p>
        <p className="text-default-500 text-xs">{label}</p>
      </div>
    </Tooltip>
  );
}

export function RpcChainsView({
  workers,
  now,
  actions,
  onOpenChain,
}: {
  workers: RpcWorkerItem[];
  now: number;
  actions: ReturnType<typeof useRpcEndpointActions>;
  onOpenChain: (chainId: number) => void;
}) {
  const chains = useMemo(() => {
    const groups = new Map<number, RpcWorkerItem[]>();
    workers.forEach((worker) =>
      groups.set(worker.chainId, [
        ...(groups.get(worker.chainId) ?? []),
        worker,
      ]),
    );
    return Array.from(groups.entries())
      .sort(([a], [b]) => a - b)
      .map(([chainId, items]) => summarize(chainId, items));
  }, [workers]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-default-500 text-sm">
          Capacity per chain. &quot;Workable&quot; means active, not backing off
          and not failing its last health check.
        </p>
        <Button
          size="sm"
          variant="flat"
          isLoading={actions.checking}
          onPress={() => actions.checkEndpoints({})}
        >
          Check all endpoints
        </Button>
      </div>

      {chains.map((chain) => {
        const total = chain.workers.length;
        const tone =
          chain.workable === 0
            ? "border-danger-300"
            : chain.broken > 0 || chain.penalized > 0
              ? "border-warning-300"
              : "border-default-200";

        return (
          <div key={chain.chainId} className={`rounded-xl border p-4 ${tone}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{rpcChainName(chain.chainId)}</p>
                <p className="text-default-500 text-xs">
                  {total} endpoints · {chain.tokens} tokens ·{" "}
                  {chain.publicEndpoints} public · last check{" "}
                  {ago(chain.lastCheckedAt, now)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="flat"
                  isDisabled={actions.checking}
                  onPress={() =>
                    actions.checkEndpoints({ chainId: chain.chainId })
                  }
                >
                  Check chain
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => onOpenChain(chain.chainId)}
                >
                  View endpoints
                </Button>
              </div>
            </div>

            <div className="bg-default-100 mt-3 flex h-2.5 w-full overflow-hidden rounded-full">
              {STATUS_ORDER.filter((status) => chain.byStatus[status] > 0).map(
                (status) => (
                  <Tooltip
                    key={status}
                    content={`${status}: ${chain.byStatus[status]}`}
                  >
                    <div
                      className={STATUS_STYLE[status].cell}
                      style={{
                        width: `${(chain.byStatus[status] / total) * 100}%`,
                      }}
                    />
                  </Tooltip>
                ),
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              <Metric
                label="Workable"
                value={chain.workable}
                tone="text-success"
                hint="Can take work now or when a backfill starts"
              />
              <Metric
                label="Working"
                value={chain.working}
                tone="text-primary"
                hint="Fetching a range right now"
              />
              <Metric
                label="Penalized"
                value={chain.penalized}
                tone="text-warning"
                hint="Backing off after errors; will retry"
              />
              <Metric
                label="Broken"
                value={chain.broken}
                tone="text-danger"
                hint="Disabled or failing the last health check"
              />
              <Metric
                label="Paused"
                value={chain.paused}
                hint="Paused by an admin or by the seed"
              />
              <div className="border-default-200 ml-auto flex gap-2 self-center border-l pl-4">
                <Chip size="sm" variant="flat" color="success">
                  check ok {chain.checkOk}
                </Chip>
                <Chip
                  size="sm"
                  variant="flat"
                  color={chain.checkFailed ? "danger" : "default"}
                >
                  failed {chain.checkFailed}
                </Chip>
                <Chip size="sm" variant="flat">
                  unchecked {chain.unchecked}
                </Chip>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
