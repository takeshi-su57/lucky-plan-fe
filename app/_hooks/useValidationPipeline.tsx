"use client";

import { useCallback, useEffect } from "react";
import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client/react";
import { graphql } from "@/gql/gql";
import {
  ValidationPipeline,
  ValidationPipelineStatus,
  ValidationCandidate,
  ValidationCandidateStatus,
} from "@/graphql/gql/graphql";
import { useSnackbar } from "notistack";
import { getFragmentData } from "@/graphql/gql";

// ============================================
// Fragments
// ============================================

export const ValidationPipelineInfoFragment = graphql(`
  fragment ValidationPipelineInfo on ValidationPipeline {
    id
    name
    backtestTaskId
    status
    currentStep
    paretoConfig
    wfaConfig
    robustnessConfig
    wfaCompletedWindows
    robustnessCompletedSteps
    totalCandidates
    passedThreshold
    paretoOptimal
    passedWfa
    userSelected
    passedRobustness
    finalApproved
    createdAt
    startedAt
    completedAt
    errorMessage
  }
`);

export const ValidationCandidateInfoFragment = graphql(`
  fragment ValidationCandidateInfo on ValidationCandidate {
    id
    pipelineId
    resultId
    configId
    status
    thresholdPassed
    paretoRank
    dominatedBy
    wfaConsistency
    wfaPassed
    wfaWindowResults
    userSelectedAt
    userNotes
    robustnessScore
    robustnessPassed
    robustnessStepResults
    finalApprovedAt
    finalNotes
    createdAt
    updatedAt
  }
`);

export const BacktestResultSummaryFragment = graphql(`
  fragment BacktestResultSummary on BacktestResult {
    id
    taskId
    configId
    runDate
    totalTrades
    winningTrades
    losingTrades
    winRate
    totalPnlUsdt
    totalPnlPercent
    maxDrawdownUsdt
    maxDrawdownPercent
    sharpeRatio
    profitFactor
    strategyConfig
  }
`);

// ============================================
// Queries
// ============================================

export const ValidationPipelinesQuery = graphql(`
  query ValidationPipelines($filter: ValidationPipelineFilterInput) {
    validationPipelines(filter: $filter) {
      ...ValidationPipelineInfo
    }
  }
`);

export const ValidationPipelineQuery = graphql(`
  query ValidationPipeline($id: ID!) {
    validationPipeline(id: $id) {
      ...ValidationPipelineInfo
    }
  }
`);

export const ValidationPipelineWithCandidatesQuery = graphql(`
  query ValidationPipelineWithCandidates($id: ID!) {
    validationPipelineWithCandidates(id: $id) {
      id
      name
      backtestTaskId
      status
      currentStep
      paretoConfig
      wfaConfig
      robustnessConfig
      wfaCompletedWindows
      robustnessCompletedSteps
      totalCandidates
      passedThreshold
      paretoOptimal
      passedWfa
      userSelected
      passedRobustness
      finalApproved
      createdAt
      startedAt
      completedAt
      errorMessage
      candidates {
        ...ValidationCandidateInfo
      }
    }
  }
`);

export const ValidationCandidatesByStatusQuery = graphql(`
  query ValidationCandidatesByStatus($filter: ValidationCandidateFilterInput!) {
    validationCandidatesByStatus(filter: $filter) {
      totalCount
      candidates {
        id
        pipelineId
        resultId
        configId
        status
        thresholdPassed
        paretoRank
        dominatedBy
        wfaConsistency
        wfaPassed
        wfaWindowResults
        userSelectedAt
        userNotes
        robustnessScore
        robustnessPassed
        robustnessStepResults
        finalApprovedAt
        finalNotes
        createdAt
        updatedAt
        result {
          ...BacktestResultSummary
        }
      }
    }
  }
`);

export const ValidationCandidateQuery = graphql(`
  query ValidationCandidate($id: ID!) {
    validationCandidate(id: $id) {
      id
      pipelineId
      resultId
      configId
      status
      thresholdPassed
      paretoRank
      dominatedBy
      wfaConsistency
      wfaPassed
      wfaWindowResults
      userSelectedAt
      userNotes
      robustnessScore
      robustnessPassed
      robustnessStepResults
      finalApprovedAt
      finalNotes
      createdAt
      updatedAt
      result {
        ...BacktestResultSummary
      }
    }
  }
`);

