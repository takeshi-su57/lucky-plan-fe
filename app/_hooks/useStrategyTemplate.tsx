"use client";

import {
  useApolloClient,
  useMutation,
  useQuery,
} from "@apollo/client/react";
import { graphql } from "@/gql/gql";
import {
  StrategyTemplate,
  StrategyTemplateWithStats,
  StrategyCategory,
} from "@/graphql/gql/graphql";
import { useSnackbar } from "notistack";
import { getFragmentData } from "@/graphql/gql";

// ============================================
// Fragments
// ============================================

export const StrategyTemplateInfoFragment = graphql(`
  fragment StrategyTemplateInfo on StrategyTemplate {
    id
    name
    description
    category
    factoryConfig
    isActive
    createdAt
    updatedAt
  }
`);

export const StrategyTemplateWithStatsInfoFragment = graphql(`
  fragment StrategyTemplateWithStatsInfo on StrategyTemplateWithStats {
    id
    name
    description
    category
    factoryConfig
    isActive
    createdAt
    updatedAt
    totalSearches
    totalTasks
  }
`);

// ============================================
// Queries
// ============================================

export const StrategyTemplateQuery = graphql(`
  query StrategyTemplate($id: ID!) {
    strategyTemplate(id: $id) {
      ...StrategyTemplateInfo
    }
  }
`);

export const StrategyTemplatesQuery = graphql(`
  query StrategyTemplates(
    $category: StrategyCategory
    $isActive: Boolean
    $limit: Int
    $offset: Int
  ) {
    strategyTemplates(
      category: $category
      isActive: $isActive
      limit: $limit
      offset: $offset
    ) {
      ...StrategyTemplateInfo
    }
  }
`);

export const StrategyTemplateWithStatsQuery = graphql(`
  query StrategyTemplateWithStats($id: ID!) {
    strategyTemplateWithStats(id: $id) {
      ...StrategyTemplateWithStatsInfo
    }
  }
`);

// ============================================
// Mutations
// ============================================

export const CreateStrategyTemplateMutation = graphql(`
  mutation CreateStrategyTemplate($input: CreateStrategyTemplateInput!) {
    createStrategyTemplate(input: $input) {
      ...StrategyTemplateInfo
    }
  }
`);

export const UpdateStrategyTemplateMutation = graphql(`
  mutation UpdateStrategyTemplate($input: UpdateStrategyTemplateInput!) {
    updateStrategyTemplate(input: $input) {
      ...StrategyTemplateInfo
    }
  }
`);

export const DeleteStrategyTemplateMutation = graphql(`
  mutation DeleteStrategyTemplate($id: ID!) {
    deleteStrategyTemplate(id: $id)
  }
`);

// ============================================
// Hooks
// ============================================

export function useStrategyTemplate(id: string | null) {
  const { data, loading, error, refetch } = useQuery(StrategyTemplateQuery, {
    variables: { id: id! },
    skip: !id,
  });

  return {
    template: getFragmentData(StrategyTemplateInfoFragment, data?.strategyTemplate) ?? null,
    loading,
    error,
    refetch,
  };
}

export function useStrategyTemplates(filters?: {
  category?: StrategyCategory;
  isActive?: boolean;
  limit?: number;
  offset?: number;
}) {
  const { data, loading, error, refetch, fetchMore } = useQuery(
    StrategyTemplatesQuery,
    {
      variables: {
        category: filters?.category,
        isActive: filters?.isActive,
        limit: filters?.limit ?? 20,
        offset: filters?.offset ?? 0,
      },
      fetchPolicy: "cache-and-network",
    },
  );

  return {
    templates: (data?.strategyTemplates ?? [])
      .map((item) => getFragmentData(StrategyTemplateInfoFragment, item) ?? null)
      .filter((item) => item !== null) as StrategyTemplate[],
    loading,
    error,
    refetch,
    fetchMore,
  };
}

export function useStrategyTemplateWithStats(id: string | null) {
  const { data, loading, error, refetch } = useQuery(
    StrategyTemplateWithStatsQuery,
    {
      variables: { id: id! },
      skip: !id,
    },
  );

  return {
    template: getFragmentData(
      StrategyTemplateWithStatsInfoFragment,
      data?.strategyTemplateWithStats,
    ) ?? null,
    loading,
    error,
    refetch,
  };
}

// ============================================
// Mutation Hooks
// ============================================

export function useCreateStrategyTemplate() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    CreateStrategyTemplateMutation,
    {
      refetchQueries: [StrategyTemplatesQuery],
      onCompleted: () => {
        enqueueSnackbar("Strategy template created successfully", {
          variant: "success",
        });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to create template: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    createTemplate: mutate,
    loading,
    error,
  };
}

export function useUpdateStrategyTemplate() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    UpdateStrategyTemplateMutation,
    {
      refetchQueries: [StrategyTemplatesQuery],
      onCompleted: () => {
        enqueueSnackbar("Strategy template updated successfully", {
          variant: "success",
        });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to update template: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    updateTemplate: mutate,
    loading,
    error,
  };
}

export function useDeleteStrategyTemplate() {
  const { enqueueSnackbar } = useSnackbar();
  const [mutate, { loading, error }] = useMutation(
    DeleteStrategyTemplateMutation,
    {
      refetchQueries: [StrategyTemplatesQuery],
      onCompleted: () => {
        enqueueSnackbar("Strategy template deleted", { variant: "success" });
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to delete template: ${err.message}`, {
          variant: "error",
        });
      },
    },
  );

  return {
    deleteTemplate: mutate,
    loading,
    error,
  };
}
