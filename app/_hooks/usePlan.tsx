"use client";

import { useApolloClient, useMutation, useQuery } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import {
  PlanDetails,
  PlanDetailsInfoFragment,
  PlanStatus,
} from "@/graphql/gql/graphql";
import { getBotFragment } from "./useAutomation";

export const PLAN_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PlanDetailsInfo on PlanDetails {
    id
    title
    description
    status
    scheduledStart
    scheduledEnd
    startedAt
    endedAt
    bots {
      ...BotDetailsInfo
    }
  }
`);

export const GET_PLANS_BY_STATUS_DOCUMENT = graphql(`
  query getPlansByStatus($status: PlanStatus!) {
    getPlansByStatus(status: $status) {
      ...PlanDetailsInfo
    }
  }
`);

export const GET_PLAN_BY_ID_DOCUMENT = graphql(`
  query getPlanById($id: Int!) {
    getPlanById(id: $id) {
      ...PlanDetailsInfo
    }
  }
`);

export const CREATE_PLAN_DOCUMENT = graphql(`
  mutation createPlan($createPlanInput: CreatePlanInput!) {
    createPlan(createPlanInput: $createPlanInput) {
      ...PlanDetailsInfo
    }
  }
`);

export const UPDATE_PLAN_DOCUMENT = graphql(`
  mutation updatePlan($updatePlanInput: UpdatePlanInput!) {
    updatePlan(updatePlanInput: $updatePlanInput) {
      ...PlanDetailsInfo
    }
  }
`);

export const START_PLAN_DOCUMENT = graphql(`
  mutation startPlan($id: Int!) {
    startPlan(id: $id) {
      ...PlanDetailsInfo
    }
  }
`);

export const END_PLAN_DOCUMENT = graphql(`
  mutation endPlan($id: Int!) {
    endPlan(id: $id) {
      ...PlanDetailsInfo
    }
  }
`);

export const ADD_BOTS_TO_PLAN_DOCUMENT = graphql(`
  mutation addBotsToPlan($botIds: [Int!]!, $planId: Int!) {
    addBotsToPlan(botIds: $botIds, planId: $planId) {
      ...PlanDetailsInfo
    }
  }
`);

function getPlanFragment(
  plan: {
    __typename?: "PlanDetails";
  } & {
    " $fragmentRefs"?: {
      PlanDetailsInfoFragment: PlanDetailsInfoFragment;
    };
  },
): PlanDetails {
  const planInfo = getFragmentData(PLAN_DETAILS_INFO_FRAGMENT_DOCUMENT, plan);

  return {
    ...planInfo,
    bots: planInfo.bots.map(getBotFragment),
  };
}

export function useGetPlansByStatus(status?: PlanStatus) {
  const { data } = useQuery(GET_PLANS_BY_STATUS_DOCUMENT, {
    variables: status ? { status } : undefined,
  });

  return useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getPlansByStatus
      .map(getPlanFragment)
      .sort((a, b) => a.id - b.id);
  }, [data]);
}

export function useGetPlanById(id: number) {
  const { data } = useQuery(GET_PLAN_BY_ID_DOCUMENT, {
    variables: { id },
  });

  return useMemo(() => {
    if (!data?.getPlanById) {
      return null;
    }
    return getPlanFragment(data.getPlanById);
  }, [data]);
}

export function useCreatePlan() {
  const [createPlan, { data: newData, error, loading }] =
    useMutation(CREATE_PLAN_DOCUMENT);
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const planInfo = getPlanFragment(newData.createPlan);

      enqueueSnackbar("Success at creating new plan!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_PLANS_BY_STATUS_DOCUMENT,
          variables: { status: planInfo.status },
        },
        (data) => {
          if (data && data.getPlansByStatus.length > 0) {
            const alreadyExists = data.getPlansByStatus.filter(
              (plan) => planInfo.id === getPlanFragment(plan).id,
            );

            if (alreadyExists.length > 0) {
              return data;
            }

            return {
              ...data,
              getPlansByStatus: [...data.getPlansByStatus, planInfo],
            };
          } else {
            return {
              getPlansByStatus: [planInfo],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { createPlan, loading };
}

export function useStartPlan() {
  const [startPlan, { data: newData, error, loading }] =
    useMutation(START_PLAN_DOCUMENT);
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const planInfo = getPlanFragment(newData.startPlan);

      enqueueSnackbar("Success at starting plan!", {
        variant: "success",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: planInfo.__typename,
          id: planInfo.id,
        }),
        fragment: PLAN_DETAILS_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "PlanDetailsInfo",
        data: planInfo,
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
      const planInfo = getPlanFragment(newData.endPlan);

      enqueueSnackbar("Success at ending plan!", {
        variant: "success",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: planInfo.__typename,
          id: planInfo.id,
        }),
        fragment: PLAN_DETAILS_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "PlanDetailsInfo",
        data: planInfo,
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
      const planInfo = getPlanFragment(newData.addBotsToPlan);

      enqueueSnackbar("Success at adding bots to plan!", {
        variant: "success",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: planInfo.__typename,
          id: planInfo.id,
        }),
        fragment: PLAN_DETAILS_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "PlanDetailsInfo",
        data: planInfo,
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return { addBotsToPlan, loading };
}
