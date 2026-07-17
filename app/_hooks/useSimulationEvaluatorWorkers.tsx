"use client";

import { useMutation, useQuery } from "@apollo/client/react";

import { graphql } from "@/gql/index";

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
      lastHeartbeatAt
      lastTaskAt
      lastError
      platformCaches {
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

const refetchWorkers = [SIMULATION_EVALUATOR_WORKERS_DOCUMENT];

export function useSimulationEvaluatorWorkers() {
  return useQuery(SIMULATION_EVALUATOR_WORKERS_DOCUMENT, {
    pollInterval: 15_000,
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

export function usePrebuildSimulationEvaluatorWorker() {
  return useMutation(PREBUILD_SIMULATION_EVALUATOR_WORKER_DOCUMENT, {
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
