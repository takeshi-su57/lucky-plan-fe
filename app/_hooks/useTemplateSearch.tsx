"use client";

import { useEffect } from "react";
import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client/react";
import { graphql } from "@/gql/gql";
import {
  TemplateSearch,
  TemplateSearchWithTemplate,
  TemplateSearchWithTask,
  TemplateSearchStatus,
  BacktestTask,
} from "@/graphql/gql/graphql";
import { useSnackbar } from "notistack";
import { getFragmentData } from "@/graphql/gql";
import { BacktestTaskInfoFragment } from "./useBacktest";
import { StrategyTemplateInfoFragment } from "./useStrategyTemplate";

// ============================================
// Fragments
// ============================================

export const TemplateSearchInfoFragment = graphql(`
  fragment TemplateSearchInfo on TemplateSearch {
    id
    name
    templateId
    symbol
    startDate
    endDate
    interval
    searchStrategy
    status
    createdAt
    startedAt
    completedAt
    errorMessage
  }
`);

export const TemplateSearchWithTemplateInfoFragment = graphql(`
  fragment TemplateSearchWithTemplateInfo on TemplateSearchWithTemplate {
    id
    name
    templateId
    symbol
    startDate
    endDate
    interval
    searchStrategy
    status
    createdAt
    startedAt
    completedAt
    errorMessage
    template {
      ...StrategyTemplateInfo
    }
  }
`);

export const TemplateSearchWithTaskInfoFragment = graphql(`
  fragment TemplateSearchWithTaskInfo on TemplateSearchWithTask {
    id
    name
    templateId
    symbol
    startDate
    endDate
    interval
    searchStrategy
    status
    createdAt
    startedAt
    completedAt
    errorMessage
    template {
      ...StrategyTemplateInfo
    }
    task {
      ...BacktestTaskInfo
    }
  }
`);

// ============================================
// Queries
// ============================================

export const TemplateSearchQuery = graphql(`
  query TemplateSearch($id: ID!) {
    templateSearch(id: $id) {
      ...TemplateSearchInfo
    }
  }
`);

export const TemplateSearchWithTaskQuery = graphql(`
  query TemplateSearchWithTask($id: ID!) {
    templateSearchWithTask(id: $id) {
      ...TemplateSearchWithTaskInfo
    }
  }
`);

export const TemplateSearchesQuery = graphql(`
  query TemplateSearches($filter: TemplateSearchFilterInput) {
    templateSearches(filter: $filter) {
      ...TemplateSearchWithTemplateInfo
    }
  }
`);

export const TemplateSearchStatsQuery = graphql(`
  query TemplateSearchStats {
    templateSearchStats {
      await
      processing
      done
      failed
      cancelled
    }
  }
`);

export const TaskByTemplateSearchQuery = graphql(`
  query TaskByTemplateSearch($searchId: ID!) {
    taskByTemplateSearch(searchId: $searchId) {
      ...BacktestTaskInfo
    }
  }
`);

// ============================================
// Mutations
// ============================================

export const CreateTemplateSearchMutation = graphql(`
  mutation CreateTemplateSearch($input: CreateTemplateSearchInput!) {
    createTemplateSearch(input: $input) {
      ...TemplateSearchWithTemplateInfo
    }
  }
`);

export const CancelTemplateSearchMutation = graphql(`
  mutation CancelTemplateSearch($id: ID!) {
    cancelTemplateSearch(id: $id) {
      ...TemplateSearchInfo
    }
  }
`);

export const DeleteTemplateSearchMutation = graphql(`
  mutation DeleteTemplateSearch($id: ID!) {
    deleteTemplateSearch(id: $id)
  }
`);

// ============================================
// Subscriptions
// ============================================

export const TemplateSearchUpdatedSubscription = graphql(`
  subscription TemplateSearchUpdated {
    templateSearchUpdated {
      ...TemplateSearchInfo
    }
  }
`);

// ============================================
// Hooks
// ============================================

export function useTemplateSearch(id: string | null) {
  const { data, loading, error, refetch } = useQuery(TemplateSearchQuery, {
    variables: { id: id! },
    skip: !id,
  });

  return {
    search: getFragmentData(TemplateSearchInfoFragment, data?.templateSearch) ?? null,
    loading,
    error,
    refetch,
  };
}

