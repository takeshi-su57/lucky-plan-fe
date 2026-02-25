"use client";

import { Spinner } from "@heroui/react";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

export type BacktestConfigViewProps = {
  configContent?: string;
  strategyConfig?: unknown;
  loading?: boolean;
};

export function BacktestConfigView({
  configContent,
  strategyConfig,
  loading,
}: BacktestConfigViewProps) {
  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner color="white" size="lg" />
      </div>
    );
  }

  let config: unknown;

  // Try to parse from file content first, fallback to strategyConfig
  if (configContent) {
    try {
      config = JSON.parse(configContent);
    } catch {
      config = strategyConfig;
    }
  } else {
    config = strategyConfig;
  }

  if (!config) {
    return (
      <div className="flex h-[400px] items-center justify-center text-neutral-400">
        No configuration available
      </div>
    );
  }

  return (
    <div className="max-h-[500px] overflow-auto rounded-lg bg-neutral-800 p-4">
      <JsonView
        data={config}
        shouldExpandNode={allExpanded}
        style={defaultStyles}
      />
    </div>
  );
}
