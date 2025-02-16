"use client";

import { useCallback, useEffect, useMemo } from "react";
import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useSnackbar } from "notistack";
import { getFragmentData, graphql } from "@/gql/index";
import {
  GetPnlSnapshotsQuery,
  PnlSnapshotKind,
  TradeHistory,
} from "@/graphql/gql/graphql";

import { PersonalTradeHistory, TradeActionType } from "@/types";

export const TRADEHISTORY_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment TradeHistoryInfo on TradeHistory {
    action
    address
    block
    collateralDelta
    collateralIndex
    collateralPriceUsd
    contractId
    date
    id
    leverage
    leverageDelta
    long
    marketPrice
    pair
    pnl
    price
    size
    tradeId
    tradeIndex
  }
`);

export const PNL_SNAPSHOT_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PnlSnapshotInfo on PnlSnapshot {
    accUSDPnl
    address
    contractId
    dateStr
    id
    kind
  }
`);

export const PNL_SNAPSHOT_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PnlSnapshotDetailsInfo on PnlSnapshotDetails {
    accUSDPnl
    address
    contractId
    dateStr
    histories {
      ...TradeHistoryInfo
    }
    id
    kind
  }
`);

export const GET_TRADE_TRANSACTION_COUNTS_DOCUMENT = graphql(`
  query getTradeTransactionCounts(
    $addresses: [String!]!
    $contractIds: [Int!]!
  ) {
    getTradeTransactionCounts(
      addresses: $addresses
      contractIds: $contractIds
    ) {
      daily
      weekly
      monthly
    }
  }
`);

export const GET_USER_TRANSACTION_COUNTS_DOCUMENT = graphql(`
  query getUserTransactionCounts($inputs: [GetUserTransactionCountsInput!]!) {
    getUserTransactionCounts(inputs: $inputs) {
      daily
      weekly
      monthly
    }
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
    $dateStr: String!
    $kind: PnlSnapshotKind!
    $first: Int!
    $after: Int
  ) {
    getPnlSnapshots(
      contractId: $contractId
      dateStr: $dateStr
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

export const GET_PNL_SNAPSHOTS_BY_ADDRESS_DOCUMENT = graphql(`
  query getPnlSnapshotsByAddress($address: String!, $dateStr: String!) {
    getPnlSnapshotsByAddress(address: $address, dateStr: $dateStr) {
      ...PnlSnapshotInfo
    }
  }
`);

export const GET_PNL_SNAPSHOT_INITIALIZED_FLAG_DOCUMENT = graphql(`
  query getPnlSnapshotInitializedFlag {
    getPnlSnapshotInitializedFlag {
      id
      dateStr
      isInit
    }
  }
`);

export const IS_PNL_SNAPSHOT_INITIALIZED_DOCUMENT = graphql(`
  query isPnlSnapshotInitialized($dateStr: String!) {
    isPnlSnapshotInitialized(dateStr: $dateStr) {
      id
      dateStr
      isInit
    }
  }
`);

export const BUILD_PNL_SNAPSHOTS_DOCUMENT = graphql(`
  mutation buildPnlSnapshots($endDate: DateTime!) {
    buildPnlSnapshots(endDate: $endDate) {
      id
      dateStr
      isInit
    }
  }
`);

function getPersonalTradeHistory(history: TradeHistory): PersonalTradeHistory {
  return {
    action: history.action as unknown as TradeActionType,
    address: history.address,
    block: history.block,
    collateralDelta: history.collateralDelta ? +history.collateralDelta : null,
    collateralIndex: history.collateralIndex,
    collateralPriceUsd: +history.collateralPriceUsd,
    date: history.date,
    leverage: history.leverage,
    leverageDelta: history.leverageDelta || null,
    long: history.long,
    marketPrice: history.marketPrice ? +history.marketPrice : null,
    pair: history.pair,
    pnl: +history.pnl,
    pnl_net: +history.pnl,
    price: +history.price,
    size: +history.size,
    tradeId: history.tradeId ? +history.tradeId : null,
    tradeIndex: history.tradeIndex,
    tx: "",
  };
}

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
      getPersonalTradeHistory(
        getFragmentData(TRADEHISTORY_INFO_FRAGMENT_DOCUMENT, history),
      ),
    ),
  };
}

