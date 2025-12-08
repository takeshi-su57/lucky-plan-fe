"use client";

import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";

import { graphql } from "@/gql/index";

export const GET_ALL_USERS_DOCUMENT = graphql(`
  query getAllUsers {
    getAllUsers {
      address
      permission
      allowAuto
      budget
      ratio
      followerContractId
    }
  }
`);

export const GET_TOKEN_DOCUMENT = graphql(`
  mutation getToken(
    $singature: String!
    $timestamp: String!
    $walletAddress: String!
  ) {
    getToken(
      signature: $singature
      timestamp: $timestamp
      walletAddress: $walletAddress
    ) {
      accessToken
    }
  }
`);

export const CHANGE_USER_PERMISSION_DOCUMENT = graphql(`
  mutation changeUserPermission($address: String!, $permission: String!) {
    changeUserPermission(address: $address, permission: $permission) {
      address
      permission
      allowAuto
      budget
      ratio
      followerContractId
    }
  }
`);

export const ALLOW_AUTO_DOCUMENT = graphql(`
  mutation allowAuto(
    $address: String!
    $allowAuto: Boolean!
    $budget: Float!
    $ratio: Float!
    $followerContractId: Int!
  ) {
    allowAuto(
      address: $address
      allowAuto: $allowAuto
      budget: $budget
      ratio: $ratio
      followerContractId: $followerContractId
    ) {
      address
      permission
      allowAuto
      budget
      ratio
      followerContractId
    }
  }
`);

export function useGetAllUsers() {
  const { data, loading } = useQuery(GET_ALL_USERS_DOCUMENT, {
    variables: {},
  });

  return {
    users: data?.getAllUsers || [],
    loading,
  };
}

export function useChangeUserPermission() {
  const [mutateChangeUserPermission, { data: newData, error, loading }] =
    useMutation(CHANGE_USER_PERMISSION_DOCUMENT);

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at changing user permission!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_USERS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllUsers.length > 0) {
            const exists = data.getAllUsers.find(
              (user) => user.address === newData.changeUserPermission.address,
            );

            if (exists) {
              return {
                ...data,
                getAllUsers: data.getAllUsers.map((user) =>
                  user.address === newData.changeUserPermission.address
                    ? newData.changeUserPermission
                    : user,
                ),
              };
            } else {
              return {
                ...data,
                getAllUsers: [
                  ...data.getAllUsers,
                  newData.changeUserPermission,
                ],
              };
            }
          } else {
            return {
              getAllUsers: [newData.changeUserPermission],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { mutateChangeUserPermission, loading };
}

export function useAllowAuto() {
  const [mutateAllowAuto, { data: newData, error, loading }] =
    useMutation(ALLOW_AUTO_DOCUMENT);

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at changing user allow auto!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_USERS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllUsers.length > 0) {
            const exists = data.getAllUsers.find(
              (user) => user.address === newData.allowAuto.address,
            );

            if (exists) {
              return {
                ...data,
                getAllUsers: data.getAllUsers.map((user) =>
                  user.address === newData.allowAuto.address
                    ? newData.allowAuto
                    : user,
                ),
              };
            } else {
              return {
                ...data,
                getAllUsers: [...data.getAllUsers, newData.allowAuto],
              };
            }
          } else {
            return {
              getAllUsers: [newData.allowAuto],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { mutateAllowAuto, loading };
}