export function useTemplateSearchWithTask(id: string | null) {
  const { data, loading, error, refetch } = useQuery(
    TemplateSearchWithTaskQuery,
    {
      variables: { id: id! },
      skip: !id,
    },
  );

  const rawSearchData = data?.templateSearchWithTask;
  const searchData = rawSearchData ? getFragmentData(TemplateSearchWithTaskInfoFragment, rawSearchData) : null;

  if (!searchData) {
    return {
      search: null,
      loading,
      error,
      refetch,
    };
  }

  return {
    search: {
      ...searchData,
      template: getFragmentData(StrategyTemplateInfoFragment, searchData.template),
      task: searchData.task ? getFragmentData(BacktestTaskInfoFragment, searchData.task) : null,
    },
    loading,
    error,
    refetch,
  };
}

export function useTemplateSearches(filters?: {
  templateId?: string;
  status?: TemplateSearchStatus;
  limit?: number;
  offset?: number;
}) {
  const { data, loading, error, refetch, fetchMore } = useQuery(
    TemplateSearchesQuery,
    {
      variables: {
        filter: {
          templateId: filters?.templateId,
          status: filters?.status,
          limit: filters?.limit ?? 20,
          offset: filters?.offset ?? 0,
        },
      },
      fetchPolicy: "cache-and-network",
    },
  );

  const searches = (data?.templateSearches ?? []).map((item) => {
    const searchData = getFragmentData(TemplateSearchWithTemplateInfoFragment, item);
    if (!searchData) return null;
    return {
      ...searchData,
      template: getFragmentData(StrategyTemplateInfoFragment, searchData.template),
    };
  }).filter((item) => item !== null);

  return {
    searches,
    loading,
    error,
    refetch,
    fetchMore,
  };
}

export function useTemplateSearchStats() {
  const { data, loading, error, refetch } = useQuery(TemplateSearchStatsQuery, {
    fetchPolicy: "cache-and-network",
  });

  return {
    stats: data?.templateSearchStats,
    loading,
    error,
    refetch,
  };
}

export function useTaskByTemplateSearch(searchId: string | null) {
  const { data, loading, error, refetch } = useQuery(
    TaskByTemplateSearchQuery,
    {
      variables: { searchId: searchId! },
      skip: !searchId,
    },
  );

  return {
    task: getFragmentData(BacktestTaskInfoFragment, data?.taskByTemplateSearch) ?? null,
    loading,
    error,
    refetch,
  };
}

// ============================================
// Mutation Hooks
// ============================================

export function useCreateTemplateSearch() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    CreateTemplateSearchMutation,
    {
      refetchQueries: [TemplateSearchesQuery, TemplateSearchStatsQuery],
      onCompleted: () => {
        enqueueSnackbar("Template search created successfully", {
          variant: "success",
        });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to create template search: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    createSearch: mutate,
    loading,
    error,
  };
}

export function useCancelTemplateSearch() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    CancelTemplateSearchMutation,
    {
      refetchQueries: [TemplateSearchesQuery, TemplateSearchStatsQuery],
      onCompleted: () => {
        enqueueSnackbar("Template search cancelled", { variant: "info" });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to cancel search: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    cancelSearch: mutate,
    loading,
    error,
  };
}

export function useDeleteTemplateSearch() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    DeleteTemplateSearchMutation,
    {
      refetchQueries: [TemplateSearchesQuery, TemplateSearchStatsQuery],
      onCompleted: () => {
        enqueueSnackbar("Template search deleted", { variant: "success" });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to delete search: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    deleteSearch: mutate,
    loading,
    error,
  };
}

// ============================================
// Subscription Hooks
// ============================================

export function useSubscribeTemplateSearch() {
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useSubscription(
    TemplateSearchUpdatedSubscription,
  );

  useEffect(() => {
    if (data?.templateSearchUpdated && !error) {
      const searchInfo = getFragmentData(
        TemplateSearchInfoFragment,
        data.templateSearchUpdated,
      );

      if (searchInfo) {
        // Update the cache with new search data
        client.cache.writeFragment({
          id: client.cache.identify({
            __typename: "TemplateSearch",
            id: searchInfo.id,
          }),
          fragment: TemplateSearchInfoFragment,
          fragmentName: "TemplateSearchInfo",
          data: {
            __typename: "TemplateSearch",
            ...searchInfo,
          },
        });

        // Show notification for status changes
        if (searchInfo.status === TemplateSearchStatus.Done) {
          enqueueSnackbar(`Search "${searchInfo.name}" completed`, {
            variant: "success",
          });
        } else if (searchInfo.status === TemplateSearchStatus.Failed) {
          enqueueSnackbar(`Search "${searchInfo.name}" failed`, {
            variant: "error",
          });
        }
      }
    }
  }, [client.cache, data, error, enqueueSnackbar]);

  const searchUpdate = data?.templateSearchUpdated
    ? getFragmentData(TemplateSearchInfoFragment, data.templateSearchUpdated)
    : null;

  return {
    searchUpdate,
    loading,
    error,
  };
}
