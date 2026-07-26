"use client";

import { useMutation, useQuery } from "@apollo/client/react";

import { graphql } from "@/gql/index";

export const BACKEND_RELEASE_INFO_DOCUMENT = graphql(`
  query GetBackendReleaseInfo {
    backendReleaseInfo {
      version
      gitSha
      builtAt
    }
  }
`);

export const SIMULATION_EVALUATOR_WORKERS_DOCUMENT = graphql(`
  query GetSimulationEvaluatorWorkers {
    simulationEvaluatorWorkers {
      id
      displayName
      authorizationStatus
      runtimeStatus
      desiredState
      desiredCapacity
      activeCapacity
      version
      versionReportedAt
      claimedEvaluationTasks
      evaluationClaimLimit
      lastHeartbeatAt
      lastTaskAt
      lastError
      lastDiagnosticAt
      lastDiagnostic {
        pid
        uptimeSeconds
        childCapacity
        childCount
        idleChildCount
        runningTaskCount
        lastPollAt
        lastPollError
        recentLogs {
          at
          level
          message
        }
      }
      platformCaches {
        id
        platform
        status
        coveredStartAt
        coveredEndAt
        lastError
      }
      prebuildProgress {
        taskId
        message
        percent
        records
        totalRecords
        bytes
      }
    }
  }
`);

export const SIMULATION_EVALUATOR_PIPELINE_DOCUMENT = graphql(`
  query GetSimulationEvaluatorPipeline {
    simulationEvaluatorPipeline {
      fleetCapacity
      queueLowWatermark
      queueHighWatermark
      workerClaimLimit
      queuedEvaluationTasks
      readyEvaluationTasks
      claimedEvaluationTasks
      awaitingFinalizationPlans
      finalizingPlans
      awaitingEventLogPlans
      readyToFinalizeSimulations
      finalizingSimulations
      failedExecutionPlans
      outstandingExecutionPlans
      finalizerConcurrency
      maxAwaitingFinalizationPlans
      maxOutstandingDynamicPlans
      backpressureActive
    }
  }
`);

const APPROVE_SIMULATION_EVALUATOR_WORKER_DOCUMENT = graphql(`
  mutation approveSimulationEvaluatorWorker($workerId: String!) {
    approveSimulationEvaluatorWorker(workerId: $workerId) {
      id
    }
  }
`);

const REJECT_SIMULATION_EVALUATOR_WORKER_DOCUMENT = graphql(`
  mutation rejectSimulationEvaluatorWorker($workerId: String!) {
    rejectSimulationEvaluatorWorker(workerId: $workerId) {
      id
    }
  }
`);

const REMOVE_REJECTED_SIMULATION_EVALUATOR_WORKER_DOCUMENT = graphql(`
  mutation removeRejectedSimulationEvaluatorWorker($workerId: String!) {
    removeRejectedSimulationEvaluatorWorker(workerId: $workerId)
  }
`);

const REMOVE_OFFLINE_SIMULATION_EVALUATOR_WORKER_DOCUMENT = graphql(`
  mutation removeOfflineSimulationEvaluatorWorker($workerId: String!) {
    removeOfflineSimulationEvaluatorWorker(workerId: $workerId)
  }
`);

const PREBUILD_SIMULATION_EVALUATOR_WORKER_DOCUMENT = graphql(`
  mutation prebuildSimulationEvaluatorWorker(
    $workerId: String!
    $platform: String!
    $startedAt: String!
    $endedAt: String!
  ) {
    prebuildSimulationEvaluatorWorker(
      workerId: $workerId
      platform: $platform
      startedAt: $startedAt
      endedAt: $endedAt
    )
  }
`);

export const SIMULATION_EVALUATOR_WORKER_TASKS_DOCUMENT = graphql(`
  query GetSimulationEvaluatorWorkerTasks($workerId: String) {
    simulationEvaluatorWorkerTasks(workerId: $workerId) {
      id
      kind
      status
      syncStatus
      platform
      targetWorkerId
      workerId
      rangeStartedAt
      rangeEndedAt
      claimedAt
      leaseExpiresAt
      completedAt
      progressPercent
      progressMessage
      progressRecords
      progressTotalRecords
      progressBytes
      lastError
      timingJson
      canCancel
      createdAt
    }
  }
`);

const SIMULATION_EVALUATOR_WORKER_TASK_CONNECTION_DOCUMENT = graphql(`
  query GetSimulationEvaluatorWorkerTaskConnection(
    $workerId: String!
    $archive: Boolean!
    $cursor: String
    $limit: Int!
  ) {
    simulationEvaluatorWorkerTaskConnection(
      workerId: $workerId
      archive: $archive
      cursor: $cursor
      limit: $limit
    ) {
      nextCursor
      items {
        id
        kind
        status
        syncStatus
        platform
        targetWorkerId
        workerId
        rangeStartedAt
        rangeEndedAt
        claimedAt
        leaseExpiresAt
        completedAt
        progressPercent
        progressMessage
        progressRecords
        progressTotalRecords
        progressBytes
        lastError
        timingJson
        canCancel
        createdAt
      }
    }
  }
`);

