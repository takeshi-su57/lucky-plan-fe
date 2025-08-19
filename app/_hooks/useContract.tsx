"use client";

import { useEffect, useMemo } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useQuery as useTanstackQuery } from "@tanstack/react-query";

import { getFragmentData, graphql } from "@/gql/index";
import { ServiceStatus } from "@/types";

export const CONTRACT_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment ContractInfo on Contract {
    id
    chainId
    address
    backendUrl
    description
    isTestnet
    status
    fromBlock
    lastBlockNumber
    lastLeaderboardBlockNumber
    platform
    toBlock
    version
  }
`);

export const GET_ALL_CONTRACT_DOCUMENT = graphql(`
  query getAllContracts {
    getAllContracts {
      ...ContractInfo
    }
  }
`);

export const GET_ALL_TRADE_PAIRS_DOCUMENT = graphql(`
  query getAllTradePairs($contractId: [Int!]!) {
    getTradePairs(contractId: $contractId) {
      contractId
      from
      pairIndex
      to
      onePercentDepthAboveUsd
      onePercentDepthBelowUsd
    }
  }
`);

export const GET_TRADE_COLLATERALS_DOCUMENT = graphql(`
  query getTradeCollaterals($contractId: Int!) {
    getTradeCollaterals(contractId: $contractId) {
      collateral
      collateralIndex
      isActive
      precision
      precisionDelta
    }
  }
`);

export const GET_ADAPTION_STATUS_DOCUMENT = graphql(`
  query getAdaptionStatus {
    getAdaptionStatus
  }
`);

export const DISABLE_CONTRACT_DOCUMENT = graphql(`
  mutation disableContract($contractId: Int!) {
    disableContract(contractId: $contractId) {
      ...ContractInfo
    }
  }
`);

export const LIVE_CONTRACT_DOCUMENT = graphql(`
  mutation liveContract($contractId: Int!) {
    liveContract(contractId: $contractId) {
      ...ContractInfo
    }
  }
`);

export const START_ADAPTION_DOCUMENT = graphql(`
  mutation startAdaption($contractId: Int!, $shouldRestart: Boolean!) {
    startAdaption(contractId: $contractId, shouldRestart: $shouldRestart)
  }
`);

export function useGetAllTradePairs(contractIds?: number[]) {
  const { data } = useQuery(GET_ALL_TRADE_PAIRS_DOCUMENT, {
    variables: contractIds ? { contractId: contractIds } : undefined,
  });

  return data?.getTradePairs || [];
}

export function useGetAdaptionStatus() {
  const client = useApolloClient();

  const query = useTanstackQuery({
    queryKey: ["GET_ADAPTION_STATUS_DOCUMENT"],
    queryFn: async () => {
      const result = await client.query({
        query: GET_ADAPTION_STATUS_DOCUMENT,
        fetchPolicy: "network-only", // always fresh
      });
      return JSON.parse(result.data.getAdaptionStatus) as Record<
        string,
        ServiceStatus
      >;
    },
    refetchInterval: 10_000, // ⏳ auto refresh every 10s
    enabled: !!client,
  });

  return query.data || {};
}

export function useGetTradeCollaterals(contractId?: number) {
  const { data } = useQuery(GET_TRADE_COLLATERALS_DOCUMENT, {
    variables: contractId ? { contractId } : undefined,
  });

  return data?.getTradeCollaterals || [];
}

export function useGetAllContracts() {
  const { data } = useQuery(GET_ALL_CONTRACT_DOCUMENT, {
    variables: {},
  });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllContracts.map((contract) => ({
      ...getFragmentData(CONTRACT_INFO_FRAGMENT_DOCUMENT, contract),
    }));
  }, [data]);
}

export function useDisableContract() {
  const [disableContract, { data, error, loading }] = useMutation(
    DISABLE_CONTRACT_DOCUMENT,
  );
  const { enqueueSnackbar } = useSnackbar();
  const client = useApolloClient();

  useEffect(() => {
    if (data && !error) {
      enqueueSnackbar("Success at disable contract!", {
        variant: "success",
      });

      const updatedContract = getFragmentData(
        CONTRACT_INFO_FRAGMENT_DOCUMENT,
        data.disableContract,
      );

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: "Contract",
          id: updatedContract.id,
        }),
        fragment: CONTRACT_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "ContractInfo",
        data: updatedContract,
      });
    }
  }, [error, enqueueSnackbar, data, client.cache]);

  return { disableContract, loading };
}

export function useLiveContract() {
  const [liveContract, { data, error, loading }] = useMutation(
    LIVE_CONTRACT_DOCUMENT,
  );
  const { enqueueSnackbar } = useSnackbar();
  const client = useApolloClient();

  useEffect(() => {
    if (data && !error) {
      enqueueSnackbar("Success at live contract!", {
        variant: "success",
      });

      const updatedContract = getFragmentData(
        CONTRACT_INFO_FRAGMENT_DOCUMENT,
        data.liveContract,
      );

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: "Contract",
          id: updatedContract.id,
        }),
        fragment: CONTRACT_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "ContractInfo",
        data: updatedContract,
      });
    }
  }, [error, enqueueSnackbar, data, client.cache]);

  return { liveContract, loading };
}

export function useStartAdaption() {
  const [startAdaption, { data, error, loading }] = useMutation(
    START_ADAPTION_DOCUMENT,
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      enqueueSnackbar("Success at start adaption!", {
        variant: "success",
      });
    }
  }, [error, enqueueSnackbar, data]);

  return { startAdaption, loading };
}
