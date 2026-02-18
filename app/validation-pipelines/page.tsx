"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Spinner,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { FiRefreshCw } from "react-icons/fi";

import {
  useValidationPipelines,
  useValidationPipelineStats,
  useCancelValidationPipeline,
  useDeleteValidationPipeline,
  useSubscribeValidationPipeline,
} from "@/app-hooks/useValidationPipeline";
import { ValidationPipelineStatus } from "@/graphql/gql/graphql";
import {
  ValidationPipelineTable,
  ValidationStatsCards,
} from "@/app-components/ValidationWidgets";

const statusFilterOptions = [
  { key: "all", label: "All Pipelines" },
  { key: ValidationPipelineStatus.Created, label: "Created" },
  { key: ValidationPipelineStatus.Layer_1Running, label: "Running" },
  {
    key: ValidationPipelineStatus.AwaitingUserSelection,
    label: "Awaiting Selection",
  },
  {
    key: ValidationPipelineStatus.AwaitingFinalApproval,
    label: "Awaiting Approval",
  },
  { key: ValidationPipelineStatus.Completed, label: "Completed" },
  { key: ValidationPipelineStatus.Failed, label: "Failed" },
  { key: ValidationPipelineStatus.Cancelled, label: "Cancelled" },
];

export default function ValidationPipelinesPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Subscribe to real-time updates
  useSubscribeValidationPipeline();

  // Fetch pipelines and stats
  const {
    pipelines,
    loading: pipelinesLoading,
    refetch: refetchPipelines,
  } = useValidationPipelines({
    status:
      statusFilter === "all"
        ? undefined
        : (statusFilter as ValidationPipelineStatus),
    limit: 50,
  });

  const {
    stats,
    loading: statsLoading,
    refetch: refetchStats,
  } = useValidationPipelineStats();

  // Mutations
  const { cancelPipeline } = useCancelValidationPipeline();
  const { deletePipeline, loading: deleting } = useDeleteValidationPipeline();

  const handleRefresh = async () => {
    await Promise.all([refetchPipelines(), refetchStats()]);
  };

  const handleView = (id: string) => {
    router.push(`/validation-pipelines/${id}`);
  };

  const handleCancel = async (id: string) => {
    await cancelPipeline({ variables: { id } });
    await handleRefresh();
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    await deletePipeline({ variables: { id: deleteConfirmId } });
    setDeleteConfirmId(null);
    await handleRefresh();
  };

  return (
    <Suspense fallback={<Spinner color="white" size="lg" />}>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Validation Pipelines
            </h1>
            <p className="text-sm text-neutral-400">
              Multi-layer validation for backtest strategies
            </p>
          </div>

          <Button
            variant="flat"
            startContent={
              <FiRefreshCw
                className={`h-4 w-4 ${pipelinesLoading ? "animate-spin" : ""}`}
              />
            }
            onPress={handleRefresh}
            isDisabled={pipelinesLoading}
          >
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <ValidationStatsCards stats={stats} loading={statsLoading} />

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
            {pipelines.length} pipeline{pipelines.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        <ValidationPipelineTable
          pipelines={pipelines}
          loading={pipelinesLoading}
          onView={handleView}
          onCancel={handleCancel}
          onDelete={setDeleteConfirmId}
        />

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
          size="sm"
        >
          <ModalContent>
            <ModalHeader>Delete Pipeline</ModalHeader>
            <ModalBody>
              <p className="text-neutral-300">
                Are you sure you want to delete this pipeline? This action
                cannot be undone and will remove all candidates and results.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={() => setDeleteConfirmId(null)}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDelete}
                isLoading={deleting}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </Suspense>
  );
}
