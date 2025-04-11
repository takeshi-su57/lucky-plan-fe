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
import { TestParams } from "../_components/DevWidget/v1/TestParams";
import { TestParamsV2 } from "../_components/DevWidget/v2/TestParamsV2";
import { TestParamsV3 } from "../_components/DevWidget/v3/TestParamsV3";

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

export const GET_DEV_PNL_SNAPSHOTS_DOCUMENT = graphql(`
  query getDevPnlSnapshots($dateStr: String!, $filterParams: ExportFilter!) {
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
      regression {
        chi2
        intercept
        r
        r2
        rmsd
        slope
      }
      statistic {
        averageIn
        countIn
      }
    }
  }
`);

export const GET_MONTHLY_DEV_PNL_SNAPSHOTS_DOCUMENT = graphql(`
  query getMonthlyDevPnlSnapshots(
    $dateStr: String!
    $filterParams: ExportFilter!
  ) {
    getMonthlyDevPnlSnapshots(dateStr: $dateStr, filterParams: $filterParams) {
      ...TradeHistoryInfo
    }
  }
`);

export const GET_WHOLE_RESULT_HISTORIES_DOCUMENT = graphql(`
  query getWholeResultHistories($filterParams: ExportFilter!) {
    getWholeResultHistories(filterParams: $filterParams) {
      ...TradeHistoryInfo
    }
  }
`);

export const GET_WHOLE_COMPRESSED_HISTORIES_DOCUMENT = graphql(`
  query getWholeCompressedHistories($filterParams: ExportFilter!) {
    getWholeCompressedHistories(filterParams: $filterParams) {
      accPnls {
        pnl
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
    }
  }
`);

export const GET_WHOLE_COMPRESSED_HISTORIES_V2_DOCUMENT = graphql(`
  query getWholeCompressedHistoriesV2($filterParams: [ExportFilterV2!]!) {
    getWholeCompressedHistoriesV2(filterParams: $filterParams) {
      accPnls {
        pnl
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
    }
  }
`);

