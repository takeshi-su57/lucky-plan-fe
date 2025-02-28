"use client";

import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useCallback, useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";

import {
  BotBackwardDetails,
  BotForwardDetails,
  BotForwardDetailsInfoFragment,
  BotStatus,
} from "@/graphql/gql/graphql";
import { BotBackwardDetailsInfoFragment } from "@/graphql/gql/graphql";

import { FOLLOWER_INFO_FRAGMENT_DOCUMENT } from "./useFollower";
import { PLAN_INFO_FRAGMENT_DOCUMENT } from "./usePlan";
import { getMissionForwardDetails } from "./useMission";
import { CONTRACT_INFO_FRAGMENT_DOCUMENT } from "./useContract";
import { STRATEGY_INFO_FRAGMENT_DOCUMENT } from "./useStrategy";

export const BOT_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment BotDetailsInfo on BotDetails {
    id
    leaderAddress
    followerAddress
    strategyId
    planId
    leaderContractId
    leaderCollateralBaseline
    leaderStartedBlock
    leaderEndedBlock
    followerContractId
    followerStartedBlock
    followerEndedBlock
    startedAt
    endedAt
    status
    followerContract {
      ...ContractInfo
    }
    leaderContract {
      ...ContractInfo
    }
    follower {
      ...FollowerInfo
    }
    strategy {
      ...StrategyInfo
    }
  }
`);

export const BOT_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment BotForwardDetailsInfo on BotForwardDetails {
    id
    leaderAddress
    followerAddress
    strategyId
    planId
    leaderContractId
    leaderCollateralBaseline
    leaderStartedBlock
    leaderEndedBlock
    followerContractId
    followerStartedBlock
    followerEndedBlock
    startedAt
    endedAt
    status
    followerContract {
      ...ContractInfo
    }
    leaderContract {
      ...ContractInfo
    }
    follower {
      ...FollowerInfo
    }
    strategy {
      ...StrategyInfo
    }
    missions {
      ...MissionForwardDetailsInfo
    }
  }
`);

export const BOT_BACKWARD_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment BotBackwardDetailsInfo on BotBackwardDetails {
    id
    leaderAddress
    followerAddress
    strategyId
    planId
    leaderContractId
    leaderCollateralBaseline
    leaderStartedBlock
    leaderEndedBlock
    followerContractId
    followerStartedBlock
    followerEndedBlock
    startedAt
    endedAt
    status
    followerContract {
      ...ContractInfo
    }
    leaderContract {
      ...ContractInfo
    }
    follower {
      ...FollowerInfo
    }
    strategy {
      ...StrategyInfo
    }
    plan {
      ...PlanInfo
    }
  }
