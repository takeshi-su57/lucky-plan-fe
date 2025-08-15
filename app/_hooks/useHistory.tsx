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
  ExportFilter,
  PnlSnapshotKind,
  GetPnlSnapshotsQuery,
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
    isCounterTrade
    meta
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

export const GET_PERP_EVENT_LOGS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PerpTradingEventLogInfo on PerpTradingEventLog {
    address
    block
    contractId
    date
    id
    jsonLog
    logIndex
    platform
    usdPnl
  }
`);

export const PNL_SNAPSHOT_V2_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PnlSnapshotV2DetailsInfo on PnlSnapshotV2Details {
    accUSDPnl
    address
    dateStr
    id
    kind
    perpTradingEventLogs {
      ...PerpTradingEventLogInfo
    }
    platform
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
    $dateStr: String!
    $kind: PnlSnapshotKind!
    $first: Int!
    $after: Int
  ) {
    getPnlSnapshots(
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
  mutation buildPnlSnapshots($dateStr: String!, $isForceBuild: Boolean!) {
    buildPnlSnapshots(dateStr: $dateStr, isForceBuild: $isForceBuild) {
      id
      dateStr
      isInit
    }
  }
`);

export const DYNAMIC_SNAPSHOT_BUILD_DOCUMENT = graphql(`
  mutation dynamicSnapshotBuild($dateStr: String!) {
    dynamicSnapshotBuild(dateStr: $dateStr) {
      id
      dateStr
      isInit
    }
  }
`);

export const INITIALIZE_PNL_SNAPSHOT_DOCUMENT = graphql(`
  mutation initializePnlSnapshot(
    $beginingDate: Date!
    $isForceBuild: Boolean!
  ) {
    initializePnlSnapshot(
      beginingDate: $beginingDate
      isForceBuild: $isForceBuild
    )
  }
`);

export const AUTO_TESTING_DOCUMENT = graphql(`
  mutation autoTesting {
    autoTesting
  }
`);

export const GET_DEV_PNL_SNAPSHOTS_DOCUMENT = graphql(`
  query getDevPnlSnapshots($dateStr: String!, $filterParams: [ExportFilter!]!) {
    getDevPnlSnapshots(dateStr: $dateStr, filterParams: $filterParams) {
      accUSDPnl
      address
      contractId
      dateStr
      histories {
        ...TradeHistoryInfo
      }
      id
      kind
      score
    }
  }
`);

export const GET_WHOLE_COMPRESSED_HISTORIES_DOCUMENT = graphql(`
  query getWholeCompressedHistories(
    $startDate: String!
    $isTestnet: Boolean!
    $filterParams: [ExportFilter!]!
  ) {
    getWholeCompressedHistories(
      startDate: $startDate
      isTestnet: $isTestnet
      filterParams: $filterParams
    ) {
      accPnls {
        pnl
        in
        out
        inOut
        date
        positionCount
        taskCount
        traderCount
      }
      botCounts {
        botCount
        date
      }
      maxInvested
      actionTypeCount
      uniqueTraders
      totalBots {
        address
        contractId
        dateStr
      }
    }
  }
`);

