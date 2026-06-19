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
import { Platform, GetPnlSnapshotsV2Query } from "@/graphql/gql/graphql";

export const PNL_SNAPSHOT_V2_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PnlSnapshotV2Info on PnlSnapshotV2 {
    accUSDPnl
    address
    dateStr
    platform
  }
`);

export const PERP_TRADE_HISTORY_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PerpTradeHistoryInfo on PerpTradeHistory {
    id
    address
    collateralDeltaUsd
    collateralInUsd
    isLong
    leverage
    leverageDelta
    operation
    pair
    positionKey
    price
    sizeDeltaUsd
    sizeInUsd
    usdPnl
    date
  }
`);

export const PNL_SNAPSHOT_V2_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PnlSnapshotV2DetailsInfo on PnlSnapshotV2Details {
    accUSDPnl
    address
    dateStr
    perpTradeHistories {
      ...PerpTradeHistoryInfo
    }
    platform
  }
`);

export const GET_PERP_TRADE_HISTORIES_DOCUMENT = graphql(`
  query getPerpTradeHistories($addresses: [String!]!, $platform: Platform!) {
    getPerpTradeHistories(addresses: $addresses, platform: $platform) {
      ...PerpTradeHistoryInfo
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
    $isDesc: Boolean!
    $first: Int!
    $after: String
  ) {
    getPnlSnapshotsV2(
      dateStr: $dateStr
      platform: $platform
      isDesc: $isDesc
      first: $first
      after: $after
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
    perpTradeHistories: snapshotInfo.perpTradeHistories.map((history) =>
      getFragmentData(PERP_TRADE_HISTORY_INFO_FRAGMENT_DOCUMENT, history),
    ),
  };
}

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
  platform: Platform,
  isDesc: boolean,
  first: number,
) {
  const [query, { data, fetchMore, loading, error }] = useLazyQuery(
    GET_PNL_SNAPSHOT_V2_DOCUMENT,
  );

  useEffect(() => {
    query({
      variables: {
        dateStr,
        isDesc,
        first,
        platform,
      },
    });
  }, [dateStr, isDesc, query, platform, first]);

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
          dateStr,
          isDesc,
          first,
          after: data.getPnlSnapshotsV2.pageInfo.endCursor,
          platform,
        },
      });
    }
  }, [data, error, fetchMore, dateStr, isDesc, first, platform]);

  return {
    hasMore: data?.getPnlSnapshotsV2.pageInfo.hasNextPage,
    pnlSnapshots,
    fetchMore: handleFetchMore,
    loading,
  };
}

export function useGetPerpTradeHistories(
  addresses: string[],
  platform: Platform,
) {
  const { data, loading } = useQuery(GET_PERP_TRADE_HISTORIES_DOCUMENT, {
    variables: {
      addresses,
      platform,
    },
  });

  const histories = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getPerpTradeHistories.map((history) =>
      history.map((history) =>
        getFragmentData(PERP_TRADE_HISTORY_INFO_FRAGMENT_DOCUMENT, history),
      ),
    );
  }, [data]);

  return {
    histories,
    loading,
  };
}
