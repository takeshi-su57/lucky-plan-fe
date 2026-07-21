"use client";

import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client/react";

import { getFragmentData, graphql } from "@/gql/index";
import { useCallback, useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { PERP_TRADE_HISTORY_INFO_FRAGMENT_DOCUMENT } from "./useHistory";
import {
  Simulation,
  SimulationBotDetails,
  SimulationPlan,
  SimulationPlanDetails,
  SimulationResearch,
  SimulationResearchDetails,
} from "@/graphql/gql/graphql";

export const SIMULATION_BOT_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment SimulationBotInfo on SimulationBot {
    avgCollateral
    avgDuration
    avgLeverage
    avgNegativePnl
    avgPnl
    avgPnlPercentageByCollateral
    avgPnlPercentageBySize
    avgPositivePnl
    avgSize
    id
    leaderAddress
    leaderPlatform
    minCollateral
    maxCollateral
    maxDuration
    mode
    openedPositions
    ratio
    score
    minLeverage
    maxLeverage
    simulationPlanId
    startedAt
    stoppedAt
    totalPnl
    totalPositions
  }
`);

export const SIMULATION_PLAN_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment SimulationPlanInfo on SimulationPlan {
    cursor
    description
    endAt
    id
    openedPositions
    startAt
    title
    totalFollowerPnl
    totalLeaderPnl
    totalPositions
    simulationId
    simulationBots {
      ...SimulationBotInfo
    }
  }
`);

export const SIMULATION_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment SimulationInfo on Simulation {
    completedPlans
    createdAt
    cursor
    days
    description
    direction
    endAt
    error
    gapDays
    id
    maxDrawdownUsd
    collateral {
      max
      min
    }
    size {
      max
      min
    }
    leverage {
      max
      min
    }
    platform
    profitFactor
    progressMessage
    progressPercent
    progressPhase
    r2 {
      max
      min
    }
    researchId
    score {
      max
      min
    }
    scoreFormular
    selectedLeaderCount
    sizingFormular
    slope {
      max
      min
    }
    standardCollateralUsd
    startAt
    status
    title
    totalCostUsd
    totalFollowerPnl
    totalLeaderPnl
    totalNetPnlUsd
    totalSimulationPlans
    tradeCount
    trade {
      max
      min
    }
    updatedAt
    winRate
  }
`);

export const SIMULATION_RESEARCH_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment SimulationResearchInfo on SimulationResearch {
    completedSimulations
    createdAt
    days
    description
    direction
    executionFlow
    endAt
    gapDays
    id
    collateral {
      ranges {
        max
        min
      }
    }
    size {
      ranges {
        max
        min
      }
    }
    leverage {
      ranges {
        max
        min
      }
    }
    score {
      ranges {
        max
        min
      }
    }
    scoreFormular
    sizingFormular
    status
    cursor
    progressPhase
    progressMessage
    progressPercent
    totalRanges
    completedRanges
    totalPlans
    completedPlans
    outstandingPlans
    queuedPlans
    runningPlans
    finalizingPlans
    startedAt
    finishedAt
    lastError
    r2 {
      ranges {
        max
        min
      }
    }
    slope {
      ranges {
        max
        min
      }
    }
    platform
    startAt
    title
    totalSimulations
    trade {
      ranges {
        max
        min
      }
    }
    updatedAt
  }
`);

export const SIMULATION_RESEARCH_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment SimulationResearchDetailsInfo on SimulationResearchDetails {
    completedSimulations
    createdAt
    days
    description
    direction
    executionFlow
    endAt
    gapDays
    id
    collateral {
      ranges {
        max
        min
      }
    }
    size {
      ranges {
        max
        min
      }
    }
    leverage {
      ranges {
        max
        min
      }
    }
    score {
      ranges {
        max
        min
      }
    }
    scoreFormular
    sizingFormular
    status
    cursor
    progressPhase
    progressMessage
    progressPercent
    totalRanges
    completedRanges
    totalPlans
    completedPlans
    outstandingPlans
    queuedPlans
    runningPlans
    finalizingPlans
    startedAt
    finishedAt
    lastError
    r2 {
      ranges {
        max
        min
      }
    }
    slope {
      ranges {
        max
        min
      }
    }
    platform
    startAt
    title
    totalSimulations
    trade {
      ranges {
        max
        min
      }
    }
    updatedAt
    simulations {
      ...SimulationInfo
    }
  }
