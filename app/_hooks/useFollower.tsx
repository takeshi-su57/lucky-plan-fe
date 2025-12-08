"use client";

import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";

import { useGetAllGnsContracts } from "./useContract";
import { getMissionForwardDetails } from "./useMission";
import { PNL_SNAPSHOT_V2_INFO_FRAGMENT_DOCUMENT } from "./useHistory";

export const FOLLOWER_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment FollowerInfo on Follower {
    userId
    address
    accountIndex
    publicKey
  }
`);

export const FOLLOWER_TRADE_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment FollowerTradeInfo on FollowerTrade {
    address
    index
    mission {
      ...MissionForwardDetailsInfo
    }
    params
  }
`);

export const FOLLOWER_PENDING_ORDER_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment FollowerPendingOrderInfo on FollowerPendingOrder {
    params
    address
    index
  }
`);

export const FOLLOWER_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment FollowerDetailInfo on FollowerDetail {
    address
    accountIndex
    publicKey
    userId
    ethBalance
    usdcBalance
    usdcAllowance
    contractId
    pnlSnapshots {
      ...PnlSnapshotV2Info
    }
    trades {
      ...FollowerTradeInfo
    }
    pendingOrders {
      ...FollowerPendingOrderInfo
    }
  }
`);

export const GET_ALL_FOLLOWERS_DOCUMENT = graphql(`
  query getAllFollowers {
    getAllFollowers {
      ...FollowerInfo
    }
  }
`);

