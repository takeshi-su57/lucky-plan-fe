"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@heroui/react";
import { FiMoreVertical, FiEye, FiXCircle, FiTrash2 } from "react-icons/fi";
import dayjs from "dayjs";
import {
  ValidationPipeline,
  ValidationPipelineStatus,
} from "@/graphql/gql/graphql";
import { ValidationPipelineStatusBadge } from "./ValidationPipelineStatusBadge";
import {
  getPipelineCurrentLayer,
  isPipelineAwaiting,
} from "@/app-hooks/useValidationPipeline";

export type ValidationPipelineTableProps = {
  pipelines: ValidationPipeline[];
  loading?: boolean;
  onView: (id: string) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
};

function MiniProgress({
  status,
}: {
  status: ValidationPipelineStatus;
  stats: {
    passedThreshold: number;
    paretoOptimal: number;
    passedWfa: number;
    userSelected: number;
    passedRobustness: number;
    finalApproved: number;
  };
}) {
  const currentLayer = getPipelineCurrentLayer(status);
  const layers = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex items-center gap-0.5">
      {layers.map((layer) => {
        let bgColor = "bg-neutral-700";
        if (layer < currentLayer) bgColor = "bg-success-500";
        else if (layer === currentLayer) {
          if (isPipelineAwaiting(status)) bgColor = "bg-warning-500";
          else if (status === ValidationPipelineStatus.Failed)
            bgColor = "bg-danger-500";
          else bgColor = "bg-primary-500";
        }

        return (
          <div
            key={layer}
            className={`h-2 w-3 rounded-sm ${bgColor}`}
            title={`Layer ${layer}`}
          />
        );
      })}
    </div>
  );
}

export function ValidationPipelineTable({
  pipelines,
  loading,
  onView,
  onCancel,
  onDelete,
}: ValidationPipelineTableProps) {
  const canCancel = (status: ValidationPipelineStatus) => {
    return ![
      ValidationPipelineStatus.Completed,
      ValidationPipelineStatus.Failed,
      ValidationPipelineStatus.Cancelled,
    ].includes(status);
  };

  const canDelete = (status: ValidationPipelineStatus) => {
    return [
      ValidationPipelineStatus.Created,
      ValidationPipelineStatus.Completed,
      ValidationPipelineStatus.Failed,
      ValidationPipelineStatus.Cancelled,
    ].includes(status);
  };

  if (loading && pipelines.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner color="white" size="lg" />
      </div>
    );
  }

  if (pipelines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-neutral-400">
        <p>No validation pipelines found</p>
        <p className="text-sm">Create one from a completed template search</p>
      </div>
    );
  }

  return (
    <Table
      aria-label="Validation pipelines table"
      classNames={{
        wrapper: "bg-neutral-900/50 border border-neutral-800",
        th: "bg-neutral-800/50 text-neutral-300",
        td: "py-3",
      }}
    >
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>PROGRESS</TableColumn>
        <TableColumn>CANDIDATES</TableColumn>
        <TableColumn>CREATED</TableColumn>
        <TableColumn width={80}>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {pipelines.map((pipeline) => (
          <TableRow
            key={pipeline.id}
            className="cursor-pointer hover:bg-neutral-800/50"
            onClick={() => onView(pipeline.id)}
          >
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium text-white">{pipeline.name}</span>
                <span className="text-xs text-neutral-500">
                  {pipeline.id.slice(0, 8)}...
                </span>
              </div>
            </TableCell>
            <TableCell>
              <ValidationPipelineStatusBadge status={pipeline.status} />
            </TableCell>
            <TableCell>
              <MiniProgress
                status={pipeline.status}
                stats={{
                  passedThreshold: pipeline.passedThreshold,
                  paretoOptimal: pipeline.paretoOptimal,
                  passedWfa: pipeline.passedWfa,
                  userSelected: pipeline.userSelected,
                  passedRobustness: pipeline.passedRobustness,
                  finalApproved: pipeline.finalApproved,
                }}
              />
            </TableCell>
            <TableCell>
              <div className="flex flex-col text-sm">
                <span className="text-neutral-300">
                  {pipeline.totalCandidates} total
                </span>
                {pipeline.finalApproved > 0 && (
                  <span className="text-success-400">
                    {pipeline.finalApproved} approved
                  </span>
                )}
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm text-neutral-400">
                {dayjs(pipeline.createdAt).format("MMM D, HH:mm")}
              </span>
            </TableCell>
            <TableCell>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiMoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Pipeline actions"
                  onAction={(key) => {
                    if (key === "view") onView(pipeline.id);
                    else if (key === "cancel") onCancel(pipeline.id);
                    else if (key === "delete") onDelete(pipeline.id);
                  }}
                >
                  <DropdownItem
                    key="view"
                    startContent={<FiEye className="h-4 w-4" />}
                  >
                    View Details
                  </DropdownItem>
                  <DropdownItem
                    key="cancel"
                    startContent={<FiXCircle className="h-4 w-4" />}
                    className={canCancel(pipeline.status) ? "" : "hidden"}
                    color="warning"
                  >
                    Cancel
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    startContent={<FiTrash2 className="h-4 w-4" />}
                    className={canDelete(pipeline.status) ? "" : "hidden"}
                    color="danger"
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