const RETRY_SIMULATION_EVALUATOR_WORKER_CACHE_DOCUMENT = graphql(`
  mutation retrySimulationEvaluatorWorkerCache($cacheId: Int!) {
    retrySimulationEvaluatorWorkerCache(cacheId: $cacheId)
  }
`);

const REMOVE_SIMULATION_EVALUATOR_WORKER_CACHE_DOCUMENT = graphql(`
  mutation removeSimulationEvaluatorWorkerCache($cacheId: Int!) {
    removeSimulationEvaluatorWorkerCache(cacheId: $cacheId)
  }
`);

const PAUSE_SIMULATION_EVALUATOR_WORKER_DOCUMENT = graphql(`
  mutation pauseSimulationEvaluatorWorker($workerId: String!) {
    pauseSimulationEvaluatorWorker(workerId: $workerId) {
      id
    }
  }
`);

const RESUME_SIMULATION_EVALUATOR_WORKER_DOCUMENT = graphql(`
  mutation resumeSimulationEvaluatorWorker($workerId: String!) {
    resumeSimulationEvaluatorWorker(workerId: $workerId) {
      id
    }
  }
`);

const SET_SIMULATION_EVALUATOR_WORKER_CAPACITY_DOCUMENT = graphql(`
  mutation setSimulationEvaluatorWorkerCapacity(
    $workerId: String!
    $capacity: Float!
  ) {
    setSimulationEvaluatorWorkerCapacity(
      workerId: $workerId
      capacity: $capacity
    )
  }
`);

const UPGRADE_SIMULATION_EVALUATOR_WORKER_DOCUMENT = graphql(`
  mutation upgradeSimulationEvaluatorWorker(
    $workerId: String!
    $version: String!
  ) {
    upgradeSimulationEvaluatorWorker(workerId: $workerId, version: $version)
  }
`);

const CANCEL_UNASSIGNED_SIMULATION_EVALUATOR_WORKER_TASK_DOCUMENT = graphql(`
  mutation cancelUnassignedSimulationEvaluatorWorkerTask($taskId: String!) {
    cancelUnassignedSimulationEvaluatorWorkerTask(taskId: $taskId)
  }
`);

const refetchWorkers = [
  SIMULATION_EVALUATOR_WORKERS_DOCUMENT,
  SIMULATION_EVALUATOR_WORKER_TASKS_DOCUMENT,
  SIMULATION_EVALUATOR_PIPELINE_DOCUMENT,
];

const SIMULATION_WORKFLOW_CONFIG_DOCUMENT = graphql(`
  query GetSimulationWorkflowConfig {
    simulationWorkflowConfig {
      maxSimulationsPerResearch
      maxOutstandingDynamicPlans
      finalizerBatchSize
      finalizerConcurrency
      finalizerBotCacheConcurrency
      finalizerRetryDelayMs
      maxAwaitingFinalizationPlans
      finalizerLeaseMs
      evaluatorTaskLeaseMs
      queuedTaskBatchSize
      readyTaskScanLimit
      eventLogAddressBatchSize
      eventLogRecordBatchSize
      prebuildChunkSourceRecordLimit
      leaderScoringWindowDays
      candidateRecentActivityDays
      botTraderMinAvgDurationMs
    }
  }
`);

const UPDATE_SIMULATION_WORKFLOW_CONFIG_DOCUMENT = graphql(`
  mutation UpdateSimulationWorkflowConfig(
    $input: UpdateSimulationWorkflowConfigInput!
  ) {
    updateSimulationWorkflowConfig(input: $input) {
      maxOutstandingDynamicPlans
    }
  }
`);

const RESTORE_SIMULATION_WORKFLOW_DEFAULTS_DOCUMENT = graphql(`
  mutation RestoreSimulationWorkflowDefaults {
    restoreSimulationWorkflowDefaults {
      maxOutstandingDynamicPlans
    }
  }
`);

export function useSimulationWorkflowConfig() {
  return useQuery(SIMULATION_WORKFLOW_CONFIG_DOCUMENT, {
    fetchPolicy: "cache-and-network",
  });
}

export function useUpdateSimulationWorkflowConfig() {
  return useMutation(UPDATE_SIMULATION_WORKFLOW_CONFIG_DOCUMENT, {
    refetchQueries: [SIMULATION_WORKFLOW_CONFIG_DOCUMENT],
  });
}

export function useRestoreSimulationWorkflowDefaults() {
  return useMutation(RESTORE_SIMULATION_WORKFLOW_DEFAULTS_DOCUMENT, {
    refetchQueries: [SIMULATION_WORKFLOW_CONFIG_DOCUMENT],
  });
}