export const ValidationPipelineStatsQuery = graphql(`
  query ValidationPipelineStats {
    validationPipelineStats {
      created
      inProgress
      awaitingUser
      completed
      failed
      cancelled
    }
  }
`);

export const ThresholdStepsQuery = graphql(`
  query ThresholdSteps($pipelineId: ID!) {
    thresholdSteps(pipelineId: $pipelineId) {
      id
      pipelineId
      stepOrder
      metricName
      operator
      value
      candidatesBefore
      candidatesAfter
      createdAt
    }
  }
`);

export const ParetoStepsQuery = graphql(`
  query ParetoSteps($pipelineId: ID!) {
    paretoSteps(pipelineId: $pipelineId) {
      id
      pipelineId
      stepOrder
      metrics
      candidatesBefore
      candidatesAfter
      createdAt
    }
  }
`);

// ============================================
// Mutations
// ============================================

export const CreateValidationPipelineMutation = graphql(`
  mutation CreateValidationPipeline($input: CreateValidationPipelineInput!) {
    createValidationPipeline(input: $input) {
      ...ValidationPipelineInfo
    }
  }
`);

// --- Threshold mutations ---

export const ApplyThresholdStepMutation = graphql(`
  mutation ApplyThresholdStep($input: ApplyThresholdStepInput!) {
    applyThresholdStep(input: $input) {
      ...ValidationPipelineInfo
    }
  }
`);

export const PreviewThresholdStepMutation = graphql(`
  mutation PreviewThresholdStep($input: PreviewThresholdStepInput!) {
    previewThresholdStep(input: $input) {
      currentCount
      survivingCount
      eliminatedCount
    }
  }
`);

export const RemoveThresholdStepMutation = graphql(`
  mutation RemoveThresholdStep($pipelineId: ID!, $stepId: ID!) {
    removeThresholdStep(pipelineId: $pipelineId, stepId: $stepId) {
      ...ValidationPipelineInfo
    }
  }
`);

export const CompleteThresholdStepMutation = graphql(`
  mutation CompleteThresholdStep($pipelineId: ID!) {
    completeThresholdStep(pipelineId: $pipelineId) {
      ...ValidationPipelineInfo
    }
  }
`);

// --- Pareto mutations ---

export const PreviewParetoStepMutation = graphql(`
  mutation PreviewParetoStep($input: PreviewParetoStepInput!) {
    previewParetoStep(input: $input) {
      currentCount
      optimalCount
      dominatedCount
    }
  }
`);

export const ApplyParetoStepMutation = graphql(`
  mutation ApplyParetoStep($input: ApplyParetoStepInput!) {
    applyParetoStep(input: $input) {
      ...ValidationPipelineInfo
    }
  }
`);

export const RemoveParetoStepMutation = graphql(`
  mutation RemoveParetoStep($pipelineId: ID!, $stepId: ID!) {
    removeParetoStep(pipelineId: $pipelineId, stepId: $stepId) {
      ...ValidationPipelineInfo
    }
  }
`);

export const CompleteParetoStepMutation = graphql(`
  mutation CompleteParetoStep($pipelineId: ID!) {
    completeParetoStep(pipelineId: $pipelineId) {
      ...ValidationPipelineInfo
    }
  }
`);

// --- WFA mutations ---

export const StartWfaMutation = graphql(`
  mutation StartWfa($input: StartWfaInput!) {
    startWfa(input: $input) {
      ...ValidationPipelineInfo
    }
  }
`);

export const PauseWfaMutation = graphql(`
  mutation PauseWfa($pipelineId: ID!) {
    pauseWfa(pipelineId: $pipelineId) {
      ...ValidationPipelineInfo
    }
  }
`);

export const ResumeWfaMutation = graphql(`
  mutation ResumeWfa($pipelineId: ID!) {
    resumeWfa(pipelineId: $pipelineId) {
      ...ValidationPipelineInfo
    }
  }
`);

export const CompleteWfaMutation = graphql(`
  mutation CompleteWfa($pipelineId: ID!) {
    completeWfa(pipelineId: $pipelineId) {
      ...ValidationPipelineInfo
    }
  }
`);

