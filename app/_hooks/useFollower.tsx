"use client";

import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";

export const FOLLOWER_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment FollowerInfo on Follower {
    address
    accountIndex
    publicKey
    ethBalance
    usdcBalance
  }
`);

export const GET_ALL_FOLLOWERS_DOCUMENT = graphql(`
  query getAllFollowers {
    getAllFollowers {
      ...FollowerInfo
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

export function useGetAllFollowers() {
  const { data } = useQuery(GET_ALL_FOLLOWERS_DOCUMENT, { variables: {} });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllFollowers.map((follower) => ({
      ...getFragmentData(FOLLOWER_INFO_FRAGMENT_DOCUMENT, follower),
    }));
  }, [data]);
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
            return data;
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return generateFollower;
}
