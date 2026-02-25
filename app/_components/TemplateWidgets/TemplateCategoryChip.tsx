"use client";

import { Chip } from "@heroui/react";
import { StrategyCategory } from "@/graphql/gql/graphql";

const categoryConfig: Record<
  StrategyCategory,
  { color: "default" | "primary" | "secondary" | "success" | "warning" | "danger"; label: string }
> = {
  [StrategyCategory.TrendFollowing]: { color: "primary", label: "Trend Following" },
  [StrategyCategory.MeanReversion]: { color: "secondary", label: "Mean Reversion" },
  [StrategyCategory.Momentum]: { color: "success", label: "Momentum" },
  [StrategyCategory.Breakout]: { color: "warning", label: "Breakout" },
  [StrategyCategory.Scalping]: { color: "danger", label: "Scalping" },
  [StrategyCategory.Swing]: { color: "primary", label: "Swing" },
  [StrategyCategory.Volatility]: { color: "secondary", label: "Volatility" },
  [StrategyCategory.Custom]: { color: "default", label: "Custom" },
};

export type TemplateCategoryChipProps = {
  category: StrategyCategory;
  size?: "sm" | "md" | "lg";
};

export function TemplateCategoryChip({
  category,
  size = "sm",
}: TemplateCategoryChipProps) {
  const config = categoryConfig[category];

  return (
    <Chip color={config.color} size={size} variant="flat">
      {config.label}
    </Chip>
  );
}
