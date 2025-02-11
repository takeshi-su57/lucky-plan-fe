"use client";

import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { useGetBotsByStatus } from "./useAutomation";
import { BotStatus } from "@/graphql/gql/graphql";
import { useGetAllContracts } from "./useContract";
import { MISSION_INFO_FRAGMENT_DOCUMENT } from "./useMission";
import { PNL_SNAPSHOT_INFO_FRAGMENT_DOCUMENT } from "./useHistory";

export const FOLLOWER_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment FollowerInfo on Follower {
    address
    accountIndex
    publicKey
  }
`);

export const FOLLOWER_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment FollowerDetailInfo on FollowerDetail {
    address
    accountIndex
    publicKey
    ethBalance
    usdcBalance
    contractId
    pnlSnapshots {
      ...PnlSnapshotInfo
    }
  }
`);

export const FOLLOWER_TRADE_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment FollowerTradeInfo on FollowerTrade {
    address
    index
    mission {
      ...MissionInfo
    }
    params
  }
`);

export const GET_ALL_FOLLOWERS_DOCUMENT = graphql(`
  query getAllFollowers {
    getAllFollowers {
      ...FollowerInfo
    }
  }
`);

export const GET_ALL_FOLLOWER_DETAILS_DOCUMENT = graphql(`
  query getAllFollowerDetails($contractId: Int!) {
    getAllFollowerDetails(contractId: $contractId) {
      ...FollowerDetailInfo
    }
  }
`);

export const GET_FOLLOWER_PRIVATE_KEY_DOCUMENT = graphql(`
  query getFollowerPrivateKey($input: GetFollowerByAddressInput!) {
    getFollowerPrivateKey(input: $input)
  }
`);

export const GET_PENDING_ORDERS_DOCUMENT = graphql(`
  query getPendingOrders($address: String!, $contractId: Int!) {
    getPendingOrders(address: $address, contractId: $contractId) {
      params
      address
      index
    }
  }
`);

export const GET_TRADED_ORDERS_DOCUMENT = graphql(`
  query getTradedOrders($address: String!, $contractId: Int!) {
    getTrades(address: $address, contractId: $contractId) {
      ...FollowerTradeInfo
    }
  }
`);

export const CLOSE_TRADE_MARKET_DOCUMENT = graphql(`
  mutation closeTradeMarket($input: CloseTradeInput!) {
    closeTradeMarket(input: $input) {
      message
      success
      address
      contractId
      index
    }
  }
`);

export const CANCEL_ORDER_AFTER_TIMEOUT_DOCUMENT = graphql(`
  mutation cancelOrderAfterTimeout($input: CancelOrderAfterTimeoutInput!) {
    cancelOrderAfterTimeout(input: $input) {
      message
      success
      address
      contractId
      index
    }
  }
`);

export const GENERATE_NEW_FOLLOWER_DOCUMENT = graphql(`
  mutation generateNewFollower {
    generateNewFollower {
      ...FollowerInfo
    }
  }
`);

export const WITHDRAW_ALL_USDC_DOCUMENT = graphql(`
  mutation withdrawAllUSDC($input: WithdrawAllInput!) {
    withdrawAllUSDC(input: $input)
  }
`);

export const WITHDRAW_ALL_ETH_DOCUMENT = graphql(`
  mutation withdrawAllETH($input: WithdrawAllInput!) {
    withdrawAllETH(input: $input)
  }
`);

export const FOLLOWER_DETAILS_UPDATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription followerDetailsUpdated($contractId: Int!) {
    followerDetailsUpdated(contractId: $contractId) {
      ...FollowerDetailInfo
    }
  }
`);

export function useGetAllFollowers() {
  const { data } = useQuery(GET_ALL_FOLLOWERS_DOCUMENT, {
    variables: {},
  });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllFollowers.map((follower) => ({
      ...getFragmentData(FOLLOWER_INFO_FRAGMENT_DOCUMENT, follower),
    }));
  }, [data]);
}

