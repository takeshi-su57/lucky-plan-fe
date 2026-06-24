"use client";

import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client/react";

import { getFragmentData, graphql } from "@/gql/index";
import { useCallback, useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { PERP_TRADE_HISTORY_INFO_FRAGMENT_DOCUMENT } from "./useHistory";
import {
  Simulation,
  SimulationBotDetails,
  SimulationPlan,
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
    leaderContract {
      ...ContractInfo
    }
    leaderContractId
    maxDuration
    mode
    openedPositions
    ratio
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
    simulationBots {
      ...SimulationBotInfo
    }
  }
`);

export const SIMULATION_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment SimulationInfo on Simulation {
    closeFeeRate
    completedPlans
    createdAt
    cursor
    description
    endAt
    error
    id
    maxCollateralUsd
    maxDrawdownUsd
    maxLeverage
    maxRatio
    minCollateralUsd
    minNegativeR2
    minRatio
    minTrades
    openFeeRate
    platform
    profitFactor
    progressMessage
    progressPercent
    progressPhase
    selectedLeaderCount
    slippageRate
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
    updatedAt
    winRate
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
    leaderContract {
      ...ContractInfo
    }
    leaderContractId
    maxDuration
    mode
    openedPositions
    ratio
    simulationPlanId
    startedAt
    stoppedAt
    totalPnl
    totalPositions
    maxLeverage
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

export const GET_SIMULATION_PLANS_DOCUMENT = graphql(`
  query getSimulationPlans($after: Int, $first: Int!) {
    getSimulationPlans(after: $after, first: $first) {
      edges {
        cursor
        node {
          ...SimulationPlanInfo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const GET_SIMULATIONS_DOCUMENT = graphql(`
  query simulations($after: Int, $first: Int!) {
    simulations(after: $after, first: $first) {
      edges {
        cursor
        node {
          ...SimulationInfo
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

export const GET_SIMULATION_PLANS_BY_SIMULATION_DOCUMENT = graphql(`
  query simulationPlansBySimulation($simulationId: Int!) {
    simulationPlansBySimulation(simulationId: $simulationId) {
      ...SimulationPlanInfo
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

export const CREATE_SIMULATION_PLAN_DOCUMENT = graphql(`
  mutation createSimulationPlan($input: CreateSimulationPlanInput!) {
    createSimulationPlan(input: $input) {
      ...SimulationPlanInfo
    }
  }
`);

export const CREATE_SIMULATION_DOCUMENT = graphql(`
  mutation createSimulation($input: CreateSimulationInput!) {
    createSimulation(input: $input) {
      ...SimulationInfo
    }
  }
`);

export const UPDATE_SIMULATION_BOT_DOCUMENT = graphql(`
  mutation updateSimulationBot($input: UpdateSimulationBotInput!) {
    updateSimulationBot(input: $input) {
      ...SimulationBotInfo
    }
  }
`);

export const BATCH_CREATE_SIMULATION_BOTS_DOCUMENT = graphql(`
  mutation batchCreateSimulationBots($inputs: [CreateSimulationBotInput!]!) {
    batchCreateSimulationBots(inputs: $inputs) {
      ...SimulationBotInfo
    }
  }
`);

export const PLAY_SIMULATION_PLAN_DOCUMENT = graphql(`
  mutation playSimulationPlan($id: Int!) {
    playSimulationPlan(id: $id) {
      ...SimulationPlanInfo
    }
  }
`);

export const PLAY_AUTO_SIMULATION_DOCUMENT = graphql(`
  mutation playAutoSimulation($id: Int!) {
    playAutoSimulation(id: $id) {
      ...SimulationInfo
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

export const STOP_SIMULATION_BOT_DOCUMENT = graphql(`
  mutation stopSimulationBot($id: Int!) {
    stopSimulationBot(id: $id) {
      ...SimulationBotInfo
    }
  }
`);

export function useGetSimulationPlans() {
  const [query, { data, fetchMore, loading, error }] = useLazyQuery(
    GET_SIMULATION_PLANS_DOCUMENT,
  );

  useEffect(() => {
    query({
      variables: {
        first: 20,
      },
    });
  }, [query]);

  const simultionPlans = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getSimulationPlans.edges.map((edge) => {
      const unwrapped = getFragmentData(
        SIMULATION_PLAN_INFO_FRAGMENT_DOCUMENT,
        edge.node,
      );

      return {
        ...unwrapped,
        simulationBots: unwrapped.simulationBots.map((simulationBot) =>
          getFragmentData(SIMULATION_BOT_INFO_FRAGMENT_DOCUMENT, simulationBot),
        ),
      } as SimulationPlan;
    });
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error) {
      fetchMore({
        variables: {
          first: 20,
          after: data.getSimulationPlans.pageInfo.endCursor,
        },
      });
    }
  }, [data, error, fetchMore]);

  return {
    simultionPlans,
    loading,
    fetchMore: handleFetchMore,
    hasMore: data?.getSimulationPlans.pageInfo.hasNextPage,
  };
}

export function useGetSimulations() {
  const [query, { data, fetchMore, loading, error }] = useLazyQuery(
    GET_SIMULATIONS_DOCUMENT,
  );

  useEffect(() => {
    query({
      variables: {
        first: 20,
      },
    });
  }, [query]);

  const simulations = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.simulations.edges.map((edge) =>
      getFragmentData(SIMULATION_INFO_FRAGMENT_DOCUMENT, edge.node),
    ) as Simulation[];
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error) {
      fetchMore({
        variables: {
          first: 20,
          after: data.simulations.pageInfo.endCursor,
        },
      });
    }
  }, [data, error, fetchMore]);

  return {
    simulations,
    loading,
    fetchMore: handleFetchMore,
    hasMore: data?.simulations.pageInfo.hasNextPage,
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

    return data.simulationPlansBySimulation.map((plan) => {
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
    });
  }, [data]);

  return { simulationPlans, loading };
}

export function useGetSimulationPlanById(id: number) {
  const { data, loading } = useQuery(GET_SIMULATION_PLAN_BY_ID_DOCUMENT, {
    variables: { id },
  });

  const simulationPlan = useMemo(() => {
    if (!data?.getSimulationPlanById) {
      return null;
    }

    const simulationPlanDetails = getFragmentData(
      SIMULATION_PLAN_DETAILS_INFO_FRAGMENT_DOCUMENT,
      data.getSimulationPlanById,
    );

    const simulationBots = simulationPlanDetails.simulationBots.map(
      (simulationBot) => {
        const unwrapped = getFragmentData(
          SIMULATION_BOT_DETAILS_INFO_FRAGMENT_DOCUMENT,
          simulationBot,
        );

        const positions = unwrapped.positions.map((position) => {
          const histories = getFragmentData(
            SIMULATION_TRADE_POSITION_INFO_FRAGMENT_DOCUMENT,
            position,
          ).histories.map((item) => {
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

    return { ...simulationPlanDetails, simulationBots };
  }, [data]);

  return { simulationPlan, loading };
}

export function useCreateSimulationPlan() {
  const [createSimulationPlan, { data: newData, error, loading }] = useMutation(
    CREATE_SIMULATION_PLAN_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at creating new simulation plan!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at creating new simulation plan!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { createSimulationPlan, loading };
}

export function useCreateSimulation() {
  const [createSimulation, { data: newData, error, loading }] = useMutation(
    CREATE_SIMULATION_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at creating new auto simulation!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at creating new auto simulation!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  const simulation = useMemo(() => {
    if (!newData?.createSimulation) {
      return null;
    }

    return getFragmentData(
      SIMULATION_INFO_FRAGMENT_DOCUMENT,
      newData.createSimulation,
    ) as Simulation;
  }, [newData]);

  return { createSimulation, simulation, loading };
}

export function useUpdateSimulationBot() {
  const [updateSimulationBot, { data: newData, error, loading }] = useMutation(
    UPDATE_SIMULATION_BOT_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at updating simulation bot!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at updating simulation bot!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { updateSimulationBot, loading };
}

export function useBatchCreateSimulationBots() {
  const [batchCreateSimulationBots, { data: newData, error, loading }] =
    useMutation(BATCH_CREATE_SIMULATION_BOTS_DOCUMENT);
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at creating new simulation bots!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at creating new simulation bots!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { batchCreateSimulationBots, loading };
}

export function usePlaySimulationPlan() {
  const [playSimulationPlan, { data: newData, error, loading }] = useMutation(
    PLAY_SIMULATION_PLAN_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at playing simulation plan!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at playing simulation plan!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { playSimulationPlan, loading };
}

export function usePlayAutoSimulation() {
  const [playAutoSimulation, { data: newData, error, loading }] = useMutation(
    PLAY_AUTO_SIMULATION_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Auto simulation started!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at starting auto simulation!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { playAutoSimulation, loading };
}

export function useCancelSimulation() {
  const [cancelSimulation, { data: newData, error, loading }] = useMutation(
    CANCEL_SIMULATION_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Auto simulation cancelled!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at cancelling auto simulation!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { cancelSimulation, loading };
}

export function useStopSimulationBot() {
  const [stopSimulationBot, { data: newData, error, loading }] = useMutation(
    STOP_SIMULATION_BOT_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at stopping simulation bot!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at stopping simulation bot!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { stopSimulationBot, loading };
}
