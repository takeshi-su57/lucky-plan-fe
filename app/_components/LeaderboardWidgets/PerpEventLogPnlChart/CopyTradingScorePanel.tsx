"use client";

import { getHistoriesChartData } from "@/utils/historiesV2Chart";

type HistoriesChartData = ReturnType<typeof getHistoriesChartData>;
type CopyTradingData = HistoriesChartData["copyTrading"];
type CopyTradingScore = CopyTradingData["defaultCopy"];

function formatScore(value: number) {
  if (!Number.isFinite(value)) return "0";

  return `${Math.round(value * 100)}`;
}

function formatScorePercent(value: number) {
  if (!Number.isFinite(value)) return "0%";

  return `${Math.round(value * 100)}%`;
}

function formatUsd(value: number, decimals = 2) {
  if (!Number.isFinite(value)) return "$0";

  return `$${value.toLocaleString(undefined, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  })}`;
}

function formatRatio(value: number) {
  if (!Number.isFinite(value)) return "0x";

  return `${value.toFixed(4)}x`;
}

function getScoreTone(score: number) {
  if (score >= 0.75) {
    return {
      label: "Strong",
      className: "border-success-500/40 bg-success-500/10 text-success-300",
      barClassName: "bg-success-500",
    };
  }

  if (score >= 0.5) {
    return {
      label: "Medium",
      className: "border-warning-500/40 bg-warning-500/10 text-warning-300",
      barClassName: "bg-warning-500",
    };
  }

  return {
    label: "Weak",
    className: "border-danger-500/40 bg-danger-500/10 text-danger-300",
    barClassName: "bg-danger-500",
  };
}

function CopyTradingScoreMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[10px] text-neutral-500">{label}</span>
      <span className="text-xs font-semibold text-white">{value}</span>
    </div>
  );
}

function CopyTradingScoreBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const safeValue = Math.min(
    Math.max(Number.isFinite(value) ? value : 0, 0),
    1,
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] text-neutral-500">{label}</span>
        <span className="text-[10px] font-semibold text-neutral-300">
          {formatScorePercent(safeValue)}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-neutral-800">
        <div
          className="bg-primary h-full rounded-full"
          style={{ width: `${safeValue * 100}%` }}
        />
      </div>
    </div>
  );
}

function CopyTradingScoreCard({
  title,
  description,
  score,
}: {
  title: string;
  description: string;
  score: CopyTradingScore;
}) {
  const tone = getScoreTone(score.score);

  return (
    <div className="border-default-200 bg-content2/50 flex flex-col gap-3 rounded-lg border p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-white">{title}</span>
          <span className="text-[10px] leading-4 text-neutral-500">
            {description}
          </span>
        </div>

        <div
          className={`rounded-md border px-2 py-1 text-right ${tone.className}`}
        >
          <div className="text-lg leading-none font-black">
            {formatScore(score.score)}
          </div>
          <div className="text-[9px] font-semibold">{tone.label}</div>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
        <div
          className={`h-full rounded-full ${tone.barClassName}`}
          style={{ width: `${score.score * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        <CopyTradingScoreMetric
          label="Suggested collateral"
          value={formatUsd(score.positionSizeSuggestion.suggestedCollateralUsd)}
        />
        <CopyTradingScoreMetric
          label="Suggested ratio"
          value={formatRatio(score.positionSizeSuggestion.suggestedRatio)}
        />
        <CopyTradingScoreMetric
          label="Leader avg collateral"
          value={formatUsd(score.positionSizeSuggestion.leaderAvgCollateralUsd)}
        />
        <CopyTradingScoreMetric
          label="Standard collateral"
          value={formatUsd(score.positionSizeSuggestion.standardCollateralUsd)}
        />
      </div>

      <div className="flex flex-col gap-2 border-t border-neutral-800 pt-3">
        <CopyTradingScoreBar label="Trend" value={score.trendScore} />
        <CopyTradingScoreBar label="Slope" value={score.slopeScore} />
        <CopyTradingScoreBar label="R²" value={score.r2Score} />
        <CopyTradingScoreBar label="Sample" value={score.sampleScore} />
        <CopyTradingScoreBar label="Win rate" value={score.winRateScore} />
        <CopyTradingScoreBar
          label="PnL quality"
          value={score.pnlQualityScore}
        />
        <CopyTradingScoreBar label="Drawdown" value={score.drawdownScore} />
        <CopyTradingScoreBar label="Leverage" value={score.leverageScore} />
      </div>
    </div>
  );
}

export function CopyTradingScorePanel({
  copyTrading,
}: {
  copyTrading: CopyTradingData;
}) {
  const recommendedMode =
    copyTrading.defaultCopy.score >= copyTrading.reverseCopy.score
      ? "Default copy"
      : "Reverse copy";

  return (
    <div className="flex h-full w-full min-w-0 flex-col gap-5 overflow-y-auto pr-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white">
            Copy Trading Score
          </span>
          <span className="text-[10px] text-neutral-500">
            Recommended: {recommendedMode}
          </span>
        </div>

        <div className="border-primary-500/30 bg-primary-500/10 text-primary-300 rounded-md border px-2 py-1 text-[10px] font-semibold">
          Base {formatUsd(copyTrading.standardCollateralUsd, 0)}
        </div>
      </div>

      <CopyTradingScoreCard
        title="Default copy"
        description="Good when the leader has positive slope and R² close to 1."
        score={copyTrading.defaultCopy}
      />

      <CopyTradingScoreCard
        title="Reverse copy"
        description="Good when the leader has negative slope and R² close to 1."
        score={copyTrading.reverseCopy}
      />
    </div>
  );
}