// --- User Selection ---

export const SubmitUserSelectionMutation = graphql(`
  mutation SubmitUserSelection($pipelineId: ID!, $input: UserSelectionInput!) {
    submitUserSelection(pipelineId: $pipelineId, input: $input) {
      ...ValidationPipelineInfo
    }
  }
`);

// --- Robustness mutations ---

export const ConfigureRobustnessMutation = graphql(`
  mutation ConfigureRobustness($input: ConfigureRobustnessInput!) {
    configureRobustness(input: $input) {
      ...ValidationPipelineInfo
    }
  }
`);

export const RunRobustnessStepMutation = graphql(`
  mutation RunRobustnessStep($input: RunRobustnessStepInput!) {
    runRobustnessStep(input: $input) {
      candidateId
      configId
      stepIndex
      sharpeRatio
      totalPnl
      maxDrawdown
      status
      errorMessage
    }
  }
`);

export const CompleteRobustnessMutation = graphql(`
  mutation CompleteRobustness($pipelineId: ID!) {
    completeRobustness(pipelineId: $pipelineId) {
      ...ValidationPipelineInfo
    }
  }
`);

// --- Final Approval ---

export const SubmitFinalApprovalMutation = graphql(`
  mutation SubmitFinalApproval($pipelineId: ID!, $input: FinalApprovalInput!) {
    submitFinalApproval(pipelineId: $pipelineId, input: $input) {
      ...ValidationPipelineInfo
    }
  }
`);

// --- Pipeline Management ---

export const CancelValidationPipelineMutation = graphql(`
  mutation CancelValidationPipeline($id: ID!) {
    cancelValidationPipeline(id: $id) {
      ...ValidationPipelineInfo
    }
  }
`);

export const DeleteValidationPipelineMutation = graphql(`
  mutation DeleteValidationPipeline($id: ID!) {
    deleteValidationPipeline(id: $id)
  }
`);

// ============================================
// Subscriptions
// ============================================

export const ValidationPipelineUpdatedSubscription = graphql(`
  subscription ValidationPipelineUpdated {
    validationPipelineUpdated {
      ...ValidationPipelineInfo
    }
  }
`);

export const ValidationCandidateUpdatedSubscription = graphql(`
  subscription ValidationCandidateUpdated {
    validationCandidateUpdated {
      ...ValidationCandidateInfo
    }
  }
`);

// ============================================
// Query Hooks
// ============================================

