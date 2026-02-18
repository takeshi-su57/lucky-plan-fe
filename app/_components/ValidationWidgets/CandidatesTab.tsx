"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Spinner,
  Chip,
} from "@heroui/react";
import { ValidationCandidateStatus } from "@/graphql/gql/graphql";
import { ValidationCandidateStatusBadge } from "./ValidationCandidateStatusBadge";
import { useValidationCandidatesByStatus } from "@/app-hooks/useValidationPipeline";

export type CandidatesTabProps = {
  pipelineId: string;
  onSelectCandidate: (id: string) => void;
};

const statusFilterOptions = [
  { key: "all", label: "All Candidates" },
  { key: ValidationCandidateStatus.PassedThreshold, label: "Passed Threshold" },
  { key: ValidationCandidateStatus.ParetoOptimal, label: "Pareto Optimal" },
  { key: ValidationCandidateStatus.WfaPassed, label: "WFA Passed" },
  { key: ValidationCandidateStatus.UserSelected, label: "User Selected" },
  {
    key: ValidationCandidateStatus.RobustnessPassed,
    label: "Robustness Passed",
  },
  { key: ValidationCandidateStatus.FinalApproved, label: "Final Approved" },
  { key: ValidationCandidateStatus.FailedThreshold, label: "Failed Threshold" },
  { key: ValidationCandidateStatus.ParetoDominated, label: "Dominated" },
  { key: ValidationCandidateStatus.WfaFailed, label: "WFA Failed" },
  {
    key: ValidationCandidateStatus.RobustnessFailed,
    label: "Robustness Failed",
  },
];

function formatNumber(
  value: number | null | undefined,
  decimals: number = 2,
): string {
  if (value === null || value === undefined) return "-";
  return value.toFixed(decimals);
}

function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return "-";
  return `${value.toFixed(1)}%`;
}

export function CandidatesTab({
  pipelineId,
  onSelectCandidate,
}: CandidatesTabProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { candidates, loading } = useValidationCandidatesByStatus(
    pipelineId,
    statusFilter === "all"
      ? undefined
      : (statusFilter as ValidationCandidateStatus),
  );

  if (loading && candidates.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner color="white" size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select
          label="Filter by status"
          size="sm"
          variant="bordered"
          selectedKeys={[statusFilter]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            setStatusFilter(selected);
          }}
          className="w-48"
        >
          {statusFilterOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>

        <span className="text-sm text-neutral-400">
          {candidates.length} candidate{candidates.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      {candidates.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-neutral-400">
          <p>No candidates found</p>
        </div>
      ) : (
        <Table
          aria-label="Candidates table"
          classNames={{
            wrapper: "bg-neutral-900/50 border border-neutral-800",
            th: "bg-neutral-800/50 text-neutral-300",
            td: "py-3",
          }}
        >
          <TableHeader>
            <TableColumn>CONFIG</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>SHARPE</TableColumn>
            <TableColumn>PNL %</TableColumn>
            <TableColumn>DD %</TableColumn>
            <TableColumn>WIN RATE</TableColumn>
            <TableColumn>WFA</TableColumn>
            <TableColumn>ROBUST</TableColumn>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow
                key={candidate.id}
                className="cursor-pointer hover:bg-neutral-800/50"
                onClick={() => onSelectCandidate(candidate.id)}
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-mono text-sm text-white">
                      {candidate.configId.slice(0, 12)}...
                    </span>
                    {candidate.paretoRank !== null &&
                      candidate.paretoRank !== undefined && (
                        <Chip
                          size="sm"
                          variant="flat"
                          color="secondary"
                          className="mt-1"
                        >
                          Rank #{candidate.paretoRank}
                        </Chip>
                      )}
                  </div>
                </TableCell>
                <TableCell>
                  <ValidationCandidateStatusBadge status={candidate.status} />
                </TableCell>
                <TableCell>
                  <span
                    className={`font-mono text-sm ${
                      (candidate.result?.sharpeRatio ?? 0) >= 1
                        ? "text-success-400"
                        : (candidate.result?.sharpeRatio ?? 0) >= 0
                          ? "text-neutral-300"
                          : "text-danger-400"
                    }`}
                  >
                    {formatNumber(candidate.result?.sharpeRatio)}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`font-mono text-sm ${
                      (candidate.result?.totalPnlPercent ?? 0) >= 0
                        ? "text-success-400"
                        : "text-danger-400"
                    }`}
                  >
                    {formatPercent(candidate.result?.totalPnlPercent)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-danger-400 font-mono text-sm">
                    {formatPercent(candidate.result?.maxDrawdownPercent)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm text-neutral-300">
                    {formatPercent(candidate.result?.winRate)}
                  </span>
                </TableCell>
                <TableCell>
                  {candidate.wfaConsistency !== null &&
                  candidate.wfaConsistency !== undefined ? (
                    <span
                      className={`font-mono text-sm ${
                        candidate.wfaPassed
                          ? "text-success-400"
                          : "text-danger-400"
                      }`}
                    >
                      {formatPercent(candidate.wfaConsistency * 100)}
                    </span>
                  ) : (
                    <span className="text-sm text-neutral-500">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {candidate.robustnessScore !== null &&
                  candidate.robustnessScore !== undefined ? (
                    <span
                      className={`font-mono text-sm ${
                        candidate.robustnessPassed
                          ? "text-success-400"
                          : "text-danger-400"
                      }`}
                    >
                      {formatPercent(candidate.robustnessScore * 100)}
                    </span>
                  ) : (
                    <span className="text-sm text-neutral-500">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
