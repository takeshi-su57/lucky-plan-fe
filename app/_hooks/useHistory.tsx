"use client";

import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useCallback, useEffect, useMemo } from "react";
import { GetPnlSnapshotsQuery, PnlSnapshotKind } from "@/graphql/gql/graphql";
import { useSnackbar } from "notistack";

export const TRADEHISTORY_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment TradeHistoryInfo on TradeHistory {
    address
    blockNumber
    contractId
    eventName
    id
    in
    out
    pnl
    timestamp
  }
`);

export const PNL_SNAPSHOT_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PnlSnapshotDetailsInfo on PnlSnapshotDetails {
    accUSDPnl
    address
    contractId
    histories {
      ...TradeHistoryInfo
    }
    id
    kind
  }
`);

export const GET_ALL_TRADEHISTORIES_DOCUMENT = graphql(`
  query getTradeHistories($address: String!, $contractId: Int!) {
    getTradeHistories(address: $address, contractId: $contractId) {
      ...TradeHistoryInfo
    }
  }
`);

export const GET_PNL_SNAPSHOTS_DOCUMENT = graphql(`
  query getPnlSnapshots(
    $contractId: Int!
    $kind: PnlSnapshotKind!
    $first: Int!
    $after: Int
  ) {
    getPnlSnapshots(
      contractId: $contractId
      kind: $kind
      first: $first
      after: $after
    ) {
      edges {
        cursor
        node {
          ...PnlSnapshotDetailsInfo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const INITIALIZE_PNL_SNAPSHOT_DOCUMENT = graphql(`
  mutation initalizePnlSnapshot {
    initalizePnlSnapshot
  }
`);

function getPnlSnapshotInfo(
  snapshot: GetPnlSnapshotsQuery["getPnlSnapshots"]["edges"][number]["node"],
) {
  const snapshotInfo = getFragmentData(
    PNL_SNAPSHOT_DETAILS_INFO_FRAGMENT_DOCUMENT,
    snapshot,
  );

  return {
    ...snapshotInfo,
    histories: snapshotInfo.histories.map((history) =>
      getFragmentData(TRADEHISTORY_INFO_FRAGMENT_DOCUMENT, history),
    ),
  };
}

export function useGetAllTradeHistory(
  address: string | null,
  contractId: string | null,
) {
  const [query, { data }] = useLazyQuery(GET_ALL_TRADEHISTORIES_DOCUMENT);

  useEffect(() => {
    if (address && contractId) {
      query({
        variables: {
          address,
          contractId: +contractId,
        },
      });
    }
  }, [address, contractId, query]);

  return useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getTradeHistories.map((history) =>
      getFragmentData(TRADEHISTORY_INFO_FRAGMENT_DOCUMENT, history),
    );
  }, [data]);
}

export function useGetPnlSnapshots(
  contractId: string | null,
  kind: PnlSnapshotKind,
) {
  const [query, { data, fetchMore, loading, error }] = useLazyQuery(
    GET_PNL_SNAPSHOTS_DOCUMENT,
  );

  useEffect(() => {
    if (contractId) {
      query({
        variables: {
          contractId: +contractId,
          kind,
          first: 20,
        },
      });
    }
  }, [contractId, kind, query]);

  const pnlSnapshots = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getPnlSnapshots.edges.map((edge) =>
      getPnlSnapshotInfo(edge.node),
    );
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error && contractId) {
      fetchMore({
        variables: {
          contractId: +contractId,
          kind,
          first: 20,
          after: data.getPnlSnapshots.pageInfo.endCursor,
        },
      });
    }
  }, [contractId, data, error, fetchMore, kind]);

  return {
    hasMore: data?.getPnlSnapshots.pageInfo.hasNextPage,
    pnlSnapshots,
    fetchMore: handleFetchMore,
    loading,
  };
}

export function useInitalizePnlSnapshot() {
  const [initailizePnlSnapshot, { data, error }] = useMutation(
    INITIALIZE_PNL_SNAPSHOT_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.initalizePnlSnapshot) {
        enqueueSnackbar("Success at initialize pnl snapshot!", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Failed at initialize pnl snapshot", {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return initailizePnlSnapshot;
}
