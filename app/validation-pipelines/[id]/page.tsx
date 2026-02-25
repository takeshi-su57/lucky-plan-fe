"use client";

import { Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import {
  FiArrowLeft,
  FiRefreshCw,
  FiXCircle,
  FiTrash2,
  FiList,
} from "react-icons/fi";
import dayjs from "dayjs";

import {
  useValidationPipeline,
  useCancelValidationPipeline,
  useDeleteValidationPipeline,
  useSubscribeValidationPipeline,
  useSubscribeValidationCandidate,
} from "@/app-hooks/useValidationPipeline";
import { ValidationPipelineStatus } from "@/graphql/gql/graphql";
import {
  ValidationPipelineStatusBadge,
  StepProgressTracker,
  CandidatesTab,
  ThresholdWizard,
  ParetoConfigPanel,
  WfaWizard,
  RobustnessWizard,
  UserSelectionPanel,
  FinalApprovalPanel,
} from "@/app-components/ValidationWidgets";

export default function ValidationPipelineDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pipelineId = params.id as string;

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Subscribe to real-time updates
  useSubscribeValidationPipeline(pipelineId);
  useSubscribeValidationCandidate(pipelineId);

  // Fetch pipeline data
  const { pipeline, loading, refetch } = useValidationPipeline(pipelineId);

  // Mutations
  const { cancelPipeline, loading: cancelling } = useCancelValidationPipeline();
  const { deletePipeline, loading: deleting } = useDeleteValidationPipeline();

  const handleBack = () => {
    router.push("/validation-pipelines");
  };

  const handleCancel = async () => {
    await cancelPipeline({ variables: { id: pipelineId } });
    await refetch();
  };

  const handleDelete = async () => {
    await deletePipeline({ variables: { id: pipelineId } });
    router.push("/validation-pipelines");
  };

  const canCancel =
    pipeline &&
    ![
      ValidationPipelineStatus.Completed,
      ValidationPipelineStatus.Failed,
      ValidationPipelineStatus.Cancelled,
    ].includes(pipeline.status);
  const canDelete =
    pipeline &&
    [
      ValidationPipelineStatus.Created,
      ValidationPipelineStatus.Completed,
      ValidationPipelineStatus.Failed,
      ValidationPipelineStatus.Cancelled,
    ].includes(pipeline.status);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner color="white" size="lg" />
      </div>
    );
  }

  if (!pipeline) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-neutral-400">Pipeline not found</p>
        <Button variant="flat" onPress={handleBack}>
          Back to Pipelines
        </Button>
      </div>
    );
  }

  const renderWizardStep = () => {
    switch (pipeline.status) {
      case ValidationPipelineStatus.StepThreshold:
        return (
          <ThresholdWizard pipelineId={pipelineId} onComplete={refetch} />
        );
      case ValidationPipelineStatus.StepPareto:
        return (
          <ParetoConfigPanel pipelineId={pipelineId} onComplete={refetch} />
        );
      case ValidationPipelineStatus.StepWfa:
        return (
          <WfaWizard
            pipelineId={pipelineId}
            pipeline={pipeline}
            onComplete={refetch}
          />
        );
      case ValidationPipelineStatus.StepUserSelection:
        return (
          <UserSelectionPanel pipelineId={pipelineId} onComplete={refetch} />
        );
      case ValidationPipelineStatus.StepRobustness:
        return (
          <RobustnessWizard
            pipelineId={pipelineId}
            pipeline={pipeline}
            onComplete={refetch}
          />
        );
      case ValidationPipelineStatus.StepFinalApproval:
        return (
          <FinalApprovalPanel pipelineId={pipelineId} onComplete={refetch} />
        );
      default:
        return null;
    }
  };

  return (
    <Suspense fallback={<Spinner color="white" size="lg" />}>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Button isIconOnly variant="flat" size="sm" onPress={handleBack}>
              <FiArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-white">
                  {pipeline.name}
                </h1>
                <ValidationPipelineStatusBadge status={pipeline.status} />
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <span>ID: {pipeline.id.slice(0, 8)}...</span>
                <span>|</span>
                <span>
                  Created{" "}
                  {dayjs(pipeline.createdAt).format("MMM D, YYYY HH:mm")}
                </span>
                {pipeline.completedAt && (
                  <>
                    <span>|</span>
                    <span>
                      Completed{" "}
                      {dayjs(pipeline.completedAt).format("MMM D, YYYY HH:mm")}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="flat"
              size="sm"
              startContent={
                <FiRefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
              }
              onPress={() => refetch()}
              isDisabled={loading}
            >
              Refresh
            </Button>

            {canCancel && (
              <Button
                color="warning"
                variant="flat"
                size="sm"
                startContent={<FiXCircle className="h-4 w-4" />}
                onPress={handleCancel}
                isLoading={cancelling}
              >
                Cancel
              </Button>
            )}

            {canDelete && (
              <Button
                color="danger"
                variant="flat"
                size="sm"
                startContent={<FiTrash2 className="h-4 w-4" />}
                onPress={() => setDeleteConfirmOpen(true)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>

        {/* Progress Tracker */}
        <StepProgressTracker
          status={pipeline.status}
          stats={{
            totalCandidates: pipeline.totalCandidates,
            passedThreshold: pipeline.passedThreshold,
            paretoOptimal: pipeline.paretoOptimal,
            passedWfa: pipeline.passedWfa,
            userSelected: pipeline.userSelected,
            passedRobustness: pipeline.passedRobustness,
            finalApproved: pipeline.finalApproved,
          }}
        />

        {/* Wizard Step Panel */}
        {renderWizardStep()}

        {/* Error Message */}
        {pipeline.errorMessage && (
          <div className="border-danger-800 bg-danger-900/20 rounded-lg border p-4">
            <p className="text-danger-400 text-sm font-medium">Error</p>
            <p className="text-danger-300 text-sm">{pipeline.errorMessage}</p>
          </div>
        )}

        {/* Candidates Table */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-neutral-300">
            <FiList className="h-4 w-4" />
            <span className="text-sm font-medium">
              Candidates ({pipeline.totalCandidates})
            </span>
          </div>
          <CandidatesTab pipelineId={pipelineId} />
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
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
              <Button
                variant="flat"
                onPress={() => setDeleteConfirmOpen(false)}
              >
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
