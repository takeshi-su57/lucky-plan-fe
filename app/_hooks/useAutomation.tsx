"use client";

import { useApolloClient, useMutation, useQuery } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { CONTRACT_INFO_FRAGMENT_DOCUMENT } from "./useContract";
import { STRATEGY_INFO_FRAGMENT_DOCUMENT } from "./useStrategy";
import {
  BotDetails,
  BotDetailsInfoFragment,
  BotStatus,
} from "@/graphql/gql/graphql";
import { FOLLOWER_INFO_FRAGMENT_DOCUMENT } from "./useFollower";
import { MISSION_INFO_FRAGMENT_DOCUMENT } from "./useMission";

export const BOT_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment BotInfo on Bot {
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
  }
`);

export const BOT_WITH_MISSIONS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment BotWithMissionsInfo on BotWithMissions {
    id
    leaderAddress
    followerAddress
    strategyId
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
    missions {
      ...MissionInfo
    }
  }
`);

export const BOTDETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment BotDetailsInfo on BotDetails {
    id
    leaderAddress
    followerAddress
    strategyId
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

export const GET_BOTS_BY_STATUS_DOCUMENT = graphql(`
  query getBotsByStatus($status: BotStatus!) {
    getBotsByStatus(status: $status) {
      ...BotDetailsInfo
    }
  }
`);

export const FIND_BOT_DOCUMENT = graphql(`
  query findBot($id: Int!) {
    findBot(id: $id) {
      ...BotWithMissionsInfo
    }
  }
`);

export const CREATE_BOT_DOCUMENT = graphql(`
  mutation createBot($input: CreateBotInput!) {
    createBot(input: $input) {
      ...BotDetailsInfo
    }
  }
`);

export const BATCH_CREATE_BOTS_DOCUMENT = graphql(`
  mutation batchCreateBots($input: [CreateBotAndStrategyInput!]!) {
    batchCreateBots(input: $input) {
      ...BotDetailsInfo
    }
  }
`);

export const DELETE_BOT_DOCUMENT = graphql(`
  mutation deleteBot($id: Int!) {
    deleteBot(id: $id)
  }
`);

export const LIVE_BOT_DOCUMENT = graphql(`
  mutation liveBot($id: Int!) {
    liveBot(id: $id) {
      ...BotDetailsInfo
    }
  }
`);

export const STOP_BOT_DOCUMENT = graphql(`
  mutation stopBot($id: Int!) {
    stopBot(id: $id) {
      ...BotDetailsInfo
    }
  }
`);

function getBotFragment(
  bot: {
    __typename?: "BotDetails";
  } & {
    " $fragmentRefs"?: {
      BotDetailsInfoFragment: BotDetailsInfoFragment;
    };
  },
): BotDetails {
  const botInfo = getFragmentData(BOTDETAILS_INFO_FRAGMENT_DOCUMENT, bot);

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
  };
}

export function useGetBotsByStatus(status?: BotStatus) {
  const { data } = useQuery(GET_BOTS_BY_STATUS_DOCUMENT, {
    variables: status ? { status } : undefined,
  });
  return useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getBotsByStatus.map(getBotFragment).sort((a, b) => a.id - b.id);
  }, [data]);
}

export function useGetBot(botId: number) {
  const { data, loading, error } = useQuery(FIND_BOT_DOCUMENT, {
    variables: { id: +botId },
  });

  const botInfo = getFragmentData(
    BOT_WITH_MISSIONS_INFO_FRAGMENT_DOCUMENT,
    data?.findBot,
  );

  return {
    bot: botInfo
      ? {
          ...botInfo,
          missions: botInfo.missions.map((item) =>
            getFragmentData(MISSION_INFO_FRAGMENT_DOCUMENT, item),
          ),
        }
      : undefined,
    loading,
    error,
  };
}

export function useCreateBot() {
  const [createBot, { data: newData, error }] =
    useMutation(CREATE_BOT_DOCUMENT);
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const botInfo = getBotFragment(newData.createBot);

      enqueueSnackbar("Success at creating new bot!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_BOTS_BY_STATUS_DOCUMENT,
          variables: { status: botInfo.status },
        },
        (data) => {
          if (data && data.getBotsByStatus.length > 0) {
            const alreadyExists = data.getBotsByStatus.filter(
              (bot) =>
                botInfo.id ===
                getFragmentData(BOTDETAILS_INFO_FRAGMENT_DOCUMENT, bot).id,
            );

            if (alreadyExists.length > 0) {
              return data;
            }

            return {
              ...data,
              getBotsByStatus: [...data.getBotsByStatus, botInfo],
            };
          } else {
            return {
              getBotsByStatus: [botInfo],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return createBot;
}

export function useBatchCreateBots() {
  const [createBots, { data: newData, error, loading }] = useMutation(
    BATCH_CREATE_BOTS_DOCUMENT,
  );
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const botInfo = newData.batchCreateBots.map(getBotFragment);

      enqueueSnackbar("Success at creating new bots!", {
        variant: "success",
      });

      botInfo.forEach((bot) => {
        client.cache.updateQuery(
          {
            query: GET_BOTS_BY_STATUS_DOCUMENT,
            variables: { status: bot.status },
          },
          (data) => {
            if (data && data.getBotsByStatus.length > 0) {
              const alreadyExists = data.getBotsByStatus.filter(
                (item) =>
                  bot.id ===
                  getFragmentData(BOTDETAILS_INFO_FRAGMENT_DOCUMENT, item).id,
              );

              if (alreadyExists.length > 0) {
                return data;
              }

              return {
                ...data,
                getBotsByStatus: [...data.getBotsByStatus, bot],
              };
            } else {
              return {
                getBotsByStatus: [bot],
              };
            }
          },
        );
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { createBots, loading };
}

export function useDeleteBot() {
  const [deleteBot, { data, error }] = useMutation(DELETE_BOT_DOCUMENT);
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      const deletedBotId = data.deleteBot;

      enqueueSnackbar("Success at deleting a bot!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_BOTS_BY_STATUS_DOCUMENT,
          variables: { status: BotStatus.Created },
        },
        (data) => {
          if (data && data.getBotsByStatus.length > 0) {
            return {
              ...data,
              getBotsByStatus: data.getBotsByStatus.filter(
                (bot) =>
                  deletedBotId !==
                  getFragmentData(BOTDETAILS_INFO_FRAGMENT_DOCUMENT, bot).id,
              ),
            };
          } else {
            return data;
          }
        },
      );
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
      const botInfo = getBotFragment(newData.liveBot);

      enqueueSnackbar("Success at living bot!", {
        variant: "success",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: botInfo.__typename,
          id: botInfo.id,
        }),
        fragment: BOTDETAILS_INFO_FRAGMENT_DOCUMENT,
        data: botInfo,
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
      const botInfo = getBotFragment(newData.stopBot);

      enqueueSnackbar("Success at stoping bot!", {
        variant: "success",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: botInfo.__typename,
          id: botInfo.id,
        }),
        fragment: BOTDETAILS_INFO_FRAGMENT_DOCUMENT,
        data: botInfo,
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return stopBot;
}
