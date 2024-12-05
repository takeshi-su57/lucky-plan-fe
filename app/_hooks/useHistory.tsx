"use client";

import { useQuery } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useMemo } from "react";
import { GetPnlSnapshotsQuery, PnlSnapshotKind } from "@/graphql/gql/graphql";

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

export function useGetAllTradeHistory(variables?: {
  address: string;
  contractId: number;
}) {
  const { data } = useQuery(GET_ALL_TRADEHISTORIES_DOCUMENT, { variables });

  return useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getTradeHistories.map((history) =>
      getFragmentData(TRADEHISTORY_INFO_FRAGMENT_DOCUMENT, history),
    );
  }, [data]);
}

export function useGetPnlSnapshots(variables?: {
  contractId: number;
  kind: PnlSnapshotKind;
}) {
  const { data, fetchMore, loading } = useQuery(GET_PNL_SNAPSHOTS_DOCUMENT, {
    variables: variables
      ? {
          ...variables,
          first: 20,
        }
      : undefined,
  });

  const pnlSnapshots = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getPnlSnapshots.edges.map((edge) =>
      getPnlSnapshotInfo(edge.node),
    );
  }, [data]);

  return {
    pnlSnapshots,
    fetchMore,
    loading,
  };
}