export function useSimulationEvaluatorWorkers() {
  return useQuery(SIMULATION_EVALUATOR_WORKERS_DOCUMENT, {
    pollInterval: 10_000,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: false,
  });
}

export function useSimulationEvaluatorPipeline() {
  return useQuery(SIMULATION_EVALUATOR_PIPELINE_DOCUMENT, {
    pollInterval: 10_000,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: false,
  });
}

export function useApproveSimulationEvaluatorWorker() {
  return useMutation(APPROVE_SIMULATION_EVALUATOR_WORKER_DOCUMENT, {
    refetchQueries: refetchWorkers,
  });
}

export function useRejectSimulationEvaluatorWorker() {
  return useMutation(REJECT_SIMULATION_EVALUATOR_WORKER_DOCUMENT, {
    refetchQueries: refetchWorkers,
  });
}

export function useRemoveRejectedSimulationEvaluatorWorker() {
  return useMutation(REMOVE_REJECTED_SIMULATION_EVALUATOR_WORKER_DOCUMENT, {
    refetchQueries: refetchWorkers,
  });
}

export function useRemoveOfflineSimulationEvaluatorWorker() {
  return useMutation(REMOVE_OFFLINE_SIMULATION_EVALUATOR_WORKER_DOCUMENT, {
    refetchQueries: refetchWorkers,
  });
}

export function usePrebuildSimulationEvaluatorWorker() {
  return useMutation(PREBUILD_SIMULATION_EVALUATOR_WORKER_DOCUMENT, {
    refetchQueries: refetchWorkers,
  });
}

export function useSimulationEvaluatorWorkerTasks(workerId?: string) {
  return useQuery(SIMULATION_EVALUATOR_WORKER_TASKS_DOCUMENT, {
    variables: { workerId },
    pollInterval: 10_000,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: false,
  });
}

export function useSimulationEvaluatorWorkerTaskConnection(
  workerId: string,
  archive: boolean,
) {
  const query = useQuery(SIMULATION_EVALUATOR_WORKER_TASK_CONNECTION_DOCUMENT, {
    variables: { workerId, archive, cursor: null, limit: 30 },
    pollInterval: archive ? 0 : 10_000,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: false,
  });
  const connection = query.data?.simulationEvaluatorWorkerTaskConnection;
  const loadMore = async () => {
    if (!connection?.nextCursor || query.loading) return;
    await query.fetchMore({
      variables: { cursor: connection.nextCursor },
      updateQuery: (previous, { fetchMoreResult }) => ({
        simulationEvaluatorWorkerTaskConnection: {
          ...fetchMoreResult.simulationEvaluatorWorkerTaskConnection,
          items: [
            ...previous.simulationEvaluatorWorkerTaskConnection.items,
            ...fetchMoreResult.simulationEvaluatorWorkerTaskConnection.items,
          ],
        },
      }),
    });
  };
  return {
    ...query,
    tasks: connection?.items ?? [],
    hasMore: Boolean(connection?.nextCursor),
    loadMore,
  };
}

export function useRetrySimulationEvaluatorWorkerCache() {
  return useMutation(RETRY_SIMULATION_EVALUATOR_WORKER_CACHE_DOCUMENT, {
    refetchQueries: refetchWorkers,
  });
}

export function useRemoveSimulationEvaluatorWorkerCache() {
  return useMutation(REMOVE_SIMULATION_EVALUATOR_WORKER_CACHE_DOCUMENT, {
    refetchQueries: refetchWorkers,
  });
}

export function usePauseSimulationEvaluatorWorker() {
  return useMutation(PAUSE_SIMULATION_EVALUATOR_WORKER_DOCUMENT, {
    refetchQueries: refetchWorkers,
  });
}

export function useResumeSimulationEvaluatorWorker() {
  return useMutation(RESUME_SIMULATION_EVALUATOR_WORKER_DOCUMENT, {
    refetchQueries: refetchWorkers,
  });
}

export function useSetSimulationEvaluatorWorkerCapacity() {
  return useMutation(SET_SIMULATION_EVALUATOR_WORKER_CAPACITY_DOCUMENT, {
    refetchQueries: refetchWorkers,
  });
}

export function useBackendReleaseInfo() {
  return useQuery(BACKEND_RELEASE_INFO_DOCUMENT, {
    fetchPolicy: "cache-and-network",
  });
}

export function useUpgradeSimulationEvaluatorWorker() {
  return useMutation(UPGRADE_SIMULATION_EVALUATOR_WORKER_DOCUMENT, {
    refetchQueries: refetchWorkers,
  });
}

export function useCancelUnassignedSimulationEvaluatorWorkerTask() {
  return useMutation(
    CANCEL_UNASSIGNED_SIMULATION_EVALUATOR_WORKER_TASK_DOCUMENT,
    { refetchQueries: refetchWorkers },
  );
}