export function useGetAvailableFollowers(limitedAddresses: string[] = []) {
  const allFollowers = useGetAllFollowers();
  const createdBots = useGetBotsByStatus(BotStatus.Created);
  const liveBots = useGetBotsByStatus(BotStatus.Live);
  const stopBots = useGetBotsByStatus(BotStatus.Stop);

  return useMemo(() => {
    const botFollowers = [...createdBots, ...liveBots, ...stopBots]
      .filter((bot) => bot.status !== BotStatus.Dead)
      .map((bot) => bot.followerAddress);

    return allFollowers.filter(
      (follower) =>
        !botFollowers.includes(follower.address) &&
        !limitedAddresses.includes(follower.address),
    );
  }, [createdBots, liveBots, stopBots, allFollowers, limitedAddresses]);
}

export function useGetAllFollowerDetails(contractId: string | null) {
  const { data } = useQuery(GET_ALL_FOLLOWER_DETAILS_DOCUMENT, {
    variables: contractId !== null ? { contractId: +contractId } : undefined,
  });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllFollowerDetails
      .map((follower) => {
        const followerData = getFragmentData(
          FOLLOWER_DETAILS_INFO_FRAGMENT_DOCUMENT,
          follower,
        );

        const pnlSnapshots = followerData.pnlSnapshots.map((snapshot) =>
          getFragmentData(PNL_SNAPSHOT_INFO_FRAGMENT_DOCUMENT, snapshot),
        );

        return {
          ...followerData,
          pnlSnapshots,
        };
      })
      .sort((a, b) => a.accountIndex - b.accountIndex);
  }, [data]);
}

export function useSubscribeFollowerDetailUpdated(contractId: string | null) {
  const { data, error } = useSubscription(
    FOLLOWER_DETAILS_UPDATED_SUBSCRIPTION_DOCUMENT,
    {
      variables:
        contractId !== null
          ? {
              contractId: +contractId,
            }
          : undefined,
    },
  );

  const client = useApolloClient();

  useEffect(() => {
    if (data && !error) {
      const followerDetailInfos = data.followerDetailsUpdated.map((follower) =>
        getFragmentData(FOLLOWER_DETAILS_INFO_FRAGMENT_DOCUMENT, follower),
      );

      followerDetailInfos.forEach((follower) => {
        const id = client.cache.identify({
          __typename: follower.__typename,
          address: follower.address,
          contractId: follower.contractId,
        });

        const fragment = client.cache.readFragment({
          id,
          fragment: FOLLOWER_DETAILS_INFO_FRAGMENT_DOCUMENT,
          fragmentName: "FollowerDetailInfo",
        });

        if (fragment) {
          client.cache.writeFragment({
            id,
            fragment: FOLLOWER_DETAILS_INFO_FRAGMENT_DOCUMENT,
            fragmentName: "FollowerDetailInfo",
            data: follower,
          });
        } else {
          client.cache.updateQuery(
            {
              query: GET_ALL_FOLLOWER_DETAILS_DOCUMENT,
              variables: {
                contractId: follower.contractId,
              },
            },
            (data) => {
              if (data && data.getAllFollowerDetails.length > 0) {
                const alreadyExists = data.getAllFollowerDetails.filter(
                  (item) =>
                    follower.address ===
                    getFragmentData(
                      FOLLOWER_DETAILS_INFO_FRAGMENT_DOCUMENT,
                      item,
                    ).address,
                );

                if (alreadyExists.length > 0) {
                  return data;
                }

                return {
                  ...data,
                  getAllFollowerDetails: [
                    ...data.getAllFollowerDetails,
                    follower,
                  ],
                };
              } else {
                return {
                  getAllFollowerDetails: [follower],
                };
              }
            },
          );
        }
      });
    }
  }, [client.cache, data, error]);
}

export function useGetPendingOrders(address: string, contractId: number) {
  const { data, loading } = useQuery(GET_PENDING_ORDERS_DOCUMENT, {
    variables: {
      address,
      contractId: contractId,
    },
  });

  return { pendingOrders: data?.getPendingOrders || [], loading };
}

export function useGetTradedOrders(address: string, contractId: number) {
  const { data, loading } = useQuery(GET_TRADED_ORDERS_DOCUMENT, {
    variables: {
      address,
      contractId: +contractId,
    },
  });

  const trades = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getTrades.map((trade) => {
      const tradeData = getFragmentData(
        FOLLOWER_TRADE_INFO_FRAGMENT_DOCUMENT,
        trade,
      );

      const mission = getFragmentData(
        MISSION_INFO_FRAGMENT_DOCUMENT,
        tradeData.mission,
      );

      return {
        ...tradeData,
        mission: mission || null,
      };
    });
  }, [data]);

  return { trades, loading };
}

