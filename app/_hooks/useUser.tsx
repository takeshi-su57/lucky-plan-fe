"use client";

import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { GetAllUsersQuery, TagInfoFragment } from "@/graphql/gql/graphql";

import { TAG_INFO_FRAGMENT_DOCUMENT } from "./useTag";
import { hasSameItems } from "@/utils";

export const USER_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment UserInfo on User {
    address
    tags {
      ...TagInfo
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

export const ADD_USER_DOCUMENT = graphql(`
  mutation addUser($input: AddUserInput!) {
    addUser(input: $input) {
      ...UserInfo
    }
  }
`);

export const ADD_TAG_TO_USER_DOCUMENT = graphql(`
  mutation addTagToUser($input: ChangeUserTagInput!) {
    addTagToUser(input: $input) {
      ...UserInfo
    }
  }
`);

export const REMOVE_TAG_TO_USER_DOCUMENT = graphql(`
  mutation removeTagFromUser($input: ChangeUserTagInput!) {
    removeTagFromUser(input: $input) {
      ...UserInfo
    }
  }
`);

function getUserFragment(user: GetAllUsersQuery["getAllUsers"][number]) {
  const userInfo = getFragmentData(USER_INFO_FRAGMENT_DOCUMENT, user);

  return {
    ...userInfo,
    tags: [
      ...userInfo.tags.map((tag) =>
        getFragmentData(TAG_INFO_FRAGMENT_DOCUMENT, tag),
      ),
    ],
  };
}

export function useGetAllUsers() {
  const { data } = useQuery(GET_ALL_USERS_DOCUMENT, { variables: {} });

  return useMemo(() => {
    const tagsMap = new Map<string, TagInfoFragment[]>();

    if (!data) {
      return { users: [], tagsMap };
    }

    const users = data.getAllUsers.map(getUserFragment);

    users.forEach((user) => {
      const arr = tagsMap.get(user.address.toLowerCase());

      if (arr) {
        arr.push(...user.tags);
      } else {
        tagsMap.set(user.address.toLowerCase(), user.tags);
      }
    });

    return {
      users,
      tagsMap,
    };
  }, [data]);
}

export function useGetUsersByTags(tags: string[]) {
  const { users } = useGetAllUsers();

  return useMemo(() => {
    if (tags.length === 0) {
      return users.filter((user) => user.tags.length === 0);
    }

    return users.filter((user) =>
      hasSameItems(
        user.tags.map((tag) => tag.tag),
        tags,
      ),
    );
  }, [tags, users]);
}

export function useGetTagsByAddress(address: string) {
  const { tagsMap } = useGetAllUsers();

  return useMemo(() => {
    return tagsMap.get(address.toLowerCase()) || [];
  }, [address, tagsMap]);
}

export function useAddNewUser() {
  const [mutateAddUser, { data: newData, error }] =
    useMutation(ADD_USER_DOCUMENT);

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const userInfo = getUserFragment(newData.addUser);

      enqueueSnackbar("Success at creating a new user!", {
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
              getAllUsers: [...data.getAllUsers, newData.addUser],
            };
          } else {
            return {
              getAllUsers: [newData.addUser],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return mutateAddUser;
}

export function useAddTagToUser() {
  const [mutateAddTagToUser, { data: newData, error }] = useMutation(
    ADD_TAG_TO_USER_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const userInfo = getUserFragment(newData.addTagToUser);

      enqueueSnackbar("Success at adding tag!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_USERS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllUsers.length > 0) {
            return {
              ...data,
              getAllUsers: data.getAllUsers.map((user) =>
                userInfo.address ===
                getFragmentData(USER_INFO_FRAGMENT_DOCUMENT, user).address
                  ? newData.addTagToUser
                  : user,
              ),
            };
          } else {
            return {
              getAllUsers: [newData.addTagToUser],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return mutateAddTagToUser;
}

export function useRemoveTagFromUser() {
  const [mutateRemoveTagFromUser, { data: newData, error }] = useMutation(
    REMOVE_TAG_TO_USER_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const userInfo = getFragmentData(
        USER_INFO_FRAGMENT_DOCUMENT,
        newData.removeTagFromUser,
      );

      enqueueSnackbar("Success at removing tag!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_USERS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllUsers.length > 0) {
            return {
              ...data,
              getAllUsers: data.getAllUsers.map((user) =>
                userInfo.address ===
                getFragmentData(USER_INFO_FRAGMENT_DOCUMENT, user).address
                  ? newData.removeTagFromUser
                  : user,
              ),
            };
          } else {
            return {
              getAllUsers: [newData.removeTagFromUser],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return mutateRemoveTagFromUser;
}
