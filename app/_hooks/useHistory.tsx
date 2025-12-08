"use client";

import { useCallback, useEffect, useMemo } from "react";
import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client/react";
import { useSnackbar } from "notistack";
import { getFragmentData, graphql } from "@/gql/index";
import {
  ExportFilter,
  PnlSnapshotKind,
  Platform,
  GetPnlSnapshotsV2Query,
} from "@/graphql/gql/graphql";

export const PNL_SNAPSHOT_V2_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PnlSnapshotV2Info on PnlSnapshotV2 {
    accUSDPnl
    address
    dateStr
    id
    kind
    platform
  }
`);

export const PERP_EVENT_LOGS_INFO_FRAGMENT_DOCUMENT = graphql(`
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

// export const GET_TESTING_REPORT_DOCUMENT = graphql(`
//   query getTestingReport($first: Int!, $after: Int) {
//     getTestingReport(first: $first, after: $after) {
//       edges {
//         cursor
//         node {
//           maxAvgSize
//           minAvgSize
//           maxCount
//           minCount
//           avgLoss
//           monthWeight
//           threeMonthWeight
//           weekWeight
//           allTimeWeight
//           avgProfit
//           bottomAccProfit
//           calculatedR2
//           calculatedSlope
//           id
//           investedUSD
//           lossCount
//           m
//           maxLoss
//           maxProfit
//           minR2
//           minScore
//           n
//           peakAccProfit
//           profitCount
//           totalPositions
//           totalTasks
//           totalTraders
//           totalUSDPnl
//           totalUniqueTraders
//           usdPnls
//           window
//         }
//       }
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//     }
//   }
// `);

export const GET_PERP_EVENT_LOGS_DOCUMENT = graphql(`
  query getPerpEventLogs(
    $addresses: [String!]!
    $platform: Platform!
    $limit: Int
  ) {
    getPerpEventLogs(
      addresses: $addresses
      platform: $platform
      limit: $limit
    ) {
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
      getFragmentData(PERP_EVENT_LOGS_INFO_FRAGMENT_DOCUMENT, eventLog),
    ),
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

// export function useGetTestingReport() {
//   const { data, loading, fetchMore, error } = useQuery(
//     GET_TESTING_REPORT_DOCUMENT,
//     {
//       variables: {
//         first: 20,
//       },
//     },
//   );

//   const reports = useMemo(() => {
//     if (!data) {
//       return [];
//     }
//     return data.getTestingReport.edges
//       .map((edge) => edge.node)
//       .filter((item) => item.usdPnls.length > 0);
//   }, [data]);

//   const handleFetchMore = useCallback(() => {
//     if (data && !error) {
//       fetchMore({
//         variables: {
//           first: 20,
//           after: data.getTestingReport.pageInfo.endCursor,
//         },
//       });
//     }
//   }, [data, error, fetchMore]);

//   return {
//     hasMore: data?.getTestingReport.pageInfo.hasNextPage,
//     reports,
//     fetchMore: handleFetchMore,
//     loading,
//   };
// }

export function useGetPnlSnapshotV2InitializedFlag(platform: Platform) {
  return useQuery(GET_PNL_SNAPSHOT_V2_INITIALIZED_FLAG_DOCUMENT, {
    variables: { platform },
  });
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

export function useGetPerpEventLogs(
  addresses: string[],
  platform: Platform,
  limit: number | null,
) {
  const { data, loading } = useQuery(GET_PERP_EVENT_LOGS_DOCUMENT, {
    variables: {
      addresses,
      platform,
      limit,
    },
  });

  const eventLogs = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getPerpEventLogs.map((eventLogs) =>
      eventLogs.map((eventLog) =>
        getFragmentData(PERP_EVENT_LOGS_INFO_FRAGMENT_DOCUMENT, eventLog),
      ),
    );
  }, [data]);

  return {
    eventLogs,
    loading,
  };
}