`);

export const GET_BOTS_BY_STATUS_DOCUMENT = graphql(`
  query getBotsByStatus($status: BotStatus!, $first: Int!, $after: Int) {
    getBotsByStatus(status: $status, first: $first, after: $after) {
      edges {
        cursor
        node {
          ...BotForwardDetailsInfo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const CREATE_BOT_DOCUMENT = graphql(`
  mutation createBot($input: CreateBotInput!) {
    createBot(input: $input) {
      ...BotBackwardDetailsInfo
    }
  }
`);

export const BATCH_CREATE_BOTS_DOCUMENT = graphql(`
  mutation batchCreateBots($input: [CreateBotAndStrategyInput!]!) {
    batchCreateBots(input: $input) {
      ...BotBackwardDetailsInfo
    }
  }
`);

export const DELETE_BOT_DOCUMENT = graphql(`
  mutation deleteBot($id: Int!) {
    deleteBot(id: $id) {
      ...BotBackwardDetailsInfo
    }
  }
`);

export const LIVE_BOT_DOCUMENT = graphql(`
  mutation liveBot($id: Int!) {
    liveBot(id: $id) {
      ...BotBackwardDetailsInfo
    }
  }
`);

export const STOP_BOT_DOCUMENT = graphql(`
  mutation stopBot($id: Int!) {
    stopBot(id: $id) {
      ...BotBackwardDetailsInfo
    }
  }
`);

export function getBotBackwardDetails(
  bot: {
    __typename?: "BotBackwardDetails";
  } & {
    " $fragmentRefs"?: {
      BotBackwardDetailsInfoFragment: BotBackwardDetailsInfoFragment;
    };
  },
): BotBackwardDetails {
  const botInfo = getFragmentData(
    BOT_BACKWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
    bot,
  );

  return {
    ...botInfo,
    follower: {
      ...getFragmentData(FOLLOWER_INFO_FRAGMENT_DOCUMENT, botInfo.follower),
    },
    leaderContract: {
      ...getFragmentData(
        CONTRACT_INFO_FRAGMENT_DOCUMENT,
        botInfo.leaderContract,
      ),
    },
    followerContract: {
      ...getFragmentData(
        CONTRACT_INFO_FRAGMENT_DOCUMENT,
        botInfo.followerContract,
      ),
    },
    strategy: {
      ...getFragmentData(STRATEGY_INFO_FRAGMENT_DOCUMENT, botInfo.strategy),
    },
    plan: getFragmentData(PLAN_INFO_FRAGMENT_DOCUMENT, botInfo.plan),
  };
}

export function getBotForwardDetails(
  bot: {
    __typename?: "BotForwardDetails";
  } & {
    " $fragmentRefs"?: {
      BotForwardDetailsInfoFragment: BotForwardDetailsInfoFragment;
    };
  },
): BotForwardDetails {
  const botInfo = getFragmentData(
    BOT_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
    bot,
  );

  return {
    ...botInfo,
    follower: {
      ...getFragmentData(FOLLOWER_INFO_FRAGMENT_DOCUMENT, botInfo.follower),
    },
    leaderContract: {
      ...getFragmentData(
        CONTRACT_INFO_FRAGMENT_DOCUMENT,
        botInfo.leaderContract,
      ),
    },
    followerContract: {
      ...getFragmentData(
        CONTRACT_INFO_FRAGMENT_DOCUMENT,
        botInfo.followerContract,
      ),
    },
    strategy: {
      ...getFragmentData(STRATEGY_INFO_FRAGMENT_DOCUMENT, botInfo.strategy),
    },
    missions: botInfo.missions.map(getMissionForwardDetails),
  };
}

export function useGetBotsByStatus(status: BotStatus) {
  const [query, { data, fetchMore, loading, error }] = useLazyQuery(
    GET_BOTS_BY_STATUS_DOCUMENT,
  );

  useEffect(() => {
    query({
      variables: {
        status,
        first: 20,
      },
    });
  }, [query, status]);

  const bots = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getBotsByStatus.edges.map((edge) =>
      getBotForwardDetails(edge.node),
    );
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error) {
      fetchMore({
        variables: {
          status,
          first: 20,
          after: data.getBotsByStatus.pageInfo.endCursor,
        },
      });
    }
  }, [data, error, fetchMore, status]);

  return {
    hasMore: data?.getBotsByStatus.pageInfo.hasNextPage,
    bots,
    fetchMore: handleFetchMore,
    loading,
  };
}

export function useCreateBot() {
  const [createBot, { data: newData, error }] =
    useMutation(CREATE_BOT_DOCUMENT);
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const botInfo = getBotBackwardDetails(newData.createBot);

      enqueueSnackbar("Success at creating new bot!", {
        variant: "success",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: "BotBackwardDetails",
          id: botInfo.id,
        }),
        fragment: BOT_BACKWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "BotBackwardDetailsInfo",
        data: botInfo,
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: "BotForwardDetails",
          id: botInfo.id,
        }),
        fragment: BOT_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "BotForwardDetailsInfo",
        data: {
          __typename: "BotForwardDetails",
          endedAt: botInfo.endedAt,
          follower: botInfo.follower,
          followerAddress: botInfo.followerAddress,
          followerContract: botInfo.followerContract,
          followerContractId: botInfo.followerContractId,
          followerEndedBlock: botInfo.followerEndedBlock,
          followerStartedBlock: botInfo.followerStartedBlock,
          id: botInfo.id,
          leaderAddress: botInfo.leaderAddress,
          leaderCollateralBaseline: botInfo.leaderCollateralBaseline,
          leaderContract: botInfo.leaderContract,
          leaderContractId: botInfo.leaderContractId,
          leaderEndedBlock: botInfo.leaderEndedBlock,
          leaderStartedBlock: botInfo.leaderStartedBlock,
          missions: [],
          planId: botInfo.planId,
          startedAt: botInfo.startedAt,
          status: botInfo.status,
          strategy: botInfo.strategy,
          strategyId: botInfo.strategyId,
        },
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return createBot;
}

export function useBatchCreateBots() {
  const [batchCreateBots, { data: newData, error, loading }] = useMutation(
    BATCH_CREATE_BOTS_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at creating new bots!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at creating new bots!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { batchCreateBots, loading };
}

export function useDeleteBot() {
  const [deleteBot, { data, error }] = useMutation(DELETE_BOT_DOCUMENT);
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      enqueueSnackbar("Success at deleting a bot!", {
        variant: "success",
      });
    }
  }, [client.cache, data, error, enqueueSnackbar]);

  return deleteBot;
}

export function useLiveBot() {
  const [liveBot, { data: newData, error }] = useMutation(LIVE_BOT_DOCUMENT);
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at living bot!", {
        variant: "success",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return liveBot;
}

export function useStopBot() {
  const [stopBot, { data: newData, error }] = useMutation(STOP_BOT_DOCUMENT);
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at stoping bot!", {
        variant: "success",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return stopBot;
}
