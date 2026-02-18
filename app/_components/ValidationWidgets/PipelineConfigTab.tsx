"use client";

import { Card, CardHeader, CardBody, Chip } from "@heroui/react";
import { ValidationPipeline } from "@/graphql/gql/graphql";

export type PipelineConfigTabProps = {
  pipeline: ValidationPipeline;
};

type ThresholdConfig = {
  minSharpeRatio?: number | null;
  maxSharpeRatio?: number | null;
  minWinRate?: number | null;
  minProfitFactor?: number | null;
  maxDrawdownPercent?: number | null;
  minTotalTrades?: number | null;
  minTotalPnlPercent?: number | null;
};

function ConfigSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border border-neutral-800 bg-neutral-900/50">
      <CardHeader className="border-b border-neutral-800 pb-3">
        <h3 className="text-sm font-semibold text-neutral-200">{title}</h3>
      </CardHeader>
      <CardBody className="pt-3">{children}</CardBody>
    </Card>
  );
}

function ConfigItem({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string | number | null | undefined;
  suffix?: string;
}) {
  const displayValue =
    value !== null && value !== undefined
      ? `${value}${suffix ?? ""}`
      : "Not set";

  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-neutral-400">{label}</span>
      <span className="font-mono text-sm text-neutral-200">{displayValue}</span>
    </div>
  );
}

export function PipelineConfigTab({ pipeline }: PipelineConfigTabProps) {
  const thresholdConfig = (pipeline.thresholdConfig ?? {}) as ThresholdConfig;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Layer 1: Threshold Config */}
      <ConfigSection title="Layer 1: Threshold Filters">
        <div className="flex flex-col divide-y divide-neutral-800">
          <ConfigItem
            label="Min Sharpe Ratio"
            value={thresholdConfig.minSharpeRatio}
          />
          <ConfigItem
            label="Max Sharpe Ratio"
            value={thresholdConfig.maxSharpeRatio}
          />
          <ConfigItem
            label="Min Win Rate"
            value={thresholdConfig.minWinRate}
            suffix="%"
          />
          <ConfigItem
            label="Min Profit Factor"
            value={thresholdConfig.minProfitFactor}
          />
          <ConfigItem
            label="Max Drawdown"
            value={thresholdConfig.maxDrawdownPercent}
            suffix="%"
          />
          <ConfigItem
            label="Min Total Trades"
            value={thresholdConfig.minTotalTrades}
          />
          <ConfigItem
            label="Min PnL %"
            value={thresholdConfig.minTotalPnlPercent}
            suffix="%"
          />
        </div>
      </ConfigSection>

      {/* Layer 2: Pareto Config */}
      <ConfigSection title="Layer 2: Pareto Optimization">
        <div className="flex flex-col gap-3">
          <div className="text-sm text-neutral-400">Optimization Metrics:</div>
          <div className="flex flex-wrap gap-2">
            {pipeline.paretoMetrics.map((metric) => (
              <Chip key={metric} size="sm" variant="flat" color="secondary">
                {metric}
              </Chip>
            ))}
          </div>
        </div>
      </ConfigSection>

      {/* Layer 3: WFA Config */}
      <ConfigSection title="Layer 3: Walk-Forward Analysis">
        <div className="flex flex-col divide-y divide-neutral-800">
          <ConfigItem
            label="Train Ratio"
            value={
              pipeline.wfaTrainRatio
                ? (pipeline.wfaTrainRatio * 100).toFixed(0)
                : null
            }
            suffix="%"
          />
          <ConfigItem label="Windows" value={pipeline.wfaWindows} />
          <ConfigItem
            label="Min Consistency"
            value={
              pipeline.wfaMinConsistency
                ? (pipeline.wfaMinConsistency * 100).toFixed(0)
                : null
            }
            suffix="%"
          />
        </div>
      </ConfigSection>

      {/* Layer 5: Robustness Config */}
      <ConfigSection title="Layer 5: Robustness Testing">
        <div className="flex flex-col divide-y divide-neutral-800">
          <ConfigItem label="Test Steps" value={pipeline.robustnessSteps} />
          <ConfigItem
            label="Min Stability Score"
            value={
              pipeline.robustnessMinScore
                ? (pipeline.robustnessMinScore * 100).toFixed(0)
                : null
            }
            suffix="%"
          />
        </div>
      </ConfigSection>
    </div>
  );
}