`);

export const SIMULATION_TRADE_HISTORY_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment SimulationTradeHistoryInfo on SimulationTradeHistory {
    follower {
      ...PerpTradeHistoryInfo
    }
    leader {
      ...PerpTradeHistoryInfo
    }
  }
`);

export const SIMULATION_TRADE_POSITION_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment SimulationTradePositionInfo on SimulationTradePosition {
    histories {
      ...SimulationTradeHistoryInfo
    }
    followerPnl
    leaderPnl
  }
`);

export const SIMULATION_BOT_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment SimulationBotDetailsInfo on SimulationBotDetails {
    avgCollateral
    avgDuration
    avgLeverage
    avgNegativePnl
    avgPnl
    avgPnlPercentageByCollateral
    avgPnlPercentageBySize
    avgPositivePnl
    avgSize
    id
    leaderAddress
    leaderPlatform
    minCollateral
    maxCollateral
    maxDuration
    mode
    openedPositions
    ratio
    score
    simulationPlanId
    startedAt
    stoppedAt
    totalPnl
    totalPositions
    minLeverage
    maxLeverage
    cacheState {
      completed
      lastError
      lastFetchedAt
      rebuildRequested
      rebuilding
    }
    positions {
      ...SimulationTradePositionInfo
    }
  }
`);

export const SIMULATION_PLAN_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment SimulationPlanDetailsInfo on SimulationPlanDetails {
    cursor
    description
    endAt
    id
    openedPositions
    simulationId
    simulationBots {
      ...SimulationBotDetailsInfo
    }
    startAt
    title
    totalFollowerPnl
    totalLeaderPnl
    totalPositions
  }
