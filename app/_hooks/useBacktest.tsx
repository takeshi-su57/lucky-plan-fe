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
  BacktestTask,
  BacktestTaskStatus,
  BacktestResult,
} from "@/graphql/gql/graphql";
import { useSnackbar } from "notistack";
import { getFragmentData } from "@/graphql/gql";

// ============================================
// Fragments
// ============================================

export const BacktestTaskInfoFragment = graphql(`
  fragment BacktestTaskInfo on BacktestTask {
    id
    name
    symbol
    status
    totalConfigs
    processedConfigs
    currentConfig
    startDate
    endDate
    interval
    optimizationParams
    searchStrategy
    optimizationMetrics
    trials
    bestConfigIds
    optunaStudyPath
    optimizerPid
    createdAt
    startedAt
    completedAt
    errorMessage
  }
`);

export const BacktestResultInfoFragment = graphql(`
  fragment BacktestResultInfo on BacktestResult {
    id
    taskId
    configId
    runDate
    strategyConfig
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
    resultFolder
    createdAt
  }
`);

// ============================================
// Queries
// ============================================

export const BacktestComponentsQuery = graphql(`
  query BacktestComponents {
    backtestComponents {
      signals {
        name
        description
        params {
          name
          type
          required
          default
          description
          min
          max
          options {
            label
            value
          }
        }
      }
      filters {
        name
        description
        params {
          name
          type
          required
          default
          description
          min
          max
          options {
            label
            value
          }
        }
      }
      risk {
        name
        description
        params {
          name
          type
          required
          default
          description
          min
          max
          options {
            label
            value
          }
        }
      }
      exits {
        name
        description
        params {
          name
          type
          required
          default
          description
          min
          max
          options {
            label
            value
          }
        }
      }
      platforms {
        name
        description
        params {
          name
          type
          required
          default
          description
          min
          max
          options {
            label
            value
          }
        }
      }
    }
  }
`);

export const BacktestTaskQuery = graphql(`
  query BacktestTask($id: ID!) {
    backtestTask(id: $id) {
      ...BacktestTaskInfo
    }
  }
`);

export const BacktestTasksQuery = graphql(`
  query BacktestTasks(
    $status: BacktestTaskStatus
    $symbol: String
    $limit: Int
    $offset: Int
  ) {
    backtestTasks(
      status: $status
      symbol: $symbol
      limit: $limit
      offset: $offset
    ) {
      ...BacktestTaskInfo
    }
  }
`);

export const BacktestTaskStatsQuery = graphql(`
  query BacktestTaskStats {
    backtestTaskStats {
      await
      processing
      done
      failed
    }
  }
`);

export const BacktestResultsQuery = graphql(`
  query BacktestResults(
    $taskId: ID!
    $sortBy: String
    $sortOrder: String
    $limit: Int
    $offset: Int
  ) {
    backtestResults(
      taskId: $taskId
      sortBy: $sortBy
      sortOrder: $sortOrder
      limit: $limit
      offset: $offset
    ) {
      ...BacktestResultInfo
    }
  }
`);

export const BacktestResultDatesQuery = graphql(`
  query BacktestResultDates($taskId: ID!) {
    backtestResultDates(taskId: $taskId)
  }
`);

export const BacktestResultFoldersQuery = graphql(`
  query BacktestResultFolders($taskId: ID!, $date: String!) {
    backtestResultFolders(taskId: $taskId, date: $date) {
      taskId
      date
      configId
      files
    }
  }
`);

export const BacktestResultFileQuery = graphql(`
  query BacktestResultFile(
    $taskId: ID!
    $date: String!
    $configId: String!
    $fileName: String!
  ) {
    backtestResultFile(
      taskId: $taskId
      date: $date
      configId: $configId
      fileName: $fileName
    ) {
      name
      content
      contentType
      size
      originalSize
      isCompressed
    }
  }
`);

export const TopBacktestResultsQuery = graphql(`
  query TopBacktestResults($taskId: ID!, $metric: String, $limit: Int) {
    topBacktestResults(taskId: $taskId, metric: $metric, limit: $limit) {
      ...BacktestResultInfo
    }
  }
`);

export const OptunaDashboardStatusQuery = graphql(`
  query OptunaDashboardStatus {
    optunaDashboardStatus {
      running
      taskId
      url
    }
  }
`);

export const OptunaStudyDatesQuery = graphql(`
  query OptunaStudyDates($taskId: ID!) {
    optunaStudyDates(taskId: $taskId)
  }
`);

// ============================================
// Mutations
// ============================================