export const GET_TESTING_REPORT_DOCUMENT = graphql(`
  query getTestingReport($first: Int!, $after: Int) {
    getTestingReport(first: $first, after: $after) {
      edges {
        cursor
        node {
          avgLoss
          avgProfit
          bottomAccProfit
          calculatedR2
          calculatedSlope
          closePositionCountsByPnlSnapshotKind
          id
          investedUSD
          lossCount
          maxLoss
          maxProfit
          maxR2
          maxSlope
          minR2
          minSlope
          peakAccProfit
          profitCount
          recentTradedDays
          totalPositions
          totalTasks
          totalTraders
          totalUSDPnl
          totalUniqueTraders
          usdPnls
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const GET_TESTING_REPORT_V2_DOCUMENT = graphql(`
  query getTestingReportV2($first: Int!, $after: Int) {
    getTestingReportV2(first: $first, after: $after) {
      edges {
        cursor
        node {
          avgLoss
          avgProfit
          bottomAccProfit
          calculatedR2
          calculatedSlope
          id
          investedUSD
          lossCount
          maxLoss
          maxProfit
          maxSlope
          minSlope
          peakAccProfit
          profitCount
          r2MinsByPnlSnapshotKind
          totalPositions
          totalTasks
          totalTraders
          totalUSDPnl
          totalUniqueTraders
          usdPnls
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const GET_WHOLE_COMPRESSED_HISTORIES_V3_DOCUMENT = graphql(`
  query getWholeCompressedHistoriesV3($filterParams: [ExportFilterV3!]!) {
    getWholeCompressedHistoriesV3(filterParams: $filterParams) {
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
    }
  }
`);

export const GET_TESTING_REPORT_V3_DOCUMENT = graphql(`
  query getTestingReportV3($first: Int!, $after: Int) {
    getTestingReportV3(first: $first, after: $after) {
      edges {
        cursor
        node {
          avgLoss
          avgProfit
          bottomAccProfit
          calculatedR2
          calculatedSlope
          id
          investedUSD
          lossCount
          maxCount
          maxLoss
          maxProfit
          maxSize
          minCount
          minR2
          minSize
          peakAccProfit
          profitCount
          totalPositions
          totalTasks
          totalTraders
          totalUSDPnl
          totalUniqueTraders
          usdPnls
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const GET_WHOLE_COMPRESSED_HISTORIES_V4_DOCUMENT = graphql(`
  query getWholeCompressedHistoriesV4(
    $filterParams: [ExportFilterV3!]!
    $ratio: Float!
    $startDate: String!
  ) {
    getWholeCompressedHistoriesV4(
      filterParams: $filterParams
      ratio: $ratio
      startDate: $startDate
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

export const GET_DEV_PNL_SNAPSHOTS_V4_DOCUMENT = graphql(`
  query getDevPnlSnapshotsV4(
    $dateStr: String!
    $filterParams: [ExportFilterV3!]!
    $ratio: Float!
  ) {
    getDevPnlSnapshotsV4(
      dateStr: $dateStr
      filterParams: $filterParams
      ratio: $ratio
    ) {
      accUSDPnl
      address
      contractId
      dateStr
      histories {
        ...TradeHistoryInfo
      }
      id
      kind
      regression {
        chi2
        intercept
        r
        r2
        rmsd
        slope
      }
      statistic {
        averageIn
        countIn
      }
    }
  }
`);

export const GET_TESTING_REPORT_V4_DOCUMENT = graphql(`
  query getTestingReportV4($first: Int!, $after: Int) {
    getTestingReportV4(first: $first, after: $after) {
      edges {
        cursor
        node {
          avgLoss
          avgProfit
          bottomAccProfit
          calculatedR2
          calculatedSlope
          id
          investedUSD
          lossCount
          maxCount
          maxLoss
          maxProfit
          maxSize
          minCount
          minR2
          minSize
          peakAccProfit
          profitCount
          totalPositions
          totalTasks
          totalTraders
          totalUSDPnl
          totalUniqueTraders
          usdPnls
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

export const AUTO_TESTING_DOCUMENT = graphql(`
  mutation autoTesting($startDate: String!) {
    autoTesting(startDate: $startDate)
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
    $beginingDate: DateTime!
    $isForceBuild: Boolean!
  ) {
    initializePnlSnapshot(
      beginingDate: $beginingDate
      isForceBuild: $isForceBuild
    )
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

export function useGetDevPnlSnapshots(dateStr: string, testParams: TestParams) {
  const { data, loading } = useQuery(GET_DEV_PNL_SNAPSHOTS_DOCUMENT, {
    variables: {
      dateStr,
      filterParams: {
        ...testParams,
        closePositionCountsByPnlSnapshotKind: JSON.stringify(
          testParams.closePositionCountsByPnlSnapshotKind,
        ),
      },
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

export function useGetMonthlyDevPnlSnapshots(
  dateStr: string,
  testParams: TestParams,
) {
  const { data, loading } = useQuery(GET_MONTHLY_DEV_PNL_SNAPSHOTS_DOCUMENT, {
    variables: {
      dateStr,
      filterParams: {
        ...testParams,
        closePositionCountsByPnlSnapshotKind: JSON.stringify(
          testParams.closePositionCountsByPnlSnapshotKind,
        ),
      },
    },
  });

  const histories = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getMonthlyDevPnlSnapshots.map((item) =>
      getPersonalTradeHistory(
        getFragmentData(TRADEHISTORY_INFO_FRAGMENT_DOCUMENT, item),
      ),
    );
  }, [data]);

  return {
    histories,
    loading,
  };
}

export function useGetWholeResultHistories(testParams: TestParams) {
  const { data, loading } = useQuery(GET_WHOLE_RESULT_HISTORIES_DOCUMENT, {
    variables: {
      filterParams: {
        ...testParams,
        closePositionCountsByPnlSnapshotKind: JSON.stringify(
          testParams.closePositionCountsByPnlSnapshotKind,
        ),
      },
    },
  });

  const histories = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getWholeResultHistories.map((item) =>
      getPersonalTradeHistory(
        getFragmentData(TRADEHISTORY_INFO_FRAGMENT_DOCUMENT, item),
      ),
    );
  }, [data]);

  return {
    histories,
    loading,
  };
}

export function useGetWholeCompressedHistories(testParams: TestParams) {
  const { data, loading } = useQuery(GET_WHOLE_COMPRESSED_HISTORIES_DOCUMENT, {
    variables: {
      filterParams: {
        ...testParams,
        closePositionCountsByPnlSnapshotKind: JSON.stringify(
          testParams.closePositionCountsByPnlSnapshotKind,
        ),
      },
    },
  });

  return {
    accPnls: data?.getWholeCompressedHistories.accPnls || [],
    botCounts: data?.getWholeCompressedHistories.botCounts || [],
    maxInvested: data?.getWholeCompressedHistories.maxInvested || 0,
    loading,
  };
}

export function useGetWholeCompressedHistoriesV2(testParams: TestParamsV2[]) {
  const { data, loading } = useQuery(
    GET_WHOLE_COMPRESSED_HISTORIES_V2_DOCUMENT,
    {
      variables: {
        filterParams: testParams.map((item) => ({
          ...item,
          r2MinsByPnlSnapshotKind: JSON.stringify(item.r2MinsByPnlSnapshotKind),
        })),
      },
    },
  );

  return {
    accPnls: data?.getWholeCompressedHistoriesV2.accPnls || [],
    botCounts: data?.getWholeCompressedHistoriesV2.botCounts || [],
    maxInvested: data?.getWholeCompressedHistoriesV2.maxInvested || 0,
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
    return data.getTestingReport.edges.map((edge) => edge.node);
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

export function useGetTestingReportV2() {
  const { data, loading, fetchMore, error } = useQuery(
    GET_TESTING_REPORT_V2_DOCUMENT,
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
    return data.getTestingReportV2.edges.map((edge) => edge.node);
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error) {
      fetchMore({
        variables: {
          first: 20,
          after: data.getTestingReportV2.pageInfo.endCursor,
        },
      });
    }
  }, [data, error, fetchMore]);

  return {
    hasMore: data?.getTestingReportV2.pageInfo.hasNextPage,
    reports,
    fetchMore: handleFetchMore,
    loading,
  };
}

export function useGetWholeCompressedHistoriesV3(testParams: TestParamsV3[]) {
  const { data, loading } = useQuery(
    GET_WHOLE_COMPRESSED_HISTORIES_V3_DOCUMENT,
    {
      variables: {
        filterParams: testParams,
      },
    },
  );

  return {
    accPnls: data?.getWholeCompressedHistoriesV3.accPnls || [],
    botCounts: data?.getWholeCompressedHistoriesV3.botCounts || [],
    maxInvested: data?.getWholeCompressedHistoriesV3.maxInvested || 0,
    actionTypeCount: data?.getWholeCompressedHistoriesV3.actionTypeCount || 0,
    uniqueTraders: data?.getWholeCompressedHistoriesV3.uniqueTraders || [],
    loading,
  };
}

export function useGetTestingReportV3() {
  const { data, loading, fetchMore, error } = useQuery(
    GET_TESTING_REPORT_V3_DOCUMENT,
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
    return data.getTestingReportV3.edges.map((edge) => edge.node);
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error) {
      fetchMore({
        variables: {
          first: 20,
          after: data.getTestingReportV3.pageInfo.endCursor,
        },
      });
    }
  }, [data, error, fetchMore]);

  return {
    hasMore: data?.getTestingReportV3.pageInfo.hasNextPage,
    reports,
    fetchMore: handleFetchMore,
    loading,
  };
}

export function useGetDevPnlSnapshotsV4(
  dateStr: string,
  testParams: TestParamsV3[],
  ratio: number,
) {
  const { data, loading } = useQuery(GET_DEV_PNL_SNAPSHOTS_V4_DOCUMENT, {
    variables: {
      dateStr,
      filterParams: testParams,
      ratio,
    },
  });

  const pnlSnapshots = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getDevPnlSnapshotsV4.map((item) => ({
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

export function useGetWholeCompressedHistoriesV4(
  startDate: string,
  testParams: TestParamsV3[],
  ratio: number,
) {
  const { data, loading } = useQuery(
    GET_WHOLE_COMPRESSED_HISTORIES_V4_DOCUMENT,
    {
      variables: {
        filterParams: testParams,
        ratio,
        startDate,
      },
    },
  );

  return {
    accPnls: data?.getWholeCompressedHistoriesV4.accPnls || [],
    botCounts: data?.getWholeCompressedHistoriesV4.botCounts || [],
    maxInvested: data?.getWholeCompressedHistoriesV4.maxInvested || 0,
    actionTypeCount: data?.getWholeCompressedHistoriesV4.actionTypeCount || 0,
    uniqueTraders: data?.getWholeCompressedHistoriesV4.uniqueTraders || [],
    totalBots: data?.getWholeCompressedHistoriesV4?.totalBots || [],
    loading,
  };
}

export function useGetTestingReportV4() {
  const { data, loading, fetchMore, error } = useQuery(
    GET_TESTING_REPORT_V4_DOCUMENT,
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
    return data.getTestingReportV4.edges
      .map((edge) => edge.node)
      .filter((item) => item.usdPnls.length > 0);
  }, [data]);

  const handleFetchMore = useCallback(() => {
    if (data && !error) {
      fetchMore({
        variables: {
          first: 20,
          after: data.getTestingReportV4.pageInfo.endCursor,
        },
      });
    }
  }, [data, error, fetchMore]);

  return {
    hasMore: data?.getTestingReportV4.pageInfo.hasNextPage,
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
