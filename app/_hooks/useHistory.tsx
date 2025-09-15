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
  Platform,
  GetPnlSnapshotsV2Query,
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
    buildPnlSnapshots(dateStr: $dateStr, isForceBuild: $isForceBuild)
  }
`);

export const DYNAMIC_SNAPSHOT_BUILD_DOCUMENT = graphql(`
  mutation dynamicSnapshotBuild($dateStr: String!) {
    dynamicSnapshotBuild(dateStr: $dateStr)
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

export const GET_WHOLE_COMPRESSED_HISTORIES_DOCUMENT_V2 = graphql(`
  query getWholeCompressedHistoriesV2(
    $platform: Platform!
    $startDate: String!
    $filterParams: [ExportFilter!]!
  ) {
    getWholeCompressedHistoriesV2(
      platform: $platform
      startDate: $startDate
      filterParams: $filterParams
    ) {
      accPnls {
        date
        in
        inOut
        out
        pnl
        positionCount
        taskCount
      }
      botCounts {
        botCount
        date
      }
      maxInvested
      uniqueTraders
      totalBots {
        address
        platform
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
  query getPerpEventLogs($addresses: [String!]!, $platform: Platform!) {
    getPerpEventLogs(addresses: $addresses, platform: $platform) {
      ...PerpTradingEventLogInfo
    }
  }
`);

export const GET_PNL_SNAPSHOT_V2_INITIALIZED_FLAG_DOCUMENT = graphql(`
  query getPnlSnapshotV2InitializedFlag($platform: Platform!) {
    getPnlSnapshotV2InitializedFlag(platform: $platform) {
      id
      dateStr
      isInit
      platform
    }
  }
`);

export const GET_PNL_SNAPSHOT_V2_DOCUMENT = graphql(`
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

export const GET_PNL_SNAPSHOT_V2_BY_PAGINATION = graphql(`
  query getPnlsnpashotsV2ByPagination(
    $dateStr: String!
    $kind: PnlSnapshotKind!
    $limit: Int!
    $page: Int!
    $platform: Platform!
  ) {
    getPnlsnpashotsV2ByPagination(
      dateStr: $dateStr
      platform: $platform
      kind: $kind
      limit: $limit
      page: $page
    ) {
      data {
        ...PnlSnapshotV2DetailsInfo
      }
      pageInfo {
        total
        page
        totalPages
      }
    }
  }
`);

export const IS_PNL_SNAPSHOT_V2_INITIALIZED_DOCUMENT = graphql(`
  query isPnlSnapshotV2Initialized($dateStr: String!, $platform: Platform!) {
    isPnlSnapshotV2Initialized(dateStr: $dateStr, platform: $platform) {
      id
      dateStr
      isInit
      platform
    }
  }
`);

export const GET_STATISTIC_DATA_DOCUMENT = graphql(`
  query getStatisticData {
    getStatisticData {
      size
      sumOfLost
      sumOfWin
      countOfLost
      countOfWin
    }
  }
`);

export const BUILD_PNL_SNAPSHOTS_V2_DOCUMENT = graphql(`
  mutation buildPnlSnapshotsV2(
    $dateStr: String!
    $isForceBuild: Boolean!
    $platform: Platform!
  ) {
    buildPnlSnapshotsV2(
      dateStr: $dateStr
      isForceBuild: $isForceBuild
      platform: $platform
    )
  }
`);

export const DYNAMIC_SNAPSHOT_BUILD_V2_DOCUMENT = graphql(`
  mutation dynamicSnapshotBuildV2($dateStr: String!, $platform: Platform!) {
    dynamicSnapshotBuildV2(dateStr: $dateStr, platform: $platform)
  }
`);

export const INITIALIZE_PNL_SNAPSHOT_V2_DOCUMENT = graphql(`
  mutation initializePnlSnapshotV2(
    $beginingDate: Date!
    $isForceBuild: Boolean!
    $platform: Platform!
  ) {
    initializePnlSnapshotV2(
      beginingDate: $beginingDate
      isForceBuild: $isForceBuild
      platform: $platform
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

function getPnlSnapshotV2Info(
  snapshot: GetPnlSnapshotsV2Query["getPnlSnapshotsV2"]["edges"][number]["node"],
) {
  const snapshotInfo = getFragmentData(
    PNL_SNAPSHOT_V2_DETAILS_INFO_FRAGMENT_DOCUMENT,
    snapshot,
  );

  return {
    ...snapshotInfo,
    perpTradingEventLogs: snapshotInfo.perpTradingEventLogs.map((eventLog) =>
      getFragmentData(GET_PERP_EVENT_LOGS_INFO_FRAGMENT_DOCUMENT, eventLog),
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

export function useGetWholeCompressedHistoriesV2(
  platform: Platform,
  startDate: string,
  filterParams: ExportFilter[],
) {
  const { data, loading } = useQuery(
    GET_WHOLE_COMPRESSED_HISTORIES_DOCUMENT_V2,
    {
      variables: {
        platform,
        startDate,
        filterParams,
      },
    },
  );

  return {
    accPnls: data?.getWholeCompressedHistoriesV2.accPnls || [],
    botCounts: data?.getWholeCompressedHistoriesV2.botCounts || [],
    maxInvested: data?.getWholeCompressedHistoriesV2.maxInvested || 0,
    uniqueTraders: data?.getWholeCompressedHistoriesV2.uniqueTraders || [],
    totalBots: data?.getWholeCompressedHistoriesV2?.totalBots || [],
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

export function useGetPnlSnapshotV2InitializedFlag(platform: Platform) {
  return useQuery(GET_PNL_SNAPSHOT_V2_INITIALIZED_FLAG_DOCUMENT, {
    variables: { platform },
  });
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

export function useIsPnlSnapshotV2Initialized(
  dateStr: string,
  platform: Platform,
) {
  return useQuery(IS_PNL_SNAPSHOT_V2_INITIALIZED_DOCUMENT, {
    variables: { dateStr, platform },
  });
}

export function useDynamicBuildPnlSnapshotsV2() {
  const [dynamicBuildPnlSnapshotsV2, { data, error, loading }] = useMutation(
    DYNAMIC_SNAPSHOT_BUILD_V2_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data?.dynamicSnapshotBuildV2 && !error) {
      enqueueSnackbar("Success at building PNL snapshots!", {
        variant: "success",
      });
    }
  }, [data, error, enqueueSnackbar, client]);

  return { dynamicBuildPnlSnapshotsV2, loading };
}

export function useBuildPnlSnapshotsV2() {
  const [buildPnlSnapshotsV2, { data, error, loading }] = useMutation(
    BUILD_PNL_SNAPSHOTS_V2_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data?.buildPnlSnapshotsV2 && !error) {
      enqueueSnackbar("Success at building PNL snapshots!", {
        variant: "success",
      });
    }
  }, [data, error, enqueueSnackbar, client]);

  return { buildPnlSnapshotsV2, loading };
}

export function useInitializePnlSnapshotV2() {
  const [initializePnlSnapshotV2, { data, error, loading }] = useMutation(
    INITIALIZE_PNL_SNAPSHOT_V2_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data?.initializePnlSnapshotV2 && !error) {
      enqueueSnackbar("Success at initializing PNL snapshots!", {
        variant: "success",
      });
    }
  }, [data, error, enqueueSnackbar, client]);

  return { initializePnlSnapshotV2, loading };
}

export function useGetPnlSnapshotsV2(
  dateStr: string,
  kind: PnlSnapshotKind,
  platform: Platform,
) {
  const [query, { data, fetchMore, loading, error }] = useLazyQuery(
    GET_PNL_SNAPSHOT_V2_DOCUMENT,
  );

  useEffect(() => {
    query({
      variables: {
        dateStr,
        kind,
        first: 20,
        platform,
      },
    });
  }, [dateStr, kind, query, platform]);

  const pnlSnapshots = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getPnlSnapshotsV2.edges.map((edge) =>
      getPnlSnapshotV2Info(edge.node),
    );
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error) {
      fetchMore({
        variables: {
          kind,
          first: 20,
          after: data.getPnlSnapshotsV2.pageInfo.endCursor,
          platform,
        },
      });
    }
  }, [data, error, fetchMore, kind, platform]);

  return {
    hasMore: data?.getPnlSnapshotsV2.pageInfo.hasNextPage,
    pnlSnapshots,
    fetchMore: handleFetchMore,
    loading,
  };
}

export function useGetPnlSnapshotsV2ForPagination(
  dateStr: string,
  kind: PnlSnapshotKind,
  platform: Platform,
  page: number,
  limit: number,
) {
  const { data, loading } = useQuery(GET_PNL_SNAPSHOT_V2_BY_PAGINATION, {
    variables: {
      dateStr,
      kind,
      platform,
      page,
      limit,
    },
  });

  const pnlSnapshots = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getPnlsnpashotsV2ByPagination.data.map(getPnlSnapshotV2Info);
  }, [data]);

  return {
    totalPages: data?.getPnlsnpashotsV2ByPagination.pageInfo.totalPages || 0,
    total: data?.getPnlsnpashotsV2ByPagination.pageInfo.total || 0,
    pnlSnapshots,
    loading,
  };
}

export function useGetStatisticData() {
  const { data, loading } = useQuery(GET_STATISTIC_DATA_DOCUMENT);

  return {
    statisticData: data?.getStatisticData,
    loading,
  };
}

export function useGetPerpEventLogs(addresses: string, platform: Platform) {
  const [query, { data, loading }] = useLazyQuery(GET_PERP_EVENT_LOGS_DOCUMENT);

  useEffect(() => {
    if (addresses.length > 0 && platform) {
      query({
        variables: {
          addresses: addresses.split(","),
          platform,
        },
      });
    }
  }, [addresses, platform, query]);

  const eventLogs = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getPerpEventLogs.map((eventLogs) =>
      eventLogs.map((eventLog) =>
        getFragmentData(GET_PERP_EVENT_LOGS_INFO_FRAGMENT_DOCUMENT, eventLog),
      ),
    );
  }, [data]);

  return {
    eventLogs,
    loading,
  };
}
