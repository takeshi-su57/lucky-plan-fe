"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Checkbox,
  Textarea,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Chip,
} from "@heroui/react";
import { FiCheck, FiAward } from "react-icons/fi";
import {
  useValidationCandidatesByStatus,
  useSubmitFinalApproval,
} from "@/app-hooks/useValidationPipeline";
import { ValidationCandidateStatus } from "@/graphql/gql/graphql";

export type FinalApprovalPanelProps = {
  pipelineId: string;
  onComplete: () => void;
};

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

export function FinalApprovalPanel({
  pipelineId,
  onComplete,
}: FinalApprovalPanelProps) {
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState("");

  const { candidates, loading } = useValidationCandidatesByStatus(
    pipelineId,
    ValidationCandidateStatus.RobustnessPassed,
  );

  const { submitApproval, loading: submitting } = useSubmitFinalApproval();

  const handleToggle = (id: string) => {
    setApprovedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (approvedIds.size === candidates.length) {
      setApprovedIds(new Set());
    } else {
      setApprovedIds(new Set(candidates.map((c) => c.id)));
    }
  };

  const handleSubmit = async () => {
    await submitApproval({
      variables: {
        pipelineId,
        input: {
          approvedCandidateIds: Array.from(approvedIds),
          notes: notes || null,
        },
      },
    });
    onComplete();
  };

  const sortedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) => {
      // Sort by robustness score descending
      const robustA = a.robustnessScore ?? 0;
      const robustB = b.robustnessScore ?? 0;
      return robustB - robustA;
    });
  }, [candidates]);

  if (loading) {
    return (
      <Card className="border-success-500 bg-success-900/10 border-2">
        <CardBody className="flex items-center justify-center py-8">
          <Spinner color="success" />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="border-success-500 bg-success-900/10 border-2">
      <CardHeader className="border-success-800 flex flex-col items-start gap-2 border-b pb-4">
        <div className="flex items-center gap-2">
          <FiAward className="text-success-400 h-5 w-5" />
          <h3 className="text-success-300 text-lg font-semibold">
            Final Approval Required (Layer 6)
          </h3>
        </div>
        <p className="text-sm text-neutral-400">
          These candidates have passed robustness testing. Approve the
          strategies you want to deploy or use for live trading.
        </p>
      </CardHeader>

      <CardBody className="flex flex-col gap-4 py-4">
        {/* Selection stats */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-400">
            {approvedIds.size} of {candidates.length} candidates approved
          </span>
          <Button size="sm" variant="flat" onPress={handleSelectAll}>
            {approvedIds.size === candidates.length
              ? "Deselect All"
              : "Select All"}
          </Button>
        </div>

        {/* Candidates Table */}
        <Table
          aria-label="Robustness passed candidates"
          classNames={{
            wrapper: "bg-neutral-900/50 border border-neutral-800",
            th: "bg-neutral-800/50 text-neutral-300",
            td: "py-2",
          }}
        >
          <TableHeader>
            <TableColumn width={50}>APPROVE</TableColumn>
            <TableColumn>CONFIG</TableColumn>
            <TableColumn>SHARPE</TableColumn>
            <TableColumn>PNL %</TableColumn>
            <TableColumn>DD %</TableColumn>
            <TableColumn>WFA SCORE</TableColumn>
            <TableColumn>ROBUSTNESS</TableColumn>
          </TableHeader>
          <TableBody>
            {sortedCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <Checkbox
                    isSelected={approvedIds.has(candidate.id)}
                    onValueChange={() => handleToggle(candidate.id)}
                    color="success"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-sm text-white">
                      {candidate.configId.slice(0, 12)}...
                    </span>
                    {candidate.paretoRank !== null &&
                      candidate.paretoRank !== undefined && (
                        <Chip size="sm" variant="flat" color="secondary">
                          Rank #{candidate.paretoRank}
                        </Chip>
                      )}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`font-mono text-sm ${
                      (candidate.result?.sharpeRatio ?? 0) >= 1
                        ? "text-success-400"
                        : "text-neutral-300"
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
                  <span className="text-primary-400 font-mono text-sm">
                    {formatPercent((candidate.wfaConsistency ?? 0) * 100)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-success-400 font-mono text-sm">
                    {formatPercent((candidate.robustnessScore ?? 0) * 100)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Notes */}
        <Textarea
          label="Approval Notes (optional)"
          placeholder="Add notes about your approval criteria or observations..."
          value={notes}
          onValueChange={setNotes}
          variant="bordered"
          minRows={2}
        />
      </CardBody>

      <CardFooter className="border-success-800 border-t pt-4">
        <Button
          color="success"
          startContent={<FiCheck className="h-4 w-4" />}
          onPress={handleSubmit}
          isLoading={submitting}
          isDisabled={approvedIds.size === 0}
        >
          Approve & Complete Pipeline ({approvedIds.size} strategies)
        </Button>
      </CardFooter>
    </Card>
  );
}
