"use client";

import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";

import { graphql } from "@/gql/index";

export const GET_ALL_USERS_DOCUMENT = graphql(`
  query getAllUsers {
    getAllUsers {
      address
      permission
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
  const [mutateChangeUserPermission, { data: newData, error }] = useMutation(
    CHANGE_USER_PERMISSION_DOCUMENT,
  );

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

  return mutateChangeUserPermission;
}
