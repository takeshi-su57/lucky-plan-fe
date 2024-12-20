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

export const GENERATE_NEW_FOLLOWER_DOCUMENT = graphql(`
  mutation generateNewFollower {
    generateNewFollower {
      ...FollowerInfo
    }
  }
`);

export const WITHDRAW_ALL_DOCUMENT = graphql(`
  mutation withdrawAll($input: WithdrawAllInput!) {
    withdrawAll(input: $input)
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

export function useGetAllFollowerDetails(contractId: string | null) {
  const { data } = useQuery(GET_ALL_FOLLOWER_DETAILS_DOCUMENT, {
    variables: contractId !== null ? { contractId: +contractId } : undefined,
  });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllFollowerDetails
      .map((follower) => ({
        ...getFragmentData(FOLLOWER_DETAILS_INFO_FRAGMENT_DOCUMENT, follower),
      }))
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
        });

        if (fragment) {
          client.cache.writeFragment({
            id,
            fragment: FOLLOWER_DETAILS_INFO_FRAGMENT_DOCUMENT,
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
  }, [client.cache, newData, error, enqueueSnackbar]);

  return generateFollower;
}

export function useWithdrawAll() {
  const [withdrawAll, { data, error }] = useMutation(WITHDRAW_ALL_DOCUMENT);
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      enqueueSnackbar("Success at withdraw!", {
        variant: "success",
      });
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return withdrawAll;
}
