"use client";

import { useEffect, useMemo } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import { useSnackbar } from "notistack";
import { getFragmentData, graphql } from "@/gql/index";
import { GetPerpTradePositionsQuery, Platform } from "@/graphql/gql/graphql";

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
    usdBasePnl
    usdFee
    date
    contractId
    platform
    collateralUsdPrice
  }
`);

export const PERP_TRADE_POSITION_INFO_DOCUMENT = graphql(`
  fragment PerpTradePositionInfo on PerpTradePosition {
    histories {
      ...PerpTradeHistoryInfo
    }
  }
`);

export const PERP_TRADE_POSITIONS_WITH_SUMMARY_INFO_FRAGMENT_DOCUMENT = graphql(
  `
    fragment PerpTradePositionsWithSummaryInfo on PerpTradePositionsWithSummary {
      positions {
        ...PerpTradePositionInfo
      }
      avgCollateral
      avgDuration
      avgLeverage
      avgNegativePnl
      avgPnl
      avgPnlPercentageByCollateral
      avgPnlPercentageBySize
      avgPositivePnl
      avgSize
      maxDuration
      openedPositions
      totalPnl
      totalPositions
    }
  `,
);

export const PNL_SNAPSHOT_V2_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PnlSnapshotV2DetailsInfo on PnlSnapshotV2Details {
    accUSDPnl
    address
    dateStr
    positionsWithSummary {
      ...PerpTradePositionsWithSummaryInfo
    }
    platform
  }
`);

export const GET_PERP_TRADE_POSITIONS_DOCUMENT = graphql(`
  query getPerpTradePositions(
    $address: String!
    $platform: Platform!
    $maxLeverage: Float
    $startedAt: Date
    $stoppedAt: Date
    $endedAt: Date
  ) {
    getPerpTradePositions(
      address: $address
      platform: $platform
      maxLeverage: $maxLeverage
      startedAt: $startedAt
      stoppedAt: $stoppedAt
      endedAt: $endedAt
    ) {
      ...PerpTradePositionsWithSummaryInfo
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
    $maxLeverage: Float
    $page: Int!
    $pageSize: Int!
  ) {
    getPnlSnapshotsV2(
      dateStr: $dateStr
      platform: $platform
      isDesc: $isDesc
      maxLeverage: $maxLeverage
      page: $page
      pageSize: $pageSize
    ) {
      items {
        ...PnlSnapshotV2DetailsInfo
      }
      total
      totalPages
      currentPage
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

function unwrapPositionsWithSummary(
  info: GetPerpTradePositionsQuery["getPerpTradePositions"],
) {
  const unwrapped = getFragmentData(
    PERP_TRADE_POSITIONS_WITH_SUMMARY_INFO_FRAGMENT_DOCUMENT,
    info,
  );

  const positions = getFragmentData(
    PERP_TRADE_POSITION_INFO_DOCUMENT,
    unwrapped.positions,
  );

  return {
    ...unwrapped,
    positions: positions.map((position) => ({
      histories: position.histories.map((history) =>
        getFragmentData(PERP_TRADE_HISTORY_INFO_FRAGMENT_DOCUMENT, history),
      ),
    })),
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
  maxLeverage: number | null,
  page: number,
  pageSize: number,
) {
  const { data, loading, error } = useQuery(GET_PNL_SNAPSHOT_V2_DOCUMENT, {
    variables: {
      platform,
      dateStr,
      isDesc,
      maxLeverage,
      page,
      pageSize,
    },
  });

  const pnlSnapshots = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getPnlSnapshotsV2.items.map((item) => {
      const unwrapped = getFragmentData(
        PNL_SNAPSHOT_V2_DETAILS_INFO_FRAGMENT_DOCUMENT,
        item,
      );

      return {
        ...unwrapped,
        positionsWithSummary: unwrapPositionsWithSummary(
          unwrapped.positionsWithSummary,
        ),
      };
    });
  }, [data]);

  return {
    pnlSnapshots,
    total: data?.getPnlSnapshotsV2?.total ?? 0,
    totalPages: data?.getPnlSnapshotsV2?.totalPages ?? 0,
    currentPage: data?.getPnlSnapshotsV2?.currentPage ?? 0,
    loading,
    error,
  };
}

export function useGetPerpTradePositions(
  address: string,
  platform: Platform,
  maxLeverage: number | null,
  startedAt: Date | null,
  stoppedAt: Date | null,
  endedAt: Date | null,
) {
  const { data, loading } = useQuery(GET_PERP_TRADE_POSITIONS_DOCUMENT, {
    variables: {
      address,
      platform,
      maxLeverage,
      startedAt,
      stoppedAt,
      endedAt,
    },
  });

  const result = useMemo(() => {
    if (!data) {
      return null;
    }

    return unwrapPositionsWithSummary(data.getPerpTradePositions);
  }, [data]);

  return {
    data: result,
    loading,
  };
}
