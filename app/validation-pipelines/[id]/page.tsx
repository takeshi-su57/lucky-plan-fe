"use client";

import { Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Spinner,
  Tabs,
  Tab,
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
  FiPlay,
  FiList,
  FiSettings,
} from "react-icons/fi";
import dayjs from "dayjs";

import {
  useValidationPipeline,
  useStartValidationPipeline,
  useCancelValidationPipeline,
  useDeleteValidationPipeline,
  useSubscribeValidationPipeline,
  useSubscribeValidationCandidate,
} from "@/app-hooks/useValidationPipeline";
import { ValidationPipelineStatus } from "@/graphql/gql/graphql";
import {
  ValidationPipelineStatusBadge,
  LayerProgressTracker,
  CandidatesTab,
  PipelineConfigTab,
} from "@/app-components/ValidationWidgets";
import { UserSelectionPanel } from "@/app-components/ValidationWidgets/UserSelectionPanel";
import { FinalApprovalPanel } from "@/app-components/ValidationWidgets/FinalApprovalPanel";

type TabKey = "candidates" | "config";

export default function ValidationPipelineDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pipelineId = params.id as string;

  const [selectedTab, setSelectedTab] = useState<TabKey>("candidates");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [_selectedCandidateId, setSelectedCandidateId] = useState<
    string | null
  >(null);

  // Subscribe to real-time updates
  useSubscribeValidationPipeline(pipelineId);
  useSubscribeValidationCandidate(pipelineId);

  // Fetch pipeline data
  const { pipeline, loading, refetch } = useValidationPipeline(pipelineId);

  // Mutations
  const { startPipeline, loading: starting } = useStartValidationPipeline();
  const { cancelPipeline, loading: cancelling } = useCancelValidationPipeline();
  const { deletePipeline, loading: deleting } = useDeleteValidationPipeline();

  const handleBack = () => {
    router.push("/validation-pipelines");
  };

  const handleStart = async () => {
    await startPipeline({ variables: { id: pipelineId } });
    await refetch();
  };

  const handleCancel = async () => {
    await cancelPipeline({ variables: { id: pipelineId } });
    await refetch();
  };

  const handleDelete = async () => {
    await deletePipeline({ variables: { id: pipelineId } });
    router.push("/validation-pipelines");
  };

  const canStart = pipeline?.status === ValidationPipelineStatus.Created;
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

  const isAwaitingUserSelection =
    pipeline?.status === ValidationPipelineStatus.AwaitingUserSelection;
  const isAwaitingFinalApproval =
    pipeline?.status === ValidationPipelineStatus.AwaitingFinalApproval;

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

            {canStart && (
              <Button
                color="primary"
                size="sm"
                startContent={<FiPlay className="h-4 w-4" />}
                onPress={handleStart}
                isLoading={starting}
              >
                Start
              </Button>
            )}

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
        <LayerProgressTracker
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

        {/* User Action Panels */}
        {isAwaitingUserSelection && (
          <UserSelectionPanel pipelineId={pipelineId} onComplete={refetch} />
        )}

        {isAwaitingFinalApproval && (
          <FinalApprovalPanel pipelineId={pipelineId} onComplete={refetch} />
        )}

        {/* Error Message */}
        {pipeline.errorMessage && (
          <div className="border-danger-800 bg-danger-900/20 rounded-lg border p-4">
            <p className="text-danger-400 text-sm font-medium">Error</p>
            <p className="text-danger-300 text-sm">{pipeline.errorMessage}</p>
          </div>
        )}

        {/* Tabs */}
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as TabKey)}
          color="secondary"
          variant="underlined"
          classNames={{
            tabList: "gap-6",
            cursor: "bg-secondary-500",
            tab: "h-10 px-0",
          }}
        >
          <Tab
            key="candidates"
            title={
              <div className="flex items-center gap-2">
                <FiList className="h-4 w-4" />
                <span>Candidates ({pipeline.totalCandidates})</span>
              </div>
            }
          >
            <div className="pt-4">
              <CandidatesTab
                pipelineId={pipelineId}
                onSelectCandidate={setSelectedCandidateId}
              />
            </div>
          </Tab>

          <Tab
            key="config"
            title={
              <div className="flex items-center gap-2">
                <FiSettings className="h-4 w-4" />
                <span>Configuration</span>
              </div>
            }
          >
            <div className="pt-4">
              <PipelineConfigTab pipeline={pipeline} />
            </div>
          </Tab>
        </Tabs>

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