export function useGetUserTransactionCounts(
  inputs: {
    address: string;
    contractId: number;
    startedAt: string | null;
  }[],
) {
  return useQuery(GET_USER_TRANSACTION_COUNTS_DOCUMENT, {
    variables: {
      inputs,
    },
  });
}

export function useGetTradeTransactionCounts(
  contractIds: number[],
  addresses: string[],
) {
  return useQuery(GET_TRADE_TRANSACTION_COUNTS_DOCUMENT, {
    variables: {
      contractIds,
      addresses,
    },
  });
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
      getPersonalTradeHistory(
        getFragmentData(TRADEHISTORY_INFO_FRAGMENT_DOCUMENT, history),
      ),
    );
  }, [data]);
}

export function useGetPnlSnapshots(
  dateStr: string,
  contractId: string | null,
  kind: PnlSnapshotKind,
) {
  const [query, { data, fetchMore, loading, error }] = useLazyQuery(
    GET_PNL_SNAPSHOTS_DOCUMENT,
  );

  useEffect(() => {
    query({
      variables: {
        dateStr,
        contractId: contractId ? +contractId : 0,
        kind,
        first: 20,
      },
    });
  }, [contractId, dateStr, kind, query]);

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

export function useGetPnlSnapshotInitializedFlag() {
  return useQuery(GET_PNL_SNAPSHOT_INITIALIZED_FLAG_DOCUMENT);
}

export function useGetPnlSnapshotsByAddress(dateStr: string, address: string) {
  const { data, loading } = useQuery(GET_PNL_SNAPSHOTS_BY_ADDRESS_DOCUMENT, {
    variables: {
      dateStr,
      address,
    },
  });

  const pnlSnapshots = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getPnlSnapshotsByAddress.map((snapshot) =>
      getFragmentData(PNL_SNAPSHOT_INFO_FRAGMENT_DOCUMENT, snapshot),
    );
  }, [data]);

  return {
    pnlSnapshots,
    loading,
  };
}

export function useIsPnlSnapshotInitialized(dateStr: string) {
  return useQuery(IS_PNL_SNAPSHOT_INITIALIZED_DOCUMENT, {
    variables: { dateStr },
  });
}

export function useBuildPnlSnapshots() {
  const [buildPnlSnapshots, { data, error, loading }] = useMutation(
    BUILD_PNL_SNAPSHOTS_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data?.buildPnlSnapshots && !error) {
      enqueueSnackbar("Success at building PNL snapshots!", {
        variant: "success",
      });

      const pnlSnapshotInitializedFlag = data.buildPnlSnapshots;

      client.cache.updateQuery(
        {
          query: IS_PNL_SNAPSHOT_INITIALIZED_DOCUMENT,
          variables: {
            dateStr: pnlSnapshotInitializedFlag.dateStr,
          },
        },
        (data) => {
          if (data && data.isPnlSnapshotInitialized) {
            return {
              ...data,
              isPnlSnapshotInitialized: pnlSnapshotInitializedFlag,
            };
          } else {
            return {
              isPnlSnapshotInitialized: pnlSnapshotInitializedFlag,
            };
          }
        },
      );

      client.cache.updateQuery(
        {
          query: GET_PNL_SNAPSHOT_INITIALIZED_FLAG_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getPnlSnapshotInitializedFlag) {
            const exists = data.getPnlSnapshotInitializedFlag.find(
              (item) => item.id === pnlSnapshotInitializedFlag.id,
            );

            if (exists) {
              return {
                ...data,
                getPnlSnapshotInitializedFlag:
                  data.getPnlSnapshotInitializedFlag.map((item) =>
                    item.id === pnlSnapshotInitializedFlag.id
                      ? pnlSnapshotInitializedFlag
                      : item,
                  ),
              };
            }

            return {
              ...data,
              getPnlSnapshotInitializedFlag: [
                ...data.getPnlSnapshotInitializedFlag,
                pnlSnapshotInitializedFlag,
              ],
            };
          } else {
            return {
              getPnlSnapshotInitializedFlag: [pnlSnapshotInitializedFlag],
            };
          }
        },
      );
    }
  }, [data, error, enqueueSnackbar, client]);

  return { buildPnlSnapshots, loading };
}