export function useGetFollowerPrivateKey() {
  const [getPrivateKey, { data, error }] = useLazyQuery(
    GET_FOLLOWER_PRIVATE_KEY_DOCUMENT,
  );

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar("Failed at follower private key!", {
        variant: "error",
      });
    }
  }, [enqueueSnackbar, error]);

  return {
    getPrivateKey,
    data,
  };
}

export function useGenerateFollower() {
  const [generateFollower, { data: newData, error }] = useMutation(
    GENERATE_NEW_FOLLOWER_DOCUMENT,
  );
  const contracts = useGetAllContracts();

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const followerInfo = getFragmentData(
        FOLLOWER_INFO_FRAGMENT_DOCUMENT,
        newData.generateNewFollower,
      );

      enqueueSnackbar("Success at generating new follower!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_FOLLOWERS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllFollowers.length > 0) {
            const alreadyExists = data.getAllFollowers.filter(
              (follower) =>
                followerInfo.address ===
                getFragmentData(FOLLOWER_INFO_FRAGMENT_DOCUMENT, follower)
                  .address,
            );

            if (alreadyExists.length > 0) {
              return data;
            }

            return {
              ...data,
              getAllFollowers: [...data.getAllFollowers, followerInfo],
            };
          } else {
            return {
              getAllFollowers: [followerInfo],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar, contracts]);

  return generateFollower;
}

export function useCloseTradeMarket() {
  const [closeTradeMarket, { data, error, loading }] = useMutation(
    CLOSE_TRADE_MARKET_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.closeTradeMarket.success) {
        enqueueSnackbar("Success at close trade market!", {
          variant: "success",
        });

        const tradeIndex = data.closeTradeMarket.index;

        client.cache.updateQuery(
          {
            query: GET_TRADED_ORDERS_DOCUMENT,
            variables: {
              address: data.closeTradeMarket.address,
              contractId: data.closeTradeMarket.contractId,
            },
          },
          (data) => {
            if (data && data.getTrades.length > 0) {
              return {
                ...data,
                getTrades: data.getTrades.filter(
                  (item) =>
                    tradeIndex !==
                    getFragmentData(FOLLOWER_TRADE_INFO_FRAGMENT_DOCUMENT, item)
                      .index,
                ),
              };
            } else {
              return {
                getTrades: [],
              };
            }
          },
        );
      } else {
        enqueueSnackbar(data.closeTradeMarket.message, {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { closeTradeMarket, loading };
}

export function useCancelOrderAfterTimeout() {
  const [cancelOrderAfterTimeout, { data, error, loading }] = useMutation(
    CANCEL_ORDER_AFTER_TIMEOUT_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.cancelOrderAfterTimeout.success) {
        enqueueSnackbar("Success at cancel order after timeout!", {
          variant: "success",
        });

        const tradeIndex = data.cancelOrderAfterTimeout.index;

        client.cache.updateQuery(
          {
            query: GET_PENDING_ORDERS_DOCUMENT,
            variables: {
              address: data.cancelOrderAfterTimeout.address,
              contractId: data.cancelOrderAfterTimeout.contractId,
            },
          },
          (data) => {
            if (data && data.getPendingOrders.length > 0) {
              return {
                ...data,
                getPendingOrders: data.getPendingOrders.filter(
                  (item) => tradeIndex !== item.index,
                ),
              };
            } else {
              return {
                getPendingOrders: [],
              };
            }
          },
        );
      } else {
        enqueueSnackbar(data.cancelOrderAfterTimeout.message, {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { cancelOrderAfterTimeout, loading };
}

export function useWithdrawAllUSDC() {
  const [withdrawAllUSDC, { data, error }] = useMutation(
    WITHDRAW_ALL_USDC_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      enqueueSnackbar("Success at withdraw USDC!", {
        variant: "success",
      });
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return withdrawAllUSDC;
}

export function useWithdrawAllETH() {
  const [withdrawAllETH, { data, error }] = useMutation(
    WITHDRAW_ALL_ETH_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      enqueueSnackbar("Success at withdraw ETH!", {
        variant: "success",
      });
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return withdrawAllETH;
}