export const CreateBacktestTaskMutation = graphql(`
  mutation CreateBacktestTask($input: CreateBacktestTaskInput!) {
    createBacktestTask(input: $input) {
      ...BacktestTaskInfo
    }
  }
`);

export const CancelBacktestTaskMutation = graphql(`
  mutation CancelBacktestTask($taskId: ID!) {
    cancelBacktestTask(taskId: $taskId) {
      ...BacktestTaskInfo
    }
  }
`);

export const DeleteBacktestTaskMutation = graphql(`
  mutation DeleteBacktestTask($taskId: ID!) {
    deleteBacktestTask(taskId: $taskId)
  }
`);

export const DeleteBacktestResultMutation = graphql(`
  mutation DeleteBacktestResult($resultId: ID!) {
    deleteBacktestResult(resultId: $resultId)
  }
`);

export const RetryBacktestTaskMutation = graphql(`
  mutation RetryBacktestTask($taskId: ID!) {
    retryBacktestTask(taskId: $taskId) {
      ...BacktestTaskInfo
    }
  }
`);

export const StartOptunaDashboardMutation = graphql(`
  mutation StartOptunaDashboard($taskId: ID!, $date: String!, $port: Int) {
    startOptunaDashboard(taskId: $taskId, date: $date, port: $port) {
      running
      taskId
      url
    }
  }
`);

export const StopOptunaDashboardMutation = graphql(`
  mutation StopOptunaDashboard {
    stopOptunaDashboard
  }
`);

// ============================================
// Subscriptions
// ============================================

export const BacktestTaskUpdatedSubscription = graphql(`
  subscription BacktestTaskUpdated {
    backtestTaskUpdated {
      ...BacktestTaskInfo
    }
  }
`);

export const BacktestResultCreatedSubscription = graphql(`
  subscription BacktestResultCreated {
    backtestResultCreated {
      ...BacktestResultInfo
    }
  }
`);

// ============================================
// Hooks
// ============================================

export function useBacktestComponents() {
  const { data, loading, error, refetch } = useQuery(BacktestComponentsQuery);

  return {
    components: data?.backtestComponents,
    loading,
    error,
    refetch,
  };
}

export function useBacktestTask(taskId: string | null) {
  const { data, loading, error, refetch } = useQuery(BacktestTaskQuery, {
    variables: { id: taskId! },
    skip: !taskId,
  });

  return {
    task: getFragmentData(BacktestTaskInfoFragment, data?.backtestTask) ?? null,
    loading,
    error,
    refetch,
  };
}

export function useBacktestTasks(filters?: {
  status?: BacktestTaskStatus;
  symbol?: string;
  limit?: number;
  offset?: number;
}) {
  const { data, loading, error, refetch, fetchMore } = useQuery(
    BacktestTasksQuery,
    {
      variables: {
        status: filters?.status,
        symbol: filters?.symbol,
        limit: filters?.limit ?? 20,
        offset: filters?.offset ?? 0,
      },
      fetchPolicy: "cache-and-network",
    },
  );

  return {
    tasks: (data?.backtestTasks ?? [])
      .map((item) => getFragmentData(BacktestTaskInfoFragment, item) ?? null)
      .filter((item) => item !== null) as BacktestTask[],
    loading,
    error,
    refetch,
    fetchMore,
  };
}

export function useBacktestTaskStats() {
  const { data, loading, error, refetch } = useQuery(BacktestTaskStatsQuery, {
    fetchPolicy: "cache-and-network",
  });

  return {
    stats: data?.backtestTaskStats,
    loading,
    error,
    refetch,
  };
}

export function useBacktestResults(
  taskId: string | null,
  options?: {
    sortBy?: string;
    sortOrder?: string;
    limit?: number;
    offset?: number;
  },
) {
  const { data, loading, error, refetch, fetchMore } = useQuery(
    BacktestResultsQuery,
    {
      variables: {
        taskId: taskId!,
        sortBy: options?.sortBy ?? "totalPnlUsdt",
        sortOrder: options?.sortOrder ?? "desc",
        limit: options?.limit ?? 50,
        offset: options?.offset ?? 0,
      },
      skip: !taskId,
      fetchPolicy: "cache-and-network",
    },
  );

  return {
    results: (data?.backtestResults ?? [])
      .map((item) => getFragmentData(BacktestResultInfoFragment, item) ?? null)
      .filter((item) => item !== null) as BacktestResult[],
    loading,
    error,
    refetch,
    fetchMore,
  };
}