export const GET_TESTING_REPORT_DOCUMENT = graphql(`
  query getTestingReport($first: Int!, $after: Int) {
    getTestingReport(first: $first, after: $after) {
      edges {
        cursor
        node {
          maxAvgSize
          minAvgSize
          maxCount
          minCount
          avgLoss
          monthWeight
          threeMonthWeight
          weekWeight
          allTimeWeight
          avgProfit
          bottomAccProfit
          calculatedR2
          calculatedSlope
          id
          investedUSD
          lossCount
          m
          maxLoss
          maxProfit
          minR2
          minScore
          n
          peakAccProfit
          profitCount
          totalPositions
          totalTasks
          totalTraders
          totalUSDPnl
          totalUniqueTraders
          usdPnls
          window
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const GET_PERP_EVENT_LOGS_DOCUMENT = graphql(`
  query getPerpEventLogs($address: String!, $platform: Platform!) {
    getPerpEventLogs(address: $address, platform: $platform) {
      ...PerpTradingEventLogInfo
    }
  }
`);

export const GET_PNL_SNAPSHOT_V2_INITIALIZED_FLAG_DOCUMENT = graphql(`
  query getPnlSnapshotV2InitializedFlag {
    getPnlSnapshotV2InitializedFlag {
      id
      dateStr
      isInit
    }
  }
`);

export const GET_PNL_SNAPSHOT_V2_DETAILS_DOCUMENT = graphql(`
  query getPnlSnapshotsV2(
    $dateStr: String!
    $platform: Platform!
    $first: Int!
    $after: Int
    $kind: PnlSnapshotKind!
  ) {
    getPnlSnapshotsV2(
      dateStr: $dateStr
      platform: $platform
      first: $first
      after: $after
      kind: $kind
    ) {
      edges {
        cursor
        node {
          ...PnlSnapshotV2DetailsInfo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const IS_PNL_SNAPSHOT_V2_INITIALIZED_DOCUMENT = graphql(`
  query isPnlSnapshotV2Initialized($dateStr: String!) {
    isPnlSnapshotV2Initialized(dateStr: $dateStr) {
      id
      dateStr
      isInit
    }
  }
`);

export const BUILD_PNL_SNAPSHOTS_V2_DOCUMENT = graphql(`
  mutation buildPnlSnapshotsV2($dateStr: String!, $isForceBuild: Boolean!) {
    buildPnlSnapshotsV2(dateStr: $dateStr, isForceBuild: $isForceBuild) {
      id
      dateStr
      isInit
    }
  }
`);

export const DYNAMIC_SNAPSHOT_BUILD_V2_DOCUMENT = graphql(`
  mutation dynamicSnapshotBuildV2($dateStr: String!) {
    dynamicSnapshotBuildV2(dateStr: $dateStr) {
      id
      dateStr
      isInit
    }
  }
`);

export const INITIALIZE_PNL_SNAPSHOT_V2_DOCUMENT = graphql(`
  mutation initializePnlSnapshotV2(
    $beginingDate: Date!
    $isForceBuild: Boolean!
  ) {
    initializePnlSnapshotV2(
      beginingDate: $beginingDate
      isForceBuild: $isForceBuild
    )
  }
`);

export function getPersonalTradeHistory(
  history: TradeHistory,
): PersonalTradeHistory {
  return {
    contractId: history.contractId,
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
    isCounterTrade: history.isCounterTrade || false,
    meta: history.meta ? JSON.parse(history.meta) : {},
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
  const [query, { data, loading }] = useLazyQuery(
    GET_ALL_TRADEHISTORIES_DOCUMENT,
  );

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

  const histories = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getTradeHistories.map((history) =>
      getPersonalTradeHistory(
        getFragmentData(TRADEHISTORY_INFO_FRAGMENT_DOCUMENT, history),
      ),
    );
  }, [data]);

  return {
    histories,
    loading,
  };
}

export function useGetPnlSnapshots(dateStr: string, kind: PnlSnapshotKind) {
  const [query, { data, fetchMore, loading, error }] = useLazyQuery(
    GET_PNL_SNAPSHOTS_DOCUMENT,
  );

  useEffect(() => {
    query({
      variables: {
        dateStr,
        kind,
        first: 20,
      },
    });
  }, [dateStr, kind, query]);

  const pnlSnapshots = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getPnlSnapshots.edges.map((edge) =>
      getPnlSnapshotInfo(edge.node),
    );
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error) {
      fetchMore({
        variables: {
          kind,
          first: 20,
          after: data.getPnlSnapshots.pageInfo.endCursor,
        },
      });
    }
  }, [data, error, fetchMore, kind]);

  return {
    hasMore: data?.getPnlSnapshots.pageInfo.hasNextPage,
    pnlSnapshots,
    fetchMore: handleFetchMore,
    loading,
  };
}

export function useGetDevPnlSnapshots(
  dateStr: string,
  filterParams: ExportFilter[],
) {
  const { data, loading } = useQuery(GET_DEV_PNL_SNAPSHOTS_DOCUMENT, {
    variables: {
      dateStr,
      filterParams,
    },
  });

  const pnlSnapshots = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getDevPnlSnapshots.map((item) => ({
      ...item,
      histories: item.histories.map((history) =>
        getPersonalTradeHistory(
          getFragmentData(TRADEHISTORY_INFO_FRAGMENT_DOCUMENT, history),
        ),
      ),
    }));
  }, [data]);

  return {
    pnlSnapshots,
    loading,
  };
}

export function useGetWholeCompressedHistories(
  startDate: string,
  isTestnet: boolean,
  filterParams: ExportFilter[],
) {
  const { data, loading } = useQuery(GET_WHOLE_COMPRESSED_HISTORIES_DOCUMENT, {
    variables: {
      startDate,
      isTestnet,
      filterParams,
    },
  });

  return {
    accPnls: data?.getWholeCompressedHistories.accPnls || [],
    botCounts: data?.getWholeCompressedHistories.botCounts || [],
    maxInvested: data?.getWholeCompressedHistories.maxInvested || 0,
    actionTypeCount: data?.getWholeCompressedHistories.actionTypeCount || 0,
    uniqueTraders: data?.getWholeCompressedHistories.uniqueTraders || [],
    totalBots: data?.getWholeCompressedHistories?.totalBots || [],
    loading,
  };
}

export function useGetTestingReport() {
  const { data, loading, fetchMore, error } = useQuery(
    GET_TESTING_REPORT_DOCUMENT,
    {
      variables: {
        first: 20,
      },
    },
  );

  const reports = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getTestingReport.edges
      .map((edge) => edge.node)
      .filter((item) => item.usdPnls.length > 0);
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error) {
      fetchMore({
        variables: {
          first: 20,
          after: data.getTestingReport.pageInfo.endCursor,
        },
      });
    }
  }, [data, error, fetchMore]);

  return {
    hasMore: data?.getTestingReport.pageInfo.hasNextPage,
    reports,
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
    DYNAMIC_SNAPSHOT_BUILD_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data?.dynamicSnapshotBuild && !error) {
      enqueueSnackbar("Success at building PNL snapshots!", {
        variant: "success",
      });

      const pnlSnapshotInitializedFlag = data.dynamicSnapshotBuild;

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

export function useInitializePnlSnapshot() {
  const [initializePnlSnapshot, { data, error, loading }] = useMutation(
    INITIALIZE_PNL_SNAPSHOT_DOCUMENT,
  );

  const { refetch } = useGetPnlSnapshotInitializedFlag();

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data?.initializePnlSnapshot && !error) {
      enqueueSnackbar("Success at initializing PNL snapshots!", {
        variant: "success",
      });

      refetch();
    }
  }, [data, error, enqueueSnackbar, client, refetch]);

  return { initializePnlSnapshot, loading };
}

export function useAutoTesting() {
  const [autoTesting, { loading }] = useMutation(AUTO_TESTING_DOCUMENT);

  return { autoTesting, loading };
}
