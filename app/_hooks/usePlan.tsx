"use client";

import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useCallback, useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import {
  PlanForwardDetailsInfoFragment,
  PlanForwardDetails,
  PlanStatus,
} from "@/graphql/gql/graphql";
import { getBotForwardDetails } from "./useAutomation";

export const PLAN_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PlanInfo on Plan {
    id
    title
    description
    status
    scheduledStart
    scheduledEnd
    startedAt
    endedAt
  }
`);

export const PLAN_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PlanForwardDetailsInfo on PlanForwardDetails {
    id
    title
    description
    status
    scheduledStart
    scheduledEnd
    startedAt
    endedAt
    bots {
      ...BotForwardDetailsInfo
    }
  }
`);

export const GET_PLANS_BY_STATUS_DOCUMENT = graphql(`
  query getPlansByStatus($status: PlanStatus!, $after: Int, $first: Int!) {
    getPlansByStatus(status: $status, after: $after, first: $first) {
      edges {
        cursor
        node {
          ...PlanForwardDetailsInfo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const GET_PLAN_BY_ID_DOCUMENT = graphql(`
  query getPlanById($id: Int!) {
    getPlanById(id: $id) {
      ...PlanForwardDetailsInfo
    }
  }
`);

export const CREATE_PLAN_DOCUMENT = graphql(`
  mutation createPlan($createPlanInput: CreatePlanInput!) {
    createPlan(createPlanInput: $createPlanInput) {
      ...PlanForwardDetailsInfo
    }
  }
`);

export const UPDATE_PLAN_DOCUMENT = graphql(`
  mutation updatePlan($updatePlanInput: UpdatePlanInput!) {
    updatePlan(updatePlanInput: $updatePlanInput) {
      ...PlanForwardDetailsInfo
    }
  }
`);

export const DELETE_PLAN_DOCUMENT = graphql(`
  mutation deletePlan($id: Int!) {
    deletePlan(id: $id)
  }
`);

export const START_PLAN_DOCUMENT = graphql(`
  mutation startPlan($id: Int!) {
    startPlan(id: $id) {
      ...PlanForwardDetailsInfo
    }
  }
`);

export const END_PLAN_DOCUMENT = graphql(`
  mutation endPlan($id: Int!) {
    endPlan(id: $id) {
      ...PlanForwardDetailsInfo
    }
  }
`);

export const ADD_BOTS_TO_PLAN_DOCUMENT = graphql(`
  mutation addBotsToPlan($botIds: [Int!]!, $planId: Int!) {
    addBotsToPlan(botIds: $botIds, planId: $planId) {
      ...PlanForwardDetailsInfo
    }
  }
`);

export function getPlanForwardDetails(
  plan: {
    __typename?: "PlanForwardDetails";
  } & {
    " $fragmentRefs"?: {
      PlanForwardDetailsInfoFragment: PlanForwardDetailsInfoFragment;
    };
  },
): PlanForwardDetails {
  const planInfo = getFragmentData(
    PLAN_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
    plan,
  );

  return {
    ...planInfo,
    bots: planInfo.bots.map((bot) => getBotForwardDetails(bot)),
  };
}

export function useGetPlansByStatus(status: PlanStatus) {
  const [query, { data, fetchMore, loading, error }] = useLazyQuery(
    GET_PLANS_BY_STATUS_DOCUMENT,
  );

  useEffect(() => {
    query({
      variables: {
        status,
        first: 20,
      },
    });
  }, [query, status]);

  const plans = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getPlansByStatus.edges.map((edge) =>
      getPlanForwardDetails(edge.node),
    );
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error) {
      fetchMore({
        variables: {
          status,
          first: 20,
          after: data.getPlansByStatus.pageInfo.endCursor,
        },
      });
    }
  }, [data, error, fetchMore, status]);

  return {
    plans,
    loading,
    fetchMore: handleFetchMore,
    hasMore: data?.getPlansByStatus.pageInfo.hasNextPage,
  };
}

export function useGetPlanById(id: number) {
  const { data } = useQuery(GET_PLAN_BY_ID_DOCUMENT, {
    variables: { id },
  });

  return useMemo(() => {
    if (!data?.getPlanById) {
      return null;
    }
    return getPlanForwardDetails(data.getPlanById);
  }, [data]);
}

export function useCreatePlan() {
  const [createPlan, { data: newData, error, loading }] =
    useMutation(CREATE_PLAN_DOCUMENT);
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at creating new plan!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at creating new plan!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { createPlan, loading };
}

export function useDeletePlan() {
  const [deletePlan, { data: newData, error, loading }] =
    useMutation(DELETE_PLAN_DOCUMENT);
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at deleting plan!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at creating new plan!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { deletePlan, loading };
}

export function useStartPlan() {
  const [startPlan, { data: newData, error, loading }] =
    useMutation(START_PLAN_DOCUMENT);
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at starting plan!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at starting plan!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { startPlan, loading };
}

export function useEndPlan() {
  const [endPlan, { data: newData, error, loading }] =
    useMutation(END_PLAN_DOCUMENT);

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at ending plan!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at ending plan!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { endPlan, loading };
}

export function useAddBotsToPlan() {
  const [addBotsToPlan, { data: newData, error, loading }] = useMutation(
    ADD_BOTS_TO_PLAN_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at adding bots to plan!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at adding bots to plan!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { addBotsToPlan, loading };
}