`);

export const GET_SIMULATION_RESEARCHES_DOCUMENT = graphql(`
  query simulationResearches($after: Int, $first: Int!) {
    simulationResearches(after: $after, first: $first) {
      edges {
        cursor
        node {
          ...SimulationResearchInfo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const GET_SIMULATION_DOCUMENT = graphql(`
  query simulation($id: Int!) {
    simulation(id: $id) {
      ...SimulationInfo
    }
  }
`);

export const GET_SIMULATION_RESEARCH_DOCUMENT = graphql(`
  query simulationResearch($id: Int!) {
    simulationResearch(id: $id) {
      ...SimulationResearchDetailsInfo
    }
  }
`);

export const GET_SIMULATIONS_BY_RESEARCH_DOCUMENT = graphql(`
  query simulationsByResearch($researchId: Int!) {
    simulationsByResearch(researchId: $researchId) {
      ...SimulationInfo
    }
  }
`);

export const GET_SIMULATION_PLANS_BY_SIMULATION_DOCUMENT = graphql(`
  query simulationPlansBySimulation($simulationId: Int!) {
    simulationPlansBySimulation(simulationId: $simulationId) {
      ...SimulationPlanInfo
    }
  }
`);

export const GET_SIMULATION_PLAN_DETAILS_BY_SIMULATION_DOCUMENT = graphql(`
  query simulationPlanDetailsBySimulation($simulationId: Int!) {
    simulationPlanDetailsBySimulation(simulationId: $simulationId) {
      ...SimulationPlanDetailsInfo
    }
  }
`);

export const GET_SIMULATION_PLAN_BY_ID_DOCUMENT = graphql(`
  query getSimulationPlanById($id: Int!) {
    getSimulationPlanById(id: $id) {
      ...SimulationPlanDetailsInfo
    }
  }
`);

export const CREATE_SIMULATION_RESEARCH_DOCUMENT = graphql(`
  mutation createSimulationResearch($input: CreateSimulationResearchInput!) {
    createSimulationResearch(input: $input) {
      ...SimulationResearchInfo
    }
  }
`);

export const UPDATE_SIMULATION_RESEARCH_DOCUMENT = graphql(`
  mutation updateSimulationResearch($input: UpdateSimulationResearchInput!) {
    updateSimulationResearch(input: $input) {
      ...SimulationResearchInfo
    }
  }
`);

export const CANCEL_SIMULATION_DOCUMENT = graphql(`
  mutation cancelSimulation($id: Int!) {
    cancelSimulation(id: $id) {
      ...SimulationInfo
    }
  }
`);

export const PLAY_AUTO_RESEARCH_DOCUMENT = graphql(`
  mutation playAutoResearch($id: Int!) {
    playAutoResearch(id: $id) {
      ...SimulationResearchInfo
    }
  }
`);

export const CLONE_SIMULATION_RESEARCH_DOCUMENT = graphql(`
  mutation cloneSimulationResearch($id: Int!) {
    cloneSimulationResearch(id: $id) {
      ...SimulationResearchInfo
    }
  }
`);

export const RESUME_RESEARCH_DOCUMENT = graphql(`
  mutation resumeResearch($id: Int!) {
    resumeResearch(id: $id) {
      ...SimulationResearchInfo
    }
  }
`);

export const RESTART_RESEARCH_DOCUMENT = graphql(`
  mutation restartResearch($id: Int!) {
    restartResearch(id: $id) {
      ...SimulationResearchInfo
    }
  }
`);

export const PAUSE_RESEARCH_DOCUMENT = graphql(`
  mutation pauseResearch($id: Int!) {
    pauseResearch(id: $id) {
      ...SimulationResearchInfo
    }
  }
`);

export const CANCEL_RESEARCH_DOCUMENT = graphql(`
  mutation cancelResearch($id: Int!) {
    cancelResearch(id: $id) {
      ...SimulationResearchInfo
    }
  }
`);

export const DELETE_SIMULATION_DOCUMENT = graphql(`
  mutation deleteSimulation($id: Int!) {
    deleteSimulation(id: $id)
  }
`);

export const DELETE_SIMULATION_RESEARCH_DOCUMENT = graphql(`
  mutation deleteSimulationResearch($id: Int!) {
    deleteSimulationResearch(id: $id)
  }
`);

export const SIMULATION_RESEARCH_UPDATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription simulationResearchUpdated {
    simulationResearchUpdated {
      ...SimulationResearchInfo
    }
  }
`);

export const SIMULATION_UPDATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription simulationUpdated {
    simulationUpdated {
      ...SimulationInfo
    }
  }
`);

export const SIMULATION_PLAN_UPDATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription simulationPlanUpdated {
    simulationPlanUpdated {
      ...SimulationPlanInfo
    }
  }
`);

function unwrapSimulationPlan(plan: {
  __typename?: "SimulationPlan";
  " $fragmentRefs"?: any;
}): SimulationPlan {
  const unwrapped = getFragmentData(
    SIMULATION_PLAN_INFO_FRAGMENT_DOCUMENT,
    plan,
  );

  return {
    ...unwrapped,
    simulationBots: unwrapped.simulationBots.map((simulationBot) =>
      getFragmentData(SIMULATION_BOT_INFO_FRAGMENT_DOCUMENT, simulationBot),
    ),
  } as SimulationPlan;
}

function updateConnectionNodeById(
  oldData: any,
  connectionKey: string,
  id: number,
  node: any,
) {
  const connection = oldData?.[connectionKey];

  if (!connection?.edges) {
    return oldData;
  }

  return {
    ...oldData,
    [connectionKey]: {
      ...connection,
      edges: connection.edges.map((edge: any) =>
        edge.cursor === id ? { ...edge, node } : edge,
      ),
    },
  };
}

export function useSubscribeSimulation() {
  const client = useApolloClient();
  const { data: updatedResearchData } = useSubscription(
    SIMULATION_RESEARCH_UPDATED_SUBSCRIPTION_DOCUMENT,
  );
  const { data: updatedSimulationData } = useSubscription(
    SIMULATION_UPDATED_SUBSCRIPTION_DOCUMENT,
  );
  const { data: updatedSimulationPlanData } = useSubscription(
    SIMULATION_PLAN_UPDATED_SUBSCRIPTION_DOCUMENT,
  );

  useEffect(() => {
    if (!updatedResearchData?.simulationResearchUpdated) {
      return;
    }

    const simulationResearch = getFragmentData(
      SIMULATION_RESEARCH_INFO_FRAGMENT_DOCUMENT,
      updatedResearchData.simulationResearchUpdated,
    );

    client.cache.writeFragment({
      id: client.cache.identify({
        __typename: "SimulationResearch",
        id: simulationResearch.id,
      }),
      fragment: SIMULATION_RESEARCH_INFO_FRAGMENT_DOCUMENT,
      fragmentName: "SimulationResearchInfo",
      data: {
        __typename: "SimulationResearch",
        ...simulationResearch,
      },
    });

    client.cache.modify({
      id: client.cache.identify({
        __typename: "SimulationResearchDetails",
        id: simulationResearch.id,
      }),
      fields: {
        completedRanges: () => simulationResearch.completedRanges,
        completedPlans: () => simulationResearch.completedPlans,
        outstandingPlans: () => simulationResearch.outstandingPlans,
        queuedPlans: () => simulationResearch.queuedPlans,
        runningPlans: () => simulationResearch.runningPlans,
        finalizingPlans: () => simulationResearch.finalizingPlans,
        completedSimulations: () => simulationResearch.completedSimulations,
        cursor: () => simulationResearch.cursor,
        finishedAt: () => simulationResearch.finishedAt,
        lastError: () => simulationResearch.lastError,
        progressMessage: () => simulationResearch.progressMessage,
        progressPercent: () => simulationResearch.progressPercent,
        progressPhase: () => simulationResearch.progressPhase,
        startedAt: () => simulationResearch.startedAt,
        status: () => simulationResearch.status,
        totalRanges: () => simulationResearch.totalRanges,
        totalPlans: () => simulationResearch.totalPlans,
        totalSimulations: () => simulationResearch.totalSimulations,
        updatedAt: () => simulationResearch.updatedAt,
      },
    });

    client.cache.updateQuery(
      {
        query: GET_SIMULATION_RESEARCHES_DOCUMENT,
        variables: { first: 20 },
      },
      (oldData: any) =>
        updateConnectionNodeById(
          oldData,
          "simulationResearches",
          simulationResearch.id,
          {
            __typename: "SimulationResearch",
            ...simulationResearch,
          },
        ),
    );

    client.cache.updateQuery(
      {
        query: GET_SIMULATION_RESEARCH_DOCUMENT,
        variables: { id: simulationResearch.id },
      },
      (oldData: any) => {
        if (!oldData?.simulationResearch) {
          return oldData;
        }

        return {
          ...oldData,
          simulationResearch: {
            ...oldData.simulationResearch,
            ...simulationResearch,
            __typename: "SimulationResearchDetails" as const,
          },
        };
      },
    );
  }, [client.cache, updatedResearchData]);

  useEffect(() => {
    if (!updatedSimulationData?.simulationUpdated) {
      return;
    }

    const simulation = getFragmentData(
      SIMULATION_INFO_FRAGMENT_DOCUMENT,
      updatedSimulationData.simulationUpdated,
    );

    client.cache.writeFragment({
      id: client.cache.identify({
        __typename: "Simulation",
        id: simulation.id,
      }),
      fragment: SIMULATION_INFO_FRAGMENT_DOCUMENT,
      fragmentName: "SimulationInfo",
      data: {
        __typename: "Simulation",
        ...simulation,
      },
    });

    client.cache.updateQuery(
      {
        query: GET_SIMULATION_DOCUMENT,
        variables: { id: simulation.id },
      },
      (oldData: any) => {
        if (!oldData?.simulation) {
          return oldData;
        }

        return {
          ...oldData,
          simulation: {
            __typename: "Simulation" as const,
            ...simulation,
          },
        };
      },
    );

    if (simulation.researchId) {
      client.cache.updateQuery(
        {
          query: GET_SIMULATIONS_BY_RESEARCH_DOCUMENT,
          variables: { researchId: simulation.researchId },
        },
        (oldData: any) => {
          if (!oldData?.simulationsByResearch) {
            return oldData;
          }

          return {
            ...oldData,
            simulationsByResearch: oldData.simulationsByResearch.map(
              (item: any) =>
                item.id === simulation.id
                  ? {
                      __typename: "Simulation" as const,
                      ...simulation,
                    }
                  : item,
            ),
          };
        },
      );

      client.cache.updateQuery(
        {
          query: GET_SIMULATION_RESEARCH_DOCUMENT,
          variables: { id: simulation.researchId },
        },
        (oldData: any) => {
          if (!oldData?.simulationResearch?.simulations) {
            return oldData;
          }

          return {
            ...oldData,
            simulationResearch: {
              ...oldData.simulationResearch,
              simulations: oldData.simulationResearch.simulations.map(
                (item: any) =>
                  item.id === simulation.id
                    ? {
                        __typename: "Simulation" as const,
                        ...simulation,
                      }
                    : item,
              ),
            },
          };
        },
      );
    }
  }, [client.cache, updatedSimulationData]);

  useEffect(() => {
    if (!updatedSimulationPlanData?.simulationPlanUpdated) {
      return;
    }

    const simulationPlan = unwrapSimulationPlan(
      updatedSimulationPlanData.simulationPlanUpdated,
    );

    client.cache.writeFragment({
      id: client.cache.identify({
        __typename: "SimulationPlan",
        id: simulationPlan.id,
      }),
      fragment: SIMULATION_PLAN_INFO_FRAGMENT_DOCUMENT,
      fragmentName: "SimulationPlanInfo",
      data: {
        __typename: "SimulationPlan",
        ...simulationPlan,
      },
    });

    if (simulationPlan.simulationId) {
      client.cache.updateQuery(
        {
          query: GET_SIMULATION_PLANS_BY_SIMULATION_DOCUMENT,
          variables: { simulationId: simulationPlan.simulationId },
        },
        (oldData: any) => {
          if (!oldData?.simulationPlansBySimulation) {
            return oldData;
          }

          const exists = oldData.simulationPlansBySimulation.some(
            (item: any) => item.id === simulationPlan.id,
          );
          const updatedPlan = {
            __typename: "SimulationPlan" as const,
            ...simulationPlan,
          };

          return {
            ...oldData,
            simulationPlansBySimulation: exists
              ? oldData.simulationPlansBySimulation.map((item: any) =>
                  item.id === simulationPlan.id ? updatedPlan : item,
                )
              : [...oldData.simulationPlansBySimulation, updatedPlan],
          };
        },
      );

      client.cache.updateQuery(
        {
          query: GET_SIMULATION_PLAN_DETAILS_BY_SIMULATION_DOCUMENT,
          variables: { simulationId: simulationPlan.simulationId },
        },
        (oldData: any) => {
          if (!oldData?.simulationPlanDetailsBySimulation) {
            return oldData;
          }

          return {
            ...oldData,
            simulationPlanDetailsBySimulation:
              oldData.simulationPlanDetailsBySimulation.map((item: any) =>
                item.id === simulationPlan.id
                  ? {
                      ...item,
                      cursor: simulationPlan.cursor,
                      description: simulationPlan.description,
                      endAt: simulationPlan.endAt,
                      openedPositions: simulationPlan.openedPositions,
                      startAt: simulationPlan.startAt,
                      title: simulationPlan.title,
                      totalFollowerPnl: simulationPlan.totalFollowerPnl,
                      totalLeaderPnl: simulationPlan.totalLeaderPnl,
                      totalPositions: simulationPlan.totalPositions,
                    }
                  : item,
              ),
          };
        },
      );
    }

    client.cache.updateQuery(
      {
        query: GET_SIMULATION_PLAN_BY_ID_DOCUMENT,
        variables: { id: simulationPlan.id },
      },
      (oldData: any) => {
        if (!oldData?.getSimulationPlanById) {
          return oldData;
        }

        return {
          ...oldData,
          getSimulationPlanById: {
            ...oldData.getSimulationPlanById,
            cursor: simulationPlan.cursor,
            description: simulationPlan.description,
            endAt: simulationPlan.endAt,
            openedPositions: simulationPlan.openedPositions,
            startAt: simulationPlan.startAt,
            title: simulationPlan.title,
            totalFollowerPnl: simulationPlan.totalFollowerPnl,
            totalLeaderPnl: simulationPlan.totalLeaderPnl,
            totalPositions: simulationPlan.totalPositions,
          },
        };
      },
    );
  }, [client.cache, updatedSimulationPlanData]);
}

export function useGetSimulationResearches() {
  const [query, { data, fetchMore, loading, error }] = useLazyQuery(
    GET_SIMULATION_RESEARCHES_DOCUMENT,
  );

  useEffect(() => {
    query({
      variables: {
        first: 20,
      },
    });
  }, [query]);

  const simulationResearches = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.simulationResearches.edges.map((edge) =>
      getFragmentData(SIMULATION_RESEARCH_INFO_FRAGMENT_DOCUMENT, edge.node),
    ) as SimulationResearch[];
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error) {
      fetchMore({
        variables: {
          first: 20,
          after: data.simulationResearches.pageInfo.endCursor,
        },
      });
    }
  }, [data, error, fetchMore]);

  return {
    simulationResearches,
    loading,
    fetchMore: handleFetchMore,
    hasMore: data?.simulationResearches.pageInfo.hasNextPage,
  };
}

export function useGetSimulation(id: number) {
  const { data, loading } = useQuery(GET_SIMULATION_DOCUMENT, {
    variables: { id },
  });

  const simulation = useMemo(() => {
    if (!data?.simulation) {
      return null;
    }

    return getFragmentData(
      SIMULATION_INFO_FRAGMENT_DOCUMENT,
      data.simulation,
    ) as Simulation;
  }, [data]);

  return { simulation, loading };
}

export function useGetSimulationResearch(id: number) {
  const { data, loading } = useQuery(GET_SIMULATION_RESEARCH_DOCUMENT, {
    variables: { id },
  });

  const simulationResearch = useMemo(() => {
    if (!data?.simulationResearch) {
      return null;
    }

    return getFragmentData(
      SIMULATION_RESEARCH_DETAILS_INFO_FRAGMENT_DOCUMENT,
      data.simulationResearch,
    ) as SimulationResearchDetails;
  }, [data]);

  return { simulationResearch, loading };
}

export function useGetSimulationsByResearch(researchId: number) {
  const { data, loading } = useQuery(GET_SIMULATIONS_BY_RESEARCH_DOCUMENT, {
    variables: { researchId },
  });

  const simulations = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.simulationsByResearch.map((simulation) =>
      getFragmentData(SIMULATION_INFO_FRAGMENT_DOCUMENT, simulation),
    ) as Simulation[];
  }, [data]);

  return { simulations, loading };
}

export function useGetSimulationPlansBySimulation(simulationId: number) {
  const { data, loading } = useQuery(
    GET_SIMULATION_PLANS_BY_SIMULATION_DOCUMENT,
    {
      variables: { simulationId },
    },
  );

  const simulationPlans = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.simulationPlansBySimulation.map(unwrapSimulationPlan);
  }, [data]);

  return { simulationPlans, loading };
}

function unwrapSimulationPlanDetails(plan: any) {
  const simulationPlanDetails = getFragmentData(
    SIMULATION_PLAN_DETAILS_INFO_FRAGMENT_DOCUMENT,
    plan,
  ) as any;

  const simulationBots = simulationPlanDetails.simulationBots.map(
    (simulationBot: any) => {
      const unwrapped = getFragmentData(
        SIMULATION_BOT_DETAILS_INFO_FRAGMENT_DOCUMENT,
        simulationBot,
      );

      const positions = unwrapped.positions.map((position: any) => {
        const histories = getFragmentData(
          SIMULATION_TRADE_POSITION_INFO_FRAGMENT_DOCUMENT,
          position,
        ).histories.map((item: any) => {
          const tradeHistory = getFragmentData(
            SIMULATION_TRADE_HISTORY_INFO_FRAGMENT_DOCUMENT,
            item,
          );

          return {
            ...tradeHistory,
            leader: getFragmentData(
              PERP_TRADE_HISTORY_INFO_FRAGMENT_DOCUMENT,
              tradeHistory.leader,
            ),
            follower: getFragmentData(
              PERP_TRADE_HISTORY_INFO_FRAGMENT_DOCUMENT,
              tradeHistory.follower,
            ),
          };
        });

        return {
          ...position,
          histories,
        };
      });

      return {
        ...unwrapped,
        positions,
      };
    },
  ) as SimulationBotDetails[];

  return { ...simulationPlanDetails, simulationBots } as SimulationPlanDetails;
}

export function useGetSimulationPlanDetailsBySimulation(simulationId: number) {
  const { data, loading } = useQuery(
    GET_SIMULATION_PLAN_DETAILS_BY_SIMULATION_DOCUMENT,
    {
      variables: { simulationId },
    },
  );

  const simulationPlanDetails = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.simulationPlanDetailsBySimulation.map((plan) =>
      unwrapSimulationPlanDetails(plan),
    );
  }, [data]);

  return { simulationPlanDetails, loading };
}

export function useGetSimulationPlanById(id: number) {
  const { data, loading } = useQuery(GET_SIMULATION_PLAN_BY_ID_DOCUMENT, {
    variables: { id },
  });

  const simulationPlan = useMemo(() => {
    if (!data?.getSimulationPlanById) {
      return null;
    }

    return unwrapSimulationPlanDetails(data.getSimulationPlanById);
  }, [data]);

  return { simulationPlan, loading };
}

export function useCreateSimulationResearch() {
  const [createSimulationResearch, { data: newData, error, loading }] =
    useMutation(CREATE_SIMULATION_RESEARCH_DOCUMENT);
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at creating new simulation research!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at creating new simulation research!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  const simulationResearch = useMemo(() => {
    if (!newData?.createSimulationResearch) {
      return null;
    }

    return getFragmentData(
      SIMULATION_RESEARCH_INFO_FRAGMENT_DOCUMENT,
      newData.createSimulationResearch,
    ) as SimulationResearch;
  }, [newData]);

  return { createSimulationResearch, simulationResearch, loading };
}

export function useCloneSimulationResearch() {
  const [cloneSimulationResearch, { loading }] = useMutation(
    CLONE_SIMULATION_RESEARCH_DOCUMENT,
  );

  return { cloneSimulationResearch, loading };
}

export function useUpdateSimulationResearch() {
  const [updateSimulationResearch, { data: newData, error, loading }] =
    useMutation(UPDATE_SIMULATION_RESEARCH_DOCUMENT);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Simulation research details updated!", {
        variant: "success",
      });
    }

    if (error) {
      enqueueSnackbar("Error updating simulation research details!", {
        variant: "error",
      });
    }
  }, [newData, error, enqueueSnackbar]);

  return { updateSimulationResearch, loading };
}

export function useCancelSimulation() {
  const [cancelSimulation, { data: newData, error, loading }] = useMutation(
    CANCEL_SIMULATION_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Simulation cancelled!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at cancelling simulation!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { cancelSimulation, loading };
}

export function usePlayAutoResearch() {
  const [playAutoResearch, { data: newData, error, loading }] = useMutation(
    PLAY_AUTO_RESEARCH_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Research queued!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at queueing research!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { playAutoResearch, loading };
}

export function useResumeResearch() {
  const [resumeResearch, { data: newData, error, loading }] = useMutation(
    RESUME_RESEARCH_DOCUMENT,
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Research resumed!", { variant: "success" });
    }
    if (newData && error) {
      enqueueSnackbar("Error at resuming research!", { variant: "error" });
    }
  }, [newData, error, enqueueSnackbar]);

  return { resumeResearch, loading };
}

export function useRestartResearch() {
  const [restartResearch, { data: newData, error, loading }] = useMutation(
    RESTART_RESEARCH_DOCUMENT,
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Research restarted!", { variant: "success" });
    }
    if (newData && error) {
      enqueueSnackbar("Error at restarting research!", { variant: "error" });
    }
  }, [newData, error, enqueueSnackbar]);

  return { restartResearch, loading };
}

export function usePauseResearch() {
  const [pauseResearch, { data: newData, error, loading }] = useMutation(
    PAUSE_RESEARCH_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Research paused!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at pausing research!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { pauseResearch, loading };
}

export function useCancelResearch() {
  const [cancelResearch, { data: newData, error, loading }] = useMutation(
    CANCEL_RESEARCH_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Research cancelled!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at cancelling research!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { cancelResearch, loading };
}

export function useDeleteSimulation() {
  const [deleteSimulation, { data: newData, error, loading }] = useMutation(
    DELETE_SIMULATION_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      client.cache.evict({ id: `Simulation:${newData.deleteSimulation}` });
      client.cache.gc();
      enqueueSnackbar("Simulation removed!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at removing simulation!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { deleteSimulation, loading };
}

export function useDeleteSimulationResearch() {
  const [deleteSimulationResearch, { data: newData, error, loading }] =
    useMutation(DELETE_SIMULATION_RESEARCH_DOCUMENT);
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      client.cache.evict({
        id: `SimulationResearch:${newData.deleteSimulationResearch}`,
      });
      client.cache.gc();
      enqueueSnackbar("Simulation research removed!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at removing simulation research!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { deleteSimulationResearch, loading };
}
