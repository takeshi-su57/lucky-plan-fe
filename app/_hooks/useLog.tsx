"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { getFragmentData, graphql } from "@/gql/index";
import { LogSeverity } from "@/graphql/gql/graphql";

export const LOG_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment LogInfo on Log {
    id
    severity
    summary
    details
    timestamp
    checked
  }
`);

export const GET_LOGS_DOCUMENT = graphql(`
  query allLogs(
    $severity: LogSeverity
    $checked: Boolean!
    $first: Int!
    $after: Int
  ) {
    allLogs(
      severity: $severity
      checked: $checked
      first: $first
      after: $after
    ) {
      edges {
        cursor
        node {
          ...LogInfo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const GET_LOGS_SEVERITY_COUNTS_DOCUMENT = graphql(`
  query getLogsSeverityCounts {
    getLogsSeverityCounts {
      severity
      counts
    }
  }
`);

export const CHECK_LOG_DOCUMENT = graphql(`
  mutation checkLog($id: Int!) {
    checkLog(id: $id) {
      ...LogInfo
    }
  }
`);

export const SUBSCRIBE_NEW_LOG_DOCUMENT = graphql(`
  subscription newLog($checked: Boolean!, $severity: LogSeverity) {
    newLog(checked: $checked, severity: $severity) {
      ...LogInfo
    }
  }
`);

export function useGetLogs(severity: LogSeverity | null, checked: boolean) {
  const [query, { data, fetchMore, loading, error, subscribeToMore }] =
    useLazyQuery(GET_LOGS_DOCUMENT);

  useEffect(() => {
    query({
      variables: {
        severity,
        checked,
        first: 20,
      },
    });
  }, [query, severity, checked]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: SUBSCRIBE_NEW_LOG_DOCUMENT,
      variables: { checked, severity },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newLog = getFragmentData(
          LOG_INFO_FRAGMENT_DOCUMENT,
          subscriptionData.data.newLog,
        );

        return {
          ...prev,
          allLogs: {
            ...prev.allLogs,
            edges: [
              {
                __typename: "LogsEdge",
                cursor: newLog.id,
                node: newLog,
              },
              ...prev.allLogs.edges,
            ],
          },
        };
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore, checked, severity]);

  const logs = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.allLogs.edges.map((edge) =>
      getFragmentData(LOG_INFO_FRAGMENT_DOCUMENT, edge.node),
    );
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error) {
      fetchMore({
        variables: {
          severity,
          checked,
          first: 20,
          after: data.allLogs.pageInfo.endCursor,
        },
      });
    }
  }, [data, error, fetchMore, severity, checked]);

  return {
    hasMore: data?.allLogs.pageInfo.hasNextPage,
    logs,
    fetchMore: handleFetchMore,
    loading,
  };
}

export function useGetLogsSeverityCounts() {
  return useQuery(GET_LOGS_SEVERITY_COUNTS_DOCUMENT, { pollInterval: 6_000 });
}

export function useCheckLog() {
  const [checkLog, { data: newData, error }] = useMutation(CHECK_LOG_DOCUMENT);
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const logInfo = getFragmentData(
        LOG_INFO_FRAGMENT_DOCUMENT,
        newData.checkLog,
      );

      enqueueSnackbar("Success at checking log!", {
        variant: "success",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: "Log",
          id: logInfo.id,
        }),
        fragment: LOG_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "LogInfo",
        data: logInfo,
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return checkLog;
}
