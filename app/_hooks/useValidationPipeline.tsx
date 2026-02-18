"use client";

import { useEffect } from "react";
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
    templateSearchId
    status
    thresholdConfig
    paretoMetrics
    wfaTrainRatio
    wfaWindows
    wfaMinConsistency
    robustnessSteps
    robustnessMinScore
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
    thresholdDetails
    paretoRank
    dominatedBy
    wfaConsistency
    wfaPassed
    userSelectedAt
    userNotes
    robustnessScore
    robustnessPassed
    finalApprovedAt
    finalNotes
    createdAt
    updatedAt
  }
`);

export const BacktestResultSummaryFragment = graphql(`
  fragment BacktestResultSummary on BacktestResult {
    id
    configId
    totalTrades
    winningTrades
    losingTrades
    winRate
    totalPnlUsdt
    totalPnlPercent
    maxDrawdownPercent
    sharpeRatio
    profitFactor
    strategyConfig
  }
`);

export const WalkForwardResultFragment = graphql(`
  fragment WalkForwardResultInfo on WalkForwardResult {
    id
    candidateId
    windowIndex
    status
    trainStart
    trainEnd
    trainMetrics
    testStart
    testEnd
    testMetrics
    consistency
    degradation
    errorMessage
    createdAt
  }
`);

export const RobustnessTestFragment = graphql(`
  fragment RobustnessTestInfo on RobustnessTest {
    id
    candidateId
    stepIndex
    status
    startDate
    endDate
    metrics
    sharpeRatio
    totalPnl
    maxDrawdown
    errorMessage
    createdAt
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
      templateSearchId
      status
      thresholdConfig
      paretoMetrics
      wfaTrainRatio
      wfaWindows
      wfaMinConsistency
      robustnessSteps
      robustnessMinScore
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
      id
      pipelineId
      resultId
      configId
      status
      thresholdPassed
      thresholdDetails
      paretoRank
      dominatedBy
      wfaConsistency
      wfaPassed
      userSelectedAt
      userNotes
      robustnessScore
      robustnessPassed
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

export const ValidationCandidateQuery = graphql(`
  query ValidationCandidate($id: ID!) {
    validationCandidate(id: $id) {
      id
      pipelineId
      resultId
      configId
      status
      thresholdPassed
      thresholdDetails
      paretoRank
      dominatedBy
      wfaConsistency
      wfaPassed
      userSelectedAt
      userNotes
      robustnessScore
      robustnessPassed
      finalApprovedAt
      finalNotes
      createdAt
      updatedAt
      result {
        ...BacktestResultSummary
      }
      walkForwardResults {
        ...WalkForwardResultInfo
      }
      robustnessTests {
        ...RobustnessTestInfo
      }
    }
  }
`);

export const ValidationPipelineStatsQuery = graphql(`
  query ValidationPipelineStats {
    validationPipelineStats {
      created
      running
      awaitingUser
      completed
      failed
      cancelled
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

export const StartValidationPipelineMutation = graphql(`
  mutation StartValidationPipeline($id: ID!) {
    startValidationPipeline(id: $id) {
      ...ValidationPipelineInfo
    }
  }
`);

export const SubmitUserSelectionMutation = graphql(`
  mutation SubmitUserSelection($pipelineId: ID!, $input: UserSelectionInput!) {
    submitUserSelection(pipelineId: $pipelineId, input: $input) {
      ...ValidationPipelineInfo
    }
  }
`);

export const SubmitFinalApprovalMutation = graphql(`
  mutation SubmitFinalApproval($pipelineId: ID!, $input: FinalApprovalInput!) {
    submitFinalApproval(pipelineId: $pipelineId, input: $input) {
      ...ValidationPipelineInfo
    }
  }
`);

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
// Hooks
// ============================================

export function useValidationPipelines(filter?: {
  status?: ValidationPipelineStatus;
  templateSearchId?: string;
  limit?: number;
  offset?: number;
}) {
  const { data, loading, error, refetch } = useQuery(ValidationPipelinesQuery, {
    variables: {
      filter: {
        status: filter?.status,
        templateSearchId: filter?.templateSearchId,
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
  options?: { limit?: number; offset?: number },
) {
  const { data, loading, error, refetch } = useQuery(
    ValidationCandidatesByStatusQuery,
    {
      variables: {
        filter: {
          pipelineId: pipelineId!,
          status,
          limit: options?.limit ?? 100,
          offset: options?.offset ?? 0,
        },
      },
      skip: !pipelineId,
      fetchPolicy: "cache-and-network",
    },
  );

  return {
    candidates: (data?.validationCandidatesByStatus ?? []).map((item) => ({
      ...item,
      result: getFragmentData(BacktestResultSummaryFragment, item.result),
    })),
    loading,
    error,
    refetch,
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

export function useStartValidationPipeline() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    StartValidationPipelineMutation,
    {
      refetchQueries: [ValidationPipelinesQuery, ValidationPipelineStatsQuery],
      onCompleted: () => {
        enqueueSnackbar("Validation pipeline started", { variant: "info" });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to start pipeline: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    startPipeline: mutate,
    loading,
    error,
  };
}

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
        // Update the cache
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

        // Only show notifications if watching a specific pipeline
        if (pipelineId && pipelineInfo.id === pipelineId) {
          // Notify on key status changes
          if (
            pipelineInfo.status ===
            ValidationPipelineStatus.AwaitingUserSelection
          ) {
            enqueueSnackbar("Pipeline ready for user selection", {
              variant: "info",
            });
          } else if (
            pipelineInfo.status ===
            ValidationPipelineStatus.AwaitingFinalApproval
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
        // Only update cache if watching the same pipeline
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
): "created" | "running" | "awaiting" | "completed" | "failed" | "cancelled" {
  switch (status) {
    case ValidationPipelineStatus.Created:
      return "created";
    case ValidationPipelineStatus.Layer_1Running:
    case ValidationPipelineStatus.Layer_1Done:
    case ValidationPipelineStatus.Layer_2Running:
    case ValidationPipelineStatus.Layer_2Done:
    case ValidationPipelineStatus.Layer_3Running:
    case ValidationPipelineStatus.Layer_3Done:
    case ValidationPipelineStatus.Layer_5Running:
    case ValidationPipelineStatus.Layer_5Done:
      return "running";
    case ValidationPipelineStatus.AwaitingUserSelection:
    case ValidationPipelineStatus.AwaitingFinalApproval:
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

export function getPipelineCurrentLayer(
  status: ValidationPipelineStatus,
): number {
  switch (status) {
    case ValidationPipelineStatus.Created:
      return 0;
    case ValidationPipelineStatus.Layer_1Running:
    case ValidationPipelineStatus.Layer_1Done:
      return 1;
    case ValidationPipelineStatus.Layer_2Running:
    case ValidationPipelineStatus.Layer_2Done:
      return 2;
    case ValidationPipelineStatus.Layer_3Running:
    case ValidationPipelineStatus.Layer_3Done:
      return 3;
    case ValidationPipelineStatus.AwaitingUserSelection:
      return 4;
    case ValidationPipelineStatus.Layer_5Running:
    case ValidationPipelineStatus.Layer_5Done:
      return 5;
    case ValidationPipelineStatus.AwaitingFinalApproval:
    case ValidationPipelineStatus.Completed:
      return 6;
    default:
      return 0;
  }
}

export function isPipelineAwaiting(status: ValidationPipelineStatus): boolean {
  return (
    status === ValidationPipelineStatus.AwaitingUserSelection ||
    status === ValidationPipelineStatus.AwaitingFinalApproval
  );
}

export function getCandidateStatusGroup(
  status: ValidationCandidateStatus,
): "pending" | "passed" | "failed" | "selected" | "approved" {
  switch (status) {
    case ValidationCandidateStatus.Pending:
    case ValidationCandidateStatus.WfaPending:
    case ValidationCandidateStatus.RobustnessPending:
      return "pending";
    case ValidationCandidateStatus.PassedThreshold:
    case ValidationCandidateStatus.ParetoOptimal:
    case ValidationCandidateStatus.WfaPassed:
    case ValidationCandidateStatus.RobustnessPassed:
      return "passed";
    case ValidationCandidateStatus.FailedThreshold:
    case ValidationCandidateStatus.ParetoDominated:
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