export function useValidationPipelines(filter?: {
  status?: ValidationPipelineStatus;
  backtestTaskId?: string;
  limit?: number;
  offset?: number;
}) {
  const { data, loading, error, refetch } = useQuery(ValidationPipelinesQuery, {
    variables: {
      filter: {
        status: filter?.status,
        backtestTaskId: filter?.backtestTaskId,
        limit: filter?.limit ?? 20,
        offset: filter?.offset ?? 0,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    pipelines: (data?.validationPipelines ?? []).map(
      (item) =>
        getFragmentData(
          ValidationPipelineInfoFragment,
          item,
        ) as ValidationPipeline,
    ),
    loading,
    error,
    refetch,
  };
}

export function useValidationPipeline(id: string | null) {
  const { data, loading, error, refetch } = useQuery(ValidationPipelineQuery, {
    variables: { id: id! },
    skip: !id,
    fetchPolicy: "cache-and-network",
  });

  return {
    pipeline: data?.validationPipeline
      ? (getFragmentData(
          ValidationPipelineInfoFragment,
          data.validationPipeline,
        ) as ValidationPipeline)
      : null,
    loading,
    error,
    refetch,
  };
}

export function useValidationPipelineWithCandidates(id: string | null) {
  const { data, loading, error, refetch } = useQuery(
    ValidationPipelineWithCandidatesQuery,
    {
      variables: { id: id! },
      skip: !id,
      fetchPolicy: "cache-and-network",
    },
  );

  return {
    pipeline: data?.validationPipelineWithCandidates ?? null,
    loading,
    error,
    refetch,
  };
}

export function useValidationCandidatesByStatus(
  pipelineId: string | null,
  status?: ValidationCandidateStatus,
  options?: { limit?: number },
) {
  const limit = options?.limit ?? 100;

  const { data, loading, error, refetch, fetchMore } = useQuery(
    ValidationCandidatesByStatusQuery,
    {
      variables: {
        filter: {
          pipelineId: pipelineId!,
          status,
          limit,
          offset: 0,
        },
      },
      skip: !pipelineId,
      fetchPolicy: "cache-and-network",
    },
  );

  const result = data?.validationCandidatesByStatus;
  const candidates = (result?.candidates ?? []).map((item) => ({
    ...item,
    result: getFragmentData(BacktestResultSummaryFragment, item.result),
  }));
  const totalCount = result?.totalCount ?? 0;
  const hasMore = candidates.length < totalCount;

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    fetchMore({
      variables: {
        filter: {
          pipelineId: pipelineId!,
          status,
          limit,
          offset: result?.candidates.length ?? 0,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          validationCandidatesByStatus: {
            ...fetchMoreResult.validationCandidatesByStatus,
            candidates: [
              ...prev.validationCandidatesByStatus.candidates,
              ...fetchMoreResult.validationCandidatesByStatus.candidates,
            ],
          },
        };
      },
    });
  }, [hasMore, loading, fetchMore, pipelineId, status, limit, result?.candidates.length]);

  return {
    candidates,
    totalCount,
    hasMore,
    loading,
    error,
    refetch,
    loadMore,
  };
}

export function useValidationCandidate(id: string | null) {
  const { data, loading, error, refetch } = useQuery(ValidationCandidateQuery, {
    variables: { id: id! },
    skip: !id,
    fetchPolicy: "cache-and-network",
  });

  return {
    candidate: data?.validationCandidate ?? null,
    loading,
    error,
    refetch,
  };
}

export function useValidationPipelineStats() {
  const { data, loading, error, refetch } = useQuery(
    ValidationPipelineStatsQuery,
    {
      fetchPolicy: "cache-and-network",
    },
  );

  return {
    stats: data?.validationPipelineStats ?? null,
    loading,
    error,
    refetch,
  };
}

export function useThresholdSteps(pipelineId: string | null) {
  const { data, loading, error, refetch } = useQuery(ThresholdStepsQuery, {
    variables: { pipelineId: pipelineId! },
    skip: !pipelineId,
    fetchPolicy: "cache-and-network",
  });

  return {
    steps: data?.thresholdSteps ?? [],
    loading,
    error,
    refetch,
  };
}

export function useParetoSteps(pipelineId: string | null) {
  const { data, loading, error, refetch } = useQuery(ParetoStepsQuery, {
    variables: { pipelineId: pipelineId! },
    skip: !pipelineId,
    fetchPolicy: "cache-and-network",
  });

  return {
    steps: data?.paretoSteps ?? [],
    loading,
    error,
    refetch,
  };
}

// ============================================
// Mutation Hooks
// ============================================

export function useCreateValidationPipeline() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    CreateValidationPipelineMutation,
    {
      refetchQueries: [ValidationPipelinesQuery, ValidationPipelineStatsQuery],
      onCompleted: (data) => {
        if (data.createValidationPipeline) {
          enqueueSnackbar("Validation pipeline created successfully", {
            variant: "success",
          });
        }
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to create pipeline: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    createPipeline: mutate,
    loading,
    error,
  };
}

// --- Threshold hooks ---

export function useApplyThresholdStep() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    ApplyThresholdStepMutation,
    {
      refetchQueries: [ValidationCandidatesByStatusQuery],
      onCompleted: () => {
        enqueueSnackbar("Threshold filter applied", { variant: "success" });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to apply threshold: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return { applyThreshold: mutate, loading, error };
}

export function usePreviewThresholdStep() {
  const [mutate, { loading, error, data }] = useMutation(
    PreviewThresholdStepMutation,
  );

  return {
    previewThreshold: mutate,
    preview: data?.previewThresholdStep ?? null,
    loading,
    error,
  };
}

export function useRemoveThresholdStep() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    RemoveThresholdStepMutation,
    {
      refetchQueries: [ValidationCandidatesByStatusQuery],
      onCompleted: () => {
        enqueueSnackbar("Threshold filter removed", { variant: "info" });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to remove threshold: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return { removeThreshold: mutate, loading, error };
}

export function useCompleteThresholdStep() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    CompleteThresholdStepMutation,
    {
      refetchQueries: [ValidationCandidatesByStatusQuery],
      onCompleted: () => {
        enqueueSnackbar("Threshold step completed, moving to Pareto", {
          variant: "success",
        });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to complete threshold step: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return { completeThreshold: mutate, loading, error };
}

// --- Pareto hooks ---

export function usePreviewParetoStep() {
  const [mutate, { loading, error, data }] = useMutation(
    PreviewParetoStepMutation,
  );

  return {
    previewPareto: mutate,
    preview: data?.previewParetoStep ?? null,
    loading,
    error,
  };
}

export function useApplyParetoStep() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    ApplyParetoStepMutation,
    {
      refetchQueries: [ValidationCandidatesByStatusQuery],
      onCompleted: () => {
        enqueueSnackbar("Pareto selection applied", { variant: "success" });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to apply Pareto: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return { applyPareto: mutate, loading, error };
}

export function useRemoveParetoStep() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    RemoveParetoStepMutation,
    {
      refetchQueries: [ValidationCandidatesByStatusQuery],
      onCompleted: () => {
        enqueueSnackbar("Pareto step removed", { variant: "info" });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to remove Pareto step: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return { removePareto: mutate, loading, error };
}

export function useCompleteParetoStep() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    CompleteParetoStepMutation,
    {
      refetchQueries: [ValidationCandidatesByStatusQuery],
      onCompleted: () => {
        enqueueSnackbar("Pareto step completed, moving to WFA", {
          variant: "success",
        });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to complete Pareto step: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return { completePareto: mutate, loading, error };
}

// --- WFA hooks ---

export function useStartWfa() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(StartWfaMutation, {
    onCompleted: () => {
      enqueueSnackbar("WFA started", { variant: "success" });
    },
    onError: (err) => {
      enqueueSnackbar(`Failed to start WFA: ${err.message}`, {
        variant: "error",
      });
    },
  });

  return { startWfa: mutate, loading, error };
}

export function usePauseWfa() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(PauseWfaMutation, {
    onCompleted: () => {
      enqueueSnackbar("WFA pausing...", { variant: "info" });
    },
    onError: (err) => {
      enqueueSnackbar(`Failed to pause WFA: ${err.message}`, {
        variant: "error",
      });
    },
  });

  return { pauseWfa: mutate, loading, error };
}

export function useResumeWfa() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(ResumeWfaMutation, {
    onCompleted: () => {
      enqueueSnackbar("WFA resumed", { variant: "success" });
    },
    onError: (err) => {
      enqueueSnackbar(`Failed to resume WFA: ${err.message}`, {
        variant: "error",
      });
    },
  });

  return { resumeWfa: mutate, loading, error };
}

export function useCompleteWfa() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(CompleteWfaMutation, {
    refetchQueries: [ValidationCandidatesByStatusQuery],
    onCompleted: () => {
      enqueueSnackbar("WFA approved, moving to user selection", {
        variant: "success",
      });
    },
    onError: (err) => {
      enqueueSnackbar(`Failed to complete WFA: ${err.message}`, {
        variant: "error",
      });
    },
  });

  return { completeWfa: mutate, loading, error };
}

// --- User Selection hook ---

export function useSubmitUserSelection() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    SubmitUserSelectionMutation,
    {
      onCompleted: (data) => {
        const pipeline = getFragmentData(
          ValidationPipelineInfoFragment,
          data.submitUserSelection,
        ) as ValidationPipeline;

        if (pipeline) {
          enqueueSnackbar(
            `${pipeline.userSelected} candidates selected for robustness testing`,
            {
              variant: "success",
            },
          );
        }
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to submit selection: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    submitSelection: mutate,
    loading,
    error,
  };
}

// --- Robustness hooks ---

export function useConfigureRobustness() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    ConfigureRobustnessMutation,
    {
      onCompleted: () => {
        enqueueSnackbar("Robustness testing configured", {
          variant: "success",
        });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to configure robustness: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return { configureRobustness: mutate, loading, error };
}

export function useRunRobustnessStep() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error, data }] = useMutation(
    RunRobustnessStepMutation,
    {
      onError: (err) => {
        enqueueSnackbar(`Robustness step failed: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    runStep: mutate,
    stepResults: data?.runRobustnessStep ?? null,
    loading,
    error,
  };
}

export function useCompleteRobustness() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(CompleteRobustnessMutation, {
    onCompleted: () => {
      enqueueSnackbar("Robustness completed, moving to final approval", {
        variant: "success",
      });
    },
    onError: (err) => {
      enqueueSnackbar(`Failed to complete robustness: ${err.message}`, {
        variant: "error",
      });
    },
  });

  return { completeRobustness: mutate, loading, error };
}

// --- Final Approval hook ---

export function useSubmitFinalApproval() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    SubmitFinalApprovalMutation,
    {
      onCompleted: (data) => {
        const pipeline = getFragmentData(
          ValidationPipelineInfoFragment,
          data.submitFinalApproval,
        );

        if (pipeline) {
          enqueueSnackbar(
            `${pipeline.finalApproved} strategies approved! Pipeline completed.`,
            {
              variant: "success",
            },
          );
        }
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to submit approval: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    submitApproval: mutate,
    loading,
    error,
  };
}

// --- Pipeline Management hooks ---

export function useCancelValidationPipeline() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    CancelValidationPipelineMutation,
    {
      refetchQueries: [ValidationPipelinesQuery, ValidationPipelineStatsQuery],
      onCompleted: () => {
        enqueueSnackbar("Pipeline cancelled", { variant: "info" });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to cancel pipeline: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    cancelPipeline: mutate,
    loading,
    error,
  };
}

export function useDeleteValidationPipeline() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    DeleteValidationPipelineMutation,
    {
      refetchQueries: [ValidationPipelinesQuery, ValidationPipelineStatsQuery],
      onCompleted: () => {
        enqueueSnackbar("Pipeline deleted", { variant: "success" });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to delete pipeline: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    deletePipeline: mutate,
    loading,
    error,
  };
}

// ============================================
// Subscription Hooks
// ============================================

export function useSubscribeValidationPipeline(pipelineId?: string | null) {
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useSubscription(
    ValidationPipelineUpdatedSubscription,
  );

  useEffect(() => {
    if (data?.validationPipelineUpdated && !error) {
      const pipelineInfo = getFragmentData(
        ValidationPipelineInfoFragment,
        data.validationPipelineUpdated,
      ) as ValidationPipeline;

      if (pipelineInfo) {
        client.cache.writeFragment({
          id: client.cache.identify({
            __typename: "ValidationPipeline",
            id: pipelineInfo.id,
          }),
          fragment: ValidationPipelineInfoFragment,
          fragmentName: "ValidationPipelineInfo",
          data: {
            __typename: "ValidationPipeline",
            ...pipelineInfo,
          },
        });

        if (pipelineId && pipelineInfo.id === pipelineId) {
          if (
            pipelineInfo.status ===
            ValidationPipelineStatus.StepUserSelection
          ) {
            enqueueSnackbar("Pipeline ready for user selection", {
              variant: "info",
            });
          } else if (
            pipelineInfo.status ===
            ValidationPipelineStatus.StepFinalApproval
          ) {
            enqueueSnackbar("Pipeline ready for final approval", {
              variant: "info",
            });
          } else if (
            pipelineInfo.status === ValidationPipelineStatus.Completed
          ) {
            enqueueSnackbar("Pipeline completed!", { variant: "success" });
          } else if (pipelineInfo.status === ValidationPipelineStatus.Failed) {
            enqueueSnackbar(`Pipeline failed: ${pipelineInfo.errorMessage}`, {
              variant: "error",
            });
          }
        }
      }
    }
  }, [client.cache, data, error, enqueueSnackbar, pipelineId]);

  const pipelineUpdate = data?.validationPipelineUpdated
    ? (getFragmentData(
        ValidationPipelineInfoFragment,
        data.validationPipelineUpdated,
      ) as ValidationPipeline)
    : null;

  return {
    pipelineUpdate,
    loading,
    error,
  };
}

export function useSubscribeValidationCandidate(pipelineId?: string | null) {
  const client = useApolloClient();

  const { data, loading, error } = useSubscription(
    ValidationCandidateUpdatedSubscription,
  );

  useEffect(() => {
    if (data?.validationCandidateUpdated && !error) {
      const candidateInfo = getFragmentData(
        ValidationCandidateInfoFragment,
        data.validationCandidateUpdated,
      ) as ValidationCandidate;

      if (candidateInfo) {
        if (!pipelineId || candidateInfo.pipelineId === pipelineId) {
          client.cache.writeFragment({
            id: client.cache.identify({
              __typename: "ValidationCandidate",
              id: candidateInfo.id,
            }),
            fragment: ValidationCandidateInfoFragment,
            fragmentName: "ValidationCandidateInfo",
            data: {
              __typename: "ValidationCandidate",
              ...candidateInfo,
            },
          });
        }
      }
    }
  }, [client.cache, data, error, pipelineId]);

  const candidateUpdate = data?.validationCandidateUpdated
    ? (getFragmentData(
        ValidationCandidateInfoFragment,
        data.validationCandidateUpdated,
      ) as ValidationCandidate)
    : null;

  return {
    candidateUpdate,
    loading,
    error,
  };
}

// ============================================
// Helper Functions
// ============================================

export function getPipelineStatusGroup(
  status: ValidationPipelineStatus,
): "created" | "inProgress" | "awaiting" | "completed" | "failed" | "cancelled" {
  switch (status) {
    case ValidationPipelineStatus.Created:
      return "created";
    case ValidationPipelineStatus.StepThreshold:
    case ValidationPipelineStatus.StepPareto:
    case ValidationPipelineStatus.StepWfa:
    case ValidationPipelineStatus.StepRobustness:
      return "inProgress";
    case ValidationPipelineStatus.StepUserSelection:
    case ValidationPipelineStatus.StepFinalApproval:
      return "awaiting";
    case ValidationPipelineStatus.Completed:
      return "completed";
    case ValidationPipelineStatus.Failed:
      return "failed";
    case ValidationPipelineStatus.Cancelled:
      return "cancelled";
    default:
      return "created";
  }
}

export function getPipelineCurrentStep(
  status: ValidationPipelineStatus,
): number {
  switch (status) {
    case ValidationPipelineStatus.Created:
      return 1;
    case ValidationPipelineStatus.StepThreshold:
      return 2;
    case ValidationPipelineStatus.StepPareto:
      return 3;
    case ValidationPipelineStatus.StepWfa:
      return 4;
    case ValidationPipelineStatus.StepUserSelection:
      return 5;
    case ValidationPipelineStatus.StepRobustness:
      return 6;
    case ValidationPipelineStatus.StepFinalApproval:
      return 7;
    case ValidationPipelineStatus.Completed:
      return 7;
    default:
      return 1;
  }
}

export function isPipelineAwaiting(status: ValidationPipelineStatus): boolean {
  return (
    status === ValidationPipelineStatus.StepUserSelection ||
    status === ValidationPipelineStatus.StepFinalApproval
  );
}

export function getCandidateStatusGroup(
  status: ValidationCandidateStatus,
): "pending" | "active" | "eliminated" | "passed" | "failed" | "selected" | "approved" {
  switch (status) {
    case ValidationCandidateStatus.Pending:
      return "pending";
    case ValidationCandidateStatus.Active:
    case ValidationCandidateStatus.ParetoOptimal:
      return "active";
    case ValidationCandidateStatus.ThresholdEliminated:
    case ValidationCandidateStatus.ParetoDominated:
      return "eliminated";
    case ValidationCandidateStatus.WfaPassed:
    case ValidationCandidateStatus.RobustnessPassed:
      return "passed";
    case ValidationCandidateStatus.WfaFailed:
    case ValidationCandidateStatus.RobustnessFailed:
    case ValidationCandidateStatus.UserRejected:
    case ValidationCandidateStatus.FinalRejected:
      return "failed";
    case ValidationCandidateStatus.UserSelected:
      return "selected";
    case ValidationCandidateStatus.FinalApproved:
      return "approved";
    default:
      return "pending";
  }
}
