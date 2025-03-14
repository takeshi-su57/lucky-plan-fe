"use client";

import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import {
  TagInfoFragment,
  GetAllWalletAccountsQuery,
} from "@/graphql/gql/graphql";

import { TAG_INFO_FRAGMENT_DOCUMENT } from "./useTag";

export const WALLET_ACCOUNT_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment WalletAccountInfo on WalletAccount {
    address
    tags {
      ...TagInfo
    }
  }
`);

export const GET_ALL_WALLET_ACCOUNTS_DOCUMENT = graphql(`
  query getAllWalletAccounts {
    getAllWalletAccounts {
      ...WalletAccountInfo
    }
  }
`);

export const ADD_WALLET_ACCOUNT_DOCUMENT = graphql(`
  mutation addWalletAccount($input: AddUserInput!) {
    addWalletAccount(input: $input) {
      ...WalletAccountInfo
    }
  }
`);

export const ADD_TAG_TO_WALLET_ACCOUNT_DOCUMENT = graphql(`
  mutation addTagToWalletAccount($input: ChangeUserTagInput!) {
    addTagToWalletAccount(input: $input) {
      ...WalletAccountInfo
    }
  }
`);

export const REMOVE_TAG_TO_WALLET_ACCOUNT_DOCUMENT = graphql(`
  mutation removeTagFromWalletAccount($input: ChangeUserTagInput!) {
    removeTagFromWalletAccount(input: $input) {
      ...WalletAccountInfo
    }
  }
`);

function getWalletAccountFragment(
  walletAccount: GetAllWalletAccountsQuery["getAllWalletAccounts"][number],
) {
  const walletAccountInfo = getFragmentData(
    WALLET_ACCOUNT_INFO_FRAGMENT_DOCUMENT,
    walletAccount,
  );

  return {
    ...walletAccountInfo,
    tags: [
      ...walletAccountInfo.tags.map((tag) =>
        getFragmentData(TAG_INFO_FRAGMENT_DOCUMENT, tag),
      ),
    ],
  };
}

export function useGetAllWalletAccounts() {
  const { data } = useQuery(GET_ALL_WALLET_ACCOUNTS_DOCUMENT, {
    variables: {},
  });

  return useMemo(() => {
    const tagsMap = new Map<string, TagInfoFragment[]>();

    if (!data) {
      return { walletAccounts: [], tagsMap };
    }

    const walletAccounts = data.getAllWalletAccounts.map(
      getWalletAccountFragment,
    );

    walletAccounts.forEach((walletAccount) => {
      const arr = tagsMap.get(walletAccount.address.toLowerCase());

      if (arr) {
        arr.push(...walletAccount.tags);
      } else {
        tagsMap.set(walletAccount.address.toLowerCase(), walletAccount.tags);
      }
    });

    return {
      walletAccounts,
      tagsMap,
    };
  }, [data]);
}

export function useGetWalletAccountsByTags(tags: string[]) {
  const { walletAccounts } = useGetAllWalletAccounts();

  return useMemo(() => {
    return walletAccounts.filter((walletAccount) => {
      const walletAccountTags = walletAccount.tags.map((tag) => tag.tag);

      return tags
        .filter((tag) => tag.trim() !== "")
        .every((tag) => walletAccountTags.includes(tag));
    });
  }, [tags, walletAccounts]);
}

export function useGetTagsByAddress(address: string) {
  const { tagsMap } = useGetAllWalletAccounts();

  return useMemo(() => {
    return tagsMap.get(address.toLowerCase()) || [];
  }, [address, tagsMap]);
}

export function useAddNewUser() {
  const [mutateAddWalletAccount, { data: newData, error }] = useMutation(
    ADD_WALLET_ACCOUNT_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const walletAccountInfo = getWalletAccountFragment(
        newData.addWalletAccount,
      );

      enqueueSnackbar("Success at creating a new user!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_WALLET_ACCOUNTS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllWalletAccounts.length > 0) {
            const alreadyExists = data.getAllWalletAccounts.filter(
              (walletAccount) =>
                walletAccountInfo.address ===
                getFragmentData(
                  WALLET_ACCOUNT_INFO_FRAGMENT_DOCUMENT,
                  walletAccount,
                ).address,
            );

            if (alreadyExists.length > 0) {
              return data;
            }

            return {
              ...data,
              getAllWalletAccounts: [
                ...data.getAllWalletAccounts,
                newData.addWalletAccount,
              ],
            };
          } else {
            return {
              getAllWalletAccounts: [newData.addWalletAccount],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return mutateAddWalletAccount;
}

export function useAddTagToWalletAccount() {
  const [mutateAddTagToWalletAccount, { data: newData, error }] = useMutation(
    ADD_TAG_TO_WALLET_ACCOUNT_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const walletAccountInfo = getWalletAccountFragment(
        newData.addTagToWalletAccount,
      );

      enqueueSnackbar("Success at adding tag!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_WALLET_ACCOUNTS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllWalletAccounts.length > 0) {
            const exists = data.getAllWalletAccounts.find(
              (walletAccount) =>
                walletAccountInfo.address ===
                getFragmentData(
                  WALLET_ACCOUNT_INFO_FRAGMENT_DOCUMENT,
                  walletAccount,
                ).address,
            );

            if (exists) {
              return {
                ...data,
                getAllWalletAccounts: data.getAllWalletAccounts.map(
                  (walletAccount) =>
                    walletAccountInfo.address ===
                    getFragmentData(
                      WALLET_ACCOUNT_INFO_FRAGMENT_DOCUMENT,
                      walletAccount,
                    ).address
                      ? newData.addTagToWalletAccount
                      : walletAccount,
                ),
              };
            } else {
              return {
                ...data,
                getAllWalletAccounts: [
                  ...data.getAllWalletAccounts,
                  newData.addTagToWalletAccount,
                ],
              };
            }
          } else {
            return {
              getAllWalletAccounts: [newData.addTagToWalletAccount],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return mutateAddTagToWalletAccount;
}

export function useRemoveTagFromWalletAccount() {
  const [mutateRemoveTagFromWalletAccount, { data: newData, error }] =
    useMutation(REMOVE_TAG_TO_WALLET_ACCOUNT_DOCUMENT);

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const walletAccountInfo = getWalletAccountFragment(
        newData.removeTagFromWalletAccount,
      );

      enqueueSnackbar("Success at removing tag!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_WALLET_ACCOUNTS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllWalletAccounts.length > 0) {
            return {
              ...data,
              getAllWalletAccounts: data.getAllWalletAccounts.map(
                (walletAccount) =>
                  walletAccountInfo.address ===
                  getFragmentData(
                    WALLET_ACCOUNT_INFO_FRAGMENT_DOCUMENT,
                    walletAccount,
                  ).address
                    ? newData.removeTagFromWalletAccount
                    : walletAccount,
              ),
            };
          } else {
            return {
              getAllWalletAccounts: [newData.removeTagFromWalletAccount],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return mutateRemoveTagFromWalletAccount;
}