export function useBacktestResultDates(taskId: string | null) {
  const { data, loading, error, refetch } = useQuery(BacktestResultDatesQuery, {
    variables: { taskId: taskId! },
    skip: !taskId,
  });

  return {
    dates: data?.backtestResultDates ?? [],
    loading,
    error,
    refetch,
  };
}

export function useBacktestResultFolders(
  taskId: string | null,
  date: string | null,
) {
  const { data, loading, error, refetch } = useQuery(
    BacktestResultFoldersQuery,
    {
      variables: { taskId: taskId!, date: date! },
      skip: !taskId || !date,
    },
  );

  return {
    folders: data?.backtestResultFolders ?? [],
    loading,
    error,
    refetch,
  };
}

export function useBacktestResultFile(
  taskId: string | null,
  date: string | null,
  configId: string | null,
  fileName: string | null,
) {
  const { data, loading, error, refetch } = useQuery(BacktestResultFileQuery, {
    variables: {
      taskId: taskId!,
      date: date!,
      configId: configId!,
      fileName: fileName!,
    },
    skip: !taskId || !date || !configId || !fileName,
  });

  return {
    file: data?.backtestResultFile,
    loading,
    error,
    refetch,
  };
}

export function useTopBacktestResults(
  taskId: string | null,
  options?: {
    metric?: string;
    limit?: number;
  },
) {
  const { data, loading, error, refetch } = useQuery(TopBacktestResultsQuery, {
    variables: {
      taskId: taskId!,
      metric: options?.metric ?? "totalPnlUsdt",
      limit: options?.limit ?? 10,
    },
    skip: !taskId,
    fetchPolicy: "cache-and-network",
  });

  return {
    results: (data?.topBacktestResults ?? [])
      .map((item) => getFragmentData(BacktestResultInfoFragment, item) ?? null)
      .filter((item) => item !== null) as BacktestResult[],
    loading,
    error,
    refetch,
  };
}

export function useOptunaDashboardStatus() {
  const { data, loading, error, refetch } = useQuery(
    OptunaDashboardStatusQuery,
    {
      fetchPolicy: "cache-and-network",
    },
  );

  return {
    status: data?.optunaDashboardStatus,
    loading,
    error,
    refetch,
  };
}

export function useOptunaStudyDates(taskId: string | null) {
  const { data, loading, error, refetch } = useQuery(OptunaStudyDatesQuery, {
    variables: { taskId: taskId! },
    skip: !taskId,
  });

  return {
    dates: data?.optunaStudyDates ?? [],
    loading,
    error,
    refetch,
  };
}

export function useBestBacktestResults(
  taskId: string | null,
  bestConfigIds: string[] | null,
) {
  const { data, loading, error, refetch } = useQuery(BacktestResultsQuery, {
    variables: {
      taskId: taskId!,
      sortBy: "totalPnlUsdt",
      sortOrder: "desc",
      limit: 200,
      offset: 0,
    },
    skip: !taskId || !bestConfigIds || bestConfigIds.length === 0,
    fetchPolicy: "cache-first",
  });

  const allResults = (data?.backtestResults ?? [])
    .map((item) => getFragmentData(BacktestResultInfoFragment, item) ?? null)
    .filter((item) => item !== null) as BacktestResult[];

  const bestResults = bestConfigIds
    ? bestConfigIds
        .map((configId) => allResults.find((r) => r.configId === configId))
        .filter((r): r is BacktestResult => r !== undefined)
    : [];

  return {
    bestResults,
    loading,
    error,
    refetch,
  };
}

// ============================================
// Mutation Hooks
// ============================================

export function useCreateBacktestTask() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(CreateBacktestTaskMutation, {
    refetchQueries: [BacktestTasksQuery, BacktestTaskStatsQuery],
    onCompleted: () => {
      enqueueSnackbar("Backtest task created successfully", {
        variant: "success",
      });
    },
    onError: (err) => {
      enqueueSnackbar(`Failed to create backtest task: ${err.message}`, {
        variant: "error",
      });
    },
  });

  return {
    createTask: mutate,
    loading,
    error,
  };
}

export function useCancelBacktestTask() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(CancelBacktestTaskMutation, {
    refetchQueries: [BacktestTasksQuery, BacktestTaskStatsQuery],
    onCompleted: () => {
      enqueueSnackbar("Backtest task cancelled", { variant: "info" });
    },
    onError: (err) => {
      enqueueSnackbar(`Failed to cancel task: ${err.message}`, {
        variant: "error",
      });
    },
  });

  return {
    cancelTask: mutate,
    loading,
    error,
  };
}

