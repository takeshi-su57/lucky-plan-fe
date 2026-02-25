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
} from "@heroui/react";
import { FiCheck, FiAlertCircle } from "react-icons/fi";
import {
  useValidationCandidatesByStatus,
  useSubmitUserSelection,
} from "@/app-hooks/useValidationPipeline";
import { ValidationCandidateStatus } from "@/graphql/gql/graphql";

export type UserSelectionPanelProps = {
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

export function UserSelectionPanel({
  pipelineId,
  onComplete,
}: UserSelectionPanelProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState("");

  const { candidates, loading } = useValidationCandidatesByStatus(
    pipelineId,
    ValidationCandidateStatus.WfaPassed,
  );

  const { submitSelection, loading: submitting } = useSubmitUserSelection();

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
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
    if (selectedIds.size === candidates.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(candidates.map((c) => c.id)));
    }
  };

  const handleSubmit = async () => {
    await submitSelection({
      variables: {
        pipelineId,
        input: {
          selectedCandidateIds: Array.from(selectedIds),
          notes: notes || null,
        },
      },
    });
    onComplete();
  };

  const sortedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) => {
      const sharpeA = a.result?.sharpeRatio ?? 0;
      const sharpeB = b.result?.sharpeRatio ?? 0;
      return sharpeB - sharpeA;
    });
  }, [candidates]);

  if (loading) {
    return (
      <Card className="border-warning-500 bg-warning-900/10 border-2">
        <CardBody className="flex items-center justify-center py-8">
          <Spinner color="warning" />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="border-warning-500 bg-warning-900/10 border-2">
      <CardHeader className="border-warning-800 flex flex-col items-start gap-2 border-b pb-4">
        <div className="flex items-center gap-2">
          <FiAlertCircle className="text-warning-400 h-5 w-5" />
          <h3 className="text-warning-300 text-lg font-semibold">
            User Selection Required (Step 5)
          </h3>
        </div>
        <p className="text-sm text-neutral-400">
          Select candidates to proceed to robustness testing. These candidates
          have passed Walk-Forward Analysis.
        </p>
      </CardHeader>

      <CardBody className="flex flex-col gap-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-400">
            {selectedIds.size} of {candidates.length} candidates selected
          </span>
          <Button size="sm" variant="flat" onPress={handleSelectAll}>
            {selectedIds.size === candidates.length
              ? "Deselect All"
              : "Select All"}
          </Button>
        </div>

        <Table
          aria-label="WFA passed candidates"
          classNames={{
            wrapper: "bg-neutral-900/50 border border-neutral-800",
            th: "bg-neutral-800/50 text-neutral-300",
            td: "py-2",
          }}
        >
          <TableHeader>
            <TableColumn width={50}>SELECT</TableColumn>
            <TableColumn>CONFIG</TableColumn>
            <TableColumn>SHARPE</TableColumn>
            <TableColumn>PNL %</TableColumn>
            <TableColumn>DD %</TableColumn>
            <TableColumn>WFA SCORE</TableColumn>
          </TableHeader>
          <TableBody>
            {sortedCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <Checkbox
                    isSelected={selectedIds.has(candidate.id)}
                    onValueChange={() => handleToggle(candidate.id)}
                    color="warning"
                  />
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm text-white">
                    {candidate.configId.slice(0, 12)}...
                  </span>
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
                  <span className="text-success-400 font-mono text-sm">
                    {formatPercent((candidate.wfaConsistency ?? 0) * 100)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Textarea
          label="Selection Notes (optional)"
          placeholder="Add notes about your selection criteria..."
          value={notes}
          onValueChange={setNotes}
          variant="bordered"
          minRows={2}
        />
      </CardBody>

      <CardFooter className="border-warning-800 border-t pt-4">
        <Button
          color="warning"
          startContent={<FiCheck className="h-4 w-4" />}
          onPress={handleSubmit}
          isLoading={submitting}
          isDisabled={selectedIds.size === 0}
        >
          Submit Selection ({selectedIds.size} candidates)
        </Button>
      </CardFooter>
    </Card>
  );
}
