"use client";

import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { GetAllFollowerActionsQuery } from "@/graphql/gql/graphql";
import { getFragmentData, graphql } from "@/gql/index";

export const FOLLOWER_ACTION_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment FollowerActionInfo on FollowerAction {
    id
    taskId
    actionId
  }
`);

export const GET_ALL_FOLLOWER_ACTIONS_DOCUMENT = graphql(`
  query getAllFollowerActions {
    getAllFollowerActions {
      ...FollowerActionInfo
    }
  }
`);

export const FOLLOWER_ACTION_ADDED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription followerActionAdded {
    followerActionAdded {
      ...FollowerActionInfo
    }
  }
`);

function getFollowerActionFragment(
  action: GetAllFollowerActionsQuery["getAllFollowerActions"][number],
) {
  return getFragmentData(FOLLOWER_ACTION_INFO_FRAGMENT_DOCUMENT, action);
}

export function useGetAllFollowerActions() {
  const { data } = useQuery(GET_ALL_FOLLOWER_ACTIONS_DOCUMENT, {
    variables: {},
  });

  return useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getAllFollowerActions.map(getFollowerActionFragment);
  }, [data]);
}

export function useSubscribeFollowerAction() {
  const { data: newData, error: error1 } = useSubscription(
    FOLLOWER_ACTION_ADDED_SUBSCRIPTION_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error1) {
      const followerActionInfos = newData.followerActionAdded.map(
        getFollowerActionFragment,
      );

      enqueueSnackbar("New Follower Actions Created!", {
        variant: "info",
      });

      followerActionInfos.forEach((followerActionInfo) => {
        client.cache.updateQuery(
          {
            query: GET_ALL_FOLLOWER_ACTIONS_DOCUMENT,
            variables: {},
          },
          (data) => {
            if (data && data.getAllFollowerActions.length > 0) {
              const alreadyExists = data.getAllFollowerActions.filter(
                (followerAction) =>
                  followerActionInfo.id ===
                  getFragmentData(
                    FOLLOWER_ACTION_INFO_FRAGMENT_DOCUMENT,
                    followerAction,
                  ).id,
              );

              if (alreadyExists.length > 0) {
                return data;
              }

              return {
                ...data,
                getAllFollowerActions: [
                  ...data.getAllFollowerActions,
                  followerActionInfo,
                ],
              };
            } else {
              return {
                getAllFollowerActions: [followerActionInfo],
              };
            }
          },
        );
      });
    }
  }, [client.cache, enqueueSnackbar, error1, newData]);
}