export const GET_ALL_FOLLOWER_DETAILS_DOCUMENT = graphql(`
  query getAllFollowerDetails($contractId: Int!, $after: Int, $first: Int!) {
    getAllFollowerDetails(
      contractId: $contractId
      after: $after
      first: $first
    ) {
      edges {
        cursor
        node {
          ...FollowerDetailInfo
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);

export const CLOSE_TRADE_MARKET_DOCUMENT = graphql(`
  mutation closeTradeMarket($input: CloseTradeInput!) {
    closeTradeMarket(input: $input) {
      message
      success
      address
      contractId
      index
    }
  }
`);

export const OPEN_TRADE_MARKET_DOCUMENT = graphql(`
  mutation openTradeMarket($input: OpenTradeInput!) {
    openTradeMarket(input: $input) {
      message
      success
      address
      contractId
      index
    }
  }
`);

export const INCREASE_POSITION_SIZE_DOCUMENT = graphql(`
  mutation increasePositionSize($input: IncreasePositionSizeInput!) {
    increasePositionSize(input: $input) {
      message
      success
      address
      contractId
      index
    }
  }
`);

export const DECREASE_POSITION_SIZE_DOCUMENT = graphql(`
  mutation decreasePositionSize($input: DecreasePositionSizeInput!) {
    decreasePositionSize(input: $input) {
      message
      success
      address
      contractId
      index
    }
  }
`);

export const UPDATE_LEVERAGE_DOCUMENT = graphql(`
  mutation updateLeverage($input: UpdateLeverageInput!) {
    updateLeverage(input: $input) {
      message
      success
      address
      contractId
      index
    }
  }
`);

export const CANCEL_ORDER_AFTER_TIMEOUT_DOCUMENT = graphql(`
  mutation cancelOrderAfterTimeout($input: CancelOrderAfterTimeoutInput!) {
    cancelOrderAfterTimeout(input: $input) {
      message
      success
      address
      contractId
      index
    }
  }
`);

export const UPDATE_SL_DOCUMENT = graphql(`
  mutation updateSl($input: UpdateSlInput!) {
    updateSl(input: $input) {
      message
      success
      address
      contractId
      index
    }
  }
`);

export const UPDATE_TP_DOCUMENT = graphql(`
  mutation updateTp($input: UpdateTpInput!) {
    updateTp(input: $input) {
      message
      success
      address
      contractId
      index
    }
  }
`);

export const WITHDRAW_POSITIVE_PNL_DOCUMENT = graphql(`
  mutation withdrawPositivePnl($input: WithdrawPositivePnlInput!) {
    withdrawPositivePnl(input: $input) {
      message
      success
      address
      contractId
      index
    }
  }
`);

export const GENERATE_NEW_FOLLOWER_DOCUMENT = graphql(`
  mutation generateNewFollower {
    generateNewFollower {
      ...FollowerInfo
    }
  }
`);

export const WITHDRAW_ALL_USDC_DOCUMENT = graphql(`
  mutation withdrawAllUSDC($input: WithdrawAllInput!) {
    withdrawAllUSDC(input: $input)
  }
`);

export const DECREASE_ALLOWANCE_TO_ZERO_DOCUMENT = graphql(`
  mutation decreaseAllowanceToZero(
    $contractId: Int!
    $followerAddress: String!
    $password: String!
  ) {
    decreaseAllowanceToZero(
      contractId: $contractId
      followerAddress: $followerAddress
      password: $password
    )
  }
`);

export const INCREASE_ALLOWANCE_TO_MAX_DOCUMENT = graphql(`
  mutation increaseAllowanceToMax(
    $contractId: Int!
    $followerAddress: String!
    $password: String!
  ) {
    increaseAllowanceToMax(
      contractId: $contractId
      followerAddress: $followerAddress
      password: $password
    )
  }
`);
export const WITHDRAW_ALL_ETH_DOCUMENT = graphql(`
  mutation withdrawAllETH($input: WithdrawAllInput!) {
    withdrawAllETH(input: $input)
  }
`);

export const WITHDRAW_ETH_TO_USER_DOCUMENT = graphql(`
  mutation withdrawETHToUser(
    $amount: Float!
    $contractId: Int!
    $password: String!
  ) {
    withdrawETHToUser(
      amount: $amount
      contractId: $contractId
      password: $password
    )
  }
`);

export const WITHDRAW_USDC_TO_USER_DOCUMENT = graphql(`
  mutation withdrawUSDCToUser(
    $amount: Float!
    $contractId: Int!
    $password: String!
  ) {
    withdrawUSDCToUser(
      amount: $amount
      contractId: $contractId
      password: $password
    )
  }
`);

export function useGetAllFollowers() {
  const { data } = useQuery(GET_ALL_FOLLOWERS_DOCUMENT, {
    variables: {},
  });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllFollowers.map((follower) => ({
      ...getFragmentData(FOLLOWER_INFO_FRAGMENT_DOCUMENT, follower),
    }));
  }, [data]);
}

export function useGetAllFollowerDetails(contractId: string | null) {
  const [query, { data, loading }] = useLazyQuery(
    GET_ALL_FOLLOWER_DETAILS_DOCUMENT,
    {
      pollInterval: 30_000,
    },
  );

  useEffect(() => {
    if (contractId === null) {
      return;
    }

    query({
      variables: {
        contractId: +contractId,
        first: 20,
        after: null,
      },
    });
  }, [query, contractId]);

  // useEffect(() => {
  //   if (
  //     data &&
  //     !loading &&
  //     !error &&
  //     contractId &&
  //     data.getAllFollowerDetails.pageInfo.hasNextPage
  //   ) {
  //     setTimeout(() => {
  //       fetchMore({
  //         variables: {
  //           contractId: +contractId,
  //           first: 20,
  //           after: data.getAllFollowerDetails.pageInfo.endCursor,
  //         },
  //       });
  //     }, 5000);
  //   }
  // }, [data, error, fetchMore, contractId, loading]);

  const details = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllFollowerDetails.edges
      .map((edge) => edge.node)
      .map((follower) => {
        const followerData = getFragmentData(
          FOLLOWER_DETAILS_INFO_FRAGMENT_DOCUMENT,
          follower,
        );

        const pnlSnapshots = followerData.pnlSnapshots.map((snapshot) =>
          getFragmentData(PNL_SNAPSHOT_V2_INFO_FRAGMENT_DOCUMENT, snapshot),
        );

        const trades = followerData.trades.map((trade) => {
          const tradeData = getFragmentData(
            FOLLOWER_TRADE_INFO_FRAGMENT_DOCUMENT,
            trade,
          );

          return {
            ...tradeData,
            mission: tradeData.mission
              ? getMissionForwardDetails(tradeData.mission)
              : null,
          };
        });

        const pendingOrders = followerData.pendingOrders.map((pendingOrder) =>
          getFragmentData(
            FOLLOWER_PENDING_ORDER_INFO_FRAGMENT_DOCUMENT,
            pendingOrder,
          ),
        );

        return {
          ...followerData,
          pnlSnapshots,
          trades,
          pendingOrders,
        };
      })
      .sort((a, b) => a.accountIndex - b.accountIndex);
  }, [data]);

  return {
    details,
    loading,
    hasMore: data?.getAllFollowerDetails.pageInfo.hasNextPage,
  };
}

export function useGenerateFollower() {
  const [generateFollower, { data: newData, error }] = useMutation(
    GENERATE_NEW_FOLLOWER_DOCUMENT,
  );
  const contracts = useGetAllGnsContracts();

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const followerInfo = getFragmentData(
        FOLLOWER_INFO_FRAGMENT_DOCUMENT,
        newData.generateNewFollower,
      );

      enqueueSnackbar("Success at generating new follower!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_FOLLOWERS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllFollowers.length > 0) {
            const alreadyExists = data.getAllFollowers.filter(
              (follower) =>
                followerInfo.address ===
                getFragmentData(
                  FOLLOWER_INFO_FRAGMENT_DOCUMENT,
                  follower as any,
                ).address,
            );

            if (alreadyExists.length > 0) {
              return data;
            }

            return {
              ...data,
              getAllFollowers: [...data.getAllFollowers, followerInfo],
            };
          } else {
            return {
              getAllFollowers: [followerInfo],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar, contracts]);

  return generateFollower;
}

export function useCloseTradeMarket() {
  const [closeTradeMarket, { data, error, loading }] = useMutation(
    CLOSE_TRADE_MARKET_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.closeTradeMarket.success) {
        enqueueSnackbar("Success at close trade market!", {
          variant: "success",
        });

        client.cache.modify({
          fields: {
            getAllFollowerDetails: (_, { INVALIDATE }) => {
              return INVALIDATE;
            },
          },
        });
      } else {
        enqueueSnackbar(data.closeTradeMarket.message, {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { closeTradeMarket, loading };
}

export function useOpenTradeMarket() {
  const [openTradeMarket, { data, error, loading }] = useMutation(
    OPEN_TRADE_MARKET_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.openTradeMarket.success) {
        enqueueSnackbar("Success at open trade market!", {
          variant: "success",
        });

        client.cache.modify({
          fields: {
            getAllFollowerDetails: (_, { INVALIDATE }) => {
              return INVALIDATE;
            },
          },
        });
      } else {
        enqueueSnackbar(data.openTradeMarket.message, {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { openTradeMarket, loading };
}

export function useIncreasePositionSize() {
  const [increasePositionSize, { data, error, loading }] = useMutation(
    INCREASE_POSITION_SIZE_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.increasePositionSize.success) {
        enqueueSnackbar("Success at increase position size!", {
          variant: "success",
        });

        client.cache.modify({
          fields: {
            getAllFollowerDetails: (_, { INVALIDATE }) => {
              return INVALIDATE;
            },
          },
        });
      } else {
        enqueueSnackbar(data.increasePositionSize.message, {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { increasePositionSize, loading };
}

export function useDecreasePositionSize() {
  const [decreasePositionSize, { data, error, loading }] = useMutation(
    DECREASE_POSITION_SIZE_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.decreasePositionSize.success) {
        enqueueSnackbar("Success at decrease position size!", {
          variant: "success",
        });

        client.cache.modify({
          fields: {
            getAllFollowerDetails: (_, { INVALIDATE }) => {
              return INVALIDATE;
            },
          },
        });
      } else {
        enqueueSnackbar(data.decreasePositionSize.message, {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { decreasePositionSize, loading };
}

export function useUpdateLeverage() {
  const [updateLeverage, { data, error, loading }] = useMutation(
    UPDATE_LEVERAGE_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.updateLeverage.success) {
        enqueueSnackbar("Success at update leverage!", {
          variant: "success",
        });

        client.cache.modify({
          fields: {
            getAllFollowerDetails: (_, { INVALIDATE }) => {
              return INVALIDATE;
            },
          },
        });
      } else {
        enqueueSnackbar(data.updateLeverage.message, {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { updateLeverage, loading };
}

export function useCancelOrderAfterTimeout() {
  const [cancelOrderAfterTimeout, { data, error, loading }] = useMutation(
    CANCEL_ORDER_AFTER_TIMEOUT_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.cancelOrderAfterTimeout.success) {
        enqueueSnackbar("Success at cancel order after timeout!", {
          variant: "success",
        });

        client.cache.modify({
          fields: {
            getAllFollowerDetails: (_, { INVALIDATE }) => {
              return INVALIDATE;
            },
          },
        });
      } else {
        enqueueSnackbar(data.cancelOrderAfterTimeout.message, {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { cancelOrderAfterTimeout, loading };
}

export function useUpdateSl() {
  const [updateSl, { data, error, loading }] = useMutation(UPDATE_SL_DOCUMENT);
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.updateSl.success) {
        enqueueSnackbar("Success at update SL!", {
          variant: "success",
        });

        client.cache.modify({
          fields: {
            getAllFollowerDetails: (_, { INVALIDATE }) => {
              return INVALIDATE;
            },
          },
        });
      } else {
        enqueueSnackbar(data.updateSl.message, {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { updateSl, loading };
}

export function useDecreaseAllowanceToZero() {
  const [decreaseAllowanceToZero, { data, error, loading }] = useMutation(
    DECREASE_ALLOWANCE_TO_ZERO_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.decreaseAllowanceToZero) {
        enqueueSnackbar("Success at decrease allowance to zero!", {
          variant: "success",
        });

        client.cache.modify({
          fields: {
            getAllFollowerDetails: (_, { INVALIDATE }) => {
              return INVALIDATE;
            },
          },
        });
      } else {
        enqueueSnackbar("Failed to decrease allowance to zero!", {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { decreaseAllowanceToZero, loading };
}

export function useIncreaseAllowanceToMax() {
  const [increaseAllowanceToMax, { data, error, loading }] = useMutation(
    INCREASE_ALLOWANCE_TO_MAX_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.increaseAllowanceToMax) {
        enqueueSnackbar("Success at increase allowance to max!", {
          variant: "success",
        });

        client.cache.modify({
          fields: {
            getAllFollowerDetails: (_, { INVALIDATE }) => {
              return INVALIDATE;
            },
          },
        });
      } else {
        enqueueSnackbar("Failed to increase allowance to max!", {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { increaseAllowanceToMax, loading };
}

export function useUpdateTp() {
  const [updateTp, { data, error, loading }] = useMutation(UPDATE_TP_DOCUMENT);
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.updateTp.success) {
        enqueueSnackbar("Success at update TP!", {
          variant: "success",
        });

        client.cache.modify({
          fields: {
            getAllFollowerDetails: (_, { INVALIDATE }) => {
              return INVALIDATE;
            },
          },
        });
      } else {
        enqueueSnackbar(data.updateTp.message, {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { updateTp, loading };
}

export function useWithdrawPositivePnl() {
  const [withdrawPositivePnl, { data, error, loading }] = useMutation(
    WITHDRAW_POSITIVE_PNL_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      if (data.withdrawPositivePnl.success) {
        enqueueSnackbar("Success at withdraw positive PNL!", {
          variant: "success",
        });

        client.cache.modify({
          fields: {
            getAllFollowerDetails: (_, { INVALIDATE }) => {
              return INVALIDATE;
            },
          },
        });
      } else {
        enqueueSnackbar(data.withdrawPositivePnl.message, {
          variant: "error",
        });
      }
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { withdrawPositivePnl, loading };
}

export function useWithdrawAllUSDC() {
  const [withdrawAllUSDC, { data, error }] = useMutation(
    WITHDRAW_ALL_USDC_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      enqueueSnackbar("Success at withdraw USDC!", {
        variant: "success",
      });
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return withdrawAllUSDC;
}

export function useWithdrawAllETH() {
  const [withdrawAllETH, { data, error }] = useMutation(
    WITHDRAW_ALL_ETH_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      enqueueSnackbar("Success at withdraw ETH!", {
        variant: "success",
      });
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return withdrawAllETH;
}

export function useWithdrawETHToUser() {
  const [withdrawETHToUser, { data, error, loading }] = useMutation(
    WITHDRAW_ETH_TO_USER_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      enqueueSnackbar("Success at withdraw ETH to User Wallet!", {
        variant: "success",
      });
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { withdrawETHToUser, loading };
}

export function useWithdrawUSDCToUser() {
  const [withdrawUSDCToUser, { data, error, loading }] = useMutation(
    WITHDRAW_USDC_TO_USER_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      enqueueSnackbar("Success at withdraw USDC to User Wallet!", {
        variant: "success",
      });
    }
  }, [client.cache, error, enqueueSnackbar, data]);

  return { withdrawUSDCToUser, loading };
}
