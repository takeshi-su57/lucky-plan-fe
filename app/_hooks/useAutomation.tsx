"use client";

import { useApolloClient, useMutation, useQuery } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { CONTRACT_INFO_FRAGMENT_DOCUMENT } from "./useContract";
import { STRATEGY_INFO_FRAGMENT_DOCUMENT } from "./useStrategy";
import { GetAllBotsQuery } from "@/graphql/gql/graphql";

export const BOTDETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment BotDetailsInfo on BotDetails {
    id
    leaderAddress
    followerAddress
    strategyId
    leaderContractId
    leaderStartedBlock
    leaderEndedBlock
    followerContractId
    followerStartedBlock
    followerEndedBlock
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
    leader {
      ...UserInfo
    }
    strategy {
      ...StrategyInfo
    }
  }
`);

export const GET_ALL_BOTS_DOCUMENT = graphql(`
  query getAllBots {
    getAllBots {
      ...BotDetailsInfo
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

function getBotFragment(bot: GetAllBotsQuery["getAllBots"][number]) {
  const botInfo = getFragmentData(BOTDETAILS_INFO_FRAGMENT_DOCUMENT, bot);

  return {
    ...botInfo,
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

export function useGetAllBots() {
  const { data } = useQuery(GET_ALL_BOTS_DOCUMENT, { variables: {} });
  return useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getAllBots.map(getBotFragment);
  }, [data]);
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
          query: GET_ALL_BOTS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllBots.length > 0) {
            const alreadyExists = data.getAllBots.filter(
              (bot) =>
                botInfo.id ===
                getFragmentData(BOTDETAILS_INFO_FRAGMENT_DOCUMENT, bot).id,
            );

            if (alreadyExists.length > 0) {
              return data;
            }

            return {
              ...data,
              getAllBots: [...data.getAllBots, botInfo],
            };
          } else {
            return data;
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return createBot;
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

      client.cache.updateQuery(
        {
          query: GET_ALL_BOTS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllBots.length > 0) {
            return {
              ...data,
              getAllBots: data.getAllBots.map((bot) =>
                botInfo.id ===
                getFragmentData(BOTDETAILS_INFO_FRAGMENT_DOCUMENT, bot).id
                  ? botInfo
                  : bot,
              ),
            };
          } else {
            return data;
          }
        },
      );
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

      client.cache.updateQuery(
        {
          query: GET_ALL_BOTS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllBots.length > 0) {
            return {
              ...data,
              getAllBots: data.getAllBots.map((bot) =>
                botInfo.id ===
                getFragmentData(BOTDETAILS_INFO_FRAGMENT_DOCUMENT, bot).id
                  ? botInfo
                  : bot,
              ),
            };
          } else {
            return data;
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return stopBot;
}
