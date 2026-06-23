"use client";

import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client/react";

import { getFragmentData, graphql } from "@/gql/index";
import { useCallback, useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import {
  BotForwardDetails,
  PlanForwardDetailsInfoFragment,
  PlanForwardDetails,
  PlanInfoFragment,
  PlanSummary,
  PlanStatus,
  Platform,
} from "@/graphql/gql/graphql";
import { getBotForwardDetails } from "./useAutomation";
import { PlanMessage } from "../_components/PlansWidget/PlanMessage";
import { useAccount } from "wagmi";

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
    userId
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
    userId
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

export const PLAN_SUMMARY_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PlanSummaryInfo on PlanSummary {
    id
    title
    description
    status
    scheduledStart
    scheduledEnd
    startedAt
    endedAt
    userId
    botCount
  }
`);

export const GET_PLAN_SUMMARIES_BY_STATUS_DOCUMENT = graphql(`
  query getPlanSummariesByStatus(
    $status: PlanStatus!
    $after: Int
    $first: Int!
  ) {
    getPlanSummariesByStatus(status: $status, after: $after, first: $first) {
      edges {
        cursor
        node {
          ...PlanSummaryInfo
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
      ...PlanInfo
    }
  }
`);

export const GET_PLAN_BOT_GROUPS_DOCUMENT = graphql(`
  query getPlanBotGroups($planId: Int!, $page: Int!, $pageSize: Int!) {
    getPlanBotGroups(planId: $planId, page: $page, pageSize: $pageSize) {
      items {
        leaderAddress
        platform
        hasDefault
        bots {
          ...BotForwardDetailsInfo
        }
      }
      totalGroups
      totalPages
      currentPage
    }
  }
`);

export const CREATE_PLAN_DOCUMENT = graphql(`
  mutation createPlan($createPlanInput: CreatePlanInput!) {
    createPlan(createPlanInput: $createPlanInput) {
      ...PlanInfo
    }
  }
`);

export const UPDATE_PLAN_DOCUMENT = graphql(`
  mutation updatePlan($updatePlanInput: UpdatePlanInput!) {
    updatePlan(updatePlanInput: $updatePlanInput) {
      ...PlanInfo
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
    startPlan(id: $id)
  }
`);

export const END_PLAN_DOCUMENT = graphql(`
  mutation endPlan($id: Int!) {
    endPlan(id: $id)
  }
`);

export const PLAN_CREATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription planCreated($userId: String!) {
    planCreated(userId: $userId) {
      ...PlanInfo
    }
  }
`);

export const PLAN_UPDATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription planUpdated($userId: String!) {
    planUpdated(userId: $userId) {
      ...PlanInfo
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

export function useGetPlanSummariesByStatus(status: PlanStatus) {
  const [query, { data, fetchMore, loading, error }] = useLazyQuery(
    GET_PLAN_SUMMARIES_BY_STATUS_DOCUMENT,
  );

  useEffect(() => {
    query({
      variables: {
        status,
        first: 20,
      },
    });
  }, [query, status]);

  const plans = useMemo((): PlanSummary[] => {
    if (!data) {
      return [];
    }
    return data.getPlanSummariesByStatus.edges.map((edge) => {
      const info = getFragmentData(
        PLAN_SUMMARY_INFO_FRAGMENT_DOCUMENT,
        edge.node,
      );
      return { ...info };
    });
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error) {
      fetchMore({
        variables: {
          status,
          first: 20,
          after: data.getPlanSummariesByStatus.pageInfo.endCursor,
        },
      });
    }
  }, [data, error, fetchMore, status]);

  return {
    plans,
    loading,
    fetchMore: handleFetchMore,
    hasMore: data?.getPlanSummariesByStatus.pageInfo.hasNextPage,
  };
}

export function useLivePlanSummaries() {
  const createdPlans = useGetPlanSummariesByStatus(PlanStatus.Created);
  const startedPlans = useGetPlanSummariesByStatus(PlanStatus.Started);
  const stoppedPlans = useGetPlanSummariesByStatus(PlanStatus.Stopped);

  const handleFetchMore = useCallback(() => {
    createdPlans.fetchMore();
    startedPlans.fetchMore();
    stoppedPlans.fetchMore();
  }, [createdPlans, startedPlans, stoppedPlans]);

  const plans = useMemo(
    () => [...createdPlans.plans, ...startedPlans.plans, ...stoppedPlans.plans],
    [createdPlans.plans, startedPlans.plans, stoppedPlans.plans],
  );

  return {
    plans,
    loading:
      createdPlans.loading || startedPlans.loading || stoppedPlans.loading,
    fetchMore: handleFetchMore,
    hasMore:
      createdPlans.hasMore || startedPlans.hasMore || stoppedPlans.hasMore,
  };
}

export function useFinishedPlanSummaries() {
  const finishedPlans = useGetPlanSummariesByStatus(PlanStatus.Finished);

  return {
    ...finishedPlans,
  };
}

export function useSubscribePlan() {
  const { address } = useAccount();

  const { data: newData, error: error1 } = useSubscription(
    PLAN_CREATED_SUBSCRIPTION_DOCUMENT,
    {
      variables: {
        userId: address?.toLowerCase() ?? "",
      },
      skip: !address,
    },
  );
  const { data: updatedData, error: error2 } = useSubscription(
    PLAN_UPDATED_SUBSCRIPTION_DOCUMENT,
    {
      variables: {
        userId: address?.toLowerCase() ?? "",
      },
      skip: !address,
    },
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  const writePlanToCache = useCallback(
    (planInfo: PlanInfoFragment) => {
      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: "Plan",
          id: planInfo.id,
        }),
        fragment: PLAN_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "PlanInfo",
        data: {
          __typename: "Plan",
          ...planInfo,
        },
      });

      client.cache.updateQuery(
        {
          query: GET_PLAN_BY_ID_DOCUMENT,
          variables: { id: planInfo.id },
        },
        (oldData) => {
          if (!oldData?.getPlanById) {
            return oldData;
          }

          return {
            ...oldData,
            getPlanById: {
              ...oldData.getPlanById,
              ...planInfo,
              __typename: "Plan" as const,
            },
          };
        },
      );
    },
    [client.cache],
  );

  useEffect(() => {
    if (updatedData && !error2) {
      const planInfo = getFragmentData(
        PLAN_INFO_FRAGMENT_DOCUMENT,
        updatedData.planUpdated,
      );

      writePlanToCache(planInfo);

      enqueueSnackbar(<PlanMessage plan={planInfo} />, {
        variant: "info",
      });

      const oldPlanForwardDetails = client.cache.readFragment({
        id: client.cache.identify({
          __typename: "PlanForwardDetails",
          id: planInfo.id,
        }),
        fragment: PLAN_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "PlanForwardDetailsInfo",
      });

      if (oldPlanForwardDetails) {
        const updatedPlanForwardDetails = {
          ...oldPlanForwardDetails,
          description: planInfo.description,
          endedAt: planInfo.endedAt,
          id: planInfo.id,
          scheduledEnd: planInfo.scheduledEnd,
          scheduledStart: planInfo.scheduledStart,
          startedAt: planInfo.startedAt,
          status: planInfo.status,
          title: planInfo.title,
        };

        client.cache.writeFragment({
          id: client.cache.identify({
            __typename: "PlanForwardDetails",
            id: planInfo.id,
          }),
          fragment: PLAN_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
          fragmentName: "PlanForwardDetailsInfo",
          data: updatedPlanForwardDetails,
        });

        if (oldPlanForwardDetails.status !== updatedPlanForwardDetails.status) {
          // remove from old status query
          client.cache.updateQuery(
            {
              query: GET_PLANS_BY_STATUS_DOCUMENT,
              variables: {
                status: oldPlanForwardDetails.status,
                first: 20,
              },
            },
            (oldData) => {
              if (oldData) {
                return {
                  ...oldData,
                  getPlansByStatus: {
                    ...oldData.getPlansByStatus,
                    edges: oldData.getPlansByStatus.edges.filter(
                      (edge) => edge.cursor !== updatedPlanForwardDetails.id,
                    ),
                  },
                };
              } else {
                return oldData;
              }
            },
          );

          // add to new status query
          client.cache.updateQuery(
            {
              query: GET_PLANS_BY_STATUS_DOCUMENT,
              variables: {
                status: updatedPlanForwardDetails.status,
                first: 20,
              },
            },
            (oldData: any) => {
              if (oldData) {
                return {
                  ...oldData,
                  getPlansByStatus: {
                    ...oldData.getPlansByStatus,
                    edges: oldData.getPlansByStatus.edges.map((edge: any) =>
                      edge.cursor === updatedPlanForwardDetails.id
                        ? { ...edge, node: updatedPlanForwardDetails }
                        : edge,
                    ),
                  },
                };
              } else {
                return oldData;
              }
            },
          );

          // Move plan summary between status caches
          const oldStatus = oldPlanForwardDetails.status;

          // Remove from old summary status cache
          client.cache.updateQuery(
            {
              query: GET_PLAN_SUMMARIES_BY_STATUS_DOCUMENT,
              variables: { status: oldStatus, first: 20 },
            },
            (oldData: any) => {
              if (!oldData) return oldData;
              return {
                ...oldData,
                getPlanSummariesByStatus: {
                  ...oldData.getPlanSummariesByStatus,
                  edges: oldData.getPlanSummariesByStatus.edges.filter(
                    (edge: any) => edge.cursor !== planInfo.id,
                  ),
                },
              };
            },
          );
        }
      }
    }
  }, [
    client.cache,
    enqueueSnackbar,
    error1,
    error2,
    newData,
    updatedData,
    writePlanToCache,
  ]);

  useEffect(() => {
    if (newData && !error1) {
      const planInfo = getFragmentData(
        PLAN_INFO_FRAGMENT_DOCUMENT,
        newData.planCreated,
      );

      writePlanToCache(planInfo);

      enqueueSnackbar(<PlanMessage plan={planInfo} />, {
        variant: "info",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: "PlanForwardDetails",
          id: planInfo.id,
        }),
        fragment: PLAN_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "PlanForwardDetailsInfo",
        data: {
          __typename: "PlanForwardDetails",
          description: planInfo.description,
          endedAt: planInfo.endedAt,
          id: planInfo.id,
          scheduledEnd: planInfo.scheduledEnd,
          scheduledStart: planInfo.scheduledStart,
          startedAt: planInfo.startedAt,
          status: planInfo.status,
          title: planInfo.title,
          userId: planInfo.userId,
          bots: [],
        },
      });

      const planForwardDetails = client.cache.readFragment({
        id: client.cache.identify({
          __typename: "PlanForwardDetails",
          id: planInfo.id,
        }),
        fragment: PLAN_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "PlanForwardDetailsInfo",
      });

      if (planForwardDetails) {
        client.cache.updateQuery(
          {
            query: GET_PLANS_BY_STATUS_DOCUMENT,
            variables: {
              status: PlanStatus.Created,
              first: 20,
            },
          },
          (oldData: any) => {
            if (oldData) {
              return {
                ...oldData,
                getPlansByStatus: {
                  ...oldData.getPlansByStatus,
                  edges: oldData.getPlansByStatus.edges.map((edge: any) =>
                    edge.cursor === planForwardDetails.id
                      ? { ...edge, node: planForwardDetails }
                      : edge,
                  ),
                },
              };
            } else {
              return oldData;
            }
          },
        );
      }
    }
  }, [client.cache, enqueueSnackbar, error1, newData, writePlanToCache]);
}