export function useDeleteBacktestTask() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(DeleteBacktestTaskMutation, {
    onCompleted: () => {
      enqueueSnackbar("Backtest task deleted", { variant: "success" });
    },
    onError: (err) => {
      enqueueSnackbar(`Failed to delete task: ${err.message}`, {
        variant: "error",
      });
    },
  });

  return {
    deleteTask: mutate,
    loading,
    error,
  };
}

export function useDeleteBacktestResult() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    DeleteBacktestResultMutation,
    {
      onCompleted: () => {
        enqueueSnackbar("Result deleted", { variant: "success" });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to delete result: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    deleteResult: mutate,
    loading,
    error,
  };
}

export function useRetryBacktestTask() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(RetryBacktestTaskMutation, {
    refetchQueries: [BacktestTasksQuery, BacktestTaskStatsQuery],
    onCompleted: () => {
      enqueueSnackbar("Backtest task retry initiated", { variant: "info" });
    },
    onError: (err) => {
      enqueueSnackbar(`Failed to retry task: ${err.message}`, {
        variant: "error",
      });
    },
  });

  return {
    retryTask: mutate,
    loading,
    error,
  };
}

export function useStartOptunaDashboard() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    StartOptunaDashboardMutation,
    {
      refetchQueries: [OptunaDashboardStatusQuery],
      onCompleted: (data) => {
        if (data.startOptunaDashboard?.url) {
          enqueueSnackbar(
            `Optuna dashboard started at ${data.startOptunaDashboard.url}`,
            { variant: "success" },
          );
        }
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to start Optuna dashboard: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    startDashboard: mutate,
    loading,
    error,
  };
}

export function useStopOptunaDashboard() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    StopOptunaDashboardMutation,
    {
      refetchQueries: [OptunaDashboardStatusQuery],
      onCompleted: () => {
        enqueueSnackbar("Optuna dashboard stopped", { variant: "info" });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to stop Optuna dashboard: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    stopDashboard: mutate,
    loading,
    error,
  };
}

// ============================================
// Subscription Hooks
// ============================================

export function useSubscribeBacktestTask() {
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useSubscription(
    BacktestTaskUpdatedSubscription,
  );

  useEffect(() => {
    if (data?.backtestTaskUpdated && !error) {
      const taskInfo = getFragmentData(
        BacktestTaskInfoFragment,
        data.backtestTaskUpdated,
      );

      if (taskInfo) {
        // Update the cache with new task data
        client.cache.writeFragment({
          id: client.cache.identify({
            __typename: "BacktestTask",
            id: taskInfo.id,
          }),
          fragment: BacktestTaskInfoFragment,
          fragmentName: "BacktestTaskInfo",
          data: {
            __typename: "BacktestTask",
            ...taskInfo,
          },
        });

        // Show notification for status changes
        if (taskInfo.status === BacktestTaskStatus.Done) {
          enqueueSnackbar(`Backtest "${taskInfo.name}" completed`, {
            variant: "success",
          });
        } else if (taskInfo.status === BacktestTaskStatus.Failed) {
          enqueueSnackbar(`Backtest "${taskInfo.name}" failed`, {
            variant: "error",
          });
        }
      }
    }
  }, [client.cache, data, error, enqueueSnackbar]);

  const taskUpdate = data?.backtestTaskUpdated
    ? getFragmentData(BacktestTaskInfoFragment, data.backtestTaskUpdated)
    : null;

  return {
    taskUpdate,
    loading,
    error,
  };
}

export function useSubscribeBacktestResults() {
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useSubscription(
    BacktestResultCreatedSubscription,
  );

  useEffect(() => {
    if (data?.backtestResultCreated && !error) {
      const resultInfo = getFragmentData(
        BacktestResultInfoFragment,
        data.backtestResultCreated,
      );

      if (resultInfo) {
        const pnlText =
          resultInfo.totalPnlUsdt >= 0
            ? `+$${resultInfo.totalPnlUsdt.toFixed(2)}`
            : `-$${Math.abs(resultInfo.totalPnlUsdt).toFixed(2)}`;

        enqueueSnackbar(
          `New result: ${pnlText} (${resultInfo.winRate.toFixed(1)}% win rate)`,
          {
            variant: resultInfo.totalPnlUsdt >= 0 ? "success" : "warning",
          },
        );
      }
    }
  }, [data, error, enqueueSnackbar]);

  const newResult = data?.backtestResultCreated
    ? getFragmentData(BacktestResultInfoFragment, data.backtestResultCreated)
    : null;

  return {
    newResult,
    loading,
    error,
  };
}
