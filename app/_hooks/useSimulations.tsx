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
import { SimulationBotDetails, SimulationPlan } from "@/graphql/gql/graphql";

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
