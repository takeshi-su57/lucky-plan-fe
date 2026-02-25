"use client";

import { Card, CardBody, Spinner } from "@heroui/react";
import { ValidationPipelineStats } from "@/graphql/gql/graphql";

export type ValidationStatsCardsProps = {
  stats: ValidationPipelineStats | null;
  loading?: boolean;
};

type StatCardProps = {
  label: string;
  value: number;
  color: string;
};

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <Card className="border border-neutral-800 bg-neutral-900/50">
      <CardBody className="flex flex-row items-center justify-between gap-4 p-4">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-neutral-400">{label}</span>
          <span className={`text-2xl font-bold ${color}`}>{value}</span>
        </div>
        <div
          className={`h-10 w-1 rounded-full ${color.replace("text-", "bg-")}`}
        />
      </CardBody>
    </Card>
  );
}

export function ValidationStatsCards({
  stats,
  loading,
}: ValidationStatsCardsProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner color="white" size="sm" />
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statItems: StatCardProps[] = [
    { label: "Created", value: stats.created, color: "text-neutral-300" },
    { label: "In Progress", value: stats.inProgress, color: "text-primary-400" },
    {
      label: "Awaiting User",
      value: stats.awaitingUser,
      color: "text-warning-400",
    },
    { label: "Completed", value: stats.completed, color: "text-success-400" },
    { label: "Failed", value: stats.failed, color: "text-danger-400" },
    { label: "Cancelled", value: stats.cancelled, color: "text-neutral-500" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {statItems.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
}