export function useGetPlanById(id: number) {
  const { data } = useQuery(GET_PLAN_BY_ID_DOCUMENT, {
    variables: { id },
  });

  return useMemo(() => {
    if (!data?.getPlanById) {
      return null;
    }
    const planInfo = getFragmentData(
      PLAN_INFO_FRAGMENT_DOCUMENT,
      data.getPlanById,
    );
    return { ...planInfo };
  }, [data]);
}

export type BotGroupData = {
  leaderAddress: string;
  platform: Platform;
  hasDefault: boolean;
  bots: BotForwardDetails[];
};

export function useGetPlanBotGroups(
  planId: number,
  page: number,
  pageSize: number = 10,
) {
  const { data, loading } = useQuery(GET_PLAN_BOT_GROUPS_DOCUMENT, {
    variables: {
      planId,
      page,
      pageSize,
    },
    fetchPolicy: "network-only",
  });

  const botGroups = useMemo((): BotGroupData[] => {
    if (!data) {
      return [];
    }
    return data.getPlanBotGroups.items.map((item) => ({
      leaderAddress: item.leaderAddress,
      platform: item.platform,
      hasDefault: item.hasDefault,
      bots: item.bots.map((bot) => getBotForwardDetails(bot)),
    }));
  }, [data]);

  return {
    botGroups,
    loading,
    totalGroups: data?.getPlanBotGroups.totalGroups ?? 0,
    totalPages: data?.getPlanBotGroups.totalPages ?? 0,
    currentPage: data?.getPlanBotGroups.currentPage ?? 1,
  };
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

      // remove from old status query
      client.cache.updateQuery(
        {
          query: GET_PLANS_BY_STATUS_DOCUMENT,
          variables: {
            status: PlanStatus.Created,
            first: 20,
          },
        },
        (oldData) => {
          if (oldData) {
            return {
              ...oldData,
              getPlansByStatus: {
                ...oldData.getPlansByStatus,
                edges: oldData.getPlansByStatus.edges.filter(
                  (edge) => edge.cursor !== newData.deletePlan,
                ),
              },
            };
          } else {
            return oldData;
          }
        },
      );

      // Remove from Created status summary cache
      client.cache.updateQuery(
        {
          query: GET_PLAN_SUMMARIES_BY_STATUS_DOCUMENT,
          variables: { status: PlanStatus.Created, first: 20 },
        },
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            getPlanSummariesByStatus: {
              ...oldData.getPlanSummariesByStatus,
              edges: oldData.getPlanSummariesByStatus.edges.filter(
                (edge: any) => edge.cursor !== newData.deletePlan,
              ),
            },
          };
        },
      );
    }

    if (newData && error) {
      enqueueSnackbar("Error at deleting plan!", {
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
