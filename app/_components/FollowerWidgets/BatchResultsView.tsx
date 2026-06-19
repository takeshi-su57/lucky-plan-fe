"use client";

import { Chip, Spinner } from "@heroui/react";
import { BatchResult } from "@/app/_hooks/useBatchTrade";

export type BatchResultsViewProps = {
  results: BatchResult[];
  labels: string[];
};

export function BatchResultsView({ results, labels }: BatchResultsViewProps) {
  if (results.length === 0) return null;

  const successCount = results.filter((r) => r.status === "success").length;
  const errorCount = results.filter((r) => r.status === "error").length;
  const loadingCount = results.filter((r) => r.status === "loading").length;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm text-neutral-400">
        <span>
          {successCount}/{results.length} completed
        </span>
        {errorCount > 0 && (
          <Chip color="danger" size="sm" variant="flat">
            {errorCount} failed
          </Chip>
        )}
        {loadingCount > 0 && (
          <Chip color="primary" size="sm" variant="flat">
            {loadingCount} pending
          </Chip>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {results.map((result, i) => (
          <div
            key={result.id}
            className="bg-content2 flex items-center gap-2 rounded-md px-3 py-1.5 text-xs"
          >
            {result.status === "loading" && <Spinner size="sm" />}
            {result.status === "success" && (
              <Chip color="success" size="sm" variant="flat">
                OK
              </Chip>
            )}
            {result.status === "error" && (
              <Chip color="danger" size="sm" variant="flat">
                Fail
              </Chip>
            )}
            <span className="text-neutral-300">{labels[i] || `#${i + 1}`}</span>
            {result.status === "error" && result.message && (
              <span className="truncate text-xs text-red-400">
                {result.message}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
