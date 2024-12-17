"use client";

import { useApolloClient, useMutation, useQuery } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { GetAllLeaderHistoriesQuery } from "@/graphql/gql/graphql";
import { TRADEHISTORY_INFO_FRAGMENT_DOCUMENT } from "./useHistory";

export const USER_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment UserInfo on User {
    address
    role
  }
`);

export const USER_HISTORY_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment UserHistoryInfo on UserHistory {
    address
    role
    histories {
      ...TradeHistoryInfo
    }
  }
`);

export const GET_ALL_USERS_DOCUMENT = graphql(`
  query getAllUsers {
    getAllUsers {
      ...UserInfo
    }
  }
`);

export const GET_ALL_LEADERS_DOCUMENT = graphql(`
  query getAllLeaders {
    getAllLeaders {
      ...UserInfo
    }
  }
`);

export const GET_ALL_LEADER_HISTORIES_DOCUMENT = graphql(`
  query getAllLeaderHistories($contractId: Int!) {
    getAllLeaderHistories(contractId: $contractId) {
      ...UserHistoryInfo
    }
  }
`);

export const CHANGE_USER_ROLE_DOCUMENT = graphql(`
  mutation changeUserRole($input: ChangeUserRoleInput!) {
    changeUserRole(input: $input) {
      ...UserInfo
    }
  }
`);

export const ADD_USER_DOCUMENT = graphql(`
  mutation addUser($input: AddUserInput!) {
    addUser(input: $input) {
      ...UserInfo
    }
  }
`);

export const ADD_LEADER_DOCUMENT = graphql(`
  mutation addLeader($input: AddUserInput!) {
    addLeader(input: $input) {
      ...UserInfo
    }
  }
`);

export function useGetAllUsers() {
  const { data } = useQuery(GET_ALL_USERS_DOCUMENT, { variables: {} });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllUsers.map((user) => ({
      ...getFragmentData(USER_INFO_FRAGMENT_DOCUMENT, user),
    }));
  }, [data]);
}

function getUserHistoryFragment(
  user: GetAllLeaderHistoriesQuery["getAllLeaderHistories"][number],
) {
  const userInfo = getFragmentData(USER_HISTORY_INFO_FRAGMENT_DOCUMENT, user);

  return {
    ...userInfo,
    histories: [
      ...getFragmentData(
        TRADEHISTORY_INFO_FRAGMENT_DOCUMENT,
        userInfo.histories,
      ),
    ],
  };
}

export function useGetAllLeaders() {
  const { data } = useQuery(GET_ALL_LEADERS_DOCUMENT, {
    variables: {},
  });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllLeaders.map((item) => ({
      ...getFragmentData(USER_INFO_FRAGMENT_DOCUMENT, item),
    }));
  }, [data]);
}

export function useGetAllLeaderHistories(contractId: string | null) {
  const { data } = useQuery(GET_ALL_LEADER_HISTORIES_DOCUMENT, {
    variables: contractId ? { contractId: +contractId } : undefined,
  });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllLeaderHistories.map(getUserHistoryFragment);
  }, [data]);
}

export function useChangeUserRole() {
  const [mutateUserRole, { data, error }] = useMutation(
    CHANGE_USER_ROLE_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      const userInfo = getFragmentData(
        USER_INFO_FRAGMENT_DOCUMENT,
        data.changeUserRole,
      );

      enqueueSnackbar("Success at changing user role!", {
        variant: "success",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: userInfo.__typename,
          address: userInfo.address,
        }),
        fragment: USER_INFO_FRAGMENT_DOCUMENT,
        data: userInfo,
      });
    }
  }, [client.cache, data, enqueueSnackbar, error]);

  return mutateUserRole;
}

export function useAddNewUser() {
  const [mutateAddUser, { data: newData, error }] =
    useMutation(ADD_USER_DOCUMENT);

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const userInfo = getFragmentData(
        USER_INFO_FRAGMENT_DOCUMENT,
        newData.addUser,
      );

      enqueueSnackbar("Success at changing user role!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_USERS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllUsers.length > 0) {
            const alreadyExists = data.getAllUsers.filter(
              (user) =>
                userInfo.address ===
                getFragmentData(USER_INFO_FRAGMENT_DOCUMENT, user).address,
            );

            if (alreadyExists.length > 0) {
              return data;
            }

            return {
              ...data,
              getAllUsers: [...data.getAllUsers, userInfo],
            };
          } else {
            return {
              getAllUsers: [userInfo],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return mutateAddUser;
}

export function useAddNewLeader() {
  const [mutateAddUser, { data: newData, error }] =
    useMutation(ADD_LEADER_DOCUMENT);

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const userInfo = getFragmentData(
        USER_INFO_FRAGMENT_DOCUMENT,
        newData.addLeader,
      );

      enqueueSnackbar("Success at adding a new Leader!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_USERS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllUsers.length > 0) {
            const alreadyExists = data.getAllUsers.filter(
              (user) =>
                userInfo.address ===
                getFragmentData(USER_INFO_FRAGMENT_DOCUMENT, user).address,
            );

            if (alreadyExists.length > 0) {
              return data;
            }

            return {
              ...data,
              getAllUsers: [...data.getAllUsers, userInfo],
            };
          } else {
            return {
              getAllUsers: [userInfo],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return mutateAddUser;
}
