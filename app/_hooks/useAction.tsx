"use client";

import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { GetAllActionsQuery } from "@/graphql/gql/graphql";
import { getFragmentData, graphql } from "@/gql/index";

export const ACTION_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment ActionInfo on Action {
    id
    name
    positionId
    args
    blockNumber
    orderInBlock
    createdAt
  }
`);

export const GET_ALL_ACTIONS_DOCUMENT = graphql(`
  query getAllActions {
    getAllActions {
      ...ActionInfo
    }
  }
`);

export const ACTION_ADDED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription actionAdded {
    actionAdded {
      ...ActionInfo
    }
  }
`);

function getActionFragment(
  action: GetAllActionsQuery["getAllActions"][number],
) {
  return getFragmentData(ACTION_INFO_FRAGMENT_DOCUMENT, action);
}

export function useGetAllActions() {
  const { data } = useQuery(GET_ALL_ACTIONS_DOCUMENT, { variables: {} });

  return useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getAllActions.map(getActionFragment);
  }, [data]);
}

export function useSubscribeAction() {
  const { data: newData, error: error1 } = useSubscription(
    ACTION_ADDED_SUBSCRIPTION_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error1) {
      const actionInfos = newData.actionAdded.map(getActionFragment);

      enqueueSnackbar("New Actions Created!", {
        variant: "info",
      });

      actionInfos.forEach((actionInfo) => {
        client.cache.writeFragment({
          id: client.cache.identify({
            __typename: actionInfo.__typename,
            id: actionInfo.id,
          }),
          fragment: ACTION_INFO_FRAGMENT_DOCUMENT,
          data: actionInfo,
        });
      });
    }
  }, [client.cache, enqueueSnackbar, error1, newData]);
}
